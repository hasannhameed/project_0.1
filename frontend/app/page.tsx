import Link from "next/link";
import Script from "next/script";
import Image from "next/image";

import imgSakura from "@/lib/assets/sakura.png";
import imgSummer from "@/lib/assets/Summer Echo.jpg";
import imgLantern from "@/lib/assets/1163376.jpg";

import imgGallery1 from "@/lib/assets/25942.jpg";
import imgGallery2 from "@/lib/assets/25968.jpeg";
import imgGallery3 from "@/lib/assets/26033.jpg";
import imgGallery4 from "@/lib/assets/26040.jpg";
import imgGallery5 from "@/lib/assets/26296.jpg";
import imgGallery6 from "@/lib/assets/Jjk Background 4k.jpg";
import imgGallery7 from "@/lib/assets/images (8).jpg";

// Pre-defined animation delay classes for Tailwind to ensure they are picked up
const delays = [
  "[animation-delay:0s]",
  "[animation-delay:0.1s]",
  "[animation-delay:0.2s]",
  "[animation-delay:0.3s]",
  "[animation-delay:0.4s]",
  "[animation-delay:0.5s]",
  "[animation-delay:0.6s]",
  "[animation-delay:0.7s]",
  "[animation-delay:0.8s]",
  "[animation-delay:0.9s]",
  "[animation-delay:1s]",
];

const SPARKLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: (i * 31) % 100,
  left: (i * 47) % 100,
  delay: delays[i % delays.length],
  size: 8 + (i % 5) * 3,
}));

const TICKER = [
  "新作 · new drops",
  "✦ matsuri season",
  "夏 · summer 2026",
  "neon nights",
  "♡ vibes only",
  "東京 · tokyo",
  "★ trending now",
  "花火 · hanabi",
];

const FEATURED_ANIME = [
  { title: "Neon Sakura", jp: "ネオン桜", genre: "Sci-fi", from: "from-sakura/50", to: "to-twilight/50", image: imgSakura },
  { title: "Summer Echo", jp: "夏のこだま", genre: "Slice of life", from: "from-sky/50", to: "to-sunset/50", image: imgSummer },
  { title: "Lantern Drift", jp: "提灯ドリフト", genre: "Action", from: "from-lantern/50", to: "to-twilight/50", image: imgLantern },
];

const GALLERY_IMAGES = [
  imgGallery1,
  imgGallery2,
  imgGallery3,
  imgGallery4,
  imgGallery5,
  imgGallery6,
  imgGallery7,
];

