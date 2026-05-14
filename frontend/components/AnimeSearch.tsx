"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Suggestion = {
    mal_id: number;
    title: string;
    year: number | null;
    episodes: number | null;
    score: number | null;
    images: { jpg: { image_url: string } };
};

export default function AnimeSearch({ initialQuery = "" }: { initialQuery?: string }) {
    const router = useRouter();
    const [q, setQ] = useState(initialQuery);
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Debounced live-suggest
    useEffect(() => {
        const trimmed = q.trim();
        if (trimmed.length < 2) {
            setSuggestions([]);
            setLoading(false);
            return;
        }
        const ac = new AbortController();
        const t = setTimeout(async () => {
            setLoading(true);
            try {
                const res = await fetch(
                    `/api/jikan/anime?q=${encodeURIComponent(trimmed)}&limit=5&sfw=true&order_by=score&sort=desc`,
                    { signal: ac.signal },
                );
                const json = await res.json();
                setSuggestions(json.data ?? []);
            } catch {
                // Ignore aborts / network blips
            } finally {
                setLoading(false);
            }
        }, 300);
        return () => {
            clearTimeout(t);
            ac.abort();
        };
    }, [q]);

    // Close on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    // "/" keyboard shortcut to focus
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            const target = e.target as HTMLElement | null;
            if (e.key === "/" && target?.tagName !== "INPUT" && target?.tagName !== "TEXTAREA") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const submitSearch = () => {
        const trimmed = q.trim();
        if (!trimmed) return;
        router.push(`/anime?q=${encodeURIComponent(trimmed)}`);
        setOpen(false);
        inputRef.current?.blur();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitSearch();
    };

    const pickSuggestion = (mal_id: number) => {
        setOpen(false);
        router.push(`/anime/${mal_id}`);
    };

    const showDropdown = open && q.trim().length >= 2;

    return (
        <div ref={containerRef} className="relative w-full max-w-md">
            <form
                onSubmit={handleSubmit}
                className="flex animate-rise items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur transition focus-within:border-sakura/50 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(255,91,156,0.15)] [animation-delay:0.3s]"
            >
                <span className="text-white/40">⌕</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={q}
                    onChange={(e) => {
                        setQ(e.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    placeholder="search titles, genres…"
                    className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
                />
                {q && (
                    <button
                        type="button"
                        onClick={() => {
                            setQ("");
                            setSuggestions([]);
                            inputRef.current?.focus();
                        }}
                        aria-label="Clear"
                        className="text-sm text-white/40 transition hover:text-white"
                    >
                        ✕
                    </button>
                )}
                <kbd className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-bold text-white/60 sm:inline">
                    /
                </kbd>
                <button
                    type="submit"
                    className="ml-1 rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/30 transition hover:scale-105 active:scale-95"
                >
                    Search
                </button>
            </form>

            {/* Suggestions dropdown */}
            {showDropdown && (
                <div className="absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/85 shadow-2xl shadow-sakura/10 backdrop-blur-xl">
                    {loading && suggestions.length === 0 && (
                        <div className="px-4 py-6 text-center text-sm text-white/50">
                            Searching…
                        </div>
                    )}
                    {!loading && suggestions.length === 0 && (
                        <div className="px-4 py-6 text-center text-sm text-white/50">
                            No matches for &ldquo;{q}&rdquo;
                        </div>
                    )}
                    {suggestions.map((s) => (
                        <button
                            key={s.mal_id}
                            type="button"
                            onClick={() => pickSuggestion(s.mal_id)}
                            className="flex w-full items-center gap-3 px-3 py-2 text-left transition hover:bg-white/5"
                        >
                            <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md">
                                <Image
                                    src={s.images.jpg.image_url}
                                    alt={s.title}
                                    fill
                                    sizes="40px"
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-white">
                                    {s.title}
                                </p>
                                <p className="truncate text-xs text-white/50">
                                    {[
                                        s.year,
                                        s.episodes ? `${s.episodes} eps` : null,
                                        s.score ? `★ ${s.score.toFixed(1)}` : null,
                                    ]
                                        .filter(Boolean)
                                        .join(" · ")}
                                </p>
                            </div>
                            <span className="text-white/30 transition group-hover:text-white">→</span>
                        </button>
                    ))}
                    {suggestions.length > 0 && (
                        <button
                            type="button"
                            onClick={submitSearch}
                            className="block w-full border-t border-white/10 bg-white/[0.03] px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-sakura transition hover:bg-sakura/10"
                        >
                            View all results for &ldquo;{q.trim()}&rdquo; →
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
