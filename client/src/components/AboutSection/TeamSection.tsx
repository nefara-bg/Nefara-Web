import * as motion from "motion/react-client"
import { Linkedin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { DisciplinesSection } from "./DisciplinesSection"
import { TeamCTABanner } from "./TeamCTABanner"

const FOUNDER_META = [
    {
        key: "dimitar" as const,
        linkedin: "https://www.linkedin.com/in/dimitar-anastasov-339a94310/",
        image: "/co-founders/Dimitar.JPG",
    },
    {
        key: "martin" as const,
        linkedin: "https://www.linkedin.com/in/martin-velchev-5917b836b/",
        image: "/co-founders/Martin.JPG",
    },
]


export async function TeamSection() {
    const t = await getTranslations("about.teamSection")

    return (
        <section id="about" className="relative" style={{ background: "hsl(var(--muted))" }}>

            {/* ── Founders ── */}
            <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-16 lg:pt-14 lg:pb-24">

                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-80px" }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-10 lg:mb-12"
                >
                    <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-4">
                        {t("heading")}
                    </h2>
                    <p className="text-base text-muted-foreground leading-relaxed max-w-lg">
                        {t("subtitle")}
                    </p>
                </motion.div>

                {/* Founder cards */}
                <div className="flex flex-col gap-5">
                    {FOUNDER_META.map(({ key, linkedin, image }, i) => {
                        const name = t(`founders.${key}.name`)
                        const role = t(`founders.${key}.role`)
                        const bio  = t(`founders.${key}.bio`)
                        const tags = t.raw(`founders.${key}.tags`) as string[]
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, margin: "-60px" }}
                                transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="flex overflow-hidden rounded-xl border border-border bg-card"
                            >
                                {/* Photo area */}
                                <div
                                    className="hidden sm:block sm:w-48 lg:w-60 xl:w-72 shrink-0 relative min-h-[220px]"
                                    style={{ borderRight: "1px solid hsl(var(--border))" }}
                                >
                                    <Image
                                        src={image}
                                        alt={name}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(max-width: 1024px) 192px, (max-width: 1280px) 240px, 288px"
                                    />
                                </div>

                                {/* Info */}
                                <div className="flex-1 p-8 lg:p-10">
                                    <p
                                        className="text-[11px] font-bold uppercase tracking-[0.18em] mb-3"
                                        style={{ color: "hsl(var(--primary))" }}
                                    >
                                        {role}
                                    </p>

                                    <div className="flex items-start justify-between gap-4 mb-5">
                                        <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                                            {name}
                                        </h3>
                                        <a
                                            href={linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all"
                                            aria-label={`${name} LinkedIn`}
                                        >
                                            <Linkedin className="w-4 h-4" />
                                        </a>
                                    </div>

                                    <p className="text-base text-muted-foreground leading-relaxed mb-7">
                                        {bio}
                                    </p>

                                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground mb-3">
                                        {t("areasOfExpertise")}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map(tag => (
                                            <span
                                                key={tag}
                                                className="px-3 py-1 rounded text-sm font-medium border"
                                                style={{
                                                    borderColor: "hsl(var(--border))",
                                                    color: "#64748B",
                                                    background: "transparent",
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

            </div>

            <DisciplinesSection />
            <TeamCTABanner />

        </section>
    )
}
