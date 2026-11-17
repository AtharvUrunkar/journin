import React, { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'drift-intro-seen';
const LOAD_DURATION_MS = 1200;
const EXIT_DURATION_MS = 450;

// 28 3D scattered trade points representing raw noisy fills
const INTRO_NODES = [
  { id: 0, x: -140, y: -45, z: 80, targetX: -140, targetY: 35, targetZ: 10, color: '#E05D52' },
  { id: 1, x: -120, y: 55, z: -60, targetX: -120, targetY: 32, targetZ: 8, color: '#7EB3F0' },
  { id: 2, x: -100, y: -65, z: 40, targetX: -100, targetY: 26, targetZ: 6, color: '#5C6478' },
  { id: 3, x: -80, y: 70, z: -30, targetX: -80, targetY: 18, targetZ: 4, color: '#E05D52' },
  { id: 4, x: -60, y: -30, z: 90, targetX: -60, targetY: 8, targetZ: 2, color: '#7EB3F0' },
  { id: 5, x: -40, y: 40, z: -80, targetX: -40, targetY: -2, targetZ: 0, color: '#5C6478' },
  { id: 6, x: -20, y: -75, z: 60, targetX: -20, targetY: -12, targetZ: -2, color: '#E05D52' },
  { id: 7, x: 0, y: 60, z: -40, targetX: 0, targetY: -20, targetZ: -4, color: '#7EB3F0' },
  { id: 8, x: 20, y: -50, z: 70, targetX: 20, targetY: -16, targetZ: -2, color: '#1FA983' },
  { id: 9, x: 40, y: 45, z: -50, targetX: 40, targetY: -6, targetZ: 0, color: '#5C6478' },
  { id: 10, x: 60, y: -60, z: 40, targetX: 60, targetY: 8, targetZ: 2, color: '#1FA983' },
  { id: 11, x: 80, y: 65, z: -70, targetX: 80, targetY: 20, targetZ: 4, color: '#E05D52' },
  { id: 12, x: 100, y: -35, z: 85, targetX: 100, targetY: 12, targetZ: 6, color: '#1FA983' },
  { id: 13, x: 120, y: 50, z: -35, targetX: 120, targetY: -8, targetZ: 8, color: '#1FA983' },
  { id: 14, x: 140, y: -55, z: 65, targetX: 140, targetY: -28, targetZ: 10, color: '#1FA983' },
  { id: 15, x: -130, y: 15, z: 20, targetX: -130, targetY: 34, targetZ: 9, color: '#7EB3F0' },
  { id: 16, x: -90, y: -10, z: -45, targetX: -90, targetY: 22, targetZ: 5, color: '#5C6478' },
  { id: 17, x: -50, y: 20, z: 35, targetX: -50, targetY: 3, targetZ: 1, color: '#7EB3F0' },
  { id: 18, x: -10, y: -25, z: -65, targetX: -10, targetY: -16, targetZ: -3, color: '#E05D52' },
  { id: 19, x: 30, y: 25, z: 50, targetX: 30, targetY: -11, targetZ: -1, color: '#1FA983' },
  { id: 20, x: 70, y: -15, z: -25, targetX: 70, targetY: 14, targetZ: 3, color: '#1FA983' },
  { id: 21, x: 110, y: 10, z: 45, targetX: 110, targetY: 2, targetZ: 7, color: '#1FA983' },
  { id: 22, x: 130, y: -20, z: -55, targetX: 130, targetY: -18, targetZ: 9, color: '#35D6A9' },
];

export default function SiteIntro({ children }) {
  const [phase, setPhase] = useState('checking'); // checking | intro | exiting | done
  const [percent, setPercent] = useState(0);
  const skippedRef = useRef(false);

  useEffect(() => {
    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let alreadySeen = false;
    try {
      alreadySeen = typeof window !== 'undefined' && window.sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      alreadySeen = false;
    }

    if (reducedMotion || alreadySeen) {
      setPhase('done');
      return;
    }

    setPhase('intro');

    const start = Date.now();
    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.round((elapsed / LOAD_DURATION_MS) * 100));
      setPercent(pct);
      if (pct >= 100) clearInterval(tick);
    }, 35);

    const finishTimer = setTimeout(() => {
      if (!skippedRef.current) beginExit();
    }, LOAD_DURATION_MS);

    function beginExit() {
      setPhase('exiting');
      try {
        window.sessionStorage.setItem(SESSION_KEY, '1');
      } catch {
        /* sessionStorage unavailable */
      }
      setTimeout(() => setPhase('done'), EXIT_DURATION_MS);
    }

    return () => {
      clearInterval(tick);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    if (phase !== 'intro') return;
    skippedRef.current = true;
    setPhase('exiting');
    try {
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // pass
    }
    setTimeout(() => setPhase('done'), EXIT_DURATION_MS);
  };

  const showOverlay = phase === 'intro' || phase === 'exiting';
  const contentRevealed = phase === 'exiting' || phase === 'done';
  const skipInstant = phase === 'done' && percent === 0;

  return (
    <div className="dh-intro-scope">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=JetBrains+Mono:wght@500;600;700&display=swap');
        .dh-intro-scope { position: relative; }
        .dh-intro-scope .font-display { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .dh-intro-scope .font-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }

        .dh-intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 200;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 32px;
          background: radial-gradient(ellipse at 50% 40%, #171B27 0%, #0A0D14 70%);
          transition: opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1), filter ${EXIT_DURATION_MS}ms ease;
        }
        .dh-intro-overlay[data-exiting="true"] {
          opacity: 0;
          transform: scale(1.05);
          filter: blur(8px);
          pointer-events: none;
        }

        /* 3D Viewport container */
        .dh-3d-scene {
          perspective: 900px;
          perspective-origin: 50% 45%;
          width: 340px;
          height: 180px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .dh-3d-world {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: dh-world-tilt 5s ease-in-out infinite alternate;
        }
        @keyframes dh-world-tilt {
          0% { transform: rotateY(-12deg) rotateX(10deg); }
          100% { transform: rotateY(12deg) rotateX(-8deg); }
        }

        /* Background ambient aura */
        .dh-intro-aura {
          position: absolute;
          inset: -20px;
          border-radius: 9999px;
          background: radial-gradient(ellipse at center, rgba(240,200,120,0.18) 0%, rgba(31,169,131,0.14) 45%, transparent 70%);
          filter: blur(40px);
        }

        /* 3D Scattered Trade Node Keyframes: Converging from random 3D space into the glowing equity curve */
        @keyframes dh-node-converge {
          0% {
            transform: translate3d(var(--rx), var(--ry), var(--rz)) scale(1);
            opacity: 0.7;
          }
          60%, 100% {
            transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(1.15);
            opacity: 1;
          }
        }

        .dh-3d-node {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 7px;
          height: 7px;
          margin-left: -3.5px;
          margin-top: -3.5px;
          border-radius: 9999px;
          animation: dh-node-converge 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          box-shadow: 0 0 10px 1px currentColor;
        }

        /* 3D Glowing Ribbon / Curve Mesh */
        .dh-3d-ribbon {
          position: absolute;
          inset: 0;
          transform-style: preserve-3d;
          opacity: 0;
          animation: dh-ribbon-glow 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
        }
        @keyframes dh-ribbon-glow {
          0%, 35% { opacity: 0; transform: scaleX(0.7) translateY(10px); }
          75%, 100% { opacity: 1; transform: scaleX(1) translateY(0); }
        }

        /* Page content reveal transition */
        .dh-intro-content {
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 600ms ease, transform 600ms ease;
        }
        .dh-intro-content[data-revealed="true"] {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .dh-world-tilt, .dh-3d-node, .dh-3d-ribbon { animation: none !important; }
          .dh-3d-node { transform: translate3d(var(--tx), var(--ty), var(--tz)) scale(1.1) !important; opacity: 1 !important; }
          .dh-3d-ribbon { opacity: 1 !important; }
          .dh-intro-content { transition: none !important; }
        }
      `}</style>

      {showOverlay && (
        <div className="dh-intro-overlay" data-exiting={phase === 'exiting'}>
          <div className="dh-3d-scene">
            <div className="dh-intro-aura" />

            <div className="dh-3d-world">
              {/* 3D Scattered Trade Nodes */}
              {INTRO_NODES.map((n) => {
                const style = {
                  '--rx': `${n.x}px`,
                  '--ry': `${n.y}px`,
                  '--rz': `${n.z}px`,
                  '--tx': `${n.targetX}px`,
                  '--ty': `${n.targetY}px`,
                  '--tz': `${n.targetZ}px`,
                  color: n.color,
                  backgroundColor: n.color,
                };
                return <div key={n.id} className="dh-3d-node" style={style} />;
              })}

              {/* Glowing SVG 3D Ribbon Arcing Across */}
              <div className="dh-3d-ribbon">
                <svg viewBox="0 0 340 180" className="w-full h-full">
                  <defs>
                    <linearGradient id="dh-intro-ribbon-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#7EB3F0" stopOpacity="0.8" />
                      <stop offset="50%" stopColor="#2C5FBD" stopOpacity="0.95" />
                      <stop offset="100%" stopColor="#1FA983" stopOpacity="0.9" />
                    </linearGradient>
                    <filter id="dh-intro-glow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="4" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>
                  <path
                    d="M 30,125 C 70,122 110,108 150,75 C 190,45 230,105 270,82 C 290,70 310,50 320,40"
                    fill="none"
                    stroke="url(#dh-intro-ribbon-grad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    filter="url(#dh-intro-glow)"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 z-10">
            <div className="font-display text-sm font-bold tracking-[0.2em] text-[#F2F0EA] uppercase">
              DRIFT
            </div>
            <div className="font-sans text-[11px] font-semibold text-[#8E96AB] uppercase tracking-wide flex items-center gap-2">
              <span>ALIGNING EXECUTION FILLS</span>
              <span className="font-mono text-[#7EB3F0] font-bold">{percent}%</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSkip}
            className="absolute bottom-7 right-7 font-sans text-[11px] font-semibold uppercase tracking-wide text-[#5C6478] hover:text-[#F2F0EA] transition-colors cursor-pointer"
          >
            Skip →
          </button>
        </div>
      )}

      <div className="dh-intro-content" data-revealed={contentRevealed || skipInstant}>
        {children}
      </div>
    </div>
  );
}