import React from 'react';

/**
 * Drift Feature Intelligence Cube
 *
 * Visual direction:
 * - Deep royal / dark blue cube
 * - Bright blue top face
 * - Deep blue left face
 * - Strong royal blue right face
 * - Soft blue ambient glow
 * - Subtle signal nodes
 * - Thin orbit
 * - Light pulse lines
 * - Processing status
 *
 * Designed for Drift's light theme.
 */

export default function FeatureGridCube({ className = '' }) {
  return (
    <div
      className={`relative select-none ${className}`}
      aria-hidden="true"
    >
      <style>{`
        /* =====================================================
           CUBE FLOAT
        ====================================================== */

        @keyframes drift-cube-float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }

          50% {
            transform: translateY(-9px) rotate(3deg);
          }
        }

        .drift-cube-group {
          animation: drift-cube-float 6.5s ease-in-out infinite;
          transform-origin: center;
        }

        /* =====================================================
           ORBIT
        ====================================================== */

        @keyframes drift-orbit {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .drift-orbit {
          transform-origin: 200px 200px;
          animation: drift-orbit 18s linear infinite;
        }

        /* =====================================================
           ORBIT PULSE
        ====================================================== */

        @keyframes drift-orbit-pulse {
          0%,
          100% {
            opacity: 0.18;
          }

          50% {
            opacity: 0.4;
          }
        }

        .drift-orbit-ring {
          animation: drift-orbit-pulse 4s ease-in-out infinite;
        }

        /* =====================================================
           SIGNAL NODE
        ====================================================== */

        @keyframes drift-node-pulse {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 1;
            transform: scale(1.3);
          }
        }

        .drift-node {
          transform-box: fill-box;
          transform-origin: center;
          animation: drift-node-pulse 3s ease-in-out infinite;
        }

        .drift-node-2 {
          animation-delay: 0.8s;
        }

        .drift-node-3 {
          animation-delay: 1.6s;
        }

        .drift-node-4 {
          animation-delay: 2.3s;
        }

        /* =====================================================
           SIGNAL LINE PULSE
        ====================================================== */

        @keyframes drift-signal {
          0% {
            stroke-dashoffset: 180;
            opacity: 0;
          }

          15% {
            opacity: 0.7;
          }

          55% {
            opacity: 0.7;
          }

          75% {
            opacity: 0;
          }

          100% {
            stroke-dashoffset: 0;
            opacity: 0;
          }
        }

        .drift-signal-line {
          stroke-dasharray: 5 175;
          animation: drift-signal 4s ease-in-out infinite;
        }

        .drift-signal-delay-1 {
          animation-delay: 0.7s;
        }

        .drift-signal-delay-2 {
          animation-delay: 1.4s;
        }

        .drift-signal-delay-3 {
          animation-delay: 2.1s;
        }

        /* =====================================================
           GLOW
        ====================================================== */

        @keyframes drift-glow {
          0%,
          100% {
            opacity: 0.6;
            transform: scale(1);
          }

          50% {
            opacity: 0.85;
            transform: scale(1.04);
          }
        }

        .drift-glow {
          transform-origin: center;
          animation: drift-glow 5s ease-in-out infinite;
        }

        /* =====================================================
           STATUS DOT
        ====================================================== */

        @keyframes drift-status-pulse {
          0%,
          100% {
            opacity: 0.45;
            box-shadow: 0 0 0 0 rgba(31, 169, 131, 0.18);
          }

          50% {
            opacity: 1;
            box-shadow: 0 0 0 5px rgba(31, 169, 131, 0);
          }
        }

        .drift-status-dot {
          animation: drift-status-pulse 2.4s ease-in-out infinite;
        }

        /* =====================================================
           REDUCED MOTION
        ====================================================== */

        @media (prefers-reduced-motion: reduce) {
          .drift-cube-group,
          .drift-orbit,
          .drift-orbit-ring,
          .drift-node,
          .drift-signal-line,
          .drift-glow,
          .drift-status-dot {
            animation: none !important;
          }

          .drift-orbit-ring {
            opacity: 0.3;
          }

          .drift-node {
            opacity: 0.65;
          }
        }
      `}</style>

      <div className="relative mx-auto aspect-square w-full max-w-[400px]">

        {/* =====================================================
            BLUE AMBIENT GLOW
        ====================================================== */}

        <div
          className="drift-glow pointer-events-none absolute left-1/2 top-1/2 h-[310px] w-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{
            background: `
              radial-gradient(
                circle,
                rgba(74, 134, 229, 0.22) 0%,
                rgba(44, 95, 189, 0.13) 35%,
                rgba(31, 169, 131, 0.035) 62%,
                transparent 78%
              )
            `,
          }}
        />

        <svg
          viewBox="0 0 400 400"
          className="relative h-full w-full overflow-visible"
        >
          <defs>

            {/* =================================================
                MAIN BLUE GLOW
            ================================================== */}

            <radialGradient
              id="drift-cube-glow"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="#8FC2F8"
                stopOpacity="0.65"
              />

              <stop
                offset="35%"
                stopColor="#4A86E5"
                stopOpacity="0.26"
              />

              <stop
                offset="65%"
                stopColor="#2C5FBD"
                stopOpacity="0.08"
              />

              <stop
                offset="100%"
                stopColor="#2C5FBD"
                stopOpacity="0"
              />
            </radialGradient>

            {/* =================================================
                CORE LIGHT
            ================================================== */}

            <radialGradient
              id="drift-cube-core"
              cx="50%"
              cy="50%"
              r="50%"
            >
              <stop
                offset="0%"
                stopColor="#FFFFFF"
                stopOpacity="0.9"
              />

              <stop
                offset="45%"
                stopColor="#BBD9F8"
                stopOpacity="0.25"
              />

              <stop
                offset="100%"
                stopColor="#4A86E5"
                stopOpacity="0"
              />
            </radialGradient>

            {/* =================================================
                TOP FACE
                Bright blue like the reference
            ================================================== */}

            <linearGradient
              id="drift-cube-top"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#A9D0F8"
              />

              <stop
                offset="42%"
                stopColor="#6FAAF0"
              />

              <stop
                offset="100%"
                stopColor="#3B82DF"
              />
            </linearGradient>

            {/* =================================================
                RIGHT FACE
                Strong royal blue
            ================================================== */}

            <linearGradient
              id="drift-cube-right"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2E7BE0"
              />

              <stop
                offset="45%"
                stopColor="#1769D5"
              />

              <stop
                offset="100%"
                stopColor="#0752B8"
              />
            </linearGradient>

            {/* =================================================
                LEFT FACE
                Deep dark blue
            ================================================== */}

            <linearGradient
              id="drift-cube-left"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#285FAE"
              />

              <stop
                offset="45%"
                stopColor="#174C98"
              />

              <stop
                offset="100%"
                stopColor="#0D356F"
              />
            </linearGradient>

            {/* =================================================
                ORBIT
            ================================================== */}

            <linearGradient
              id="drift-orbit-gradient"
              x1="0"
              y1="0"
              x2="1"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#2C5FBD"
                stopOpacity="0"
              />

              <stop
                offset="45%"
                stopColor="#4A86E5"
                stopOpacity="0.55"
              />

              <stop
                offset="100%"
                stopColor="#7DB4F3"
                stopOpacity="0"
              />
            </linearGradient>

            {/* =================================================
                SOFT BLUR
            ================================================== */}

            <filter
              id="drift-cube-blur"
              x="-60%"
              y="-60%"
              width="220%"
              height="220%"
            >
              <feGaussianBlur stdDeviation="14" />
            </filter>

          </defs>

          {/* =====================================================
              AMBIENT GLOW
          ====================================================== */}

          <circle
            cx="200"
            cy="200"
            r="150"
            fill="url(#drift-cube-glow)"
          />

          <circle
            cx="200"
            cy="200"
            r="62"
            fill="url(#drift-cube-core)"
            filter="url(#drift-cube-blur)"
          />

          {/* =====================================================
              ORBIT
          ====================================================== */}

          <g className="drift-orbit">

            <ellipse
              className="drift-orbit-ring"
              cx="200"
              cy="200"
              rx="143"
              ry="72"
              fill="none"
              stroke="url(#drift-orbit-gradient)"
              strokeWidth="1.2"
              strokeDasharray="4 8"
            />

            <circle
              cx="343"
              cy="200"
              r="3"
              fill="#4A86E5"
              opacity="0.8"
            />

            <circle
              cx="57"
              cy="200"
              r="2.5"
              fill="#6FAAF0"
              opacity="0.7"
            />

          </g>

          {/* =====================================================
              SIGNAL LINES
          ====================================================== */}

          <g
            fill="none"
            strokeWidth="1.2"
          >

            <line
              className="drift-signal-line"
              x1="200"
              y1="200"
              x2="72"
              y2="100"
              stroke="#72B1F4"
            />

            <line
              className="drift-signal-line drift-signal-delay-1"
              x1="200"
              y1="200"
              x2="328"
              y2="100"
              stroke="#8CC3FA"
            />

            <line
              className="drift-signal-line drift-signal-delay-2"
              x1="200"
              y1="200"
              x2="78"
              y2="310"
              stroke="#6FA8E9"
            />

            <line
              className="drift-signal-line drift-signal-delay-3"
              x1="200"
              y1="200"
              x2="322"
              y2="310"
              stroke="#5A96E1"
            />

          </g>

          {/* =====================================================
              SIGNAL NODES
          ====================================================== */}

          <g>

            <circle
              className="drift-node"
              cx="72"
              cy="100"
              r="3"
              fill="#6EAFF2"
            />

            <circle
              className="drift-node drift-node-2"
              cx="328"
              cy="100"
              r="3"
              fill="#7DB9F5"
            />

            <circle
              className="drift-node drift-node-3"
              cx="78"
              cy="310"
              r="3"
              fill="#5D9BE6"
            />

            <circle
              className="drift-node drift-node-4"
              cx="322"
              cy="310"
              r="3"
              fill="#4B8DDB"
            />

          </g>

          {/* =====================================================
              CUBE
          ====================================================== */}

          <g className="drift-cube-group">

            {/* -------------------------------------------------
                TOP FACE
            -------------------------------------------------- */}

            <polygon
              points="200,110 278,155 200,200 122,155"
              fill="url(#drift-cube-top)"
              fillOpacity="0.96"
              stroke="#EAF4FF"
              strokeWidth="1.35"
              strokeOpacity="0.9"
            />

            {/* -------------------------------------------------
                RIGHT FACE
            -------------------------------------------------- */}

            <polygon
              points="200,200 278,155 278,245 200,290"
              fill="url(#drift-cube-right)"
              fillOpacity="0.94"
              stroke="#DDEEFF"
              strokeWidth="1.35"
              strokeOpacity="0.9"
            />

            {/* -------------------------------------------------
                LEFT FACE
            -------------------------------------------------- */}

            <polygon
              points="122,155 200,200 200,290 122,245"
              fill="url(#drift-cube-left)"
              fillOpacity="0.94"
              stroke="#DDEEFF"
              strokeWidth="1.35"
              strokeOpacity="0.82"
            />

            {/* -------------------------------------------------
                TOP EDGE HIGHLIGHT
            -------------------------------------------------- */}

            <polyline
              points="122,155 200,110 278,155"
              fill="none"
              stroke="#F4FAFF"
              strokeWidth="1.8"
              strokeOpacity="0.9"
            />

            {/* -------------------------------------------------
                CENTER EDGE
            -------------------------------------------------- */}

            <line
              x1="200"
              y1="200"
              x2="200"
              y2="290"
              stroke="#E7F4FF"
              strokeWidth="1.4"
              strokeOpacity="0.9"
            />

            {/* -------------------------------------------------
                CENTER LIGHT
            -------------------------------------------------- */}

            <circle
              cx="200"
              cy="200"
              r="4.5"
              fill="#FFFFFF"
              opacity="0.35"
            />

          </g>

          {/* =====================================================
              SMALL DATA LABELS
          ====================================================== */}

          <g
            fontFamily="Inter, Arial, sans-serif"
            fontSize="8"
            fontWeight="600"
            letterSpacing="0.08em"
          >

            <text
              x="42"
              y="86"
              fill="#5C6478"
              opacity="0.48"
            >
              RAW FILLS
            </text>

            <text
              x="285"
              y="86"
              fill="#5C6478"
              opacity="0.48"
            >
              SIGNAL
            </text>

            <text
              x="40"
              y="330"
              fill="#5C6478"
              opacity="0.42"
            >
              RISK DATA
            </text>

            <text
              x="290"
              y="330"
              fill="#5C6478"
              opacity="0.42"
            >
              EDGE
            </text>

          </g>

        </svg>

        {/* =====================================================
            PROCESSING STATUS
        ====================================================== */}

        <div className="absolute bottom-[7%] left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-[#14161C]/[0.07] bg-white/80 px-3 py-1.5 shadow-[0_4px_18px_rgba(20,22,28,0.06)] backdrop-blur-sm">

          <span className="drift-status-dot h-1.5 w-1.5 rounded-full bg-[#1FA983]" />

          <span className="font-sans text-[9px] font-semibold uppercase tracking-[0.1em] text-[#5C6478]">
            Processing trading intelligence
          </span>

        </div>

      </div>
    </div>
  );
}