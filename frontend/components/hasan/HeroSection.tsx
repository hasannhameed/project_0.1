"use client";

import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import ParticlesBackground from "./ParticlesBackground";

const NAV_LINKS = ["About", "Services", "Price", "Projects", "Contact"];

export default function HeroSection() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative h-screen flex flex-col" style={{ overflowX: "clip", background: "#0c0c0c" }}>
            {mounted && (
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <ParticlesBackground />
                    {/* Subtle dark overlay for text contrast */}
                    <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
                </div>
            )}

            <div className="relative z-20 flex flex-col h-full">
                <FadeIn
                    as="nav"
                    delay={0}
                    y={-20}
                    className="flex justify-center w-full pt-6 md:pt-8 px-4"
                >
                    <div className="flex justify-between items-center gap-6 sm:gap-10 px-8 py-4 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link}
                                href={`#${link.toLowerCase()}`}
                                className="text-sm md:text-base font-medium uppercase tracking-wider transition-all duration-200 hover:text-white opacity-80 hover:opacity-100 hover:scale-105"
                                style={{ color: "#D7E2EA" }}
                            >
                                {link}
                            </a>
                        ))}
                    </div>
                </FadeIn>

                <div className="flex-1 relative flex flex-col">
                    <div className="relative w-full flex-1 flex flex-col items-center justify-center pb-12 sm:pb-20">
                        <FadeIn delay={0.15} y={40} className="w-full">
                            <h1
                                className="hero-heading text-center font-black uppercase tracking-tight leading-none w-full text-[20vw] sm:text-[13vw] md:text-[14vw] lg:text-[15vw]"
                            >
                                <span className="block sm:inline">Hi, i&apos;m</span>{" "}
                                <span className="block sm:inline">hasan</span>
                            </h1>
                        </FadeIn>

                        <div className="flex flex-col items-center justify-center gap-6 sm:gap-8 mt-6 sm:mt-10 px-6">
                            <FadeIn delay={0.35} y={20}>
                                <p
                                    className="font-light uppercase tracking-wide leading-snug max-w-[280px] sm:max-w-[400px] text-center"
                                    style={{
                                        color: "#D7E2EA",
                                        fontSize: "clamp(0.9rem, 1.6vw, 1.3rem)",
                                    }}
                                >
                                    a fullstack developer driven by crafting scalable and unforgettable applications
                                </p>
                            </FadeIn>
                            <FadeIn delay={0.5} y={20}>
                                <ContactButton />
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
