"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"

export default function HeroButtons({ T }: { T: string }) {
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
                right: "31.4%",   // 100 - 68.6
                height: "5.6%",
            }}
        >
            {/* "Contact Us" – 255 / 668 ≈ 38.2% of combined width */}
            <button
                onClick={scrollTo("#contact")}
                className="flex-none flex items-center justify-center font-display font-bold text-foreground bg-transparent hover:bg-[hsl(var(--primary)/0.06)] active:scale-[0.98] transition-colors cursor-pointer"
                style={{
                    width: "38.2%",
                    border: `1px solid ${T}`,
                    fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                }}
            >
                {t("button")}
            </button>

            {/* "View Our Services" – 411 / 668 ≈ 61.5% */}
            <button
                onClick={scrollTo("#services")}
                className="flex-1 flex items-center justify-center font-display font-bold text-foreground bg-transparent hover:bg-[hsl(var(--primary)/0.06)] active:scale-[0.98] transition-colors cursor-pointer"
                style={{
                    border: `1px solid ${T}`,
                    borderLeft: "none",
                    fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                }}
            >
                {t("secondaryButton")}
            </button>
        </motion.div>
    )
}