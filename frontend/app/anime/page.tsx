import Image from "next/image";
import img1 from "@/lib/assets/1163376.jpg";
import img2 from "@/lib/assets/25942.jpg";
import img3 from "@/lib/assets/25968.jpeg";
import img4 from "@/lib/assets/26033.jpg";
import img5 from "@/lib/assets/26040.jpg";
import img6 from "@/lib/assets/26296.jpg";
import img7 from "@/lib/assets/Jjk Background 4k.jpg";
import img8 from "@/lib/assets/Summer Echo.jpg";
import img9 from "@/lib/assets/images (8).jpg";
import img10 from "@/lib/assets/sakura.png";

const ANIME = [
    { title: "Neon Sakura", jp: "ネオン桜", year: 2026, ep: 12, rating: 9.4, genres: ["Sci-fi", "Romance"], from: "from-sakura", to: "to-twilight", image: img10 },
    { title: "Summer Echo", jp: "夏のこだま", year: 2025, ep: 24, rating: 9.1, genres: ["Slice of life"], from: "from-sky", to: "to-sunset", image: img8 },
    { title: "Lantern Drift", jp: "提灯ドリフト", year: 2026, ep: 13, rating: 8.9, genres: ["Action", "Drama"], from: "from-lantern", to: "to-twilight", image: img1 },
    { title: "Goldfish Dream", jp: "金魚の夢", year: 2024, ep: 26, rating: 9.6, genres: ["Fantasy"], from: "from-peach", to: "to-sakura", image: img2 },
    { title: "Tokyo After Dark", jp: "東京アフターダーク", year: 2025, ep: 10, rating: 8.7, genres: ["Thriller"], from: "from-twilight", to: "to-sky", image: img3 },
    { title: "Kitsune Lines", jp: "狐線", year: 2026, ep: 12, rating: 9.2, genres: ["Mystery", "Supernatural"], from: "from-sunset", to: "to-lantern", image: img4 },
    { title: "Cassette Heart", jp: "カセットハート", year: 2024, ep: 13, rating: 8.5, genres: ["Music", "Romance"], from: "from-sakura-soft", to: "to-sky", image: img5 },
    { title: "Yuki No Senshi", jp: "雪の戦士", year: 2025, ep: 22, rating: 9.0, genres: ["Action"], from: "from-sky", to: "to-twilight", image: img6 },
    { title: "Hanabi Diary", jp: "花火日記", year: 2026, ep: 8, rating: 9.3, genres: ["Slice of life"], from: "from-sakura", to: "to-sunset", image: img7 },
];

const FILTERS = ["All", "Sci-fi", "Action", "Romance", "Slice of life", "Fantasy"];

export default function Anime() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-twilight/30 blur-3xl" />
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                作品一覧 · catalog
                            </span>
                            <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-7xl [animation-delay:0.1s]">
                                <span className="gradient-text">All anime</span>
                            </h1>
                            <p className="mt-3 max-w-xl animate-rise text-white/70 [animation-delay:0.2s]">
                                hand-curated, no algorithmic slop. updated every week.
                            </p>
                        </div>

                        <div className="flex w-full max-w-md animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur transition focus-within:border-sakura/50 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(255,91,156,0.15)] [animation-delay:0.3s]">
                            <span className="text-white/40">⌕</span>
                            <input
                                type="text"
                                placeholder="search titles, genres…"
                                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                            />
                            <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/60 sm:inline">
                                /
                            </kbd>
                        </div>
                    </div>

                    <div className="mt-8 flex animate-rise flex-wrap gap-2 [animation-delay:0.4s]">
                        {FILTERS.map((f, i) => (
                            <button
                                key={f}
                                className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:scale-105 ${i === 0
                                    ? "border-transparent bg-gradient-to-r from-sakura via-twilight to-sky text-white shadow-lg shadow-sakura/30"
                                    : "border-white/10 bg-white/5 text-white/70 hover:border-sakura/40 hover:bg-white/10 hover:text-white"
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {ANIME.map((a, i) => (
                        <article
                            key={a.title}
                            className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/25"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div className="relative aspect-[3/4] overflow-hidden">
                                <Image
                                    src={a.image}
                                    alt={a.title}
                                    fill
                                    className="object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                />
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to} opacity-50 mix-blend-overlay transition duration-700 group-hover:scale-110`}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                <span className="pointer-events-none absolute right-5 top-5 font-display text-7xl leading-none text-white/10 drop-shadow-md transition duration-700 group-hover:text-white/20">
                                    {a.jp}
                                </span>

                                <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur border border-white/10">
                                    ★ {a.rating}
                                </span>
                                <span className="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur opacity-0 transition group-hover:opacity-100 border border-white/10">
                                    ▶ watch now
                                </span>

                                <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                                    <div className="mb-2 flex flex-wrap gap-1">
                                        {a.genres.map((g) => (
                                            <span
                                                key={g}
                                                className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur border border-white/10"
                                            >
                                                {g}
                                            </span>
                                        ))}
                                    </div>
                                    <h3 className="text-xl font-bold text-white drop-shadow-md transition group-hover:text-sakura-soft">
                                        {a.title}
                                    </h3>
                                    <p className="mt-0.5 flex items-center gap-2 text-xs text-white/90 drop-shadow-md">
                                        <span>{a.year}</span>
                                        <span className="h-1 w-1 rounded-full bg-white/50" />
                                        <span>{a.ep} eps</span>
                                    </p>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:scale-105 hover:border-sakura/40 hover:bg-white/10">
                        <span className="relative z-10">Load more · もっと</span>
                    </button>
                </div>
            </section>
        </main>
    );
}
