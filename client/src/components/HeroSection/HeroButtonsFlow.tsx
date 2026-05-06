"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function HeroButtonsFlow() {
    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }
    const t = useTranslations("hero")

    return (
        <div style={{ flex: "0 0 5.6vh" }} className="flex justify-center items-stretch">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex h-full"
                style={{ width: "34.9%" }}
            >
                <Button
                    variant="hero"
                    onClick={scrollTo("#contact")}
                    className="flex-none h-full border-0"
                    style={{ width: "38.2%", fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)" }}
                >
                    {t("button")}
                </Button>
                <Button
                    variant="hero"
                    onClick={scrollTo("#services")}
                    className="flex-1 h-full border-0"
                    style={{ fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)" }}
                >
                    {t("secondaryButton")}
                </Button>
            </motion.div>
        </div>
    )
}
