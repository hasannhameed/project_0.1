import Section from "./Section";
import { EXPERIENCE } from "@/lib/profile";

export default function ExperienceSection() {
    return (
        <Section
            id="experience"
            eyebrow="where i've worked"
            title={
                <>
                    My <span className="text-brand">Experience</span>
                </>
            }
        >
            <ol className="relative border-l border-white/15 pl-6">
                {EXPERIENCE.map((job) => (
                    <li key={job.role} className="mb-10 last:mb-0">
                        <span
                            aria-hidden
                            className="absolute -left-[6px] mt-2 h-3 w-3 rounded-full bg-brand"
                        />
                        <div className="flex flex-wrap items-baseline gap-x-3">
                            <h3 className="text-xl font-semibold text-brand">{job.role}</h3>
                            <span className="text-sm text-white/50">{job.period}</span>
                        </div>
                        <ul className="mt-3 space-y-1.5">
                            {job.points.map((p) => (
                                <li
                                    key={p}
                                    className="text-sm leading-relaxed text-white/75 before:mr-2 before:text-brand before:content-['▹']"
                                >
                                    {p}
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
