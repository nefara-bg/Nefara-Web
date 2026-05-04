import * as motion from "motion/react-client"
import { Globe, Monitor, Smartphone, Check, ExternalLink, Sparkles, Trophy, Rocket, ArrowRight } from "lucide-react"
import Image from "next/image"
import { getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/navigation"

export default async function ServicesSection() {
    const t = await getTranslations("services")

    const services = [
        {
            title: t("web.title"),
            description: t("web.content.text"),
            icon: Globe,
            features: [t("web.content.content1"), t("web.content.content2"), t("web.content.content3")],
        },
        {
            title: t("desktop.title"),
            description: t("desktop.content.text"),
            icon: Monitor,
            features: [t("desktop.content.content1"), t("desktop.content.content2"), t("desktop.content.content3")],
        },
        {
            title: t("mobile.title"),
            description: t("mobile.content.text"),
            icon: Smartphone,
            features: [t("mobile.content.content1"), t("mobile.content.content2"), t("mobile.content.content3")],
        },
    ]

    const projectUrls = [
        "https://fylex.org",
        "https://devpost.com/software/meravalens",
        "https://morzio.com",
    ]

    const projectAnnouncements = [
        { text: t("announcements.fylex"), icon: Rocket },
        { text: t("announcements.merava"), icon: Trophy },
        { text: t("announcements.izgodno"), icon: Sparkles },
    ]

    const projectNames = ["Fylex", "Merava Lens", "Izgodno"]

    return (
        <section id="services" className="relative overflow-hidden bg-background section-shell">
            <div
                className="absolute top-0 right-0 w-[500px] h-[500px] -z-10 opacity-50"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.12) 0%, transparent 70%)",
                }}
            />

            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mb-16 md:mb-24"
                >
                    <span className="eyebrow mb-5">{t("tag")}</span>
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 leading-[1.05] tracking-tight">
                        {t("title")}
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                        {t("content")}
                    </p>
                </motion.div>

                {/* Services list */}
                <div className="space-y-24 md:space-y-40">
                    {services.map((service, index) => {
                        const ProjectIcon = projectAnnouncements[index].icon
                        const reverse = index % 2 === 1
                        return (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                transition={{ duration: 0.7 }}
                                className="group grid lg:grid-cols-2 gap-12 lg:gap-20 items-center"
                            >
                                {/* Text */}
                                <div className={reverse ? "lg:order-2" : "lg:order-1"}>
                                    <div className="accent-chip w-12 h-12 mb-6">
                                        <service.icon className="w-5 h-5" />
                                    </div>

                                    <h3 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-5 leading-tight">
                                        {service.title}
                                    </h3>

                                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8 border-l-2 border-[hsl(var(--primary))] pl-5">
                                        {service.description}
                                    </p>

                                    <ul className="grid gap-3 mb-8">
                                        {service.features.map((feature) => (
                                            <li key={feature} className="flex items-center gap-3">
                                                <span className="accent-chip w-6 h-6 shrink-0">
                                                    <Check className="w-3.5 h-3.5" />
                                                </span>
                                                <span className="text-sm md:text-base text-foreground/90">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/contact">
                                        <Button variant="link" className="px-0">
                                            {t("buttonStartWith")} {service.title}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Button>
                                    </Link>
                                </div>

                                {/* Visual */}
                                <div className={`relative ${reverse ? "lg:order-1" : "lg:order-2"}`}>
                                    <div className="relative aspect-[4/3]">
                                        <div className="absolute inset-0 rounded-md overflow-hidden border border-border bg-card shadow-[0_24px_60px_-20px_rgba(15,23,42,0.18)]">
                                            {index === 0 ? (
                                                <Image src="/fylex.webp" alt={service.title} fill className="object-cover" />
                                            ) : index === 1 ? (
                                                <Image src="/merava.webp" alt={service.title} fill className="object-cover" />
                                            ) : (
                                                <div className="absolute inset-0 flex gap-3 p-3">
                                                    <div className="relative flex-1 rounded-md overflow-hidden">
                                                        <Image src="/izgodno1.webp" alt="Izgodno 1" fill className="object-cover" />
                                                    </div>
                                                    <div className="relative flex-1 rounded-md overflow-hidden">
                                                        <Image src="/izgodno2.webp" alt="Izgodno 2" fill className="object-cover" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Floating announcement */}
                                        <div className="absolute -right-4 lg:-right-8 -top-10 max-w-[320px] rounded-md border border-border bg-card shadow-[0_20px_48px_-16px_rgba(15,23,42,0.18)] p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="accent-chip w-9 h-9 shrink-0">
                                                    <ProjectIcon className="w-4 h-4" />
                                                </div>
                                                <p className="text-xs leading-relaxed text-muted-foreground">
                                                    {projectAnnouncements[index].text}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Floating project tag */}
                                        <div className="absolute -left-4 -bottom-8 rounded-md border border-border bg-card shadow-[0_20px_48px_-16px_rgba(15,23,42,0.18)] px-4 py-3 inline-flex items-center gap-3">
                                            <div className="accent-chip w-10 h-10 overflow-hidden">
                                                {index === 0 ? (
                                                    <Image src="/fylex-logo.webp" alt="Fylex" width={28} height={28} className="object-contain" />
                                                ) : index === 1 ? (
                                                    <Image src="/merava-logo.webp" alt="Merava" width={20} height={20} className="object-contain" />
                                                ) : (
                                                    <Check className="w-5 h-5" />
                                                )}
                                            </div>
                                            <span className="font-display text-sm font-bold text-foreground whitespace-nowrap">
                                                {projectNames[index]}
                                            </span>
                                            {index !== 2 && (
                                                <a
                                                    href={projectUrls[index]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`${t("visit")} ${projectNames[index]}`}
                                                    className="text-[hsl(var(--primary-strong))] hover:text-[hsl(var(--primary))] transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <div className="mt-28 md:mt-40 text-center max-w-2xl mx-auto">
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-6 leading-tight">
                        {t("subtext")}
                    </h3>
                    <Link href="/contact">
                        <Button size="lg">
                            {t("button")}
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
