import React, { useState, useEffect, useRef } from 'react';
import HeroPNG from '../assets/heroSection.svg';
import HeroBackgroundDesktop from '../assets/blue_bg.png';
import HeroBackgroundMobile from '../assets/mobile-background.png';

/* =========================================================
   COPY
   Everything the visitor reads lives here, so it is easy to
   change without touching the layout.

   Headline option B is used. Swap in these if you prefer:
   A: "See the pattern in your losing trades" / "before it costs you again."
   C: "The trading journal" / "that fills itself."

   Leave `microcopy` empty to hide it. Only fill it with a claim
   you have confirmed (for example the 2-minute connect time).
========================================================= */

const COPY = {
  titleTop: 'Your broker shows the P&L.',
  titleBottom: 'Journin shows what you kept.',
  subline: 'Connect your broker and see your real profit after STT, fees and GST.',
  primaryCta: 'Get started',
  microcopy: '',
};

/* =========================================================
   ICONS
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

/* =========================================================
   SCROLL TILT
   The dashboard starts tilted back and slightly smaller, then
   settles flat as the visitor scrolls toward it.
   - Only transform and opacity are animated.
   - One passive scroll listener, throttled with rAF.
   - Reduced motion: the dashboard is simply shown flat.
========================================================= */

function useScrollTilt(stageRef, tiltRef, glowRef, introRef) {
  useEffect(() => {
    const stage = stageRef.current;
    const tilt = tiltRef.current;
    const glow = glowRef.current;
    const intro = introRef.current;
    if (!stage || !tilt) return undefined;

    // Browsers with scroll-driven animations handle this in CSS.
    if (
      typeof CSS !== 'undefined' &&
      CSS.supports &&
      CSS.supports('animation-timeline: scroll()')
    ) {
      return undefined;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const smallScreen = window.matchMedia('(max-width: 640px)');

    let stageTop = 0;
    let ticking = false;

    const measure = () => {
      stageTop = stage.getBoundingClientRect().top + window.scrollY;
    };

    const apply = () => {
      ticking = false;

      const maxTilt = smallScreen.matches ? 8 : 24;
      const minScale = smallScreen.matches ? 0.96 : 0.9;

      let progress = 1;

      if (!reduceMotion.matches) {
        // Fully flat after scrolling 60% of the viewport height.
        const distance = Math.max(260, window.innerHeight * 0.6);
        progress = Math.min(1, Math.max(0, window.scrollY / distance));
      }

      const eased = 1 - Math.pow(1 - progress, 2);

      tilt.style.transform = `rotateX(${(1 - eased) * maxTilt}deg) scale(${
        minScale + (1 - minScale) * eased
      })`;

      if (glow) glow.style.opacity = String(0.45 + 0.55 * eased);

      if (intro && !reduceMotion.matches) {
        const fade = Math.min(1, window.scrollY / (window.innerHeight * 0.4));
        intro.style.opacity = String(1 - fade);
        intro.style.transform = `translateY(${-24 * fade}px)`;
      }
    };

    const requestTick = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(apply);
    };

    const handleResize = () => {
      measure();
      requestTick();
    };

    measure();
    apply();

    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', handleResize);
    reduceMotion.addEventListener('change', requestTick);

    // Fonts and images can shift the layout after first paint.
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(handleResize);
      observer.observe(document.documentElement);
    }

    return () => {
      window.removeEventListener('scroll', requestTick);
      window.removeEventListener('resize', handleResize);
      reduceMotion.removeEventListener('change', requestTick);
      if (observer) observer.disconnect();
    };
  }, [stageRef, tiltRef, glowRef]);
}

