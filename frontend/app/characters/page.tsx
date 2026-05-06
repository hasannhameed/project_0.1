const CHARACTERS = [
    { name: "Akira", jp: "アキラ", role: "Protagonist", show: "Neon Sakura", color: "from-sakura to-twilight", quote: "I run because the city tells me to.", trait: "Reckless · 無謀" },
    { name: "Yuki", jp: "ユキ", role: "Mage", show: "Yuki No Senshi", color: "from-sky to-twilight", quote: "Snow remembers what people forget.", trait: "Quiet · 静か" },
    { name: "Ren", jp: "レン", role: "Rival", show: "Lantern Drift", color: "from-lantern to-sunset", quote: "If you're going to win, do it loud.", trait: "Brash · 大胆" },
    { name: "Hana", jp: "ハナ", role: "Sidekick", show: "Hanabi Diary", color: "from-peach to-sakura", quote: "Summer ends. We don't.", trait: "Sunny · 明るい" },
    { name: "Sora", jp: "ソラ", role: "Mentor", show: "Tokyo After Dark", color: "from-twilight to-sky", quote: "The night isn't dark. It's data.", trait: "Cryptic · 謎めいた" },
    { name: "Kaito", jp: "カイト", role: "Antagonist", show: "Kitsune Lines", color: "from-sunset to-lantern", quote: "Everyone wears a mask. Mine just fits.", trait: "Cunning · 狡猾" },
    { name: "Mei", jp: "メイ", role: "Healer", show: "Goldfish Dream", color: "from-sakura-soft to-sakura", quote: "I'd rather mend than break.", trait: "Gentle · 優しい" },
    { name: "Jiro", jp: "ジロウ", role: "Comic relief", show: "Cassette Heart", color: "from-sunset to-sakura", quote: "I have a plan. It's bad. Let's go.", trait: "Loud · 騒がしい" },
];

export default function Characters() {
    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 animate-blob bg-sky/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/2 -right-32 h-96 w-96 animate-blob bg-sakura/30 blur-3xl [animation-delay:-8s]" />

                <div className="relative mx-auto max-w-7xl text-center">
                    <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        登場人物 · the cast
                    </span>
                    <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-7xl [animation-delay:0.1s]">
                        <span className="gradient-text">Meet the cast</span>
                    </h1>
                    <p className="mx-auto mt-3 max-w-2xl animate-rise text-white/70 [animation-delay:0.2s]">
                        heroes, rivals, ramen-stand philosophers. hover for the receipts.
                    </p>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {CHARACTERS.map((c, i) => (
                        <article
                            key={c.name}
                            className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur transition hover:-translate-y-2 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/20"
                            style={{ animationDelay: `${i * 70}ms` }}
                        >
                            <div
                                aria-hidden
                                className={`pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gradient-to-br ${c.color} opacity-0 blur-3xl transition duration-500 group-hover:opacity-60`}
                            />

                            <div className="relative">
                                <div className="relative mx-auto mb-4 h-32 w-32">
                                    <div className={`absolute inset-0 -z-10 animate-spin-slow rounded-full bg-gradient-to-tr ${c.color} opacity-70 blur-md`} />
                                    <div className={`rounded-full bg-gradient-to-tr ${c.color} p-[3px] transition duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                                        <img
                                            src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${encodeURIComponent(c.name)}&radius=50`}
                                            alt={c.name}
                                            className="h-[122px] w-[122px] rounded-full bg-background"
                                            loading="lazy"
                                        />
                                    </div>
                                    <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-1 rounded-full border-2 border-background bg-gradient-to-r from-sakura to-twilight px-2 py-0.5 text-[10px] font-bold text-white shadow-lg">
                                        {c.role}
                                    </span>
                                </div>

                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-white">{c.name}</h3>
                                    <p className="font-display text-sm text-sakura-soft">{c.jp}</p>
                                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                                        from <span className="text-white/80">{c.show}</span>
                                    </p>
                                </div>

                                <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                                    <div className="rounded-2xl border border-white/10 bg-black/30 p-3">
                                        <p className="text-xs italic leading-relaxed text-white/80">
                                            “{c.quote}”
                                        </p>
                                        <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-sakura">
                                            {c.trait}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 flex justify-center gap-2 transition group-hover:opacity-0">
                                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white/70">
                                        hover for vibes ↓
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
        </main>
    );
}
