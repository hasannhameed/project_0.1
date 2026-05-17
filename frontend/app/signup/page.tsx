"use client";

import Link from "next/link";
import { useState } from "react";
import { signup as signupApi } from "@/lib/authClient";
import { useAuth } from "@/components/AuthProvider";

export default function Signup() {
    const { refresh } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [terms, setTerms] = useState(false);
    const [showPwd, setShowPwd] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [done, setDone] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!name.trim() || !email.trim() || !password) {
            setError("Please fill in every field.");
            return;
        }
        if (password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }
        if (password !== confirm) {
            setError("Passwords don't match.");
            return;
        }
        if (!terms) {
            setError("Please accept the Terms to continue.");
            return;
        }
        setSubmitting(true);
        try {
            await signupApi({ name: name.trim(), email: email.trim(), password });
            await refresh();
            setDone(true);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Sign up failed. Try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const inputCls =
        "w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition focus:border-sakura/60 focus:bg-black/50 focus:shadow-[0_0_0_4px_rgba(255,177,209,0.12)]";

    return (
        <main>
            <section className="relative overflow-hidden px-6 py-16 sm:px-8 sm:py-20">
                <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 h-[26rem] w-[26rem] animate-blob rounded-full bg-sakura/30 blur-3xl" />
                <div aria-hidden className="pointer-events-none absolute top-1/3 -right-32 h-[26rem] w-[26rem] animate-blob rounded-full bg-twilight/30 blur-3xl [animation-delay:-6s]" />

                <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                    {/* Left — copy */}
                    <div>
                        <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-sakura/30 bg-sakura/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-sakura backdrop-blur">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sakura opacity-75" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-sakura" />
                            </span>
                            Join Hanabi
                        </span>
                        <h1 className="mt-5 animate-rise font-display text-5xl leading-[0.95] sm:text-6xl lg:text-7xl [animation-delay:0.1s]">
                            Make it <span className="gradient-text">your</span> anime home.
                        </h1>
                        <p className="mt-4 max-w-md animate-rise text-base text-white/70 [animation-delay:0.2s]">
                            Reviews, watchlists, drop-day alerts, local events, watch parties. Sign up once and unlock the whole community as features ship.
                        </p>

                        <ul className="mt-8 animate-rise space-y-3 [animation-delay:0.3s]">
                            {[
                                "Free forever — no card, no trial",
                                "Save unlimited watchlists and reviews",
                                "Be first in line for new features",
                            ].map((p) => (
                                <li key={p} className="flex items-center gap-2 text-sm text-white/70">
                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-sakura to-twilight text-[10px] font-bold text-white">
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
                        <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full bg-gradient-to-br from-sakura via-twilight to-sky opacity-25 blur-3xl" />

                        {done ? (
                            <div className="relative text-center">
                                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-sakura to-sky shadow-lg shadow-sakura/40">
                                    <span className="text-2xl text-white">✓</span>
                                </div>
                                <h2 className="mt-5 font-display text-3xl text-white">
                                    Welcome, {name}!
                                </h2>
                                <p className="mt-2 text-sm text-white/60">
                                    Your account at <strong className="text-white">{email}</strong> is ready. You&apos;re logged in and good to go.
                                </p>
                                <Link
                                    href="/dashboard"
                                    className="group relative mt-6 inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105"
                                >
                                    <span>Go to your dashboard</span>
                                    <span className="transition group-hover:translate-x-1">→</span>
                                </Link>
                            </div>
                        ) : (
                            <div className="relative flex flex-col gap-4">
                                <div>
                                    <h2 className="font-display text-2xl text-white">Create your account</h2>
                                    <p className="mt-1 text-xs text-white/50">Takes less than 30 seconds.</p>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sakura-soft">
                                        Display name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="What should we call you?"
                                        className={inputCls}
                                        autoComplete="name"
                                    />
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
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-twilight">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showPwd ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="at least 8 characters"
                                            className={`${inputCls} pr-20`}
                                            autoComplete="new-password"
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

                                <div>
                                    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.2em] text-sunset">
                                        Confirm password
                                    </label>
                                    <input
                                        type={showPwd ? "text" : "password"}
                                        value={confirm}
                                        onChange={(e) => setConfirm(e.target.value)}
                                        placeholder="type it again"
                                        className={inputCls}
                                        autoComplete="new-password"
                                    />
                                </div>

                                <label className="flex items-start gap-2 text-xs text-white/60">
                                    <input
                                        type="checkbox"
                                        checked={terms}
                                        onChange={(e) => setTerms(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-black/40 accent-sakura"
                                    />
                                    <span>
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-sakura underline hover:text-white">
                                            Terms
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-sakura underline hover:text-white">
                                            Privacy Policy
                                        </Link>.
                                    </span>
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
                                                Creating account…
                                            </>
                                        ) : (
                                            <>
                                                Create account
                                                <span className="transition group-hover:translate-x-1">→</span>
                                            </>
                                        )}
                                    </span>
                                    {!submitting && <span className="shimmer-overlay" />}
                                </button>

                                <p className="text-center text-xs text-white/50">
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-sakura underline hover:text-white">
                                        Log in
                                    </Link>
                                </p>
                            </div>
                        )}
                    </form>
                </div>
            </section>
        </main>
    );
}
