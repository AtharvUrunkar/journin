import React from "react";
import {
  RefreshCw,
  LineChart,
  CalendarClock,
  Laptop,
  Smartphone,
  Cloud,
  Building2,
  Headset,
  NotebookPen,
  ShieldCheck,
  Sparkles,
  Info,
  TrendingUp,
  Link,
} from "lucide-react";

import interactiveLogo from "../assets/interactive.png";
import angelOneLogo from "../assets/angelone.png";
import upstoxLogo from "../assets/upstox.png";
import zerodhaLogo from "../assets/Zerodha.png";
import dhanLogo from "../assets/dhan.png";
import icicidirectLogo from "../assets/icici.png";
import growwLogo from "../assets/groww.png";

import laptopDevice from "../assets/laptop.png";
import mobileDevice from "../assets/mobile.png";
import calendarScreenshot from "../assets/calendar.png";

/* =========================================================
   DESIGN TOKENS
========================================================= */

const TICKS = [
  { name: "Zerodha", logo: zerodhaLogo },
  { name: "Upstox", logo: upstoxLogo },
  { name: "Angel One", logo: angelOneLogo },
  { name: "Dhan", logo: dhanLogo },
  { name: "ICICI Direct", logo: icicidirectLogo },
  { name: "Groww", logo: growwLogo },
];

const TRADE_FEED = [
  {
    name: "Interactive Brokers",
    logo: interactiveLogo,
    subtitle: "Trade Closed · NAS100",
    pnl: "+$212",
    positive: true,
  },
  {
    name: "Angel One",
    logo: angelOneLogo,
    subtitle: "Trade Closed · NIFTY",
    pnl: "-$64",
    positive: false,
  },
  {
    name: "Upstox",
    logo: upstoxLogo,
    subtitle: "Trade Closed · BANKNIFTY",
    pnl: "+$340",
    positive: true,
  },
  {
    name: "Zerodha",
    logo: zerodhaLogo,
    subtitle: "Trade Closed · RELIANCE",
    pnl: "+$128",
    positive: true,
  },
];

const EVENTS = [
  { label: "CPI Data", time: "8:30 AM", tone: "#E24A6E" },
  { label: "FOMC Meeting", time: "2:00 PM", tone: "#C47A0A" },
  { label: "Non-Farm Payrolls", time: "8:30 AM", tone: "#159A78" },
];

/* =========================================================
   STEP MOCKUPS
========================================================= */

const SyncMockup = () => {
  const [index, setIndex] = React.useState(0);
  const [journaled, setJournaled] = React.useState(3);

  React.useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TRADE_FEED.length);
      setJournaled((j) => (j >= 12 ? 3 : j + 1));
    }, 2000);

    return () => clearInterval(id);
  }, []);

  const trade = TRADE_FEED[index];

  return (
    <div className="df-stage-inner">
      <div key={trade.name} className="df-feed-card df-feed-card-top">
        <span className="df-feed-logo df-feed-logo-lg">
          <img src={trade.logo} alt={trade.name} />
        </span>

        <span className="df-feed-text">
          <span className="df-feed-name">{trade.name}</span>
          <span className="df-feed-sub">Trade Closed</span>
        </span>

        <span
          className={`df-feed-amount ${
            trade.positive ? "is-positive" : "is-negative"
          }`}
        >
          {trade.pnl}
        </span>
      </div>

      <div className="df-feed-card df-feed-card-bottom">
        <span className="df-feed-logo df-feed-logo-brand">
          <RefreshCw size={16} strokeWidth={2} />
        </span>

        <span className="df-feed-text">
          <span className="df-feed-name">Auto-Journaled</span>
          <span className="df-feed-sub">Synced today</span>
        </span>

        <span className="df-feed-count">+{journaled}</span>
      </div>

      <div className="df-sync-cta">
        <RefreshCw
          size={13}
          strokeWidth={2.4}
          className="df-sync-cta-icon"
        />
        Syncing Trades...
      </div>
    </div>
  );
};

const AnalyticsMockup = () => {
  const [confidence, setConfidence] = React.useState(88);

  React.useEffect(() => {
    const id = setTimeout(() => setConfidence(92), 400);

    return () => clearTimeout(id);
  }, []);

  const circumference = 2 * Math.PI * 22;

  return (
    <div className="df-stage-inner df-mini-analytics">
      <div className="df-mini-stats-row">
        <div className="df-mini-stat">
          <span className="df-mini-stat-label">Win rate</span>
          <span className="df-mini-stat-value">71.4%</span>
        </div>

        <div className="df-mini-stat">
          <span className="df-mini-stat-label">Expectancy</span>
          <span className="df-mini-stat-value is-positive">+1.84R</span>
        </div>

        <div className="df-mini-ring-wrap">
          <svg viewBox="0 0 50 50" className="df-mini-ring">
            <circle
              cx="25"
              cy="25"
              r="22"
              className="df-mini-ring-track"
            />

            <circle
              cx="25"
              cy="25"
              r="22"
              className="df-mini-ring-progress"
              style={{
                strokeDasharray: circumference,
                strokeDashoffset:
                  circumference * (1 - confidence / 100),
              }}
            />
          </svg>

          <span className="df-mini-ring-pct">{confidence}%</span>
        </div>
      </div>

      <div className="df-mini-chart-wrap">
        <span className="df-mini-chart-tag">
          <Sparkles size={10} strokeWidth={2.4} />
          Pattern detected
        </span>

        <svg
          viewBox="0 0 260 66"
          className="df-mini-chart"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="dfMiniFill"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2557D6"
                stopOpacity="0.22"
              />
              <stop
                offset="100%"
                stopColor="#2557D6"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <path
            d="M4,52 C30,46 40,58 60,48 C80,38 90,50 110,43 C130,36 140,24 160,27 C175,29 185,19 205,14 C220,10 230,7 256,4"
            className="df-mini-chart-line"
          />

          <path
            d="M4,52 C30,46 40,58 60,48 C80,38 90,50 110,43 C130,36 140,24 160,27 C175,29 185,19 205,14 C220,10 230,7 256,4 L256,66 L4,66 Z"
            fill="url(#dfMiniFill)"
          />

          <circle
            cx="256"
            cy="4"
            r="4"
            className="df-mini-chart-dot"
          />
        </svg>
      </div>

      <div className="df-mini-insight">
        <Info size={11} strokeWidth={2.2} />
        Consistency improving across recent trades
      </div>
    </div>
  );
};

