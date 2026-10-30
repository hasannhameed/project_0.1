import Section from "./Section";
import { SERVICES } from "@/lib/profile";

export default function ServicesSection() {
    return (
        <Section
            id="services"
            eyebrow="what i do"
            title={
                <>
                    My <span className="text-brand">Services</span>
                </>
            }
        >
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {SERVICES.map((s) => (
                    <article
                        key={s.title}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_0_25px_rgba(183,75,75,0.25)]"
                    >
                        <h3 className="text-lg font-semibold text-brand">{s.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-white/70">
                            {s.body}
                        </p>
                    </article>
                ))}
            </div>
        </Section>
    );
}
