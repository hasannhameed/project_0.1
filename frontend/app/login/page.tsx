"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login as loginApi } from "@/lib/authClient";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(true);
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email.trim() || !password) {
            setError("Email and password are required.");
            return;
        }
        setSubmitting(true);
        try {
            await loginApi({ email: email.trim(), password });
            router.push("/");
            router.refresh();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Login failed. Try again.");
            setSubmitting(false);
        }
    };

    const inputCls =
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-sakura/60 focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(255,177,209,0.12)]";

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 h-[26rem] w-[26rem] animate-blob rounded-full bg-twilight/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/3 -right-32 h-[26rem] w-[26rem] animate-blob rounded-full bg-sky/30 blur-3xl [animation-delay:-6s]" />

                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                    {/* Left — copy */}
                    <div>
                        <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-sky/30 bg-sky/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-sky backdrop-blur">
                            Welcome back
                        </span>
                        <h1 className="mt-5 animate-rise font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl [animation-delay:0.1s]">
                            Pick up where <span className="gradient-text">you left off.</span>
                        </h1>
                        <p className="mt-4 max-w-md animate-rise text-base text-white/70 [animation-delay:0.2s]">
                            Your watchlists, reviews, and notifications are right where you left them.
                        </p>

                        <ul className="mt-8 animate-rise space-y-3 [animation-delay:0.3s]">
                            {[
                                "Synced across every device",
                                "End-to-end encrypted account data",
                                "Watchlists, reviews, and alerts in one place",
                            ].map((p) => (
                                <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sky to-twilight text-[10px] font-bold text-white">
                                        ✓
                                    </span>
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Right — form */}
                    <form
                        onSubmit={handleSubmit}
                        className="glass-strong relative animate-rise overflow-hidden rounded-3xl p-6 sm:p-8 [animation-delay:0.2s]"
                    >
                        <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-sky via-twilight to-sakura opacity-25 blur-3xl" />

                        <div className="relative flex flex-col gap-4">
                            <div>
                                <h2 className="font-display text-2xl text-white">Log in</h2>
                                <p className="mt-1 text-xs text-white/50">Welcome back to Hanabi.</p>
                            </div>

                            <div>
                                <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sky">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="you@example.com"
                                    className={inputCls}
                                    autoComplete="email"
                                />
                            </div>

                            <div>
                                <div className="mb-1.5 flex items-center justify-between">
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-twilight">
                                        Password
                                    </label>
                                    <Link
                                        href="/forgot-password"
                                        className="text-[10px] font-bold uppercase tracking-wider text-sakura hover:text-white"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="your password"
                                        className={`${inputCls} pr-20`}
                                        autoComplete="current-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPwd((s) => !s)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-wider text-white/50 hover:text-white"
                                    >
                                        {showPwd ? "Hide" : "Show"}
                                    </button>
                                </div>
                            </div>

                            <label className="flex items-center gap-2 text-xs text-white/60">
                                <input
                                    type="checkbox"
                                    checked={remember}
                                    onChange={(e) => setRemember(e.target.checked)}
                                    className="h-4 w-4 rounded border-white/20 bg-black/40 accent-sakura"
                                />
                                <span>Remember me on this device</span>
                            </label>

                            {error && (
                                <div className="rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={submitting}
                                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-2">
                                    {submitting ? (
                                        <>
                                            <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                            Logging in…
                                        </>
                                    ) : (
                                        <>
                                            Log in
                                            <span className="transition group-hover:translate-x-1">→</span>
                                        </>
                                    )}
                                </span>
                                {!submitting && <span className="shimmer-overlay" />}
                            </button>

                            <p className="text-center text-xs text-white/50">
                                New here?{" "}
                                <Link href="/signup" className="text-sakura underline hover:text-white">
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    );
}
