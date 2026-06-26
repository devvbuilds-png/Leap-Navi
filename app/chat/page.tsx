"use client";
import { useEffect, useRef, useState } from "react";
import type { Profile, Answers, CareerPath, PlanResult, DeepDive as DeepDiveT, CtcGuidance } from "@/lib/types";
import { SAMPLE_RESUME } from "@/lib/sampleResume";
import ChatHeader from "@/components/ChatHeader";
import RoleAccordion from "@/components/widgets/RoleAccordion";
import CompareModal from "@/components/widgets/CompareModal";
import DeepDive from "@/components/widgets/DeepDive";
import Personalize from "@/components/widgets/Personalize";
import Dashboard from "@/components/widgets/Dashboard";

type Msg = { who: "navi" | "me"; text: string };
type Phase = "upload" | "parsing" | "enrich" | "details" | "q" | "analyzing" | "paths" | "deepdiveLoading" | "deepdive" | "personalize" | "planning" | "dashboard";

type Q =
  | { key: string; type: "single"; q: string; opts: { label: string; v: Partial<Answers> }[]; known?: boolean }
  | { key: string; type: "segmented"; q: string; opts: { label: string; v: Partial<Answers> }[] }
  | { key: string; type: "multi"; q: string; opts: { label: string; v: string }[]; max: number }
  | { key: string; type: "ai"; q: string };

const QS: Q[] = [
  {
    key: "goal", type: "single", q: "First — what are you really here for?",
    opts: [
      { label: "💰  Make more money", v: { goal: "earn", intent: "grow" } },
      { label: "🔁  Switch out of my current job or field", v: { goal: "switch", intent: "switch" } },
      { label: "📈  Grow & level up where I am", v: { goal: "grow", intent: "grow" } },
      { label: "🧭  Explore what's possible for me", v: { goal: "explore", intent: "unsure" } },
    ], known: true,
  },
  {
    key: "priorities", type: "multi", max: 2, q: "What matters most to you right now? (pick up to 2)",
    opts: [
      { label: "Higher pay", v: "pay" }, { label: "Faster growth", v: "growth" },
      { label: "Work–life balance", v: "balance" }, { label: "More impact & ownership", v: "impact" },
      { label: "Job security", v: "security" }, { label: "Learning something new", v: "learning" },
    ],
  },
  {
    key: "timeline", type: "segmented", q: "When do you want to make the move?",
    opts: [{ label: "3–4 months", v: { timeline: "3-4" } }, { label: "6–8 months", v: { timeline: "6-8" } }, { label: "12+ months", v: { timeline: "12+" } }],
  },
  {
    key: "risk", type: "segmented", q: "How big a leap are you up for?",
    opts: [{ label: "Safe & steady", v: { risk: "safe" } }, { label: "Balanced", v: { risk: "balanced" } }, { label: "Go bold", v: { risk: "bold" } }],
  },
  { key: "goodDay", type: "ai", q: "Last one — what does a great work day actually look like for you?" },
];

const STEPS = ["Profile", "Goals", "Paths", "Deep dive", "Plan"];
function stepFor(p: Phase): number {
  if (["upload", "parsing", "enrich", "details"].includes(p)) return 0;
  if (p === "q") return 1;
  if (["analyzing", "paths"].includes(p)) return 2;
  if (["deepdiveLoading", "deepdive"].includes(p)) return 3;
  return 4;
}

