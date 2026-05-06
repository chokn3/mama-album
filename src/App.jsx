const photos = [
  {
    url: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_1",
    caption: "Summer 2023 🌊",
    date: "July 2023",
  },
  {
    url: "https://drive.google.com/uc?export=view&id=YOUR_FILE_ID_2",
    caption: "Birthday night ✨",
    date: "March 2024",
  },
  // Add more photos here...
];

export default function App() {
  return (
    <div className="min-h-screen bg-stone-950 text-white font-serif">
      {/* Header */}
      <header className="text-center py-16 px-6">
        <h1 className="text-4xl font-bold tracking-widest uppercase text-amber-100">
          Memories
        </h1>
        <p className="text-stone-400 mt-2 text-sm tracking-widest">
          a collection of moments
        </p>
      </header>

      {/* Photo Feed */}
      <main className="max-w-md mx-auto px-4 pb-24 flex flex-col gap-10">
        {photos.map((photo, i) => (
          <div key={i} className="flex flex-col gap-2">
            <img
              src={photo.url}
              alt={photo.caption}
              className="w-full rounded-2xl object-cover shadow-xl"
              loading="lazy"
            />
            <div className="px-1">
              <p className="text-amber-100 text-base">{photo.caption}</p>
              <p className="text-stone-500 text-xs mt-0.5">{photo.date}</p>
            </div>
          </div>
        ))}
      </main>

      {/* Footer */}
      <footer className="text-center pb-10 text-stone-600 text-xs tracking-widest">
        made with love
      </footer>
    </div>
  );
}