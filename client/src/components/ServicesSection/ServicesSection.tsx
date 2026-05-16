import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
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
                        <Link
                            href="/contact"
                            className="relative inline-flex items-center rounded-xl h-11 w-44 bg-background border border-border overflow-hidden group"
                        >
                            <div
                                className="absolute left-1 top-1 h-9 w-9 rounded-lg flex items-center justify-center z-10 group-hover:w-[168px] transition-all duration-500"
                                style={{ background: "#00CBBB" }}
                            >
                                <ArrowRight className="w-4 h-4 text-white shrink-0" />
                            </div>
                            <span className="relative z-0 w-full text-center text-sm font-semibold text-foreground group-hover:text-white transition-colors duration-300 pl-4">
                                {t("pageCta")}
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