export default function Chat() {
  const [phase, setPhase] = useState<Phase>("upload");
  const [mode, setMode] = useState<"demo" | "live">("live");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [source, setSource] = useState<"llm" | "engine" | "vision">("engine");
  const [sessionId, setSessionId] = useState("");
  const [answers, setAnswers] = useState<Answers>({});
  const [qi, setQi] = useState(0);
  const [multiSel, setMultiSel] = useState<string[]>([]);
  const [paths, setPaths] = useState<CareerPath[]>([]);
  const [closing, setClosing] = useState<string | null>(null);
  const [showCompare, setShowCompare] = useState(false);
  const [dashView, setDashView] = useState<"plan" | "chat">("plan");
  const [dashTab, setDashTab] = useState<"roadmap" | "jobs">("roadmap");
  const [moreLoading, setMoreLoading] = useState(false);
  const [selPath, setSelPath] = useState<CareerPath | null>(null);
  const [dive, setDive] = useState<DeepDiveT | null>(null);
  const [plan, setPlan] = useState<PlanResult | null>(null);
  const [drag, setDrag] = useState(false);
  const [knownOpen, setKnownOpen] = useState(false);
  const [ctc, setCtc] = useState("");
  const [busy, setBusy] = useState(false);
  const [profileSaving, setProfileSaving] = useState(false);
  const [error, setError] = useState("");
  const [retry, setRetry] = useState<null | (() => void)>(null);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [profileNote, setProfileNote] = useState("");
  const askRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const initRef = useRef(false);

  // Read entry mode: ?mode=demo auto-runs the sample candidate; ?mode=live shows upload.
  useEffect(() => {
    if (initRef.current) return; initRef.current = true;
    const m = new URLSearchParams(window.location.search).get("mode");
    if (m === "demo") { setMode("demo"); onSample(); }
    else setMode("live");
  }, []);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, phase, paths]);
  const say = (who: "navi" | "me", text: string) => setMsgs((m) => [...m, { who, text }]);
  const sayNavi = (text: string, delay = 350) => { setTyping(true); setTimeout(() => { setTyping(false); say("navi", text); }, delay); };

  // POST helper that throws on network failure or non-2xx so callers can recover gracefully.
  async function jpost(url: string, body: unknown): Promise<any> {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    if (!r.ok) { let m = `Request failed (${r.status})`; try { const j = await r.json(); if (j?.error) m = j.error; } catch {} throw new Error(m); }
    return r.json();
  }
  // Record a recoverable failure: stop the spinner, show the message, and remember how to retry.
  function fail(message: string, retryFn: () => void) {
    setTyping(false);
    setError(message || "Something went wrong. Please try again.");
    setRetry(() => retryFn);
  }
  function doRetry() { const fn = retry; setError(""); setRetry(null); fn?.(); }

  async function parse(form: FormData) {
    setError("");
    setPhase("parsing");
    const res = await fetch("/api/parse-resume", { method: "POST", body: form }).then((r) => r.json()).catch(() => ({ error: "Network error" }));
    if (res.error) { setError(res.error); setPhase("upload"); return; }
    setProfile(res.profile); setSessionId(res.sessionId); setSource(res.source || "engine");
    setPhase("details");
  }
  function onFile(file?: File) {
    if (!file) return;
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) { setError("Please upload a PDF résumé."); return; }
    if (file.size > 8 * 1024 * 1024) { setError("Please keep the PDF under 8 MB."); return; }
    setMode("live"); const fd = new FormData(); fd.append("file", file); parse(fd);
  }
  function onSample() { setMode("demo"); const fd = new FormData(); fd.append("sampleText", SAMPLE_RESUME); parse(fd); }
  function onPortfolio() {
    if (!portfolioUrl.trim()) { setError("Add a public portfolio URL first."); return; }
    setMode("live");
    const fd = new FormData();
    fd.append("portfolioUrl", portfolioUrl.trim());
    parse(fd);
  }

  async function startChat() {
    if (!profile || profileSaving) return;
    setProfileSaving(true); setError("");
    const saved = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, profile }),
    }).then((r) => r.json()).catch(() => ({ error: "Could not save your profile. Please try again." }));
    setProfileSaving(false);
    if (saved.error) { setError(saved.error); return; }
    const p = saved.profile as Profile;
    setProfile(p);
    const first = p.name.split(" ")[0];
    const journey = p.roles.slice(0, 4).map((r) => r.company).filter(Boolean).reverse().join(" → ");
    const recall = `${p.headlineTitle}${p.headlineCompany ? ` at ${p.headlineCompany}` : ""} · ${p.totalYearsLabel}`;
    say("navi", `Hey ${first} — solid journey.${journey ? ` ${journey}.` : ""} You're ${recall}${p.metrics[0] ? `, and the numbers back it: "${p.metrics[0]}"` : ""}. I read your real history, not a template.`);
    setTimeout(() => sayNavi(QS[0].q, 500), 500);
    setPhase("q");
  }

  function saveProfileNote() {
    const note = profileNote.trim();
    setAnswers((current) => ({ ...current, profileNote: note || undefined }));
    setPhase("details");
  }

  function advance(label: string, v: Partial<Answers>) {
    say("me", label);
    const next = { ...answers, ...v };
    setAnswers(next);
    const ni = qi + 1;
    setMultiSel([]); setKnownOpen(false);
    if (ni < QS.length) { setQi(ni); sayNavi(QS[ni].q, 450); }
    else runAnalyze(next);
  }
  function submitKnown(role: string) {
    if (role.trim().length < 2) return;
    advance(`I already know it: ${role}`, { knownRole: role.trim(), intent: "known" });
  }
  function toggleMulti(v: string, max: number) {
    setMultiSel((cur) => cur.includes(v) ? cur.filter((x) => x !== v) : cur.length >= max ? cur : [...cur, v]);
  }
  function submitMulti(opts: { label: string; v: string }[]) {
    if (!multiSel.length) return;
    const labels = opts.filter((o) => multiSel.includes(o.v)).map((o) => o.label).join(" & ");
    advance(labels, { priorities: multiSel });
  }

  async function runAnalyze(a: Answers) {
    setPhase("analyzing"); setError(""); setRetry(null);
    try {
      const res = await jpost("/api/analyze", { sessionId, answers: a });
      setPaths(res.paths);
      say("navi", res.tension);
      setTimeout(() => sayNavi("Here are the paths I see — open each, or tap Compare to see all three side by side.", 500), 500);
      setPhase("paths");
    } catch (e) {
      fail(`I couldn't map your paths just now — ${(e as Error).message}`, () => runAnalyze(a));
    }
  }

  async function suggestMore() {
    setMoreLoading(true);
    const shown = paths.map((p) => p.title);
    try {
      const res = await jpost("/api/analyze", { sessionId, mode: "more", shown });
      if (res.paths?.length) setPaths((cur) => [...cur, ...res.paths]);
      setClosing(res.closing || null);
    } catch {
      setClosing("Couldn't load more roles right now — try again in a moment.");
    } finally {
      setMoreLoading(false);
    }
  }

  // "None of these fit" escape: name your own target and re-run the gap map / math / plan on it.
  async function nameOwnRole(role: string) {
    if (role.trim().length < 2) return;
    const a = { ...answers, knownRole: role.trim(), intent: "known" };
    setAnswers(a);
    setClosing(null);
    say("me", `None of those quite fit — I'm aiming for: ${role.trim()}`);
    await runAnalyze(a);
  }

  async function pickPath(id: string) {
    const p = paths.find((x) => x.id === id)!;
    setShowCompare(false);
    setSelPath(p);
    setError(""); setRetry(null);
    if (msgs[msgs.length - 1]?.text !== `Let's go deeper on: ${p.title}`) say("me", `Let's go deeper on: ${p.title}`);
    setPhase("deepdiveLoading");
    try {
      const res = await jpost("/api/deepdive", { sessionId, pathId: id });
      setDive(res); setPhase("deepdive");
    } catch (e) {
      fail(`I couldn't load the deep dive — ${(e as Error).message}`, () => pickPath(id));
    }
  }

  function toPersonalize() {
    sayNavi("Last thing before your plan — a few constraints so the roadmap and the math fit your real life.", 300);
    setPhase("personalize");
  }
  async function checkCtc(expected: number): Promise<CtcGuidance> {
    try { return await jpost("/api/ctc", { sessionId, pathId: selPath!.id, expectedCTC: expected }); }
    catch { return { ok: true, realisticMax: expected, median: expected, low: expected, note: "Couldn't check that just now — you can still continue." }; }
  }
  async function buildPlan(a: Answers) {
    const merged = { ...answers, ...a, ...(parseFloat(ctc) > 0 ? { currentCTC: parseFloat(ctc) } : {}) };
    setAnswers(merged);
    setPhase("planning"); setError(""); setRetry(null);
    try {
      const res = await jpost("/api/plan", { sessionId, pathId: selPath!.id, answers: merged });
      setPlan(res);
      say("navi", `Here's your plan for ${selPath!.title}. First — the question that actually matters: is it worth it? The math is right at the top.`);
      setDashTab("roadmap"); setDashView("plan");
      setPhase("dashboard");
    } catch (e) {
      fail(`I couldn't build your plan — ${(e as Error).message}`, () => buildPlan(a));
    }
  }

  async function ask() {
    const q = askRef.current?.value?.trim(); if (!q) return;
    const history = msgs.slice(-8).map((m) => ({ role: m.who === "me" ? "user" : "navi", text: m.text }));
    say("me", q); askRef.current!.value = ""; setBusy(true);
    try { const res = await jpost("/api/ask", { sessionId, question: q, history }); say("navi", res.answer); }
    catch { say("navi", "Sorry, I couldn't answer that just now. Mind trying again?"); }
    finally { setBusy(false); }
  }

  const cur = QS[qi];
  const aiSuggestions = profile ? goodDayChips(profile) : [];
  const gapLabel = selPath ? `${(profile?.headlineTitle.split(" ").slice(-1)[0]) || "You"} → ${selPath.title.split("–").slice(-1)[0].trim()}` : "Your gap";
  const step = stepFor(phase);
  const completion = completionFor(phase);
  const chatActive = !["upload", "parsing", "details", "enrich"].includes(phase);

  const messageList = (
    <>
      {msgs.map((m, i) => (
        <div className={`msg ${m.who === "me" ? "me" : ""}`} key={i}>
          {m.who === "navi" && <span className="av">N</span>}
          <div className="col">
            {m.who === "navi" && <span className="who-lbl">Navi</span>}
            <div className="bubble">{renderMessage(m.text)}</div>
          </div>
        </div>
      ))}
      {typing && <div className="msg"><span className="av">N</span><div className="bubble"><span className="typing"><i /><i /><i /></span></div></div>}
    </>
  );
  const retryCard = retry ? (
    <div className="retry-card">
      <div className="retry-msg"><span>⚠</span>{error || "Something went wrong."}</div>
      <button className="btn block" onClick={doRetry}>Try again</button>
    </div>
  ) : null;

  return (
    <div className="chat-shell">
      {/* desktop context sidebar */}
      <aside className={`chat-side ${chatActive ? "profile-live" : ""}`}>
        <div className="side-brand"><span className="logo">N</span> Navi<span className="plus">+</span></div>
        {profile && (
          <div className="side-profile">
            <div className="side-doodle" aria-hidden="true"><i>✦</i><b>↝</b><i>✧</i></div>
            <div className="sp-name">{profile.name}</div>
            <div className="sp-role">{profile.headlineTitle}{profile.headlineCompany ? ` · ${profile.headlineCompany}` : ""}</div>
            <div className="sp-tags"><span>{profile.totalYearsLabel}</span><span>{profile.skills.length} skills</span>{source !== "engine" && <span className="ai">{source === "vision" ? "AI-scanned" : "AI-parsed"}</span>}</div>
            <div className="sp-progress">
              <div><span>Career profile</span><b>{completion}%</b></div>
              <div className="sp-progress-bar"><i style={{ width: `${completion}%` }} /></div>
              <small>{completion < 65 ? "A sharper profile creates sharper paths." : completion < 100 ? "Your direction is taking shape." : "Your plan is ready to act on."}</small>
            </div>
          </div>
        )}
        <div className="side-steps">
          {STEPS.map((s, i) => (
            <div className={`side-step ${i === step ? "on" : i < step ? "done" : ""}`} key={s}>
              <span className="ss-dot">{i < step ? "✓" : i + 1}</span>{s}
            </div>
          ))}
        </div>
        {profile && chatActive ? (
          <div className="side-win">
            <span className="side-win-icon">✓</span>
            <div><b>First step, done.</b><small>You&apos;ve turned your experience into a career strategy.</small></div>
          </div>
        ) : <div className="side-foot">Your résumé → real paths → the math → a plan.</div>}
      </aside>

      {phase === "dashboard" && plan && dashView === "plan" ? (
        <main className="dash-main">
          <div className="dash-topbar">
            <button className="dash-back" onClick={() => setDashView("chat")}>← Chat with Navi</button>
            <span className="dash-topbar-t">Your plan</span>
          </div>
          <Dashboard plan={plan} pathTitle={selPath?.title || ""} gapLabel={gapLabel}
            tab={dashTab} onTab={setDashTab}
            onBook={() => { setDashView("chat"); say("me", `I'd like to book a 1:1 with ${plan.mentor.name}.`); sayNavi(`Great pick — ${plan.mentor.name} made this exact move and would pressure-test your numbers (they had a slot ${plan.mentor.slot}). **Heads up: this is a demo, so live booking isn't wired up yet.** In the real product this would open their calendar and confirm the time.`, 600); }}
            onPick={(k) => { setDashView("chat"); say("me", offerUserMsg(k, plan.mentor.name)); sayNavi(offerReply(k), 600); }}
            onChat={() => setDashView("chat")} />
        </main>
      ) : (
      <main className="chat-main">
        <div className="app">
          <ChatHeader onBack={() => { if (phase === "dashboard" && dashView === "chat") setDashView("plan"); else if (phase !== "upload") setPhase("upload"); }} />
          <div className="scroll">
            {phase === "dashboard" && dashView === "chat" && (
              <button className="view-plan-btn" onClick={() => setDashView("plan")}>← Back to your plan</button>
            )}
            {messageList}

            {phase === "upload" && (
              <div className="upload-wrap">
                {error && <div className="error-note">{error}</div>}
                <div className={`uploader ${drag ? "drag" : ""}`}
                  onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
                  onDragLeave={() => setDrag(false)}
                  onDrop={(e) => { e.preventDefault(); setDrag(false); onFile(e.dataTransfer.files[0]); }}>
                  <div className="ico">↑</div>
                  <div style={{ fontWeight: 700, marginBottom: 6 }}>Try it live — analyse your real work</div>
                  <p className="faint" style={{ fontSize: 13.5, marginBottom: 16 }}>Upload a PDF résumé or add a public portfolio. No phone number, no gate — value first.</p>
                  <label className="btn block" style={{ cursor: "pointer" }}>Upload my résumé (PDF)<input type="file" accept="application/pdf" hidden onChange={(e) => onFile(e.target.files?.[0])} /></label>
                  <div className="portfolio-row">
                    <input type="url" placeholder="https://yourportfolio.com" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} onKeyDown={(e) => e.key === "Enter" && onPortfolio()} />
                    <button className="btn ghost-light" onClick={onPortfolio}>Analyse link</button>
                  </div>
                  <button className="linkbtn" style={{ marginTop: 10 }} onClick={onSample}>or see the demo with a sample candidate →</button>
                </div>
              </div>
            )}

            {phase === "parsing" && <ResumeAnalysisLoader />}

            {phase === "enrich" && profile && (
              <ProfileEnrichment
                firstName={profile.name.split(" ")[0]}
                value={profileNote}
                onChange={setProfileNote}
                onContinue={saveProfileNote}
              />
            )}

            {phase === "details" && profile && (
              <div className="card">
                <div className="det-head">Confirm your details{mode === "demo" && <span className="tag solid" style={{ marginLeft: 10, verticalAlign: "middle" }}>Demo</span>}</div>
                <div className="det-sub">Fix anything the résumé parser misunderstood. Your recommendations use the saved version below.</div>
                <div className="profile-grid">
                  <label>Name<input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} /></label>
                  <label>Current role<input value={profile.headlineTitle} onChange={(e) => setProfile({ ...profile, headlineTitle: e.target.value })} /></label>
                  <label>Company<input value={profile.headlineCompany} onChange={(e) => setProfile({ ...profile, headlineCompany: e.target.value })} /></label>
                  <label>City<input value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} /></label>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "12px 0" }}>
                  <span className="tag">{profile.totalYearsLabel} experience</span>
                  <span className="tag">{profile.roles.length} roles</span>
                  <span className="tag">{profile.skills.length} skills</span>
                  {source !== "engine" && <span className="tag solid">{source === "vision" ? "AI-scanned" : "AI-parsed"}</span>}
                </div>
                <div className="field">
                  <label>Skills (comma separated)</label>
                  <input value={profile.skills.join(", ")} onChange={(e) => setProfile({ ...profile, skills: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                </div>
                <div className="roles-edit">
                  <div className="roles-edit-title">Experience</div>
                  {profile.roles.slice(0, 5).map((role, index) => (
                    <div className="role-edit" key={index}>
                      <input aria-label={`Role ${index + 1} title`} value={role.title} onChange={(e) => setProfile({
                        ...profile,
                        roles: profile.roles.map((item, i) => i === index ? { ...item, title: e.target.value } : item),
                      })} />
                      <input aria-label={`Role ${index + 1} company`} value={role.company} onChange={(e) => setProfile({
                        ...profile,
                        roles: profile.roles.map((item, i) => i === index ? { ...item, company: e.target.value } : item),
                      })} />
                    </div>
                  ))}
                </div>
                {profile.reconciledNote && <div className="reconcile"><span>✓</span><span>{profile.reconciledNote}</span></div>}
                <div className="field">
                  <label>Current CTC (optional · LPA)</label>
                  <input type="number" placeholder="e.g. 60 — for a tighter salary range" value={ctc} onChange={(e) => setCtc(e.target.value)} />
                </div>
                <button className={`tell-navi ${profileNote.trim() ? "done" : ""}`} onClick={() => setPhase("enrich")}>
                  <span className="tell-navi-art"><i>✦</i><b>N</b><i>〰</i></span>
                  <span className="tell-navi-copy">
                    <small>{profileNote.trim() ? "Extra context added" : "Your résumé tells us what you've done"}</small>
                    <strong>{profileNote.trim() ? "Anything else to add? Talk to Navi again" : "Got more to tell us? Talk to Navi"}</strong>
                    <em>{profileNote.trim() ? profileNote : "Share your ambitions, frustrations or dream work — type it or say it out loud."}</em>
                  </span>
                  <span className="tell-navi-arrow">{profileNote.trim() ? "Edit" : "→"}</span>
                </button>
                {error && <div className="error-note">{error}</div>}
                <button className="btn block" style={{ marginTop: 16 }} disabled={profileSaving} onClick={startChat}>{profileSaving ? "Saving…" : "Save profile → continue"}</button>
              </div>
            )}

            {phase === "q" && cur && !typing && <QuestionWidget
              q={cur} multiSel={multiSel} knownOpen={knownOpen} aiSuggestions={aiSuggestions}
              onSingle={(o) => advance(o.label, o.v)} onSegmented={(o) => advance(o.label, o.v)}
              onToggleMulti={toggleMulti} onSubmitMulti={submitMulti}
              onOpenKnown={() => setKnownOpen(true)} onSubmitKnown={submitKnown}
              onAi={(s) => advance(s, { goodDay: s })} />}

            {phase === "analyzing" && !retry && <Loader steps={["Scoring your fit", "Modelling roles from the catalogue", "Grounding the salary bands", "Finding your best options"]} />}

            {phase === "paths" && (
              <RoleAccordion paths={paths} onSelect={pickPath} onCompare={() => setShowCompare(true)} onSuggestMore={suggestMore} onNameRole={nameOwnRole} moreLoading={moreLoading} closing={closing} />
            )}

            {phase === "deepdiveLoading" && !retry && <Loader steps={["Diving into the role", "Matching companies hiring", "Mapping courses to your gaps"]} />}
            {phase === "deepdive" && dive && <DeepDive dive={dive} onBuild={toPersonalize} />}

            {phase === "personalize" && selPath && <Personalize pathTitle={selPath.title} onCheckCtc={checkCtc} onDone={buildPlan} />}

            {phase === "planning" && !retry && <Loader steps={["Researching programs", "Modelling your outcome", "Building your week-by-week", "Matching a mentor"]} />}

            {retryCard}

            <div ref={endRef} />
          </div>

          {phase === "dashboard" && dashView === "chat" && (
            <div className="composer">
              <div className="composer-in">
                <input ref={askRef} placeholder="Ask Navi+ anything…" onKeyDown={(e) => e.key === "Enter" && ask()} />
                <button className="btn" onClick={ask} disabled={busy}>{busy ? "…" : "Ask"}</button>
              </div>
            </div>
          )}
        </div>
      </main>
      )}

      {showCompare && <CompareModal paths={paths} onClose={() => setShowCompare(false)} onSelect={pickPath} />}
    </div>
  );
}

