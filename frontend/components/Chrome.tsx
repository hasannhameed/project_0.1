"use client";

import { usePathname } from "next/navigation";

export default function Chrome({
    navbar,
    footer,
    children,
}: {
    navbar: React.ReactNode;
    footer: React.ReactNode;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isJackHome = pathname === "/";

    return (
        <>
            {!isJackHome && navbar}
            <div className="flex-1">{children}</div>
            {!isJackHome && footer}
        </>
    );
}
