"use client"

import * as motion from "motion/react-client"
import { Sparkles, ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export function HeroSection() {
    const t = useTranslations("hero")

    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section
            id="home"
            className="relative isolate overflow-hidden bg-background min-h-screen flex items-center pt-24 pb-20"
        >
            {/* Layered backdrop: faint grid + teal glow + navy glow */}
            <div className="absolute inset-0 -z-10 grid-pattern opacity-60" />
            <div
                className="absolute -top-32 -right-32 w-[640px] h-[640px] rounded-full -z-10"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.28) 0%, hsl(var(--primary) / 0.08) 40%, transparent 70%)",
                }}
            />
            <div
                className="absolute -bottom-40 -left-32 w-[560px] h-[560px] rounded-full -z-10"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--secondary) / 0.18) 0%, hsl(var(--secondary) / 0.05) 45%, transparent 75%)",
                }}
            />

            <div className="mx-auto max-w-6xl w-full px-6 lg:px-8 text-center">
                {/* Eyebrow
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-md border border-border bg-card/80 backdrop-blur-sm text-xs font-bold tracking-widest uppercase text-[hsl(var(--primary-strong))]"
                >
                    <Sparkles className="w-3.5 h-3.5" />
                    {t("tag")}
                </motion.div> */}

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05] mb-6"
                >
                    {t("title")}
                    <span className="block bg-gradient-to-r from-[hsl(var(--primary))] via-[hsl(var(--primary-strong))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
                        {t("title2")}
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10"
                >
                    {t("content")}
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center"
                >
                    <Button size="lg" onClick={scrollTo("#contact")}>
                        {t("button")}
                        <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button size="lg" variant="outline" onClick={scrollTo("#services")}>
                        {t("secondaryButton")}
                    </Button>
                </motion.div>
            </div>
        </section>
    )
}
