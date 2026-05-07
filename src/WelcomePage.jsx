import { useState, useEffect } from "react";

const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Jost:wght@400;500&display=swap";
if (!document.head.querySelector("[href*='Cormorant']")) {
  document.head.appendChild(fontLink);
}

const PETALS = [
  { w: 22, h: 14, color: "#e8789a", left: "5%",  delay: "0s",   dur: "8s"  },
  { w: 14, h: 9,  color: "#c9557a", left: "18%", delay: "2.1s", dur: "11s" },
  { w: 18, h: 12, color: "#f0a0bc", left: "33%", delay: "0.6s", dur: "9s"  },
  { w: 10, h: 7,  color: "#e8789a", left: "50%", delay: "3.4s", dur: "7s"  },
  { w: 20, h: 13, color: "#d4608a", left: "63%", delay: "1.2s", dur: "10s" },
  { w: 13, h: 9,  color: "#f0a0bc", left: "78%", delay: "4.5s", dur: "8.5s"},
  { w: 16, h: 11, color: "#e8789a", left: "91%", delay: "0.3s", dur: "12s" },
  { w: 11, h: 7,  color: "#c9557a", left: "42%", delay: "5s",   dur: "9.5s"},
];

const SPARKLES = [
  { top: "12%", left: "8%",  size: 7,  delay: "0s"   },
  { top: "25%", left: "88%", size: 5,  delay: "0.8s" },
  { top: "60%", left: "5%",  size: 6,  delay: "1.6s" },
  { top: "72%", left: "93%", size: 8,  delay: "0.3s" },
  { top: "40%", left: "92%", size: 5,  delay: "2s"   },
  { top: "85%", left: "15%", size: 6,  delay: "1.1s" },
  { top: "18%", left: "55%", size: 4,  delay: "2.5s" },
  { top: "50%", left: "50%", size: 5,  delay: "0.5s" },
];

