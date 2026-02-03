"use client"

import * as motion from "motion/react-client";
import { Sparkles } from "lucide-react";

export function HeroSection() {
    const scrollToServices = () => {
        document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
    };

    const scrollToContact = () => {
        document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center hero-gradient relative overflow-hidden"
        >
            {/* Subtle decorative gradient circles */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/50 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/30 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 text-center relative z-10 pt-20">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 text-muted-foreground text-sm mb-8"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Building Digital Excellence Since 2024</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight"
                >
                    Custom Software
                    <br />
                    Solutions
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
                >
                    Transform your ideas into powerful digital experiences. We craft exceptional
                    websites, desktop applications, and mobile apps that drive real business
                    results.
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
                        className="bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
                    >
                        Get Started
                    </button>
                    <button
                        onClick={scrollToServices}
                        className="group bg-background border border-input text-foreground px-8 py-4 rounded-xl font-semibold text-lg hover:bg-secondary/50 hover:border-primary/50 transition-all duration-300"
                    >
                        View Our Services
                    </button>
                </motion.div>
            </div>
        </section>
    );
}
