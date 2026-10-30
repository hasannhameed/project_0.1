import Section from "./Section";
import { SKILL_GROUPS } from "@/lib/profile";

export default function SkillsSection() {
    return (
        <Section
            id="skills"
            eyebrow="tech stack"
            title={
                <>
                    My <span className="text-brand">Skills</span>
                </>
            }
        >
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {SKILL_GROUPS.map((g) => (
                    <div key={g.group}>
                        <h3 className="mb-4 text-sm font-semibold tracking-[2px] text-white/50 uppercase">
                            {g.group}
                        </h3>
                        <ul className="flex flex-wrap gap-2">
                            {g.items.map((item) => (
                                <li
                                    key={item}
                                    className="rounded-full border border-brand/40 px-3 py-1 text-sm text-white/85 transition duration-300 hover:border-brand hover:bg-brand hover:text-black"
                                >
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </Section>
    );
}
