"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"

export default function HeroButtonsFlow() {
    const ref = useRef<HTMLDivElement>(null)
    const t = useTranslations("hero")

    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        gsap.fromTo(ref.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.6, delay: 0.35 })
    }, [])

    return (
        <div ref={ref} style={{ opacity: 0 }} className="flex flex-col sm:flex-row gap-3 mt-2 items-center">
            <button
                onClick={scrollTo("#contact")}
                className="rounded-xl bg-white text-[hsl(var(--primary))] font-semibold text-sm px-8 h-11 hover:bg-white/90 transition-colors"
            >
                {t("button")}
            </button>
            <button
                onClick={scrollTo("#services")}
                className="rounded-xl border border-white/40 text-white font-semibold text-sm px-8 h-11 hover:bg-white/10 transition-colors"
            >
                {t("secondaryButton")}
            </button>
        </div>
    )
}
