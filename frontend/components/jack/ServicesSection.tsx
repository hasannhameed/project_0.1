"use client";

import FadeIn from "./FadeIn";

const SERVICES = [
    {
        number: "01",
        name: "Frontend Development",
        description:
            "Building highly interactive, responsive, and accessible user interfaces using React, Next.js, and modern CSS frameworks.",
    },
    {
        number: "02",
        name: "Backend Architecture",
        description:
            "Designing scalable APIs, robust database structures, and secure server-side logic to power complex web applications.",
    },
    {
        number: "03",
        name: "Database Design",
        description:
            "Structuring and optimizing relational and NoSQL databases to ensure fast, reliable, and secure data storage.",
    },
    {
        number: "04",
        name: "Cloud Deployment",
        description:
            "Deploying applications to platforms like Vercel and AWS, managing CI/CD pipelines, and ensuring high availability.",
    },
    {
        number: "05",
        name: "API Integration",
        description:
            "Connecting third-party services, payment gateways, and external data sources seamlessly into your product.",
    },
];

export default function ServicesSection() {
    return (
        <section
            id="services"
            className="relative px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px]"
            style={{ background: "#FFFFFF", color: "#0C0C0C" }}
        >
            <h2
                className="font-black uppercase text-center mb-16 sm:mb-20 md:mb-28"
                style={{
                    color: "#0C0C0C",
                    fontSize: "clamp(3rem, 12vw, 160px)",
                    lineHeight: 1,
                }}
            >
                Services
            </h2>

            <div className="max-w-5xl mx-auto">
                {SERVICES.map((s, i) => (
                    <FadeIn
                        key={s.number}
                        delay={i * 0.1}
                        y={30}
                        className="flex items-start gap-6 sm:gap-10 md:gap-14 py-8 sm:py-10 md:py-12"
                        style={{
                            borderTop:
                                i === 0 ? "1px solid rgba(12, 12, 12, 0.15)" : "none",
                            borderBottom: "1px solid rgba(12, 12, 12, 0.15)",
                        }}
                    >
                        <span
                            className="font-black"
                            style={{
                                color: "#0C0C0C",
                                fontSize: "clamp(3rem, 10vw, 140px)",
                                lineHeight: 1,
                            }}
                        >
                            {s.number}
                        </span>
                        <div className="flex flex-col gap-3 sm:gap-4 md:gap-5 flex-1">
                            <h3
                                className="font-medium uppercase"
                                style={{ fontSize: "clamp(1rem, 2.2vw, 2.1rem)", lineHeight: 1.1 }}
                            >
                                {s.name}
                            </h3>
                            <p
                                className="font-light leading-relaxed max-w-2xl"
                                style={{
                                    fontSize: "clamp(0.85rem, 1.6vw, 1.25rem)",
                                    opacity: 0.6,
                                }}
                            >
                                {s.description}
                            </p>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
