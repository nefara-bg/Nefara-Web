"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"

const DARK = "#0F172A"

export default function HeroButtonsFlow() {
    const ref = useRef<HTMLDivElement>(null)
    const t = useTranslations("hero")

    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        gsap.fromTo(ref.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7, delay: 0.4, ease: "power3.out" })
    }, [])

    return (
        <div ref={ref} style={{ opacity: 0 }} className="flex flex-col sm:flex-row gap-3 mt-2 items-center">
            <button
                onClick={scrollTo("#contact")}
                style={{ background: DARK, color: "#ffffff" }}
                className="rounded-xl font-semibold text-sm px-8 h-11 hover:opacity-85 transition-opacity"
            >
                {t("button")}
            </button>
            <button
                onClick={scrollTo("#services")}
                style={{ border: `1.5px solid ${DARK}`, color: DARK, background: "rgba(255,255,255,0.15)" }}
                className="rounded-xl font-semibold text-sm px-8 h-11 hover:opacity-75 transition-opacity backdrop-blur-sm"
            >
                {t("secondaryButton")}
            </button>
        </div>
    )
}
