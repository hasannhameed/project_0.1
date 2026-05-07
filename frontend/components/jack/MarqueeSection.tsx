"use client";

import { useEffect, useRef, useState } from "react";

const ALL_IMAGES = [
    "https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif",
    "https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif",
    "https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif",
    "https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif",
    "https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif",
    "https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif",
    "https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif",
    "https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif",
    "https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif",
    "https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif",
    "https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif",
    "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
    "https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif",
    "https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif",
    "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
    "https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif",
    "https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif",
    "https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif",
    "https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif",
    "https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif",
];

const ROW_1 = ALL_IMAGES.slice(0, 11);
const ROW_2 = ALL_IMAGES.slice(11);

export default function MarqueeSection() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const handleScroll = () => {
            const rect = section.getBoundingClientRect();
            const sectionTop = window.scrollY + rect.top;
            const next = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(next);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const row1Tripled = [...ROW_1, ...ROW_1, ...ROW_1];
    const row2Tripled = [...ROW_2, ...ROW_2, ...ROW_2];

    const row1Translate = `translateX(${offset - 200}px)`;
    const row2Translate = `translateX(${-(offset - 200)}px)`;

    return (
        <section
            ref={sectionRef}
            className="relative pt-24 sm:pt-32 md:pt-40 pb-10"
            style={{ background: "#0C0C0C", overflow: "hidden" }}
        >
            <div className="flex flex-col gap-3">
                <div
                    className="flex gap-3 flex-nowrap"
                    style={{ transform: row1Translate, willChange: "transform" }}
                >
                    {row1Tripled.map((src, i) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            key={`r1-${i}`}
                            src={src}
                            alt=""
                            loading="lazy"
                            className="rounded-2xl object-cover flex-shrink-0"
                            style={{ width: "420px", height: "270px" }}
                        />
                    ))}
                </div>
                <div
                    className="flex gap-3 flex-nowrap"
                    style={{ transform: row2Translate, willChange: "transform" }}
                >
                    {row2Tripled.map((src, i) => (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img
                            key={`r2-${i}`}
                            src={src}
                            alt=""
                            loading="lazy"
                            className="rounded-2xl object-cover flex-shrink-0"
                            style={{ width: "420px", height: "270px" }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