/* =========================================================
   HERO SECTION
   Navbar is intentionally not included here. It floats over the
   top of the hero, so the top padding of .jn-content leaves room
   for it.
========================================================= */

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const glowRef = useRef(null);
  const introRef = useRef(null);

  useScrollTilt(stageRef, tiltRef, glowRef, introRef);


  useEffect(() => {
    const timer = window.setTimeout(() => setMounted(true), 60);
    return () => window.clearTimeout(timer);
  }, []);

  // One load sequence: text first, dashboard last.
  const reveal = (delayMs, offsetY = 18) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'none' : `translate3d(0, ${offsetY}px, 0)`,
    transition:
      'opacity 700ms cubic-bezier(0.16, 1, 0.3, 1), transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${delayMs}ms`,
  });

  return (
    <section className="jn-hero">
      <style>{`

        /* =========================================================
           HERO CONTAINER AND BACKGROUND
           The gradient is a fallback behind the two images.
           Top corners are rounded, the bottom runs straight into
           the next section so the two read as one panel.
        ========================================================= */

        .jn-hero {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          margin: 0 clamp(10px, 2vw, 28px);
          border-radius: clamp(24px, 3vw, 40px) clamp(24px, 3vw, 40px) 0 0;
          background: linear-gradient(
            180deg,
            #040A1E 0%,
            #0A2A8F 40%,
            #1F5BFF 64%,
            #DCE8FF 90%,
            #F8FAFF 100%
          );
        }

        .jn-bg {
          position: absolute;
          inset: 0;
          z-index: -1;
          background-repeat: no-repeat;
          background-position: center top;
          background-size: cover;
          pointer-events: none;
        }

        .jn-bg-desktop { background-image: url(${HeroBackgroundDesktop}); }

        .jn-bg-mobile {
          display: none;
          background-image: url(${HeroBackgroundMobile});
        }

        /* Fades the bottom of the hero (image included) into the colour
           the broker section starts with, so there is no visible seam. */
        .jn-hero::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: 140px;
          z-index: 0;
          background: linear-gradient(
            180deg,
            rgba(248, 250, 255, 0) 0%,
            #F8FAFF 100%
          );
          pointer-events: none;
        }

        /* =========================================================
           LAYOUT
           Top padding leaves room for the floating navbar.
        ========================================================= */

        .jn-content {
          position: relative;
          z-index: 1;
          width: min(100%, 1240px);
          margin: 0 auto;
          padding: 140px 24px 72px;
          text-align: center;
        }

        .jn-intro {
          max-width: 880px;
          margin: 0 auto;
        }

        /* =========================================================
           HEADLINE
        ========================================================= */

        .jn-title {
          margin: 0 auto;
          color: #FFFFFF;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
          font-size: clamp(34px, 5.2vw, 62px);
          font-weight: 680;
          line-height: 1.06;
          letter-spacing: -0.04em;
          text-wrap: balance;
        }

        .jn-title-line { display: block; }

        .jn-title-accent {
          background: linear-gradient(
            95deg,
            #A9CEFF 0%,
            #79DDF2 55%,
            #6EE7C1 100%
          );
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
        }

        /* =========================================================
           SUBLINE
           One short line (two at most on small screens).
        ========================================================= */

        .jn-subline {
          max-width: 640px;
          margin: 24px auto 0;
          color: rgba(226, 236, 255, 0.82);
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
          font-size: 17px;
          font-weight: 450;
          line-height: 1.55;
          letter-spacing: -0.01em;
          text-wrap: balance;
        }

        /* =========================================================
           CTAS
        ========================================================= */

        .jn-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-top: 40px;
        }

        .jn-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 54px;
          padding: 0 30px;
          border: 1px solid transparent;
          border-radius: 12px;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            "Segoe UI", sans-serif;
          font-size: 14.5px;
          font-weight: 620;
          letter-spacing: -0.01em;
          text-decoration: none;
          cursor: pointer;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            background 0.22s ease,
            border-color 0.22s ease;
        }

        .jn-btn:focus-visible {
          outline: 2px solid #FFFFFF;
          outline-offset: 3px;
        }

        .jn-btn-primary {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #FFFFFF;
  color: #0A2A6B;
  box-shadow: 0 1px 2px rgba(5, 15, 50, 0.2);
}

/* Orange layer that fades in on hover */
.jn-btn-primary::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, #FFB347 0%, #FF8A1F 100%);
  opacity: 0;
  transition: opacity 0.25s ease;
}

.jn-btn-primary svg {
  width: 16px;
  height: 16px;
  color: #2C63CA;
  transition: transform 0.2s ease, color 0.25s ease;
}

.jn-btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 28px -8px rgba(255, 138, 31, 0.65);
}

.jn-btn-primary:hover::before { opacity: 1; }

.jn-btn-primary:hover svg {
  transform: translateX(3px);
  color: #0A2A6B;
}

.jn-btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(255, 138, 31, 0.4);
}

        .jn-micro {
          margin: 14px 0 0;
          color: rgba(226, 236, 255, 0.7);
          font-size: 13px;
        }

        /* =========================================================
           DASHBOARD STAGE
           stage (measured) > reveal (load) > clip > tilt (scroll)
        ========================================================= */

        .jn-stage {
          position: relative;
          width: min(100%, 1120px);
          margin: 64px auto 0;
        }

        .jn-glow {
          position: absolute;
          left: 50%;
          top: 30%;
          width: 80%;
          height: 300px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: radial-gradient(
            ellipse,
            rgba(80, 150, 255, 0.45),
            transparent 70%
          );
          filter: blur(48px);
          opacity: 0.45;
          pointer-events: none;
        }

        .jn-clip {
          position: relative;
          z-index: 1;
          perspective: 1300px;
          perspective-origin: 50% 0;
        }

        .jn-tilt {
          --jn-tilt: 24deg;
          --jn-scale: 0.9;
          transform-origin: 50% 0;
          transform: rotateX(var(--jn-tilt)) scale(var(--jn-scale));
          will-change: transform;
          backface-visibility: hidden;
        }

        /*
          Browsers with scroll-driven animations (Chrome, Edge, Safari 26+)
          run the tilt on the compositor, so it stays perfectly in step
          with scrolling. Other browsers use the JS fallback in
          useScrollTilt.
        */
        @supports (animation-timeline: scroll()) {
          .jn-tilt {
            animation: jnTiltFlat linear both;
            animation-timeline: scroll(root block);
            animation-range: 0px 60vh;
            animation-timing-function: cubic-bezier(0.22, 0.61, 0.36, 1);
          }

          .jn-glow {
            animation: jnGlowUp linear both;
            animation-timeline: scroll(root block);
            animation-range: 0px 60vh;
          }

          /* The headline block fades and lifts as the dashboard rises. */
          .jn-intro {
            animation: jnIntroOut linear both;
            animation-timeline: scroll(root block);
            animation-range: 0px 40vh;
          }
        }

        @keyframes jnTiltFlat {
          to { transform: rotateX(0deg) scale(1); }
        }

        @keyframes jnIntroOut {
          to { opacity: 0; transform: translateY(-24px); }
        }

        @keyframes jnGlowUp {
          from { opacity: 0.45; }
          to { opacity: 1; }
        }

        .jn-dash {
          display: block;
          width: 100%;
          height: auto;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 18px;
          box-shadow:
            0 30px 60px -36px rgba(8, 24, 80, 0.35),
            0 10px 24px -14px rgba(8, 24, 80, 0.2);
          user-select: none;
        }


        /* =========================================================
           TABLET
        ========================================================= */

        @media (max-width: 800px) {
          .jn-content { padding: 120px 24px 56px; }
          .jn-subline { font-size: 16px; }
          .jn-actions { margin-top: 34px; }
          .jn-stage { margin-top: 52px; }
        }

        /* =========================================================
           MOBILE
           Dashboard is cropped to its top portion and bleeds off
           the bottom of the hero.
        ========================================================= */

        @media (max-width: 640px) {
          .jn-hero {
            margin: 0 8px;
            border-radius: 22px 22px 0 0;
          }

          .jn-bg-desktop { display: none; }
          .jn-bg-mobile { display: block; }

          .jn-content { padding: 108px 18px 40px; }

          .jn-title { font-size: clamp(30px, 9vw, 44px); }

          .jn-subline {
            margin-top: 18px;
            max-width: 300px;
            font-size: 15px;
          }

          .jn-actions {
            flex-direction: column;
            width: 100%;
            margin-top: 30px;
          }

          .jn-btn { width: min(100%, 320px); }

          .jn-stage {
            width: calc(100% + 36px);
            margin: 40px -18px 0;
          }

          /* Phones show the top part of the dashboard, faded at the bottom. */
          .jn-clip {
            max-height: 340px;
            overflow: hidden;
            -webkit-mask-image: linear-gradient(180deg, #000 72%, transparent 100%);
            mask-image: linear-gradient(180deg, #000 72%, transparent 100%);
          }

          .jn-tilt {
            --jn-tilt: 8deg;
            --jn-scale: 0.96;
          }

          .jn-dash {
            width: 160%;
            max-width: none;
            margin-left: -30%;
          }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .jn-reveal {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .jn-tilt,
          .jn-glow,
          .jn-intro {
            animation: none !important;
          }

          .jn-tilt { transform: none !important; }
          .jn-glow { opacity: 1 !important; }

        }

      `}</style>

      {/* Background */}
      <div className="jn-bg jn-bg-desktop" aria-hidden="true" />
      <div className="jn-bg jn-bg-mobile" aria-hidden="true" />

      <div className="jn-content">
        <div className="jn-intro" ref={introRef}>
          <h1 className="jn-title jn-reveal" style={reveal(0, 22)}>
            <span className="jn-title-line">{COPY.titleTop}</span>
            <span className="jn-title-line jn-title-accent">
              {COPY.titleBottom}
            </span>
          </h1>

          <p className="jn-subline jn-reveal" style={reveal(120)}>
            {COPY.subline}
          </p>

          <div className="jn-actions jn-reveal" style={reveal(200)}>
            <a href="#pricing" className="jn-btn jn-btn-primary">
              <span>{COPY.primaryCta}</span>
              <ArrowIcon />
            </a>
          </div>

          {COPY.microcopy ? (
            <p className="jn-micro jn-reveal" style={reveal(260)}>
              {COPY.microcopy}
            </p>
          ) : null}
        </div>

        {/* Dashboard preview */}
        <div className="jn-stage" ref={stageRef}>
          <div className="jn-glow" ref={glowRef} aria-hidden="true" />

          <div className="jn-reveal" style={reveal(360, 40)}>
            <div className="jn-clip">
              <div className="jn-tilt" ref={tiltRef}>
                <img
                  src={HeroPNG}
                  alt="Journin dashboard showing net P&L, win rate, equity curve and recent trades"
                  className="jn-dash"
                  decoding="async"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}