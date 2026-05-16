"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/anime", label: "Anime" },
    { href: "/products", label: "Products" },
    { href: "/contact", label: "Contact" },
    { href: "/about", label: "About" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "border-b border-white/10 backdrop-blur-xl" : ""
                }`}
        >
            <div
                className={`absolute inset-0 -z-10 transition-opacity duration-300 ${scrolled ? "opacity-100" : "opacity-60"
                    }`}
                style={{
                    background:
                        "linear-gradient(180deg, rgba(10,4,32,0.85) 0%, rgba(10,4,32,0.55) 100%)",
                }}
            />

            <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-8">
                <Link
                    href="/"
                    className="group flex items-center gap-2.5"
                    aria-label="Hanabi home"
                >
                    <span className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sakura via-twilight to-sky text-lg font-black text-white shadow-lg shadow-sakura/40 transition group-hover:scale-110 group-hover:rotate-6">
                        H
                        <span className="absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-sakura via-twilight to-sky opacity-0 blur-md transition group-hover:opacity-70" />
                    </span>
                    <div className="flex flex-col leading-none">
                        <span className="font-display text-lg tracking-tight text-white">
                            Hanabi
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-sakura-soft/70">
                            anime · culture
                        </span>
                    </div>
                </Link>

                <ul className="hidden items-center gap-1 md:flex">
                    {LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    prefetch={false}
                                    className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${active ? "text-white" : "text-white/70 hover:text-white"
                                        }`}
                                >
                                    {active && (
                                        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-sakura/20 via-twilight/20 to-sky/20 ring-1 ring-white/15" />
                                    )}
                                    <span className="hover-underline">{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                <Link
                    href="/join"
                    className="group relative hidden overflow-hidden rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-5 py-2 text-sm font-bold text-white shadow-lg shadow-sakura/30 transition hover:scale-105 hover:shadow-sakura/50 active:scale-95 md:inline-flex"
                >
                    <span className="relative z-10">Join Hanabi →</span>
                    <span className="shimmer-overlay" />
                </Link>

                <button
                    onClick={() => setOpen((v) => !v)}
                    className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/5 backdrop-blur transition hover:bg-white/10 md:hidden"
                    aria-label="Toggle menu"
                    aria-expanded={open}
                >
                    <span
                        className={`h-0.5 w-5 rounded bg-white transition ${open ? "translate-y-2 rotate-45" : ""
                            }`}
                    />
                    <span
                        className={`h-0.5 w-5 rounded bg-white transition ${open ? "opacity-0" : ""
                            }`}
                    />
                    <span
                        className={`h-0.5 w-5 rounded bg-white transition ${open ? "-translate-y-2 -rotate-45" : ""
                            }`}
                    />
                </button>
            </nav>

            <div
                className={`overflow-hidden transition-all duration-300 md:hidden ${open ? "max-h-[480px] opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="mx-5 mb-4 flex flex-col gap-1 rounded-2xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl">
                    {LINKS.map((link) => {
                        const active = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    prefetch={false}
                                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-semibold transition ${active
                                        ? "bg-gradient-to-r from-sakura/20 via-twilight/20 to-sky/20 text-white"
                                        : "text-white/80 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <span>{link.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                    <li className="pt-1">
                        <Link
                            href="/join"
                            className="flex items-center justify-center rounded-xl bg-gradient-to-r from-sakura via-twilight to-sky px-4 py-3 text-sm font-bold text-white shadow-lg shadow-sakura/30"
                        >
                            Join Hanabi →
                        </Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}