export default function WelcomePage({ onEnter }) {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [visitCount, setVisitCount] = useState(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    fetch("https://api.countapi.xyz/hit/mamas-album-2026/visits")
      .then(res => res.json())
      .then(data => setVisitCount(data.value))
      .catch(() => {});
  }, []);

  const handleEnter = () => {
    setLeaving(true);
    setTimeout(() => onEnter(), 950);
  };

  return (
    <>
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(-30px) rotate(0deg) scale(1);   opacity: 0; }
          8%   { opacity: 0.55; }
          92%  { opacity: 0.55; }
          100% { transform: translateY(110vh) rotate(200deg) scale(0.8); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { transform: scale(0) rotate(0deg);   opacity: 0; }
          50%       { transform: scale(1) rotate(180deg); opacity: 0.9; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(0.95); opacity: 0.7; }
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
          0%   { opacity: 1; transform: scale(1);    filter: blur(0px); }
          100% { opacity: 0; transform: scale(1.06); filter: blur(6px); }
        }
        @keyframes pageEnterBg {
          from { opacity: 0; }
          to   { opacity: 1; }
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
          background: linear-gradient(135deg, #c0406a, #a02858) !important;
          box-shadow: 0 10px 36px rgba(160,40,88,0.55), 0 2px 8px rgba(160,40,88,0.3) !important;
        }
        .welcome-btn:hover { transform: translateY(-3px); }
        .welcome-btn:active { transform: translateY(0px); }
      `}</style>

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
          animation: leaving ? "pageLeave 0.95s cubic-bezier(0.4,0,0.2,1) forwards" : undefined,
        }}
      >
        {/* Ambient blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", top: "-10%", left: "-8%",
            width: 380, height: 380, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,120,154,0.35) 0%, transparent 70%)",
            filter: "blur(40px)",
          }} />
          <div style={{
            position: "absolute", bottom: "-8%", right: "-6%",
            width: 320, height: 320, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,96,138,0.3) 0%, transparent 70%)",
            filter: "blur(35px)",
          }} />
          <div style={{
            position: "absolute", top: "40%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: 500, height: 300, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240,160,188,0.25) 0%, transparent 70%)",
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
            <svg viewBox="0 0 10 10" width={s.size} height={s.size}>
              <path
                d="M5 0 L5.6 4.4 L10 5 L5.6 5.6 L5 10 L4.4 5.6 L0 5 L4.4 4.4 Z"
                fill="#b03060"
                opacity="0.9"
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
            <div style={{ width: 40, height: 1.5, background: "linear-gradient(to right, transparent, #b03060)" }} />
            <span style={{ color: "#b03060", fontSize: 16 }}>✿</span>
            <div style={{ width: 40, height: 1.5, background: "linear-gradient(to left, transparent, #b03060)" }} />
          </div>

          {/* Small label */}
          <p style={{
            color: "#8a2040",
            fontSize: 11,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            marginBottom: 16,
            animation: visible ? "fadeSlideUp 0.8s 0.15s both" : undefined,
          }}>
            a gift for the best
          </p>

          {/* Big title */}
          <h1 style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontWeight: 700,
            fontStyle: "italic",
            fontSize: "clamp(52px, 15vw, 78px)",
            color: "#7a1838",
            lineHeight: 1.05,
            textAlign: "center",
            margin: 0,
            textShadow: "0 2px 20px rgba(120,40,70,0.2)",
            animation: visible ? "fadeSlideUp 1s 0.25s both" : undefined,
          }}>
            Mama
          </h1>

          {/* Decorative divider */}
          <div style={{
            width: 80, height: 1.5,
            background: "linear-gradient(to right, transparent, #b03060, transparent)",
            margin: "20px auto",
            transformOrigin: "center",
            animation: visible ? "revealLine 0.8s 0.6s both" : undefined,
          }} />

          {/* Subtitle */}
          <p style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontWeight: 600,
            fontSize: 20,
            color: "#8a2848",
            textAlign: "center",
            lineHeight: 1.7,
            margin: "0 0 8px 0",
            animation: visible ? "fadeSlideUp 0.8s 0.5s both" : undefined,
          }}>
            we prepared a virtual photo album<br />
            for you to walk down memory lane
          </p>

          {/* Sub-label */}
          <p style={{
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#a03858",
            textAlign: "center",
            margin: "0 0 48px 0",
            animation: visible ? "fadeSlideUp 0.8s 0.6s both" : undefined,
          }}>
            mother's day 2026
          </p>

          {/* CTA Button */}
          <div style={{
            animation: visible ? "fadeSlideUp 0.8s 0.75s both" : undefined,
            position: "relative",
          }}>
            <div style={{
              position: "absolute", inset: -8, borderRadius: 100,
              border: "1.5px solid rgba(176,48,96,0.5)",
              animation: "pulseRing 2.4s ease-out infinite",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", inset: -16, borderRadius: 100,
              border: "1px solid rgba(176,48,96,0.25)",
              animation: "pulseRing 2.4s 0.6s ease-out infinite",
              pointerEvents: "none",
            }} />

            <button className="welcome-btn" onClick={handleEnter}>
              <div
                className="btn-inner"
                style={{
                  background: "linear-gradient(135deg, #d4608a, #b03060, #8a1840)",
                  color: "#fff",
                  padding: "17px 52px",
                  borderRadius: 100,
                  fontFamily: "'Jost', sans-serif",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: 5,
                  textTransform: "uppercase",
                  boxShadow: "0 8px 28px rgba(176,48,96,0.45), 0 2px 8px rgba(176,48,96,0.25)",
                  transition: "all 0.25s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <span>See your memories</span>
                <span style={{ fontSize: 14 }}>→</span>
              </div>
            </button>
          </div>

          {/* Bottom hint */}
          <p style={{
            marginTop: 32,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 500,
            fontSize: 10,
            letterSpacing: 3,
            textTransform: "uppercase",
            color: "rgba(120,40,70,0.6)",
            animation: visible ? "fadeIn 1s 1.1s both" : undefined,
          }}>
            Made by Jake & Max ♡
          {visitCount !== null && (
            <span style={{
              display: "block",
              marginTop: 6,
              fontSize: 9,
              letterSpacing: 3,
              color: "rgba(120,40,70,0.45)",
            }}>
              cherished {visitCount.toLocaleString()} times
            </span>
          )}
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
          <div style={{ width: 30, height: 1.5, background: "linear-gradient(to right, transparent, rgba(176,48,96,0.5))" }} />
          <span style={{ color: "rgba(176,48,96,0.6)", fontSize: 11 }}>✦</span>
          <div style={{ width: 30, height: 1.5, background: "linear-gradient(to left, transparent, rgba(176,48,96,0.5))" }} />
        </div>
      </div>
    </>
  );
}