import Image from "next/image";
import Link from "next/link";
import AnimeSearch from "@/components/AnimeSearch";
import AnimeRow from "@/components/AnimeRow";
import {
    getTrendingAnime,
    getTopAnime,
    getTopAiring,
    getSeasonNow,
    getSeasonUpcoming,
    getMostPopular,
    getMostFavorited,
    getTopMovies,
} from "@/lib/jikan";

const STATS = [
    { value: "1.2M", label: "Active fans" },
    { value: "480+", label: "Titles tracked" },
    { value: "24/7", label: "New drops" },
    { value: "98%", label: "Community love" },
];

export const revalidate = 3600;

export default async function Homepage() {
    // Fan out every category in parallel — one round-trip total
    const [
        trending,
        top,
        airing,
        seasonNow,
        seasonUpcoming,
        popular,
        favorites,
        movies,
    ] = await Promise.all([
        getTrendingAnime(12),
        getTopAnime(12),
        getTopAiring(12),
        getSeasonNow(12),
        getSeasonUpcoming(12),
        getMostPopular(12),
        getMostFavorited(12),
        getTopMovies(12),
    ]);

    const heroPrimary = trending[0];
    const heroSecondary = trending[1];
    const heroTertiary = trending[2];

    const collectionPicks = [
        {
            title: "Now Airing",
            eyebrow: "This season",
            desc: "Currently dropping episodes this season.",
            anime: seasonNow[0] ?? top[3],
            href: "/anime",
        },
        {
            title: "Hidden Gems",
            eyebrow: "Editors' picks",
            desc: "Underrated picks our editors are obsessed with.",
            anime: top[8] ?? top[4],
            href: "/anime",
        },
        {
            title: "Late Night",
            eyebrow: "After hours",
            desc: "Mature, slow-burn, perfect for 2 AM marathons.",
            anime: top[6] ?? top[5],
            href: "/anime",
        },
    ];

    return (
        <main>
            {/* HERO */}
            <section
                className="relative flex items-center overflow-hidden px-6 py-6 sm:px-8 sm:py-8"
                style={{ minHeight: "calc(100vh - 72px)" }}
            >
                <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] animate-blob rounded-full bg-sakura/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/3 -right-40 h-[32rem] w-[32rem] animate-blob rounded-full bg-twilight/30 blur-3xl [animation-delay:-7s]" />
                <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-sky/15 blur-3xl" />

                <div className="relative mx-auto w-full max-w-7xl">
                    <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
                        <div>
                            <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-sakura backdrop-blur">
                                <span className="relative flex h-1.5 w-1.5">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura opacity-75" />
                                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-sakura" />
                                </span>
                                welcome
                            </span>

                            <h1 className="mt-4 animate-rise font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl [animation-delay:0.1s]">
                                Where anime <br />
                                <span className="gradient-text">feels like home.</span>
                            </h1>

                            <p className="mt-4 max-w-xl animate-rise text-base text-white/70 sm:text-lg [animation-delay:0.2s]">
                                Powered by MyAnimeList, curated by humans. The top-rated titles, the current season, and the cast of characters fans actually obsess over.
                            </p>

                            <div className="relative z-40 mt-5 animate-rise [animation-delay:0.25s]">
                                <AnimeSearch />
                            </div>

                            <div className="mt-5 flex animate-rise flex-wrap items-center gap-3 [animation-delay:0.3s]">
                                <Link
                                    href="/anime"
                                    className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105 hover:shadow-sakura/50 active:scale-95"
                                >
                                    <span className="relative z-10">Explore the catalog</span>
                                    <span className="relative z-10 transition group-hover:translate-x-1">→</span>
                                    <span className="shimmer-overlay" />
                                </Link>
                                <Link
                                    href="/characters"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-sakura/40 hover:bg-white/10"
                                >
                                    Meet the cast
                                </Link>
                            </div>

                            <div className="mt-8 grid animate-rise grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6 [animation-delay:0.4s]">
                                {STATS.map((s) => (
                                    <div key={s.label} className="flex flex-col">
                                        <span className="font-display text-2xl text-white sm:text-3xl">{s.value}</span>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                                            {s.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero collage — three top-ranked titles from MAL */}
                        <div className="relative animate-rise [animation-delay:0.2s]">
                            <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[26rem] lg:h-[28rem] lg:max-w-none">
                                {heroPrimary && (
                                    <div className="absolute right-0 top-0 h-3/4 w-3/5 overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-sakura/20 animate-float">
                                        <Image
                                            src={heroPrimary.images.jpg.large_image_url}
                                            alt={heroPrimary.title}
                                            fill
                                            sizes="(max-width: 1024px) 60vw, 30vw"
                                            className="object-cover"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sakura">
                                                #1 ranked
                                            </span>
                                            <p className="font-display text-xl text-white line-clamp-1">
                                                {heroPrimary.title}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {heroSecondary && (
                                    <div className="absolute bottom-0 left-0 h-3/5 w-1/2 overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-twilight/30 animate-float [animation-delay:-2s]">
                                        <Image
                                            src={heroSecondary.images.jpg.large_image_url}
                                            alt={heroSecondary.title}
                                            fill
                                            sizes="(max-width: 1024px) 50vw, 25vw"
                                            className="object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-3 left-3 right-3">
                                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-sky">
                                                #2 ranked
                                            </span>
                                            <p className="font-display text-base text-white line-clamp-1">
                                                {heroSecondary.title}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {heroTertiary && (
                                    <div className="absolute right-4 bottom-8 h-28 w-28 overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-sunset/30 animate-float [animation-delay:-4s] sm:h-32 sm:w-32">
                                        <Image
                                            src={heroTertiary.images.jpg.large_image_url}
                                            alt={heroTertiary.title}
                                            fill
                                            sizes="128px"
                                            className="object-cover"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stacked anime category rows — each "See all" deep-links to /anime?list=… */}
            <div className="pt-12">
                <AnimeRow
                    eyebrow="trending now"
                    title="This week's heaters"
                    accent="text-sky"
                    items={trending}
                    seeAllHref="/anime?list=trending"
                />
                <AnimeRow
                    eyebrow="all-time best"
                    title="Top anime"
                    accent="text-sakura"
                    items={top}
                    seeAllHref="/anime?list=top"
                />
                <AnimeRow
                    eyebrow="now airing"
                    title="Currently airing"
                    accent="text-sunset"
                    items={airing}
                    seeAllHref="/anime?list=airing"
                />
                <AnimeRow
                    eyebrow="this season"
                    title="New this season"
                    accent="text-twilight"
                    items={seasonNow}
                    seeAllHref="/anime?list=season"
                />
                <AnimeRow
                    eyebrow="most popular"
                    title="Most popular of all time"
                    accent="text-sakura-soft"
                    items={popular}
                    seeAllHref="/anime?list=popular"
                />
                <AnimeRow
                    eyebrow="fan favorites"
                    title="Most favorited"
                    accent="text-lantern"
                    items={favorites}
                    seeAllHref="/anime?list=favorite"
                />
                <AnimeRow
                    eyebrow="cinema"
                    title="Top movies"
                    accent="text-peach"
                    items={movies}
                    seeAllHref="/anime?list=movies"
                />
                <AnimeRow
                    eyebrow="coming soon"
                    title="Upcoming next season"
                    accent="text-sky"
                    items={seasonUpcoming}
                    seeAllHref="/anime?list=upcoming"
                />
            </div>

            {/* COLLECTIONS */}
            <section className="relative px-6 py-20 sm:px-8">
                <div className="mx-auto max-w-7xl">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-[0.3em] text-sunset">
                            collections
                        </span>
                        <h2 className="mt-2 font-display text-4xl sm:text-5xl">
                            <span className="gradient-text">Built for the mood</span>
                        </h2>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {collectionPicks.map((c, i) => (
                            c.anime && (
                                <Link
                                    key={c.title}
                                    href={c.href}
                                    className="group relative block animate-rise overflow-hidden rounded-3xl border border-white/10 transition hover:border-sky/40 hover:shadow-2xl hover:shadow-sky/20"
                                    style={{ animationDelay: `${i * 80}ms` }}
                                >
                                    <div className="relative aspect-[4/5] overflow-hidden">
                                        <Image
                                            src={c.anime.images.jpg.large_image_url}
                                            alt={c.anime.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover opacity-60 transition duration-700 group-hover:scale-105 group-hover:opacity-90"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                                    </div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-sakura-soft/80">{c.eyebrow}</p>
                                        <h3 className="mt-1 font-display text-3xl text-white">{c.title}</h3>
                                        <p className="mt-2 max-w-xs text-sm text-white/70">{c.desc}</p>
                                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white transition group-hover:gap-3">
                                            Open collection <span>→</span>
                                        </span>
                                    </div>
                                </Link>
                            )
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative px-6 py-24 sm:px-8">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-sakura/15 via-twilight/15 to-sky/15 p-10 text-center backdrop-blur sm:p-16">
                    <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 animate-blob rounded-full bg-sakura/30 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 animate-blob rounded-full bg-sky/30 blur-3xl [animation-delay:-5s]" />

                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                        join the community
                    </span>
                    <h2 className="mt-3 font-display text-4xl leading-tight sm:text-6xl">
                        <span className="gradient-text">Your next obsession</span>
                        <br />
                        is one click away.
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-white/70">
                        Free to join. No ads. Just anime, vibes, and a community that takes the genre as seriously as you do.
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/signup"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-white px-6 py-3 text-sm font-bold text-black shadow-xl transition hover:scale-105 active:scale-95"
                        >
                            <span>Join Hanabi</span>
                            <span className="transition group-hover:translate-x-1">→</span>
                        </Link>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                        >
                            Our story
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