function QuestionWidget({ q, multiSel, knownOpen, aiSuggestions, onSingle, onSegmented, onToggleMulti, onSubmitMulti, onOpenKnown, onSubmitKnown, onAi }: {
  q: Q; multiSel: string[]; knownOpen: boolean; aiSuggestions: string[];
  onSingle: (o: { label: string; v: Partial<Answers> }) => void;
  onSegmented: (o: { label: string; v: Partial<Answers> }) => void;
  onToggleMulti: (v: string, max: number) => void; onSubmitMulti: (opts: { label: string; v: string }[]) => void;
  onOpenKnown: () => void; onSubmitKnown: (s: string) => void; onAi: (s: string) => void;
}) {
  if (q.type === "single") return (
    <div className="chips">
      {q.opts.map((o) => <button className="chip" key={o.label} onClick={() => onSingle(o)}><span className="radio" />{o.label}</button>)}
      {q.known && !knownOpen && <button className="chip dashed" onClick={onOpenKnown}>I already know my target role →</button>}
      {knownOpen && <input className="field" style={{ width: "100%" }} placeholder="Type your target role (e.g. VP Product, Commerce)…" autoFocus
        onKeyDown={(e) => e.key === "Enter" && onSubmitKnown((e.target as HTMLInputElement).value)} />}
    </div>
  );
  if (q.type === "segmented") return (
    <div className="seg">{q.opts.map((o) => <button className="seg-btn" key={o.label} onClick={() => onSegmented(o)}>{o.label}</button>)}</div>
  );
  if (q.type === "multi") return (
    <div className="chips">
      <div className="multi-grid">
        {q.opts.map((o) => <button className={`mchip ${multiSel.includes(o.v) ? "on" : ""}`} key={o.v} onClick={() => onToggleMulti(o.v, q.max)}>{o.label}</button>)}
      </div>
      <button className="btn block" style={{ marginTop: 12 }} disabled={!multiSel.length} onClick={() => onSubmitMulti(q.opts)}>Continue{multiSel.length ? ` (${multiSel.length})` : ""}</button>
    </div>
  );
  // ai
  return (
    <div className="chips">
      {aiSuggestions.map((s) => <button className="chip" key={s} onClick={() => onAi(s)}><span className="radio" />{s}</button>)}
      <input className="field" style={{ width: "100%" }} placeholder="…or type it in your own words"
        onKeyDown={(e) => { const v = (e.target as HTMLInputElement).value; if (e.key === "Enter" && v.trim().length > 1) onAi(v); }} />
    </div>
  );
}

