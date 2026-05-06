import { useState, useRef, useCallback, useEffect } from "react";
import WelcomePage from "./WelcomePage.jsx";

// ─── YOUR PHOTOS ───────────────────────────────────────────────
const COVER_PHOTO = "https://lh3.googleusercontent.com/d/12jSAoRv6CdYcoH9LIsSJZaa4o0OvbnNh"; 
const pages = [
  "cover",
  {
    top: "https://lh3.googleusercontent.com/d/1rHVz4J_CSTl91QDFzi50HSmx8yBF1QrS",
    bottom: "https://lh3.googleusercontent.com/d/1hAE9oghGazLqx_Et-MC_wHrJ11M711Sj",
    topTilt: "-1.5deg",
    bottomTilt: "1.2deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1hs38OQXqiHqqO8mH6DshE4pQi6mkogTY",
    bottom: "https://lh3.googleusercontent.com/d/1DGH2j_WOIoqPWYTlOwoWgA8kPiYVy6Rw",
    topTilt: "1deg",
    bottomTilt: "-0.8deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ig1gWz1Y5j58EwgzQGgmYa47vPpWRYA9",
    bottom: "https://lh3.googleusercontent.com/d/1HcRVes990YRxuLMyqim6jMRkGK1s8uBn",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1YjAsp_5KLi18GdYcmuLomrEOwQodCOlq",
    bottom: "https://lh3.googleusercontent.com/d/1HWa-6hw5LvUOfmWfJyUyVJkM_Eh_k9cq",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1g5mwSOBo4ksJsvruZ3VNRVwQUPmSXh5E",
    bottom: "https://lh3.googleusercontent.com/d/1S71ppfbfGR-MeCzZyySOpc3HSmocB6LY",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1ap29_QV7UrvxPkvFYo7B9-oK7pXLA1Pt",
    bottom: "https://lh3.googleusercontent.com/d/1a7l56ywOD1UR4X-_90O2X0tJqeAcWmnS",
    topTilt: "-1.2deg",
    bottomTilt: "1.5deg",
  },
  {
    top: "https://lh3.googleusercontent.com/d/1rsYWkAY_gjPb7VgeIbu6sY55lwuBDFmN",
    bottom: "https://lh3.googleusercontent.com/d/15sR1V1e1OHOsw0jOToRXycQ9tAJJvZ7R",
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

const paperBg = "#fff5f8";
const paperBg2 = "#fde8f0";

// Inject Google Fonts
const fontLink = document.createElement("link");
fontLink.rel = "stylesheet";
fontLink.href =
  "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400&display=swap";
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
        gap: 10,
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 12,
          border: "1px solid rgba(255,230,240,0.35)",
          borderRadius: 3,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 18,
          border: "1px solid rgba(255,230,240,0.15)",
          borderRadius: 2,
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: 110,
          height: 110,
          borderRadius: "50%",
          border: "3px solid rgba(255,230,240,0.6)",
          boxShadow:
            "0 0 0 5px rgba(255,200,225,0.2), 0 4px 20px rgba(150,60,90,0.3)",
          overflow: "hidden",
          background:
            "linear-gradient(135deg, rgba(255,220,235,0.4), rgba(255,180,210,0.3))",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src={COVER_PHOTO}
          alt="Mama"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.parentNode.innerHTML =
              '<span style="font-size:36px">🌸</span>';
          }}
        />
      </div>

      <span
        style={{
          color: "rgba(255,240,248,0.95)",
          fontSize: 24,
          letterSpacing: 4,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
          fontStyle: "italic",
          textShadow: "0 1px 6px rgba(140,50,80,0.3)",
        }}
      >
        Mama's Album
      </span>

      <span
        style={{
          color: "rgba(255,225,238,0.8)",
          fontSize: 9,
          letterSpacing: 5,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
          textShadow: "0 1px 4px rgba(140,50,80,0.2)",
        }}
      >
        a mother's day special
      </span>

      <span
        style={{
          position: "absolute",
          bottom: 18,
          color: "rgba(255,220,235,0.7)",
          fontSize: 9,
          letterSpacing: 4,
          textTransform: "uppercase",
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}
      >
        swipe to open →
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
          color: "#d4789a",
          fontSize: 30,
          fontFamily: "'Cormorant Garamond', Georgia, serif",
        }}
      >
        ❧
      </span>
      <span
        style={{
          color: "#a85070",
          fontSize: 16,
          letterSpacing: 4,
          fontStyle: "italic",
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontWeight: 400,
        }}
      >
        Relax beh
      </span>
      <span
        style={{
          color: "#b87090",
          fontSize: 10,
          letterSpacing: 2,
          fontFamily: "'Jost', sans-serif",
          fontWeight: 300,
        }}
      >
        itutuloy ko pa to!!
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
      {[
        { src: data.top, tilt: data.topTilt || "-1deg" },
        { src: data.bottom, tilt: data.bottomTilt || "1deg" },
      ].map((photo, i) => (
        <div
          key={i}
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
              transform: `rotate(${photo.tilt})`,
              width: "100%",
              height: "100%",
              boxSizing: "border-box",
            }}
          >
            <img
              src={photo.src}
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
      ))}
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

function BackgroundMusic({ playing }) {
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!playing) return;

    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player(containerRef.current, {
        height: "0",
        width: "0",
        videoId: "sEhDuBKZMO0",
        playerVars: { autoplay: 1, loop: 1, playlist: "sEhDuBKZMO0", controls: 0 },
        events: {
          onReady: (e) => e.target.playVideo(),
        },
      });
    };

    if (window.YT && window.YT.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, [playing]);

  return <div ref={containerRef} style={{ display: "none" }} />;
}

