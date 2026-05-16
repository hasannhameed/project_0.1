"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function TrailerLauncher({
    videoId,
    title,
}: {
    videoId: string;
    title: string;
}) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    // Esc to close + lock body scroll while modal is open
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = original;
        };
    }, [open]);

    const params = new URLSearchParams({
        autoplay: "1",
        rel: "0",
        modestbranding: "1",
        playsinline: "1",
    });
    const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105 hover:shadow-sakura/50 active:scale-95"
            >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                </svg>
                <span className="relative z-10">Watch trailer</span>
                <span className="shimmer-overlay" />
            </button>

            {mounted && open && createPortal(
                <div
                    className="fixed inset-0 z-[100] grid place-items-center bg-black/85 px-4 backdrop-blur-md animate-fade-in"
                    onClick={() => setOpen(false)}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} trailer`}
                >
                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        aria-label="Close trailer"
                        className="absolute right-5 top-5 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur transition hover:scale-110 hover:border-sakura/50 hover:bg-white/10"
                    >
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    <div
                        className="relative w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl shadow-sakura/20"
                        style={{
                            // Smaller of: page-width minus padding, or "the width that would make
                            // a 16:9 video exactly 80vh tall". Guarantees the modal always fits
                            // within the viewport, so flex/grid centering actually centers it.
                            maxWidth: "min(64rem, calc(80vh * 16 / 9))",
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative aspect-video w-full bg-black">
                            <iframe
                                src={src}
                                title={`${title} trailer`}
                                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                                allowFullScreen
                                className="absolute inset-0 h-full w-full"
                            />
                        </div>
                    </div>

                    <p className="absolute bottom-5 left-0 right-0 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">
                        Press Esc or click outside to close
                    </p>
                </div>,
                document.body,
            )}
        </>
    );
}
