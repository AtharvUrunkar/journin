import React, { useState, useEffect, useRef } from 'react';

// Fake but realistic equity-curve points (normalized 0-1 for both axes)
const CURVE_POINTS = [
  { x: 0, y: 0.62 },
  { x: 0.09, y: 0.58 },
  { x: 0.18, y: 0.66 },
  { x: 0.27, y: 0.52 },
  { x: 0.36, y: 0.60 },
  { x: 0.45, y: 0.44 },
  { x: 0.54, y: 0.50 },
  { x: 0.63, y: 0.34 },
  { x: 0.72, y: 0.40 },
  { x: 0.81, y: 0.22 },
  { x: 0.90, y: 0.28 },
  { x: 1, y: 0.12 },
];

const TRADE_ROWS = [
  { symbol: 'NQ', side: 'Long', r: '+2.4R', flag: null },
  { symbol: 'ES', side: 'Short', r: '+0.8R', flag: null },
  { symbol: 'GC', side: 'Long', r: '-1.6R', flag: 'Pattern: FOMO entry' },
  { symbol: 'CL', side: 'Short', r: '+1.1R', flag: null },
];

const CHART_W = 520;
const CHART_H = 180;

function buildPath(points, w, h) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${(p.x * w).toFixed(1)} ${(p.y * h).toFixed(1)}`)
    .join(' ');
}

function buildAreaPath(points, w, h) {
  const line = buildPath(points, w, h);
  const last = points[points.length - 1];
  const first = points[0];
  return `${line} L ${(last.x * w).toFixed(1)} ${h} L ${(first.x * w).toFixed(1)} ${h} Z`;
}

export default function DashboardMock() {
  const [drawn, setDrawn] = useState(false);
  const [countProgress, setCountProgress] = useState(0);
  const [rowsIn, setRowsIn] = useState(false);
  const pathRef = useRef(null);
  const wrapRef = useRef(null);
  const [pathLength, setPathLength] = useState(1200);

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setDrawn(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!drawn) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) {
      setCountProgress(1);
      setRowsIn(true);
      return;
    }

    let start = null;
    const duration = 1600;
    const step = (ts) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const progress = Math.min(elapsed / duration, 1);
      setCountProgress(1 - Math.pow(1 - progress, 3));
      if (progress < 1) requestAnimationFrame(step);
    };
    const id = requestAnimationFrame(step);

    const rowTimer = setTimeout(() => setRowsIn(true), 900);
    return () => {
      cancelAnimationFrame(id);
      clearTimeout(rowTimer);
    };
  }, [drawn]);

  const linePath = buildPath(CURVE_POINTS, CHART_W, CHART_H);
  const areaPath = buildAreaPath(CURVE_POINTS, CHART_W, CHART_H);
  const equity = (142380 + countProgress * 3120).toFixed(0);
  const equityDisplay = Number(equity).toLocaleString('en-US');

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[620px] lg:max-w-none rounded-2xl bg-white border border-[#14161C]/[0.08] shadow-[0_20px_60px_-15px_rgba(20,22,28,0.18)] overflow-hidden"
    >
      {/* Minimal browser chrome */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#14161C]/[0.06] bg-[#FAF7F2]">
        <svg viewBox="0 0 24 24" fill="none" stroke="#5C6478" strokeWidth="1.75" className="w-3.5 h-3.5 shrink-0">
          <rect x="5" y="11" width="14" height="9" rx="1.5" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <div className="font-mono text-[11px] text-[#5C6478] bg-white border border-[#14161C]/[0.06] rounded-md px-2.5 py-1">
          app.drift.trade/journal
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Header row: equity + live badge */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="font-sans text-[11px] font-semibold text-[#5C6478] uppercase tracking-wide mb-1">
              Account equity
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#14161C] tabular-nums">
              ${equityDisplay}
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-[#14161C]/[0.08] rounded-full px-2.5 py-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-[#1FA983] animate-ping opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#1FA983]" />
            </span>
            <span className="font-sans text-[10px] font-semibold text-[#5C6478] uppercase tracking-wide">Live</span>
          </div>
        </div>

        {/* Equity curve */}
        <div className="relative -mx-1">
          <svg
            viewBox={`0 0 ${CHART_W} ${CHART_H}`}
            className="w-full h-auto"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="dm-line-gradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#2C5FBD" />
                <stop offset="100%" stopColor="#1FA983" />
              </linearGradient>
              <linearGradient id="dm-area-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1FA983" stopOpacity="0.16" />
                <stop offset="100%" stopColor="#1FA983" stopOpacity="0" />
              </linearGradient>
            </defs>

            <path
              d={areaPath}
              fill="url(#dm-area-gradient)"
              style={{
                opacity: drawn ? 1 : 0,
                transition: 'opacity 900ms ease-out 700ms',
              }}
            />

            <path
              ref={pathRef}
              d={linePath}
              fill="none"
              stroke="url(#dm-line-gradient)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: pathLength,
                strokeDashoffset: drawn ? 0 : pathLength,
                transition: 'stroke-dashoffset 1400ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />

            {CURVE_POINTS.filter((_, i) => i % 3 === 0 || i === CURVE_POINTS.length - 1).map((p, i) => (
              <circle
                key={i}
                cx={p.x * CHART_W}
                cy={p.y * CHART_H}
                r={i === 3 ? 4.5 : 3}
                fill={i === 3 ? '#1FA983' : '#FFFFFF'}
                stroke="#2C5FBD"
                strokeWidth="1.5"
                style={{
                  opacity: drawn ? 1 : 0,
                  transition: `opacity 400ms ease-out ${500 + i * 220}ms`,
                }}
              />
            ))}
          </svg>
        </div>

        {/* Recent fills */}
        <div className="mt-5 pt-4 border-t border-[#14161C]/[0.06]">
          <div className="font-sans text-[11px] font-semibold text-[#5C6478] uppercase tracking-wide mb-2.5">
            Recent fills
          </div>
          <div className="space-y-1.5">
            {TRADE_ROWS.map((row, i) => (
              <div
                key={row.symbol + i}
                className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 hover:bg-[#FAF7F2] transition-colors"
                style={{
                  opacity: rowsIn ? 1 : 0,
                  transform: rowsIn ? 'translateY(0px)' : 'translateY(8px)',
                  transitionProperty: 'opacity, transform',
                  transitionDuration: '500ms',
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                  transitionDelay: `${i * 90}ms`,
                }}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="font-mono text-xs font-bold text-[#14161C] w-9 shrink-0">{row.symbol}</span>
                  <span
                    className={`font-sans text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded shrink-0 ${
                      row.side === 'Long'
                        ? 'bg-[#1FA983]/10 text-[#0E795D]'
                        : 'bg-[#5C6478]/10 text-[#5C6478]'
                    }`}
                  >
                    {row.side}
                  </span>
                  {row.flag && (
                    <span className="font-sans text-[10.5px] text-[#C1443C] truncate">{row.flag}</span>
                  )}
                </div>
                <span
                  className={`font-mono text-xs font-bold shrink-0 tabular-nums ${
                    row.r.startsWith('-') ? 'text-[#C1443C]' : 'text-[#0E795D]'
                  }`}
                >
                  {row.r}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}