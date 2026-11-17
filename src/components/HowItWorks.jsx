import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Pin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* =========================================================
   DATA
========================================================= */

const steps = [
  {
    number: "01",
    title: "Connect",
    subtitle: "Bring your trades together.",
    description:
      "Import your trading history through supported broker connections or statement uploads. Keep your trading activity organized in one place.",
    tag: "IMPORT YOUR TRADES",
    chip: "Broker or statement",
    className: "connect",
    tilt: -2.4,
  },
  {
    number: "02",
    title: "Calculate",
    subtitle: "Know what you really earned.",
    description:
      "Understand your actual trading performance with a clear breakdown of gross P&L, brokerage, transaction charges and net results.",
    tag: "SEE YOUR REAL P&L",
    chip: "Net ₹24,850",
    className: "calculate",
    tilt: 2.2,
  },
  {
    number: "03",
    title: "Analyze",
    subtitle: "Find the patterns behind your trades.",
    description:
      "Explore your win rate, profit factor, winning strategies and recurring mistakes to understand what's working and what isn't.",
    tag: "DISCOVER YOUR EDGE",
    chip: "Win rate 68%",
    className: "analyze",
    tilt: -2,
  },
  {
    number: "04",
    title: "Improve",
    subtitle: "Turn insights into better decisions.",
    description:
      "Review your trading behaviour and use AI-powered insights to identify patterns and areas where you can improve.",
    tag: "LEARN AND EVOLVE",
    chip: "AI-powered review",
    className: "improve",
    tilt: 2.4,
  },
];

/* =========================================================
   LINE DOODLES  (pathLength="1" lets CSS draw them on)
========================================================= */

function ConnectDoodle() {
  return (
    <svg viewBox="0 0 120 80" className="hw-doodle" aria-hidden="true">
      <circle cx="58" cy="42" r="32" className="hw-doodle-blob" />
      <path className="hw-draw" pathLength="1" d="M40 12H68L80 24V54H40Z" />
      <path className="hw-draw" pathLength="1" d="M68 12V24H80" />
      <path className="hw-draw" pathLength="1" d="M48 34H72M48 42H72M48 50H62" />
      <path className="hw-draw" pathLength="1" d="M28 58V68H92V58" />
      <circle className="hw-draw" pathLength="1" cx="94" cy="22" r="11" />
      <path className="hw-draw" pathLength="1" d="M94 28V16M89 21L94 16L99 21" />
    </svg>
  );
}

function CalculateDoodle() {
  return (
    <svg viewBox="0 0 120 80" className="hw-doodle" aria-hidden="true">
      <circle cx="58" cy="42" r="32" className="hw-doodle-blob" />
      <path
        className="hw-draw"
        pathLength="1"
        d="M30 8H74V64L68.5 68L63 64L57.5 68L52 64L46.5 68L41 64L35.5 68L30 64Z"
      />
      <path className="hw-draw" pathLength="1" d="M38 20H58M38 30H66M38 40H52" />
      <circle className="hw-draw" pathLength="1" cx="88" cy="50" r="15" />
      <path
        className="hw-draw"
        pathLength="1"
        d="M81 43H95M81 48H95M83 43H86A5 5 0 0 1 86 53H83L91 61"
      />
    </svg>
  );
}

function AnalyzeDoodle() {
  return (
    <svg viewBox="0 0 120 80" className="hw-doodle" aria-hidden="true">
      <circle cx="58" cy="42" r="32" className="hw-doodle-blob" />
      <path className="hw-draw" pathLength="1" d="M20 68H84" />
      <rect className="hw-draw" pathLength="1" x="26" y="46" width="12" height="22" rx="2" />
      <rect className="hw-draw" pathLength="1" x="44" y="34" width="12" height="34" rx="2" />
      <rect className="hw-draw" pathLength="1" x="62" y="22" width="12" height="46" rx="2" />
      <circle className="hw-draw" pathLength="1" cx="90" cy="26" r="13" />
      <path className="hw-draw" pathLength="1" d="M100 36L110 46" />
      <path className="hw-draw" pathLength="1" d="M83 28L88 23L92 27L97 21" />
    </svg>
  );
}

