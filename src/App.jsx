import { useState, useRef } from "react";

const pages = [
  "cover",
  {
    top: "https://lh3.googleusercontent.com/d/1rHVz4J_CSTl91QDFzi50HSmx8yBF1QrS",
    bottom: "https://lh3.googleusercontent.com/d/1sEfhAe256d9bhD0BiuCdlNF1QQksERUn",
  },
  {
    top: "https://lh3.googleusercontent.com/d/FILE_ID_3",
    bottom: "https://lh3.googleusercontent.com/d/FILE_ID_4",
  },
  {
    top: "https://lh3.googleusercontent.com/d/FILE_ID_5",
    bottom: "https://lh3.googleusercontent.com/d/FILE_ID_6",
  },
  "end",
];

const BOOK_W = 340;
const BOOK_H = 480;

export default function App() {
  const [current, setCurrent] = useState(0);
  const [turning, setTurning] = useState(false);
  const [direction, setDirection] = useState(null);
  const touchStartX = useRef(null);
  const total = pages.length;

  const turnPage = (dir) => {
    const next = current + dir;
    if (next < 0 || next >= total || turning) return;
    setDirection(dir);
    setTurning(true);
    setTimeout(() => {
      setCurrent(next);
      setTurning(false);
      setDirection(null);
    }, 600);
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) turnPage(diff > 0 ? 1 : -1);
  };

  const progress = total > 1 ? (current / (total - 1)) * 100 : 0;
  const pageData = pages[current];

  const pageStyle = {
    width: BOOK_W - 20,
    height: BOOK_H,
    position: "absolute",
    top: 0,
    left: 20,
    transformOrigin: "left center",
    transformStyle: "preserve-3d",
    transition: turning ? "transform 0.6s cubic-bezier(0.645,0.045,0.355,1)" : "none",
    transform: turning && direction === 1
      ? "rotateY(-180deg)"
      : turning && direction === -1
      ? "rotateY(0deg)"
      : "rotateY(0deg)",
    borderRadius: "0 8px 8px 0",
    overflow: "hidden",
    background: "#f5efe0",
    boxShadow: "4px 0 20px rgba(0,0,0,0.3)",
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{ background: "#120d06", fontFamily: "Georgia, serif" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Title */}
      <p style={{
        color: "rgba(232,213,163,0.45)",
        fontSize: 10,
        letterSpacing: 6,
        textTransform: "uppercase",
        marginBottom: 24,
      }}>
        Memories
      </p>

      {/* Book */}
      <div style={{
        width: BOOK_W,
        height: BOOK_H,
        perspective: 1400,
        position: "relative",
      }}>
        {/* Spine */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: 20,
          height: "100%",
          background: "linear-gradient(to right, #3d2008, #7a4f2d, #3d2008)",
          borderRadius: "4px 0 0 4px",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset -4px 0 8px rgba(0,0,0,0.4), 2px 0 6px rgba(0,0,0,0.5)",
        }}>
          <span style={{
            color: "rgba(232,213,163,0.4)",
            fontSize: 7,
            letterSpacing: 4,
            textTransform: "uppercase",
            writingMode: "vertical-rl",
          }}>Memories</span>
        </div>

        {/* Ambient shadow behind pages */}
        <div style={{
          position: "absolute",
          left: 20,
          top: 8,
          width: BOOK_W - 20,
          height: BOOK_H,
          background: "rgba(0,0,0,0.5)",
          borderRadius: "0 8px 8px 0",
          filter: "blur(12px)",
          zIndex: 0,
        }} />

        {/* Page */}
        <div style={pageStyle} onClick={() => turnPage(1)}>
          {/* Page edge shadow */}
          <div style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 24,
            height: "100%",
            background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08))",
            zIndex: 2,
            pointerEvents: "none",
          }} />

          {pageData === "cover" && (
            <div style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(160deg, #8b5e2a 0%, #5c3519 45%, #2e1a08 100%)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              position: "relative",
            }}>
              <div style={{
                position: "absolute",
                inset: 14,
                border: "1px solid rgba(232,213,163,0.18)",
                borderRadius: 4,
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                inset: 18,
                border: "1px solid rgba(232,213,163,0.08)",
                borderRadius: 3,
                pointerEvents: "none",
              }} />
              <span style={{ color: "rgba(232,213,163,0.25)", fontSize: 36, lineHeight: 1 }}>❧</span>
              <span style={{ color: "#e8d5a3", fontSize: 28, letterSpacing: 4, fontWeight: "normal" }}>Memories</span>
              <span style={{ color: "rgba(232,213,163,0.35)", fontSize: 9, letterSpacing: 6, textTransform: "uppercase" }}>a photo album</span>
              <span style={{
                position: "absolute",
                bottom: 22,
                color: "rgba(232,213,163,0.3)",
                fontSize: 9,
                letterSpacing: 3,
                textTransform: "uppercase",
              }}>tap to open →</span>
            </div>
          )}

          {pageData === "end" && (
            <div style={{
              width: "100%",
              height: "100%",
              background: "#f0e8d5",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}>
              <span style={{ color: "#c8a87a", fontSize: 32 }}>❧</span>
              <span style={{ color: "#9a8060", fontSize: 13, letterSpacing: 4, fontStyle: "italic" }}>The End</span>
              <span style={{ color: "#bbb", fontSize: 10, letterSpacing: 1 }}>to be continued...</span>
            </div>
          )}

          {pageData !== "cover" && pageData !== "end" && (
            <div style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 6,
              padding: 14,
              background: "#f5efe0",
            }}>
              {/* Top photo */}
              <div style={{
                flex: 1,
                background: "white",
                padding: 5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transform: "rotate(-0.8deg)",
              }}>
                <img
                  src={pageData.top}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
              {/* Bottom photo */}
              <div style={{
                flex: 1,
                background: "white",
                padding: 5,
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                transform: "rotate(0.6deg)",
              }}>
                <img
                  src={pageData.bottom}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 28, width: BOOK_W - 20, position: "relative" }}>
        {/* Track */}
        <div style={{
          width: "100%",
          height: 2,
          background: "rgba(232,213,163,0.1)",
          borderRadius: 2,
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Fill */}
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, rgba(232,213,163,0.3), rgba(232,213,163,0.7))",
            borderRadius: 2,
            transition: "width 0.5s ease",
          }} />
        </div>

        {/* Thumb dot */}
        <div style={{
          position: "absolute",
          top: "50%",
          left: `${progress}%`,
          transform: "translate(-50%, -50%)",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#e8d5a3",
          boxShadow: "0 0 6px rgba(232,213,163,0.5)",
          transition: "left 0.5s ease",
        }} />

        {/* Page label */}
        <p style={{
          textAlign: "center",
          marginTop: 10,
          color: "rgba(232,213,163,0.25)",
          fontSize: 9,
          letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}>
          {current === 0 ? "cover" : current >= total - 1 ? "the end" : `${current} / ${total - 2}`}
        </p>
      </div>

      {/* Swipe hint */}
      <p style={{
        marginTop: 8,
        color: "rgba(232,213,163,0.15)",
        fontSize: 8,
        letterSpacing: 4,
        textTransform: "uppercase",
      }}>swipe to turn pages</p>
    </div>
  );
}