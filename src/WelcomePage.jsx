import { useState, useEffect } from "react";

// Inject Google Fonts (same as App.jsx)
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400&display=swap";
if (!document.head.querySelector("[href*='Cormorant']")) {
  document.head.appendChild(fontLink);
}

// ── Petal configs ──────────────────────────────────────────────
const PETALS = [
  { w: 22, h: 14, color: "#f8bbd9", left: "5%",  delay: "0s",   dur: "8s"  },
  { w: 14, h: 9,  color: "#f3e5f5", left: "18%", delay: "2.1s", dur: "11s" },
  { w: 18, h: 12, color: "#fce4ec", left: "33%", delay: "0.6s", dur: "9s"  },
  { w: 10, h: 7,  color: "#f8bbd9", left: "50%", delay: "3.4s", dur: "7s"  },
  { w: 20, h: 13, color: "#f3e5f5", left: "63%", delay: "1.2s", dur: "10s" },
  { w: 13, h: 9,  color: "#fce4ec", left: "78%", delay: "4.5s", dur: "8.5s"},
  { w: 16, h: 11, color: "#f8bbd9", left: "91%", delay: "0.3s", dur: "12s" },
  { w: 11, h: 7,  color: "#fce4ec", left: "42%", delay: "5s",   dur: "9.5s"},
];

// ── Sparkle positions ──────────────────────────────────────────
const SPARKLES = [
  { top: "12%", left: "8%",  size: 6,  delay: "0s"   },
  { top: "25%", left: "88%", size: 4,  delay: "0.8s" },
  { top: "60%", left: "5%",  size: 5,  delay: "1.6s" },
  { top: "72%", left: "93%", size: 7,  delay: "0.3s" },
  { top: "40%", left: "92%", size: 4,  delay: "2s"   },
  { top: "85%", left: "15%", size: 5,  delay: "1.1s" },
  { top: "18%", left: "55%", size: 3,  delay: "2.5s" },
  { top: "50%", left: "50%", size: 4,  delay: "0.5s" },
];

