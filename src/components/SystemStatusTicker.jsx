import React from 'react';

const STATUS_ITEMS = [
  { label: 'INGESTION ENGINE', val: 'ONLINE (0.2ms LATENCY)', color: 'text-[#0E795D]', dot: 'bg-[#1FA983]' },
  { label: 'TICK PARSER', val: '1,420,891 FILLS MATCHED', color: 'text-[#1E4A94]', dot: 'bg-[#2C5FBD]' },
  { label: 'SLIPPAGE RADAR', val: '0 ERRORS DETECTED', color: 'text-[#0E795D]', dot: 'bg-[#1FA983]' },
  { label: 'MONTE CARLO SIMULATOR', val: 'READY (10,000 ITERATIONS)', color: 'text-[#1E4A94]', dot: 'bg-[#2C5FBD]' },
  { label: 'BROKER OAUTH BRIDGE', val: 'AES-256 ENCRYPTED', color: 'text-[#0E795D]', dot: 'bg-[#1FA983]' },
  { label: 'PLAYBOOK EVALUATOR', val: 'ACTIVE PROTOCOL v2.4', color: 'text-[#1E4A94]', dot: 'bg-[#2C5FBD]' },
];

export default function SystemStatusTicker({ className = '' }) {
  return (
    <div className={`w-full overflow-hidden py-5 select-none relative z-10 ${className}`}>
      {/* Top Hairline Trace with subtle gradient */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#14161C]/[0.08] to-transparent relative mb-3">
        <div className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#2C5FBD] opacity-75 blur-[1px] animate-[dh-dot-travel-x_8s_linear_infinite]" />
      </div>

      {/* Marquee Ticker Track */}
      <div className="relative w-full flex items-center overflow-hidden">
        {/* Left & Right Soft Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Strip */}
        <div className="flex shrink-0 items-center gap-8 animate-[ticker_35s_linear_infinite] will-change-transform">
          {[...STATUS_ITEMS, ...STATUS_ITEMS].map((item, idx) => (
            <div
              key={`${item.label}-${idx}`}
              className="flex items-center gap-2 font-sans text-[10.5px] uppercase tracking-wide text-[#5C6478] bg-[#FAF7F2] border border-[#14161C]/[0.06] px-3.5 py-1 rounded-full shadow-[0_1px_2px_rgba(20,22,28,0.02)] shrink-0"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
              <span className="text-[#14161C] font-semibold">{item.label}:</span>
              <span className={`font-mono font-medium ${item.color}`}>{item.val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hairline Trace */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#14161C]/[0.08] to-transparent relative mt-3" />

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ticker_35s_linear_infinite\\] {
            animation: none !important;
            transform: none !important;
          }
        }
      `}</style>
    </div>
  );
}
