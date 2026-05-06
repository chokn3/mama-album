import { useState, useRef, useCallback } from "react";

// ─── YOUR PHOTOS ───────────────────────────────────────────────
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
      width: "100%", height: "100%", background: paperBg,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: 10,
    }}>
      <span style={{ color: "#c8a87a", fontSize: 34 }}>❧</span>
      <span style={{ color: "#9a8060", fontSize: 13, letterSpacing: 4, fontStyle: "italic", fontFamily: "Georgia, serif" }}>The End</span>
      <span style={{ color: "#bbb", fontSize: 10, letterSpacing: 1 }}>to be continued...</span>
    </div>
  );
}

function PhotoPage({ data }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: paperBg,
      display: "flex", flexDirection: "column",
      padding: "14px", gap: 10, boxSizing: "border-box",
    }}>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        <div style={{
          background: "white", padding: "6px 6px 22px 6px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
          transform: `rotate(${data.topTilt || "-1deg"})`,
          width: "100%", height: "100%", boxSizing: "border-box",
        }}>
          <img src={data.top} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", minHeight: 0 }}>
        <div style={{
          background: "white", padding: "6px 6px 22px 6px",
          boxShadow: "0 3px 12px rgba(0,0,0,0.2)",
          transform: `rotate(${data.bottomTilt || "1deg"})`,
          width: "100%", height: "100%", boxSizing: "border-box",
        }}>
          <img src={data.bottom} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} loading="lazy" />
        </div>
      </div>
    </div>
  );
}

function PageContent({ index }) {
  const data = pages[index];
  if (data == null) return <div style={{ width: "100%", height: "100%", background: paperBg }} />;
  if (data === "cover") return <CoverPage />;
  if (data === "end") return <EndPage />;
  return <PhotoPage data={data} />;
}