export default function WelcomePage({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Stagger in after mount
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => onEnter(), 900);
  };

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(-30px) rotate(0deg) scale(1);   opacity: 0; }
          8%   { opacity: 0.22; }
          92%  { opacity: 0.22; }
          100% { transform: translateY(110vh) rotate(200deg) scale(0.8); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg);   opacity: 0; }
          50%       { transform: scale(1) rotate(180deg); opacity: 0.7; }
        }
        @keyframes floatY {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-10px); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.95); opacity: 0.6; }
          70%  { transform: scale(1.08); opacity: 0; }
          100% { transform: scale(0.95); opacity: 0; }
        }
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes revealLine {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes pageLeave {
          from { opacity: 1; transform: scale(1); }
          to   { opacity: 0; transform: scale(1.04); }
        }
        .welcome-btn {
          cursor: pointer;
          border: none;
          outline: none;
          background: none;
          padding: 0;
          transition: transform 0.2s ease;
        }
        .welcome-btn:hover .btn-inner {
          background: linear-gradient(135deg, #e8789a, #c0527c) !important;
          box-shadow: 0 8px 32px rgba(192,82,124,0.45), 0 2px 8px rgba(192,82,124,0.2) !important;
        }
        .welcome-btn:hover {
          transform: translateY(-2px);
        }
        .welcome-btn:active {
          transform: translateY(0px);
        }
      `}</style>

      {/* Root */}
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(ellipse at 60% 20%, #fce4ec 0%, #f8bbd9 18%, #f3e5f5 45%, #fce4ec 70%, #fff0f5 100%)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          animation: leaving ? "pageLeave 0.85s ease forwards" : undefined,
        }}
      >
        {/* Ambient blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-8%",
            width: 380, height: 380,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(248,187,209,0.45) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-8%", right: "-6%",
            width: 320, height: 320,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(243,229,245,0.5) 0%, transparent 70%)",
            filter: "blur(35px)",
          }} />
          <div style={{
            position: "absolute", top: "40%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500, height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(252,228,236,0.3) 0%, transparent 70%)",
            filter: "blur(50px)",
          }} />
        </div>

        {/* Floating petals */}
        {PETALS.map((p, i) => (
          <div key={i} style={{
            position: "absolute",
            width: p.w, height: p.h,
            background: p.color,
            left: p.left, top: "-20px",
            borderRadius: "50% 0 50% 0",
            opacity: 0,
            animation: `petalDrift ${p.dur} ${p.delay} linear infinite`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Sparkles */}
        {SPARKLES.map((s, i) => (
          <div key={i} style={{
            position: "absolute",
            top: s.top, left: s.left,
            width: s.size, height: s.size,
            pointerEvents: "none",
            animation: `sparkle 3s ${s.delay} ease-in-out infinite`,
          }}>
            {/* 4-point star */}
            <svg viewBox="0 0 10 10" width={s.size} height={s.size}>
              <path
                d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z"
                fill="#d4789a"
                opacity="0.8"
              />
            </svg>
          </div>
        ))}

        {/* Main card */}
        <div style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
          padding: "0 24px",
          maxWidth: 420,
          width: "100%",
          animation: visible ? "fadeSlideUp 0.9s cubic-bezier(0.23,1,0.32,1) forwards" : "none",
          opacity: visible ? undefined : 0,
        }}>

          {/* Top ornament */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10, marginBottom: 28,
            animation: visible ? "fadeIn 1s 0.3s both" : undefined,
          }}>
            <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, #d4789a)" }} />
            <span style={{ color: "#d4789a", fontSize: 14 }}>✿</span>
            <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, #d4789a)" }} />
          </div>

          {/* Small label */}
          <p style={{
            color: "#b06888",
            fontSize: 10,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            marginBottom: 16,
            animation: visible ? "fadeSlideUp 0.8s 0.15s both" : undefined,
          }}>
            a gift for
          </p>

          {/* Big title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 300,
            fontStyle: "italic",
            fontSize: "clamp(48px, 14vw, 72px)",
            color: "#a04060",
            lineHeight: 1.05,
            textAlign: "center",
            margin: 0,
            textShadow: "0 2px 20px rgba(180,80,110,0.15)",
            animation: visible ? "fadeSlideUp 1s 0.25s both" : undefined,
          }}>
            Mama
          </h1>

          {/* Decorative divider */}
          <div style={{
            width: 80, height: 1,
            background: "linear-gradient(to right, transparent, #d4789a, transparent)",
            margin: "20px auto",
            transformOrigin: "center",
            animation: visible ? "revealLine 0.8s 0.6s both" : undefined,
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: 18,
            color: "#b87090",
            textAlign: "center",
            lineHeight: 1.7,
            margin: "0 0 8px 0",
            animation: visible ? "fadeSlideUp 0.8s 0.5s both" : undefined,
          }}>
            a little something made with love,<br />
            just for you 🌸
          </p>

          {/* Sub-label */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 10,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#c898b0",
            textAlign: "center",
            margin: "0 0 48px 0",
            animation: visible ? "fadeSlideUp 0.8s 0.6s both" : undefined,
          }}>
            happy mother's day 2025
          </p>

          {/* CTA Button */}
          <div style={{
            animation: visible ? "fadeSlideUp 0.8s 0.75s both" : undefined,
            position: "relative",
          }}>
            {/* Pulse ring */}
            <div style={{
              position: "absolute",
              inset: -8,
              borderRadius: 100,
              border: "1.5px solid rgba(212,120,154,0.4)",
              animation: "pulseRing 2.4s ease-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute",
              inset: -16,
              borderRadius: 100,
              border: "1px solid rgba(212,120,154,0.2)",
              animation: "pulseRing 2.4s 0.6s ease-out infinite",
              pointerEvents: "none",
            }} />

            <button className="welcome-btn" onClick={handleEnter}>
              <div
                className="btn-inner"
                style={{
                  background: "linear-gradient(135deg, #e898b8, #d4789a, #c0527c)",
                  color: "rgba(255,240,248,0.95)",
                  padding: "16px 48px",
                  borderRadius: 100,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 400,
                  fontSize: 11,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  boxShadow: "0 6px 24px rgba(192,82,124,0.35), 0 2px 8px rgba(192,82,124,0.2)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span>Open Album</span>
                <span style={{ fontSize: 13 }}>→</span>
              </div>
            </button>
          </div>

          {/* Bottom hint */}
          <p style={{
            marginTop: 32,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 300,
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(180,100,130,0.5)",
            animation: visible ? "fadeIn 1s 1.1s both" : undefined,
          }}>
            made with ♡
          </p>
        </div>

        {/* Bottom ornament */}
        <div style={{
          position: "absolute",
          bottom: 24,
          display: "flex", alignItems: "center", gap: 10,
          animation: visible ? "fadeIn 1s 1s both" : undefined,
          opacity: 0,
        }}>
          <div style={{ width: 30, height: 1, background: "linear-gradient(to right, transparent, rgba(212,120,154,0.4))" }} />
          <span style={{ color: "rgba(212,120,154,0.5)", fontSize: 10 }}>✦</span>
          <div style={{ width: 30, height: 1, background: "linear-gradient(to left, transparent, rgba(212,120,154,0.4))" }} />
        </div>
      </div>
    </>
  );
}
