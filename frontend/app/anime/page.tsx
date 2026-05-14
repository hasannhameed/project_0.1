import Image from "next/image";
import Link from "next/link";
import AnimeSearch from "@/components/AnimeSearch";
import {
    getAnimeByGenre,
    searchAnime,
    cardColor,
    GENRE_FILTERS,
    type GenreSlug,
} from "@/lib/jikan";

export const revalidate = 3600;

function isGenreSlug(v: string | undefined): v is GenreSlug {
    return !!v && GENRE_FILTERS.some((f) => f.slug === v);
}

export default async function Anime({
    searchParams,
}: {
    searchParams: Promise<{ genre?: string; q?: string }>;
}) {
    const { genre, q } = await searchParams;
    const query = q?.trim() ?? "";
    const activeSlug: GenreSlug = isGenreSlug(genre) ? genre : "all";
    const activeLabel =
        GENRE_FILTERS.find((f) => f.slug === activeSlug)?.label ?? "All";

    const anime = query
        ? await searchAnime(query, 24)
        : await getAnimeByGenre(activeSlug, 24);

    const heading = query
        ? `Results for “${query}”`
        : activeSlug === "all"
            ? "Top anime"
            : `Top ${activeLabel}`;

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-twilight/30 blur-3xl" />
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                catalog
                            </span>
                            <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-7xl [animation-delay:0.1s]">
                                <span className="gradient-text">{heading}</span>
                            </h1>
                            <p className="mt-3 max-w-xl animate-rise text-white/70 [animation-delay:0.2s]">
                                {query
                                    ? `Showing search results from MyAnimeList.`
                                    : `pulled live from MyAnimeList — the top-rated titles, refreshed hourly.`}
                            </p>
                        </div>

                        <AnimeSearch initialQuery={query} />
                    </div>

                    <div className="mt-8 flex animate-rise flex-wrap gap-2 [animation-delay:0.4s]">
                        {query ? (
                            <Link
                                href="/anime"
                                scroll={false}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:scale-105 hover:border-sakura/40 hover:text-white"
                            >
                                ← Clear search
                            </Link>
                        ) : (
                            GENRE_FILTERS.map((f) => {
                                const active = f.slug === activeSlug;
                                const href = f.slug === "all" ? "/anime" : `/anime?genre=${f.slug}`;
                                return (
                                    <Link
                                        key={f.slug}
                                        href={href}
                                        scroll={false}
                                        className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition hover:scale-105 ${active
                                            ? "border-transparent bg-gradient-to-r from-sakura via-twilight to-sky text-white shadow-lg shadow-sakura/30"
                                            : "border-white/10 bg-white/5 text-white/70 hover:border-sakura/40 hover:bg-white/10 hover:text-white"
                                            }`}
                                    >
                                        {f.label}
                                    </Link>
                                );
                            })
                        )}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                {anime.length === 0 && (
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center backdrop-blur">
                        <p className="font-display text-2xl text-white">
                            No anime found{query ? ` for “${query}”` : ""}.
                        </p>
                        <p className="mt-2 text-sm text-white/60">
                            Try a different keyword or browse the catalog.
                        </p>
                        <Link
                            href="/anime"
                            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105"
                        >
                            Back to top anime →
                        </Link>
                    </div>
                )}
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                    {anime.map((a, i) => {
                        const c = cardColor(i);
                        const rank = `#${i + 1}`;
                        const genres = a.genres.slice(0, 2).map((g) => g.name);
                        return (
                            <Link
                                key={a.mal_id}
                                href={`/anime/${a.mal_id}`}
                                className="group relative block animate-rise overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/25"
                                style={{ animationDelay: `${i * 60}ms` }}
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={a.images.jpg.large_image_url}
                                        alt={a.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                        className="object-cover transition duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-br ${c.from} ${c.to} opacity-50 mix-blend-overlay transition duration-700 group-hover:scale-110`} />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                                    <span className="pointer-events-none absolute right-5 top-5 font-display text-4xl leading-none text-white/10 drop-shadow-md transition duration-700 group-hover:text-white/20">
                                        {rank}
                                    </span>

                                    {a.score !== null && (
                                        <span className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur border border-white/10">
                                            ★ {a.score.toFixed(1)}
                                        </span>
                                    )}
                                    <span className="absolute right-4 bottom-4 inline-flex items-center gap-1 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur opacity-0 transition group-hover:opacity-100 border border-white/10">
                                        ▶ watch now
                                    </span>

                                    <div className="absolute inset-x-0 bottom-0 p-5 z-10">
                                        <div className="mb-2 flex flex-wrap gap-1">
                                            {genres.map((g) => (
                                                <span
                                                    key={g}
                                                    className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur border border-white/10"
                                                >
                                                    {g}
                                                </span>
                                            ))}
                                        </div>
                                        <h3 className="text-xl font-bold text-white drop-shadow-md transition group-hover:text-sakura-soft line-clamp-2">
                                            {a.title}
                                        </h3>
                                        <p className="mt-0.5 flex items-center gap-2 text-xs text-white/90 drop-shadow-md">
                                            {a.year && <span>{a.year}</span>}
                                            {a.year && a.episodes && <span className="h-1 w-1 rounded-full bg-white/50" />}
                                            {a.episodes && <span>{a.episodes} eps</span>}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <button className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:scale-105 hover:border-sakura/40 hover:bg-white/10">
                        <span className="relative z-10">Load more</span>
                    </button>
                </div>
            </section>
        </main>
    );
}
