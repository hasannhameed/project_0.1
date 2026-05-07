"use client";

import FadeIn from "./FadeIn";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="relative px-5 sm:px-8 md:px-10 py-24 sm:py-32 md:py-40"
            style={{ background: "#0C0C0C", borderTop: "1px solid rgba(215, 226, 234, 0.1)" }}
        >
            <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
                <FadeIn delay={0.1} y={30}>
                    <h2
                        className="hero-heading font-black uppercase leading-none tracking-tight mb-6 sm:mb-8"
                        style={{ fontSize: "clamp(3rem, 10vw, 130px)" }}
                    >
                        Let&apos;s Talk
                    </h2>
                </FadeIn>

                <FadeIn delay={0.2} y={30}>
                    <p
                        className="font-light text-lg sm:text-xl md:text-2xl max-w-2xl mb-12 sm:mb-16"
                        style={{ color: "#D7E2EA", opacity: 0.8 }}
                    >
                        Ready to build your next fullstack application? Send me an email and let&apos;s get started.
                    </p>
                </FadeIn>

                <FadeIn delay={0.3} y={30}>
                    <a
                        href="mailto:hasanhameed858@gmail.com"
                        className="group relative inline-flex items-center justify-center px-8 py-5 sm:px-12 sm:py-6 rounded-full overflow-hidden transition-transform duration-300 hover:scale-105"
                        style={{ background: "#D7E2EA", color: "#0C0C0C" }}
                    >
                        <span className="font-bold uppercase tracking-wider text-base sm:text-lg z-10">
                            hasanhameed858@gmail.com
                        </span>
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity z-0"></div>
                    </a>
                </FadeIn>
            </div>
        </section>
    );
}