function Album() {
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

  const petals = [
    { width: 18, height: 12, color: "#f8bbd9", left: "8%",  delay: "0s",   duration: "7s"   },
    { width: 12, height: 8,  color: "#f3e5f5", left: "25%", delay: "1.5s", duration: "9s"   },
    { width: 14, height: 10, color: "#fce4ec", left: "55%", delay: "3s",   duration: "8s"   },
    { width: 10, height: 7,  color: "#f8bbd9", left: "75%", delay: "0.8s", duration: "11s"  },
    { width: 16, height: 11, color: "#f3e5f5", left: "90%", delay: "4s",   duration: "6.5s" },
    { width: 11, height: 8,  color: "#fce4ec", left: "42%", delay: "2s",   duration: "10s"  },
  ];

  return (
    <>
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
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at 10% 80%, rgba(248,187,208,0.35) 0%, transparent 40%), radial-gradient(circle at 90% 10%, rgba(243,229,245,0.4) 0%, transparent 35%)",
            pointerEvents: "none",
          }}
        />

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

        <p
          style={{
            color: "#b05878",
            fontSize: 11,
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
            position: "relative",
          }}
        >
          happy mother's day, ngips!
        </p>

        <div style={{ width: BOOK_W, height: BOOK_H, position: "relative" }}>

          <div
            style={{
              position: "absolute",
              left: 0, top: 0,
              width: SPINE_W, height: "100%",
              zIndex: 30,
              background: "linear-gradient(to right, #c86090, #e8a0b8, #c86090)",
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
                color: "rgba(255,240,248,0.8)",
                fontSize: 7,
                letterSpacing: 4,
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                fontFamily: "'Jost', sans-serif",
                fontWeight: 400,
              }}
            >
              Album ni Ngipin
            </span>
          </div>

          <div
            style={{
              position: "absolute",
              left: SPINE_W, top: 10,
              width: PAGE_W, height: BOOK_H,
              background: "rgba(180,80,110,0.18)",
              borderRadius: "0 8px 8px 0",
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />

          <div
            style={{
              position: "absolute",
              left: SPINE_W, top: 0,
              width: PAGE_W, height: BOOK_H,
              perspective: 1600,
              overflow: "hidden",
              borderRadius: "0 8px 8px 0",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 1,
                borderRadius: "0 8px 8px 0",
                overflow: "hidden",
              }}
            >
              <PageContent index={animating ? underIndexRef.current : displayIndex} />
            </div>

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
                  <div
                    style={{
                      position: "absolute",
                      right: 0, top: 0,
                      width: 40, height: "100%",
                      background:
                        "linear-gradient(to right, transparent, rgba(180,80,110,0.08))",
                      pointerEvents: "none",
                    }}
                  />
                </div>

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
                  <div
                    style={{
                      width: "100%", height: "100%",
                      backgroundImage:
                        "repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(180,80,110,0.04) 31px, rgba(180,80,110,0.04) 32px)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      left: 0, top: 0,
                      width: 40, height: "100%",
                      background:
                        "linear-gradient(to left, transparent, rgba(180,80,110,0.06))",
                      pointerEvents: "none",
                    }}
                  />
                </div>
              </div>
            )}

            {!animating && (
              <>
                {displayIndex > 0 && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0, top: 0,
                      width: "25%", height: "100%",
                      zIndex: 3, cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      paddingLeft: 8,
                    }}
                    onClick={() => doTurn(-1)}
                  >
                    <span style={{ color: "rgba(180,80,110,0.4)", fontSize: 20 }}>‹</span>
                  </div>
                )}
                {displayIndex < total - 1 && (
                  <div
                    style={{
                      position: "absolute",
                      left: "25%", top: 0,
                      width: "75%", height: "100%",
                      zIndex: 3, cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      paddingRight: 8,
                    }}
                    onClick={() => doTurn(1)}
                  >
                    <span style={{ color: "rgba(180,80,110,0.4)", fontSize: 20 }}>›</span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div style={{ marginTop: 28, width: PAGE_W, position: "relative" }}>
          <div
            style={{
              width: "100%",
              height: 2,
              background: "rgba(180,80,110,0.15)",
              borderRadius: 2,
              position: "relative",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                background:
                  "linear-gradient(to right, rgba(180,80,110,0.3), rgba(180,80,110,0.75))",
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
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#d4789a",
                boxShadow: "0 0 10px rgba(212,120,154,0.55)",
                transition: "left 0.5s ease",
              }}
            />
          </div>

          <p
            style={{
              textAlign: "center",
              marginTop: 12,
              color: "#a05070",
              fontSize: 10,
              letterSpacing: 3,
              textTransform: "uppercase",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 400,
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
            color: "#b06080",
            fontSize: 9,
            letterSpacing: 3,
            textTransform: "uppercase",
            fontFamily: "'Jost', sans-serif",
            fontWeight: 400,
          }}
        >
          swipe or tap to turn pages
        </p>
      </div>
    </>
  );
}

export default function App() {
  const [entered, setEntered] = useState(false);
  if (!entered) return <WelcomePage onEnter={() => setEntered(true)} />;
  return (
    <>
      <BackgroundMusic playing={true} />
      <Album />
    </>
  );
}