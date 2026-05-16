import Link from "next/link";
import type { SVGProps } from "react";

function XIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}
function InstagramIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
    );
}
function TikTokIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.43a8.16 8.16 0 0 0 4.77 1.52V6.51a4.85 4.85 0 0 1-1.84-.04z" />
        </svg>
    );
}
function DiscordIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.078.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.5 12.5 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.058a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.027 14.2 14.2 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.128 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.5-5.177-.838-9.674-3.548-13.66a.061.061 0 0 0-.031-.029zM8.02 15.331c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.946 2.419-2.157 2.419z" />
        </svg>
    );
}

const SOCIALS = [
    { label: "X / Twitter", href: "https://twitter.com", icon: XIcon },
    { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
    { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
    { label: "Discord", href: "https://discord.com", icon: DiscordIcon },
];

const EXPLORE = [
    { href: "/", label: "Home" },
    { href: "/anime", label: "Anime" },
    { href: "/products", label: "Products" },
    { href: "/join", label: "Join" },
    { href: "/about", label: "About" },
];

const LEGAL = [
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
    { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer className="relative mt-24 overflow-hidden border-t border-white/5 bg-black/40 pt-24 pb-12">
            {/* Ambient glow */}
            <div aria-hidden className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-sakura/10 via-twilight/10 to-sky/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8">
                {/* Top: brand + columns */}
                <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr] lg:gap-12">
                    {/* Brand */}
                    <div className="flex flex-col">
                        <Link href="/" className="group inline-flex items-center gap-3 w-max">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/60 shadow-lg shadow-sakura/10 transition-all duration-500 group-hover:scale-105 group-hover:border-sakura/50">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-sakura/30 via-twilight/30 to-sky/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <span className="relative z-10 bg-gradient-to-br from-sakura via-white to-sky bg-clip-text text-xl font-black text-transparent transition-transform duration-500 group-hover:scale-110">
                                    H
                                </span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sakura-soft">
                                    Hanabi
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-sky/80">
                                    anime · culture
                                </span>
                            </div>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
                            A modern anime + Japanese youth culture platform — built for the new generation of fans who live online.
                        </p>

                        {/* Email signup */}
                        <form className="mt-7 flex w-full max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur transition focus-within:border-sakura/50 focus-within:bg-white/10 focus-within:shadow-[0_0_0_4px_rgba(255,177,209,0.12)]">
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="w-full bg-transparent px-3 py-1.5 text-sm text-white placeholder:text-white/30 outline-none"
                            />
                            <button
                                type="submit"
                                className="shrink-0 rounded-full bg-gradient-to-r from-sakura via-twilight to-sky px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-sakura/30 transition hover:scale-105 active:scale-95"
                            >
                                Join
                            </button>
                        </form>
                        <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-white/30">
                            One email when we launch. No spam, ever.
                        </p>
                    </div>

                    {/* Explore */}
                    <FooterColumn title="Explore" accent="text-sakura">
                        {EXPLORE.map((link) => (
                            <FooterLink key={link.href} href={link.href}>
                                {link.label}
                            </FooterLink>
                        ))}
                    </FooterColumn>

                    {/* Legal */}
                    <FooterColumn title="Legal" accent="text-sky">
                        {LEGAL.map((link) => (
                            <FooterLink key={link.href} href={link.href}>
                                {link.label}
                            </FooterLink>
                        ))}
                    </FooterColumn>

                    {/* Connect */}
                    <FooterColumn title="Connect" accent="text-sunset">
                        <p className="text-xs leading-relaxed text-white/50">
                            Tag us in your cosplays, hot takes, and watch parties.
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {SOCIALS.map(({ label, href, icon: Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 backdrop-blur transition hover:border-transparent hover:bg-gradient-to-br hover:from-sakura hover:to-twilight hover:text-white hover:shadow-lg hover:shadow-sakura/40"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </FooterColumn>
                </div>

                {/* Divider */}
                <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Bottom bar */}
                <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-xs font-medium text-white/40">
                        © {new Date().getFullYear()} Hanabi Platform. All rights reserved.
                    </p>
                    <p className="flex items-center gap-2 font-display text-[10px] uppercase tracking-[0.25em] text-white/30">
                        <span>Crafted with love</span>
                        <span className="h-1 w-1 rounded-full bg-sakura/50" />
                        <span className="bg-gradient-to-r from-sakura via-twilight to-sky bg-clip-text text-transparent">
                            for fans, by fans
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
}

function FooterColumn({
    title,
    accent,
    children,
}: {
    title: string;
    accent: string;
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-col">
            <h4 className={`mb-6 flex items-center gap-2 font-display text-xs font-bold uppercase tracking-[0.25em] ${accent}`}>
                <span className="h-px w-4 bg-current opacity-60" />
                {title}
            </h4>
            <div className="flex flex-col gap-3.5">{children}</div>
        </div>
    );
}

function FooterLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="group inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-white"
        >
            <span className="h-px w-0 bg-sakura transition-all duration-300 group-hover:w-3" />
            <span>{children}</span>
        </Link>
    );
}
