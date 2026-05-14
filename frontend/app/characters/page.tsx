import { getTopCharacters, cardColor } from "@/lib/jikan";

export const revalidate = 3600;

function shortAbout(text: string | null) {
    if (!text) return "A character who needs no introduction.";
    const clean = text.replace(/\s+/g, " ").trim();
    if (clean.length <= 140) return clean;
    return clean.slice(0, 137).trimEnd() + "…";
}

function compactFavorites(n: number) {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return String(n);
}

export default async function Characters() {
    const characters = await getTopCharacters(16);

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 animate-blob bg-sky/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 animate-blob bg-sakura/30 blur-3xl [animation-delay:-8s]" />

                <div className="relative mx-auto max-w-7xl text-center">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        the cast
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-7xl [animation-delay:0.1s]">
                        <span className="gradient-text">Most-loved characters</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl animate-rise text-white/70 [animation-delay:0.2s]">
                        the fan-favorite heroes, rivals, and weirdos — ranked by MyAnimeList community love.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {characters.map((c, i) => {
                        const color = cardColor(i);
                        const colorPair = `${color.from} ${color.to}`;
                        const nickname = c.nicknames[0];
                        return (
                            <article
                                key={c.mal_id}
                                className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/20"
                                style={{ animationDelay: `${i * 70}ms` }}
                            >
                                <div
                                    aria-hidden
                                    className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${colorPair} opacity-0 blur-3xl transition duration-500 group-hover:opacity-60`}
                                />

                                <div className="relative">
                                    <div className="relative mx-auto mb-4 h-32 w-32">
                                        <div className={`absolute inset-0 -z-10 animate-spin-slow rounded-full bg-gradient-to-tr ${colorPair} opacity-70 blur-md`} />
                                        <div className={`rounded-full bg-gradient-to-tr ${colorPair} p-[3px] transition duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                            {/* Remote MAL image — using plain img to avoid per-character image config */}
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={c.images.jpg.image_url}
                                                alt={c.name}
                                                className="h-[122px] w-[122px] rounded-full bg-background object-cover"
                                                loading="lazy"
                                            />
                                        </div>
                                        <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-1 rounded-full border-2 border-background bg-gradient-to-r from-sakura to-twilight px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                                            #{i + 1}
                                        </span>
                                    </div>

                                    <div className="text-center">
                                        <h3 className="text-2xl font-bold text-white line-clamp-1">{c.name}</h3>
                                        <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                                            ♥ <span className="text-white/80">{compactFavorites(c.favorites)} fans</span>
                                        </p>
                                    </div>

                                    <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-40 group-hover:opacity-100">
                                        <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                                            <p className="text-xs italic leading-relaxed text-white/80">
                                                {shortAbout(c.about)}
                                            </p>
                                            {nickname && (
                                                <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-sakura">
                                                    &ldquo;{nickname}&rdquo;
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-center gap-2 transition group-hover:opacity-0">
                                        <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                                            hover for vibes ↓
                                        </span>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </section>
        </main>
    );
}
