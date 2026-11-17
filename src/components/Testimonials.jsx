import React, { useState, useRef } from 'react';
import { useInView } from '../hooks/useInView';

const QuoteIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#7EB3F0]/40">
    <path
      d="M10 11H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4zm0 0c0 4-2 6-5 7m14-7h-4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v4zm0 0c0 4-2 6-5 7"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TESTIMONIALS = [
  {
    quote: "Drift isolated that my afternoon NQ trades were destroying all the profits generated during the opening 45 minutes. Closing the screen at 11 AM instantly turned my monthly curve positive.",
    name: "Marcus V.",
    role: "ES & NQ Order Flow Trader • 4 years active",
    metric: "+1.92R Avg Setup Expectancy",
  },
  {
    quote: "Manual journals were always biased by how I felt after a session. Having raw broker fills reconstruct my exact slippage on market orders showed me I was giving away $350 every week to FOMO.",
    name: "Elena S.",
    role: "Options & Equity Scalper • 6 years active",
    metric: "-78% Slippage Drag",
  },
  {
    quote: "The Monte Carlo simulation gave me the statistical conviction to size up on my A+ setups while ruthlessly cutting lower-tier discretionary trades. It's the most objective tool I've used.",
    name: "Devon K.",
    role: "Prop Firm Funded Trader • 3 accounts passed",
    metric: "94/100 Playbook Score",
  },
  {
    quote: "Being able to unify my Tradovate futures ledger and IBKR swing equity account into one consolidated expectancy book saved hours of manual spreadsheet bookkeeping every weekend.",
    name: "Tariq H.",
    role: "Multi-Asset Discretionary Trader • 5 years active",
    metric: "4 Broker Feeds Synced",
  },
  {
    quote: "Drift proved that widening my stop on opening range breaks decreased my win rate but doubled my total R-multiple. Finding that single mathematical asymmetry transformed my annual PnL.",
    name: "Julian R.",
    role: "Systematic Breakout Trader • 7 years active",
    metric: "+2.45R Profit Factor",
  },
  {
    quote: "I used to blame the market for sudden drawdowns until Drift's tilt radar flagged that 90% of my red days came after taking a 3rd contract scale-in on a losing position.",
    name: "Sophie C.",
    role: "Nasdaq Micro & Futures Scalper • 3 years active",
    metric: "0 Revenge Blowouts",
  },
  {
    quote: "The execution replay exposed that my limit orders on high-volatility opens were saving an average of 18 cents per share over market fills. That alone paid for Drift 50x over.",
    name: "Liam B.",
    role: "Swing Equities & Earnings Specialist • 8 years active",
    metric: "+$4,120 Saved Slippage",
  },
  {
    quote: "Reconstructing multi-leg funding rates and partial scale-outs across accounts used to be impossible. Drift automates the math in real time with millisecond precision.",
    name: "Amara P.",
    role: "Crypto Derivatives & Momentum Trader • 4 years active",
    metric: "68.5% Playbook Win Rate",
  },
];

export default function Testimonials() {
  const [sectionRef, isInView] = useInView({ threshold: 0.15 });
  const [paused, setPaused] = useState(false);
  const resumeTimerRef = useRef(null);

  const handleCardMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const handleTouchStart = () => {
    setPaused(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
    }
  };

  const handleTouchEnd = () => {
    resumeTimerRef.current = setTimeout(() => {
      setPaused(false);
    }, 3000);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 dh-reveal ${isInView ? 'dh-in-view' : ''}`}
          style={{ transitionDelay: '0ms' }}
        >
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#0E795D] bg-[#1FA983]/15 border border-[#1FA983]/30 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1FA983]" />
              TRADER TELEMETRY
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#14161C]">
              Objective data,{' '}
              <span className="text-[#2C5FBD]">zero hindsight bias.</span>
            </h2>
          </div>

          {/* Tier 3 Recessed Badge */}
          <div className="font-sans text-xs font-medium tracking-wide text-[#5C6478] dh-tier-3 px-4 py-2 rounded-lg inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1FA983] animate-pulse" />
            <span>EARLY BETA COHORT &bull; ANONYMIZED FEEDBACK</span>
          </div>
        </div>
      </div>

      {/* Horizontal Continuous Auto-Scroll Marquee Track */}
      <div
        className={`relative w-full overflow-hidden group select-none py-2 dh-reveal ${
          isInView ? 'dh-in-view' : ''
        }`}
        style={{ transitionDelay: '120ms' }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Left & Right Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#FAF7F2] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#FAF7F2] to-transparent z-20 pointer-events-none" />

        {/* Continuous Looping Track */}
        <div
          className="flex gap-6 w-max animate-testimonials-marquee group-hover:[animation-play-state:paused] active:[animation-play-state:paused]"
          style={{ animationPlayState: paused ? 'paused' : undefined }}
        >
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={`${t.name}-${idx}`}
              onMouseMove={handleCardMouseMove}
              className="w-[340px] sm:w-[380px] flex-shrink-0 flex flex-col justify-between rounded-2xl dh-tier-2 dh-cursor-glow p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="space-y-4">
                <QuoteIcon />
                <p className="text-sm font-normal text-[#14161C]/90 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#14161C]/[0.06] space-y-3">
                <div>
                  <div className="font-display text-sm font-bold text-[#14161C]">
                    {t.name}
                  </div>
                  <div className="font-sans text-xs text-[#5C6478] font-normal mt-0.5">
                    {t.role}
                  </div>
                </div>

                {/* Tier 3 Metric Badge with Monospaced Statistical Figures */}
                <div className="font-mono text-[10.5px] text-[#0E795D] font-semibold bg-[#1FA983]/12 border border-[#1FA983]/25 px-2.5 py-1 rounded inline-block">
                  {t.metric}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
