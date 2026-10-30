// Shared shell for every portfolio section. scroll-mt clears the fixed header
// so anchor links don't land underneath it.
export default function Section({
    id,
    eyebrow,
    title,
    children,
}: {
    id: string;
    eyebrow: string;
    title: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24 px-[9%] py-12 sm:py-24">
            <p className="text-xs font-semibold tracking-[4px] text-brand uppercase">
                {eyebrow}
            </p>
            <h2 className="mt-2 mb-8 text-[32px] font-bold sm:mb-12 sm:text-[42px]">{title}</h2>
            {children}
        </section>
    );
}
