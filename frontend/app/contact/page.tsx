"use client";
import { useState } from "react";

const TOPICS = [
    { value: "general", label: "General · 一般" },
    { value: "press", label: "Press · 報道" },
    { value: "partner", label: "Partnership · 提携" },
    { value: "support", label: "Support · 助け" },
];

export default function Contact() {
    const [topic, setTopic] = useState("general");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!name.trim() || !email.trim() || !message.trim()) return;
        setSubmitting(true);
        await new Promise((r) => setTimeout(r, 900));
        setSubmitting(false);
        setSent(true);
        setName("");
        setEmail("");
        setMessage("");
        setTimeout(() => setSent(false), 4000);
    };

    const inputCls =
        "peer w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 outline-none transition focus:border-sakura/60 focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(255,91,156,0.15)]";

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-20 sm:px-8">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 animate-blob bg-sakura/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 animate-blob bg-sky/30 blur-3xl [animation-delay:-8s]" />

                <div className="relative mx-auto max-w-6xl">
                    <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr]">
                        <div>
                            <span className="animate-rise text-xs font-bold uppercase tracking-[0.3em] text-sakura">
                                連絡 · get in touch
                            </span>
                            <h1 className="mt-3 animate-rise font-display text-5xl leading-tight sm:text-6xl [animation-delay:0.1s]">
                                <span className="gradient-text">Say hi.</span>
                                <br />
                                <span className="text-white">we read everything.</span>
                            </h1>
                            <p className="mt-4 max-w-md animate-rise text-white/70 [animation-delay:0.2s]">
                                pitch a feature, request a title, partner with us, or just send
                                a meme. we reply within 48hrs (tokyo time).
                            </p>

                            <ul className="mt-10 flex flex-col gap-3">
                                {[
                                    { kanji: "メ", label: "Email", value: "hi@hanabi.app" },
                                    { kanji: "場", label: "Studio", value: "Shibuya, Tokyo" },
                                    { kanji: "時", label: "Hours", value: "Mon–Fri · 10:00–19:00 JST" },
                                ].map((row) => (
                                    <li
                                        key={row.label}
                                        className="glass group flex items-center gap-4 rounded-2xl px-4 py-3 transition hover:-translate-y-0.5 hover:border-sakura/40"
                                    >
                                        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sakura via-twilight to-sky font-display text-lg text-white shadow-lg shadow-sakura/30 transition group-hover:rotate-6">
                                            {row.kanji}
                                        </span>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sakura-soft/70">
                                                {row.label}
                                            </p>
                                            <p className="text-sm font-semibold text-white">
                                                {row.value}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="glass-strong relative animate-rise overflow-hidden rounded-3xl p-6 sm:p-8 [animation-delay:0.3s]"
                        >
                            <div
                                aria-hidden
                                className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-sakura via-twilight to-sky opacity-30 blur-3xl"
                            />

                            <div className="relative flex flex-col gap-5">
                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sakura-soft">
                                        Topic · 話題
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {TOPICS.map((t) => (
                                            <button
                                                key={t.value}
                                                type="button"
                                                onClick={() => setTopic(t.value)}
                                                className={`rounded-full border px-3 py-1.5 text-xs font-bold transition hover:scale-105 ${topic === t.value
                                                    ? "border-transparent bg-gradient-to-r from-sakura via-twilight to-sky text-white shadow-lg shadow-sakura/30"
                                                    : "border-white/10 bg-white/5 text-white/70 hover:border-sakura/40 hover:bg-white/10 hover:text-white"
                                                    }`}
                                            >
                                                {t.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sakura-soft">
                                            Name · 名前
                                        </label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Sakura Tanaka"
                                            className={inputCls}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sky">
                                            Email · メール
                                        </label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="sakura@hanabi.app"
                                            className={inputCls}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-twilight">
                                        Message · メッセージ
                                    </label>
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="tell us the vibe…"
                                        rows={5}
                                        className={`${inputCls} resize-none`}
                                    />
                                </div>

                                {sent && (
                                    <div className="animate-rise rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm font-semibold text-emerald-200">
                                        ✓ message sent · ありがとう! we'll reply soon.
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-[1.02] hover:shadow-sakura/50 active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    <span className="relative z-10 flex items-center justify-center gap-2">
                                        {submitting ? (
                                            <>
                                                <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                                sending…
                                            </>
                                        ) : (
                                            <>
                                                Send message
                                                <span className="transition group-hover:translate-x-1">→</span>
                                            </>
                                        )}
                                    </span>
                                    {!submitting && <span className="shimmer-overlay" />}
                                </button>

                                <p className="text-center text-[10px] uppercase tracking-[0.2em] text-white/40">
                                    protected by good vibes only
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
