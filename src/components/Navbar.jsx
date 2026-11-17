import React, { useCallback, useEffect, useRef, useState } from 'react';

/* =========================================================
   SETTINGS
   Change these to match your app.
========================================================= */

const SIGN_IN_HREF = '/login';
const CTA_HREF = '#pricing';
const CTA_LABEL = 'Get started';

const NAV_ITEMS = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'FAQ', href: '#faq' },
];

/* =========================================================
   ICONS
========================================================= */

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

const MenuIcon = (props) => (
  <svg {...iconProps} {...props}>
    <line x1="4" y1="8" x2="20" y2="8" />
    <line x1="4" y1="16" x2="20" y2="16" />
  </svg>
);

const CloseIcon = (props) => (
  <svg {...iconProps} {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ArrowIcon = (props) => (
  <svg {...iconProps} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

/* Same U mark used in the dashboard, so the brand matches everywhere.
   It is an inline SVG, so there is never a box behind it. */
const LogoMark = () => (
  <svg
    className="jn-nav-logo-mark"
    viewBox="0 0 44 44"
    aria-hidden="true"
    focusable="false"
  >
    <defs>
      <linearGradient id="jnLogoGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#5B86FF" />
        <stop offset="1" stopColor="#3A4DE0" />
      </linearGradient>
    </defs>
    <rect width="44" height="44" rx="12" fill="url(#jnLogoGrad)" />
    <path
      d="M14 13v12a8 8 0 0 0 16 0V13"
      fill="none"
      stroke="#fff"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/* =========================================================
   NAVBAR
   One floating capsule, fixed to the top of the screen.
   - Over the hero: dark glass, white text, solid white CTA.
   - After a little scrolling: light glass, dark text, blue CTA,
     so it stays readable over the white sections.

   Inter is expected to be loaded globally (index.html or your
   global CSS), the same as the hero.

   HERO TIP: because the capsule floats over the hero, give the
   hero headline enough top padding so it never feels tight:
   padding-top: 140px (desktop) / 112px (mobile).
========================================================= */

export default function Navbar({
  signInHref = SIGN_IN_HREF,
  ctaHref = CTA_HREF,
  ctaLabel = CTA_LABEL,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [spotlight, setSpotlight] = useState({ left: 0, width: 0, opacity: 0 });

  const linkRefs = useRef([]);
  const linksRef = useRef(null);
  const menuButtonRef = useRef(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  /* ---------- dark / light state ---------- */

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24);

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, []);

  /* ---------- drawer: close on desktop width and on Escape ---------- */

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false);
    };

    const handleKey = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        if (menuButtonRef.current) menuButtonRef.current.focus();
      }
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('keydown', handleKey);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  /* ---------- scroll lock while the drawer is open ---------- */

  useEffect(() => {
    if (!menuOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  /* ---------- hover spotlight ---------- */

  const moveSpotlightTo = (index) => {
    const element = linkRefs.current[index];
    const group = linksRef.current;
    if (!element || !group) return;

    const elementRect = element.getBoundingClientRect();
    const groupRect = group.getBoundingClientRect();

    setSpotlight({
      left: elementRect.left - groupRect.left,
      width: elementRect.width,
      opacity: 1,
    });
  };

  const hideSpotlight = () =>
    setSpotlight((previous) => ({ ...previous, opacity: 0 }));

  return (
    <>
      <style>{`

        /* Anchor links land below the floating bar. */
        html { scroll-padding-top: 88px; }

        @media (prefers-reduced-motion: no-preference) {
          html { scroll-behavior: smooth; }
        }

        .jn-nav,
        .jn-nav * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        /* =========================================================
           CAPSULE
           Colours come from variables, so the dark and light states
           only differ in the values below.
        ========================================================= */

        .jn-nav {
          --nav-bg: rgba(255, 255, 255, 0.08);
          --nav-border: rgba(255, 255, 255, 0.16);
          --nav-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.14),
            0 14px 36px -16px rgba(2, 10, 40, 0.6);
          --nav-text: #FFFFFF;
          --nav-text-soft: rgba(255, 255, 255, 0.78);
          --nav-hover: rgba(255, 255, 255, 0.14);
          --nav-cta-bg: #FFFFFF;
          --nav-cta-border: #FFFFFF;
          --nav-cta-text: #0B1B4D;
          --nav-cta-glow: rgba(255, 255, 255, 0.35);

          position: fixed;
          top: 14px;
          left: 0;
          right: 0;
          z-index: 90;

          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
          column-gap: 20px;

          width: min(calc(100% - 28px), 1060px);
          height: 58px;
          margin: 0 auto;
          padding: 0 9px 0 14px;

          border: 1px solid var(--nav-border);
          border-radius: 999px;
          background: var(--nav-bg);
          box-shadow: var(--nav-shadow);

          backdrop-filter: blur(20px) saturate(1.4);
          -webkit-backdrop-filter: blur(20px) saturate(1.4);

          color: var(--nav-text);

          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            box-shadow 0.3s ease,
            color 0.3s ease;

          animation: jnNavIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .jn-nav[data-scrolled="true"] {
          --nav-bg: rgba(255, 255, 255, 0.86);
          --nav-border: rgba(15, 30, 70, 0.1);
          --nav-shadow:
            0 18px 40px -14px rgba(10, 30, 80, 0.35),
            0 2px 8px rgba(10, 30, 80, 0.08);
          --nav-text: #13203A;
          --nav-text-soft: #46526B;
          --nav-hover: rgba(30, 70, 160, 0.08);
          --nav-cta-bg: #2C63CA;
          --nav-cta-border: #2C63CA;
          --nav-cta-text: #FFFFFF;
          --nav-cta-glow: rgba(20, 60, 160, 0.5);
        }

        @keyframes jnNavIn {
          from { opacity: 0; transform: translateY(-14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* =========================================================
           LOGO (mark + wordmark)
        ========================================================= */

        .jn-nav-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: var(--nav-text);
          font-size: 18px;
          font-weight: 750;
          letter-spacing: -0.045em;
          line-height: 1;
          text-decoration: none;
          transition: color 0.3s ease, opacity 0.2s ease;
        }

        .jn-nav-logo:hover { opacity: 0.85; }

        .jn-nav-logo-mark {
          width: 32px;
          height: 32px;
          flex: none;
          filter: drop-shadow(0 4px 10px rgba(58, 77, 224, 0.4));
        }

        /* =========================================================
           LINKS
        ========================================================= */

        .jn-nav-links {
          position: relative;
          justify-self: center;
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .jn-nav-spotlight {
          position: absolute;
          top: 50%;
          height: 34px;
          border-radius: 999px;
          background: var(--nav-hover);
          transform: translateY(-50%);
          pointer-events: none;
          transition:
            left 260ms cubic-bezier(0.16, 1, 0.3, 1),
            width 260ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 200ms ease,
            background 0.3s ease;
        }

        .jn-nav-link {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          color: var(--nav-text-soft);
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .jn-nav-link:hover { color: var(--nav-text); }

        /* =========================================================
           ACTIONS
        ========================================================= */

        .jn-nav-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .jn-nav-signin {
          display: inline-flex;
          align-items: center;
          height: 40px;
          padding: 0 16px;
          border-radius: 999px;
          color: var(--nav-text-soft);
          font-size: 13.5px;
          font-weight: 500;
          letter-spacing: -0.01em;
          white-space: nowrap;
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .jn-nav-signin:hover { color: var(--nav-text); }

        .jn-nav-cta {
          position: relative;
          isolation: isolate;
          overflow: hidden;

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          height: 40px;
          padding: 0 20px;
          border: 1px solid var(--nav-cta-border);
          border-radius: 999px;
          background: var(--nav-cta-bg);
          color: var(--nav-cta-text);
          font-size: 13.5px;
          font-weight: 650;
          letter-spacing: -0.01em;
          white-space: nowrap;
          text-decoration: none;
          transition:
            background 0.3s ease,
            border-color 0.3s ease,
            color 0.3s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .jn-nav-cta::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          background: linear-gradient(135deg, #FFB347 0%, #FF8A1F 100%);
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .jn-nav-cta:hover {
          --nav-cta-glow: rgba(255, 138, 31, 0.6);
          color: #0A2A6B;
          border-color: #FF8A1F;
          transform: translateY(-1px);
          box-shadow: 0 10px 24px -8px var(--nav-cta-glow);
        }

        .jn-nav-cta:hover::before { opacity: 1; }

        .jn-nav-cta:active { transform: translateY(0); }

        .jn-nav-cta svg {
          width: 15px;
          height: 15px;
          transition: transform 0.2s ease;
        }

        .jn-nav-cta:hover svg { transform: translateX(3px); }

        .jn-nav a:focus-visible,
        .jn-nav button:focus-visible {
          outline: 2px solid #4C8DFF;
          outline-offset: 2px;
        }

        /* =========================================================
           MOBILE BUTTON AND DRAWER
        ========================================================= */

        .jn-nav-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 999px;
          background: transparent;
          color: var(--nav-text);
          cursor: pointer;
          transition: background 0.2s ease, color 0.3s ease;
        }

        .jn-nav-menu-btn:hover { background: var(--nav-hover); }

        .jn-nav-menu-btn svg { width: 22px; height: 22px; }

        .jn-drawer-backdrop {
          position: fixed;
          inset: 0;
          z-index: 80;
          background: rgba(8, 16, 40, 0.35);
          animation: jnDrawerFade 0.2s ease-out both;
        }

        .jn-drawer {
          position: fixed;
          top: 82px;
          left: 14px;
          right: 14px;
          z-index: 95;
          padding: 10px 20px 20px;
          border: 1px solid rgba(15, 30, 70, 0.08);
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.97);
          box-shadow: 0 24px 50px -16px rgba(8, 24, 80, 0.4);
          animation: jnDrawerIn 0.24s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .jn-drawer,
        .jn-drawer * {
          box-sizing: border-box;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
        }

        .jn-drawer-link {
          display: block;
          padding: 14px 0;
          border-bottom: 1px solid rgba(15, 30, 70, 0.07);
          color: #13203A;
          font-size: 15px;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
        }

        .jn-drawer-actions {
          display: grid;
          gap: 10px;
          margin-top: 16px;
        }

        .jn-drawer-actions .jn-drawer-signin {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          border: 1px solid rgba(15, 30, 70, 0.14);
          border-radius: 12px;
          color: #13203A;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        .jn-drawer-actions .jn-drawer-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 44px;
          border-radius: 12px;
          background: #2C63CA;
          color: #FFFFFF;
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
        }

        .jn-drawer a:focus-visible {
          outline: 2px solid #4C8DFF;
          outline-offset: 2px;
        }

        @keyframes jnDrawerFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes jnDrawerIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* =========================================================
           RESPONSIVE
        ========================================================= */

        @media (max-width: 900px) {
          .jn-nav {
            grid-template-columns: 1fr auto;
            height: 54px;
            padding: 0 6px 0 12px;
          }

          .jn-nav-links,
          .jn-nav-actions {
            display: none;
          }

          .jn-nav-menu-btn { display: inline-flex; }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .jn-nav,
          .jn-nav-spotlight,
          .jn-nav-cta,
          .jn-drawer,
          .jn-drawer-backdrop {
            animation: none !important;
            transition: none !important;
          }
        }

      `}</style>

      <header className="jn-nav" data-scrolled={scrolled ? 'true' : 'false'}>
        <a href="#" className="jn-nav-logo" aria-label="Journin home">
          <LogoMark />
          <span>Journin</span>
        </a>

        <nav
          ref={linksRef}
          className="jn-nav-links"
          aria-label="Main navigation"
          onMouseLeave={hideSpotlight}
        >
          <span
            className="jn-nav-spotlight"
            style={{
              left: `${spotlight.left}px`,
              width: `${spotlight.width}px`,
              opacity: spotlight.opacity,
            }}
            aria-hidden="true"
          />

          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.label}
              ref={(element) => {
                linkRefs.current[index] = element;
              }}
              href={item.href}
              className="jn-nav-link"
              onMouseEnter={() => moveSpotlightTo(index)}
              onFocus={() => moveSpotlightTo(index)}
              onBlur={hideSpotlight}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="jn-nav-actions">
          <a href={signInHref} className="jn-nav-signin">
            Sign in
          </a>

          <a href={ctaHref} className="jn-nav-cta">
            <span>{ctaLabel}</span>
            <ArrowIcon />
          </a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="jn-nav-menu-btn"
          onClick={() => setMenuOpen((previous) => !previous)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="jn-drawer"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </header>

      {menuOpen && (
        <>
          <div
            className="jn-drawer-backdrop"
            onClick={closeMenu}
            aria-hidden="true"
          />

          <div id="jn-drawer" className="jn-drawer">
            <nav aria-label="Mobile navigation">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="jn-drawer-link"
                  onClick={closeMenu}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="jn-drawer-actions">
              <a
                href={signInHref}
                className="jn-drawer-signin"
                onClick={closeMenu}
              >
                Sign in
              </a>

              <a href={ctaHref} className="jn-drawer-cta" onClick={closeMenu}>
                {ctaLabel}
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}