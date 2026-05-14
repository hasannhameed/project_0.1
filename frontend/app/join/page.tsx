import Link from "next/link";

const FEATURES = [
    {
        title: "Community Reviews",
        eyebrow: "Discuss",
        body: "Drop your hot takes, rate every episode, and argue about the ending in threads that actually go somewhere.",
        gradient: "from-sakura to-twilight",
        accent: "text-sakura",
        icon: (
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        ),
    },
    {
        title: "Collab Spaces",
        eyebrow: "Create together",
        body: "Team up on fan art, AMVs, zines, and translation projects. Find collaborators by style, skill, or favorite series.",
        gradient: "from-sky to-twilight",
        accent: "text-sky",
        icon: (
            <>
                <circle cx="9" cy="7" r="4" />
                <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            </>
        ),
    },
    {
        title: "Find Local Events",
        eyebrow: "Anywhere",
        body: "Conventions, screenings, cosplay meetups, and watch parties happening near you — all on one map, updated weekly.",
        gradient: "from-sunset to-lantern",
        accent: "text-sunset",
        icon: (
            <>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
            </>
        ),
    },
    {
        title: "Watch Parties",
        eyebrow: "Sync up",
        body: "Synced viewing with friends across the world. Pause, react, scream at the screen — together, in real time.",
        gradient: "from-twilight to-sky",
        accent: "text-twilight",
        icon: (
            <>
                <polygon points="23 7 16 12 23 17 23 7" />
                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
            </>
        ),
    },
    {
        title: "Personal Watchlists",
        eyebrow: "Track it all",
        body: "Mark what you're watching, completed, dropped, or planning. Share lists with friends and discover what they love.",
        gradient: "from-peach to-sakura",
        accent: "text-peach",
        icon: (
            <>
                <polyline points="20 6 9 17 4 12" />
            </>
        ),
    },
    {
        title: "Drop-Day Alerts",
        eyebrow: "Never miss",
        body: "Get notified the moment a new episode drops on Crunchyroll, Netflix, or wherever it's streaming. No more checking forums.",
        gradient: "from-sakura to-sunset",
        accent: "text-lantern",
        icon: (
            <>
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </>
        ),
    },
    {
        title: "Character Polls",
        eyebrow: "Pick favorites",
        body: "Weekly polls, character of the season, MVP rankings — and the leaderboards aren't gameable like the other sites.",
        gradient: "from-sakura-soft to-sky",
        accent: "text-sakura-soft",
        icon: (
            <>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </>
        ),
    },
    {
        title: "Creator Program",
        eyebrow: "Get featured",
        body: "Submit fan zines, art, AMVs, or essays. The best get front-page slots and a slice of the platform's editorial budget.",
        gradient: "from-twilight to-sakura",
        accent: "text-sakura",
        icon: (
            <>
                <path d="M12 19l7-7 3 3-7 7-3-3z" />
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                <path d="M2 2l7.586 7.586" />
                <circle cx="11" cy="11" r="2" />
            </>
        ),
    },
];

const ROADMAP = [
    {
        phase: "Phase 1",
        date: "Q3 2026",
        title: "Reviews + Watchlists",
        body: "Sign up, rate, list. The basics — done properly.",
        state: "next",
    },
    {
        phase: "Phase 2",
        date: "Q4 2026",
        title: "Watch Parties + Drop Alerts",
        body: "Real-time sync rooms and push notifications for new episodes.",
        state: "soon",
    },
    {
        phase: "Phase 3",
        date: "Q1 2027",
        title: "Events Map + Collabs",
        body: "Local meetups, conventions, and collab spaces for creators.",
        state: "soon",
    },
];

