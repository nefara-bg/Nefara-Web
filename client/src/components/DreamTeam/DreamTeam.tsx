"use client";

import { useRef, useEffect, useState, useCallback, type ReactNode } from "react";
import { Linkedin, ChevronLeft, ChevronRight, Layers, Shield, Award, GraduationCap, Rocket, Code2, Server } from "lucide-react";
import { useTranslations } from "next-intl";
import SectionTag from "@/components/SectionTag/SectionTag";

/* ─────────────────────────────────────────────────────────────
   Stripe-style scroll-triggered reveal
   ───────────────────────────────────────────────────────────── */
function useReveal(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, visible };
}

function rev(visible: boolean, delayMs = 0): { style: React.CSSProperties; className: string } {
    return {
        style: { transitionDelay: `${delayMs}ms` },
        className: [
            "transition-all duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)]",
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        ].join(" "),
    };
}

/* ─────────────────────────────────────────────────────────────
   Card data types
   ───────────────────────────────────────────────────────────── */
interface PersonCard {
    type: "person";
    name: string;
    role: string;
    company: string;
    linkedin: string;
    nameColor: string;
}

interface InfoCard {
    type: "info";
    title: string;
    icon: ReactNode;
    items: string[];
    nameColor: string;
    footerLabel: string;
}

type CarouselCard = PersonCard | InfoCard;

/* ─────────────────────────────────────────────────────────────
   Single card renderer (Stripe Sessions style)
   ───────────────────────────────────────────────────────────── */