export default function Home() {
  return (
    <main className="relative bg-[#020203] text-white overflow-hidden">


      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden border-b border-white/5 bg-black">

        {/* 
          V-A-C-A (Background Video Container & Effects)
        */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* 1. The HTML5 Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60 scale-[1.1]"
            src="/hero-video.mp4"
          />

          {/* 2. Effect: Color Grade Tint & Blur (Blends GIF into site palette) */}
          <div className="absolute inset-0 bg-[#020203]/40 backdrop-blur-[2px]" />

          {/* 3. Effect: CRT Scanlines (Retro cyber feel) */}
          <div className="absolute inset-0 bg-scanlines opacity-[0.15]" />

          {/* 4. Effect: Vignette (Darkens edges to focus content) */}
          <div className="absolute inset-0 bg-vignette opacity-80" />
        </div>

        {/* Dynamic Background Blobs (Layers over video for depth) */}
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 animate-blob bg-sakura/20 blur-3xl opacity-60" />
        <div aria-hidden className="pointer-events-none absolute top-1/2 -right-40 h-[28rem] w-[28rem] animate-blob bg-sky/10 blur-3xl [animation-delay:-6s] opacity-50" />

        {/* Sparkling particles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-10">
          {SPARKLES.map((s) => (
            <span
              key={s.id}
              className={`absolute animate-sparkle text-sakura-soft opacity-0 ${s.delay}`}
              style={{
                top: `${s.top}%`,
                left: `${s.left}%`,
                fontSize: `${s.size}px`,
              }}
            >
              ✦
            </span>
          ))}
        </div>

        {/* Main Hero Container - Elevated z-index */}
        <div className="relative z-20 mx-auto max-w-7xl px-6 py-20 md:py-32 w-full flex flex-col items-center justify-center text-center">

          <span className="mb-6 inline-flex animate-rise items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-xs font-semibold text-sakura-soft backdrop-blur-sm [animation-delay:0s]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-sakura" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura shadow-[0_0_10px] shadow-sakura" />
            </span>
            summer 2026 · matsuri season is live
          </span>

          <h1 className="mb-4 animate-rise text-7xl font-black leading-[0.9] tracking-tighter sm:text-8xl md:text-9xl xl:text-[10rem] [animation-delay:0.1s]">
            <span className="font-display gradient-text text-glow-sakura">Hanabi</span>
          </h1>

          <p className="mb-4 animate-rise font-display text-2xl text-white/90 sm:text-3xl [animation-delay:0.2s]">
            花火が咲く夏。
          </p>

          <p className="mb-12 max-w-2xl animate-rise text-balance text-base text-white/80 sm:text-lg md:text-xl [animation-delay:0.3s]">
            Stream the new wave of <span className="font-semibold text-sakura text-glow-sakura">anime</span>, meet your{" "}
            <span className="font-semibold text-sky">favorite characters</span>, and experience the vibe of{" "}
            <span className="font-semibold text-sunset">tokyo summer</span> directly from the background.
          </p>

          <div className="flex animate-rise flex-wrap justify-center gap-4 [animation-delay:0.4s]">
            <Link
              href="/anime"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-10 py-4 text-sm font-bold text-white shadow-2xl shadow-sakura/30 transition hover:scale-105 hover:shadow-sakura/50 active:scale-95 duration-300"
            >
              <span className="relative z-10">Explore Anime →</span>
              <span className="shimmer-overlay" />
            </Link>
            <Link
              href="/characters"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-10 py-4 text-sm font-bold text-white backdrop-blur-sm transition hover:scale-105 hover:border-white/20 hover:bg-black/80 duration-300"
            >
              Meet Characters <span className="text-sakura">♡</span>
            </Link>
          </div>

          {/* Quick Info Grid - Glassmorphism optimized for video background */}
          <div className="mt-24 md:mt-32 grid w-full animate-rise grid-cols-1 gap-4 sm:grid-cols-3 [animation-delay:0.6s]">
            {[
              { kanji: "速", emoji: "⚡", label: "stream fast", desc: "Global CDN" },
              { kanji: "美", emoji: "🌸", label: "anime aesthetic", desc: "Background FX" },
              { kanji: "祭", emoji: "🏮", label: "matsuri vibes", desc: "Community Events" },
            ].map((b) => (
              <div
                key={b.label}
                className="glass group flex flex-col items-center justify-center rounded-2xl p-6 text-center transition hover:-translate-y-1 hover:border-white/20 hover:bg-black/60 duration-300"
              >
                <div className="mb-2 flex items-center justify-center gap-3">
                  <span className="font-display text-3xl text-sakura transition group-hover:text-twilight group-hover:scale-110 duration-300">
                    {b.kanji}
                  </span>
                  <span className="text-3xl transition group-hover:rotate-12 duration-300">{b.emoji}</span>
                </div>
                <div className="text-sm font-semibold uppercase tracking-wider text-white">
                  {b.label}
                </div>
                <div className="text-xs text-white/60 mt-1">
                  {b.desc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Marquee Ticker - Elevated z-index */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-white/5 bg-black/80 py-3 backdrop-blur-sm z-30">
          <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-sm font-bold uppercase tracking-widest text-sakura-soft/80">
            {[...TICKER, ...TICKER, ...TICKER].map((t, i) => (
              <span key={i} className="flex items-center gap-2">
                {t}
                <span className="text-sakura/50">·</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURED ANIME --- */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 sm:px-8 z-10 bg-[#020203]">
        <div className="mb-12 flex items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sakura">
              人気作品 · trending
            </span>
            <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">
              Featured Anime
            </h2>
          </div>
          <Link
            href="/anime"
            className="hover-underline hidden text-sm font-semibold text-white/70 hover:text-white sm:inline-block"
          >
            view all →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_ANIME.map((a, i) => (
            <article
              key={a.title}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/20 duration-300"
            >
              <Image
                src={a.image}
                alt={a.title}
                fill
                className="object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className={`absolute inset-0 bg-gradient-to-br ${a.from} ${a.to} opacity-40 transition duration-700 group-hover:scale-110 group-hover:opacity-60 mix-blend-overlay`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

              {/* Background Kanji */}
              <div className="absolute right-4 top-4 font-display text-7xl text-white/10 transition group-hover:text-white/20 duration-500 z-10 drop-shadow-lg">
                {a.jp}
              </div>

              <div className="absolute inset-x-0 bottom-0 p-6 z-10">
                <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
                  {a.genre}
                </span>
                <h3 className="mt-3 text-2xl font-bold text-white tracking-tight drop-shadow-md">{a.title}</h3>
                <p className="text-sm text-white/90 font-display drop-shadow-md">{a.jp}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* --- VISUAL GALLERY --- */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32 sm:px-8 z-10 bg-[#020203]">
        <div className="mb-12 flex items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-sky">
              ギャラリー · moments
            </span>
            <h2 className="mt-2 font-display text-4xl text-white sm:text-5xl">
              Visual Gallery
            </h2>
          </div>
        </div>

        <div className="columns-2 sm:columns-3 lg:columns-4 gap-4 space-y-4">
          {GALLERY_IMAGES.map((img, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 group break-inside-avoid shadow-lg transition duration-500 hover:shadow-sky/20 hover:-translate-y-1 hover:border-sky/50">
              <img
                src={img.src}
                alt={`Gallery image ${i + 1}`}
                className="w-full h-auto block object-cover transition duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none" />
              <div className="absolute bottom-4 left-4 opacity-0 transition duration-500 group-hover:opacity-100 pointer-events-none">
                <span className="inline-block rounded-full bg-black/40 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
                  ✧ View
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}