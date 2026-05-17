import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import TrailerLauncher from "@/components/TrailerLauncher";
import Comments from "@/components/Comments";
import LikeButton from "@/components/LikeButton";
import {
    getAnimeByMalId,
    stripHtml,
    formatStatus,
    relationLabel,
} from "@/lib/anilist";

export const revalidate = 3600;

export default async function AnimeDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const malId = Number(id);
    if (!Number.isFinite(malId)) notFound();

    const anime = await getAnimeByMalId(malId);
    if (!anime) notFound();

    const title = anime.title.english || anime.title.romaji;
    const synopsis = stripHtml(anime.description);
    const studios = anime.studios.nodes.map((s) => s.name).join(", ");
    const score = anime.averageScore ?? anime.meanScore;
    const trailerVideoId =
        anime.trailer?.site === "youtube" && anime.trailer.id
            ? anime.trailer.id
            : null;

    const relatedAnime = anime.relations.edges.filter(
        (e) => e.node.type === "ANIME" && e.node.idMal,
    );
    const recommendations = anime.recommendations.nodes
        .map((n) => n.mediaRecommendation)
        .filter((r): r is NonNullable<typeof r> => r !== null && r.idMal !== null);

    const meta = [
        anime.format,
        anime.episodes ? `${anime.episodes} eps` : null,
        anime.duration ? `${anime.duration} min` : null,
        anime.seasonYear ? `${anime.season ? anime.season[0] + anime.season.slice(1).toLowerCase() + " " : ""}${anime.seasonYear}` : null,
        formatStatus(anime.status),
    ].filter(Boolean);

    return (
        <main>
            {/* Banner hero */}
            <section className="relative">
                <div className="relative h-[55vh] min-h-[420px] w-full overflow-hidden">
                    {anime.bannerImage ? (
                        <Image
                            src={anime.bannerImage}
                            alt=""
                            fill
                            sizes="100vw"
                            className="object-cover"
                            priority
                        />
                    ) : (
                        <div
                            className="absolute inset-0"
                            style={{
                                background: `linear-gradient(135deg, ${anime.coverImage.color ?? "#FFB1D1"}40, #08102180)`,
                            }}
                        />
                    )}

                    {/* Readability overlays — keep the title block legible */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/40" />
                </div>

                <div className="relative mx-auto -mt-72 max-w-7xl px-6 sm:-mt-80 sm:px-8">
                    <div className="grid gap-8 sm:gap-10 md:grid-cols-[260px_1fr] md:gap-12">
                        {/* Cover */}
                        <div className="relative mx-auto w-56 shrink-0 sm:w-64 md:mx-0">
                            <div
                                className="relative aspect-[2/3] overflow-hidden rounded-3xl border border-white/10 shadow-2xl"
                                style={{ boxShadow: `0 25px 80px -20px ${anime.coverImage.color ?? "#FFB1D1"}60` }}
                            >
                                <Image
                                    src={anime.coverImage.extraLarge}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 224px, 260px"
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            {anime.nextAiringEpisode && (
                                <div className="mt-4 rounded-2xl border border-sakura/30 bg-sakura/10 px-4 py-3 text-center backdrop-blur">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sakura">
                                        Next episode
                                    </p>
                                    <p className="mt-1 text-sm font-semibold text-white">
                                        Ep {anime.nextAiringEpisode.episode} in{" "}
                                        {formatCountdown(anime.nextAiringEpisode.timeUntilAiring)}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Title block */}
                        <div className="flex flex-col">
                            <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                Anime detail
                            </span>
                            <h1 className="mt-2 animate-rise font-display text-4xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                                <span className="gradient-text">{title}</span>
                            </h1>
                            {anime.title.english && anime.title.english !== anime.title.romaji && (
                                <p className="mt-1 animate-rise text-sm text-white/50 [animation-delay:0.15s]">
                                    {anime.title.romaji}
                                </p>
                            )}

                            <div className="mt-4 flex animate-rise flex-wrap items-center gap-2 [animation-delay:0.2s]">
                                {score !== null && (
                                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-sakura to-twilight px-3 py-1 text-xs font-bold text-white shadow-lg shadow-sakura/30">
                                        ★ {(score / 10).toFixed(1)}
                                    </span>
                                )}
                                {meta.map((m) => (
                                    <span
                                        key={String(m)}
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur"
                                    >
                                        {m}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-4 flex animate-rise flex-wrap gap-1.5 [animation-delay:0.25s]">
                                {anime.genres.map((g) => (
                                    <span
                                        key={g}
                                        className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-sakura-soft"
                                    >
                                        {g}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-6 flex animate-rise flex-wrap items-center gap-3 [animation-delay:0.3s]">
                                {trailerVideoId && (
                                    <TrailerLauncher videoId={trailerVideoId} title={title} />
                                )}
                                <LikeButton animeMalId={malId} size="lg" />
                                <Link
                                    href="/anime"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:border-sakura/40 hover:bg-white/10"
                                >
                                    ← Back to catalog
                                </Link>
                                {anime.externalLinks.slice(0, 4).map((link) => (
                                    <a
                                        key={link.url}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70 backdrop-blur transition hover:border-white/30 hover:bg-white/10 hover:text-white"
                                    >
                                        {link.site}
                                    </a>
                                ))}
                            </div>

                            {studios && (
                                <p className="mt-6 text-sm text-white/50">
                                    Studio: <span className="text-white/80">{studios}</span>
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Synopsis */}
            {synopsis && (
                <section className="mx-auto max-w-5xl px-6 py-16 sm:px-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        Synopsis
                    </h2>
                    <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-white/70 sm:text-lg">
                        {synopsis}
                    </p>
                </section>
            )}

            {/* Characters */}
            {anime.characters.edges.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                Characters
                            </h2>
                            <p className="mt-1 font-display text-2xl text-white sm:text-3xl">
                                Who&apos;s in it
                            </p>
                        </div>
                        <Link href="/characters" className="text-xs font-semibold text-white/60 hover:text-white">
                            See all top characters →
                        </Link>
                    </div>

                    <div className="mt-6 flex gap-4 overflow-x-auto pb-4 [scrollbar-width:thin]">
                        {anime.characters.edges.map((edge) => {
                            const va = edge.voiceActors[0];
                            return (
                                <article
                                    key={edge.node.id}
                                    className="group relative w-56 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur transition hover:-translate-y-1 hover:border-sakura/40"
                                >
                                    {edge.node.image.large && (
                                        <div className="relative aspect-[3/4] overflow-hidden">
                                            <Image
                                                src={edge.node.image.large}
                                                alt={edge.node.name.full}
                                                fill
                                                sizes="224px"
                                                className="object-cover transition duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent" />
                                            <span className="absolute top-3 left-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">
                                                {edge.role.toLowerCase()}
                                            </span>
                                        </div>
                                    )}
                                    <div className="p-3">
                                        <h3 className="font-semibold text-white line-clamp-1">{edge.node.name.full}</h3>
                                        {va && (
                                            <p className="mt-0.5 text-xs text-white/50 line-clamp-1">
                                                VA: {va.name.full}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>
            )}

            {/* Relations */}
            {relatedAnime.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-16 sm:px-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-twilight">
                        Related
                    </h2>
                    <p className="mt-1 font-display text-2xl text-white sm:text-3xl">In the same universe</p>
                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {relatedAnime.map((rel) => (
                            <Link
                                key={rel.node.id}
                                href={`/anime/${rel.node.idMal}`}
                                className="group flex gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-3 backdrop-blur transition hover:-translate-y-1 hover:border-sky/40"
                            >
                                <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg">
                                    <Image
                                        src={rel.node.coverImage.large}
                                        alt={rel.node.title.english ?? rel.node.title.romaji}
                                        fill
                                        sizes="64px"
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky">
                                        {relationLabel(rel.relationType)}
                                    </span>
                                    <h3 className="mt-1 font-semibold text-white line-clamp-2 group-hover:text-sakura-soft">
                                        {rel.node.title.english ?? rel.node.title.romaji}
                                    </h3>
                                    {rel.node.format && (
                                        <p className="mt-0.5 text-xs text-white/40">
                                            {rel.node.format.toLowerCase()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Recommendations */}
            {recommendations.length > 0 && (
                <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                        More like this
                    </h2>
                    <p className="mt-1 font-display text-2xl text-white sm:text-3xl">If you liked it</p>
                    <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {recommendations.map((rec) => (
                            <Link
                                key={rec.id}
                                href={`/anime/${rec.idMal}`}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/20"
                            >
                                <div className="relative aspect-[3/4] overflow-hidden">
                                    <Image
                                        src={rec.coverImage.large}
                                        alt={rec.title.english ?? rec.title.romaji}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                        className="object-cover transition duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                                    {rec.averageScore !== null && (
                                        <span className="absolute top-3 right-3 rounded-full bg-gradient-to-r from-sakura to-twilight px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-sakura/30">
                                            ★ {(rec.averageScore / 10).toFixed(1)}
                                        </span>
                                    )}
                                    <div className="absolute inset-x-0 bottom-0 p-4">
                                        <h3 className="font-semibold text-white line-clamp-2 drop-shadow-md">
                                            {rec.title.english ?? rec.title.romaji}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Public comment thread */}
            <Comments animeMalId={malId} />
        </main>
    );
}

function formatCountdown(seconds: number) {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    if (days > 0) return `${days}d ${hours}h`;
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}
