import { getTranslations } from "next-intl/server"
import * as motion from "motion/react-client"
import Image from "next/image"
import { GlowingEffect } from "@/components/ui/glowing-effect"

type DisciplineKey = "systems" | "software" | "devops" | "seo" | "aiml"

type Discipline = {
    key: DisciplineKey
    area: string
    svgSrc: string
    svgW: number
    svgH: number
}

const DISCIPLINES: Discipline[] = [
    { key: "systems",  area: "md:[grid-area:1/1/2/5]",  svgSrc: "/ourTeamIcons/systemEngIcon.svg",        svgW: 42, svgH: 42 },
    { key: "software", area: "md:[grid-area:1/5/2/9]",  svgSrc: "/ourTeamIcons/softwareOurTeamIcon.svg",  svgW: 60, svgH: 52 },
    { key: "devops",   area: "md:[grid-area:1/9/2/13]", svgSrc: "/ourTeamIcons/softwareIcon.svg",         svgW: 47, svgH: 50 },
    { key: "seo",      area: "md:[grid-area:2/1/3/7]",  svgSrc: "/ourTeamIcons/seoOptimizationIcon.svg",  svgW: 47, svgH: 50 },
    { key: "aiml",     area: "md:[grid-area:2/7/3/13]", svgSrc: "/ourTeamIcons/aiIcon.svg",               svgW: 79, svgH: 78 },
]

export async function DisciplinesSection() {
    const t = await getTranslations("about.teamSection")

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-10 pb-16 lg:pb-24">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="mb-10 lg:mb-12"
            >
                <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-4">
                    {t("disciplines.heading")}
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                    {t("disciplines.subtitle")}
                </p>
            </motion.div>

            {/* Grid */}
            <ul className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-2">
                {DISCIPLINES.map((discipline, i) => (
                    <motion.li
                        key={discipline.key}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, margin: "-60px" }}
                        transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`min-h-[13rem] list-none ${discipline.area}`}
                    >
                        <div className="relative h-full rounded-2xl border border-border bg-card p-2 md:rounded-3xl md:p-3">
                            <GlowingEffect
                                spread={40}
                                glow={true}
                                disabled={false}
                                proximity={64}
                                inactiveZone={0.01}
                            />
                            <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6">
                                <div className="relative flex flex-1 flex-col justify-between gap-3">
                                    <div className="w-fit">
                                        <Image
                                            src={discipline.svgSrc}
                                            alt=""
                                            width={discipline.svgW}
                                            height={discipline.svgH}
                                            className={discipline.svgSrc.includes("softwareOurTeam") ? "w-16 h-auto" : "w-14 h-auto"}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-display text-xl font-semibold text-foreground tracking-tight leading-snug">
                                            {t(`disciplines.${discipline.key}.title`)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {t(`disciplines.${discipline.key}.desc`)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.li>
                ))}
            </ul>

        </div>
    )
}
