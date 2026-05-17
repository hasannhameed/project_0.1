"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getLikeForAnime, toggleLike } from "@/lib/authClient";
import { useAuth } from "./AuthProvider";

type Size = "sm" | "md" | "lg";

const SIZE_STYLES: Record<
    Size,
    { box: string; icon: string; text: string }
> = {
    sm: { box: "px-2 py-1 gap-1", icon: "h-3.5 w-3.5", text: "text-[10px]" },
    md: { box: "px-2.5 py-1.5 gap-1.5", icon: "h-4 w-4", text: "text-xs" },
    lg: { box: "px-3 py-1.5 gap-2", icon: "h-5 w-5", text: "text-sm" },
};

export default function LikeButton({
    animeMalId,
    size = "md",
    className = "",
}: {
    animeMalId: number;
    size?: Size;
    className?: string;
}) {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [count, setCount] = useState<number>(0);
    const [liked, setLiked] = useState(false);
    const [pending, setPending] = useState(false);

    // Wait for auth to settle, then fetch once. Use user?.id (a primitive)
    // as the dependency so we don't refetch every time the AuthProvider
    // calls refresh() and produces a new user object reference.
    useEffect(() => {
        if (authLoading) return;
        let cancelled = false;
        (async () => {
            try {
                const { count, liked } = await getLikeForAnime(animeMalId);
                if (!cancelled) {
                    setCount(count);
                    setLiked(liked);
                }
            } catch {
                // ignore
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [animeMalId, user?.id, authLoading]);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (pending) return;
        if (!user) {
            router.push("/login");
            return;
        }
        setPending(true);
        // Optimistic toggle
        const prevLiked = liked;
        const prevCount = count;
        setLiked(!prevLiked);
        setCount(prevCount + (prevLiked ? -1 : 1));
        try {
            const { count, liked } = await toggleLike(animeMalId);
            setCount(count);
            setLiked(liked);
        } catch {
            setLiked(prevLiked);
            setCount(prevCount);
        } finally {
            setPending(false);
        }
    };

    const s = SIZE_STYLES[size];

    return (
        <button
            type="button"
            onClick={handleClick}
            aria-pressed={liked}
            aria-label={liked ? "Unlike" : "Like"}
            disabled={pending}
            className={`inline-flex items-center rounded-full border backdrop-blur transition active:scale-95 disabled:opacity-60 ${s.box} ${s.text} ${liked
                ? "border-sakura/50 bg-sakura/15 text-sakura"
                : "border-white/20 bg-black/40 text-white hover:border-sakura/40 hover:bg-sakura/10"
                } ${className}`}
        >
            <svg
                viewBox="0 0 24 24"
                className={s.icon}
                fill={liked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
            >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="font-bold">{count}</span>
        </button>
    );
}
