import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { AnimatedNumber } from "@/components/AnimatedNumber"

/* ─── tiny reveal helper ─── */
function Reveal({
    children,
    y = 24,
    delay = 0,
    className,
}: {
    children: React.ReactNode
    y?: number
    delay?: number
    className?: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export async function AboutNefara() {
    const t = await getTranslations("about.page")



    const hackathons = t.raw("background.hackathons.list") as {
        place: string
        name: string
        desc: string
        badge: string
    }[]

    return (
        <>
            {/* ══════════════════════════════════════════
                §1  WHO WE ARE
            ══════════════════════════════════════════ */}
            <section className="bg-white dark:bg-background pt-28">
                <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
                    <div className="lg:grid lg:grid-cols-[1fr_420px] lg:gap-20 xl:gap-28">

                        {/* Left — body copy */}
                        <div>
                            <Reveal>
                                <h2 className="font-display text-4xl lg:text-5xl font-bold text-[#0F172A] dark:text-white leading-[1.15] tracking-tight mb-8">
                                    {t("whoWeAre.heading")}
                                </h2>
                            </Reveal>

                            <div className="flex flex-col gap-5 text-base md:text-[17px] text-[#475569] dark:text-muted-foreground leading-[1.8]">
                                <Reveal delay={0.08}>
                                    <p>{t("whoWeAre.body1")}</p>
                                </Reveal>
                                <Reveal delay={0.14}>
                                    <p>{t("whoWeAre.body2")}</p>
                                </Reveal>
                                <Reveal delay={0.20}>
                                    <p>{t("whoWeAre.body3")}</p>
                                </Reveal>
                            </div>
                        </div>

                        {/* Right — mission card */}
                        <Reveal delay={0.2} className="mt-12 lg:mt-[5.5rem]">
                            <div
                                className="relative rounded-[6px] p-8 lg:p-10 bg-[#061219]"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-6 h-[2px] bg-[#00E6CC]"></div>
                                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#00E6CC]">
                                        {t("whoWeAre.missionTag")}
                                    </span>
                                </div>
                                
                                <div className="relative border-l-[3px] border-[#00E6CC] pl-6 py-1">
                                    <p className="text-white/90 text-[17px] leading-[1.75] font-medium">
                                        {t("whoWeAre.mission")}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══════════════════════════════════════════
                §3  BACKGROUND — education + hackathons
            ══════════════════════════════════════════ */}
            <section className="dark-section relative overflow-hidden">
                <div className="relative mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
                    {/* Header */}
                    <Reveal className="mb-14 lg:mb-16">
                        <h2 className="font-display text-4xl lg:text-[44px] font-bold text-white leading-[1.1] tracking-tight max-w-2xl mb-6">
                            {t("background.heading")}
                        </h2>
                        <p className="text-[#8492A6] text-base md:text-lg max-w-2xl leading-relaxed">
                            {t("background.subtitle")}
                        </p>
                    </Reveal>

                    {/* Two cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-6">

                        {/* TUES card */}
                        <Reveal delay={0.05}>
                            <div className="relative rounded-[8px] p-8 lg:p-10 h-full bg-transparent border border-[#00E6CC]/30">
                                <div className="inline-block px-3 py-1.5 rounded-sm bg-[#00E6CC]/10 text-[#00E6CC] text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
                                    {t("background.education.tag")}
                                </div>

                                {/* Years badge */}
                                <div className="flex items-baseline gap-2 mb-8">
                                    <AnimatedNumber 
                                        value={parseInt(t("background.education.years"), 10) || 38} 
                                        className="font-display text-[64px] font-bold text-[#00E6CC] leading-none tracking-tighter" 
                                    />
                                    <span className="text-3xl font-bold text-white leading-none">
                                        {t("background.education.yearsLabel")}
                                    </span>
                                </div>

                                <a 
                                    href="https://elsys-bg.org/" 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="text-white hover:text-[#00E6CC] transition-colors font-bold text-[17px] mb-2 leading-snug block w-fit"
                                >
                                    {t("background.education.school")}
                                </a>
                                <p className="text-[#8492A6] text-sm mb-8">
                                    {t("background.education.location")}
                                </p>
                                <p className="text-[#8492A6] text-sm leading-[1.8]">
                                    {t("background.education.body")}
                                </p>
                            </div>
                        </Reveal>

                        {/* Hackathon stats card */}
                        <Reveal delay={0.12}>
                            <div className="relative rounded-[8px] p-8 lg:p-10 h-full bg-transparent border border-[#00E6CC]/30 flex flex-col">
                                <div className="mb-8">
                                    <h3 className="font-display text-[22px] lg:text-2xl font-bold text-white mb-2 leading-snug">
                                        Multiple events, multiple wins.
                                    </h3>
                                    <p className="text-[#00E6CC] text-[15px] font-medium">
                                        Strong IT background filled with innovation.
                                    </p>
                                </div>

                                <div className="w-full h-px bg-white/10 mb-8"></div>

                                {/* List of hackathons */}
                                <div className="flex flex-col gap-1.5 flex-1">
                                    {hackathons?.map((hack, idx) => {
                                        const bgClass = idx === 0 ? "bg-[#00E6CC]/15" 
                                                      : idx === 1 ? "bg-[#00E6CC]/10" 
                                                      : idx === 2 ? "bg-[#00E6CC]/5" 
                                                      : "bg-transparent";
                                        
                                        const textClass = idx === 0 ? "text-[#00E6CC]" 
                                                        : idx === 1 ? "text-[#00E6CC]/80" 
                                                        : idx === 2 ? "text-[#00E6CC]/60" 
                                                        : "text-[#00E6CC]/40";

                                        const descClass = idx === 0 ? "text-[#00E6CC]/80" 
                                                        : idx === 1 ? "text-[#00E6CC]/60" 
                                                        : idx === 2 ? "text-[#00E6CC]/40" 
                                                        : "text-[#00E6CC]/30";
                                                        
                                        return (
                                            <div key={idx} className={`flex flex-col sm:flex-row sm:items-center justify-between px-5 py-3.5 rounded-[6px] gap-2 sm:gap-4 transition-all duration-200 hover:bg-[#00E6CC]/20 ${bgClass}`}>
                                                <div className={`font-semibold text-[15px] sm:w-[150px] shrink-0 ${textClass}`}>
                                                    {hack.name}
                                                </div>
                                                
                                                <div className={`text-[13px] flex-1 truncate ${descClass}`}>
                                                    {hack.desc}
                                                </div>
                                                
                                                <div className={`flex items-center gap-2 font-bold text-[13px] shrink-0 ${textClass}`}>
                                                    <span>{hack.badge}</span>
                                                    {hack.place !== "—" && (
                                                        <span className="opacity-70 bg-black/10 px-1.5 py-0.5 rounded text-[11px]">{hack.place}</span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    {/* What is a hackathon banner */}
                    <Reveal delay={0.2}>
                        <div className="mt-6 rounded-[8px] p-5 lg:p-6 bg-transparent border border-[#00E6CC]/30 flex items-start sm:items-center gap-5">
                            <div className="w-10 h-10 shrink-0 bg-[#00E6CC]/10 rounded flex items-center justify-center text-[#00E6CC] font-bold text-[15px]">
                                ?
                            </div>
                            <p className="text-[15px] text-[#8492A6] leading-[1.7]">
                                {t("background.hackathons.footnote")}
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>


        </>
    )
}
