"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/components/AuthProvider";
import ProfileEditor from "@/components/ProfileEditor";
import MyComments from "@/components/MyComments";

const QUICK_LINKS = [
    {
        title: "Anime Catalog",
        desc: "Top titles refreshed hourly from MyAnimeList.",
        href: "/anime",
        accent: "text-sakura",
        gradient: "from-sakura to-twilight",
    },
    {
        title: "Products",
        desc: "Curated anime gear — figures, manga, plushies, apparel.",
        href: "/products",
        accent: "text-sky",
        gradient: "from-sky to-twilight",
    },
    {
        title: "What's Coming",
        desc: "Reviews, watch parties, watchlists, local events.",
        href: "/join",
        accent: "text-sunset",
        gradient: "from-sunset to-lantern",
    },
];

export default function Dashboard() {
    const { user, loading, logout } = useAuth();
    const router = useRouter();

    // Send unauthenticated visitors to the login page
    useEffect(() => {
        if (!loading && !user) router.replace("/login");
    }, [loading, user, router]);

    const handleLogout = async () => {
        await logout();
        router.replace("/");
        router.refresh();
    };

    if (loading || !user) {
        return (
            <main>
                <section className="relative overflow-hidden px-6 py-24 sm:px-8">
                    <div className="mx-auto max-w-4xl">
                        <div className="h-3 w-24 animate-pulse rounded bg-white/10" />
                        <div className="mt-3 h-12 w-3/4 animate-pulse rounded bg-white/10" />
                        <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-white/5" />
                    </div>
                </section>
            </main>
        );
    }

    const firstName = user.name.split(" ")[0];
    const memberSince = new Date(user.createdAt).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
    });

    return (
        <main>
            {/* HERO */}
            <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[28rem] w-[28rem] animate-blob rounded-full bg-sakura/25 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/3 -right-32 h-[28rem] w-[28rem] animate-blob rounded-full bg-twilight/30 blur-3xl [animation-delay:-6s]" />

                <div className="relative mx-auto max-w-6xl">
                    <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-sakura/30 bg-sakura/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-sakura backdrop-blur">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura" />
                        </span>
                        Dashboard
                    </span>
                    <h1 className="mt-4 animate-rise font-display text-5xl leading-[0.95] sm:text-7xl [animation-delay:0.1s]">
                        Welcome back, <span className="gradient-text">{firstName}.</span>
                    </h1>
                    <p className="mt-4 max-w-xl animate-rise text-base text-white/70 [animation-delay:0.2s]">
                        Member since {memberSince}. Pick up where you left off below — more dashboard features land as we ship them.
                    </p>
                </div>
            </section>

            {/* PROFILE EDITOR + QUICK LINKS */}
            <section className="relative mx-auto max-w-6xl px-6 pb-12 sm:px-8">
                <div className="grid gap-5 lg:grid-cols-[1.2fr_1fr]">
                    {/* Profile editor (left) */}
                    <ProfileEditor user={user} />

                    {/* Quick links + sign out (right) */}
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                            {QUICK_LINKS.map((q, i) => (
                                <Link
                                    key={q.title}
                                    href={q.href}
                                    className="group relative animate-rise overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur transition hover:-translate-y-1.5 hover:border-sakura/40 hover:shadow-2xl hover:shadow-sakura/15"
                                    style={{ animationDelay: `${i * 70}ms` }}
                                >
                                    <div
                                        aria-hidden
                                        className={`pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-gradient-to-br ${q.gradient} opacity-0 blur-3xl transition duration-500 group-hover:opacity-60`}
                                    />
                                    <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${q.accent}`}>
                                        Open
                                    </p>
                                    <h3 className="mt-2 font-display text-xl text-white">{q.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-white/60">{q.desc}</p>
                                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-white/80 transition group-hover:gap-2">
                                        Go <span>→</span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-xs font-bold uppercase tracking-wider text-red-200 transition hover:border-red-400/40 hover:bg-red-500/20"
                        >
                            Sign out
                        </button>
                    </div>
                </div>
            </section>

            {/* MY COMMENTS */}
            <section className="relative mx-auto max-w-6xl px-6 pb-12 sm:px-8">
                <MyComments />
            </section>

            {/* Placeholder feature strip */}
            <section className="mx-auto max-w-6xl px-6 pb-24 sm:px-8">
                <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-10">
                    <div aria-hidden className="pointer-events-none absolute -top-16 -left-16 h-48 w-48 animate-blob bg-sky/20 blur-3xl" />
                    <div aria-hidden className="pointer-events-none absolute -bottom-16 -right-16 h-48 w-48 animate-blob bg-sakura/20 blur-3xl [animation-delay:-5s]" />

                    <div className="relative grid gap-6 sm:grid-cols-3">
                        {[
                            { label: "Watchlist", value: "—", note: "Coming soon" },
                            { label: "Reviews", value: "—", note: "Coming soon" },
                            { label: "Followed series", value: "—", note: "Coming soon" },
                        ].map((stat) => (
                            <div key={stat.label}>
                                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-sakura-soft">
                                    {stat.label}
                                </p>
                                <p className="mt-2 font-display text-3xl text-white">{stat.value}</p>
                                <p className="mt-1 text-xs text-white/40">{stat.note}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
