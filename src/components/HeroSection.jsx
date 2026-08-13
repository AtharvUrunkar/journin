import React from 'react';
import driftDashboard from '../assets/heroSection.svg';

/* Small inline icons — kept dependency-free so this drops straight into the
   existing project without adding lucide-react or any other package. */
const ArrowIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const ReportIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
    <path d="M14 3v5h5M9 13h6M9 17h6M9 9h2" />
  </svg>
);

export default function HeroSection() {
  const tags = [
    { label: 'IBKR', dot: 'bg-[#E8B24D]' },
    { label: 'TradingView', dot: 'bg-[#35D6A9]' },
    { label: 'Tradovate', dot: 'bg-[#9B8CFF]' },
    { label: 'Webull', dot: 'bg-[#E8B24D]' },
  ];

  const metrics = [
    { value: '$107K+', label: 'Net P&L tracked', trend: 'up' },
    { value: '61.2%', label: 'Win rate surfaced', trend: null },
    { value: '1.8R', label: 'Avg R-multiple', trend: 'up' },
    { value: '87/100', label: 'Edge score', trend: 'up' },
  ];

  return (
    <section className="drift-hero-scope relative overflow-hidden bg-[#FBF8F1] text-[#1B1F2C] pt-20 pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .drift-hero-scope {
          --ink: #1B1F2C;
          --surface: #FFFFFF;
          --line: rgba(27,31,44,0.09);
          --amber: #C9942F;
          --amber-bright: #E8B24D;
          --teal: #1FA983;
          --muted: #6B7280;
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
        .drift-hero-scope .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .drift-hero-scope .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        @keyframes dh-dash { to { stroke-dashoffset: -160; } }
        @keyframes dh-pulse { 0%, 100% { opacity: .45; transform: scale(1); } 50% { opacity: 1; transform: scale(1.25); } }
        @keyframes dh-float { 0%, 100% { transform: translateY(0) rotate(-1.1deg); } 50% { transform: translateY(-10px) rotate(-1.1deg); } }

        .dh-curve-line { stroke-dasharray: 10 14; animation: dh-dash 5s linear infinite; }
        .dh-node-pulse { animation: dh-pulse 2.2s ease-in-out infinite; }
        .dh-float { animation: dh-float 6s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .dh-curve-line, .dh-node-pulse, .dh-float { animation: none !important; }
        }
      `}</style>

      {/* Ambient warm gradient wash + a faint dot grid, in the product's own colors */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(rgba(27,31,44,0.06) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
      />
      <div className="absolute -top-32 left-[8%] w-[520px] h-[520px] bg-[#E8B24D]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-10 -right-24 w-[460px] h-[460px] bg-[#35D6A9]/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Signature element: the hero's own equity curve, arcing behind the whole
          section — the same gradient stops used inside the dashboard screenshot,
          so the marketing copy and the product feel like one continuous line. */}
      <svg
        className="absolute inset-x-0 top-0 w-full h-[520px] pointer-events-none opacity-70"
        viewBox="0 0 1400 520"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="dh-hero-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E8B24D" />
            <stop offset="65%" stopColor="#CFCB6E" />
            <stop offset="100%" stopColor="#35D6A9" />
          </linearGradient>
        </defs>
        <path
          d="M0,360 C160,320 260,410 380,380 C520,344 560,260 700,240 C840,220 900,300 1040,270 C1160,244 1240,160 1400,120"
          fill="none" stroke="url(#dh-hero-line)" strokeWidth="1.5" strokeOpacity="0.35"
        />
        <path
          d="M0,360 C160,320 260,410 380,380 C520,344 560,260 700,240 C840,220 900,300 1040,270 C1160,244 1240,160 1400,120"
          fill="none" stroke="url(#dh-hero-line)" strokeWidth="1.5" className="dh-curve-line"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Left: copy */}
          <div className="lg:col-span-5 space-y-7 text-left">

            <div className="inline-flex items-center gap-2.5 bg-[var(--surface)] border border-[var(--line)] px-4 py-1.5 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#1FA983] dh-node-pulse" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1FA983]" />
              </span>
              <span className="font-mono text-[11px] tracking-wide text-[var(--muted)]">
                LIVE JOURNAL &middot; 128,406 fills synced this month
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-semibold tracking-tight leading-[1.08] text-[#14161F]">
              Find the edge
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#C9942F] to-[#1FA983]">
                hiding in your trades.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-md">
              Drift turns every fill into a pattern you can see — win rate,
              R-multiples, and the setups quietly making or losing you money,
              surfaced automatically, no spreadsheet required.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button className="group inline-flex items-center gap-2 bg-[#14161F] hover:bg-[#262B3A] text-[#FBF8F1] font-semibold text-sm px-7 py-3.5 rounded-xl shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                Start journaling free
                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button className="inline-flex items-center gap-2 border border-[var(--line)] bg-white hover:border-[#1FA983]/50 text-[#1B1F2C] font-semibold text-sm px-6 py-3.5 rounded-xl transition-colors cursor-pointer">
                <ReportIcon className="w-4 h-4 text-[#1FA983]" />
                See a sample report
              </button>
            </div>

            <div className="pt-6 border-t border-[var(--line)] space-y-3">
              <div className="font-mono text-[11px] tracking-wider text-[var(--muted)] uppercase">
                Syncs straight from your broker
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 bg-white border border-[var(--line)] px-3 py-1.5 rounded-full text-xs font-medium text-[#3A3F4D] hover:border-black/15 transition-colors shadow-sm"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${tag.dot}`} />
                    {tag.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: the product itself — the dashboard screenshot, not a mockup
              built to represent it. It already carries its own floating cards
              (pattern insight, sync activity, edge score gauge), so it only
              needs a soft stage to land on. */}
          <div className="lg:col-span-7 relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-[#E8B24D]/15 via-transparent to-[#35D6A9]/15 blur-2xl rounded-[3rem] pointer-events-none" />
            <div className="dh-float relative">
              <img
                src={driftDashboard}
                alt="Drift trading dashboard showing the equity curve, win rate, R-multiple, and edge score for a trader's month"
                className="w-full h-auto drop-shadow-[0_40px_80px_rgba(20,22,31,0.25)]"
              />
            </div>
          </div>
        </div>

        {/* Bottom metrics strip — the same figures shown on the screenshot above,
            pulled out as a readout so the claim and the proof sit together. */}
        <div className="mt-16 pt-8 border-t border-[var(--line)] grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, idx) => (
            <div
              key={idx}
              className={`px-4 py-2 ${idx !== 0 ? 'md:border-l border-[var(--line)]' : ''}`}
            >
              <div className="flex items-center gap-1.5 font-mono text-2xl sm:text-3xl font-semibold text-[#14161F]">
                {m.value}
                {m.trend === 'up' && <span className="text-[#1FA983] text-sm">▲</span>}
              </div>
              <div className="font-mono text-[11px] text-[var(--muted)] uppercase tracking-wider mt-1">
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}