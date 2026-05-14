"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type AnimatedTextProps = {
    text: string;
    className?: string;
    style?: React.CSSProperties;
};

type AnimatedCharProps = {
    char: string;
    progress: ReturnType<typeof useScroll>["scrollYProgress"];
    range: [number, number];
};

function AnimatedChar({ char, progress, range }: AnimatedCharProps) {
    const opacity = useTransform(progress, range, [0.2, 1]);
    return (
        <span className="relative inline-block whitespace-pre">
            <span aria-hidden className="opacity-0">
                {char}
            </span>
            <motion.span
                aria-hidden
                style={{ opacity }}
                className="absolute left-0 top-0"
            >
                {char}
            </motion.span>
        </span>
    );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
    const ref = useRef<HTMLParagraphElement | null>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.8", "end 0.2"],
    });

    const chars = Array.from(text);
    const total = chars.length;

    return (
        <p ref={ref} className={className} style={style} aria-label={text}>
            {chars.map((c, i) => {
                const start = i / total;
                const end = (i + 1) / total;
                return (
                    <AnimatedChar
                        key={i}
                        char={c}
                        progress={scrollYProgress}
                        range={[start, end]}
                    />
                );
            })}
        </p>
    );
}
