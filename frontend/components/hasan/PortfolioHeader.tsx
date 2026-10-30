"use client";

import { useState } from "react";

const LINKS = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Skills", href: "#skills" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

// The source design set html{font-size:62.5%} so 1rem meant 10px. That would
// shrink type across the rest of the site, so sizes here are plain pixels.
export default function PortfolioHeader() {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState("Home");

    return (
        <header className="fixed top-0 left-0 z-[100] flex w-full items-center justify-between px-[9%] py-5">
            <a
                href="#home"
                className="text-[30px] font-extrabold text-brand transition duration-500 hover:scale-110"
            >
                Hasan
            </a>

            {/* The template hid the nav below 995px with no way to reopen it. */}
            <button
                type="button"
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="text-[28px] leading-none text-brand min-[995px]:hidden"
            >
                {open ? "✕" : "☰"}
            </button>

            <nav
                className={`${open ? "block" : "hidden"} absolute top-full right-0 w-2/5 rounded-bl-[2rem] border-b-[3px] border-l-[3px] border-brand bg-[#161616] px-4 min-[995px]:static min-[995px]:block min-[995px]:w-auto min-[995px]:rounded-none min-[995px]:border-0 min-[995px]:bg-transparent min-[995px]:px-0`}
            >
                {LINKS.map((link) => {
                    const isActive = link.label === active;
                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            onClick={() => {
                                setActive(link.label);
                                setOpen(false);
                            }}
                            className={`my-[30px] block border-b-[3px] text-[20px] font-medium transition-colors duration-300 min-[995px]:my-0 min-[995px]:ml-10 min-[995px]:inline-block min-[995px]:text-[18px] ${
                                isActive
                                    ? "border-brand text-brand"
                                    : "border-transparent text-white hover:border-brand hover:text-brand"
                            }`}
                        >
                            {link.label}
                        </a>
                    );
                })}
            </nav>
        </header>
    );
}
