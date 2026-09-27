import AlbumPlayer from "@/components/ui/albumPlayer";

const songs = [
  {
    song: "Sunflower",
    artist: "Swae Lee, Post Malone",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273e2e352d89826aef6dbd5ff8f",
    glow: "#7c2d12",
  },
  {
    song: "White Ferrari",
    artist: "Frank Ocean",
    albumArt: "/whiteferrari.jpeg",
    glow: "#1e3a5f",
  },
  {
    song: "Money Trees",
    artist: "Kendrick Lamar",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273d28d2ebdedb220e479743797",
    glow: "#581c87",
  },
  {
    song: "DAISIES",
    artist: "Justin Bieber",
    albumArt: "https://i.ytimg.com/vi/21cqrAQSGlM/maxresdefault.jpg",
    glow: "#881337",
  },
  {
    song: "Good Days",
    artist: "SZA",
    albumArt: "https://i.scdn.co/image/ab67616d0000b273bc18bdade69ec5ef0bb25b17",
    glow: "#134e4a",
  },
];

export default function Page() {
  return (
    <div className="relative w-full min-h-screen bg-neutral-50 flex flex-col items-center justify-center gap-16 p-10 overflow-hidden">
      {/* ambient background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-96 h-96 rounded-full blur-[120px] opacity-20 bg-purple-800" />
        <div className="absolute bottom-[-5%] right-[8%] w-80 h-80 rounded-full blur-[100px] opacity-15 bg-rose-900" />
        <div className="absolute top-[40%] left-[-5%] w-72 h-72 rounded-full blur-[90px] opacity-10 bg-blue-900" />
      </div>

      {/* header */}
      <div className="relative flex flex-col items-center gap-1 z-10">
        <p className="text-neutral-500 text-[10px] tracking-[0.4em] uppercase font-semibold">
          now playing
        </p>
        <h1 className="text-amber-950 text-5xl font-bold tracking-tight leading-none">
          Select a Track
        </h1>
        <p className="text-neutral-600 text-lg mt-1">
          Hover the disc to reveal the cover
        </p>
      </div>

      {/* players */}
      <div className="relative z-10 flex flex-col items-center gap-4">

        {/* row 1 — 3 players */}
        <div className="flex items-end gap-5">
          {songs.slice(0, 3).map(({ song, artist, albumArt, glow}) => (
            <div
              key={song}
              className="relative"
            >
              {/* per-player glow */}
              <div
                className="absolute blur-3xl rounded-[30px] opacity-60"
                style={{
                  inset: '10%',
                  background: glow,
                  transform: 'translateY(30px) scale(0.9)',
                }}
              />
              <div className="relative">
                <AlbumPlayer song={song} artist={artist} albumArt={albumArt} />
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center flex-wrap gap-5" >
          {songs.slice(3).map(({ song, artist, albumArt, glow }) => (
            <div
              key={song}
              className="relative"
            >
              <div
                className="absolute blur-3xl rounded-[30px] opacity-60"
                style={{
                  inset: '10%',
                  background: glow,
                  transform: 'translateY(30px) scale(0.9)',
                }}
              />
              <div className="relative">
                <AlbumPlayer song={song} artist={artist} albumArt={albumArt} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <p className="relative z-10 text-neutral-700 text-xs tracking-wider">
        5 tracks · hover any player
      </p>
    </div>
  );
}
