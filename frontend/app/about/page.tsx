import Link from "next/link";

const STORY = [
    {
        glyph: "01",
        title: "Born from a midsummer night",
        eyebrow: "Origin",
        body:
            "Hanabi started as a side project on a humid Tokyo evening — three friends, one ramen shop, and a shared obsession with anime, neon, and the way the city sounds at 2am. We wanted a place that captured that exact feeling.",
        from: "from-sakura",
        to: "to-twilight",
    },
    {
        glyph: "02",
        title: "Built for the new wave",
        eyebrow: "Design",
        body:
            "Most anime platforms feel like they were designed for 2008. We're building Hanabi the way Gen Z actually browses — bright, fast, mobile-first, and unapologetically personal. No infinite walls of grey thumbnails.",
        from: "from-sky",
        to: "to-sunset",
    },
    {
        glyph: "03",
        title: "More than a streamer",
        eyebrow: "Culture",
        body:
            "Watch parties, character spotlights, drop-day countdowns, fan zines — Hanabi is part library, part festival, part group chat. If it's anime culture, it lives here.",
        from: "from-twilight",
        to: "to-lantern",
    },
];

const STATS = [
    { value: "2,400+", label: "titles" },
    { value: "180", label: "studios" },
    { value: "1.2M", label: "fans" },
    { value: "24/7", label: "community" },
];

export default function About() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-24 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 animate-blob bg-sakura/30 blur-3xl" />
                <div className="mx-auto max-w-4xl text-center">
                    <span className="inline-block animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                        our story
                    </span>
                    <h1 className="mt-4 animate-rise font-display text-5xl leading-tight tracking-tight sm:text-7xl [animation-delay:0.1s]">
                        <span className="gradient-text">a love letter</span>
                        <br />
                        <span className="text-white">to anime, summer, and you.</span>
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl animate-rise text-balance text-base text-white/70 sm:text-lg [animation-delay:0.2s]">
                        Hanabi means fireworks — and that's exactly what good anime feels
                        like. Quick, loud, beautiful, and a little heartbreaking when it
                        ends.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
                <div className="flex flex-col gap-20">
                    {STORY.map((chapter, i) => {
                        const flip = i % 2 === 1;
                        return (
                            <article
                                key={chapter.glyph}
                                className={`grid items-center gap-8 md:grid-cols-2 ${flip ? "md:[&>*:first-child]:order-2" : ""
                                    }`}
                            >
                                <div className="group relative aspect-square overflow-hidden rounded-3xl border border-white/10">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${chapter.from} ${chapter.to} transition duration-700 group-hover:scale-110`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                                    <span className="absolute inset-0 flex items-center justify-center font-display text-[12rem] leading-none text-white/15 transition duration-700 group-hover:scale-110 group-hover:text-white/30">
                                        {chapter.glyph}
                                    </span>
                                    <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white backdrop-blur">
                                        chapter {String(i + 1).padStart(2, "0")}
                                    </span>
                                </div>

                                <div>
                                    <span className="font-display text-sm uppercase tracking-[0.25em] text-sakura-soft">
                                        {chapter.eyebrow}
                                    </span>
                                    <h2 className="mt-2 font-display text-3xl text-white sm:text-4xl">
                                        {chapter.title}
                                    </h2>
                                    <p className="mt-4 leading-relaxed text-white/70">
                                        {chapter.body}
                                    </p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>

            <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
                <div className="glass relative overflow-hidden rounded-3xl p-8 sm:p-12">
                    <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 animate-float bg-sakura/20 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 animate-float-slow bg-sky/20 blur-3xl" />
                    <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {STATS.map((s) => (
                            <div key={s.label} className="text-center">
                                <div className="font-display text-4xl tracking-tight sm:text-5xl">
                                    <span className="gradient-text">{s.value}</span>
                                </div>
                                <div className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                    {s.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center gap-4 text-center">
                    <p className="font-display text-xl text-white">来てね · come hang out</p>
                    <Link
                        href="/contact"
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-7 py-3.5 text-sm font-bold text-white shadow-2xl shadow-sakura/40 transition hover:scale-105"
                    >
                        <span className="relative z-10">Say hi</span>
                        <span className="relative z-10">→</span>
                        <span className="shimmer-overlay" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
