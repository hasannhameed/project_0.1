"use client";

import FadeIn from "./FadeIn";
import AnimatedText from "./AnimatedText";
import ContactButton from "./ContactButton";

const MOON =
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png";
const P59 =
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png";
const LEGO =
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png";
const GROUP_134 =
    "https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png";

const ABOUT_TEXT =
    "With two years of experience in fullstack development, i focus on building scalable web apps, robust APIs, and seamless user experiences, i truly enjoy working with businesses that aim to stand out and build real solutions. Let&apos;s build something incredible together!";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20 gap-10 sm:gap-14 md:gap-16"
            style={{ background: "#0C0C0C" }}
        >
            <FadeIn
                delay={0.1}
                x={-80}
                y={0}
                duration={0.9}
                className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={MOON} alt="" className="w-full h-auto" />
            </FadeIn>

            <FadeIn
                delay={0.15}
                x={80}
                y={0}
                duration={0.9}
                className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] w-[120px] sm:w-[160px] md:w-[210px]"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={LEGO} alt="" className="w-full h-auto" />
            </FadeIn>

            <FadeIn
                delay={0.25}
                x={-80}
                y={0}
                duration={0.9}
                className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] w-[100px] sm:w-[140px] md:w-[180px]"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={P59} alt="" className="w-full h-auto" />
            </FadeIn>

            <FadeIn
                delay={0.3}
                x={80}
                y={0}
                duration={0.9}
                className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] w-[130px] sm:w-[170px] md:w-[220px]"
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={GROUP_134} alt="" className="w-full h-auto" />
            </FadeIn>

            <FadeIn delay={0} y={40} className="relative z-10">
                <h2
                    className="hero-heading font-black uppercase leading-none tracking-tight text-center"
                    style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
                >
                    About me
                </h2>
            </FadeIn>

            <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
                <AnimatedText
                    text={ABOUT_TEXT}
                    className="font-medium text-center leading-relaxed max-w-[560px]"
                    style={{
                        color: "#D7E2EA",
                        fontSize: "clamp(1rem, 2vw, 1.35rem)",
                    }}
                />
                <ContactButton />
            </div>
        </section>
    );
}