const CalendarMockup = () => (
  <div className="df-stage-inner">
    <div className="df-shot-frame">
      <img
        src={calendarScreenshot}
        alt="Trade Calendar dashboard"
        className="df-shot-img"
      />
    </div>
  </div>
);

const CrossPlatformMockup = () => (
  <div className="df-stage-inner df-cross-mock">
    <div className="df-cross-glow" aria-hidden="true" />

    <div className="df-cross-heading">
      <h5>
        Same Experience.
        <br />
        <span>Any Device.</span>
      </h5>
      <p>
        Access your trades, journal, and insights seamlessly across desktop
        and mobile.
      </p>
    </div>

    <div className="df-cross-row">
      <div className="df-device df-device-laptop">
        <img src={laptopDevice} alt="Laptop" />
      </div>

      <div className="df-cross-sync">
        <svg
          viewBox="0 0 160 24"
          className="df-cross-sync-svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,12 L160,12"
            className="df-cross-sync-path"
          />
        </svg>

        <span className="df-cross-sync-dot df-cross-sync-dot-l" />
        <span className="df-cross-sync-dot df-cross-sync-dot-r" />

        <span className="df-cross-sync-hub">
          <Cloud size={20} strokeWidth={2} />
        </span>
      </div>

      <div className="df-device df-device-phone">
        <img src={mobileDevice} alt="Mobile" />
      </div>
    </div>

    <span className="df-cross-sync-label">Syncs in real time</span>

    <div className="df-journal-insight-box">
      <span className="df-journal-insight-icon">
        <Sparkles size={16} strokeWidth={2} />
      </span>

      <div className="df-journal-insight-text">
        <p>
          <strong>Switch devices.</strong> Stay in sync.
        </p>
        <span>
          Pick up where you left off, anytime, anywhere.
        </span>
      </div>

      <span
        className="df-journal-insight-deco"
        aria-hidden="true"
      />
    </div>
  </div>
);

/* =========================================================
   BROKER MARQUEE
========================================================= */

const BrokerMarquee = () => {
  const row = [...TICKS, ...TICKS];

  return (
    <div className="df-stage-inner df-marquee-mock">
      <div className="df-marquee-track">
        {row.map((broker, i) => (
          <span
            className="df-marquee-chip"
            key={`${broker.name}-${i}`}
          >
            <img
              src={broker.logo}
              alt={broker.name}
              className="df-marquee-logo"
            />

            {broker.name}
          </span>
        ))}
      </div>

      <div className="df-marquee-fade df-marquee-fade-l" />
      <div className="df-marquee-fade df-marquee-fade-r" />
    </div>
  );
};

const BrokerConnectMockup = () => (
  <div className="df-stage-inner df-broker-mock">
    <div className="df-broker-canvas">
      <svg viewBox="0 0 600 260" className="df-broker-svg" preserveAspectRatio="none">
        <path
          d="M90,175 C120,120 140,90 170,90 C230,55 370,55 430,90 C460,90 480,120 510,175"
          className="df-broker-path"
        />
        <path
          d="M90,175 C120,120 140,90 170,90 C230,55 370,55 430,90 C460,90 480,120 510,175"
          className="df-broker-path-flow"
        />
        {[
          { cx: 170, cy: 90 },
          { cx: 300, cy: 58 },
          { cx: 430, cy: 90 },
          { cx: 90, cy: 175 },
          { cx: 510, cy: 175 },
        ].map((d, i) => (
          <circle
            key={i}
            cx={d.cx}
            cy={d.cy}
            r="5"
            className="df-broker-dot"
            style={{ animationDelay: `${i * 220}ms` }}
          />
        ))}
      </svg>

      <div className="df-broker-node df-broker-node-tl">
        <span className="df-broker-node-icon">
          <img src={angelOneLogo} alt="Angel One" />
        </span>
        <span className="df-broker-node-name">Angel One</span>
      </div>

      <div className="df-broker-node df-broker-node-tr">
        <span className="df-broker-node-icon">
          <img src={dhanLogo} alt="Dhan" />
        </span>
        <span className="df-broker-node-name">Dhan</span>
      </div>

      <div className="df-broker-node df-broker-node-bl">
        <span className="df-broker-node-icon">
          <img src={upstoxLogo} alt="Upstox" />
        </span>
        <span className="df-broker-node-name">Upstox</span>
      </div>

      <div className="df-broker-node df-broker-node-br">
        <span className="df-broker-node-icon">
          <img src={icicidirectLogo} alt="ICICI Direct" />
        </span>
        <span className="df-broker-node-name">ICICI Direct</span>
      </div>

      <div className="df-broker-hub">
        <span className="df-broker-hub-glow" aria-hidden="true" />
        <span className="df-broker-hub-icon">
          <Link size={22} strokeWidth={2} />
        </span>
      </div>
    </div>

    <div className="df-broker-caption">
      <h5>Connect Your Brokers</h5>
      <p>Trade, track and journal — all in one place.</p>
    </div>

    <div className="df-journal-insight-box">
      <span className="df-journal-insight-icon">
        <Sparkles size={16} strokeWidth={2} />
      </span>
      <div className="df-journal-insight-text">
        <p>
          <strong>More brokers.</strong> A clearer trading view.
        </p>
        <span>Link your accounts and get a unified experience.</span>
      </div>
      <span className="df-journal-insight-deco" aria-hidden="true" />
    </div>
  </div>
);