function goodDayChips(p: Profile): string[] {
  const d = p.domain;
  return [
    `Going deep on one ${d.toLowerCase()} problem end-to-end, not context-switching`,
    `Shipping something where I can see the impact on real users`,
    `Solving the hard parts that need judgment, not just managing process`,
    `Setting the direction and getting people bought into it`,
  ];
}

// The message phrased as if the user tapped the dashboard CTA themselves.
function offerUserMsg(kind: string, mentorName: string): string {
  if (kind === "mba") return "Could an MBA be worth it for me? Walk me through it.";
  if (kind === "mentor") return `I'd like to pressure-test this with ${mentorName} — someone who made the exact move.`;
  if (kind === "courses") return "I want to close my top gaps with focused courses.";
  return "Can you help me rework my résumé around this target role?";
}

function offerReply(kind: string): string {
  if (kind === "mba")
    return "Smart to weigh it. An MBA mainly pays off for a step-change in level or a hard pivot — and it'd be fundable via Leap Finance (study-now-pay-later, no collateral). **Note: this is a demo — the live MBA shortlist + financing flow isn't built here.** In production I'd pull programs you'd realistically get into and a loan estimate against your numbers.";
  if (kind === "mentor")
    return "Good call — a 1:1 with someone who made this exact move is the fastest way to de-risk it. **Note: this is a demo, so real mentor matching + scheduling isn't wired up yet.** In production I'd match a verified mentor and book the call for you.";
  if (kind === "courses")
    return "Each course is mapped to a specific gap — start with the one that shows up most on the JDs you'll see in week 1. **Note: course enrolment isn't connected in this demo.** In production these would deep-link into Leap / Unacademy with your gaps pre-filled.";
  return "Worth doing — recruiters at this level scan for specific signals. **Note: the résumé-rework tool isn't built for this demo.** In production I'd generate a tailored draft around your target role's must-haves that you could edit and export.";
}

