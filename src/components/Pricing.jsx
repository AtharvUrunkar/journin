import React, { useEffect, useRef, useState } from 'react';

/* =========================================================
   SETTINGS
   Prices, plan contents and links all live here, so you can
   change them without touching the layout below.

   The prices are a DRAFT to confirm (see notes in the chat):
   - Starter: free
   - Professional: 499 a month, 4,999 a year
   - Teams: custom, talk to us
========================================================= */

const SIGNUP_HREF = '/signup';
const CONTACT_HREF = '/contact';

const PROFESSIONAL_MONTHLY = 499;
const PROFESSIONAL_YEARLY = 4999;

const formatRupees = (amount) =>
  `\u20B9${new Intl.NumberFormat('en-IN').format(amount)}`;

const YEARLY_SAVING = PROFESSIONAL_MONTHLY * 12 - PROFESSIONAL_YEARLY;
const YEARLY_PER_MONTH = Math.round(PROFESSIONAL_YEARLY / 12);

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Try Journin with one broker account.',
    price: { kind: 'free', label: 'Free' },
    cta: 'Start free',
    featuresIntro: 'Includes',
    features: [
      '1 trading account',
      'Auto journal from MT5 or 7 Indian brokers',
      'Net P&L after STT, fees and GST',
      '3 file uploads a month',
      'Basic analytics',
      'Community access',
    ],
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'For active F&O and MT5 traders.',
    featured: true,
    badge: 'Most popular',
    price: { kind: 'paid' },
    cta: 'Start Professional',
    featuresIntro: 'Everything in Starter, plus',
    features: [
      'Up to 10 trading accounts',
      'Tax view and File tax',
      'Tradon AI, ask questions about your own trades',
      'Advanced reports and 2 years of data',
      'CSV and Excel export',
      'MT5 live trading and copy trading',
    ],
  },
  {
    id: 'teams',
    name: 'Teams',
    tagline: 'For coaches, communities and trading groups.',
    price: { kind: 'custom', label: 'Custom', note: 'Priced by number of accounts' },
    cta: 'Talk to us',
    featuresIntro: 'Everything in Professional, plus',
    features: [
      'Up to 50 accounts, more on request',
      'Risk limits per account',
      'White-label',
      'Custom AI training',
      'Uptime SLA',
      'Dedicated manager',
    ],
  },
];

/* =========================================================
   ICONS
========================================================= */

const CheckIcon = (props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...props}
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />
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

/* =========================================================
   REVEAL ON SCROLL
   Adds a class once the cards enter the screen.
========================================================= */

function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return undefined;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, inView];
}

/* =========================================================
   ROLLING PRICE
   When the amount changes, the old price rolls up and out while
   the new one rolls in from below.
========================================================= */

function RollingPrice({ text }) {
  const [state, setState] = useState({ current: text, previous: null, key: 0 });

  useEffect(() => {
    setState((existing) =>
      existing.current === text
        ? existing
        : { current: text, previous: existing.current, key: existing.key + 1 }
    );
  }, [text]);

  return (
    <span className="jn-price jn-roll">
      <span
        key={`current-${state.key}`}
        className={`jn-roll-cur ${state.key > 0 ? 'is-new' : ''}`}
      >
        {state.current}
      </span>

      {state.previous !== null ? (
        <span
          key={`previous-${state.key}`}
          className="jn-roll-prev"
          aria-hidden="true"
          onAnimationEnd={() =>
            setState((existing) => ({ ...existing, previous: null }))
          }
        >
          {state.previous}
        </span>
      ) : null}
    </span>
  );
}

/* =========================================================
   PRICING SECTION
========================================================= */