const JournalMockup = () => {
  const [pct, setPct] = React.useState(56);

  const trendPath =
    "M4,86 C18,80 26,88 38,78 C50,68 58,80 70,72 C82,64 90,50 104,54 " +
    "C118,58 124,44 138,40 C150,37 158,50 172,44 C184,39 190,26 204,22 " +
    "C214,19 220,14 232,6";

  return (
    <div className="df-stage-inner df-journal-mock">
      <div className="df-journal-label-row">
        <span className="df-journal-label">
          Discipline score
          <Info size={12} strokeWidth={2} className="df-journal-info" />
        </span>
      </div>

      <div className="df-journal-main">
        <div className="df-journal-score-block">
          <span className="df-journal-score-big">{pct}</span>
          <span className="df-journal-score-max">/ 100</span>
        </div>

        <svg
          viewBox="0 0 240 92"
          className="df-journal-chart"
          preserveAspectRatio="none"
        >
          <path d={trendPath} className="df-journal-chart-line" />
          <circle cx="232" cy="6" r="5" className="df-journal-chart-dot-glow" />
          <circle cx="232" cy="6" r="3.5" className="df-journal-chart-dot" />
        </svg>
      </div>

      <div className="df-journal-delta">
        <TrendingUp size={13} strokeWidth={2.4} />
        +8.4% this week
      </div>

      <div className="df-journal-track">
        <div className="df-journal-fill" style={{ width: `${pct}%` }} />
      </div>

      <div className="df-journal-insight-box">
        <span className="df-journal-insight-icon">
          <Sparkles size={16} strokeWidth={2} />
        </span>
        <div className="df-journal-insight-text">
          <p>
            <strong>Consistency</strong> is trending upward.
          </p>
          <span>You've maintained better trading discipline this week.</span>
        </div>
        <span className="df-journal-insight-deco" aria-hidden="true" />
      </div>
    </div>
  );
};
const SupportMockup = () => (
  <div className="df-stage-inner df-support-mock">
    <div className="df-support-glow" aria-hidden="true" />

    <div className="df-avatar-cluster">
      {["#2557D6", "#159A78", "#C47A0A", "#7448D8"].map(
        (c, i) => (
          <span
            key={i}
            className="df-avatar"
            style={{
              background: c,
              zIndex: 4 - i,
            }}
          />
        )
      )}
    </div>

    <div className="df-online-tag">
      <span className="df-online-dot" />
      Online now
    </div>
  </div>
);

/* =========================================================
   STEP DEFINITIONS
========================================================= */

const STEPS = [
  {
    key: "sync",
    icon: RefreshCw,
    title: "Trade Synchronization",
    description:
      "Every fill from every broker lands in one place automatically — no CSVs, no copy-pasting.",
    Mockup: SyncMockup,
  },
  {
    key: "analytics",
    icon: LineChart,
    title: "AI-Powered Analytics",
    description:
      "Live win-rate, expectancy, and pattern detection with institutional-grade precision.",
    Mockup: AnalyticsMockup,
  },
  {
    key: "calendar",
    icon: CalendarClock,
    title: "Economic Calendar",
    description:
      "Key macro events mapped straight onto your trade history so context is never lost.",
    Mockup: CalendarMockup,
  },
  {
    key: "cross-platform",
    icon: Laptop,
    title: "Cross-Platform Access",
    description:
      "Your journal and reports, in sync on every device — pick up exactly where you left off.",
    Mockup: CrossPlatformMockup,
  },
  {
    key: "brokers",
    icon: Building2,
    title: "Multi-Broker Support",
    description: "Connect all your brokers in one place.",
    Mockup: BrokerConnectMockup,
  },
  {
    key: "journaling",
    icon: NotebookPen,
    title: "AI-Powered Journaling",
    description:
      "Every trade journaled and scored for discipline, automatically.",
    Mockup: JournalMockup,
  },
  {
    key: "support",
    icon: Headset,
    title: "24/7 Support",
    description:
      "Real traders and specialists, around the clock, every timezone.",
    Mockup: SupportMockup,
  },
];

const PIN_TOP = 96;
const MOBILE_STICKY_TOP = 12;

/* =========================================================
   STICKY FEATURE STEPPER
========================================================= */