function renderMessage(text: string) {
  // Strip em dashes everywhere in chat (LLM replies often use them) → normalise to a comma.
  const clean = text.replace(/\s*—\s*/g, ", ");
  return clean.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index}>{part.slice(2, -2)}</strong>
      : part
  );
}

function completionFor(phase: Phase): number {
  if (phase === "upload" || phase === "parsing") return 10;
  if (phase === "details" || phase === "enrich") return 30;
  if (phase === "q" || phase === "analyzing") return 50;
  if (phase === "paths") return 68;
  if (phase === "deepdiveLoading" || phase === "deepdive") return 80;
  if (phase === "personalize" || phase === "planning") return 92;
  return 100;
}

function ResumeAnalysisLoader() {
  const messages = [
    "Reading your story, not just your job titles",
    "Finding proof of impact and transferable strengths",
    "Reconciling overlapping roles and career dates",
    "Mapping your experience to the roles you fit",
  ];
  const [message, setMessage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setMessage((current) => (current + 1) % messages.length), 1550);
    return () => clearInterval(timer);
  }, [messages.length]);
  return (
    <div className="analysis-stage" aria-live="polite">
      <div className="analysis-orbit" aria-hidden="true">
        <span className="orbit-dot d1" /><span className="orbit-dot d2" /><span className="orbit-dot d3" />
        <div className="analysis-logo"><span>N</span><i>✓</i></div>
        <div className="analysis-shadow" />
      </div>
      <div className="analysis-kicker">Building your career model</div>
      <div className="analysis-message" key={message}>{messages[message]}</div>
      <div className="analysis-progress"><i /></div>
      <p>Your résumé stays private and is used only to personalise this session.</p>
    </div>
  );
}

