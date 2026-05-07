"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type MagnetProps = {
    children: ReactNode;
    padding?: number;
    strength?: number;
    activeTransition?: string;
    inactiveTransition?: string;
    className?: string;
    style?: React.CSSProperties;
};

export default function Magnet({
    children,
    padding = 150,
    strength = 3,
    activeTransition = "transform 0.3s ease-out",
    inactiveTransition = "transform 0.6s ease-in-out",
    className,
    style,
}: MagnetProps) {
    const ref = useRef<HTMLDivElement | null>(null);
    const [transform, setTransform] = useState("translate3d(0px, 0px, 0)");
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const handleMove = (e: MouseEvent) => {
            const rect = el.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;

            const withinX = Math.abs(dx) < rect.width / 2 + padding;
            const withinY = Math.abs(dy) < rect.height / 2 + padding;

            if (withinX && withinY) {
                setIsActive(true);
                setTransform(`translate3d(${dx / strength}px, ${dy / strength}px, 0)`);
            } else {
                setIsActive(false);
                setTransform("translate3d(0px, 0px, 0)");
            }
        };

        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [padding, strength]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                ...style,
                transform,
                transition: isActive ? activeTransition : inactiveTransition,
                willChange: "transform",
            }}
        >
            {children}
        </div>
    );
}
