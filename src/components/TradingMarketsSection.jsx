import React, { useEffect, useRef, useState } from 'react';

/* =========================================================
   ASSETS
   These are the files in src/assets. If one of yours is .svg
   or .webp instead of .png, change the extension here and
   nothing else.
========================================================= */

import zerodhaLogo from '../assets/Zerodha.png';
import upstoxLogo from '../assets/upstox.png';
import angelLogo from '../assets/angelone.png';
import dhanLogo from '../assets/dhan.png';
import groww from '../assets/groww.png';
import iciciLogo from '../assets/icici.png';
import interactiveLogo from '../assets/interactive.png';
import mt5Logo from '../assets/mt5.png';

/* =========================================================
   SETTINGS
   Brokers, copy and links live here.
========================================================= */

const SIGNUP_HREF = '/signup';

const BROKERS = [
  { id: 'zerodha', name: 'Zerodha', mark: 'Z', logo: zerodhaLogo },
  { id: 'groww', name: 'Groww', mark: 'G', logo: groww },
  { id: 'upstox', name: 'Upstox', mark: 'U', logo: upstoxLogo },
  { id: 'icici', name: 'ICICI Direct', mark: 'IC', logo: iciciLogo },
  { id: 'angelone', name: 'Angel One', mark: 'A', logo: angelLogo },
  { id: 'interactive', name: 'Interactive Brokers', mark: 'IB', logo: interactiveLogo },
  { id: 'dhan', name: 'Dhan', mark: 'D', logo: dhanLogo },
  { id: 'mt5', name: 'MetaTrader 5', mark: 'MT5', logo: mt5Logo },
];

const COPY = {
  titleTop: 'Every broker.',
  titleBottom: 'One journal.',
  body:
    'Connect the account you already trade on. Your trades sync on their own, and the charges are worked out for every one.',
  cta: 'Connect your broker',
  footnote: 'Broker names and logos belong to their respective owners.',
};

const STATS = [
  { value: String(BROKERS.length), label: 'Brokers and platforms you can connect' },
  { value: '0', label: 'Trades typed by hand' },
  { value: 'Net', label: 'P&L after STT, fees and GST' },
];

/* seconds for one full turn of the ring */
const SPIN_SECONDS = 44;

/* =========================================================
   SMALL PIECES
========================================================= */

const ArrowIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.9"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Stats({ className }) {
  return (
    <dl className={className}>
      {STATS.map((stat) => (
        <div key={stat.label} className="bo-stat">
          <dt className="bo-stat-value">{stat.value}</dt>
          <dd className="bo-stat-label">{stat.label}</dd>
        </div>
      ))}
    </dl>
  );
}

/* =========================================================
   VISIBILITY
   seen:   true once the section has entered the screen
   active: true only while it is on screen, so the orbit
           can pause when nobody is looking
========================================================= */

function useVisibility() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      setActive(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, seen, active];
}

/* =========================================================
   BROKER ORBIT SECTION
========================================================= */

