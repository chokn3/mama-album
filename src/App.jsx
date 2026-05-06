import { useState, useRef, useEffect } from "react";

// ─── YOUR PHOTOS ───────────────────────────────────────────────
// Each page shows 2 photos (top + bottom).
// Replace the lh3.googleusercontent.com URLs with your own.
const pages = [
  "cover",
  {
    top: "https://lh3.googleusercontent.com/d/1rHVz4J_CSTl91QDFzi50HSmx8yBF1QrS",
    bottom: "https://lh3.googleusercontent.com/d/1sEfhAe256d9bhD0BiuCdlNF1QQksERUn",
    topTilt: "-1.5deg",
    bottomTilt: "1.2deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/FILE_ID_3",
    bottom: "https://lh3.googleusercontent.com/d/FILE_ID_4",
    topTilt: "1deg",
    bottomTilt: "-0.8deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/FILE_ID_5",
    bottom: "https://lh3.googleusercontent.com/d/FILE_ID_6",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  "end",
];
// ───────────────────────────────────────────────────────────────

const BOOK_W = 360;
const BOOK_H = 500;
const SPINE_W = 22;
const PAGE_W = BOOK_W - SPINE_W;

const paperBg = "#f5efe0";
const paperBg2 = "#ede7d5";

function PhotoPage({ data, mirror }) {
  // mirror=true means this is the "back face" shown during a backward turn
  const tiltTop = mirror ? `rotate(${data.topTilt ? data.topTilt.replace("-", "") : "1deg"})` : `rotate(${data.topTilt || "-1deg"})`;
  const tiltBot = mirror ? `rotate(${data.bottomTilt ? data.bottomTilt.replace("-", "") : "-1deg"})` : `rotate(${data.bottomTilt || "1deg"})`;

  return (
    <div style={{
      width: "100%",
      height: "100%",
      background: mirror ? paperBg2 : paperBg,
      display: "flex",
      flexDirection: "column",
      padding: "14px 14px 14px 14px",
      gap: 10,
      boxSizing: "border-box",
    }}>
      {/* Top photo — polaroid style */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
      }}>
        <div style={{
          background: "white",
          padding: "6px 6px 22px 6px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)",
          transform: tiltTop,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <img
            src={data.top}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            loading="lazy"
          />
        </div>
      </div>

      {/* Bottom photo — polaroid style */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: 0,
      }}>
        <div style={{
          background: "white",
          padding: "6px 6px 22px 6px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.1)",
          transform: tiltBot,
          width: "100%",
          height: "100%",
          boxSizing: "border-box",
        }}>
          <img
            src={data.bottom}
            alt=""
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

function CoverPage() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(160deg, #8b5e2a 0%, #5c3519 45%, #2e1a08 100%)",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 10, position: "relative",
    }}>
      <div style={{ position: "absolute", inset: 14, border: "1px solid rgba(232,213,163,0.2)", borderRadius: 4, pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 19, border: "1px solid rgba(232,213,163,0.08)", borderRadius: 3, pointerEvents: "none" }} />
      <span style={{ color: "rgba(232,213,163,0.3)", fontSize: 38, lineHeight: 1 }}>❧</span>
      <span style={{ color: "#e8d5a3", fontSize: 28, letterSpacing: 4, fontFamily: "Georgia, serif", fontWeight: "normal" }}>Memories</span>
      <span style={{ color: "rgba(232,213,163,0.35)", fontSize: 9, letterSpacing: 6, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>a photo album</span>
      <span style={{ position: "absolute", bottom: 22, color: "rgba(232,213,163,0.3)", fontSize: 9, letterSpacing: 3, textTransform: "uppercase" }}>tap to open →</span>
    </div>
  );
}

function EndPage() {
  return (
    <div style={{
      width: "100%", height: "100%",
      background: paperBg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10,
    }}>
      <span style={{ color: "#c8a87a", fontSize: 34 }}>❧</span>
      <span style={{ color: "#9a8060", fontSize: 13, letterSpacing: 4, fontStyle: "italic", fontFamily: "Georgia, serif" }}>The End</span>
      <span style={{ color: "#bbb", fontSize: 10, letterSpacing: 1 }}>to be continued...</span>
    </div>
  );
}

// Renders the content of a given page index
function PageContent({ index, mirror }) {
  const data = pages[index];
  if (data === "cover") return <CoverPage />;
  if (data === "end") return <EndPage />;
  return <PhotoPage data={data} mirror={mirror} />;
}

export default function App() {
  const [current, setCurrent] = useState(0);
  // turning: null | { dir: 1 | -1, phase: 'start'|'end' }
  const [turning, setTurning] = useState(null);
  const touchStartX = useRef(null);
  const total = pages.length;

  // The page being "peeled" during a turn animation
  const turningPageIndex = turning
    ? turning.dir === 1 ? current : current - 1
    : null;

  const doTurn = (dir) => {
    const next = current + dir;
    if (next < 0 || next >= total || turning) return;
    setTurning({ dir, phase: "start" });
  };

  useEffect(() => {
    if (!turning || turning.phase !== "start") return;
    // Kick off the animation on next frame
    const raf = requestAnimationFrame(() => {
      setTurning((t) => t ? { ...t, phase: "animating" } : null);
    });
    return () => cancelAnimationFrame(raf);
  }, [turning]);

  // When animation ends, commit the page change
  const onTransitionEnd = () => {
    if (!turning) return;
    setCurrent((c) => c + turning.dir);
    setTurning(null);
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) doTurn(diff > 0 ? 1 : -1);
  };

  const progress = total > 1 ? (current / (total - 1)) * 100 : 0;

  // During a forward turn: current page peels away, next page (current+1) is underneath
  // During a backward turn: current-1 page peels back in, current page is underneath initially
  const underPageIndex = turning
    ? turning.dir === 1 ? current + 1 : current - 1
    : current;

  // The turning page starts flat (0deg) and rotates to -180deg (forward) or reverse
  const turningRotation = turning
    ? turning.phase === "animating"
      ? turning.dir === 1 ? -180 : 0
      : turning.dir === 1 ? 0 : -180
    : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#120d06",
        fontFamily: "Georgia, serif",
        userSelect: "none",
        WebkitUserSelect: "none",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* Title */}
      <p style={{ color: "rgba(232,213,163,0.4)", fontSize: 10, letterSpacing: 6, textTransform: "uppercase", marginBottom: 24 }}>
        Memories
      </p>

      {/* Book */}
      <div style={{ width: BOOK_W, height: BOOK_H, position: "relative" }}>

        {/* Spine */}
        <div style={{
          position: "absolute", left: 0, top: 0,
          width: SPINE_W, height: "100%", zIndex: 30,
          background: "linear-gradient(to right, #2e1a08, #7a4f2d, #2e1a08)",
          borderRadius: "5px 0 0 5px",
          boxShadow: "inset -4px 0 8px rgba(0,0,0,0.5), 2px 0 8px rgba(0,0,0,0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <span style={{ color: "rgba(232,213,163,0.35)", fontSize: 7, letterSpacing: 4, textTransform: "uppercase", writingMode: "vertical-rl" }}>
            Memories
          </span>
        </div>

        {/* Drop shadow behind book */}
        <div style={{
          position: "absolute", left: SPINE_W, top: 10,
          width: PAGE_W, height: BOOK_H,
          background: "rgba(0,0,0,0.6)",
          borderRadius: "0 8px 8px 0",
          filter: "blur(16px)",
          zIndex: 0,
        }} />

        {/* ── Page stack ───────────────────────────────────── */}
        {/* 
          We render at most 3 layers:
          1. Under page (always flat, behind everything) — zIndex 1
          2. Turning page front face — zIndex 2, rotates from 0 to -180
          3. Turning page back face (mirror) — zIndex 2, rotateY(180) so it shows when flipped
        */}
        <div style={{
          position: "absolute",
          left: SPINE_W,
          top: 0,
          width: PAGE_W,
          height: BOOK_H,
          perspective: 1600,
        }}>
          {/* Under page — what's revealed underneath the turning page */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "0 8px 8px 0",
            overflow: "hidden",
            zIndex: 1,
          }}>
            <PageContent index={underPageIndex} mirror={false} />
          </div>

          {/* Turning page — the page being peeled */}
          {turning && (
            <div
              style={{
                position: "absolute", inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                transform: `rotateY(${turningRotation}deg)`,
                transition: turning.phase === "animating" ? "transform 0.65s cubic-bezier(0.645,0.045,0.355,1)" : "none",
                zIndex: 2,
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {/* Front face of turning page */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                borderRadius: "0 8px 8px 0",
                overflow: "hidden",
              }}>
                <PageContent index={turningPageIndex} mirror={false} />
                {/* Fold shadow on right edge as page turns */}
                <div style={{
                  position: "absolute", right: 0, top: 0,
                  width: 32, height: "100%",
                  background: "linear-gradient(to right, transparent, rgba(0,0,0,0.12))",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Back face of turning page (paper texture, slightly different shade) */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "0 8px 8px 0",
                overflow: "hidden",
                background: paperBg2,
              }}>
                {/* Subtle paper lines */}
                <div style={{
                  width: "100%", height: "100%",
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.03) 31px, rgba(0,0,0,0.03) 32px)",
                }} />
                {/* Left edge shadow when flipped */}
                <div style={{
                  position: "absolute", left: 0, top: 0,
                  width: 32, height: "100%",
                  background: "linear-gradient(to left, transparent, rgba(0,0,0,0.08))",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          )}

          {/* Static page when not turning — just shows current */}
          {!turning && (
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: "0 8px 8px 0",
              overflow: "hidden",
              zIndex: 2,
              boxShadow: "4px 0 20px rgba(0,0,0,0.25)",
              cursor: "pointer",
            }} onClick={() => doTurn(1)}>
              <PageContent index={current} mirror={false} />
              {/* Right edge shadow */}
              <div style={{
                position: "absolute", right: 0, top: 0,
                width: 24, height: "100%",
                background: "linear-gradient(to right, transparent, rgba(0,0,0,0.08))",
                pointerEvents: "none",
              }} />
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 28, width: BOOK_W - SPINE_W, position: "relative" }}>
        <div style={{
          width: "100%", height: 1.5,
          background: "rgba(232,213,163,0.1)",
          borderRadius: 2, position: "relative", overflow: "visible",
        }}>
          <div style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(to right, rgba(232,213,163,0.2), rgba(232,213,163,0.6))",
            borderRadius: 2,
            transition: "width 0.5s ease",
          }} />
          {/* Thumb */}
          <div style={{
            position: "absolute",
            top: "50%",
            left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 7, height: 7,
            borderRadius: "50%",
            background: "#e8d5a3",
            boxShadow: "0 0 8px rgba(232,213,163,0.5)",
            transition: "left 0.5s ease",
          }} />
        </div>

        <p style={{
          textAlign: "center", marginTop: 12,
          color: "rgba(232,213,163,0.22)",
          fontSize: 9, letterSpacing: 3,
          textTransform: "uppercase",
          fontFamily: "monospace",
        }}>
          {current === 0 ? "cover" : current >= total - 1 ? "the end" : `${current} / ${total - 2}`}
        </p>
      </div>

      <p style={{ marginTop: 8, color: "rgba(232,213,163,0.12)", fontSize: 8, letterSpacing: 4, textTransform: "uppercase" }}>
        swipe or tap to turn pages
      </p>
    </div>
  );
}