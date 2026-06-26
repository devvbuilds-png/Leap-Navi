import Link from "next/link";
import LandingMotion from "@/components/LandingMotion";

export default function Landing() {
  return (
    <>
      <LandingMotion />
      <nav className="lp-nav">
        <div className="lp-nav-row">
          <div className="brand"><span className="logo">N</span> Navi<span className="plus">+</span></div>
          <div className="right">
            <a className="linkbtn hide-sm" href="#how">How it works</a>
            <a className="linkbtn hide-sm" href="#stories">Stories</a>
            <Link className="btn sm" href="/chat?mode=live">Try it live</Link>
          </div>
        </div>
      </nav>

      {/* HERO - desktop two-column, periwinkle */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-eyebrow">AI Career Strategist · India</span>
            <h1>Find your next career move, <span className="ital">and the proof it pays.</span></h1>
            <p className="sub">Upload your résumé or share a portfolio. Navi+ reads your real history, finds the <b>3 roles you actually fit</b>, and shows the outcome math (the salary, the odds, the cost), then builds the plan to get there.</p>
            <div className="hero-cta">
              <Link className="btn lg" href="/chat?mode=live">Try it live with your résumé →</Link>
            </div>
            <span className="hero-note">2 min · no phone number · no gate · PDF, portfolio URL, or sample candidate</span>
            <div className="hero-trust">
              <span>✓ Real outcome math</span><span>✓ 3 paths, side by side</span><span>✓ Habit roadmap + mentors</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="oc-card">
              <div className="oc-eyebrow">Is this move worth it?</div>
              <div className="oc-row">
                <div><div className="oc-k">Today</div><div className="oc-v">₹8L</div></div>
                <div className="oc-arrow">→</div>
                <div><div className="oc-k">Target · median</div><div className="oc-v hot" data-hero-count data-from="8" data-to="16" data-prefix="₹" data-suffix="L">₹16L</div></div>
              </div>
              <div className="oc-bar"><i data-fill="72" style={{ width: "72%" }} /></div>
              <div className="oc-meta"><span><b>+100%</b> uplift</span><span><b>72%</b> confidence</span><span>range ₹13–19L</span></div>
              <div className="oc-foot">Grounded in India 2025-26 comp, not a vibe.</div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUE PROPS - why take the assessment */}
      <section className="section">
        <div className="sec-head reveal">
          <h2>Why take the assessment?</h2>
          <p className="lead">Most career advice is vibes. This is the one that hands you the numbers, and the next step.</p>
        </div>
        <div className="vp-grid">
          {VALUE_PROPS.map((v, i) => (
            <div className="vp reveal" key={v.t} style={{ transitionDelay: `${i * 70}ms` }}><div className="vp-ic">{v.ic}</div><h3>{v.t}</h3><p>{v.d}</p></div>
          ))}
        </div>
      </section>

      {/* OUTCOME STORIES - real before→after */}
      <section className="section tinted" id="stories">
        <div className="sec-head reveal">
          <h2>People who went beyond</h2>
          <p className="lead">Same starting point as you. Here&apos;s what the right move did for their number.</p>
        </div>
        <div className="story-grid">
          {STORIES.map((s, i) => (
            <div className="story reveal" key={s.name} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="story-top">
                <div className="story-av" style={{ background: s.color }}>{s.name[0]}</div>
                <div><div className="story-name">{s.name}</div><div className="story-role">{s.from} → {s.to}</div></div>
              </div>
              <div className="story-jump">
                <span className="sj-old">{s.before}</span><span className="sj-arrow">→</span><span className="sj-new">{s.after}</span>
                <span className="sj-pct">{s.pct}</span>
              </div>
              <div className="story-bar"><i style={{ "--w": `${Math.min(100, parseInt(s.pct, 10))}%` } as React.CSSProperties} /></div>
              <p className="story-how">{s.how}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section" id="how">
        <div className="sec-head reveal"><h2>How it works</h2><p className="lead">No phone gate, no interrogation. Value first, then the plan.</p></div>
        <div className="how-grid">
          <div className="how-list">
            <div className="how-step reveal"><div className="n">01</div><h3>Reads your résumé</h3><p>Skills, gaps & strengths from your real history, with dates reconciled and no phantom gaps.</p></div>
            <div className="how-step reveal" style={{ transitionDelay: "80ms" }}><div className="n">02</div><h3>Maps you to real roles & the math</h3><p>Three roles that actually fit, side by side, each with honest outcome math.</p></div>
            <div className="how-step reveal" style={{ transitionDelay: "160ms" }}><div className="n">03</div><h3>Builds your roadmap</h3><p>A habit-based plan, the companies you fit, live openings, and a matched mentor.</p></div>
          </div>
          <div className="phone reveal" style={{ transitionDelay: "120ms" }}>
            <div className="screen">
              <div className="mock-head"><div className="mock-bolt">⚡</div><div className="mock-title">Top Skills</div></div>
              <div className="chip-rows">
                <div className="chip-row"><div className="skbar" style={{ width: 110 }}><i style={{ width: 46 }} /></div><div className="skbar" style={{ flex: 1 }}><i style={{ width: 120 }} /></div></div>
                <div className="chip-row"><div className="skbar" style={{ flex: 1 }}><i style={{ width: 100 }} /></div><div className="skbar" style={{ width: 120 }}><i style={{ width: 70 }} /></div></div>
                <div className="chip-row"><div className="skbar amber" style={{ flex: 1 }}><i style={{ width: 90 }} /></div><div className="skbar amber" style={{ width: 130 }}><i style={{ width: 80 }} /></div></div>
              </div>
              <div className="mock-legend"><span><b style={{ color: "var(--indigo)" }}>■</b> have</span><span><b style={{ color: "var(--amber)" }}>■</b> to build</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="statband">
        <div className="statband-in reveal">
          <div className="stat"><b data-stat-count data-from="0" data-to="3">3</b><span>best-fit roles, side by side</span></div>
          <div className="stat"><b data-stat-count data-from="0" data-to="6">6</b><span>career domains</span></div>
          <div className="stat"><b>2025-26</b><span>India comp data</span></div>
          <div className="stat"><b data-stat-count data-from="0" data-to="4">4</b><span>paths: grow · switch · earn · explore</span></div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section">
        <div className="sec-head reveal"><h2>What users are saying</h2></div>
        <div className="tcards">
          {TESTIMONIALS.map((t, i) => (
            <div className="tcard reveal" key={t.name} style={{ transitionDelay: `${i * 70}ms` }}>
              <div className="q">“{t.q}”</div>
              <div className="who"><div className="av-img" style={{ background: t.color }}>{t.name[0]}</div><div><b>{t.name}</b><small>{t.role}</small></div></div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="finalcta">
        <h2 className="reveal">Your next move, with the numbers behind it.</h2>
        <p className="reveal" style={{ transitionDelay: "70ms" }}>Two minutes. No gate. See what you&apos;re really worth.</p>
        <div className="finalcta-row reveal" style={{ transitionDelay: "140ms" }}>
          <Link className="btn lg dark" href="/chat?mode=live">Try it live with your résumé →</Link>
        </div>
      </section>

      <div className="sticky-cta only-sm">
        <div className="in"><Link className="btn dark block" href="/chat?mode=live">Try it live →</Link></div>
      </div>
      <footer className="lp-foot">Navi+ · a working rebuild of LeapScholar&apos;s Navi with the teardown recommendations implemented</footer>
    </>
  );
}

const VALUE_PROPS = [
  { ic: "₹", t: "Know your real market value", d: "A grounded salary range for every move (low, median, high) from India 2025-26 comp data, not a guess." },
  { ic: "⚖", t: "Decide, don't just dream", d: "Three fitting roles side by side with match %, pay, time, and risk. The actual decision screen." },
  { ic: "🧭", t: "Go beyond your lane", d: "See where you can grow, switch, or earn more, across 6 career domains, mapped to your skills." },
  { ic: "✅", t: "A plan you'll follow", d: "Habit-based roadmap, courses mapped to your exact gaps, live job openings, and a mentor who made the move." },
];

const STORIES = [
  { name: "Priya", from: "Data Analyst", to: "Data Scientist", before: "₹8L", after: "₹16L", pct: "+100%", how: "Upskilled in SQL + ML over 6 months, shipped two portfolio projects, switched to a product company.", color: "linear-gradient(160deg,#6C5CE7,#9b8cff)" },
  { name: "Arjun", from: "Senior PM", to: "Director of Product", before: "₹38L", after: "₹72L", pct: "+89%", how: "Closed a P&L-ownership gap, did an MBA funded via Leap Finance, moved into a leadership role.", color: "linear-gradient(160deg,#0EA5E9,#22D3EE)" },
  { name: "Sara", from: "Support Lead", to: "Product Manager", before: "₹9L", after: "₹22L", pct: "+144%", how: "Used her domain depth to pivot into PM: a mentor-mapped switch, not a cold restart.", color: "linear-gradient(160deg,#16A34A,#4ADE80)" },
];

const TESTIMONIALS = [
  { name: "Kush", role: "Full Stack Dev @ Couchbase", q: "It clearly lays out jobs, salaries, prep timelines, and a real roadmap, superior to friends or ChatGPT.", color: "linear-gradient(160deg,#6C5CE7,#9b8cff)" },
  { name: "Tanushree", role: "Sr. Product Designer @ Honeywell", q: "Navi+ didn't just describe my résumé; it interpreted what I'd achieved, and showed me the math on the move.", color: "linear-gradient(160deg,#F59E0B,#FBBF24)" },
  { name: "Sakshi", role: "SDR @ PazCare", q: "First time I got a plan that felt made for me. Week 1 tasks are done. I can already see the direction.", color: "linear-gradient(160deg,#EC4899,#F472B6)" },
];