export default function BrokerOrbit() {
  const [sectionRef, seen, active] = useVisibility();
  const step = 360 / BROKERS.length;

  return (
    <section
      id="brokers"
      ref={sectionRef}
      className={`bo-section ${seen ? 'is-visible' : ''} ${active ? 'is-active' : ''}`}
    >
      <style>{`
        .bo-section,
        .bo-section * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        .bo-section {
          --bo-ink: #111827;
          --bo-muted: #596780;
          --bo-navy: #0c1a3f;

          /* Orbit size. Everything else is derived from it. */
          --bo-d: clamp(560px, 66vw, 960px);
          --bo-band: calc(var(--bo-d) * 0.165);
          --bo-tok: calc(var(--bo-band) * 0.56);
          --bo-spin: ${SPIN_SECONDS}s;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 720px;
          padding: 96px 0;

          /* Same side inset as the hero, so both read as one panel.
             Only the bottom corners are rounded here. */
          margin: 0 clamp(10px, 2vw, 28px);
          border-radius: 0 0 clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px);

          background:
            radial-gradient(ellipse at 6% 20%, rgba(69, 130, 255, 0.10), transparent 32%),
            #F8FAFF;
          color: var(--bo-ink);
        }

        /* =========================================================
           TEXT
        ========================================================= */

        .bo-inner {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          width: min(100%, 1200px);
          min-height: 528px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .bo-copy { max-width: 500px; }

        .bo-reveal {
          opacity: 0;
          transform: translate3d(0, 20px, 0);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: calc(var(--n, 0) * 90ms);
        }

        .bo-section.is-visible .bo-reveal {
          opacity: 1;
          transform: none;
        }

        .bo-title {
          margin: 0;
          font-size: clamp(38px, 4.8vw, 60px);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.048em;
        }

        .bo-title span { display: block; }

        .bo-title-accent {
          background: linear-gradient(95deg, #2463eb 0%, #1fa3c9 60%, #16a765 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .bo-body {
          margin: 22px 0 0;
          max-width: 440px;
          color: var(--bo-muted);
          font-size: 16.5px;
          line-height: 1.65;
          letter-spacing: -0.01em;
          text-wrap: pretty;
        }

        .bo-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 50px;
          margin-top: 28px;
          padding: 0 26px;
          border-radius: 12px;
          background: var(--bo-navy);
          color: #fff;
          font-size: 14.5px;
          font-weight: 620;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }

        .bo-cta svg { width: 16px; height: 16px; transition: transform 0.2s ease; }

        .bo-cta:hover {
          background: #16286a;
          transform: translateY(-1px);
          box-shadow: 0 12px 24px -10px rgba(12, 26, 63, 0.55);
        }

        .bo-cta:hover svg { transform: translateX(3px); }
        .bo-cta:focus-visible { outline: 2px solid var(--bo-navy); outline-offset: 3px; }

        .bo-footnote {
          margin: 30px 0 0;
          color: #8591a8;
          font-size: 12px;
        }

        /* =========================================================
           STATS
           Wide screens: inside the ring, like the reference.
           Smaller screens: under the button.
        ========================================================= */

        .bo-stat-value {
          margin: 0;
          font-size: 30px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.04em;
          font-variant-numeric: tabular-nums;
        }

        .bo-stat-label {
          margin: 6px 0 0;
          max-width: 170px;
          color: var(--bo-muted);
          font-size: 13px;
          line-height: 1.4;
        }

        .bo-stats-ring {
          position: absolute;
          z-index: 3;
          top: 50%;
          right: calc(var(--bo-d) * 0.015 + 28px);
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 26px;
          margin: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.9s ease 0.7s;
        }

        .bo-section.is-visible .bo-stats-ring { opacity: 1; }

        .bo-stats-inline {
          display: none;
          grid-template-columns: repeat(3, 1fr);
          gap: 0 16px;
          margin: 36px 0 0;
          padding: 22px 0 0;
          border-top: 1px solid rgba(17, 24, 39, 0.09);
        }

        /* =========================================================
           VISUAL AREA
           Covers the section, so the ring is cropped by its top,
           bottom and right edges.
        ========================================================= */

        .bo-visual {
          position: absolute;
          inset: 0;
          z-index: 1;
          overflow: hidden;
          pointer-events: none;
        }

        /* Wide screens: fade the ring out near the top edge so no broker
           token is ever sliced in half at the join with the hero. */
        @media (min-width: 901px) {
          .bo-visual {
            -webkit-mask-image: linear-gradient(180deg, transparent 0, #000 110px);
            mask-image: linear-gradient(180deg, transparent 0, #000 110px);
          }
        }

        .bo-orbit {
          position: absolute;
          width: var(--bo-d);
          height: var(--bo-d);
          right: calc(var(--bo-d) * -0.4);
          top: 52%;
          margin-top: calc(var(--bo-d) * -0.5);

          opacity: 0;
          transform: scale(0.96);
          transition:
            opacity 1s cubic-bezier(0.16, 1, 0.3, 1) 0.15s,
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.15s;
        }

        .bo-section.is-visible .bo-orbit { opacity: 1; transform: none; }

        .bo-ring-wrap {
          position: absolute;
          inset: 0;
          filter: drop-shadow(0 28px 40px rgba(30, 50, 100, 0.12));
        }

        .bo-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #f1f4fa 0%, #dde4f2 55%, #c9d4ea 100%);
          -webkit-mask: radial-gradient(
            circle closest-side,
            transparent calc(100% - var(--bo-band)),
            #000 calc(100% - var(--bo-band) + 1px)
          );
          mask: radial-gradient(
            circle closest-side,
            transparent calc(100% - var(--bo-band)),
            #000 calc(100% - var(--bo-band) + 1px)
          );
        }

        /* =========================================================
           TOKENS
           The ring turns clockwise, tokens turn back to stay upright.
        ========================================================= */

        .bo-spin {
          position: absolute;
          inset: 0;
          will-change: transform;
          animation: boSpin var(--bo-spin) linear infinite;
        }

        .bo-slot {
          position: absolute;
          inset: 0;
          transform: rotate(var(--a));
          opacity: 0;
          transition: opacity 0.9s ease calc(0.5s + var(--i) * 110ms);
        }

        .bo-section.is-visible .bo-slot { opacity: 1; }

        /* Curved motion smear, a short arc of the ring behind each token. */
        .bo-trail {
          position: absolute;
          inset: 0;
          background: conic-gradient(
            from -26deg,
            rgba(36, 99, 235, 0) 0deg,
            rgba(36, 99, 235, 0.22) 25deg,
            rgba(36, 99, 235, 0) 25.4deg
          );
          -webkit-mask: radial-gradient(
            circle closest-side,
            transparent calc(100% - var(--bo-band) * 0.82),
            #000 calc(100% - var(--bo-band) * 0.82 + 1px),
            #000 calc(100% - var(--bo-band) * 0.18),
            transparent calc(100% - var(--bo-band) * 0.18 + 1px)
          );
          mask: radial-gradient(
            circle closest-side,
            transparent calc(100% - var(--bo-band) * 0.82),
            #000 calc(100% - var(--bo-band) * 0.82 + 1px),
            #000 calc(100% - var(--bo-band) * 0.18),
            transparent calc(100% - var(--bo-band) * 0.18 + 1px)
          );
          filter: blur(calc(var(--bo-tok) * 0.17));
        }

        .bo-token {
          position: absolute;
          left: 50%;
          top: calc(var(--bo-band) / 2);
          width: var(--bo-tok);
          height: var(--bo-tok);
          margin: calc(var(--bo-tok) / -2) 0 0 calc(var(--bo-tok) / -2);
          transform: rotate(calc(var(--a) * -1));
          pointer-events: auto;
        }

        .bo-face {
          position: relative;
          width: 100%;
          height: 100%;
          animation: boSpinBack var(--bo-spin) linear infinite;
        }

        /* dark token with a white disc inside, so any logo reads clearly */
        .bo-chip {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          border: 1px solid #e1e8f5;
          border-radius: 50%;
          background: #fff;
          box-shadow:
            0 12px 26px -12px rgba(30, 64, 125, 0.28),
            0 1px 4px rgba(30, 64, 125, 0.08);
          transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bo-disc {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 50%;
          background: #fff;
        }

        .bo-disc img {
          width: 62%;
          height: 62%;
          object-fit: contain;
        }

        .bo-mark {
          color: var(--bo-navy);
          font-size: calc(var(--bo-tok) * 0.24);
          font-weight: 750;
          letter-spacing: -0.03em;
        }

        .bo-label {
          position: absolute;
          top: 100%;
          left: 50%;
          margin-top: 12px;
          padding: 6px 12px;
          border: 1px solid #e1e8f5;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 10px 22px -10px rgba(30, 64, 125, 0.3);
          color: var(--bo-ink);
          font-size: 12.5px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          transform: translate(-50%, 4px);
          transition: opacity 0.2s ease, transform 0.2s ease;
          pointer-events: none;
        }

        @keyframes boSpin { to { transform: rotate(360deg); } }
        @keyframes boSpinBack { to { transform: rotate(-360deg); } }

        /* Pause when off screen. */
        .bo-section:not(.is-active) .bo-spin,
        .bo-section:not(.is-active) .bo-face {
          animation-play-state: paused;
        }

        /* Hovering the ring pauses it, and hovering a token names it. */
        @media (hover: hover) and (pointer: fine) {
          .bo-orbit:hover .bo-spin,
          .bo-orbit:hover .bo-face {
            animation-play-state: paused;
          }

          .bo-token:hover .bo-chip { transform: scale(1.08); }

          .bo-token:hover .bo-label {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }

        .bo-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          margin: -1px;
          padding: 0;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        /* =========================================================
           NARROWER SCREENS
        ========================================================= */

        @media (max-width: 1180px) {
          .bo-stats-ring { display: none; }
          .bo-stats-inline { display: grid; max-width: 440px; }
          .bo-stat-value { font-size: 24px; }
          .bo-stat-label { font-size: 12.5px; }
        }

        @media (max-width: 900px) {
          .bo-section {
            --bo-d: min(130vw, 680px);
            min-height: 0;
            padding: 80px 0 0;
          }

          .bo-inner { min-height: 0; padding: 0 22px; }
          .bo-copy { max-width: 560px; }

          /* the top of the ring sits under the text */
          .bo-visual {
            position: relative;
            inset: auto;
            height: calc(var(--bo-d) * 0.56);
            margin-top: 36px;
          }

          .bo-orbit {
            right: auto;
            left: 50%;
            top: 0;
            margin-top: 0;
            margin-left: calc(var(--bo-d) * -0.5);
          }
        }

        @media (max-width: 640px) {
          /* match the hero's mobile inset and corner radius */
          .bo-section {
            margin: 0 8px;
            border-radius: 0 0 22px 22px;
            padding-top: 68px;
          }

          .bo-title { font-size: clamp(34px, 10vw, 46px); }
          .bo-body { font-size: 15px; }
          .bo-stat-value { font-size: 21px; }
          .bo-stat-label { font-size: 11.5px; }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .bo-spin,
          .bo-face { animation: none !important; }

          .bo-reveal,
          .bo-stats-ring,
          .bo-orbit,
          .bo-slot {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .bo-slot { transform: rotate(var(--a)) !important; }
        }
      `}</style>

      {/* Copy */}
      <div className="bo-inner">
        <div className="bo-copy">
          <h2 className="bo-title bo-reveal" style={{ '--n': 1 }}>
            <span>{COPY.titleTop}</span>
            <span className="bo-title-accent">{COPY.titleBottom}</span>
          </h2>

          <p className="bo-body bo-reveal" style={{ '--n': 2 }}>
            {COPY.body}
          </p>

          <a href={SIGNUP_HREF} className="bo-cta bo-reveal" style={{ '--n': 3 }}>
            <span>{COPY.cta}</span>
            <ArrowIcon />
          </a>

          <Stats className="bo-stats-inline bo-reveal" />

          <p className="bo-footnote bo-reveal" style={{ '--n': 5 }}>
            {COPY.footnote}
          </p>
        </div>
      </div>

      {/* Stats inside the ring (wide screens) */}
      <Stats className="bo-stats-ring" />

      {/* Ring and circling brokers */}
      <div className="bo-visual">
        <div className="bo-orbit" aria-hidden="true">
          <div className="bo-ring-wrap">
            <div className="bo-ring" />
          </div>

          <div className="bo-spin">
            {BROKERS.map((broker, index) => (
              <div
                key={broker.id}
                className="bo-slot"
                style={{ '--a': `${12 + index * step}deg`, '--i': index }}
              >
                <span className="bo-trail" />

                <div className="bo-token">
                  <div className="bo-face">
                    <div className="bo-chip">
                      <span className="bo-disc">
                        {broker.logo ? (
                          <img src={broker.logo} alt="" draggable={false} />
                        ) : (
                          <span className="bo-mark">{broker.mark}</span>
                        )}
                      </span>
                    </div>

                    <span className="bo-label">{broker.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ul className="bo-sr" aria-label="Supported brokers">
        {BROKERS.map((broker) => (
          <li key={broker.id}>{broker.name}</li>
        ))}
      </ul>
    </section>
  );
}