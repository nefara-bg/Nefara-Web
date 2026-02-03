"use client"

import * as motion from "motion/react-client";
import { Globe, Monitor, Smartphone, Check } from "lucide-react";

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

    const scrollToContact = () => {
        const contactSection = document.getElementById("contact");
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section id="services" className="py-32 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="max-w-4xl mb-24"
                >
                    <p className="text-primary font-semibold mb-6 tracking-wide uppercase text-sm">{t("tag")}</p>
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground mb-8 text-balance">
                        {t("title")}
                    </h2>
                    <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl leading-relaxed">
                        {t("content")}
                    </p>
                </motion.div>

                {/* Services List - Stripe Style */}
                <div className="space-y-40">
                    {services.map((service, index) => (
                        <div key={service.title} className="group">
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.7 }}
                                className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                            >
                                {/* Text Content */}
                                <div className={`${index % 2 === 1 ? "lg:order-2" : "lg:order-1"}`}>
                                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-secondary/50 mb-8 text-primary">
                                        <service.icon className="w-8 h-8" />
                                    </div>

                                    <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                                        {service.title}
                                    </h3>

                                    <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed border-l-2 border-border pl-6">
                                        {service.description}
                                    </p>

                                    <div className="grid gap-4 mb-10">
                                        {service.features.map((feature, idx) => (
                                            <div key={feature} className="flex items-center gap-4">
                                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                                                    <Check className="w-3.5 h-3.5" />
                                                </div>
                                                <span className="font-medium text-foreground/90">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <button
                                        onClick={scrollToContact}
                                        className="group/btn flex items-center gap-2 text-primary font-semibold hover:text-primary/80 transition-colors"
                                    >
                                        Start with {service.title}
                                        <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                                    </button>
                                </div>

                                {/* Visual Outline Placeholder */}
                                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"}`}>
                                    {/* Main Container Outline */}
                                    <div className="relative aspect-[4/3] w-full rounded-2xl border-2 border-dashed border-primary/20 bg-secondary/5 transition-all duration-500 hover:border-primary/40 group-hover:bg-secondary/10">
                                        {/* Placeholder Label */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center px-4">
                                                <p className="text-sm font-mono text-muted-foreground/60 mb-2">Image Placeholder</p>
                                                <p className="text-xs text-muted-foreground/40">1200 x 900px</p>
                                            </div>
                                        </div>

                                        {/* Floating Card Outline 1 (Top Right) */}
                                        <div className="absolute -right-8 -top-8 w-48 h-32 rounded-xl border-2 border-dashed border-primary/30 bg-background shadow-xl p-4 hidden md:block transform transition-transform duration-500 hover:-translate-y-2">
                                            <div className="w-full h-2 bg-secondary/50 rounded-full mb-3" />
                                            <div className="w-2/3 h-2 bg-secondary/50 rounded-full mb-6" />
                                            <div className="flex gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10" />
                                                <div className="w-8 h-8 rounded-full bg-primary/10" />
                                            </div>
                                        </div>

                                        {/* Floating Card Outline 2 (Bottom Left) */}
                                        <div className={`absolute -left-8 -bottom-8 w-64 h-24 rounded-xl border-2 border-dashed border-primary/30 bg-background shadow-xl p-4 hidden md:flex items-center gap-4 transform transition-transform duration-500 hover:translate-y-2 ${index % 2 === 1 ? "right-auto left-8" : "left-auto -right-8"}`}>
                                            <div className="w-12 h-12 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-600">
                                                <Check className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="w-24 h-2 bg-secondary/50 rounded-full mb-2" />
                                                <div className="w-16 h-2 bg-secondary/30 rounded-full" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-40 text-center">
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                        {t("subtext")}
                    </h3>
                    <button
                        onClick={scrollToContact}
                        className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-all hover:bg-primary/90 hover:scale-105"
                    >
                        {t("button")}
                    </button>
                </div>
            </div>
        </section>
    );
}
