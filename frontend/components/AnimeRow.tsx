"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import LikeButton from "@/components/LikeButton";
import { cardColor, type JikanAnime } from "@/lib/jikan";

export default function AnimeRow({
    title,
    eyebrow,
    accent = "text-sakura",
    items,
    seeAllHref = "/anime",
}: {
    title: string;
    eyebrow?: string;
    accent?: string;
    items: JikanAnime[];
    seeAllHref?: string;
}) {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateArrows = () => {
        const el = scrollerRef.current;
        if (!el) return;
        setCanLeft(el.scrollLeft > 8);
        setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
    };

    useEffect(() => {
        updateArrows();
        const el = scrollerRef.current;
        if (!el) return;
        el.addEventListener("scroll", updateArrows, { passive: true });
        window.addEventListener("resize", updateArrows);
        return () => {
            el.removeEventListener("scroll", updateArrows);
            window.removeEventListener("resize", updateArrows);
        };
    }, [items.length]);

    const scrollBy = (direction: "left" | "right") => {
        const el = scrollerRef.current;
        if (!el) return;
        const amount = el.clientWidth * 0.85;
        el.scrollBy({
            left: direction === "left" ? -amount : amount,
            behavior: "smooth",
        });
    };

    if (!items || items.length === 0) return null;

    return (
        <section className="relative mx-auto max-w-7xl px-6 pb-12 sm:px-8">
            <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                    {eyebrow && (
                        <span className={`text-[10px] font-bold uppercase tracking-[0.3em] ${accent}`}>
                            {eyebrow}
                        </span>
                    )}
                    <h2 className="mt-1 font-display text-2xl text-white sm:text-3xl">
                        {title}
                    </h2>
                </div>
                <Link
                    href={seeAllHref}
                    className="shrink-0 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white"
                >
                    See all →
                </Link>
            </div>

            <div className="group relative">
                {/* Fade gradients on the edges so cards seem to slide in */}
                <div
                    aria-hidden
                    className={`pointer-events-none absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent transition-opacity duration-300 ${canLeft ? "opacity-100" : "opacity-0"
                        }`}
                />
                <div
                    aria-hidden
                    className={`pointer-events-none absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent transition-opacity duration-300 ${canRight ? "opacity-100" : "opacity-0"
                        }`}
                />

                {/* Left arrow */}
                <button
                    type="button"
                    onClick={() => scrollBy("left")}
                    aria-label="Scroll left"
                    className={`absolute left-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition duration-300 hover:scale-110 hover:border-sakura/50 hover:bg-black/80 ${canLeft ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>

                {/* Right arrow */}
                <button
                    type="button"
                    onClick={() => scrollBy("right")}
                    aria-label="Scroll right"
                    className={`absolute right-2 top-1/2 z-20 -translate-y-1/2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/60 text-white backdrop-blur transition duration-300 hover:scale-110 hover:border-sakura/50 hover:bg-black/80 ${canRight ? "opacity-100" : "pointer-events-none opacity-0"
                        }`}
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 18 15 12 9 6" />
                    </svg>
                </button>

                {/* Carousel track */}
                <div
                    ref={scrollerRef}
                    className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [scrollbar-width:none]"
                >
                    {items.map((a, i) => {
                        const c = cardColor(i);
                        return (
                            <article
                                key={a.mal_id}
                                className="group/card relative w-36 shrink-0 snap-start overflow-hidden rounded-2xl border border-white/10 transition hover:border-sakura/40 hover:shadow-xl hover:shadow-sakura/20 sm:w-40"
                            >
                                <Link href={`/anime/${a.mal_id}`} className="block">
                                    <div className="relative aspect-[3/4] overflow-hidden">
                                        <Image
                                            src={a.images.jpg.large_image_url}
                                            alt={a.title}
                                            fill
                                            sizes="160px"
                                            className="object-cover opacity-80 transition duration-500 group-hover/card:scale-105 group-hover/card:opacity-100"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-br ${c.from} ${c.to} opacity-30 mix-blend-overlay`} />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                                        {a.score !== null && (
                                            <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold text-white backdrop-blur border border-white/10">
                                                ★ {a.score.toFixed(1)}
                                            </span>
                                        )}

                                        <div className="absolute inset-x-0 bottom-0 p-2.5 z-10">
                                            <h3 className="text-xs font-bold text-white drop-shadow-md transition group-hover/card:text-sakura-soft line-clamp-2">
                                                {a.title}
                                            </h3>
                                            <p className="mt-0.5 flex items-center gap-1.5 text-[10px] text-white/60 drop-shadow-md">
                                                {a.year && <span>{a.year}</span>}
                                                {a.episodes && <span>· {a.episodes} eps</span>}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="absolute right-2 top-2 z-20">
                                    <LikeButton animeMalId={a.mal_id} size="sm" />
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