export default function Join() {
    return (
        <main>
            {/* HERO */}
            <section className="relative overflow-hidden px-6 py-24 sm:px-8 sm:py-32">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 h-[28rem] w-[28rem] animate-blob rounded-full bg-sakura/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] animate-blob rounded-full bg-twilight/30 blur-3xl [animation-delay:-6s]" />
                <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[60%] -translate-x-1/2 rounded-full bg-sky/20 blur-3xl" />

                <div className="relative mx-auto max-w-4xl text-center">
                    <span className="inline-flex animate-rise items-center gap-2 rounded-full border border-sakura/30 bg-sakura/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.3em] text-sakura backdrop-blur">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura" />
                        </span>
                        Coming Soon
                    </span>

                    <h1 className="mt-6 animate-rise font-display text-5xl leading-[0.95] sm:text-7xl lg:text-8xl [animation-delay:0.1s]">
                        Something big is <br />
                        <span className="gradient-text">on the way.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl animate-rise text-base text-white/70 sm:text-lg [animation-delay:0.2s]">
                        Hanabi is becoming more than a catalog. Sign up early to get
                        access to community reviews, watch parties, local anime events,
                        and a creator program — the moment they launch.
                    </p>

                    {/* Notify-me form */}
                    <form className="mx-auto mt-10 flex w-full max-w-md animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur transition focus-within:border-sakura/50 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(255,177,209,0.15)] [animation-delay:0.3s]">
                        <input
                            type="email"
                            required
                            placeholder="your@email.com"
                            className="w-full bg-transparent px-4 py-2 text-sm text-white placeholder:text-white/40 outline-none"
                        />
                        <button
                            type="submit"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105 active:scale-95"
                        >
                            <span className="relative z-10">Notify me</span>
                            <span className="shimmer-overlay" />
                        </button>
                    </form>
                    <p className="mt-3 animate-rise text-[10px] uppercase tracking-[0.2em] text-white/30 [animation-delay:0.35s]">
                        No spam. One email when we go live.
                    </p>
                </div>
            </section>

            {/* FEATURES */}
            <section className="relative mx-auto max-w-7xl px-6 pb-24 sm:px-8">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        What you&apos;ll unlock
                    </span>
                    <h2 className="mt-2 font-display text-4xl sm:text-5xl">
                        <span className="gradient-text">Built for fans, not algorithms</span>
                    </h2>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {FEATURES.map((f, i) => (
                        <article
                            key={f.title}
                            className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur transition hover:-translate-y-1.5 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/15"
                            style={{ animationDelay: `${i * 60}ms` }}
                        >
                            <div
                                aria-hidden
                                className={`pointer-events-none absolute -top-16 -right-16 h-40 w-40 rounded-full bg-gradient-to-br ${f.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-50`}
                            />
                            <div className="relative">
                                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.gradient} shadow-lg shadow-black/40`}>
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="h-6 w-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {f.icon}
                                    </svg>
                                </div>
                                <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${f.accent}`}>
                                    {f.eyebrow}
                                </p>
                                <h3 className="mt-1 font-display text-xl text-white">{f.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-white/60">{f.body}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* ROADMAP */}
            <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8">
                <div className="text-center">
                    <span className="text-xs font-bold uppercase tracking-[0.3em] text-sunset">
                        Roadmap
                    </span>
                    <h2 className="mt-2 font-display text-4xl sm:text-5xl">
                        <span className="gradient-text">When it&apos;s landing</span>
                    </h2>
                </div>

                <div className="relative mt-12 grid gap-5 md:grid-cols-3">
                    {ROADMAP.map((step, i) => (
                        <div
                            key={step.phase}
                            className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-6 backdrop-blur transition hover:-translate-y-1 hover:border-sakura/40"
                            style={{ animationDelay: `${i * 80}ms` }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="rounded-full bg-gradient-to-r from-sakura to-twilight px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/30">
                                    {step.phase}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-white/40">
                                    {step.date}
                                </span>
                            </div>
                            <h3 className="mt-4 font-display text-2xl text-white">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-white/60">{step.body}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="mx-auto max-w-4xl px-6 pb-24 sm:px-8">
                <div className="glass relative overflow-hidden rounded-3xl p-8 text-center sm:p-12">
                    <div aria-hidden className="pointer-events-none absolute -top-20 -left-20 h-60 w-60 animate-blob rounded-full bg-sakura/25 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 animate-blob rounded-full bg-sky/25 blur-3xl [animation-delay:-5s]" />

                    <p className="font-display text-2xl text-white sm:text-3xl">
                        In the meantime — explore the catalog.
                    </p>
                    <p className="mx-auto mt-3 max-w-md text-sm text-white/60">
                        Over 480 hand-picked titles, live trailers, and full detail pages
                        are already live. Dive in while we cook the rest.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/anime"
                            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105"
                        >
                            <span>Browse anime</span>
                            <span className="transition group-hover:translate-x-1">→</span>
                        </Link>
                        <Link
                            href="/home"
                            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-bold text-white backdrop-blur transition hover:border-white/40 hover:bg-white/10"
                        >
                            Back to home
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}
