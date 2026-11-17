import React, { useEffect, useId, useRef, useState } from 'react';

/* =========================================================
   SETTINGS
   Questions, copy and links live here.

   The answers are drafts. Please check each one against how
   Journin really works before you publish.
========================================================= */

const CONTACT_HREF = 'mailto:support@journin.com'; // TODO: your real support address or contact page

const COPY = {
  titleTop: 'Questions traders',
  titleBottom: 'ask before connecting.',
  body: 'Short answers about brokers, charges and your data. Anything missing is a message away.',
  cta: 'Still unsure? Email us',
};

const FAQS = [
  {
    q: 'Which brokers can I connect?',
    a: 'You can connect Zerodha, Groww, Upstox, ICICI Direct, Angel One, Interactive Brokers, Dhan and MetaTrader 5. Pick yours in the Broker connections page and your trades start to appear in the journal.',
  },
  {
    q: 'Do I have to type my trades in?',
    a: 'No. Once a broker is connected, your trades sync on their own. If you ever want to log something by hand, such as a trade from another account, you can add it with the Add trade button.',
  },
  {
    q: 'Is the P&L I see after charges?',
    a: 'Yes. Journin shows your net P&L after STT, brokerage fees and GST, so the number in your journal is closer to what actually reached your account, not just the gross figure on the contract note.',
  },
  {
    q: 'What does the AI coach do?',
    a: 'It reads your trade history and points out patterns, such as the hours you trade best or what tends to happen after back-to-back losses. It describes your own habits. It does not tell you what to buy or sell.',
  },
  {
    q: 'Is my broker data safe?',
    a: 'Your data is used only to build your own journal and is never shown to other traders. Connections are made through your broker’s official login. Add a line here about how you store data and what access you ask for.',
  },
  {
    q: 'Can I try it before I commit?',
    a: 'Yes. Use View a sample journal on the home page to look around with sample data, then connect your broker when you are ready. Add your plan and trial details here.',
  },
  {
    q: 'What if my broker is not on the list?',
    a: 'Write to us and tell us which one. Broker requests are how we decide what to connect next.',
  },
];

/* =========================================================
   ICONS
========================================================= */

const Chevron = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

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

/* hover-to-open only on devices that really hover (not touch screens) */
const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* =========================================================
   FAQ SECTION
========================================================= */

