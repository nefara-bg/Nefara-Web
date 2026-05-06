"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function HeroButtons() {
    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    const t = useTranslations("hero")

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="absolute flex"
            style={{
                top: "62.9%",
                left: "33.7%",
                right: "31.4%",
                height: "5.6%",
            }}
        >
            {/* "Contact Us" – 255 / 668 ≈ 38.2% of combined width */}
            <Button
                variant="hero"
                onClick={scrollTo("#contact")}
                className="flex-none h-full border-0"
                style={{
                    width: "38.2%",
                    fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                }}
            >
                {t("button")}
            </Button>

            {/* "View Our Services" – 411 / 668 ≈ 61.5% */}
            <Button
                variant="hero"
                onClick={scrollTo("#services")}
                className="flex-1 h-full border-0"
                style={{
                    fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                }}
            >
                {t("secondaryButton")}
            </Button>
        </motion.div>
    )
}
