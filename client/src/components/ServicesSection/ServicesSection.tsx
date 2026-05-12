import * as motion from "motion/react-client"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

const SERVICE_ICONS: Record<string, string> = {
    websites: "/serviceIcons/websiteIcon.svg",
    mobile:   "/serviceIcons/mobileIcon.svg",
    desktop:  "/serviceIcons/desctopIcon.svg",
    software: "/serviceIcons/softwareIcon.svg",
    seoItem:  "/serviceIcons/seoOptimizationIcon.svg",
    support:  "/serviceIcons/supportIcon.svg",
}

export default async function ServicesSection() {
    const t = await getTranslations("services")

    const items = [
        { key: "websites" },
        { key: "mobile"   },
        { key: "desktop"  },
        { key: "software" },
        { key: "seoItem"  },
        { key: "support"  },
    ] as const

    return (
        <section id="services" className="relative overflow-hidden bg-background">

            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
                <div className="grid lg:grid-cols-[340px_1fr] gap-16 lg:gap-24 items-start">

                    {/* Left — heading + CTA */}
                    <motion.div
                        className="lg:sticky lg:top-28"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                            {t("pageTitle1")}{" "}{t("pageTitle2")}
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8">
                            {t("pageSubtitle")}
                        </p>
                        <Link href="/contact" className="inline-block">
                            <div className="relative rounded-md p-[1.5px] overflow-hidden" style={{ display: "inline-flex" }}>
                                <div
                                    className="absolute inset-[-150%] pointer-events-none"
                                    style={{
                                        background: "conic-gradient(from 0deg, transparent 60%, hsl(var(--primary)) 80%, hsl(var(--secondary)/0.8) 85%, transparent 100%)",
                                        animation: "borderSpin 2.8s linear infinite",
                                    }}
                                />
                                <div className="relative rounded-md bg-card px-6 py-2.5 text-sm font-semibold text-foreground hover:text-[hsl(var(--primary))] transition-colors">
                                    {t("pageCta")}
                                </div>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Right — 2-col grid */}
                    <div className="grid sm:grid-cols-2 gap-x-10 gap-y-12">
                        {items.map(({ key }, i) => (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-40px" }}
                                transition={{ duration: 0.5, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <Image src={SERVICE_ICONS[key]} alt={key} width={50} height={50} className="flex-shrink-0" />
                                    <h3 className="font-display text-base font-bold text-foreground">
                                        {t(`items.${key}.title`)}
                                    </h3>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {t(`items.${key}.desc`)}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
