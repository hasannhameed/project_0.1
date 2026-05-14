"use client";

import { Mail, ArrowUp } from "lucide-react";
import type { SVGProps } from "react";
import FadeIn from "./FadeIn";

function GithubIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M12 .5C5.73.5.66 5.57.66 11.85c0 5.02 3.25 9.27 7.77 10.77.57.1.78-.25.78-.55v-1.93c-3.16.69-3.83-1.52-3.83-1.52-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.69.08-.69 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.34.95.1-.74.4-1.24.73-1.53-2.52-.29-5.18-1.26-5.18-5.62 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.03 0 0 .96-.31 3.15 1.17.91-.25 1.89-.38 2.86-.38.97 0 1.95.13 2.86.38 2.18-1.48 3.14-1.17 3.14-1.17.63 1.58.23 2.74.11 3.03.73.79 1.17 1.81 1.17 3.05 0 4.37-2.67 5.33-5.21 5.61.41.35.78 1.05.78 2.11v3.13c0 .3.21.66.79.55C20.1 21.12 23.34 16.87 23.34 11.85 23.34 5.57 18.27.5 12 .5z" />
        </svg>
    );
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
    );
}

function TwitterIcon(props: SVGProps<SVGSVGElement>) {
    return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    );
}

const QUICK_LINKS = [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Projects", href: "#projects" },
    { label: "Pricing", href: "#price" },
    { label: "Contact", href: "#contact" },
];

const SERVICES = [
    { label: "Web Development", href: "#services" },
    { label: "Backend APIs", href: "#services" },
    { label: "UI / UX Design", href: "#services" },
    { label: "Performance Audits", href: "#services" },
];

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/hasanhameed", icon: GithubIcon },
    { label: "LinkedIn", href: "https://linkedin.com/in/hasanhameed", icon: LinkedinIcon },
    { label: "Twitter", href: "https://twitter.com/hasanhameed", icon: TwitterIcon },
    { label: "Email", href: "mailto:hasanhameed858@gmail.com", icon: Mail },
];

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer
            className="relative px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 pb-8"
            style={{
                background: "#0C0C0C",
                borderTop: "1px solid rgba(215, 226, 234, 0.1)",
                color: "#D7E2EA",
            }}
        >
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    {/* Column 1 — Brand */}
                    <FadeIn delay={0.05} y={20}>
                        <div className="flex flex-col gap-4">
                            <h3 className="font-black uppercase tracking-tight text-3xl sm:text-4xl leading-none">
                                Hasan.
                            </h3>
                            <p
                                className="font-light text-sm leading-relaxed max-w-xs"
                                style={{ opacity: 0.7 }}
                            >
                                Fullstack developer crafting scalable and
                                unforgettable applications.
                            </p>
                            <div className="flex gap-3 mt-2">
                                {SOCIALS.map(({ label, href, icon: Icon }) => (
                                    <a
                                        key={label}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={label}
                                        className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-200 hover:bg-white/10 hover:scale-110 hover:border-white/30"
                                    >
                                        <Icon width={16} height={16} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Column 2 — Quick Links */}
                    <FadeIn delay={0.15} y={20}>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold uppercase tracking-wider text-xs opacity-50">
                                Quick Links
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {QUICK_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="text-sm font-light uppercase tracking-wide transition-all duration-200 hover:translate-x-1 hover:opacity-100 inline-block"
                                            style={{ opacity: 0.75 }}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Column 3 — Services */}
                    <FadeIn delay={0.25} y={20}>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold uppercase tracking-wider text-xs opacity-50">
                                Services
                            </h4>
                            <ul className="flex flex-col gap-3">
                                {SERVICES.map(({ label, href }) => (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            className="text-sm font-light uppercase tracking-wide transition-all duration-200 hover:translate-x-1 hover:opacity-100 inline-block"
                                            style={{ opacity: 0.75 }}
                                        >
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>

                    {/* Column 4 — Get in touch */}
                    <FadeIn delay={0.35} y={20}>
                        <div className="flex flex-col gap-4">
                            <h4 className="font-semibold uppercase tracking-wider text-xs opacity-50">
                                Get in Touch
                            </h4>
                            <a
                                href="mailto:hasanhameed858@gmail.com"
                                className="text-sm font-light leading-relaxed hover:underline underline-offset-4"
                                style={{ opacity: 0.75 }}
                            >
                                hasanhameed858@gmail.com
                            </a>
                            <p
                                className="text-sm font-light leading-relaxed"
                                style={{ opacity: 0.6 }}
                            >
                                Open to freelance projects and full-time
                                opportunities worldwide.
                            </p>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 mt-2 px-5 py-2.5 rounded-full border border-white/20 text-xs font-bold uppercase tracking-wider transition-all duration-200 hover:bg-white/10 hover:border-white/40 w-fit"
                            >
                                Start a project
                            </a>
                        </div>
                    </FadeIn>
                </div>

                {/* Bottom strip */}
                <div
                    className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
                    style={{ borderTop: "1px solid rgba(215, 226, 234, 0.1)" }}
                >
                    <p className="text-xs font-light uppercase tracking-wider opacity-50">
                        © {new Date().getFullYear()} Hasan Hameed. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a
                            href="#"
                            className="text-xs font-light uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity"
                        >
                            Privacy
                        </a>
                        <a
                            href="#"
                            className="text-xs font-light uppercase tracking-wider opacity-50 hover:opacity-100 transition-opacity"
                        >
                            Terms
                        </a>
                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            className="w-9 h-9 flex items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all duration-200 hover:bg-white/10 hover:border-white/30 hover:-translate-y-0.5"
                        >
                            <ArrowUp size={14} strokeWidth={1.5} />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
