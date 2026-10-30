"use client";

import { useEffect, useState } from "react";

import { PROFILE } from "@/lib/profile";

const ROLES = PROFILE.roles;

const INTERVAL_MS = 4000;

// The original cycled these by animating the `content` of a ::before, which
// screen readers skip and which can't pause. Same 4s cadence, real text.
export default function TypingRoles() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setIndex((i) => (i + 1) % ROLES.length),
            INTERVAL_MS,
        );
        return () => clearInterval(id);
    }, []);

    return (
        <span className="relative inline-block text-brand">
            <span aria-live="polite">{ROLES[index]}</span>
            <span
                aria-hidden
                className="ml-1 inline-block w-[3px] animate-pulse self-stretch bg-brand align-middle"
                style={{ height: "1em" }}
            />
        </span>
    );
}
