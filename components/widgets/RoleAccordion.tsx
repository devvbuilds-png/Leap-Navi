"use client";
import { useState } from "react";
import type { CareerPath } from "@/lib/types";

// The 3 roles as accordion cards (matches Navi's "Here are the 3 roles for you").
// BEST MATCH pill, expand for Why-you-fit + Skills you have / Skills to build.
export default function RoleAccordion({
  paths, onSelect, onCompare, onSuggestMore, onNameRole, moreLoading, closing,
}: {
  paths: CareerPath[];
  onSelect: (id: string) => void;
  onCompare: () => void;
  onSuggestMore: () => void;
  onNameRole: (role: string) => void;
  moreLoading?: boolean;
  closing?: string | null;
}) {
  const [open, setOpen] = useState(paths[0]?.id);
  const [sel, setSel] = useState(paths.find((p) => p.bestMatch)?.id || paths[0]?.id);
  const [nameOpen, setNameOpen] = useState(false);
  const [roleInput, setRoleInput] = useState("");

  return (
    <div className="widget" style={{ marginTop: 6 }}>
      <div className="sheet-head">
        <div className="sheet-h" style={{ margin: 0 }}>Here are the {paths.length} roles for you</div>
        <button className="cmp-pill" onClick={onCompare} aria-label={`Compare all ${paths.length} roles`}>
          <span className="cmp-pill-ic">⚖</span> Compare all {paths.length}
        </button>
      </div>
      {paths.map((p) => {
        const isOpen = open === p.id;
        return (
          <div className={`path ${sel === p.id ? "sel" : ""}`} key={p.id}>
            <div className="path-h" onClick={() => { setOpen(isOpen ? "" : p.id); setSel(p.id); }}>
              <span className="nm">{p.title}</span>
              {p.bestMatch && <span className="best">Best match</span>}
              <span className="radio" />
            </div>
            {isOpen && (
              <div className="path-body">
                <div className="fitlbl">◆ Why you are a fit</div>
                <ul className="fit">{p.fit.slice(0, 3).map((f, i) => <li key={i}>{f}</li>)}</ul>
                <div className="skills">
                  <div className="col have">
                    <h5>✓ Skills you have</h5>
                    <ul>{p.skillsHave.slice(0, 5).map((s) => <li key={s}>{s}</li>)}</ul>
                  </div>
                  <div className="col build">
                    <h5>◎ Skills to build</h5>
                    <ul>{p.skillsBuild.map((s) => <li key={s.name}>{s.name}</li>)}</ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      {closing && <div className="cmp-verdict" style={{ marginTop: 4 }}>{closing}</div>}

      <button className="btn block" style={{ marginTop: 14 }} onClick={() => sel && onSelect(sel)}>Continue with selected role →</button>

      <div className="path-actions">
        <button className="linkbtn" onClick={onSuggestMore} disabled={moreLoading}>{moreLoading ? "Finding…" : "Suggest more roles"}</button>
        <span className="dot-sep">·</span>
        <button className="linkbtn" onClick={() => setNameOpen((v) => !v)}>None of these fit? Name your role</button>
      </div>
      {nameOpen && (
        <div className="name-role">
          <div className="name-role-h">Aiming for something specific? I&apos;ll run the same gap map, math, and plan against it.</div>
          <div className="name-role-in">
            <input value={roleInput} onChange={(e) => setRoleInput(e.target.value)} autoFocus
              placeholder="e.g. Head of Strategy, VP Growth, GM…"
              onKeyDown={(e) => { if (e.key === "Enter" && roleInput.trim().length > 1) onNameRole(roleInput.trim()); }} />
            <button className="btn" disabled={roleInput.trim().length < 2} onClick={() => onNameRole(roleInput.trim())}>Use this →</button>
          </div>
        </div>
      )}
    </div>
  );
}
