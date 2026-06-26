# Navi+ — AI Career Strategist (Part B)

A rebuild of LeapScholar's **Navi** with every teardown recommendation implemented. Same flow and feel — résumé → guided chat → 3 paths → deep dive → roadmap → dashboard — but it actually helps you **decide** (real outcome math, side-by-side comparison) and **act** (habit roadmap, matched mentors, companies you fit), and it converts users into Leap's products intelligently.

## Run it

```bash
cd navi-plus
npm install
cp .env.example .env            # SQLite + optional Anthropic key
npm run setup                   # prisma generate + db push + seed
npm run dev                     # http://localhost:3000
```

That's it — **works with no API key** (the deterministic engine powers everything).

### Turn on the real LLM intelligence (recommended)
Set an API key — in `.env` **or** exported in your shell. The provider is **auto-detected**:
**OpenAI is used if `OPENAI_API_KEY` is set, otherwise Anthropic.** Pin one with `LLM_PROVIDER`.
```
# OpenAI / ChatGPT (default if present)
OPENAI_API_KEY="sk-..."
OPENAI_MODEL="gpt-4o-mini"        # optional

# or Anthropic
ANTHROPIC_API_KEY="sk-ant-..."
ANTHROPIC_MODEL="claude-sonnet-4-6"  # optional

# LLM_PROVIDER="openai"           # optional: force a provider
```
With a key, the LLM does: **résumé/portfolio parsing** (PDF or public webpage text → structured, date-reconciled profile), **path generation** (3 grounded roles + a named tension), **deep-dive prose**, and **Ask Navi+** — JSON-mode is used for the structured calls. Every call falls back to the deterministic engine if the key is absent or a call fails, so the product never breaks. The "AI-parsed" tag on the profile screen tells you which ran.

## The flow (faithful to Navi, gate removed)
Landing → résumé upload, portfolio URL, or **Try with a sample résumé** → analysis loader → **Confirm details** (editable and persisted, reconciled-overlap note, optional CTC) → personalised opening + **named tension** → **guided chat** (answer-chips + "Let AI suggest" + free-text + "I already know my target role") → **3 roles** (accordion + **Compare all 3** + Suggest more) → **deep dive** (what it does / why ready NN% / what to learn / companies) → **personalise** (constraints + expected-CTC *guidance*) → **dashboard** (Roadmap | Jobs tabs, progress, outcome math, gap map, habit roadmap, named mentor, offers) → **Ask Navi+**.

## Architecture (pluggable by design)

| Layer | Where | What |
|---|---|---|
| **Frontend** | `app/`, `components/` | Faithful light Navi clone: mobile-app shell, dark in-flow header, accordion roles, Roadmap/Jobs tabs. ~12 components/widgets. |
| **Résumé ingestion** | `app/api/parse-resume`, `lib/ai.ts`, `lib/engine/parseProfile.ts` | `pdf-parse` → Claude structures it → **deterministic reconciliation guardrail** so there are never phantom gaps (engine-only fallback). |
| **Intelligence (LLM)** | `lib/ai.ts` | Claude-backed `parseResumeLLM`, `generatePathsLLM`, `deepDiveLLM`, `askNavi` — strict JSON, salary-bands injected as grounding. |
| **Intelligence (engine)** | `lib/engine/*` | Deterministic `analyze`/`outcome`/`deepdive`/`roadmap`/`conversion` — the guaranteed fallback **and** the salary/realism guardrail. |
| **Research data** | `data/` | Researched (India 2025-26): salary **bands with ranges**, 22 companies, 16 job openings, 15 mapped courses, 7 matched mentors. |
| **Database** | `prisma/`, `lib/db.ts` | SQLite (zero-setup). Seeds the KB (`Company`/`Job`/`Course`/`Mentor`) + stores sessions, plans, and **events** (the success metrics). |
| **APIs** | `app/api/*` | `parse-resume`, `analyze` (+ suggest-more), `deepdive`, `plan`, `ctc`, `jobs`, `ask`. |

## How each recommendation is implemented

| Teardown rec | In Navi+ |
|---|---|
| #1 Outcome math (the moat) | `OutcomeMath` widget + `lib/engine/outcome.ts` — range, probability, cost, stay-vs-switch. Surfaced as the hero, not a blocking error. |
| #2 Show the gap | `GapMap` widget — current→target with what closes each gap. |
| #3 Path comparison | `PathCompare` widget — all 3 side by side + verdict. The decision screen. |
| #4 Let the user lead | "I already know my target role" entry in the chat. |
| #5 Habits over courses | `HabitRoadmap` — daily reps with % progress; courses are one input. |
| #6 Map resources to gaps | Each `skillsBuild` item carries the exact course that closes it (`data/courses.ts`). |
| #8 Credible experts | `ExpertCard` — a named, matched mentor (`data/mentors.ts`). |
| #9 Validate profile | `parseProfile` reconciles concurrent/"Present" roles → one calm note, never a 4-modal gap loop. |
| #11 Earn the gate | No phone/OTP gate; value first. |
| Companies you fit | `CompaniesFit` widget + `data/companies.ts`, filtered to archetype + stage. |

## The money: conversion engine (`lib/engine/conversion.ts`)

Routes each user to the right next step, tied to the outcome math so conversion follows trust:

- **Short-term skill gap / quick switch** → Unacademy courses + résumé rework
- **Decision moment (always)** → matched 1:1 mentor
- **Long horizon / pivot / needs credential / high upside** → **MBA → Leap Finance** (the high-LTV acquisition)

Every offer is framed against the user's own numbers (e.g. "fund the jump your +30% target needs").

## Measuring it
`Event` rows (resume_parsed, paths_generated, path_picked, outcome_viewed, offer_shown, ask_navi, …) are the teardown's success metrics, captured from day one. North Star: **activated plans** — users who reach a roadmap and take a real first action.

## Production next steps
Swap SQLite→Postgres; replace the deterministic salary model with Leap's real earning-potential model; wire the LLM for résumé parsing + path generation (engine becomes the guardrail/fallback); real auth; real course/mentor/MBA inventory + booking.
