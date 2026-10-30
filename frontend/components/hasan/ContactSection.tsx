import Section from "./Section";
import { PROFILE } from "@/lib/profile";

export default function ContactSection() {
    return (
        <Section
            id="contact"
            eyebrow="get in touch"
            title={
                <>
                    Contact <span className="text-brand">Me</span>
                </>
            }
        >
            <p className="max-w-xl text-white/70">
                Have a project in mind, or a directory or membership platform that needs
                building? Send me a line and I&apos;ll get back to you.
            </p>

            <a
                href={`mailto:${PROFILE.email}`}
                className="mt-8 inline-block rounded-[40px] border-2 border-brand bg-black px-7 py-[10px] text-base font-semibold tracking-[2px] text-brand transition duration-300 hover:scale-105 hover:bg-brand hover:text-black hover:shadow-[0_0_25px_var(--brand)]"
            >
                {PROFILE.email}
            </a>
        </Section>
    );
}
