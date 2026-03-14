"use client"

import * as motion from "motion/react-client";
import { Globe, Monitor, Smartphone, Check, ExternalLink, Sparkles, Trophy, Rocket } from "lucide-react";
import Image from "next/image";

import { useTranslations } from "next-intl";

export function ServicesSection() {
    const t = useTranslations("services");

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
    ];

    const projectUrls = [
        "https://fylex.org", // Fylex
        "https://devpost.com/software/meravalens", // Merava Lens
        "https://morzio.com", // Morzio
    ];

    const projectAnnouncements = [
        {
            text: t("announcements.fylex"),
            icon: Rocket,
        },
        {
            text: t("announcements.merava"),
            icon: Trophy,
        },
        {
            text: t("announcements.izgodno"),
            icon: Sparkles,
        },
    ];

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="services" className="py-16 md:py-32 services-gradient relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mb-12 md:mb-24"
                >
                    <p className="text-primary font-semibold mb-4 md:mb-6 tracking-wide uppercase text-xs md:text-sm">{t("tag")}</p>
                    <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-foreground mb-4 md:mb-8 text-balance leading-tight">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-base md:text-xl lg:text-2xl max-w-2xl leading-relaxed">
                        {t("content")}
                    </p>
                </motion.div>

                {/* Services List - Stripe Style */}
                <div className="space-y-16 md:space-y-40">
                    {services.map((service, index) => (
                        <div key={service.title} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.7 }}
                                className={`grid lg:grid-cols-2 gap-8 md:gap-16 lg:gap-24 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                            >
                                {/* Text Content */}
                                <div className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                                    <div className="inline-flex items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl bg-secondary/50 mb-6 md:mb-8 text-primary">
                                        <service.icon className="w-6 h-6 md:w-8 md:h-8" />
                                    </div>

                                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 md:mb-6">
                                        {service.title}
                                    </h3>

                                    <p className="text-base md:text-lg lg:text-xl text-muted-foreground mb-6 md:mb-10 leading-relaxed border-l-2 border-border pl-4 md:pl-6">
                                        {service.description}
                                    </p>

                                    <div className="grid gap-3 md:gap-4 mb-6 md:mb-10">
                                        {service.features.map((feature, idx) => (
                                            <div key={feature} className="flex items-center gap-3 md:gap-4">
                                                <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                                    <Check className="w-3 h-3 md:w-3.5 md:h-3.5" />
                                                </div>
                                                <span className="font-medium text-sm md:text-base text-foreground/90">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={scrollToContact}
                                        className="group/btn flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors text-sm md:text-base active:scale-95 py-2 px-4 -mx-4 md:mx-0 md:p-0 rounded-lg md:rounded-none hover:bg-primary/5 md:hover:bg-transparent"
                                    >
                                        {t("buttonStartWith")} {service.title}
                                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>

                                {/* Visual Image/Placeholder */}
                                <div className={`relative mt-8 lg:mt-0 ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                                    {/* Main Container */}
                                    <div className="relative aspect-[16/11] md:aspect-[4/3] w-full">
                                        {/* Image/Placeholder Container with rounded corners */}
                                        <div className="absolute inset-0 rounded-xl md:rounded-2xl bg-secondary/5 transition-all duration-500 hover:border-primary/40 group-hover:bg-secondary/10 overflow-hidden">
                                            {index === 0 ? (
                                                /* Web Development Image */
                                                <Image
                                                    src="/fylex.webp"
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                    priority={index === 0}
                                                />
                                            ) : index === 1 ? (
                                                /* Desktop Apps Image */
                                                <Image
                                                    src="/merava.webp"
                                                    alt={service.title}
                                                    fill
                                                    className="object-cover"
                                                    priority={index === 1}
                                                />
                                            ) : (
                                                /* Mobile Apps - Two Images Side by Side */
                                                <div className="absolute inset-0 flex gap-2 md:gap-4 p-2 md:p-4">
                                                    <div className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden">
                                                        <Image
                                                            src="/izgodno1.webp"
                                                            alt="Izgodno App 1"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                    <div className="relative flex-1 rounded-lg md:rounded-xl overflow-hidden">
                                                        <Image
                                                            src="/izgodno2.webp"
                                                            alt="Izgodno App 2"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Floating Card Outline 1 (Top - Left on xs/sm, Right on md+) - Project Announcement */}
                                        <div className="absolute -right-4 lg:-right-8 -top-12 md:-top-8 max-w-[280px] md:max-w-[360px] rounded-lg md:rounded-xl bg-background shadow-lg md:shadow-xl p-3 md:p-4 float-animation transition-transform duration-500 hover:-translate-y-1 md:hover:-translate-y-2">
                                            <div className="flex items-start gap-2 md:gap-3">
                                                <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                                    {(() => {
                                                        const IconComponent = projectAnnouncements[index].icon;
                                                        return <IconComponent className="w-4 h-4 md:w-5 md:h-5" />;
                                                    })()}
                                                </div>
                                                <p className="text-[10px] md:text-xs leading-relaxed text-muted-foreground flex-1">
                                                    {projectAnnouncements[index].text}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Floating Card Outline 2 (Bottom - Same positioning as Merava Lens for all projects) - Project Name */}
                                        <div className="absolute -left-4 md:right-auto md:left-4 lg:-left-4 2xl:-left-8 -bottom-12 md:-bottom-12 h-16 md:h-24 rounded-lg md:rounded-xl bg-background shadow-lg md:shadow-xl px-3 md:px-4 py-2 md:py-4 inline-flex items-center gap-2 md:gap-4 float-animation-delayed transition-transform duration-500 hover:translate-y-1 md:hover:translate-y-2 w-fit">
                                            <div className="w-8 h-8 md:w-12 md:h-12 rounded-md md:rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0 overflow-hidden">
                                                {index === 0 ? (
                                                    <Image
                                                        src="/fylex-logo.webp"
                                                        alt="Fylex"
                                                        width={24}
                                                        height={24}
                                                        className="w-6 h-6 md:w-8 md:h-8 object-contain"
                                                    />
                                                ) : index === 1 ? (
                                                    <Image
                                                        src="/merava-logo.webp"
                                                        alt="Merava Lens"
                                                        width={24}
                                                        height={24}
                                                        className="w-4 h-4 md:w-6 md:h-6 object-contain"
                                                    />
                                                ) : (
                                                    <Check className="w-4 h-4 md:w-6 md:h-6" />
                                                )}
                                            </div>
                                            <span className="text-xs md:text-sm font-semibold text-foreground whitespace-nowrap">
                                                {index === 0 ? "Fylex" : index === 1 ? "Merava Lens" : "Izgodno"}
                                            </span>
                                            {index !== 2 && (
                                                <a
                                                    href={projectUrls[index]}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-center text-primary hover:text-primary/80 transition-colors flex-shrink-0"
                                                    aria-label={`${t("visit")} ${index === 0 ? "Fylex" : index === 1 ? "Merava Lens" : "Izgodno"}`}
                                                >
                                                    <ExternalLink className="w-3 h-3 md:w-4 md:h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-20 md:mt-40 text-center">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground mb-4 md:mb-6 px-4">
                        {t("subtext")}
                    </h3>
                    <button
                        onClick={scrollToContact}
                        className="inline-flex h-11 md:h-12 items-center justify-center rounded-full bg-primary px-6 md:px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 active:scale-95 md:hover:scale-105"
                    >
                        {t("button")}
                    </button>
                </div>
            </div>
        </section>
    );
}
