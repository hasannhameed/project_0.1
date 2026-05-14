"use client";

import FadeIn from "./FadeIn";

const PLANS = [
    {
        name: "MVP Development",
        price: "Custom",
        description: "Perfect for startups and founders looking to launch their product quickly.",
        features: [
            "Fullstack Web App",
            "Database Design",
            "Authentication",
            "Responsive UI/UX",
            "Source Code Delivery"
        ],
        highlighted: false,
    },
    {
        name: "Monthly Retainer",
        price: "$100/mo",
        description: "Ongoing development, scaling, and maintenance for your application.",
        features: [
            "Priority Bug Fixes",
            "Feature Additions",
            "Performance Optimization",
            "Server Maintenance",
            "Dedicated Support"
        ],
        highlighted: true,
    },
    {
        name: "Enterprise Level",
        price: "Custom",
        description: "Complex, scalable fullstack architectures for large businesses.",
        features: [
            "Microservices Architecture",
            "Custom API Integrations",
            "Cloud Infrastructure",
            "High Availability",
            "Dedicated Dev Team"
        ],
        highlighted: false,
    }
];

export default function PricingSection() {
    return (
        <section
            id="price"
            className="relative px-4 sm:px-6 md:px-10 py-20 sm:py-24 md:py-32 z-10"
            style={{ background: "#0C0C0C" }}
        >
            <FadeIn delay={0.1} y={40}>
                <h2
                    className="hero-heading font-black uppercase leading-none tracking-tight text-center mb-16 sm:mb-20"
                    style={{ fontSize: "clamp(3rem, 10vw, 130px)" }}
                >
                    Pricing
                </h2>
            </FadeIn>

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {PLANS.map((plan, i) => (
                    <FadeIn key={plan.name} delay={0.2 + i * 0.15} y={30} className={plan.highlighted ? "md:-mt-8 md:mb-8" : ""}>
                        <div
                            className={`flex flex-col h-full rounded-[40px] sm:rounded-[50px] p-8 sm:p-10 border-2 transition-transform duration-300 hover:-translate-y-2`}
                            style={{
                                background: plan.highlighted ? "#D7E2EA" : "#0C0C0C",
                                borderColor: "#D7E2EA",
                                color: plan.highlighted ? "#0C0C0C" : "#D7E2EA"
                            }}
                        >
                            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-2">
                                {plan.name}
                            </h3>
                            <div className="text-4xl sm:text-5xl font-black mb-4">
                                {plan.price}
                            </div>
                            <p className="font-light opacity-80 mb-8 leading-relaxed">
                                {plan.description}
                            </p>

                            <ul className="flex flex-col gap-4 mb-10 flex-1">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3 font-medium">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                className="w-full py-4 rounded-full font-bold uppercase tracking-wider text-sm transition-opacity hover:opacity-80 border-2"
                                style={{
                                    background: plan.highlighted ? "#0C0C0C" : "#D7E2EA",
                                    color: plan.highlighted ? "#D7E2EA" : "#0C0C0C",
                                    borderColor: plan.highlighted ? "#0C0C0C" : "#D7E2EA"
                                }}
                            >
                                Get Started
                            </button>
                        </div>
                    </FadeIn>
                ))}
            </div>
        </section>
    );
}
