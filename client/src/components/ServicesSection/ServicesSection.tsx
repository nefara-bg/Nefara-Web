import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { AnimatedLeftPanel } from "./AnimatedLeftPanel"
import { ServiceCardHover } from "./ServiceCardHover"

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

            <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-10 pb-16 lg:pt-14 lg:pb-24">
                <div className="grid lg:grid-cols-[340px_1fr] gap-12 lg:gap-16 items-start">

                    {/* Left — heading + CTA */}
                    <AnimatedLeftPanel className="lg:sticky lg:top-28">
                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.1] tracking-tight mb-6">
                            {t("pageTitle1")}{" "}{t("pageTitle2")}
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed mb-8">
                            {t("pageSubtitle")}
                        </p>
                        <Link href="/contact" className="group inline-flex items-center gap-1.5 rounded-md border border-[hsl(var(--primary))] bg-background px-5 py-2 text-sm font-semibold text-foreground transition-all duration-300 hover:bg-[hsl(var(--primary)/0.08)]">
                            {t("pageCta")}
                            <span className="relative inline-flex items-center w-4 h-4 overflow-hidden">
                                <span className="absolute transition-all duration-300 group-hover:opacity-0 group-hover:-translate-x-2">{">"}</span>
                                <span className="absolute opacity-0 translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">{"->"}</span>
                            </span>
                        </Link>
                    </AnimatedLeftPanel>

                    {/* Right — 2-col grid */}
                    <div className="grid sm:grid-cols-2 gap-x-6 gap-y-6">
                        {items.map(({ key }) => (
                            <ServiceCardHover
                                key={key}
                                className="rounded-xl px-4 pb-4 cursor-default"
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
                            </ServiceCardHover>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