export default function PricingSection() {
  const [billing, setBilling] = useState('monthly');
  const [gridRef, gridVisible] = useInView();
  const [settled, setSettled] = useState(false);

  const isYearly = billing === 'yearly';

  // After the entrance finishes, hover effects switch to faster timings.
  useEffect(() => {
    if (!gridVisible) return undefined;

    const timer = window.setTimeout(() => setSettled(true), 1200);
    return () => window.clearTimeout(timer);
  }, [gridVisible]);

  // Moves the soft glow to follow the cursor inside a card.
  const handleCardMove = (event) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();

    card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    card.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  const getHref = (plan) => {
    if (plan.id === 'teams') return CONTACT_HREF;
    if (plan.id === 'starter') return `${SIGNUP_HREF}?plan=starter`;
    return `${SIGNUP_HREF}?plan=${plan.id}&billing=${billing}`;
  };

  const renderPrice = (plan) => {
    if (plan.price.kind === 'free' || plan.price.kind === 'custom') {
      return (
        <>
          <div className="jn-price-row">
            <span className="jn-price">{plan.price.label}</span>
          </div>
          <p className="jn-price-note">
            {plan.price.kind === 'free' ? 'No card needed' : plan.price.note}
          </p>
        </>
      );
    }

    return (
      <>
        <div className="jn-price-row">
          <RollingPrice
            text={formatRupees(
              isYearly ? PROFESSIONAL_YEARLY : PROFESSIONAL_MONTHLY
            )}
          />
          <span className="jn-price-unit">{isYearly ? '/ year' : '/ month'}</span>
        </div>
        <p className="jn-price-note">
          {isYearly
            ? `About ${formatRupees(YEARLY_PER_MONTH)} a month. You save ${formatRupees(
                YEARLY_SAVING
              )}.`
            : 'Billed monthly'}
        </p>
      </>
    );
  };

  return (
    <section id="pricing" className="jn-pricing">
      <style>{`

        /* =========================================================
           SECTION
        ========================================================= */

        .jn-pricing,
        .jn-pricing * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        /* Same background as the How it works section. */
        .jn-pricing {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          padding: 104px 24px 96px;
          background:
            radial-gradient(ellipse at 8% 18%, rgba(69, 130, 255, 0.10), transparent 32%),
            radial-gradient(ellipse at 92% 80%, rgba(75, 205, 185, 0.09), transparent 32%),
            #F8FAFF;
          color: #0B1530;
        }

        .jn-pricing-glow {
          position: absolute;
          z-index: -1;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(90px);
          opacity: 0.24;
          pointer-events: none;
        }

        .jn-pricing-glow-one { top: 22%; left: -250px; background: #B7CEFF; }
        .jn-pricing-glow-two { right: -250px; bottom: 8%; background: #B8F0E4; }

        .jn-pricing-inner {
          position: relative;
          width: min(100%, 1120px);
          margin: 0 auto;
        }

        .jn-pricing-head {
          max-width: 640px;
          margin: 0 auto;
          text-align: center;
        }

        .jn-pricing-title {
          margin: 0;
          font-size: clamp(32px, 4.4vw, 48px);
          font-weight: 680;
          line-height: 1.08;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .jn-pricing-sub {
          margin: 16px auto 0;
          max-width: 480px;
          color: #4A5670;
          font-size: 16.5px;
          line-height: 1.6;
          letter-spacing: -0.01em;
          text-wrap: pretty;
        }

        /* =========================================================
           BILLING TOGGLE
        ========================================================= */

        .jn-toggle-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 32px;
          flex-wrap: wrap;
        }

        .jn-toggle {
          position: relative;
          display: inline-grid;
          grid-template-columns: 1fr 1fr;
          padding: 4px;
          border: 1px solid rgba(15, 30, 70, 0.1);
          border-radius: 999px;
          background: #EDF2FB;
        }

        .jn-toggle-thumb {
          position: absolute;
          top: 4px;
          bottom: 4px;
          left: 4px;
          width: calc(50% - 4px);
          border-radius: 999px;
          background: #FFFFFF;
          box-shadow: 0 1px 3px rgba(10, 30, 80, 0.14);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .jn-toggle[data-billing="yearly"] .jn-toggle-thumb {
          transform: translateX(100%);
        }

        .jn-toggle-btn {
          position: relative;
          z-index: 1;
          min-width: 104px;
          height: 36px;
          padding: 0 18px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: #5A667E;
          font-size: 13.5px;
          font-weight: 560;
          letter-spacing: -0.01em;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .jn-toggle-btn[aria-pressed="true"] { color: #0B1530; }

        .jn-toggle-btn:focus-visible,
        .jn-plan-cta:focus-visible {
          outline: 2px solid #2C63CA;
          outline-offset: 3px;
        }

        .jn-toggle-save {
          padding: 6px 12px;
          border-radius: 999px;
          background: #E6F7F0;
          color: #0E7A55;
          font-size: 12.5px;
          font-weight: 600;
        }

        /* =========================================================
           CARDS
        ========================================================= */

        .jn-plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
          margin-top: 48px;
          align-items: stretch;
        }

        .jn-plan {
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 30px 28px 28px;
          border: 1px solid rgba(15, 30, 70, 0.1);
          border-radius: 24px;
          background: #FFFFFF;
          box-shadow: 0 1px 2px rgba(10, 30, 80, 0.04);
          isolation: isolate;

          opacity: 0;
          transform: translate3d(0, 24px, 0);
          transition:
            opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.7s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s ease;
        }

        .jn-plans.is-visible .jn-plan {
          opacity: 1;
          transform: none;
        }

        .jn-plans.is-visible .jn-plan:nth-child(2) { transition-delay: 90ms; }
        .jn-plans.is-visible .jn-plan:nth-child(3) { transition-delay: 180ms; }

        .jn-plan:hover {
          box-shadow: 0 22px 44px -26px rgba(10, 30, 80, 0.3);
        }

        .jn-plan-featured {
          border-color: transparent;
          background: linear-gradient(165deg, #0A1F66 0%, #123C9E 55%, #1F5BFF 130%);
          color: #FFFFFF;
          box-shadow: 0 30px 60px -28px rgba(20, 60, 170, 0.6);
        }

        .jn-plan-featured:hover {
          box-shadow: 0 36px 70px -26px rgba(20, 60, 170, 0.7);
        }

        .jn-plan-badge {
          position: absolute;
          top: 22px;
          right: 22px;
          padding: 5px 12px;
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.14);
          color: #FFFFFF;
          font-size: 12px;
          font-weight: 600;
        }

        .jn-plan-name {
          margin: 0;
          font-size: 18px;
          font-weight: 650;
          letter-spacing: -0.02em;
        }

        .jn-plan-tagline {
          margin: 6px 0 0;
          min-height: 40px;
          color: #5A667E;
          font-size: 14px;
          line-height: 1.5;
        }

        .jn-plan-featured .jn-plan-tagline { color: rgba(226, 236, 255, 0.82); }

        /* =========================================================
           PRICE
        ========================================================= */

        .jn-price-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-top: 22px;
        }

        .jn-price {
          font-size: 44px;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.045em;
          font-variant-numeric: tabular-nums;
        }

        .jn-price-unit {
          color: #5A667E;
          font-size: 14px;
          font-weight: 500;
        }

        .jn-plan-featured .jn-price-unit { color: rgba(226, 236, 255, 0.78); }

        .jn-price-note {
          min-height: 20px;
          margin: 8px 0 0;
          color: #5A667E;
          font-size: 13px;
        }

        .jn-plan-featured .jn-price-note { color: rgba(226, 236, 255, 0.78); }

        /* =========================================================
           BUTTON
        ========================================================= */

        .jn-plan-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          min-height: 50px;
          margin-top: 24px;
          border: 1px solid rgba(15, 30, 70, 0.16);
          border-radius: 12px;
          background: #FFFFFF;
          color: #0B1530;
          font-size: 14.5px;
          font-weight: 620;
          letter-spacing: -0.01em;
          text-decoration: none;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease,
            border-color 0.22s ease;
        }

        .jn-plan-cta:hover {
          transform: translateY(-1px);
          border-color: rgba(44, 99, 202, 0.5);
          background: #F5F8FF;
        }

        .jn-plan-cta svg {
          width: 16px;
          height: 16px;
          transition: transform 0.2s ease;
        }

        .jn-plan-cta:hover svg { transform: translateX(3px); }

        .jn-plan-featured .jn-plan-cta {
          border-color: transparent;
          background: #FFFFFF;
          color: #0A2A6B;
          box-shadow: 0 1px 2px rgba(5, 15, 50, 0.2);
        }

        .jn-plan-featured .jn-plan-cta svg { color: #2C63CA; }

        .jn-plan-featured .jn-plan-cta:hover {
          background: #FFFFFF;
          box-shadow: 0 10px 24px -6px rgba(5, 15, 50, 0.45);
        }

        .jn-plan-featured .jn-plan-cta:focus-visible { outline-color: #FFFFFF; }

        /* =========================================================
           FEATURES
        ========================================================= */

        .jn-plan-intro {
          margin: 28px 0 14px;
          padding-top: 22px;
          border-top: 1px solid rgba(15, 30, 70, 0.08);
          color: #5A667E;
          font-size: 13px;
          font-weight: 560;
        }

        .jn-plan-featured .jn-plan-intro {
          border-top-color: rgba(255, 255, 255, 0.18);
          color: rgba(226, 236, 255, 0.82);
        }

        .jn-features {
          display: grid;
          gap: 12px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .jn-feature {
          display: grid;
          grid-template-columns: 18px 1fr;
          gap: 10px;
          align-items: start;
          font-size: 14.5px;
          line-height: 1.45;
          letter-spacing: -0.01em;
        }

        .jn-feature svg {
          width: 18px;
          height: 18px;
          margin-top: 1px;
          color: #1FA383;
        }

        .jn-plan-featured .jn-feature svg { color: #6EE7C1; }

        /* =========================================================
           PRICE ROLL
        ========================================================= */

        .jn-roll {
          display: inline-grid;
          overflow: hidden;
          padding: 4px 0;
          margin: -4px 0;
        }

        .jn-roll-cur,
        .jn-roll-prev {
          grid-area: 1 / 1;
        }

        .jn-roll-cur.is-new {
          animation: jnRollIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .jn-roll-prev {
          pointer-events: none;
          animation: jnRollOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes jnRollIn {
          from { opacity: 0; transform: translateY(70%); }
          to { opacity: 1; transform: none; }
        }

        @keyframes jnRollOut {
          from { opacity: 1; transform: none; }
          to { opacity: 0; transform: translateY(-70%); }
        }

        /* "Save" tag gives one small pop when yearly is chosen. */
        .jn-toggle-save.is-pop {
          animation: jnPop 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        @keyframes jnPop {
          0% { transform: scale(0.92); }
          55% { transform: scale(1.08); }
          100% { transform: scale(1); }
        }

        /* =========================================================
           CHECK MARKS DRAW IN
           Each tick draws once, staggered by card and by row.
        ========================================================= */

        .jn-check path {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
        }

        .jn-plans.is-visible .jn-check path {
          animation: jnCheckDraw 0.5s cubic-bezier(0.22, 0.61, 0.36, 1) both;
          animation-delay: calc(420ms + var(--c, 0) * 90ms + var(--i, 0) * 70ms);
        }

        @keyframes jnCheckDraw {
          to { stroke-dashoffset: 0; }
        }

        /* =========================================================
           HOVER EFFECTS (only on devices that can hover)
        ========================================================= */

        /* Faster timings once the entrance has finished. */
        .jn-plans.is-settled .jn-plan,
        .jn-plans.is-settled .jn-plan:nth-child(2),
        .jn-plans.is-settled .jn-plan:nth-child(3) {
          transition:
            opacity 0.25s ease,
            transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.25s ease;
          transition-delay: 0ms;
        }

        .jn-plan::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: inherit;
          background: radial-gradient(
            380px circle at var(--mx, 50%) var(--my, 0%),
            rgba(44, 99, 202, 0.1),
            transparent 62%
          );
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        .jn-plan-featured::before {
          background: radial-gradient(
            380px circle at var(--mx, 50%) var(--my, 0%),
            rgba(255, 255, 255, 0.16),
            transparent 62%
          );
        }

        @media (hover: hover) and (pointer: fine) {
          /* A soft glow follows the cursor. */
          .jn-plan:hover::before { opacity: 1; }

          /* The two white cards rise slightly; the featured card stays put. */
          .jn-plans.is-visible .jn-plan:not(.jn-plan-featured):hover {
            transform: translate3d(0, -4px, 0);
            box-shadow: 0 26px 48px -26px rgba(10, 30, 80, 0.34);
          }

          /* The cards you are not pointing at step back a little. */
          .jn-plans.is-visible:has(.jn-plan:hover) .jn-plan:not(:hover) {
            opacity: 0.85;
          }
        }

        /* =========================================================
           FOOTNOTE
        ========================================================= */

        .jn-pricing-foot {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 6px 24px;
          margin-top: 36px;
          color: #5A667E;
          font-size: 13px;
          text-align: center;
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 960px) {
          .jn-plans {
            grid-template-columns: 1fr;
            max-width: 460px;
            margin-left: auto;
            margin-right: auto;
          }

          .jn-plan-featured { order: -1; }
          .jn-plan-tagline { min-height: 0; }
        }

        @media (max-width: 640px) {
          .jn-pricing { padding: 80px 18px 72px; }
          .jn-plan { padding: 26px 22px 24px; }
          .jn-price { font-size: 40px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .jn-plan {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .jn-roll-cur,
          .jn-toggle-save,
          .jn-toggle-thumb,
          .jn-plan-cta,
          .jn-plan::before {
            animation: none !important;
            transition: none !important;
          }

          .jn-roll-prev { display: none; }

          .jn-check path,
          .jn-plans.is-visible .jn-check path {
            animation: none !important;
            stroke-dashoffset: 0;
          }

          .jn-plan:hover { transform: none !important; }
          .jn-plans.is-visible:has(.jn-plan:hover) .jn-plan:not(:hover) {
            opacity: 1 !important;
          }
        }

      `}</style>

      <div className="jn-pricing-glow jn-pricing-glow-one" aria-hidden="true" />
      <div className="jn-pricing-glow jn-pricing-glow-two" aria-hidden="true" />

      <div className="jn-pricing-inner">
        <div className="jn-pricing-head">
          <h2 className="jn-pricing-title">Simple pricing, in rupees</h2>

          <p className="jn-pricing-sub">
            Start free with one account. Upgrade when you want tax, AI and more
            accounts.
          </p>

          <div className="jn-toggle-wrap">
            <div className="jn-toggle" data-billing={billing} role="group" aria-label="Billing period">
              <span className="jn-toggle-thumb" aria-hidden="true" />

              <button
                type="button"
                className="jn-toggle-btn"
                aria-pressed={!isYearly}
                onClick={() => setBilling('monthly')}
              >
                Monthly
              </button>

              <button
                type="button"
                className="jn-toggle-btn"
                aria-pressed={isYearly}
                onClick={() => setBilling('yearly')}
              >
                Yearly
              </button>
            </div>

            <span
              key={billing}
              className={`jn-toggle-save ${isYearly ? 'is-pop' : ''}`}
            >
              Save {formatRupees(YEARLY_SAVING)} a year
            </span>
          </div>
        </div>

        <div
          ref={gridRef}
          className={`jn-plans ${gridVisible ? 'is-visible' : ''} ${
            settled ? 'is-settled' : ''
          }`}
        >
          {PLANS.map((plan, planIndex) => (
            <article
              key={plan.id}
              className={`jn-plan ${plan.featured ? 'jn-plan-featured' : ''}`}
              style={{ '--c': planIndex }}
              onMouseMove={handleCardMove}
            >
              {plan.badge ? (
                <span className="jn-plan-badge">{plan.badge}</span>
              ) : null}

              <h3 className="jn-plan-name">{plan.name}</h3>
              <p className="jn-plan-tagline">{plan.tagline}</p>

              {renderPrice(plan)}

              <a href={getHref(plan)} className="jn-plan-cta">
                <span>{plan.cta}</span>
                <ArrowIcon />
              </a>

              <p className="jn-plan-intro">{plan.featuresIntro}</p>

              <ul className="jn-features">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={feature}
                    className="jn-feature"
                    style={{ '--i': featureIndex }}
                  >
                    <CheckIcon className="jn-check" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="jn-pricing-foot">
          <span>Secure payment by Razorpay</span>
          <span>Prices in rupees. Applicable taxes are shown at checkout.</span>
          <span>Tax figures are estimates, not tax advice.</span>
        </div>
      </div>
    </section>
  );
}