"use client"

import * as motion from "motion/react-client";
import { Globe, Monitor, Smartphone, Check } from "lucide-react";

import { useTranslations } from "next-intl";

export function ServicesSection() {
    const t = useTranslations("services");

    // Assuming we can use these images directly. If they fail (CORS or hotlinking protection), we should download them.
    // Likely they are public.
    const services = [
        {
            title: t("web.title"),
            description: t("web.content.text"),
            icon: Globe,
            features: [t("web.content.content1"), t("web.content.content2"), t("web.content.content3")],
            image: "https://nefara.org/_next/image?url=%2FwebDev.webp&w=3840&q=75",
        },
        {
            title: t("desktop.title"),
            description: t("desktop.content.text"),
            icon: Monitor,
            features: [t("desktop.content.content1"), t("desktop.content.content2"), t("desktop.content.content3")],
            image: "https://nefara.org/_next/image?url=%2FdesktopDev.webp&w=3840&q=75",
        },
        {
            title: t("mobile.title"),
            description: t("mobile.content.text"),
            icon: Smartphone,
            features: [t("mobile.content.content1"), t("mobile.content.content2"), t("mobile.content.content3")],
            image: "https://nefara.org/_next/image?url=%2FmobileDev.webp&w=3840&q=75",
        },
    ];

    return (
        <section id="services" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-4">{t("tag")}</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("content")}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="space-y-16">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Image */}
                            <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                                <div className="relative overflow-hidden rounded-2xl bg-secondary/30">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-64 md:h-80 object-cover"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <service.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-foreground">{service.title}</h3>
                                </div>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    {service.description}
                                </p>
                                <ul className="space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-muted-foreground">
                                            <Check className="w-4 h-4 text-primary flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-muted-foreground mb-4">
                        {t("subtext")}
                    </p>
                    <button
                        onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                        className="text-foreground font-medium hover:underline"
                    >
                        {t("button")} →
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
