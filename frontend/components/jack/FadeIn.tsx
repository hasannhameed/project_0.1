"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeInTag = "div" | "section" | "article" | "nav" | "header" | "footer" | "ul" | "li" | "p" | "span" | "h1" | "h2" | "h3";

type FadeInProps = {
    as?: FadeInTag;
    children: ReactNode;
    delay?: number;
    duration?: number;
    x?: number;
    y?: number;
    className?: string;
    style?: React.CSSProperties;
} & Omit<HTMLMotionProps<"div">, "children" | "style" | "className">;

const MOTION_TAGS = {
    div: motion.div,
    section: motion.section,
    article: motion.article,
    nav: motion.nav,
    header: motion.header,
    footer: motion.footer,
    ul: motion.ul,
    li: motion.li,
    p: motion.p,
    span: motion.span,
    h1: motion.h1,
    h2: motion.h2,
    h3: motion.h3,
} as const;

export default function FadeIn({
    as = "div",
    children,
    delay = 0,
    duration = 0.7,
    x = 0,
    y = 30,
    className,
    style,
    ...rest
}: FadeInProps) {
    const MotionTag = MOTION_TAGS[as] as typeof motion.div;

    return (
        <MotionTag
            initial={{ opacity: 0, x, y }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "50px", amount: 0 }}
            transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
            className={className}
            style={style}
            {...rest}
        >
            {children}
        </MotionTag>
    );
}
