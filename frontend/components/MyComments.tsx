"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getMyComments, deleteComment, type CommentRecord } from "@/lib/authClient";

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

export default function MyComments() {
    const [comments, setComments] = useState<CommentRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const { comments } = await getMyComments();
                if (!cancelled) setComments(comments);
            } catch {
                // ignore
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

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
        <section>
            <div className="mb-5 flex items-end justify-between gap-4">
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-sky">
                        Your comments
                    </h2>
                    <p className="mt-1 font-display text-2xl text-white">
                        What you&apos;ve been saying
                    </p>
                </div>
                {!loading && comments.length > 0 && (
                    <span className="text-xs text-white/40">
                        {comments.length} total
                    </span>
                )}
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[0, 1, 2].map((i) => (
                        <div key={i} className="h-20 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]" />
                    ))}
                </div>
            ) : comments.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-white/50">
                    You haven&apos;t commented on anything yet. Find an anime you love and{" "}
                    <Link href="/anime" className="text-sakura underline hover:text-white">
                        say something
                    </Link>.
                </div>
            ) : (
                <div className="space-y-3">
                    {comments.map((c) => (
                        <article
                            key={c.id}
                            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur"
                        >
                            <div className="flex items-center justify-between gap-3">
                                <Link
                                    href={`/anime/${c.animeMalId}`}
                                    className="text-xs font-bold uppercase tracking-wider text-sakura hover:text-white"
                                >
                                    on anime #{c.animeMalId} →
                                </Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] uppercase tracking-wider text-white/40">
                                        {timeAgo(c.createdAt)}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(c.id)}
                                        className="text-[10px] font-bold uppercase tracking-wider text-white/40 transition hover:text-red-300"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-white/80">
                                {c.body}
                            </p>
                        </article>
                    ))}
                </div>
            )}
        </section>
    );
}
