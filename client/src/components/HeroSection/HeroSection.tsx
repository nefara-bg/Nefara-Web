"use client"

import * as motion from "motion/react-client";
import { Sparkles } from "lucide-react";

import { useTranslations } from "next-intl";

export function HeroSection() {
    const t = useTranslations("hero");

    const scrollToServices = () => {
        document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToContact = () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background"
        >
            {/* Animated Gradient Mesh Background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Gradient Orb 1 - Top Right - Cyan/Blue */}
                <div
                    className="absolute -top-24 -right-24 w-96 h-96 md:w-[600px] md:h-[600px] rounded-full opacity-40"
                    style={{
                        background: 'radial-gradient(circle, hsl(200, 100%, 60%) 0%, hsl(220, 90%, 55%) 50%, transparent 70%)',
                        animation: 'float-1 20s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 2 - Bottom Left - Purple/Blue */}
                <div
                    className="absolute -bottom-32 -left-32 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full opacity-30"
                    style={{
                        background: 'radial-gradient(circle, hsl(260, 75%, 60%) 0%, hsl(240, 70%, 50%) 50%, transparent 70%)',
                        animation: 'float-2 25s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 3 - Center - Teal/Cyan */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[550px] md:h-[550px] rounded-full opacity-25"
                    style={{
                        background: 'radial-gradient(circle, hsl(180, 85%, 55%) 0%, hsl(200, 80%, 50%) 50%, transparent 70%)',
                        animation: 'float-3 18s ease-in-out infinite'
                    }}
                />

                {/* Gradient Orb 4 - Top Left - Blue/Indigo */}
                <div
                    className="absolute top-10 left-10 w-80 h-80 md:w-96 md:h-96 rounded-full opacity-20"
                    style={{
                        background: 'radial-gradient(circle, hsl(215, 80%, 60%) 0%, hsl(235, 70%, 55%) 50%, transparent 70%)',
                        animation: 'float-4 22s ease-in-out infinite'
                    }}
                />

                {/* Subtle overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
            </div>

            <div className="container mx-auto px-6 text-center relative z-10 pt-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-8 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border border-border/50"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>{t("tag")}</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                >
                    {t("title")}
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-blue-600 to-cyan-600">
                        {t("title2")}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    {t("content")}
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={scrollToContact}
                        className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 active:scale-95"
                    >
                        {t("button")}
                    </button>
                    <button
                        onClick={scrollToServices}
                        className="group bg-background/80 backdrop-blur-sm border border-input text-foreground px-6 py-3 rounded-xl font-semibold text-base hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300 active:scale-95"
                    >
                        {t("secondaryButton")}
                    </button>
                </motion.div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes float-1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(30px, -30px) scale(1.1);
                    }
                    66% {
                        transform: translate(-20px, 20px) scale(0.9);
                    }
                }

                @keyframes float-2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }
                    33% {
                        transform: translate(-40px, -25px) scale(1.15);
                    }
                    66% {
                        transform: translate(25px, 30px) scale(0.85);
                    }
                }

                @keyframes float-3 {
                    0%, 100% {
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        transform: translate(calc(-50% + 40px), calc(-50% - 40px)) scale(1.2);
                    }
                }

                @keyframes float-4 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1) rotate(0deg);
                    }
                    50% {
                        transform: translate(20px, -20px) scale(1.1) rotate(5deg);
                    }
                }
            `}</style>
        </section>
    );
}
