"use client"

import { motion } from "motion/react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ButtonZoneLines } from "./ButtonZoneLines"

export default function HeroButtonsFlow() {
    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }
    const t = useTranslations("hero")

    return (
        <div style={{ flex: "0 0 5.6vh" }} className="flex relative w-[75%] mx-auto justify-center items-stretch px-4">
            {/* Button zone – upper horizontal */}
            <div className="absolute h-px bg-primary top-0 left-0 w-full" />
            {/* Button zone – lower horizontal */}
            <div className="absolute h-px bg-primary bottom-0 left-0 w-full" />

            {/* Tall left bracket tick */}
            <div className="absolute h-[160%] w-px bg-primary left-4 top-1/2 -translate-y-1/2" />

            {/* Tall right bracket tick */}
            <div className="absolute h-[160%] w-px bg-primary right-4 top-1/2 -translate-y-1/2" />

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex h-full relative w-[65%]"
            >
                <ButtonZoneLines />

                <Button
                    variant="hero"
                    onClick={scrollTo("#contact")}
                    className="flex-none h-full border-0"
                    style={{ width: "38.2%", fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)" }}
                >
                    {t("button")}
                </Button>

                {/* Middle bracket tick */}
                <div className="h-full w-px bg-primary" />                

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
