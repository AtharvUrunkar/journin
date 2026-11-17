import React from 'react';

/* =========================================================
   SETTINGS
   Copy and links live here. Change the hrefs to your real
   pages. Social icons only show once you add a link.
========================================================= */

const SIGNUP_HREF = '/signup';
const CONTACT_HREF = 'mailto:support@journin.com'; // TODO: your real support address

const CARD = {
  titleTop: 'See the pattern before',
  titleBottom: 'it costs you again.',
  body: 'Connect your broker and see your trades, charges and habits in one place.',
  cta: 'Start my trade journal',
};

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#how-it-works' },
      { label: 'Brokers', href: '#brokers' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact us', href: CONTACT_HREF },
      { label: 'Log in', href: '/login' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
    ],
  },
];

const SOCIALS = [
  {
    name: 'X',
    href: '',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  },
  {
    name: 'LinkedIn',
    href: '',
    path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  },
  {
    name: 'Instagram',
    href: '',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z',
  },
];

const DISCLAIMER =
  'Journin is a journaling and analytics tool, not investment advice. Broker names and logos belong to their respective owners.';

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

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const socials = SOCIALS.filter((s) => s.href);
  const year = new Date().getFullYear();

  return (
    <div className="ft">
      <style>{`
        .ft,
        .ft * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        .ft {
          --ft-overlap: clamp(110px, 12vw, 150px);
          position: relative;
        }

        /* ---------- the card, sitting on the seam ---------- */

        .ft-top {
          display: flow-root;
          position: relative;
          z-index: 2;
          padding: 24px 24px 0;
          background: #f8faff;
        }

        .ft-card {
          position: relative;
          overflow: hidden;
          width: min(1000px, 100%);
          margin: 0 auto calc(var(--ft-overlap) * -1);
          padding: 64px 32px 68px;
          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 28px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(255, 255, 255, 0.95), transparent 60%),
            linear-gradient(180deg, #f4f8ff 0%, #dbe7ff 100%);
          box-shadow: 0 40px 80px -40px rgba(6, 28, 110, 0.45);
          text-align: center;
          color: #0b1a45;
        }

        /* soft colour glows rising from the bottom corners */
        .ft-card::before,
        .ft-card::after {
          content: '';
          position: absolute;
          z-index: 0;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .ft-card::before {
          left: -140px;
          bottom: -270px;
          background: rgba(31, 175, 205, 0.55);
        }

        .ft-card::after {
          right: -140px;
          bottom: -280px;
          background: rgba(104, 98, 245, 0.5);
        }

        .ft-card > * { position: relative; z-index: 1; }

        .ft-card-title span { display: block; }

        .ft-card-accent {
          background: linear-gradient(95deg, #2463eb 0%, #1fa3c9 60%, #16a765 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .ft-card-title {
          max-width: 640px;
          margin: 0 auto;
          font-size: clamp(30px, 4vw, 46px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.045em;
          text-wrap: balance;
        }

        .ft-card-body {
          max-width: 460px;
          margin: 18px auto 0;
          color: #4a5c80;
          font-size: 16.5px;
          line-height: 1.6;
          letter-spacing: -0.01em;
          text-wrap: pretty;
        }

        .ft-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 52px;
          margin-top: 30px;
          padding: 0 28px;
          border-radius: 13px;
          background: #2c63ca;
          color: #fff;
          font-size: 15px;
          font-weight: 620;
          letter-spacing: -0.01em;
          text-decoration: none;
          box-shadow: 0 1px 2px rgba(20, 48, 90, 0.14);
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
        }

        .ft-cta svg { width: 16px; height: 16px; transition: transform 0.2s ease; }

        .ft-cta:hover {
          background: #2055b7;
          transform: translateY(-1px);
          box-shadow: 0 12px 24px -8px rgba(39, 98, 202, 0.55);
        }

        .ft-cta:hover svg { transform: translateX(3px); }
        .ft-cta:focus-visible { outline: 2px solid #0b1a45; outline-offset: 3px; }

        /* ---------- blue footer ---------- */

        .ft-blue {
          position: relative;
          z-index: 1;
          overflow: hidden;
          padding: calc(var(--ft-overlap) + 56px) 24px 0;
          background: linear-gradient(180deg, #1560f5 0%, #0b45cf 45%, #082f9c 100%);
          color: #fff;
        }

        .ft-wordmark {
          width: min(1200px, 100%);
          margin: 0 auto;
          font-size: clamp(64px, 17.5vw, 250px);
          font-weight: 800;
          line-height: 0.82;
          letter-spacing: -0.055em;
          text-align: center;
          white-space: nowrap;
          user-select: none;
          background: linear-gradient(
            180deg,
            rgba(255, 255, 255, 0.3) 0%,
            rgba(255, 255, 255, 0.04) 85%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        .ft-main {
          width: min(1100px, 100%);
          margin: 56px auto 0;
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) repeat(3, minmax(0, 1fr));
          gap: 40px;
        }

        .ft-brand-name {
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        .ft-brand-text {
          max-width: 240px;
          margin: 12px 0 0;
          color: rgba(226, 235, 255, 0.78);
          font-size: 14px;
          line-height: 1.6;
        }

        .ft-col-title {
          margin: 0 0 16px;
          color: rgba(226, 235, 255, 0.62);
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.01em;
        }

        .ft-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ft-links a {
          color: #fff;
          font-size: 14.5px;
          font-weight: 500;
          text-decoration: none;
          opacity: 0.92;
          transition: opacity 0.2s ease;
        }

        .ft-links a:hover { opacity: 1; text-decoration: underline; text-underline-offset: 4px; }
        .ft-links a:focus-visible,
        .ft-social a:focus-visible {
          outline: 2px solid #fff;
          outline-offset: 3px;
          border-radius: 4px;
        }

        .ft-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          width: min(1100px, 100%);
          margin: 64px auto 0;
          padding: 24px 0 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(226, 235, 255, 0.72);
          font-size: 12.5px;
          line-height: 1.6;
        }

        .ft-bottom p { margin: 0; }
        .ft-disclaimer { max-width: 560px; }

        .ft-social {
          display: flex;
          gap: 10px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .ft-social a {
          display: grid;
          place-items: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          color: #fff;
          transition: background-color 0.2s ease;
        }

        .ft-social a:hover { background: rgba(255, 255, 255, 0.22); }
        .ft-social svg { width: 15px; height: 15px; fill: currentColor; }

        /* ---------- tablet and phone ---------- */

        @media (max-width: 860px) {
          .ft-main {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 36px 24px;
          }

          .ft-brand { grid-column: 1 / -1; }
        }

        @media (max-width: 640px) {
          .ft-top { padding: 16px 16px 0; }
          .ft-card { padding: 48px 22px 52px; border-radius: 22px; }
          .ft-cta { width: 100%; }
          .ft-blue { padding-left: 20px; padding-right: 20px; }
          .ft-main { grid-template-columns: repeat(2, minmax(0, 1fr)); }

          .ft-bottom {
            flex-direction: column;
            align-items: flex-start;
            margin-top: 48px;
          }
        }
      `}</style>

      {/* Card */}
      <div className="ft-top">
        <div className="ft-card">
          <h2 className="ft-card-title">
            <span>{CARD.titleTop}</span>
            <span className="ft-card-accent">{CARD.titleBottom}</span>
          </h2>
          <p className="ft-card-body">{CARD.body}</p>
          <a href={SIGNUP_HREF} className="ft-cta">
            <span>{CARD.cta}</span>
            <ArrowIcon />
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="ft-blue">
        <div className="ft-wordmark" aria-hidden="true">
          JOURNIN
        </div>

        <div className="ft-main">
          <div className="ft-brand">
            <div className="ft-brand-name">Journin</div>
            <p className="ft-brand-text">
              The trading journal that fills itself and shows you what to fix.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="ft-col-title">{col.title}</h3>
              <ul className="ft-links">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="ft-bottom">
          <div>
            <p>© {year} Journin. All rights reserved.</p>
            <p className="ft-disclaimer">{DISCLAIMER}</p>
          </div>

          {socials.length > 0 && (
            <ul className="ft-social">
              {socials.map((s) => (
                <li key={s.name}>
                  <a href={s.href} aria-label={s.name} target="_blank" rel="noreferrer">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </footer>
    </div>
  );
}