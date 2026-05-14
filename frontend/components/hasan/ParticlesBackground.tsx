"use client";

import { useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const options: ISourceOptions = {
    background: { color: { value: "#0c0c0c" } },
    fpsLimit: 60,
    fullScreen: { enable: false },
    detectRetina: true,
    interactivity: {
        events: {
            onHover: { enable: true, mode: "grab" },
            resize: { enable: true },
        },
        modes: {
            grab: { distance: 160, links: { opacity: 0.4 } },
        },
    },
    particles: {
        color: { value: "#D7E2EA" },
        links: {
            color: "#D7E2EA",
            distance: 140,
            enable: true,
            opacity: 0.18,
            width: 1,
        },
        move: {
            enable: true,
            direction: "none",
            outModes: { default: "bounce" },
            random: false,
            speed: 0.6,
            straight: false,
        },
        number: {
            density: { enable: true, width: 1920, height: 1080 },
            value: 90,
        },
        opacity: { value: 0.45 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2.5 } },
    },
};

export default function ParticlesBackground() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => setReady(true));
    }, []);

    if (!ready) return null;

    return (
        <Particles
            id="hero-particles"
            options={options}
            className="absolute inset-0 z-0"
        />
    );
}
