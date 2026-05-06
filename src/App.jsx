import { useState, useRef } from "react";

const photos = [
  {
    front: {
      url: "https://lh3.googleusercontent.com/d/1rHVz4J_CSTl91QDFzi50HSmx8yBF1QrS",
      caption: "Summer at the beach",
      date: "July 2023",
      tilt: "-rotate-2",
    },
    back: {
      url: "https://lh3.googleusercontent.com/d/1sEfhAe256d9bhD0BiuCdlNF1QQksERUn",
      caption: "Golden hour vibes",
      date: "July 2023",
      tilt: "rotate-2",
    },
  },
  {
    front: {
      url: "https://lh3.googleusercontent.com/d/FILE_ID",
      caption: "Birthday night 🎂",
      date: "March 2024",
      tilt: "rotate-1",
    },
    back: {
      url: "https://lh3.googleusercontent.com/d/FILE_ID",
      caption: "All of us together",
      date: "March 2024",
      tilt: "-rotate-1",
    },
  },
];

const pages = ["cover", ...photos, "end"];

export default function App() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(null);

  const turnPage = (dir) => {
    setCurrent((c) => Math.max(0, Math.min(pages.length - 1, c + dir)));
  };

  const onTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) turnPage(diff > 0 ? 1 : -1);
  };

  const PhotoPage = ({ data, side }) => (
    <div className="flex flex-col items-center h-full py-5 px-4">
      <div className={`bg-white p-[6px] pb-7 shadow-md ${data.tilt} w-full`}>
        <img
          src={data.url}
          alt={data.caption}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      </div>
      <p className="text-[#666] text-xs italic mt-3 text-center">{data.caption}</p>
      <p className="text-[#aaa] text-[10px] mt-1 font-mono">{data.date}</p>
    </div>
  );

  const pageData = pages[current];
  const total = pages.length;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-10"
      style={{ background: "#1a1108" }}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <p className="text-[10px] tracking-[4px] uppercase mb-5" style={{ color: "rgba(232,213,163,0.5)" }}>
        My Photo Album
      </p>

      {/* Book */}
      <div className="relative" style={{ width: 300 }}>
        {/* Spine */}
        <div
          className="absolute left-0 top-0 h-full z-10 flex items-center justify-center"
          style={{
            width: 18,
            background: "linear-gradient(to right, #5c3d1a, #8b5e2a, #5c3d1a)",
            borderRadius: "2px 0 0 2px",
          }}
        >
          <span className="text-[7px] tracking-[3px] uppercase" style={{ color: "rgba(232,213,163,0.5)", writingMode: "vertical-rl" }}>
            Memories
          </span>
        </div>

        {/* Page */}
        <div
          className="overflow-hidden"
          style={{
            marginLeft: 18,
            width: 282,
            height: 400,
            borderRadius: "0 6px 6px 0",
            background: "#f5efe0",
          }}
          onClick={() => current < total - 1 && turnPage(1)}
        >
          {pageData === "cover" && (
            <div
              className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: "linear-gradient(145deg, #7a4f2d, #3d2210)" }}
            >
              <span className="text-2xl tracking-widest" style={{ color: "#e8d5a3" }}>Memories</span>
              <span className="text-[9px] tracking-[5px] uppercase" style={{ color: "rgba(232,213,163,0.4)" }}>
                a photo album
              </span>
              <span className="text-[8px] tracking-[2px] absolute bottom-5" style={{ color: "rgba(232,213,163,0.3)" }}>
                tap to open →
              </span>
            </div>
          )}

          {pageData === "end" && (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2" style={{ background: "#f0e8d5" }}>
              <span className="text-2xl" style={{ color: "#b8a07a" }}>❧</span>
              <span className="text-xs tracking-widest italic" style={{ color: "#9a8060" }}>The End</span>
              <span className="text-[10px]" style={{ color: "#bbb" }}>to be continued...</span>
            </div>
          )}

          {pageData !== "cover" && pageData !== "end" && (
            <PhotoPage data={current % 2 === 1 ? pageData.front : pageData.back} />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6 mt-5">
        <button
          onClick={() => turnPage(-1)}
          disabled={current === 0}
          className="w-9 h-9 rounded-full text-lg flex items-center justify-center disabled:opacity-20"
          style={{ border: "1px solid rgba(232,213,163,0.25)", color: "rgba(232,213,163,0.6)", background: "none" }}
        >
          ‹
        </button>
        <span className="text-[10px] tracking-widest font-mono" style={{ color: "rgba(232,213,163,0.35)" }}>
          {current === 0 ? "Cover" : current >= total - 1 ? "The End" : `Page ${current} of ${total - 2}`}
        </span>
        <button
          onClick={() => turnPage(1)}
          disabled={current >= total - 1}
          className="w-9 h-9 rounded-full text-lg flex items-center justify-center disabled:opacity-20"
          style={{ border: "1px solid rgba(232,213,163,0.25)", color: "rgba(232,213,163,0.6)", background: "none" }}
        >
          ›
        </button>
      </div>

      {/* Dots */}
      <div className="flex gap-2 mt-3">
        {pages.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className="w-1.5 h-1.5 rounded-full cursor-pointer transition-all"
            style={{ background: i === current ? "rgba(232,213,163,0.7)" : "rgba(232,213,163,0.2)" }}
          />
        ))}
      </div>

      <p className="text-[8px] tracking-widest uppercase mt-3" style={{ color: "rgba(232,213,163,0.2)" }}>
        swipe to turn pages
      </p>
    </div>
  );
}