function ImproveDoodle() {
  return (
    <svg viewBox="0 0 120 80" className="hw-doodle" aria-hidden="true">
      <circle cx="60" cy="40" r="32" className="hw-doodle-blob" />
      <path
        className="hw-draw"
        pathLength="1"
        d="M60 10A19 19 0 0 0 49 45V52H71V45A19 19 0 0 0 60 10Z"
      />
      <path className="hw-draw" pathLength="1" d="M52 59H68M55 66H65" />
      <path className="hw-draw" pathLength="1" d="M56 30L60 36L64 30" />
      <path className="hw-draw" pathLength="1" d="M92 14V26M86 20H98" />
      <path className="hw-draw" pathLength="1" d="M26 26V34M22 30H30" />
      <path className="hw-draw" pathLength="1" d="M94 48L100 52M24 52L18 56" />
    </svg>
  );
}

const doodles = [ConnectDoodle, CalculateDoodle, AnalyzeDoodle, ImproveDoodle];

/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({ step, index, cardRef }) {
  const Doodle = doodles[index];

  return (
    <article
      ref={cardRef}
      className={`hw-card hw-card-${step.className}`}
      data-card-index={index}
    >
      <div className="hw-card-inner">
        <span className="hw-pin" aria-hidden="true">
          <Pin size={22} strokeWidth={1.6} fill="currentColor" />
        </span>

        <div className="hw-card-panel">
          <span className="hw-card-number">{step.number}</span>

          <span className="hw-card-tag">{step.tag}</span>
          <h3>{step.title}</h3>
          <h4>{step.subtitle}</h4>
          <p>{step.description}</p>

          <div className="hw-card-art">
            <Doodle />
            <span className="hw-chip">
              <i />
              {step.chip}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const flowRef = useRef(null);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);

  const [connectors, setConnectors] = useState({
    width: 1000,
    height: 1000,
    paths: [],
  });

  /* =======================================================
     CONNECTOR GEOMETRY  (uses layout offsets, so card
     tilt / reveal transforms never distort the lines)
  ======================================================= */

  useLayoutEffect(() => {
    const flow = flowRef.current;
    const grid = gridRef.current;
    if (!flow || !grid) return;

    const updateConnectors = () => {
      const cards = cardRefs.current;
      if (cards.some((card) => !card)) return;

      const width = flow.clientWidth;
      const height = flow.scrollHeight;
      const isMobile = window.matchMedia("(max-width: 640px)").matches;

      const pos = cards.map((card) => {
        const left = card.offsetLeft + grid.offsetLeft;
        const top = card.offsetTop + grid.offsetTop;
        const w = card.offsetWidth;
        const h = card.offsetHeight;
        return {
          left,
          top,
          right: left + w,
          bottom: top + h,
          cx: left + w / 2,
          h,
        };
      });

      const paths = [];

      for (let i = 0; i < pos.length - 1; i++) {
        const a = pos[i];
        const b = pos[i + 1];

        if (isMobile) {
          const s = i % 2 === 0 ? 1 : -1;
          const sx = a.cx + s * 34;
          const ex = b.cx - s * 34;
          const sy = a.bottom - 6;
          const ey = b.top + 6;
          const dy = (ey - sy) / 2;
          paths.push(`M ${sx} ${sy} C ${sx} ${sy + dy}, ${ex} ${ey - dy}, ${ex} ${ey}`);
        } else {
          const fromRight = i % 2 === 0;
          const sx = fromRight ? a.right - 6 : a.left + 6;
          const ex = fromRight ? b.left + 6 : b.right - 6;
          const sy = a.top + a.h * 0.62;
          const ey = b.top + b.h * 0.38;
          const dx = (ex - sx) / 2;
          paths.push(`M ${sx} ${sy} C ${sx + dx} ${sy}, ${ex - dx} ${ey}, ${ex} ${ey}`);
        }
      }

      setConnectors({ width, height, paths });
    };

    updateConnectors();

    const resizeObserver = new ResizeObserver(updateConnectors);
    resizeObserver.observe(flow);
    cardRefs.current.forEach((card) => card && resizeObserver.observe(card));
    window.addEventListener("resize", updateConnectors);

    const frame = requestAnimationFrame(() => {
      updateConnectors();
      ScrollTrigger.refresh();
    });

    // Fonts can change card heights after first paint
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        updateConnectors();
        ScrollTrigger.refresh();
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateConnectors);
    };
  }, []);

  /* =======================================================
     CARD REVEAL  (pin-drop + settle into tilt)
  ======================================================= */

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const tiltFor = (i) =>
      steps[i].tilt * (window.innerWidth <= 640 ? 0.6 : 1);

    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean);
      const media = gsap.matchMedia();

      const revealCard = (card, i) => {
        card.classList.add("is-visible");

        gsap.to(card, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          rotation: tiltFor(i),
          duration: 0.85,
          ease: "power3.out",
          overwrite: true,
        });

        gsap.fromTo(
          card.querySelector(".hw-pin"),
          { y: -16, scale: 1.5, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.45,
            delay: 0.3,
            ease: "back.out(2.2)",
            overwrite: true,
          }
        );
      };

      const hideCard = (card, i) => {
        card.classList.remove("is-visible");

        gsap.to(card, {
          autoAlpha: 0,
          y: 45,
          scale: 0.97,
          rotation: tiltFor(i) * 2,
          duration: 0.4,
          ease: "power2.inOut",
          overwrite: true,
        });

        gsap.set(card.querySelector(".hw-pin"), { autoAlpha: 0 });
      };

      media.add("(prefers-reduced-motion: no-preference)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, {
            autoAlpha: 0,
            y: 60,
            scale: 0.97,
            rotation: tiltFor(i) * 2,
          });
          gsap.set(card.querySelector(".hw-pin"), { autoAlpha: 0 });

          ScrollTrigger.create({
            trigger: card,
            start: "top 85%",
            onEnter: () => revealCard(card, i),
            onEnterBack: () => revealCard(card, i),
            onLeaveBack: () => hideCard(card, i),
          });
        });
      });

      media.add("(prefers-reduced-motion: reduce)", () => {
        cards.forEach((card, i) => {
          gsap.set(card, { autoAlpha: 1, y: 0, scale: 1, rotation: tiltFor(i) });
          card.classList.add("is-visible");
        });
      });

      return () => media.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  /* =======================================================
     CONNECTOR DRAW  (scroll-scrubbed, dashes preserved by mask)
  ======================================================= */

  useLayoutEffect(() => {
    const flow = flowRef.current;
    if (!flow || connectors.paths.length === 0) return;

    const ctx = gsap.context(() => {
      const masks = gsap.utils.toArray(".hw-connector-mask", flow);

      masks.forEach((path, index) => {
        const length = path.getTotalLength();

        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });

        const destination = cardRefs.current[index + 1];
        if (!destination) return;

        gsap.to(path, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: destination,
            start: "top 88%",
            end: "top 45%",
            scrub: 0.6,
          },
        });
      });
    }, flow);

    return () => ctx.revert();
  }, [connectors]);

  return (
    <section className="hw-section" id="how-it-works" ref={sectionRef}>
      <div className="hw-background-glow hw-glow-one" />
      <div className="hw-background-glow hw-glow-two" />

      {/* HEADING */}

      <div className="hw-heading">
        <div className="hw-eyebrow">
          <span />
          HOW JOURNIN WORKS
        </div>

        <h2>
          From every trade,
          <br />
          <span>learn something valuable.</span>
        </h2>

        <p>
          Your trading journey doesn't end when a position closes.
          Understand your performance, discover patterns and make
          every trade a learning opportunity.
        </p>
      </div>

      {/* TIMELINE */}

      <div className="hw-flow" ref={flowRef}>
        <svg
          className="hw-connectors"
          width={connectors.width}
          height={connectors.height}
          viewBox={`0 0 ${connectors.width} ${connectors.height}`}
          aria-hidden="true"
        >
          <defs>
            {connectors.paths.map((path, index) => (
              <mask
                key={index}
                id={`hw-mask-${index}`}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width={connectors.width}
                height={connectors.height}
              >
                <path
                  className="hw-connector-mask"
                  d={path}
                  fill="none"
                  stroke="#fff"
                  strokeWidth="8"
                />
              </mask>
            ))}
          </defs>

          {connectors.paths.map((path, index) => (
            <g key={index}>
              <path className="hw-connector-base" d={path} />
              <path
                className="hw-connector-path"
                d={path}
                mask={`url(#hw-mask-${index})`}
              />
            </g>
          ))}
        </svg>

        <div className="hw-flow-grid" ref={gridRef}>
          {steps.map((step, index) => (
            <FeatureCard
              key={step.number}
              step={step}
              index={index}
              cardRef={(element) => {
                cardRefs.current[index] = element;
              }}
            />
          ))}
        </div>
      </div>

      <div className="hw-cta">
        <h3>Ready to trade with clarity?</h3>

        <a href="#signup" className="hw-cta-button">
          Get Started
          <ArrowUpRight size={16} />
        </a>
      </div>

      <style>{`

        /* =========================================
           DESIGN TOKENS & SECTION
        ========================================= */

        .hw-section {
          --hw-blue: #2463EB;
          --hw-green: #16A765;
          --hw-purple: #7956E8;
          --hw-orange: #F2740F;
          --hw-ink: #111827;
          --hw-muted: #596780;
          --hw-border: #E1E8F5;

          position: relative;
          isolation: isolate;
          width: 100%;
          padding: 110px 6% 85px;
          overflow: hidden;
          background:
            radial-gradient(ellipse at 8% 18%, rgba(69, 130, 255, 0.10), transparent 32%),
            radial-gradient(ellipse at 92% 80%, rgba(75, 205, 185, 0.09), transparent 32%),
            #F8FAFF;
          color: var(--hw-ink);
          font-family: Inter, sans-serif;
        }

        .hw-section *,
        .hw-section *::before,
        .hw-section *::after {
          box-sizing: border-box;
        }

        .hw-background-glow {
          position: absolute;
          z-index: -1;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
          opacity: 0.24;
        }

        .hw-glow-one { top: 22%; left: -250px; background: #B7CEFF; }
        .hw-glow-two { right: -250px; bottom: 8%; background: #B8F0E4; }

        /* =========================================
           HEADING
        ========================================= */

        .hw-heading {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 790px;
          margin: 0 auto 70px;
          text-align: center;
        }

        .hw-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 9px 17px;
          margin-bottom: 25px;
          color: #174FC8;
          background: rgba(224, 237, 255, 0.85);
          border: 1px solid rgba(190, 215, 255, 0.65);
          border-radius: 50px;
          font-size: 12px;
          font-weight: 750;
          letter-spacing: 0.08em;
        }

        .hw-eyebrow > span {
          width: 8px;
          height: 8px;
          flex-shrink: 0;
          border-radius: 50%;
          background: var(--hw-blue);
          box-shadow: 0 0 0 4px rgba(36, 99, 235, 0.10);
        }

        .hw-heading h2 {
          margin: 0 0 19px;
          color: var(--hw-ink);
          font-size: clamp(36px, 4.4vw, 58px);
          line-height: 1.12;
          font-weight: 750;
          letter-spacing: -0.055em;
        }

        .hw-heading h2 span { color: var(--hw-blue); }

        .hw-heading p {
          max-width: 700px;
          margin: 0 auto;
          color: var(--hw-muted);
          font-size: 16px;
          line-height: 1.75;
        }

        /* =========================================
           FLOW LAYOUT  (zig-zag, overlapping rows)
        ========================================= */

        .hw-flow {
          position: relative;
          width: 100%;
          max-width: 860px;
          margin: 0 auto;
        }

        .hw-flow-grid {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          column-gap: 110px;
          row-gap: 30px;
          align-items: start;
        }

        .hw-card:nth-child(odd)  { grid-column: 1; justify-self: end; }
        .hw-card:nth-child(even) { grid-column: 2; justify-self: start; }

        .hw-card:nth-child(1) { grid-row: 1; }
        .hw-card:nth-child(2) { grid-row: 2; margin-top: -150px; }
        .hw-card:nth-child(3) { grid-row: 3; margin-top: -150px; }
        .hw-card:nth-child(4) { grid-row: 4; margin-top: -150px; }

        /* =========================================
           CONNECTORS — soft dashed curves
        ========================================= */

        .hw-connectors {
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          display: block;
          overflow: visible;
          pointer-events: none;
        }

        .hw-connector-base,
        .hw-connector-path {
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-dasharray: 6 8;
        }

        .hw-connector-base { stroke: rgba(36, 99, 235, 0.16); }
        .hw-connector-path { stroke: #3978F6; }

        /* =========================================
           CARD  (outer = GSAP transforms, inner = hover)
        ========================================= */

        .hw-card {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 318px;
          min-width: 0;
          will-change: transform, opacity;
        }

        .hw-card-inner {
          position: relative;
          padding: 12px;
          background: #FFFFFF;
          border: 1px solid var(--hw-border);
          border-radius: 22px;
          box-shadow:
            0 18px 40px rgba(30, 64, 125, 0.09),
            0 3px 8px rgba(30, 64, 125, 0.05);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .hw-card:hover .hw-card-inner {
          transform: translateY(-5px);
          box-shadow:
            0 26px 52px rgba(30, 64, 125, 0.13),
            0 4px 10px rgba(30, 64, 125, 0.06);
        }

        .hw-pin {
          position: absolute;
          top: -10px;
          left: 50%;
          z-index: 3;
          margin-left: -11px;
          display: block;
          line-height: 0;
          color: var(--hw-accent);
          filter: drop-shadow(0 2px 2px rgba(17, 24, 39, 0.18));
          transform-origin: 50% 100%;
        }

        .hw-pin svg { transform: rotate(18deg); }

        /* per-step accent */
        .hw-card-connect   { --hw-accent: #2463EB; --hw-accent-ink: #174FC8; --hw-tint: #EEF4FF; --hw-line: #DCE8FF; }
        .hw-card-calculate { --hw-accent: #16A765; --hw-accent-ink: #0F8450; --hw-tint: #EBF8F1; --hw-line: #D5F0E1; }
        .hw-card-analyze   { --hw-accent: #7956E8; --hw-accent-ink: #5E3FC9; --hw-tint: #F3F0FF; --hw-line: #E5DEFF; }
        .hw-card-improve   { --hw-accent: #F2740F; --hw-accent-ink: #C85A05; --hw-tint: #FFF3E8; --hw-line: #FFE2C8; }

        .hw-card-panel {
          padding: 24px 20px 18px;
          background: var(--hw-tint);
          border: 1px solid var(--hw-line);
          border-radius: 15px;
        }

        /* =========================================
           CARD CONTENT
        ========================================= */

        .hw-card-number {
          display: block;
          margin-bottom: 14px;
          color: var(--hw-accent);
          font-size: 30px;
          line-height: 1;
          font-weight: 600;
          font-style: italic;
          letter-spacing: -0.02em;
        }

        .hw-card-tag {
          display: block;
          margin-bottom: 6px;
          color: var(--hw-accent-ink);
          font-size: 10px;
          line-height: 1.4;
          font-weight: 800;
          letter-spacing: 0.09em;
        }

        .hw-card h3 {
          margin: 0 0 6px;
          color: var(--hw-ink);
          font-size: 24px;
          line-height: 1.2;
          font-weight: 750;
          letter-spacing: -0.04em;
        }

        .hw-card h4 {
          margin: 0 0 10px;
          color: #35435D;
          font-size: 13.5px;
          line-height: 1.45;
          font-weight: 550;
          font-style: italic;
        }

        .hw-card-panel p {
          margin: 0;
          color: var(--hw-muted);
          font-size: 12.5px;
          line-height: 1.65;
        }

        /* =========================================
           ILLUSTRATION
        ========================================= */

        .hw-card-art {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          margin-top: 16px;
          padding-top: 14px;
          border-top: 1px dashed rgba(17, 24, 39, 0.12);
        }

        .hw-doodle {
          width: 128px;
          height: auto;
          color: var(--hw-accent);
          overflow: visible;
        }

        .hw-doodle-blob {
          fill: var(--hw-accent);
          opacity: 0.1;
        }

        .hw-doodle .hw-draw {
          fill: none;
          stroke: currentColor;
          stroke-width: 1.9;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          transition: stroke-dashoffset 1.1s cubic-bezier(.4,.1,.2,1) 0.35s;
        }

        .hw-card.is-visible .hw-doodle .hw-draw {
          stroke-dashoffset: 0;
        }

        .hw-chip {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 6px 12px;
          color: var(--hw-accent-ink);
          background: #FFFFFF;
          border: 1px solid var(--hw-line);
          border-radius: 50px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .hw-chip i {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--hw-accent);
        }

        /* =========================================
           TABLET
        ========================================= */

        @media (max-width: 900px) {
          .hw-section { padding: 90px 5% 70px; }
          .hw-flow-grid { column-gap: 60px; }
          .hw-card { max-width: 296px; }
          .hw-card:nth-child(2),
          .hw-card:nth-child(3),
          .hw-card:nth-child(4) { margin-top: -130px; }
        }

        /* =========================================
           MOBILE — single column, gentle tilt
        ========================================= */

        @media (max-width: 640px) {
          .hw-section { padding: 76px 20px 60px; }

          .hw-heading { margin-bottom: 54px; }
          .hw-eyebrow { margin-bottom: 19px; font-size: 10px; }

          .hw-heading h2 {
            font-size: clamp(32px, 9vw, 43px);
            letter-spacing: -0.05em;
          }

          .hw-heading h2 br { display: none; }
          .hw-heading p { font-size: 14px; line-height: 1.7; }

          .hw-flow-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 58px;
          }

          .hw-card,
          .hw-card:nth-child(n) {
            grid-column: auto;
            grid-row: auto;
            width: 100%;
            max-width: 340px;
            margin-top: 0;
            justify-self: auto;
          }

          .hw-card-panel { padding: 22px 18px 16px; }
          .hw-card h3 { font-size: 23px; }
        }

        @media (max-width: 380px) {
          .hw-section { padding-right: 15px; padding-left: 15px; }
          .hw-card-panel { padding: 20px 15px 15px; }
        }

        /* =========================================
           ACCESSIBILITY
        ========================================= */

        @media (prefers-reduced-motion: reduce) {
          .hw-card,
          .hw-card *,
          .hw-card *::before,
          .hw-card *::after {
            transition-duration: 0.01ms !important;
            animation-duration: 0.01ms !important;
            transition-delay: 0s !important;
          }
        }

        /* =========================================
           CTA
        ========================================= */

        .hw-cta {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin: 70px auto 0;
          text-align: center;
        }

        .hw-cta h3 {
          margin: 0;
          color: #17243B;
          font-family: inherit;
          font-size: clamp(24px, 3vw, 32px);
          font-weight: 700;
          letter-spacing: -0.045em;
          line-height: 1.2;
        }

        .hw-cta-button {
          min-width: 215px;
          height: 46px;
          padding: 0 25px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #fff;
          background: linear-gradient(100deg, #ff6a00 0%, #ff873e 100%);
          border: 1px solid #ff6a00;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 650;
          text-decoration: none;
          box-shadow:
            0 3px 8px rgba(255, 106, 0, 0.25),
            0 0 15px rgba(255, 106, 0, 0.12);
          transition: all 0.25s ease;
        }

        .hw-cta-button:hover {
          transform: translateY(-2px);
          box-shadow:
            0 5px 14px rgba(255, 106, 0, 0.32),
            0 0 22px rgba(255, 106, 0, 0.16);
        }

        .hw-cta-button svg { transition: transform 0.25s ease; }
        .hw-cta-button:hover svg { transform: translate(3px, -1px); }

        @media (max-width: 640px) {
          .hw-cta { margin-top: 48px; gap: 16px; }
          .hw-cta h3 { font-size: 23px; }
          .hw-cta-button { min-width: 195px; height: 44px; }
        }

      `}</style>
    </section>
  );
}