"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"

export default function HeroButtonsFlow() {
    const ref = useRef<HTMLDivElement>(null)
    const t = useTranslations("hero")

    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, delay: 0.25 })
    }, [])

    return (
        <div ref={ref} style={{ opacity: 0 }} className="flex gap-3 mt-2">
            <Button variant="secondary" onClick={scrollTo("#contact")} className="border-0 px-6 h-10 text-sm">
                {t("button")}
            </Button>
            <Button onClick={scrollTo("#services")} className="border-0 px-6 h-10 text-sm">
                {t("secondaryButton")}
            </Button>
        </div>
    )
}
