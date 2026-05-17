import Image from "next/image";
import Link from "next/link";
import AnimeSearch from "@/components/AnimeSearch";
import LikeButton from "@/components/LikeButton";
import {
    getAnimeByGenre,
    searchAnime,
    cardColor,
    GENRE_FILTERS,
    LIST_TYPES,
    isListSlug,
    type GenreSlug,
    type JikanAnime,
    type ListSlug,
} from "@/lib/jikan";

export const revalidate = 3600;

const PAGE_SIZE = 24;
const MAX_PAGES = 6; // cap so a malicious ?page=999 can't fan out forever

function isGenreSlug(v: string | undefined): v is GenreSlug {
    return !!v && GENRE_FILTERS.some((f) => f.slug === v);
}

function parsePage(v: string | undefined): number {
    const n = Number(v);
    if (!Number.isFinite(n) || n < 1) return 1;
    return Math.min(Math.floor(n), MAX_PAGES);
}

export default async function Anime({
    searchParams,
}: {
    searchParams: Promise<{ genre?: string; q?: string; page?: string; list?: string }>;
}) {
    const { genre, q, page, list } = await searchParams;
    const query = q?.trim() ?? "";
    const activeList: ListSlug | null = isListSlug(list) ? list : null;
    const activeSlug: GenreSlug = isGenreSlug(genre) ? genre : "all";
    const activeLabel =
        GENRE_FILTERS.find((f) => f.slug === activeSlug)?.label ?? "All";
    const maxPage = parsePage(page);

    // Priority: search > list category > genre filter
    const pageFetches = Array.from({ length: maxPage }, (_, i) => {
        const p = i + 1;
        if (query) return searchAnime(query, PAGE_SIZE, p);
        if (activeList) return LIST_TYPES[activeList].fetch(PAGE_SIZE, p);
        return getAnimeByGenre(activeSlug, PAGE_SIZE, p);
    });
    const pageResults = await Promise.all(pageFetches);
    const seen = new Set<number>();
    const anime: JikanAnime[] = [];
    for (const list of pageResults) {
        for (const a of list) {
            if (!seen.has(a.mal_id)) {
                seen.add(a.mal_id);
                anime.push(a);
            }
        }
    }

    // If the last page came back full, we can probably load more
    const lastPage = pageResults[pageResults.length - 1] ?? [];
    const canLoadMore = lastPage.length >= PAGE_SIZE && maxPage < MAX_PAGES;

    const heading = query
        ? `Results for “${query}”`
        : activeList
            ? LIST_TYPES[activeList].label
            : activeSlug === "all"
                ? "Top anime"
                : `Top ${activeLabel}`;

    const subheading = query
        ? `Showing search results from MyAnimeList.`
        : activeList
            ? `${LIST_TYPES[activeList].eyebrow} — refreshed hourly.`
            : `pulled live from MyAnimeList — refreshed hourly.`;

    // Build the "Load more" URL preserving the active scope
    const nextParams = new URLSearchParams();
    if (query) nextParams.set("q", query);
    else if (activeList) nextParams.set("list", activeList);
    else if (activeSlug !== "all") nextParams.set("genre", activeSlug);
    nextParams.set("page", String(maxPage + 1));
    const loadMoreHref = `/anime?${nextParams.toString()}`;

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 animate-blob bg-twilight/30 blur-3xl" />
                <div className="mx-auto max-w-7xl">
                    <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                        <div>
                            <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                catalog
                            </span>
                            <h1 className="mt-3 animate-rise font-display text-4xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                                <span className="gradient-text">{heading}</span>
                            </h1>
                            <p className="mt-3 max-w-xl animate-rise text-sm text-white/70 [animation-delay:0.2s]">
                                {subheading}
                            </p>
                        </div>

                        <AnimeSearch initialQuery={query} />
                    </div>

                    <div className="mt-6 flex animate-rise flex-wrap gap-2 [animation-delay:0.4s]">
                        {query || activeList ? (
                            <Link
                                href="/anime"
                                scroll={false}
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white/80 transition hover:scale-105 hover:border-sakura/40 hover:text-white"
                            >
                                ← {query ? "Clear search" : "Back to all"}
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

                {/* Smaller, denser grid — up to 6 per row on wide screens */}
                <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                    {anime.map((a, i) => {
                        const c = cardColor(i);
                        const genres = a.genres.slice(0, 1).map((g) => g.name);
                        return (
                            <article
                                key={a.mal_id}
                                className="group relative animate-rise overflow-hidden rounded-2xl border border-white/10 transition hover:-translate-y-1 hover:border-sakura/40 hover:shadow-xl hover:shadow-sakura/20"
                                style={{ animationDelay: `${(i % PAGE_SIZE) * 30}ms` }}
                            >
                                <Link href={`/anime/${a.mal_id}`} className="block">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={a.images.jpg.large_image_url}
                                            alt={a.title}
                                            fill
                                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                                            className="object-cover transition duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${c.from} ${c.to} opacity-40 mix-blend-overlay`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                                        {a.score !== null && (
                                            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur border border-white/10">
                                                ★ {a.score.toFixed(1)}
                                            </span>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-3 z-10">
                                            {genres[0] && (
                                                <span className="inline-block rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white backdrop-blur border border-white/10">
                                                    {genres[0]}
                                                </span>
                                            )}
                                            <h3 className="mt-1.5 text-sm font-bold text-white drop-shadow-md transition group-hover:text-sakura-soft line-clamp-2">
                                                {a.title}
                                            </h3>
                                            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/70 drop-shadow-md">
                                                {a.year && <span>{a.year}</span>}
                                                {a.year && a.episodes && <span className="h-0.5 w-0.5 rounded-full bg-white/50" />}
                                                {a.episodes && <span>{a.episodes} eps</span>}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                {/* Like button sits over the card but outside the Link */}
                                <div className="absolute right-2 top-2 z-20">
                                    <LikeButton animeMalId={a.mal_id} size="sm" />
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* Load more (URL-based, server-rendered) */}
                {anime.length > 0 && (
                    <div className="mt-10 text-center">
                        {canLoadMore ? (
                            <Link
                                href={loadMoreHref}
                                scroll={false}
                                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white backdrop-blur transition hover:scale-105 hover:border-sakura/40 hover:bg-white/10"
                            >
                                <span className="relative z-10">Load more</span>
                                <span className="relative z-10 transition group-hover:translate-y-0.5">↓</span>
                            </Link>
                        ) : (
                            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                                You&apos;ve reached the end. Try another genre or search.
                            </p>
                        )}
                    </div>
                )}
            </section>
        </main>
    );
}