export default function FaqSection() {
  const [open, setOpen] = useState(0);
  const [seen, setSeen] = useState(false);
  const ref = useRef(null);
  const uid = useId();

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    if (typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return undefined;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setSeen(true);
      },
      { threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="faq"
      ref={ref}
      className={`faq-section ${seen ? 'is-visible' : ''}`}
    >
      <style>{`
        .faq-section,
        .faq-section * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        .faq-section {
          --faq-ink: #111827;
          --faq-muted: #596780;
          --faq-blue: #2865d4;
          --faq-border: #e1e8f5;

          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 110px 24px;
          background:
            radial-gradient(ellipse at 94% 12%, rgba(75, 205, 185, 0.09), transparent 32%),
            radial-gradient(ellipse at 4% 92%, rgba(69, 130, 255, 0.09), transparent 32%),
            #f8faff;
          color: var(--faq-ink);
        }

        .faq-inner {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 64px;
          align-items: start;
          width: min(1100px, 100%);
          margin: 0 auto;
        }

        /* ---------- left column ---------- */

        .faq-side {
          position: sticky;
          top: 120px;
        }

        .faq-reveal {
          opacity: 0;
          transform: translate3d(0, 18px, 0);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          transition-delay: calc(var(--n, 0) * 90ms);
        }

        .faq-section.is-visible .faq-reveal {
          opacity: 1;
          transform: none;
        }

        .faq-title {
          margin: 0;
          font-size: clamp(32px, 3.5vw, 46px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: -0.048em;
        }

        .faq-title span { display: block; white-space: nowrap; }

        .faq-title-accent {
          background: linear-gradient(95deg, #2463eb 0%, #1fa3c9 60%, #16a765 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .faq-body {
          max-width: 380px;
          margin: 22px 0 0;
          color: var(--faq-muted);
          font-size: 16px;
          line-height: 1.65;
          letter-spacing: -0.01em;
          text-wrap: pretty;
        }

        .faq-cta {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          min-height: 50px;
          margin-top: 28px;
          padding: 0 24px;
          border-radius: 12px;
          background: #2c63ca;
          color: #fff;
          font-size: 14.5px;
          font-weight: 620;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(20, 48, 90, 0.14);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
        }

        .faq-cta svg { width: 16px; height: 16px; transition: transform 0.2s ease; }

        .faq-cta:hover {
          background: #2055b7;
          transform: translateY(-1px);
          box-shadow: 0 10px 22px -8px rgba(39, 98, 202, 0.45);
        }

        .faq-cta:hover svg { transform: translateX(3px); }
        .faq-cta:focus-visible { outline: 2px solid var(--faq-blue); outline-offset: 3px; }

        /* ---------- list ---------- */

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .faq-item {
          border: 1px solid var(--faq-border);
          border-radius: 18px;
          background: #fff;
          transition: border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.25s ease;
        }

        .faq-item:hover { border-color: #cdd9ee; }

        .faq-item.is-open {
          border-color: rgba(40, 101, 212, 0.28);
          background: #fafcff;
          box-shadow: 0 18px 38px -26px rgba(39, 98, 202, 0.45);
        }

        .faq-q {
          all: unset;
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          width: 100%;
          padding: 20px 20px 20px 24px;
          cursor: pointer;
          color: var(--faq-ink);
          font-size: 16.5px;
          font-weight: 600;
          line-height: 1.4;
          letter-spacing: -0.02em;
          border-radius: 18px;
        }

        .faq-q:focus-visible {
          outline: 2px solid var(--faq-blue);
          outline-offset: 2px;
        }

        .faq-icon {
          flex-shrink: 0;
          display: grid;
          place-items: center;
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #edf2fc;
          color: var(--faq-blue);
          transition: background-color 0.18s ease, color 0.18s ease, transform 0.25s ease;
        }

        .faq-icon svg { width: 16px; height: 16px; }

        .faq-item.is-open .faq-icon {
          background: var(--faq-blue);
          color: #fff;
          transform: rotate(180deg);
        }

        .faq-a-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.26s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .faq-item.is-open .faq-a-wrap { grid-template-rows: 1fr; }

        .faq-a-clip { min-height: 0; overflow: hidden; }

        .faq-a {
          margin: 0;
          padding: 0 64px 24px 24px;
          color: var(--faq-muted);
          font-size: 15px;
          line-height: 1.7;
          letter-spacing: -0.005em;
          opacity: 0;
          transform: translateY(-3px);
          transition: opacity 0.18s ease, transform 0.26s ease;
        }

        .faq-item.is-open .faq-a {
          opacity: 1;
          transform: none;
        }

        /* ---------- tablet and phone ---------- */

        @media (max-width: 900px) {
          .faq-section { padding: 80px 20px; }

          .faq-inner {
            grid-template-columns: minmax(0, 1fr);
            gap: 40px;
          }

          .faq-side { position: static; }
        }

        @media (max-width: 640px) {
          .faq-title { font-size: clamp(28px, 8.2vw, 38px); }
          .faq-q { padding: 18px 16px 18px 18px; font-size: 15.5px; }
          .faq-a { padding: 0 18px 20px 18px; font-size: 14.5px; }
          .faq-cta { width: 100%; justify-content: center; }
        }

        /* ---------- reduced motion ---------- */

        @media (prefers-reduced-motion: reduce) {
          .faq-section *,
          .faq-section *::before,
          .faq-section *::after {
            transition: none !important;
          }

          .faq-reveal {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      <div className="faq-inner">
        <div className="faq-side">
          <h2 className="faq-title faq-reveal" style={{ '--n': 0 }}>
            <span>{COPY.titleTop}</span>
            <span className="faq-title-accent">{COPY.titleBottom}</span>
          </h2>

          <p className="faq-body faq-reveal" style={{ '--n': 1 }}>
            {COPY.body}
          </p>

          <a href={CONTACT_HREF} className="faq-cta faq-reveal" style={{ '--n': 2 }}>
            <span>{COPY.cta}</span>
            <ArrowIcon />
          </a>
        </div>

        <ul className="faq-list">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            const buttonId = `${uid}-q${i}`;
            const panelId = `${uid}-a${i}`;

            return (
              <li
                key={item.q}
                className={`faq-item ${isOpen ? 'is-open' : ''}`}
                onMouseEnter={() => canHover() && setOpen(i)}
              >
                <h3 style={{ margin: 0 }}>
                  <button
                    type="button"
                    id={buttonId}
                    className="faq-q"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onFocus={() => setOpen(i)}
                    onClick={() => setOpen(canHover() && isOpen ? i : isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon">
                      <Chevron />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className="faq-a-wrap"
                >
                  <div className="faq-a-clip">
                    <p className="faq-a">{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}