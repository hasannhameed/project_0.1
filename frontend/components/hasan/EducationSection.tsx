import Section from "./Section";
import { EDUCATION } from "@/lib/profile";

export default function EducationSection() {
    return (
        <Section
            id="education"
            eyebrow="background"
            title={
                <>
                    My <span className="text-brand">Education</span>
                </>
            }
        >
            <div className="grid gap-6 sm:grid-cols-2">
                {EDUCATION.map((e) => (
                    <article
                        key={e.qualification}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:border-brand"
                    >
                        <div className="flex items-baseline justify-between gap-4">
                            <h3 className="text-xl font-semibold text-brand">
                                {e.qualification}
                            </h3>
                            <span className="text-sm text-white/50">{e.period}</span>
                        </div>
                        <p className="mt-2 text-sm text-white/80">{e.detail}</p>
                        <p className="mt-1 text-sm text-white/60">{e.institution}</p>
                    </article>
                ))}
            </div>
        </Section>
    );
}
