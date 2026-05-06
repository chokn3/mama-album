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

// ─── PASTEL PINK PALETTE ───────────────────────────────────────
const paperBg = "#fff5f8";
const paperBg2 = "#fde8f0";
// ───────────────────────────────────────────────────────────────

// Add Google Fonts for Cormorant Garamond + Jost
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300&display=swap";
if (!document.head.querySelector("[href*='Cormorant']")) {
  document.head.appendChild(fontLink);
}

function CoverPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background:
          "linear-gradient(155deg, #f9d0e0 0%, #e8a0b8 35%, #d4789a 65%, #c0527c 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        position: "relative",
      }}
    >
      {/* Decorative borders */}
      <div
        style={{
          position: "absolute",
          inset: 12,
          border: "1px solid rgba(255,230,240,0.3)",
          borderRadius: 3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: "1px solid rgba(255,230,240,0.12)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />
      <span
        style={{
          color: "rgba(255,230,240,0.45)",
          fontSize: 32,
          lineHeight: 1,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        ❧
      </span>
      <span
        style={{
          color: "rgba(255,240,248,0.92)",
          fontSize: 26,
          letterSpacing: 5,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
          fontStyle: "italic",
        }}
      >
        Memories
      </span>
      <span
        style={{
          color: "rgba(255,230,240,0.4)",
          fontSize: 8,
          letterSpacing: 7,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
        }}
      >
        a photo album
      </span>
      <span
        style={{
          position: "absolute",
          bottom: 18,
          color: "rgba(255,230,240,0.4)",
          fontSize: 8,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
        }}
      >
        tap to open →
      </span>
    </div>
  );
}

function EndPage() {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <span
        style={{
          color: "#e8a0b8",
          fontSize: 30,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        ❧
      </span>
      <span
        style={{
          color: "#c0748a",
          fontSize: 14,
          letterSpacing: 5,
          fontStyle: "italic",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 300,
        }}
      >
        The End
      </span>
      <span
        style={{
          color: "#d4a0b8",
          fontSize: 9,
          letterSpacing: 2,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 200,
        }}
      >
        to be continued…
      </span>
    </div>
  );
}

function PhotoPage({ data }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
        display: "flex",
        flexDirection: "column",
        padding: "12px",
        gap: 8,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "5px 5px 20px 5px",
            boxShadow:
              "0 2px 10px rgba(180,80,110,0.15), 0 1px 3px rgba(180,80,110,0.1)",
            transform: `rotate(${data.topTilt || "-1deg"})`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
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
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 0,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "5px 5px 20px 5px",
            boxShadow:
              "0 2px 10px rgba(180,80,110,0.15), 0 1px 3px rgba(180,80,110,0.1)",
            transform: `rotate(${data.bottomTilt || "1deg"})`,
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
          }}
        >
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

function PageContent({ index }) {
  const data = pages[index];
  if (data == null)
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(145deg, ${paperBg}, ${paperBg2})`,
        }}
      />
    );
  if (data === "cover") return <CoverPage />;
  if (data === "end") return <EndPage />;
  return <PhotoPage data={data} />;
}

// Floating petal component
function Petal({ style }) {
  return <div style={style} />;
}

export default function App() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const animIndexRef = useRef(null);
  const underIndexRef = useRef(0);
  const rotationRef = useRef(0);
  const animDivRef = useRef(null);

  const touchStartX = useRef(null);
  const total = pages.length;

  const [, forceUpdate] = useState(0);

  const doTurn = useCallback(
    (dir) => {
      const next = displayIndex + dir;
      if (next < 0 || next >= total || animating) return;

      if (dir === 1) {
        animIndexRef.current = displayIndex;
        underIndexRef.current = next;
        rotationRef.current = 0;
      } else {
        animIndexRef.current = next;
        underIndexRef.current = displayIndex;
        rotationRef.current = -180;
      }

      setAnimating(true);
      forceUpdate((n) => n + 1);

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (animDivRef.current) {
            animDivRef.current.style.transition =
              "transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1.000)";
            animDivRef.current.style.transform = `rotateY(${dir === 1 ? -180 : 0}deg)`;
          }
        });
      });
    },
    [displayIndex, animating, total]
  );

  const onTransitionEnd = useCallback(() => {
    if (animDivRef.current) {
      animDivRef.current.style.transition = "none";
    }
    setDisplayIndex(
      underIndexRef.current === displayIndex
        ? animIndexRef.current
        : underIndexRef.current
    );
    setAnimating(false);
    animIndexRef.current = null;
  }, [displayIndex]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) doTurn(diff > 0 ? 1 : -1);
  };

  const progress = total > 1 ? (displayIndex / (total - 1)) * 100 : 0;

  // Petal definitions
  const petals = [
    { width: 18, height: 12, color: "#f8bbd9", left: "8%", delay: "0s", duration: "7s" },
    { width: 12, height: 8,  color: "#f3e5f5", left: "25%", delay: "1.5s", duration: "9s" },
    { width: 14, height: 10, color: "#fce4ec", left: "55%", delay: "3s", duration: "8s" },
    { width: 10, height: 7,  color: "#f8bbd9", left: "75%", delay: "0.8s", duration: "11s" },
    { width: 16, height: 11, color: "#f3e5f5", left: "90%", delay: "4s", duration: "6.5s" },
    { width: 11, height: 8,  color: "#fce4ec", left: "42%", delay: "2s", duration: "10s" },
  ];

  return (
    <>
      {/* Inject keyframe animation for petals */}
      <style>{`
        @keyframes petalDrift {
          0%   { transform: translateY(-20px) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.18; }
          90%  { opacity: 0.18; }
          100% { transform: translateY(110vh) rotate(180deg); opacity: 0; }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 60% 20%, #fce4ec 0%, #f8bbd9 18%, #f3e5f5 45%, #fce4ec 70%, #fff0f5 100%)",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          userSelect: "none",
          WebkitUserSelect: "none",
          touchAction: "pan-y",
          position: "relative",
          overflow: "hidden",
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Ambient overlay blobs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 10% 80%, rgba(248,187,208,0.35) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(243,229,245,0.4) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />

        {/* Floating petals */}
        {petals.map((p, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              width: p.width,
              height: p.height,
              background: p.color,
              left: p.left,
              top: "-10px",
              borderRadius: "50% 0 50% 0",
              opacity: 0,
              animation: `petalDrift ${p.duration} ${p.delay} linear infinite`,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Title label */}
        <p
          style={{
            color: "rgba(172,100,130,0.55)",
            fontSize: 10,
            letterSpacing: 6,
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
            position: "relative",
          }}
        >
          for mama, with love
        </p>

        {/* Book */}
        <div style={{ width: BOOK_W, height: BOOK_H, position: "relative" }}>

          {/* Spine */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: SPINE_W,
              height: "100%",
              zIndex: 30,
              background:
                "linear-gradient(to right, #c86090, #e8a0b8, #c86090)",
              borderRadius: "5px 0 0 5px",
              boxShadow:
                "inset -3px 0 6px rgba(180,80,110,0.3), 2px 0 8px rgba(180,80,110,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "rgba(255,240,248,0.5)",
                fontSize: 7,
                letterSpacing: 4,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 200,
              }}
            >
              Memories
            </span>
          </div>

          {/* Drop shadow */}
          <div
            style={{
              position: "absolute",
              left: SPINE_W,
              top: 10,
              width: PAGE_W,
              height: BOOK_H,
              background: "rgba(180,80,110,0.18)",
              borderRadius: "0 8px 8px 0",
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />

          {/* Page area */}
          <div
            style={{
              position: "absolute",
              left: SPINE_W,
              top: 0,
              width: PAGE_W,
              height: BOOK_H,
              perspective: 1600,
              overflow: "hidden",
              borderRadius: "0 8px 8px 0",
            }}
          >
            {/* Under page */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                borderRadius: "0 8px 8px 0",
                overflow: "hidden",
              }}
            >
              <PageContent
                index={animating ? underIndexRef.current : displayIndex}
              />
            </div>

            {/* Peeling page */}
            {animating && (
              <div
                ref={animDivRef}
                style={{
                  position: "absolute",
                  inset: 0,
                  transformOrigin: "left center",
                  transformStyle: "preserve-3d",
                  transform: `rotateY(${rotationRef.current}deg)`,
                  transition: "none",
                  zIndex: 2,
                  willChange: "transform",
                }}
                onTransitionEnd={onTransitionEnd}
              >
                {/* Front face */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    borderRadius: "0 8px 8px 0",
                    overflow: "hidden",
                  }}
                >
                  <PageContent index={animIndexRef.current} />
                  {/* Fold shadow */}
                  <div
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 0,
                      width: 40,
                      height: "100%",
                      background:
                        "linear-gradient(to right, transparent, rgba(180,80,110,0.08))",
                      pointerEvents: "none",
                    }}
                  />
                </div>

                {/* Back face — blush paper */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "0 8px 8px 0",
                    overflow: "hidden",
                    background: `linear-gradient(145deg, ${paperBg} 0%, ${paperBg2} 100%)`,
                  }}
                >
                  {/* Subtle ruled texture */}
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(180,80,110,0.04) 31px, rgba(180,80,110,0.04) 32px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: 40,
                      height: "100%",
                      background:
                        "linear-gradient(to left, transparent, rgba(180,80,110,0.06))",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            )}

            {/* Tap target */}
            {!animating && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 3,
                  cursor: displayIndex < total - 1 ? "pointer" : "default",
                }}
                onClick={() => doTurn(1)}
              />
            )}
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 28, width: PAGE_W, position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: 1.5,
              background: "rgba(212,120,154,0.15)",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, rgba(212,120,154,0.25), rgba(212,120,154,0.7))",
                borderRadius: 2,
                transition: "width 0.5s ease",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: `${progress}%`,
                transform: "translate(-50%, -50%)",
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: "#e8a0b8",
                boxShadow: "0 0 10px rgba(232,160,184,0.6)",
                transition: "left 0.5s ease",
              }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              color: "rgba(172,100,130,0.35)",
              fontSize: 9,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 200,
            }}
          >
            {displayIndex === 0
              ? "cover"
              : displayIndex >= total - 1
              ? "the end"
              : `${displayIndex} / ${total - 2}`}
          </p>
        </div>

        <p
          style={{
            marginTop: 8,
            color: "rgba(172,100,130,0.2)",
            fontSize: 8,
            letterSpacing: 4,
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 200,
          }}
        >
          swipe or tap to turn pages
        </p>
      </div>
    </>
  );
}