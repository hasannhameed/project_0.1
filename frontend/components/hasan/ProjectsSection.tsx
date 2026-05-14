"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import LiveProjectButton from "./LiveProjectButton";

type ProjectImage = string;

type Project = {
    number: string;
    name: string;
    category: string;
    images: { col1Top: ProjectImage; col1Bottom: ProjectImage; col2: ProjectImage };
};

const PROJECTS: Project[] = [
    {
        number: "01",
        name: "Nextlevel Studio",
        category: "Client",
        images: {
            col1Top:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85",
            col1Bottom:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85",
        },
    },
    {
        number: "02",
        name: "Aura Brand Identity",
        category: "Personal",
        images: {
            col1Top:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85",
            col1Bottom:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85",
        },
    },
    {
        number: "03",
        name: "Solaris Digital",
        category: "Client",
        images: {
            col1Top:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85",
            col1Bottom:
                "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85",
            col2: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85",
        },
    },
];

function ProjectCard({
    project,
    index,
    total,
}: {
    project: Project;
    index: number;
    total: number;
}) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    const targetScale = 1 - (total - 1 - index) * 0.03;
    const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

    return (
        <div
            ref={containerRef}
            className="h-[100vh] flex items-center justify-center sticky top-0"
        >
            <motion.article
                style={{
                    scale,
                    top: `${index * 28}px`,
                }}
                className="relative w-full p-4 sm:p-6 md:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
            >
                <div
                    className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px] p-4 sm:p-6 md:p-8 border-2"
                    style={{
                        background: "#0C0C0C",
                        borderColor: "#D7E2EA",
                    }}
                >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-6 sm:mb-8">
                        <div className="flex items-start gap-4 sm:gap-6 md:gap-8 flex-1">
                            <span
                                className="font-black"
                                style={{
                                    color: "#D7E2EA",
                                    fontSize: "clamp(3rem, 10vw, 140px)",
                                    lineHeight: 0.85,
                                }}
                            >
                                {project.number}
                            </span>
                            <div className="flex flex-col gap-2 sm:gap-3 pt-2">
                                <span
                                    className="font-light uppercase tracking-widest text-xs sm:text-sm"
                                    style={{ color: "#D7E2EA", opacity: 0.7 }}
                                >
                                    {project.category}
                                </span>
                                <h3
                                    className="font-medium uppercase"
                                    style={{
                                        color: "#D7E2EA",
                                        fontSize: "clamp(1.25rem, 2.6vw, 2.4rem)",
                                        lineHeight: 1.05,
                                    }}
                                >
                                    {project.name}
                                </h3>
                            </div>
                        </div>
                        <div className="self-start sm:self-center">
                            <LiveProjectButton />
                        </div>
                    </div>

                    <div className="flex gap-3 sm:gap-4 md:gap-5">
                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5" style={{ width: "40%" }}>
                            <div
                                className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                                style={{ height: "clamp(130px, 16vw, 230px)" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.images.col1Top}
                                    alt={`${project.name} preview 1`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                            <div
                                className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                                style={{ height: "clamp(160px, 22vw, 340px)" }}
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={project.images.col1Bottom}
                                    alt={`${project.name} preview 2`}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                        <div
                            className="overflow-hidden rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                            style={{ width: "60%" }}
                        >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={project.images.col2}
                                alt={`${project.name} preview 3`}
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </motion.article>
        </div>
    );
}

export default function ProjectsSection() {
    return (
        <section
            id="projects"
            className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10"
            style={{ background: "#0C0C0C" }}
        >
            <h2
                className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20 md:mb-24"
                style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
            >
                Project
            </h2>

            <div className="max-w-7xl mx-auto">
                {PROJECTS.map((p, i) => (
                    <ProjectCard
                        key={p.number}
                        project={p}
                        index={i}
                        total={PROJECTS.length}
                    />
                ))}
            </div>
        </section>
    );
}
