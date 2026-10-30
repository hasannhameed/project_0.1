import Image from "next/image";

import TypingRoles from "./TypingRoles";
import { PROFILE } from "@/lib/profile";

const SOCIALS = [
    {
        label: "LinkedIn",
        href: "#",
        path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13Zm1.78 13.02H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z",
    },
    {
        label: "GitHub",
        href: "#",
        path: "M12 .3a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.57v-2.17c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .31.22.68.83.57A12 12 0 0 0 12 .3Z",
    },
    {
        label: "X",
        href: "#",
        path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.64 7.58H.48l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41Z",
    },
    {
        label: "Instagram",
        href: "#",
        path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.39A5.9 5.9 0 0 0 .63 4.14c-.3.76-.5 1.64-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.39 2.12a5.9 5.9 0 0 0 2.12 1.39c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.12-1.39 5.9 5.9 0 0 0 1.39-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.39-2.12A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0Zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z",
    },
];

export default function HeroSection() {
    return (
        <section
            id="home"
            className="flex min-h-screen flex-col-reverse items-center justify-center gap-8 bg-black px-[9%] py-12 min-[995px]:flex-row min-[995px]:gap-20 min-[995px]:py-20"
        >
            <div className="max-w-2xl">
                <h1 className="text-[40px] leading-[1.3] font-bold sm:text-[60px]">
                    Hi, It&apos;s <span className="text-brand">{PROFILE.name}</span>
                </h1>

                <h3 className="mb-4 min-h-[1.3em] text-[26px] font-semibold sm:text-[34px]">
                    I&apos;m a <TypingRoles />
                </h3>

                <p className="text-base leading-relaxed text-white/80">
                    {PROFILE.intro}
                </p>

                <div className="my-[30px] flex flex-wrap gap-[15px]">
                    {SOCIALS.map((s) => (
                        <a
                            key={s.label}
                            href={s.href}
                            aria-label={s.label}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand text-brand transition duration-300 hover:-translate-y-[5px] hover:scale-125 hover:bg-brand hover:text-black hover:shadow-[0_0_25px_var(--brand)]"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                aria-hidden
                                className="h-5 w-5"
                            >
                                <path d={s.path} />
                            </svg>
                        </a>
                    ))}
                </div>

            </div>

            {/* The artwork already has its own circular moon, so it stays a
                rounded rectangle rather than taking the template's circle crop. */}
            <div className="relative w-[80vw] max-w-[440px] shrink-0 min-[995px]:w-[36vw]">
                <div
                    aria-hidden
                    className="absolute inset-6 rounded-full bg-brand/30 blur-3xl"
                />
                <Image
                    src="/hero-art.webp"
                    alt=""
                    width={735}
                    height={977}
                    priority
                    className="relative h-auto w-full rounded-3xl border border-brand/20 shadow-[0_0_45px_rgba(183,75,75,0.3)]"
                />
            </div>
        </section>
    );
}
