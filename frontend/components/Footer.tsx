import Link from "next/link";

const SOCIALS = [
    { label: "Twitter", handle: "@hanabi", icon: "𝕏" },
    { label: "Instagram", handle: "@hanabi.jp", icon: "◉" },
    { label: "TikTok", handle: "@hanabi", icon: "♪" },
    { label: "Discord", handle: "/hanabi", icon: "✦" },
];

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/anime", label: "Anime" },
    { href: "/characters", label: "Characters" },
    { href: "/contact", label: "Contact" },
];

export default function Footer() {
    return (
        <footer className="relative mt-32 overflow-hidden border-t border-white/5 bg-black/40 backdrop-blur-3xl pt-20 pb-10">
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-[80%] -translate-x-1/2 rounded-[100%] bg-gradient-to-r from-sakura/10 via-twilight/10 to-sky/10 blur-3xl opacity-50 mix-blend-screen" />

            <div className="mx-auto max-w-7xl px-6 sm:px-8 relative z-10">
                <div className="grid gap-12 lg:grid-cols-[2fr_1fr_1fr_1.5fr] md:grid-cols-2">

                    {/* Brand Section */}
                    <div className="flex flex-col">
                        <Link href="/" className="group inline-flex items-center gap-3 w-max">
                            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-black/80 border border-white/10 overflow-hidden shadow-xl shadow-sakura/10 transition-all duration-500 group-hover:scale-105 group-hover:border-sakura/50">
                                <div className="absolute inset-0 bg-gradient-to-br from-sakura/30 via-twilight/30 to-sky/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                <span className="relative z-10 text-xl font-black bg-gradient-to-br from-sakura via-white to-sky bg-clip-text text-transparent transition-transform duration-500 group-hover:scale-110">
                                    花
                                </span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="font-display text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-sakura-soft">
                                    Hanabi
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/50 transition-colors duration-300 group-hover:text-sky/80">
                                    花火 · matsuri
                                </span>
                            </div>
                        </Link>

                        <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">
                            A modern anime + Japanese youth culture platform — built for the new generation of fans who live online. Stream, connect, and vibe.
                        </p>

                        <div className="mt-6 flex w-fit items-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-4 py-2 text-xs font-semibold tracking-wide text-white/80 shadow-inner backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#34d399]"></span>
                            </span>
                            ALL SYSTEMS VIBING
                        </div>
                    </div>

                    {/* Explore Links */}
                    <div className="flex flex-col">
                        <h4 className="mb-6 font-display text-sm font-bold tracking-widest text-white">
                            Explore <span className="text-sakura/60 font-sans font-normal text-xs ml-1">探索</span>
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {LINKS.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="group flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
                                    >
                                        <span className="h-px w-0 bg-sakura transition-all duration-300 group-hover:w-3" />
                                        <span>{link.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Follow Links */}
                    <div className="flex flex-col">
                        <h4 className="mb-6 font-display text-sm font-bold tracking-widest text-white">
                            Follow <span className="text-sky/60 font-sans font-normal text-xs ml-1">フォロー</span>
                        </h4>
                        <ul className="flex flex-col gap-3">
                            {SOCIALS.map((s) => (
                                <li key={s.label}>
                                    <a
                                        href="#"
                                        className="group flex items-center gap-3 text-sm text-white/60 transition-all hover:text-white hover:translate-x-1"
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs transition-all duration-300 group-hover:border-transparent group-hover:bg-gradient-to-br group-hover:from-sakura group-hover:to-twilight group-hover:text-white group-hover:shadow-[0_0_15px_rgba(255,91,156,0.5)]">
                                            {s.icon}
                                        </span>
                                        <div className="flex flex-col leading-tight">
                                            <span className="font-semibold">{s.label}</span>
                                            <span className="text-[10px] text-white/40 transition-colors group-hover:text-sakura-soft/80">{s.handle}</span>
                                        </div>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter Subscription */}
                    <div className="flex flex-col">
                        <h4 className="mb-6 font-display text-sm font-bold tracking-widest text-white">
                            Stay Updated <span className="text-peach/60 font-sans font-normal text-xs ml-1">最新情報</span>
                        </h4>
                        <p className="mb-4 text-xs leading-relaxed text-white/50">
                            Get the latest drops, festival news, and exclusive invites directly to your inbox. No spam, just vibes.
                        </p>
                        <form className="relative flex w-full max-w-sm items-center">
                            <input
                                type="email"
                                placeholder="Enter your email..."
                                className="w-full rounded-full border border-white/10 bg-white/5 py-3 pl-5 pr-24 text-sm text-white placeholder:text-white/30 outline-none transition-all focus:border-sakura/50 focus:bg-white/10 focus:shadow-[0_0_20px_rgba(255,91,156,0.15)]"
                            />
                            <button
                                type="button"
                                className="absolute right-1 top-1 bottom-1 flex items-center justify-center rounded-full bg-white text-black px-4 text-xs font-bold transition-transform hover:scale-105 active:scale-95"
                            >
                                Join
                            </button>
                        </form>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
                    <p className="text-xs text-white/40 font-medium">
                        © {new Date().getFullYear()} Hanabi Platform. All rights reserved.
                    </p>
                    <p className="font-display tracking-[0.2em] text-[10px] text-white/30 uppercase flex items-center gap-2">
                        <span>また会いましょう</span>
                        <span className="h-1 w-1 rounded-full bg-sakura/50"></span>
                        <span>See you again</span>
                    </p>
                </div>
            </div>
        </footer>
    );
}