export default function App() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // During animation these refs hold what we need without triggering re-renders
  const animIndexRef = useRef(null);   // the page element that physically rotates
  const underIndexRef = useRef(0);     // the page shown flat underneath
  const rotationRef = useRef(0);
  const animDivRef = useRef(null);

  const touchStartX = useRef(null);
  const total = pages.length;

  // Force re-render trick to update animating div's transform
  const [, forceUpdate] = useState(0);

  const doTurn = useCallback((dir) => {
    const next = displayIndex + dir;
    if (next < 0 || next >= total || animating) return;

    if (dir === 1) {
      // Forward: current page peels away, next is underneath
      animIndexRef.current = displayIndex;
      underIndexRef.current = next;
      rotationRef.current = 0;
    } else {
      // Backward: previous page peels back in, current stays underneath
      animIndexRef.current = next;
      underIndexRef.current = displayIndex;
      rotationRef.current = -180;
    }

    setAnimating(true);
    forceUpdate(n => n + 1);

    // Two rAFs to ensure the initial transform is painted before we animate
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (animDivRef.current) {
          animDivRef.current.style.transition = "transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1.000)";
          animDivRef.current.style.transform = `rotateY(${dir === 1 ? -180 : 0}deg)`;
        }
      });
    });
  }, [displayIndex, animating, total]);

  const onTransitionEnd = useCallback(() => {
    const landed = rotationRef.current === -180
      ? underIndexRef.current   // forward turn: under page is now the current
      : animIndexRef.current;   // backward turn: anim page landed flat = current

    // Reset anim div instantly (no transition) before unmounting
    if (animDivRef.current) {
      animDivRef.current.style.transition = "none";
    }

    setDisplayIndex(underIndexRef.current === displayIndex
      ? animIndexRef.current   // backward
      : underIndexRef.current  // forward
    );
    setAnimating(false);
    animIndexRef.current = null;
  }, [displayIndex]);

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) doTurn(diff > 0 ? 1 : -1);
  };

  const progress = total > 1 ? (displayIndex / (total - 1)) * 100 : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        background: "#120d06", fontFamily: "Georgia, serif",
        userSelect: "none", WebkitUserSelect: "none",
        touchAction: "pan-y",
      }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
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

        {/* Drop shadow */}
        <div style={{
          position: "absolute", left: SPINE_W, top: 10,
          width: PAGE_W, height: BOOK_H,
          background: "rgba(0,0,0,0.55)", borderRadius: "0 8px 8px 0",
          filter: "blur(16px)", zIndex: 0,
        }} />

        {/* Page area */}
        <div style={{
          position: "absolute", left: SPINE_W, top: 0,
          width: PAGE_W, height: BOOK_H,
          perspective: 1600,
          overflow: "hidden",
          borderRadius: "0 8px 8px 0",
        }}>

          {/* ── Layer 1: Under page — always flat, always visible ── */}
          <div style={{
            position: "absolute", inset: 0, zIndex: 1,
            borderRadius: "0 8px 8px 0", overflow: "hidden",
          }}>
            <PageContent index={animating ? underIndexRef.current : displayIndex} />
          </div>

          {/* ── Layer 2: Peeling page — only during animation ── */}
          {animating && (
            <div
              ref={animDivRef}
              style={{
                position: "absolute", inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                // Start position set via ref imperatively, no transition yet
                transform: `rotateY(${rotationRef.current}deg)`,
                transition: "none",
                zIndex: 2,
                willChange: "transform",
              }}
              onTransitionEnd={onTransitionEnd}
            >
              {/* Front face */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                borderRadius: "0 8px 8px 0", overflow: "hidden",
              }}>
                <PageContent index={animIndexRef.current} />
                {/* Fold shadow */}
                <div style={{
                  position: "absolute", right: 0, top: 0, width: 40, height: "100%",
                  background: "linear-gradient(to right, transparent, rgba(0,0,0,0.12))",
                  pointerEvents: "none",
                }} />
              </div>

              {/* Back face — warm paper */}
              <div style={{
                position: "absolute", inset: 0,
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: "0 8px 8px 0", overflow: "hidden",
                background: paperBg2,
              }}>
                <div style={{
                  width: "100%", height: "100%",
                  backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(0,0,0,0.025) 31px, rgba(0,0,0,0.025) 32px)",
                }} />
                <div style={{
                  position: "absolute", left: 0, top: 0, width: 40, height: "100%",
                  background: "linear-gradient(to left, transparent, rgba(0,0,0,0.07))",
                  pointerEvents: "none",
                }} />
              </div>
            </div>
          )}

          {/* Tap target when idle */}
          {!animating && (
            <div
              style={{
                position: "absolute", inset: 0, zIndex: 3,
                cursor: displayIndex < total - 1 ? "pointer" : "default",
              }}
              onClick={() => doTurn(1)}
            />
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ marginTop: 28, width: PAGE_W, position: "relative" }}>
        <div style={{
          width: "100%", height: 1.5,
          background: "rgba(232,213,163,0.1)",
          borderRadius: 2, position: "relative",
        }}>
          <div style={{
            height: "100%", width: `${progress}%`,
            background: "linear-gradient(to right, rgba(232,213,163,0.2), rgba(232,213,163,0.65))",
            borderRadius: 2, transition: "width 0.5s ease",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: `${progress}%`,
            transform: "translate(-50%, -50%)",
            width: 7, height: 7, borderRadius: "50%",
            background: "#e8d5a3",
            boxShadow: "0 0 8px rgba(232,213,163,0.5)",
            transition: "left 0.5s ease",
          }} />
        </div>
        <p style={{
          textAlign: "center", marginTop: 12,
          color: "rgba(232,213,163,0.22)", fontSize: 9,
          letterSpacing: 3, textTransform: "uppercase", fontFamily: "monospace",
        }}>
          {displayIndex === 0 ? "cover" : displayIndex >= total - 1 ? "the end" : `${displayIndex} / ${total - 2}`}
        </p>
      </div>

      <p style={{ marginTop: 8, color: "rgba(232,213,163,0.12)", fontSize: 8, letterSpacing: 4, textTransform: "uppercase" }}>
        swipe or tap to turn pages
      </p>
    </div>
  );
}