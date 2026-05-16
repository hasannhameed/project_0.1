"use client";

import { useEffect, useRef, useState } from "react";

export default function HeroTrailer({
    videoId,
    title,
}: {
    videoId: string;
    title: string;
}) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [muted, setMuted] = useState(true);
    const [playing, setPlaying] = useState(false);

    const post = (func: string) => {
        iframeRef.current?.contentWindow?.postMessage(
            JSON.stringify({ event: "command", func, args: [] }),
            "*",
        );
    };

    const toggle = () => {
        post(muted ? "unMute" : "mute");
        setMuted((m) => !m);
    };

    // Subscribe to the YouTube iframe API events and only show the iframe
    // when the player is in the PLAYING state. Any other state (paused,
    // ended, cued, unstarted) hides the iframe so the banner takes over —
    // this prevents YouTube's center controls / play button from showing
    // through during loop transitions, pause flickers, or autoplay hiccups.
    useEffect(() => {
        const subscribe = () => {
            iframeRef.current?.contentWindow?.postMessage(
                JSON.stringify({ event: "listening", id: "hero-trailer" }),
                "*",
            );
        };

        const onMessage = (e: MessageEvent) => {
            if (!e.origin.includes("youtube")) return;
            try {
                const data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
                if (data?.event === "infoDelivery") {
                    const state = data?.info?.playerState;
                    // 1 = PLAYING. Ignore "buffering" (3) so brief stutters
                    // during smooth playback don't cause flicker.
                    if (state === 1) setPlaying(true);
                    else if (state === 2 || state === 0 || state === 5 || state === -1) setPlaying(false);
                }
            } catch {
                // ignore non-JSON messages YouTube sometimes posts
            }
        };

        window.addEventListener("message", onMessage);
        const iframe = iframeRef.current;
        iframe?.addEventListener("load", subscribe);

        return () => {
            window.removeEventListener("message", onMessage);
            iframe?.removeEventListener("load", subscribe);
        };
    }, []);

    const params = new URLSearchParams({
        autoplay: "1",
        mute: "1",
        loop: "1",
        playlist: videoId,
        controls: "0",
        modestbranding: "1",
        rel: "0",
        iv_load_policy: "3",
        disablekb: "1",
        playsinline: "1",
        fs: "0",
        enablejsapi: "1",
    });
    const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

    return (
        <>
            {/* Video: oversized + centered so it covers the hero like object-cover.
                pointer-events-none so all detail-page buttons remain clickable. */}
            <div
                className={`pointer-events-none absolute inset-0 overflow-hidden ${playing
                    ? "opacity-100 transition-opacity duration-700"
                    : "opacity-0 transition-none"
                    }`}
            >
                <div className="absolute left-1/2 top-1/2 aspect-video min-h-full min-w-full -translate-x-1/2 -translate-y-1/2">
                    <iframe
                        ref={iframeRef}
                        src={src}
                        title={`${title} trailer`}
                        allow="autoplay; encrypted-media; picture-in-picture"
                        className="absolute inset-0 h-full w-full"
                    />
                </div>
            </div>

            {/* Sound toggle — Netflix pattern, bottom-right of the hero.
                Only revealed once playback has actually started. */}
            <button
                type="button"
                onClick={toggle}
                aria-label={muted ? "Unmute trailer" : "Mute trailer"}
                className={`absolute bottom-6 right-6 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur transition duration-500 hover:scale-110 hover:border-sakura/50 hover:bg-black/60 ${playing ? "opacity-100" : "pointer-events-none opacity-0"
                    }`}
            >
                {muted ? (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4Z" />
                        <line x1="22" y1="9" x2="16" y2="15" />
                        <line x1="16" y1="9" x2="22" y2="15" />
                    </svg>
                ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 5 6 9H2v6h4l5 4Z" />
                        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                )}
            </button>
        </>
    );
}