function SessionCard({ card }: { card: CarouselCard }) {
    if (card.type === "person") {
        return (
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col w-full select-none">
                {/* Name */}
                <div className="px-5 pt-5 relative z-10">
                    <h3
                        className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.05] tracking-tight"
                        style={{ color: card.nameColor }}
                    >
                        {card.name.split(" ").map((word, i) => (
                            <span key={i}>{word}{i === 0 && <br />}</span>
                        ))}
                    </h3>
                </div>

                {/* Photo area with diagonal clip */}
                <div className="flex-1 relative overflow-hidden mt-2">
                    <div
                        className="absolute inset-0"
                        style={{
                            background: "linear-gradient(135deg, hsl(220 15% 88%) 0%, hsl(220 10% 82%) 100%)",
                            clipPath: "polygon(0 12%, 100% 0%, 100% 100%, 0 100%)",
                        }}
                    />
                    {/* Placeholder silhouette */}
                    <div className="absolute inset-0 flex flex-col items-center justify-end" style={{ clipPath: "polygon(0 12%, 100% 0%, 100% 100%, 0 100%)" }}>
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/40 mb-1" />
                        <div className="w-28 sm:w-36 h-20 sm:h-28 rounded-t-full bg-white/25" />
                    </div>
                </div>

                {/* Footer */}
                <div className="px-5 pb-4 pt-3 flex items-end justify-between bg-white relative z-10">
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">{card.company}</p>
                        <p className="text-xs text-gray-500 font-normal">{card.role}</p>
                    </div>
                    <a
                        href={card.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 text-gray-400 hover:text-primary hover:border-primary transition-all duration-300"
                        aria-label={`${card.name} LinkedIn`}
                    >
                        <Linkedin className="w-4 h-4" />
                    </a>
                </div>
            </div>
        );
    }

    /* Info card — same dimensions, different content */
    return (
        <div className="relative bg-white rounded-xl overflow-hidden shadow-lg h-full flex flex-col w-full select-none">
            {/* Title */}
            <div className="px-5 pt-5 relative z-10">
                <h3
                    className="text-3xl sm:text-4xl lg:text-[2.6rem] font-black leading-[1.05] tracking-tight"
                    style={{ color: card.nameColor }}
                >
                    {card.title.split("\n").map((line, i) => (
                        <span key={i}>{line}{i === 0 && <br />}</span>
                    ))}
                </h3>
            </div>

            {/* Content area with diagonal clip */}
            <div className="flex-1 relative overflow-hidden mt-2">
                <div
                    className="absolute inset-0"
                    style={{
                        background: "linear-gradient(135deg, hsl(240 20% 92%) 0%, hsl(250 15% 88%) 100%)",
                        clipPath: "polygon(0 12%, 100% 0%, 100% 100%, 0 100%)",
                    }}
                />
                <div
                    className="absolute inset-0 flex flex-col justify-center px-6 gap-3 pt-8"
                    style={{ clipPath: "polygon(0 12%, 100% 0%, 100% 100%, 0 100%)" }}
                >
                    {card.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ background: card.nameColor }}
                            />
                            <span className="text-sm text-gray-600 font-medium">{item}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="px-5 pb-4 pt-3 flex items-end justify-between bg-white relative z-10">
                <div className="flex items-center gap-2">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                        style={{ background: card.nameColor }}
                    >
                        {card.icon}
                    </div>
                    <div>
                        <p className="text-sm font-bold text-gray-900 leading-tight">Nefara</p>
                        <p className="text-xs text-gray-500 font-normal">{card.footerLabel}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   3D Carousel Component
   ───────────────────────────────────────────────────────────── */
function Carousel3D({ cards }: { cards: CarouselCard[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const prev = useCallback(() => {
        setActiveIndex((i) => (i - 1 + cards.length) % cards.length);
    }, [cards.length]);

    const next = useCallback(() => {
        setActiveIndex((i) => (i + 1) % cards.length);
    }, [cards.length]);

    /* Touch / swipe support */
    const touchStart = useRef(0);
    const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX; };
    const handleTouchEnd = (e: React.TouchEvent) => {
        const diff = touchStart.current - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); }
    };

    /* Keyboard */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [prev, next]);

    const getCardStyle = (index: number): React.CSSProperties => {
        const totalCards = cards.length;
        let offset = index - activeIndex;

        // Handle wrapping
        if (offset > totalCards / 2) offset -= totalCards;
        if (offset < -totalCards / 2) offset += totalCards;

        const absOffset = Math.abs(offset);
        const maxVisible = isMobile ? 1.5 : 3;

        if (absOffset > maxVisible) {
            return { opacity: 0, pointerEvents: "none", transform: "scale(0.5)", position: "absolute" };
        }

        const rotateY = offset * (isMobile ? 25 : 18);
        const translateX = offset * (isMobile ? 180 : 280);
        const translateZ = -absOffset * (isMobile ? 100 : 140);
        const scale = 1 - absOffset * 0.08;
        const opacity = 1 - absOffset * 0.15;
        const zIndex = 100 - absOffset * 10;

        return {
            transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
            opacity,
            zIndex,
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "absolute" as const,
            pointerEvents: absOffset > 2 ? "none" as const : "auto" as const,
        };
    };

    return (
        <div
            className="relative w-full"
            style={{ perspective: "1200px" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Carousel stage */}
            <div className="relative mx-auto flex items-center justify-center" style={{ height: isMobile ? "420px" : "520px" }}>
                <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d" }}>
                    {cards.map((card, index) => (
                        <div
                            key={index}
                            className="absolute top-1/2 left-1/2"
                            style={{
                                ...getCardStyle(index),
                                width: isMobile ? "260px" : "320px",
                                height: isMobile ? "380px" : "470px",
                                marginLeft: isMobile ? "-130px" : "-160px",
                                marginTop: isMobile ? "-190px" : "-235px",
                                cursor: index !== activeIndex ? "pointer" : "default",
                            }}
                            onClick={() => index !== activeIndex && setActiveIndex(index)}
                        >
                            <SessionCard card={card} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation arrows */}
            <div className="flex justify-between items-center px-4 sm:px-8 mt-4 sm:mt-6">
                <button
                    onClick={prev}
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
                    aria-label="Previous card"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex gap-1.5">
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveIndex(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === activeIndex ? "bg-gray-800 scale-125" : "bg-gray-300"
                            }`}
                            aria-label={`Go to card ${i + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={next}
                    className="w-12 h-12 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-all duration-300"
                    aria-label="Next card"
                >
                    <ChevronRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Stat Item
   ───────────────────────────────────────────────────────────── */
function StatItem({ value, label, visible, delay }: { value: string; label: string; visible: boolean; delay: number }) {
    const r = rev(visible, delay);
    return (
        <div style={r.style} className={`${r.className} text-center`}>
            <p
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-2 leading-none"
                style={{
                    background: "linear-gradient(135deg, hsl(215 90% 80%) 0%, hsl(270 60% 85%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                }}
            >
                {value}
            </p>
            <p className="text-white/50 text-xs sm:text-sm font-medium uppercase tracking-wider">{label}</p>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Main DreamTeam Section
   ───────────────────────────────────────────────────────────── */
export function DreamTeam() {
    const t = useTranslations("about");

    const headerReveal = useReveal(0.2);
    const carouselReveal = useReveal(0.08);
    const missionReveal = useReveal(0.12);
    const featuresReveal = useReveal(0.06);
    const statsReveal = useReveal(0.06);

    const stats = [
        { value: "3+", labelKey: "stats.yearsExperience" as const },
        { value: "24/7", labelKey: "stats.supportAvailable" as const },
        { value: "100%", labelKey: "stats.clientSatisfaction" as const },
    ];

    const carouselCards: CarouselCard[] = [
        {
            type: "person",
            name: t("team.members.dimitarAnastasov"),
            role: t("team.roles.softwareDeveloper"),
            company: "Nefara",
            linkedin: "https://www.linkedin.com/in/dimitar-anastasov-339a94310/",
            nameColor: "hsl(280 65% 50%)",
        },
        {
            type: "person",
            name: t("team.members.martinVelchev"),
            role: t("team.roles.fullStackDeveloper"),
            company: "Nefara",
            linkedin: "https://www.linkedin.com/in/martin-velchev-5917b836b/",
            nameColor: "hsl(280 65% 50%)",
        },
        {
            type: "info",
            title: "Tech\nStack",
            icon: <Code2 className="w-3.5 h-3.5" />,
            items: ["React / Next.js / TypeScript", "Node.js / Express", "PostgreSQL / MongoDB", "Tailwind CSS / Framer Motion", "Docker / CI/CD"],
            nameColor: "hsl(225 60% 35%)",
            footerLabel: "Engineering",
        },
        {
            type: "info",
            title: "Our\nAchievements",
            icon: <Award className="w-3.5 h-3.5" />,
            items: ["30+ Projects Delivered", "100% Client Satisfaction", "24/7 Support & Maintenance", "Agile Methodology", "3+ Years Experience"],
            nameColor: "hsl(330 60% 48%)",
            footerLabel: "Track Record",
        },
        {
            type: "info",
            title: "Education\n& Growth",
            icon: <GraduationCap className="w-3.5 h-3.5" />,
            items: ["Software University (SoftUni)", "Continuous Learning & Certifications", "Open Source Contributions", "Mentorship & Knowledge Sharing"],
            nameColor: "hsl(160 50% 35%)",
            footerLabel: "Knowledge",
        },
        {
            type: "info",
            title: "Personal\nProjects",
            icon: <Rocket className="w-3.5 h-3.5" />,
            items: ["SaaS Platform Development", "E-Commerce Solutions", "AI-Powered Applications", "Mobile-First Web Apps"],
            nameColor: "hsl(25 80% 50%)",
            footerLabel: "Innovation",
        },
    ];

    const features = [
        { titleKey: "personalized.title" as const, descKey: "personalized.content" as const },
        { titleKey: "tech.title" as const, descKey: "tech.content" as const },
        { titleKey: "communication.title" as const, descKey: "communication.content" as const },
        { titleKey: "quality.title" as const, descKey: "quality.content" as const },
    ];

    return (
        <section id="about" className="relative overflow-hidden">

            {/* ════════════════════════════════════════════════════
                PART 1 — Heading + 3D Card Carousel
               ════════════════════════════════════════════════════ */}
            <div className="bg-background pt-20 sm:pt-28 pb-0">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Header */}
                    <div ref={headerReveal.ref} className="max-w-3xl mx-auto text-center mb-10 sm:mb-16">
                        <div {...rev(headerReveal.visible, 0)}>
                            <SectionTag content={t("sectionLabel")} className="items-center mb-5" />
                        </div>
                        <div {...rev(headerReveal.visible, 120)}>
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black text-foreground leading-[1.1] mb-5">
                                {t("dreamTeamTitle")}
                                <br />
                                <span
                                    style={{
                                        background: "linear-gradient(135deg, hsl(225 55% 25%) 0%, hsl(255 50% 45%) 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    {t("dreamTeamTitle2")}
                                </span>
                            </h2>
                        </div>
                        <div {...rev(headerReveal.visible, 240)}>
                            <p className="text-muted-foreground text-base sm:text-lg md:text-xl font-semibold">
                                {t("dreamTeamSubtext")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Carousel – full width on gray background */}
                <div ref={carouselReveal.ref}>
                    <div {...rev(carouselReveal.visible, 100)}>
                        <div
                            className="py-10 sm:py-16 pb-8 sm:pb-12"
                            style={{ background: "hsl(228 30% 94%)" }}
                        >
                            {/* Featured label */}
                            <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-6 sm:mb-8">
                                Featured
                            </p>

                            <Carousel3D cards={carouselCards} />
                        </div>
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════
                PART 2 — Dark curved panel with stats
               ════════════════════════════════════════════════════ */}
            <div
                className="relative"
                style={{
                    background: "linear-gradient(160deg, hsl(240 50% 10%) 0%, hsl(255 42% 16%) 50%, hsl(240 50% 10%) 100%)",
                }}
            >
                {/* Curve */}
                <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none" style={{ marginTop: "-1px" }}>
                    <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full block" style={{ height: "80px", minHeight: "60px" }}>
                        <path d="M0,0 C360,120 1080,120 1440,0 L1440,0 L0,0 Z" style={{ fill: "hsl(228 30% 94%)" }} />
                    </svg>
                </div>

                {/* Blobs */}
                <div className="absolute top-16 left-[20%] w-72 h-72 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: "hsl(260 70% 60%)" }} />
                <div className="absolute bottom-16 right-[20%] w-56 h-56 rounded-full opacity-[0.06] blur-3xl pointer-events-none" style={{ background: "hsl(215 90% 65%)" }} />

                {/* Stats */}
                <div ref={statsReveal.ref} className="relative z-10 container mx-auto max-w-5xl px-4 sm:px-6" style={{ marginTop: "-20px" }}>
                    <div {...rev(statsReveal.visible, 0)}>
                        <p className="text-center text-white/35 text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] mb-8 sm:mb-14">
                            {t("statsLabel")}
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 items-start pb-14 sm:pb-20">
                        {stats.map((s, i) => (
                            <div key={i} className="relative">
                                {i > 0 && <div className="hidden sm:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 h-16 w-px bg-white/[0.06]" />}
                                <StatItem value={s.value} label={t(s.labelKey)} visible={statsReveal.visible} delay={i * 100} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ════════════════════════════════════════════════════
                PART 3 — Our Mission + Feature Cards
               ════════════════════════════════════════════════════ */}
            <div className="bg-background pt-16 sm:pt-24 pb-16 sm:pb-24">
                <div className="container mx-auto max-w-7xl px-4 sm:px-6">
                    {/* Mission header */}
                    <div ref={missionReveal.ref} className="text-center mb-12 sm:mb-20">
                        <div {...rev(missionReveal.visible, 0)}>
                            <SectionTag content={t("tag")} className="items-center mb-5" />
                        </div>
                        <div {...rev(missionReveal.visible, 120)}>
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-foreground mb-6 leading-tight">
                                {t("subtitle")}
                                <span className="text-primary block mt-2">{t("subtitle2")}</span>
                            </h3>
                        </div>
                        <div {...rev(missionReveal.visible, 240)}>
                            <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
                                {t("paragraph1")}
                            </p>
                        </div>
                    </div>

                    {/* Feature cards */}
                    <div ref={featuresReveal.ref} className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                        {features.map((feature, index) => {
                            const r = rev(featuresReveal.visible, index * 120);
                            return (
                                <div key={index} style={r.style} className={r.className}>
                                    <div className="group relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 h-[340px] sm:h-[400px] flex flex-col">
                                        <div className="p-6 sm:p-8 pb-0 flex justify-between items-start relative z-20">
                                            <div className="max-w-[85%]">
                                                <h4 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-tight">{t(feature.titleKey)}</h4>
                                                <p className="text-muted-foreground text-sm leading-relaxed">{t(feature.descKey)}</p>
                                            </div>
                                            <div className="w-3 h-3 rounded-full bg-secondary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300 shrink-0" />
                                        </div>
                                        <div className="flex-grow relative mt-4 sm:mt-6 overflow-hidden">
                                            {index === 0 && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 flex items-center justify-center pt-8">
                                                    <div className="w-3/4 h-full bg-background border border-border rounded-t-2xl shadow-xl p-4 flex flex-col gap-3 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50" />
                                                            <div className="h-2 w-20 bg-muted rounded-full" />
                                                        </div>
                                                        <div className="h-2 w-full bg-secondary/50 rounded-full" />
                                                        <div className="h-2 w-2/3 bg-secondary/50 rounded-full" />
                                                        <div className="mt-4 flex gap-2">
                                                            <div className="h-8 w-16 bg-primary/10 rounded-lg border border-primary/20" />
                                                            <div className="h-8 w-16 bg-muted rounded-lg" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {index === 1 && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 flex items-center justify-center">
                                                    <div className="relative w-40 sm:w-48 h-40 sm:h-48 group-hover:scale-110 transition-transform duration-500">
                                                        <div className="absolute top-0 left-0 w-full h-28 sm:h-32 bg-background border border-border shadow-lg rounded-xl z-30 flex items-center justify-center transform -translate-y-8 translate-x-4">
                                                            <Layers className="w-8 sm:w-10 h-8 sm:h-10 text-primary" />
                                                        </div>
                                                        <div className="absolute top-4 left-4 w-full h-28 sm:h-32 bg-background/80 border border-border shadow-md rounded-xl z-20 opacity-80" />
                                                        <div className="absolute top-8 left-8 w-full h-28 sm:h-32 bg-background/60 border border-border shadow-sm rounded-xl z-10 opacity-60" />
                                                    </div>
                                                </div>
                                            )}
                                            {index === 2 && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-emerald-50/50 dark:from-cyan-900/10 dark:to-emerald-900/10 flex flex-col items-center justify-end pb-6 sm:pb-8 px-6 sm:px-8 gap-3 sm:gap-4">
                                                    <div className="self-end bg-primary text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tr-sm shadow-lg transform group-hover:-translate-x-2 transition-transform duration-500 max-w-[80%]">
                                                        <p className="text-xs">Can we tweak the animation?</p>
                                                    </div>
                                                    <div className="self-start bg-background border border-border text-foreground px-3 sm:px-4 py-2 sm:py-3 rounded-2xl rounded-tl-sm shadow-md transform group-hover:translate-x-2 transition-transform duration-500 max-w-[80%] flex items-center gap-2">
                                                        <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-green-500" />
                                                        <p className="text-xs font-medium">On it right now!</p>
                                                    </div>
                                                </div>
                                            )}
                                            {index === 3 && (
                                                <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-orange-50/50 dark:from-rose-900/10 dark:to-orange-900/10 flex items-center justify-center">
                                                    <div className="relative">
                                                        <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
                                                        <Shield className="w-20 sm:w-24 h-20 sm:h-24 text-foreground/5 relative z-10" />
                                                        <div className="absolute inset-0 flex items-center justify-center z-20">
                                                            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                                <svg className="w-5 sm:w-6 h-5 sm:h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
