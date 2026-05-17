"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
    getCommentsForAnime,
    postComment,
    deleteComment,
    type CommentRecord,
} from "@/lib/authClient";
import { useAuth } from "./AuthProvider";

function timeAgo(iso: string) {
    const diff = Date.now() - new Date(iso).getTime();
    const s = Math.floor(diff / 1000);
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    const d = Math.floor(h / 24);
    if (d < 30) return `${d}d ago`;
    return new Date(iso).toLocaleDateString();
}

export default function Comments({ animeMalId }: { animeMalId: number }) {
    const { user, loading: authLoading } = useAuth();
    const [comments, setComments] = useState<CommentRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [body, setBody] = useState("");
    const [posting, setPosting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            setLoading(true);
            try {
                const { comments } = await getCommentsForAnime(animeMalId);
                if (!cancelled) setComments(comments);
            } catch {
                // leave empty
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, [animeMalId]);

    const handlePost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim() || posting) return;
        setPosting(true);
        setError(null);
        try {
            const { comment } = await postComment({ animeMalId, body: body.trim() });
            setComments((prev) => [comment, ...prev]);
            setBody("");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to post comment");
        } finally {
            setPosting(false);
        }
    };

    const handleDelete = async (id: number) => {
        const previous = comments;
        setComments((prev) => prev.filter((c) => c.id !== id));
        try {
            await deleteComment(id);
        } catch {
            setComments(previous);
        }
    };

    return (
        <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8">
            <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                Comments
            </h2>
            <p className="mt-1 font-display text-2xl text-white sm:text-3xl">
                Join the conversation
            </p>

            {/* Composer */}
            <div className="mt-6">
                {authLoading ? (
                    <div className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                ) : user ? (
                    <form onSubmit={handlePost} className="glass-strong overflow-hidden rounded-2xl p-4">
                        <div className="flex items-start gap-3">
                            <Avatar user={user} size={36} />
                            <div className="flex-1">
                                <textarea
                                    value={body}
                                    onChange={(e) => setBody(e.target.value)}
                                    placeholder="Share your thoughts on this anime…"
                                    rows={3}
                                    maxLength={2000}
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-sakura/60 focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(255,177,209,0.12)]"
                                />
                                <div className="mt-2 flex items-center justify-between gap-3">
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                                        {body.length}/2000
                                    </span>
                                    <button
                                        type="submit"
                                        disabled={posting || !body.trim()}
                                        className="rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/30 transition hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {posting ? "Posting…" : "Post"}
                                    </button>
                                </div>
                                {error && (
                                    <p className="mt-2 text-xs text-red-300">{error}</p>
                                )}
                            </div>
                        </div>
                    </form>
                ) : (
                    <div className="glass-strong flex flex-wrap items-center justify-between gap-3 rounded-2xl p-5">
                        <p className="text-sm text-white/70">
                            Want to leave a comment?
                        </p>
                        <div className="flex gap-2">
                            <Link
                                href="/login"
                                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white transition hover:border-sakura/40 hover:bg-white/10"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/signup"
                                className="rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/30 transition hover:scale-105"
                            >
                                Sign up
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* List */}
            <div className="mt-8 space-y-4">
                {loading && (
                    <>
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                        ))}
                    </>
                )}
                {!loading && comments.length === 0 && (
                    <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/50">
                        No comments yet. Be the first.
                    </p>
                )}
                {!loading && comments.map((c) => (
                    <article
                        key={c.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                    >
                        <header className="flex items-center gap-3">
                            <Avatar user={c.author} size={36} />
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-white">
                                    {c.author?.name ?? "Deleted user"}
                                </p>
                                <p className="text-[10px] uppercase tracking-wider text-white/40">
                                    {timeAgo(c.createdAt)}
                                </p>
                            </div>
                            {user && c.author?.id === user.id && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(c.id)}
                                    className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition hover:text-red-300"
                                >
                                    Delete
                                </button>
                            )}
                        </header>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-white/80">
                            {c.body}
                        </p>
                    </article>
                ))}
            </div>
        </section>
    );
}

function Avatar({
    user,
    size,
}: {
    user: { name: string; avatar: string | null } | null;
    size: number;
}) {
    const initial = (user?.name ?? "?").slice(0, 1).toUpperCase();
    if (user?.avatar) {
        return (
            // Data URL avatar — use plain img since the URL changes per user
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={user.avatar}
                alt={user.name}
                width={size}
                height={size}
                className="shrink-0 rounded-full border border-white/10 object-cover"
                style={{ width: size, height: size }}
            />
        );
    }
    return (
        <div
            className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sakura via-twilight to-sky font-bold text-white"
            style={{ width: size, height: size, fontSize: size * 0.42 }}
        >
            {initial}
        </div>
    );
}

