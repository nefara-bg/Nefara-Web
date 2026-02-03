"use client"

import * as motion from "motion/react-client";
import { Zap, Layers, Headphones, Shield } from "lucide-react";

// Update paths to use public assets
const teamMember1 = "/assets/team-member-1.jpg";
const teamMember2 = "/assets/team-member-2.jpg";
const teamMember3 = "/assets/team-member-3.jpg";

import { useTranslations } from "next-intl";

export function AboutSection() {
    const t = useTranslations("about");

    const stats = [
        { value: "3+", label: t("experience") },
        { value: "24/7", label: t("support") },
        { value: "100%", label: t("client") },
    ];

    const features = [
        {
            icon: Zap,
            title: t("agile.title"),
            description: t("agile.content"),
        },
        {
            icon: Layers,
            title: t("tech.title"),
            description: t("tech.content"),
        },
        {
            icon: Headphones,
            title: t("featureSupport.title"),
            description: t("featureSupport.content"),
        },
        {
            icon: Shield,
            title: t("quality.title"),
            description: t("quality.content"),
        },
    ];

    const teamMembers = [
        {
            name: "Alexander Petrov",
            role: t("team.leadDev"),
            image: teamMember1,
            number: "01",
        },
        {
            name: "Elena Dimitrova",
            role: t("team.designer"),
            image: teamMember2,
            number: "02",
        },
        {
            name: "Viktor Ivanov",
            role: t("team.pm"),
            image: teamMember3,
            number: "03",
        },
    ];

    return (
        <section id="about" className="py-24 bg-secondary/20">
            <div className="container mx-auto px-6">
                {/* About Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <p className="section-label mb-4">{t("sectionLabel")}</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t("mainTitle")}
                        <br />
                        {t("mainTitle2")}
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        {t("subText")}
                    </p>
                </motion.div>

                {/* Team Section - Staggered Layout like reference */}
                <div className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                            className={`text-center ${index === 1 ? "md:-translate-y-8" : ""}`}
                        >
                            {/* Image Container */}
                            <div className="relative mb-6 group">
                                <div className="relative overflow-hidden rounded-2xl bg-secondary/30">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Number overlay */}
                                    <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                                        <span className="text-sm font-medium text-foreground">{member.number}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                                {member.role}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-20"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center p-6 rounded-xl bg-card card-elevated">
                            <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                                {stat.value}
                            </div>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Mission Section */}
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-12"
                    >
                        <p className="section-label mb-4">{t("tag")}</p>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">
                            {t("subtitle")}
                            <br />
                            {t("subtitle2")}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                            {t("paragraph1")}
                        </p>
                    </motion.div>

                    {/* Features Grid */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-6 rounded-xl bg-card card-elevated group hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h4 className="text-lg font-semibold text-foreground mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
