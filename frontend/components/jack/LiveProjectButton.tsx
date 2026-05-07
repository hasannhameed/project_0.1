"use client";

type LiveProjectButtonProps = {
    label?: string;
    href?: string;
    className?: string;
};

export default function LiveProjectButton({
    label = "Live Project",
    href,
    className = "",
}: LiveProjectButtonProps) {
    const classes = `inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest transition-colors duration-200 hover:bg-[#D7E2EA]/10 px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base ${className}`;

    if (href) {
        return (
            <a href={href} target="_blank" rel="noreferrer" className={classes}>
                {label}
            </a>
        );
    }

    return (
        <button type="button" className={classes}>
            {label}
        </button>
    );
}
