"use client";

import { Code2, Server, Database, Layers, Cloud, GitBranch } from "lucide-react";
import FadeIn from "./FadeIn";

const SKILLS = [
    {
        icon: Code2,
        title: "Frontend",
        blurb: "Modern, responsive interfaces with thoughtful UX and Gen-Z aesthetics.",
        items: ["React", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Responsive"],
    },
    {
        icon: Server,
        title: "Backend",
        blurb: "REST APIs, auth flows, and reliable server logic in Node.",
        items: ["Node.js", "Express.js", "REST APIs", "Auth", "CORS", "Env Configs"],
    },
    {
        icon: Database,
        title: "Database",
        blurb: "Relational and cloud-first data layers, end-to-end.",
        items: ["PostgreSQL", "Firebase", "Firestore", "CRUD", "API + DB"],
    },
    {
        icon: Layers,
        title: "Full Stack",
        blurb: "Shipping real products from frontend to deploy, MERN-style.",
        items: ["React + Node", "Next + Express", "Architecture", "Integration"],
    },
    {
        icon: Cloud,
        title: "DevOps & Deploy",
        blurb: "Production deploys, debugging live, keeping things healthy.",
        items: ["Vercel", "Render", "GitHub", "Git", "SSL", "Env Vars"],
    },
    {
        icon: GitBranch,
        title: "Other Stacks",
        blurb: "Comfortable beyond the JavaScript world.",
        items: ["PHP", "CodeIgniter"],
    },
];

export default function SkillsSection() {
    return (
        <section
            id="skills"
            className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10"
            style={{ background: "#0C0C0C" }}
        >
            <div className="max-w-7xl mx-auto">
                <FadeIn delay={0} y={30} className="flex flex-col items-center gap-4 sm:gap-6 mb-14 sm:mb-20 md:mb-24">
                    <span
                        className="text-xs sm:text-sm uppercase tracking-[0.35em] font-light"
                        style={{ color: "#D7E2EA", opacity: 0.6 }}
                    >
                        Tech Stack
                    </span>
                    <h2
                        className="hero-heading font-black uppercase leading-none tracking-tight text-center"
                        style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
                    >
                        Skills
                    </h2>
                    <p
                        className="font-light text-center max-w-[560px] leading-relaxed"
                        style={{
                            color: "#D7E2EA",
                            opacity: 0.7,
                            fontSize: "clamp(0.9rem, 1.5vw, 1.15rem)",
                        }}
                    >
                        A modern full-stack toolkit -- from polished frontends to deployed APIs, databases, and live production systems.
                    </p>
                </FadeIn>

                <div className="grid gap-5 sm:gap-6 md:gap-7 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {SKILLS.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <FadeIn
                                key={skill.title}
                                delay={i * 0.08}
                                y={30}
                                className="group relative overflow-hidden rounded-[28px] sm:rounded-[32px] md:rounded-[36px] p-6 sm:p-7 md:p-8 transition-colors duration-300 hover:border-[#D7E2EA]/60"
                                style={{
                                    background:
                                        "linear-gradient(160deg, rgba(215, 226, 234, 0.04) 0%, rgba(215, 226, 234, 0.01) 100%)",
                                    border: "1px solid rgba(215, 226, 234, 0.15)",
                                }}
                            >
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                                    style={{
                                        background:
                                            "radial-gradient(circle, rgba(182, 0, 168, 0.18) 0%, transparent 70%)",
                                    }}
                                />

                                <div className="relative flex flex-col gap-5">
                                    <div
                                        className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl transition-transform duration-500 group-hover:scale-110"
                                        style={{
                                            background:
                                                "linear-gradient(135deg, rgba(215, 226, 234, 0.12), rgba(215, 226, 234, 0.04))",
                                            border: "1px solid rgba(215, 226, 234, 0.2)",
                                        }}
                                    >
                                        <Icon
                                            className="h-6 w-6 sm:h-7 sm:w-7"
                                            style={{ color: "#D7E2EA" }}
                                            strokeWidth={1.5}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h3
                                            className="font-medium uppercase tracking-wider"
                                            style={{
                                                color: "#D7E2EA",
                                                fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
                                            }}
                                        >
                                            {skill.title}
                                        </h3>
                                        <p
                                            className="font-light leading-relaxed"
                                            style={{
                                                color: "#D7E2EA",
                                                opacity: 0.6,
                                                fontSize: "clamp(0.8rem, 1.1vw, 0.95rem)",
                                            }}
                                        >
                                            {skill.blurb}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {skill.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-[10px] sm:text-xs uppercase tracking-wider font-light px-3 py-1.5 rounded-full transition-colors duration-200 group-hover:border-[#D7E2EA]/40"
                                                style={{
                                                    color: "#D7E2EA",
                                                    border: "1px solid rgba(215, 226, 234, 0.18)",
                                                    background: "rgba(215, 226, 234, 0.03)",
                                                }}
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