function ProfileEnrichment({ firstName, value, onChange, onContinue }: {
  firstName: string;
  value: string;
  onChange: (value: string) => void;
  onContinue: () => void;
}) {
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState("");
  const prompts = [
    "I want more ownership, not more meetings",
    "I’m underpaid for the work I already do",
    "I want to switch industries without starting over",
  ];

  function startListening() {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError("Voice input works in Chrome and other supported browsers.");
      return;
    }
    setVoiceError("");
    const startingValue = value;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-IN";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onerror = () => { setListening(false); setVoiceError("I couldn't hear that clearly. Try again or type instead."); };
    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results).map((result: any) => result[0].transcript).join(" ");
      onChange([startingValue, transcript].filter(Boolean).join(startingValue ? " " : ""));
    };
    recognition.start();
  }

  return (
    <div className="enrich-card">
      <div className="enrich-avatar">N</div>
      <div className="enrich-kicker">Talk to Navi</div>
      <div className="sheet-h">What should I know that your résumé doesn&apos;t say?</div>
      <p>Tell me what you want next, what you&apos;re tired of, or what kind of work makes you feel sharp. This will change the roles I recommend.</p>
      <div className="enrich-prompts">
        {prompts.map((prompt) => <button key={prompt} onClick={() => onChange(prompt)}>{prompt}</button>)}
      </div>
      <div className={`voice-box ${listening ? "listening" : ""}`}>
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={`Talk to me, ${firstName || "there"}… e.g. “I enjoy 0→1 work, but I don't want another high-burn startup.”`}
          rows={5}
        />
        <button className="mic-btn" type="button" onClick={startListening} aria-label="Dictate with your voice">
          <span>{listening ? "■" : "●"}</span>{listening ? " Listening…" : " Speak"}
        </button>
      </div>
      {voiceError && <div className="voice-error">{voiceError}</div>}
      <button className="btn block" onClick={onContinue}>{value.trim() ? "Add this to my profile →" : "Back to my profile →"}</button>
      <div className="enrich-foot">This context changes your recommendations. You can come back and edit it.</div>
    </div>
  );
}

function Loader({ steps }: { steps: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => Math.min(x + 1, steps.length)), 850); return () => clearInterval(t); }, [steps.length]);
  return (
    <div className="steps-load">
      {steps.map((s, idx) => (
        <div className={`step-load ${idx < i ? "done" : idx === i ? "active" : ""}`} key={s}>
          <span className="b">{idx < i ? "✓" : idx === i ? <span className="spin" /> : idx + 1}</span>{s}
        </div>
      ))}
    </div>
  );
}
