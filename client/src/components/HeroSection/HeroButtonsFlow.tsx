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
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="flex gap-3 mt-2"
        >
            <Button
                variant="secondary"
                onClick={scrollTo("#contact")}
                className="border-0 px-6 h-10 text-sm"
            >
                {t("button")}
            </Button>

            <Button
                onClick={scrollTo("#services")}
                className="border-0 px-6 h-10 text-sm"
            >
                {t("secondaryButton")}
            </Button>
        </motion.div>
    )
}
