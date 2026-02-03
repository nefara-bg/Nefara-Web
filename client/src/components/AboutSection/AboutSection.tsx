"use client"

import * as motion from "motion/react-client";
import { Zap, Layers, Shield, UserCog, MessageSquare } from "lucide-react";

// Placeholder images
const teamMember1 = "https://placehold.co/400x600/1a1a1a/666666?text=Dimitar+Dimkov";
const teamMember2 = "https://placehold.co/400x600/1a1a1a/666666?text=Dimitar+Anastasov";
const teamMember3 = "https://placehold.co/400x600/1a1a1a/666666?text=Martin+Velchev";

import { useTranslations } from "next-intl";

export function AboutSection() {
    const t = useTranslations("about");

    const stats = [
        { value: "3+", label: "Years Experience" },
        { value: "24/7", label: "Support Available" },
        { value: "100%", label: "Client Satisfaction" },
    ];

    const features = [
        {
            icon: UserCog,
            title: t("personalized.title"),
            description: t("personalized.content"),
        },
        {
            icon: Layers,
            title: t("tech.title"),
            description: t("tech.content"),
        },
        {
            icon: MessageSquare,
            title: t("communication.title"),
            description: t("communication.content"),
        },
        {
            icon: Shield,
            title: t("quality.title"),
            description: t("quality.content"),
        },
    ];

    const teamMembers = [
        {
            name: "Dimitar Dimkov",
            role: "PR Specialist",
            image: teamMember1,
        },
        {
            name: "Dimitar Anastasov",
            role: "Software Developer",
            image: teamMember2,
        },
        {
            name: "Martin Velchev",
            role: "Full Stack Developer",
            image: teamMember3,
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 10
            }
        }
    };

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
                                <div className="relative overflow-hidden rounded-2xl bg-secondary/30 border border-border/50 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/10 transition-all duration-500">
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full aspect-[3/4] object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    {/* Gradient overlay for depth */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                </div>
                            </div>

                            {/* Info */}
                            <h3 className="text-lg md:text-xl font-bold text-foreground mb-1">{member.name}</h3>
                            <p className="text-xs md:text-sm text-muted-foreground uppercase tracking-wider">
                                {member.role}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto mb-20"
                >
                    {stats.map((stat) => (
                        <div key={stat.label} className="text-center p-6 md:p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
                            <div className="text-4xl md:text-5xl font-bold text-primary mb-3">
                                {stat.value}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground font-medium leading-relaxed">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* Mission Section */}
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <p className="section-label mb-4">{t("tag")}</p>
                        <h3 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
                            {t("subtitle")}
                            <span className="text-primary block mt-2">
                                {t("subtitle2")}
                            </span>
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto">
                            {t("paragraph1")}
                        </p>
                    </motion.div>

                    {/* Features Grid - Reference Style */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                        className="grid md:grid-cols-2 gap-6"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5 h-[400px] flex flex-col"
                            >
                                {/* Top Content: Title & Description */}
                                <div className="p-8 pb-0 flex justify-between items-start relative z-20">
                                    <div className="max-w-[85%]">
                                        <h4 className="text-2xl font-bold text-foreground mb-3 leading-tight">
                                            {feature.title}
                                        </h4>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </div>
                                    {/* Decorative dot */}
                                    <div className="w-3 h-3 rounded-full bg-secondary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300" />
                                </div>

                                {/* Bottom Visual Area - Different for each card */}
                                <div className="flex-grow relative mt-6 overflow-hidden">
                                    {/* Card 1: Personalized & Fast - Configuration UI */}
                                    {index === 0 && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-900/10 dark:to-indigo-900/10 flex items-center justify-center pt-8">
                                            <div className="w-3/4 h-full bg-background border border-border rounded-t-2xl shadow-xl p-4 flex flex-col gap-3 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50" />
                                                    <div className="h-2 w-20 bg-muted rounded-full" />
                                                </div>
                                                <div className="h-2 w-full bg-secondary/50 rounded-full" />
                                                <div className="h-2 w-2/3 bg-secondary/50 rounded-full" />
                                                <div className="mt-4 flex gap-2">
                                                    <div className="h-8 w-16 bg-primary/10 rounded-lg border border-primary/20" />
                                                    <div className="h-8 w-16 bg-muted rounded-lg" />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Card 2: Tech Stack - Stacked Layers */}
                                    {index === 1 && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-900/10 dark:to-pink-900/10 flex items-center justify-center">
                                            <div className="relative w-48 h-48 transform rotate-x-12 group-hover:scale-110 transition-transform duration-500">
                                                <div className="absolute top-0 left-0 w-full h-32 bg-background border border-border shadow-lg rounded-xl z-30 flex items-center justify-center transform -translate-y-8 translate-x-4">
                                                    <Layers className="w-10 h-10 text-primary" />
                                                </div>
                                                <div className="absolute top-4 left-4 w-full h-32 bg-background/80 border border-border shadow-md rounded-xl z-20 opacity-80" />
                                                <div className="absolute top-8 left-8 w-full h-32 bg-background/60 border border-border shadow-sm rounded-xl z-10 opacity-60" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Card 3: Direct Access - Chat Bubbles */}
                                    {index === 2 && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-emerald-50/50 dark:from-cyan-900/10 dark:to-emerald-900/10 flex flex-col items-center justify-end pb-8 px-8 gap-4">
                                            <div className="self-end bg-primary text-primary-foreground px-4 py-3 rounded-2xl rounded-tr-sm shadow-lg transform group-hover:-translate-x-2 transition-transform duration-500 max-w-[80%]">
                                                <p className="text-xs">Can we tweak the animation?</p>
                                            </div>
                                            <div className="self-start bg-background border border-border text-foreground px-4 py-3 rounded-2xl rounded-tl-sm shadow-md transform group-hover:translate-x-2 transition-transform duration-500 max-w-[80%] flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full bg-green-500" />
                                                <p className="text-xs font-medium">On it right now!</p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Card 4: Quality - Shield Pulse */}
                                    {index === 3 && (
                                        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/50 to-orange-50/50 dark:from-rose-900/10 dark:to-orange-900/10 flex items-center justify-center">
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl animate-pulse" />
                                                <Shield className="w-24 h-24 text-foreground/5 relative z-10" />
                                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                                                        <svg className="w-6 h-6 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