const FeatureSteps = () => {
  const [active, setActive] = React.useState(0);
  const [colHeight, setColHeight] = React.useState(null);
  const [stageHeight, setStageHeight] = React.useState(0);
  const [offsetY, setOffsetY] = React.useState(0);
  const [isDesktop, setIsDesktop] = React.useState(true);

  const colRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const listRef = React.useRef(null);
  const stepRefs = React.useRef([]);

  React.useEffect(() => {
    const checkWidth = () =>
      setIsDesktop(window.innerWidth >= 1024);

    checkWidth();

    window.addEventListener("resize", checkWidth);

    return () =>
      window.removeEventListener("resize", checkWidth);
  }, []);

  React.useEffect(() => {
    const measure = () => {
      if (listRef.current) {
        setColHeight(listRef.current.offsetHeight);
      }

      if (stageRef.current) {
        setStageHeight(stageRef.current.offsetHeight);
      }
    };

    measure();

    const t = setTimeout(measure, 300);

    window.addEventListener("resize", measure);

    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", measure);
    };
  }, []);

  React.useEffect(() => {
    let ticking = false;

    const evaluate = () => {
      ticking = false;

      const viewportCenter = window.innerHeight / 2;

      let closest = 0;
      let closestDist = Infinity;

      stepRefs.current.forEach((el, i) => {
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);

        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      setActive(closest);

      if (!isDesktop || !colRef.current) {
        setOffsetY(0);
        return;
      }

      const rect = colRef.current.getBoundingClientRect();

      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const elHeight = stageHeight || 0;

      let top = Math.max(containerTop, PIN_TOP);

      top = Math.min(
        top,
        containerBottom - elHeight
      );

      setOffsetY(top - containerTop);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(evaluate);
      }
    };

    evaluate();

    window.addEventListener("scroll", onScroll, {
      passive: true,
    });

    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isDesktop, colHeight, stageHeight]);

  const ActiveMockup = STEPS[active].Mockup;
  const ActiveIcon = STEPS[active].icon;

  const progressPct =
    (active / (STEPS.length - 1)) * 100;

  const jumpTo = (i) => {
    const el = stepRefs.current[i];

    if (el) {
      el.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  return (
    <div className="df-steps-wrap">
      <div
        className="df-stage-col"
        ref={colRef}
        style={
          isDesktop && colHeight
            ? { height: colHeight }
            : undefined
        }
      >
        <div
          className="df-stage"
          ref={stageRef}
          style={
            isDesktop
              ? {
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  transform: `translateY(${offsetY}px)`,
                }
              : undefined
          }
        >
          <span className="df-stage-index">
            0{active + 1}
            <em>/0{STEPS.length}</em>
          </span>

          <div className="df-stage-card">
            <span
              className="df-stage-texture"
              aria-hidden="true"
            />

            <span
              className="df-stage-corner df-stage-corner-tl"
              aria-hidden="true"
            />

            <span
              className="df-stage-corner df-stage-corner-br"
              aria-hidden="true"
            />

            <span
              className="df-stage-sheen"
              aria-hidden="true"
            />

            <div className="df-stage-head">
              <span className="df-stage-head-icon">
                <ActiveIcon
                  size={16}
                  strokeWidth={2}
                />
              </span>

              <span
                key={STEPS[active].key}
                className="df-stage-head-title"
              >
                {STEPS[active].title}
              </span>
            </div>

            <div
              key={STEPS[active].key + "-body"}
              className="df-stage-body"
            >
              <ActiveMockup />
            </div>
          </div>
        </div>
      </div>

      <div className="df-steps" ref={listRef}>
        <span className="df-steps-line" />

        <span
          className="df-steps-progress"
          style={{
            height: `${progressPct}%`,
          }}
        />

        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = i === active;

          return (
            <div
              key={step.key}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              className={`df-step ${
                isActive ? "is-active" : ""
              }`}
              onClick={() => jumpTo(i)}
            >
              <span className="df-step-marker">
                <Icon
                  size={17}
                  strokeWidth={1.9}
                />
              </span>

              <div className="df-step-body">
                <h4>{step.title}</h4>
                <p>{step.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function DriftFeatures() {
  return (
    <section id="features" className="df-section">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

        .df-section,
        .df-section * {
          font-family: "Inter", sans-serif;
          box-sizing: border-box;
        }

        .df-section {
          background: #FBFCFE;
          padding: 96px 24px;
        }

        .df-inner {
          max-width: 1160px;
          margin: 0 auto;
        }

        /* ---------------- Heading ---------------- */

        .df-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          font-weight: 600;
          color: #2557D6;
          letter-spacing: 0.01em;
        }

        .df-eyebrow-dot {
          width: 6px;
          height: 6px;
          border-radius: 999px;
          background: #2557D6;
        }

        .df-heading {
          margin: 18px 0 0;
          max-width: 680px;
          font-size: 44px;
          font-weight: 700;
          line-height: 1.12;
          letter-spacing: -0.025em;
          color: #0B1220;
        }

        .df-sub {
          margin: 18px 0 0;
          max-width: 560px;
          font-size: 16px;
          line-height: 1.65;
          color: #5B6B84;
        }

        /* ---------------- Pinned Stepper ---------------- */

        .df-steps-wrap {
          margin-top: 64px;
          display: grid;
          grid-template-columns: 0.95fr 1.15fr;
          gap: 64px;
          align-items: start;
        }

        .df-stage-col {
          position: relative;
        }

        .df-stage {
          position: relative;
          min-height: 460px;
          z-index: 5;
        }

        .df-stage-index {
          position: absolute;
          top: -14px;
          right: 10px;
          z-index: 6;
          background: #fff;
          border: 1px solid rgba(13,20,36,0.08);
          border-radius: 999px;
          padding: 5px 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #14306E;
          box-shadow: 0 8px 18px rgba(20,48,110,0.14);
        }

        .df-stage-index em {
          font-style: normal;
          font-weight: 500;
          color: #97A3B7;
        }

        /* ---------------- Stage Card ---------------- */

        .df-stage-card {
          position: relative;
          isolation: isolate;
          z-index: 2;
          width: 100%;
          height: 100%;
          min-height: 460px;
          background:
            linear-gradient(
              180deg,
              #FFFFFF 0%,
              #FBFDFF 100%
            );
          border-radius: 28px;
          border: 1px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 1px 0 rgba(255,255,255,0.6) inset,
            0 24px 48px -20px rgba(20,48,110,0.22),
            0 10px 24px -12px rgba(20,48,110,0.14),
            0 0 0 1px rgba(13,20,36,0.06);
          padding: 30px 32px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .df-stage-texture {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background-image:
            radial-gradient(
              rgba(20,48,110,0.06) 1px,
              transparent 1px
            );
          background-size: 16px 16px;
          -webkit-mask-image:
            radial-gradient(
              ellipse 90% 80% at 50% 30%,
              #000 40%,
              transparent 90%
            );
          mask-image:
            radial-gradient(
              ellipse 90% 80% at 50% 30%,
              #000 40%,
              transparent 90%
            );
        }

        .df-stage-corner {
          position: absolute;
          z-index: 0;
          width: 220px;
          height: 220px;
          border-radius: 50%;
          filter: blur(46px);
          pointer-events: none;
        }

        .df-stage-corner-tl {
          top: -110px;
          left: -90px;
          background:
            radial-gradient(
              circle,
              rgba(37,87,214,0.16) 0%,
              transparent 72%
            );
        }

        .df-stage-corner-br {
          bottom: -120px;
          right: -100px;
          background:
            radial-gradient(
              circle,
              rgba(21,154,120,0.13) 0%,
              transparent 72%
            );
        }

        .df-stage-sheen {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background:
            linear-gradient(
              115deg,
              transparent 35%,
              rgba(255,255,255,0.55) 48%,
              transparent 60%
            );
          transform: translateX(-70%);
          animation:
            df-card-sheen 8s ease-in-out infinite;
          animation-delay: 1.4s;
          mix-blend-mode: soft-light;
        }

        @keyframes df-card-sheen {
          0% {
            transform: translateX(-70%);
          }

          40% {
            transform: translateX(70%);
          }

          100% {
            transform: translateX(70%);
          }
        }

        .df-stage-head {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom:
            1px solid rgba(13,20,36,0.06);
        }

        .df-stage-head-icon {
          width: 30px;
          height: 30px;
          border-radius: 9px;
          background:
            linear-gradient(
              135deg,
              #EEF3FE,
              #E2EAFB
            );
          color: #2557D6;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow:
            0 4px 10px rgba(37,87,214,0.18),
            inset 0 1px 0 rgba(255,255,255,0.6);
        }

        .df-stage-head-title {
          font-size: 14.5px;
          font-weight: 700;
          color: #0B1220;
          animation: df-fade-in 420ms ease;
        }

        .df-stage-body {
          position: relative;
          z-index: 2;
          flex: 1;
          display: flex;
          animation: df-fade-in 420ms ease;
        }

        @keyframes df-fade-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .df-stage-inner {
          flex: 1;
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 14px;
        }

        /* ---------------- Calendar ---------------- */

        .df-shot-frame {
          width: 100%;
          flex: 1;
          min-height: 240px;
          border-radius: 14px;
          overflow: hidden;
          border:
            1px solid rgba(13,20,36,0.06);
          box-shadow:
            0 12px 26px rgba(20,48,110,0.12);
          position: relative;
          background: #F6F8FC;
        }

        /* Static: the screenshot fills the frame and does not move.
           Use object-fit: contain instead of cover to show the whole
           image with no cropping. */
        .df-shot-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
        }

        /* ---------------- Feed Card ---------------- */

        .df-feed-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border:
            1px solid rgba(13,20,36,0.06);
          border-radius: 14px;
          padding: 12px 13px;
          box-shadow:
            0 8px 18px rgba(20,48,110,0.06);
        }

        .df-feed-card-bottom {
          opacity: 0.96;
        }

        .df-feed-logo {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F1F4F9;
          overflow: hidden;
        }

        .df-feed-logo img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .df-feed-logo-lg {
          width: 36px;
          height: 36px;
          border-radius: 10px;
        }

        .df-feed-logo-brand {
          background: #EEF3FE;
          color: #2557D6;
        }

        .df-feed-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
          flex: 1;
        }

        .df-feed-name {
          font-size: 12.5px;
          font-weight: 700;
          color: #12172A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .df-feed-sub {
          font-size: 10.5px;
          color: #8593AA;
          margin-top: 1px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .df-feed-amount {
          font-size: 13px;
          font-weight: 700;
          flex-shrink: 0;
        }

        .df-feed-amount.is-positive {
          color: #159A78;
        }

        .df-feed-amount.is-negative {
          color: #C4443A;
        }

        .df-feed-count {
          font-size: 11.5px;
          font-weight: 700;
          color: #159A78;
          background: rgba(21,154,120,0.12);
          border-radius: 999px;
          padding: 4px 10px;
          flex-shrink: 0;
        }

        .df-sync-cta {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          align-self: center;
          margin-top: 6px;
          background:
            linear-gradient(
              90deg,
              #2557D6,
              #4C7BEF
            );
          color: #fff;
          font-size: 12px;
          font-weight: 700;
          padding: 9px 18px;
          border-radius: 999px;
          box-shadow:
            0 10px 20px rgba(37,87,214,0.3);
        }

        .df-sync-cta-icon {
          animation: df-spin 2.2s linear infinite;
        }

        @keyframes df-spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---------------- AI Analytics ---------------- */

        .df-mini-analytics {
          gap: 20px;
        }

        .df-mini-stats-row {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .df-mini-stat {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .df-mini-stat-label {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #97A3B7;
        }

        .df-mini-stat-value {
          font-size: 19px;
          font-weight: 800;
          color: #0B1220;
          letter-spacing: -0.01em;
        }

        .df-mini-stat-value.is-positive {
          color: #159A78;
        }

        .df-mini-ring-wrap {
          position: relative;
          width: 50px;
          height: 50px;
          margin-left: auto;
          flex-shrink: 0;
        }

        .df-mini-ring {
          width: 50px;
          height: 50px;
          transform: rotate(-90deg);
        }

        .df-mini-ring-track {
          fill: none;
          stroke: #EEF3FE;
          stroke-width: 4.5;
        }

        .df-mini-ring-progress {
          fill: none;
          stroke: #2557D6;
          stroke-width: 4.5;
          stroke-linecap: round;
          transition: stroke-dashoffset 900ms ease;
        }

        .df-mini-ring-pct {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: #2557D6;
        }

        .df-mini-chart-wrap {
          position: relative;
          padding-top: 22px;
          border-top:
            1px solid rgba(13,20,36,0.06);
        }

        .df-mini-chart-tag {
          position: absolute;
          top: 10px;
          right: 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 10px;
          font-weight: 700;
          color: #2557D6;
          background: #EEF3FE;
          padding: 4px 9px;
          border-radius: 999px;
        }

        .df-mini-chart {
          width: 100%;
          height: 74px;
          display: block;
        }

        .df-mini-chart-line {
          fill: none;
          stroke: #2557D6;
          stroke-width: 2.4;
          stroke-linecap: round;
        }

        .df-mini-chart-dot {
          fill: #2557D6;
          filter:
            drop-shadow(
              0 0 5px rgba(37,87,214,0.55)
            );
          animation:
            df-pulse-scale 1.8s ease-in-out infinite;
        }

        @keyframes df-pulse-scale {
          0%,
          100% {
            r: 4;
          }

          50% {
            r: 5.5;
          }
        }

        .df-mini-insight {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: #5B6B84;
          background: #F6F8FC;
          border-radius: 10px;
          padding: 9px 11px;
        }

        /* ---------------- Cross Platform ---------------- */

        .df-cross-mock {
          position: relative;
          flex: 1;
          flex-direction: column !important;
          justify-content: flex-start;
          gap: 16px;
        }

        .df-cross-glow {
          position: absolute;
          left: 50%;
          top: 46%;
          width: 90%;
          height: 60%;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              ellipse,
              rgba(37,87,214,0.10),
              transparent 70%
            );
          filter: blur(24px);
          pointer-events: none;
        }

        .df-cross-heading {
          position: relative;
          z-index: 1;
          text-align: center;
        }

        .df-cross-heading h5 {
          margin: 0;
          font-size: 19px;
          font-weight: 800;
          line-height: 1.28;
          letter-spacing: -0.015em;
          color: #0B1220;
        }

        .df-cross-heading h5 span {
          color: #2557D6;
        }

        .df-cross-heading p {
          margin: 8px auto 0;
          max-width: 300px;
          font-size: 12px;
          line-height: 1.55;
          color: #6B7A91;
        }

        .df-cross-row {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .df-device {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .df-device img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter:
            drop-shadow(
              0 12px 22px rgba(20,48,110,0.16)
            );
        }

        .df-device-laptop {
          width: 150px;
          height: 112px;
        }

        .df-device-phone {
          width: 66px;
          height: 108px;
        }

        .df-cross-sync {
          position: relative;
          width: 76px;
          height: 44px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .df-cross-sync-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .df-cross-sync-path {
          fill: none;
          stroke: rgba(37,87,214,0.3);
          stroke-width: 1.6;
          stroke-dasharray: 4 5;
        }

        .df-cross-sync-dot {
          position: absolute;
          top: 50%;
          width: 7px;
          height: 7px;
          margin-top: -3.5px;
          border-radius: 999px;
          background: #2557D6;
          animation:
            df-broker-dot-pulse 2.2s ease-in-out infinite;
        }

        .df-cross-sync-dot-l {
          left: 4px;
        }

        .df-cross-sync-dot-r {
          right: 4px;
          animation-delay: 260ms;
        }

        .df-cross-sync-hub {
          position: relative;
          z-index: 1;
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background:
            linear-gradient(
              135deg,
              #EEF3FE,
              #E2EAFB
            );
          color: #2557D6;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 8px 16px rgba(37,87,214,0.2),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .df-cross-sync-label {
          position: relative;
          z-index: 1;
          display: block;
          text-align: center;
          font-size: 12px;
          font-weight: 600;
          color: #5B6B84;
          margin-top: -6px;
        }

        /* ---------------- Broker Marquee ---------------- */

        .df-marquee-mock {
          position: relative;
          overflow: hidden;
        }

        .df-marquee-track {
          display: flex;
          gap: 8px;
          width: max-content;
          animation:
            df-marquee 14s linear infinite;
        }

        .df-marquee-chip {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          font-size: 12px;
          font-weight: 600;
          color: #26314A;
          background: #F1F4F9;
          border:
            1px solid rgba(13,20,36,0.06);
          padding: 7px 14px 7px 8px;
          border-radius: 999px;
          white-space: nowrap;
        }

        .df-marquee-logo {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          object-fit: contain;
          background: #fff;
          padding: 2px;
          flex-shrink: 0;
        }

        @keyframes df-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(-50%);
          }
        }

        .df-marquee-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 32px;
          pointer-events: none;
        }

        .df-marquee-fade-l {
          left: 0;
          background:
            linear-gradient(
              90deg,
              #fff,
              transparent
            );
        }

        .df-marquee-fade-r {
          right: 0;
          background:
            linear-gradient(
              270deg,
              #fff,
              transparent
            );
        }

        /* ---------------- Multi-Broker Connect ---------------- */

        .df-broker-mock {
          gap: 14px;
        }

        .df-broker-canvas {
          position: relative;
          height: 230px;
          flex-shrink: 0;
        }

        .df-broker-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .df-broker-path {
          fill: none;
          stroke: rgba(37,87,214,0.28);
          stroke-width: 1.6;
          stroke-dasharray: 4 5;
          stroke-linecap: round;
        }

        .df-broker-path-flow {
          fill: none;
          stroke: #2557D6;
          stroke-width: 1.6;
          stroke-linecap: round;
          stroke-dasharray: 6 46;
          opacity: 0.65;
          animation: df-broker-flow 3.2s linear infinite;
        }

        @keyframes df-broker-flow {
          to {
            stroke-dashoffset: -104;
          }
        }

        .df-broker-dot {
          fill: #2557D6;
          transform-origin: center;
          transform-box: fill-box;
          animation: df-broker-dot-pulse 2.4s ease-in-out infinite;
        }

        @keyframes df-broker-dot-pulse {
          0%,
          100% {
            opacity: 0.55;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.35);
          }
        }

        .df-broker-node {
          position: absolute;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 7px;
          width: 92px;
          padding: 12px 8px 10px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid rgba(13,20,36,0.05);
          box-shadow: 0 12px 22px rgba(20,48,110,0.10);
          text-align: center;
          opacity: 0;
          animation: df-fade-in 500ms ease forwards;
        }

        .df-broker-node-tl {
          top: 0%;
          left: 18%;
          animation-delay: 80ms;
        }

        .df-broker-node-tr {
          top: 0%;
          right: 16%;
          animation-delay: 200ms;
        }

        .df-broker-node-bl {
          top: 58%;
          left: 0%;
          animation-delay: 320ms;
        }

        .df-broker-node-br {
          top: 58%;
          right: 0%;
          animation-delay: 440ms;
        }

        .df-broker-node-icon {
          width: 34px;
          height: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .df-broker-node-icon img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .df-broker-node-name {
          font-size: 11.5px;
          font-weight: 700;
          color: #12172A;
          white-space: nowrap;
        }

        .df-broker-hub {
          position: absolute;
          z-index: 3;
          top: 44%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 66px;
          height: 66px;
          border-radius: 50%;
          background: linear-gradient(135deg, #EEF3FE, #E2EAFB);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #2557D6;
          box-shadow:
            0 10px 22px rgba(37,87,214,0.22),
            inset 0 1px 0 rgba(255,255,255,0.7);
        }

        .df-broker-hub-glow {
          position: absolute;
          inset: -22px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(37,87,214,0.18),
            transparent 70%
          );
          filter: blur(6px);
          animation: df-pulse 2.6s ease-out infinite;
          z-index: -1;
        }

        .df-broker-caption {
          text-align: center;
        }

        .df-broker-caption h5 {
          margin: 0;
          font-size: 15px;
          font-weight: 800;
          color: #0B1220;
          letter-spacing: -0.01em;
        }

        .df-broker-caption p {
          margin: 5px 0 0;
          font-size: 12px;
          color: #6B7A91;
        }

        /* ---------------- Journal ---------------- */

        /* ---------------- AI-Powered Journaling ---------------- */

        .df-journal-mock {
          gap: 14px;
        }

        .df-journal-label-row {
          display: flex;
          align-items: center;
        }

        .df-journal-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #6B7A91;
        }

        .df-journal-info {
          color: #97A3B7;
        }

        .df-journal-main {
          display: flex;
          align-items: flex-end;
          gap: 10px;
        }

        .df-journal-score-block {
          display: flex;
          align-items: baseline;
          gap: 6px;
          flex-shrink: 0;
        }

        .df-journal-score-big {
          font-size: 52px;
          font-weight: 800;
          line-height: 1;
          letter-spacing: -0.03em;
          background: linear-gradient(180deg, #0B1220, #14306E);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .df-journal-score-max {
          font-size: 16px;
          font-weight: 600;
          color: #97A3B7;
        }

        .df-journal-chart {
          flex: 1;
          height: 78px;
          min-width: 0;
          overflow: visible;
        }

        .df-journal-chart-line {
          fill: none;
          stroke: #2557D6;
          stroke-width: 2.6;
          stroke-linecap: round;
        }

        .df-journal-chart-dot {
          fill: #2557D6;
        }

        .df-journal-chart-dot-glow {
          fill: #2557D6;
          opacity: 0.25;
          animation: df-pulse-scale 1.8s ease-in-out infinite;
        }

        .df-journal-delta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          align-self: flex-start;
          font-size: 13px;
          font-weight: 700;
          color: #159A78;
        }

        .df-journal-track {
          height: 8px;
          border-radius: 999px;
          background: #EEF1F6;
          overflow: hidden;
        }

        .df-journal-fill {
          height: 100%;
          border-radius: 999px;
          background: linear-gradient(90deg, #2557D6, #63A0FF);
          transition: width 420ms ease;
        }

        .df-journal-insight-box {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
          margin-top: 4px;
          padding: 14px 16px;
          border-radius: 14px;
          background: linear-gradient(135deg, #EEF3FE, #F5F8FF);
          border: 1px solid rgba(37, 87, 214, 0.1);
          overflow: hidden;
        }

        .df-journal-insight-icon {
          flex-shrink: 0;
          color: #2557D6;
          margin-top: 2px;
        }

        .df-journal-insight-text {
          position: relative;
          z-index: 1;
        }

        .df-journal-insight-text p {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
          color: #0B1220;
        }

        .df-journal-insight-text p strong {
          color: #2557D6;
          font-weight: 700;
        }

        .df-journal-insight-text span {
          display: block;
          margin-top: 3px;
          font-size: 12px;
          color: #6B7A91;
          line-height: 1.5;
        }

        .df-journal-insight-deco {
          position: absolute;
          right: -20px;
          bottom: -20px;
          width: 90px;
          height: 90px;
          border-radius: 50%;
          border: 14px solid rgba(37, 87, 214, 0.06);
          pointer-events: none;
        }

        /* ---------------- Support ---------------- */

        .df-support-mock {
          position: relative;
          flex: 1;
          flex-direction: row !important;
          align-items: center;
          justify-content: center;
          gap: 14px;
        }

        .df-support-glow {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 220px;
          height: 140px;
          transform: translate(-50%, -50%);
          background:
            radial-gradient(
              ellipse,
              rgba(21,154,120,0.14),
              transparent 70%
            );
          filter: blur(18px);
          pointer-events: none;
        }

        .df-avatar-cluster {
          position: relative;
          z-index: 1;
          display: flex;
        }

        .df-avatar {
          width: 30px;
          height: 30px;
          border-radius: 999px;
          border: 2px solid #fff;
          margin-left: -9px;
          box-shadow:
            0 4px 10px rgba(20,48,110,0.14);
        }

        .df-avatar-cluster .df-avatar:first-child {
          margin-left: 0;
        }

        .df-online-tag {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          font-weight: 600;
          color: #159A78;
        }

        .df-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #159A78;
          animation:
            df-pulse 1.8s ease-out infinite;
        }

        @keyframes df-pulse {
          0% {
            box-shadow:
              0 0 0 0 rgba(21,154,120,0.45);
          }

          70% {
            box-shadow:
              0 0 0 6px rgba(21,154,120,0);
          }

          100% {
            box-shadow:
              0 0 0 0 rgba(21,154,120,0);
          }
        }

        /* ---------------- Steps List ---------------- */

        .df-steps {
          position: relative;
          padding-left: 60px;
        }

        .df-steps-line {
          position: absolute;
          left: 19px;
          top: 20px;
          bottom: 20px;
          width: 2px;
          background:
            rgba(13,20,36,0.08);
          border-radius: 2px;
        }

        .df-steps-progress {
          position: absolute;
          left: 19px;
          top: 20px;
          width: 2px;
          background:
            linear-gradient(
              180deg,
              #2557D6,
              #4C7BEF
            );
          border-radius: 2px;
          transition:
            height 500ms
            cubic-bezier(.4,0,.2,1);
        }

        .df-step {
          position: relative;
          display: flex;
          gap: 20px;
          align-items: flex-start;
          padding: 26px 0;
          cursor: pointer;
        }

        .df-step-marker {
          position: absolute;
          left: -60px;
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: #fff;
          border:
            1px solid rgba(13,20,36,0.1);
          color: #97A3B7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          z-index: 1;
          transition:
            background 300ms ease,
            color 300ms ease,
            border-color 300ms ease,
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .df-step.is-active .df-step-marker {
          background: #2557D6;
          border-color: #2557D6;
          color: #fff;
          transform: scale(1.06);
          box-shadow:
            0 8px 18px rgba(37,87,214,0.32);
        }

        .df-step-body {
          transition:
            transform 300ms ease;
        }

        .df-step.is-active .df-step-body {
          transform: translateX(4px);
        }

        .df-step-body h4 {
          margin: 6px 0 0;
          font-size: 17px;
          font-weight: 700;
          color: #97A3B7;
          letter-spacing: -0.01em;
          transition: color 300ms ease;
        }

        .df-step.is-active .df-step-body h4 {
          color: #0B1220;
        }

        .df-step-body p {
          margin: 8px 0 0;
          font-size: 13.5px;
          line-height: 1.6;
          color: #97A3B7;
          max-width: 400px;
          transition: color 300ms ease;
        }

        .df-step.is-active .df-step-body p {
          color: #5B6B84;
        }

        /* ---------------- Security ---------------- */

        .df-security {
          margin-top: 72px;
          border-radius: 24px;
          padding: 34px 40px;
          background: #0B1220;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          position: relative;
          overflow: hidden;
        }

        .df-security::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(
              500px 220px at 15% 0%,
              rgba(37,87,214,0.35),
              transparent 60%
            );
          pointer-events: none;
        }

        .df-security-left {
          position: relative;
          z-index: 2;
          max-width: 420px;
        }

        .df-security-left h3 {
          margin: 0;
          color: #fff;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.015em;
        }

        .df-security-left p {
          margin: 8px 0 0;
          color: rgba(255,255,255,0.6);
          font-size: 13.5px;
          line-height: 1.6;
        }

        .df-security-badges {
          position: relative;
          z-index: 2;
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
        }

        .df-security-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          background:
            rgba(255,255,255,0.06);
          border:
            1px solid rgba(255,255,255,0.12);
          border-radius: 14px;
          padding: 12px 16px;
          min-width: 150px;
        }

        .df-security-badge-icon {
          width: 32px;
          height: 32px;
          border-radius: 9px;
          background:
            rgba(37,87,214,0.25);
          color: #7FA6FF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .df-security-badge-title {
          color: #fff;
          font-size: 12.5px;
          font-weight: 700;
        }

        .df-security-badge-sub {
          color: rgba(255,255,255,0.5);
          font-size: 10px;
          margin-top: 1px;
        }

        /* =====================================================
           RESPONSIVE
        ===================================================== */

        @media (max-width: 1023px) {
          .df-steps-wrap {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .df-stage-col {
            position: sticky;
            top: ${MOBILE_STICKY_TOP}px;
            z-index: 30;
            height: auto !important;
            align-self: start;
          }

          .df-stage {
            min-height: 380px;
          }

          .df-stage-card {
            min-height: 380px;
          }
        }

        @media (max-width: 639px) {
          .df-section {
            padding: 64px 18px;
          }

          .df-heading {
            font-size: 32px;
          }

          .df-stage {
            min-height: 330px;
          }

          .df-stage-card {
            min-height: 330px;
            padding: 22px 20px;
          }

          .df-device-laptop {
            width: 128px;
            height: 96px;
          }

          .df-device-phone {
            width: 62px;
            height: 102px;
          }

          .df-cross-mock {
            gap: 12px;
          }

          .df-cross-heading h5 {
            font-size: 17px;
          }

          .df-cross-heading p {
            max-width: 270px;
            font-size: 11px;
          }

          .df-cross-row {
            gap: 2px;
          }

          .df-cross-sync {
            width: 58px;
          }

          .df-cross-sync-hub {
            width: 36px;
            height: 36px;
            border-radius: 11px;
          }

          .df-cross-sync-label {
            font-size: 11px;
          }

          .df-shot-frame {
            min-height: 190px;
          }

          .df-broker-canvas {
            height: 180px;
          }

          .df-broker-node {
            width: 76px;
            padding: 9px 6px 8px;
            gap: 5px;
            border-radius: 13px;
          }

          .df-broker-node-icon {
            width: 28px;
            height: 28px;
          }

          .df-broker-node-name {
            font-size: 10px;
          }

          .df-broker-hub {
            width: 56px;
            height: 56px;
          }

          .df-broker-node-tl {
            left: 12%;
          }

          .df-broker-node-tr {
            right: 10%;
          }


          .df-steps {
            padding-left: 50px;
          }

          .df-step-marker {
            left: -50px;
            width: 34px;
            height: 34px;
          }

          .df-steps-line,
          .df-steps-progress {
            left: 16px;
          }

          .df-security {
            flex-direction: column;
            align-items: flex-start;
            padding: 28px;
            margin-top: 56px;
          }

          .df-security-badges {
            width: 100%;
          }

          .df-security-badge {
            flex: 1;
            min-width: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .df-section *,
          .df-section *::before,
          .df-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>

      <div className="df-inner">
        <span className="df-eyebrow">
          <span className="df-eyebrow-dot" />
          Trading intelligence
        </span>

        <h2 className="df-heading">
          Everything you need to find your real edge
        </h2>

        <p className="df-sub">
          Turn raw broker fills into complete trades, measurable
          expectancy, and clear trading patterns — without
          spreadsheets or manual journaling.
        </p>

        <FeatureSteps />

        <div className="df-security">
          <div className="df-security-left">
            <h3>
              Bank-level security, by default
            </h3>

            <p>
              Every trade you sync is encrypted end-to-end
              and stored under SOC 2-compliant
              infrastructure.
            </p>
          </div>

          <div className="df-security-badges">
            <div className="df-security-badge">
              <span className="df-security-badge-icon">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <div className="df-security-badge-title">
                  SOC 2
                </div>

                <div className="df-security-badge-sub">
                  Compliant
                </div>
              </div>
            </div>

            <div className="df-security-badge">
              <span className="df-security-badge-icon">
                <ShieldCheck
                  size={16}
                  strokeWidth={1.8}
                />
              </span>

              <div>
                <div className="df-security-badge-title">
                  256-bit
                </div>

                <div className="df-security-badge-sub">
                  Encryption
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}