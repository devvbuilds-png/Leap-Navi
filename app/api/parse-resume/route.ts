import { NextRequest, NextResponse } from "next/server";
// import from lib path to avoid pdf-parse's debug auto-read of a sample file
// @ts-ignore - no types for the deep path
import pdf from "pdf-parse/lib/pdf-parse.js";
import { buildProfile, parseResumePDFLLM } from "@/lib/ai";
import { db } from "@/lib/db";
import { purgeStaleSessionData } from "@/lib/cleanup";
import { lookup } from "node:dns/promises";
import { isIP } from "node:net";
import type { Profile } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    const sampleText = form.get("sampleText") as string | null;
    const portfolioUrl = String(form.get("portfolioUrl") || "").trim();

    let text = "";
    let name = "résumé.pdf";
    let pdfBuffer: Buffer | null = null;
    if (file) {
      name = file.name;
      pdfBuffer = Buffer.from(await file.arrayBuffer());
      try { text = (await pdf(pdfBuffer)).text || ""; } catch { text = ""; }
    } else if (sampleText) {
      text = sampleText;
      name = "sample.pdf";
    }
    if (portfolioUrl) {
      const portfolioText = await fetchPortfolioText(portfolioUrl);
      text = `${text}\n\nPORTFOLIO\n${portfolioText}`.trim();
      if (!file && !sampleText) name = new URL(portfolioUrl).hostname;
    }
    if (!text) return NextResponse.json({ error: "Upload a résumé PDF or add a public portfolio URL." }, { status: 400 });

    let profile: Profile | null = null;
    let source: "llm" | "engine" | "vision" = "engine";
    if (text.trim().length < 80 && pdfBuffer) {
      profile = await parseResumePDFLLM(pdfBuffer, name);
      if (profile) source = "vision";
    }
    if (!profile && text.trim().length < 80) {
      return NextResponse.json({
        error: process.env.OPENAI_API_KEY
          ? "I couldn't read this résumé clearly. Please try a sharper PDF or export it again before uploading."
          : "This looks like a scanned résumé. Connect the OpenAI API to read image-based PDFs, or upload a text-based PDF.",
      }, { status: 422 });
    }

    // LLM-first structured parse (with deterministic reconciliation guardrail), engine fallback.
    if (!profile) {
      const built = await buildProfile(text, name);
      profile = built.profile;
      source = built.source;
    }
    const session = await db.session.create({ data: { profileJson: JSON.stringify(profile) } });
    await db.event.create({ data: { sessionId: session.id, name: "resume_parsed", metaJson: JSON.stringify({ chars: profile.rawTextLen, source }) } });

    // Fire-and-forget: wipe personal data off sessions older than the TTL.
    // Never blocks or breaks the upload; analytics events are preserved.
    purgeStaleSessionData().catch(() => {});

    return NextResponse.json({ sessionId: session.id, profile, source });
  } catch (e) {
    const message = (e as Error).message;
    const status = /portfolio|url|public website|publicly accessible/i.test(message) ? 400 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}

async function fetchPortfolioText(rawUrl: string): Promise<string> {
  let url = new URL(rawUrl);
  for (let redirect = 0; redirect < 4; redirect++) {
    await assertPublicUrl(url);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
    const res = await fetch(url, {
      redirect: "manual",
      signal: controller.signal,
      headers: { "User-Agent": "NaviPlusCareerProfile/1.0" },
    }).finally(() => clearTimeout(timer));
    if (res.status >= 300 && res.status < 400) {
      const location = res.headers.get("location");
      if (!location) throw new Error("Portfolio redirect was invalid.");
      url = new URL(location, url);
      continue;
    }
    if (!res.ok) throw new Error(`Portfolio page returned ${res.status}.`);
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("text/plain")) {
      throw new Error("Portfolio URL must point to a public web page.");
    }
    const html = (await res.text()).slice(0, 600_000);
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, " ")
      .replace(/<style[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&#39;/g, "'")
      .replace(/&quot;/gi, "\"")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 30_000);
  }
  throw new Error("Portfolio redirected too many times.");
}

async function assertPublicUrl(url: URL) {
  if (!["http:", "https:"].includes(url.protocol)) throw new Error("Portfolio URL must start with http:// or https://.");
  if (url.username || url.password) throw new Error("Portfolio URL cannot include credentials.");
  const host = url.hostname.toLowerCase();
  if (host === "localhost" || host.endsWith(".local")) throw new Error("Portfolio URL must be publicly accessible.");
  const addresses = isIP(host) ? [{ address: host }] : await lookup(host, { all: true });
  if (!addresses.length || addresses.some(({ address }) => isPrivateAddress(address))) {
    throw new Error("Portfolio URL must resolve to a public website.");
  }
}

function isPrivateAddress(address: string): boolean {
  const value = address.toLowerCase();
  if (value.startsWith("::ffff:")) return isPrivateAddress(value.slice(7));
  if (value === "::1" || value.startsWith("fe80:") || value.startsWith("fc") || value.startsWith("fd")) return true;
  const parts = value.split(".").map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) return false;
  return parts[0] === 10
    || parts[0] === 127
    || (parts[0] === 169 && parts[1] === 254)
    || (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31)
    || (parts[0] === 192 && parts[1] === 168)
    || parts[0] === 0;
}
