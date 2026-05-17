"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useTranslations } from "next-intl"
import { TrendingUp } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

// Organic-traffic bars - rising left to right.
const BARS = [26, 34, 30, 46, 52, 68, 96]

export function SEOWidget() {
    const t = useTranslations("about.widgets.seo")
    const rootRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = rootRef.current
        if (!root) return

        const ctx = gsap.context(() => {
            const borders = gsap.utils.toArray<HTMLElement>("[data-border]", root)
            const bars = gsap.utils.toArray<HTMLElement>("[data-bar]", root)
            const caption = root.querySelector("[data-caption]")

            gsap.set(borders, { scaleX: 0, transformOrigin: "left center" })
            gsap.set(bars, { scaleY: 0, transformOrigin: "bottom center" })
            gsap.set(caption, { opacity: 0, y: 10 })

            gsap.timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: { trigger: root, start: "top 80%", once: true },
            })
                .to(borders, { scaleX: 1, duration: 0.5 })
                .to(bars, { scaleY: 1, duration: 0.5, stagger: 0.08, ease: "power3.out" }, "-=0.15")
                .to(caption, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        }, root)

        return () => ctx.revert()
    }, [])

    return (
        <div ref={rootRef} className="select-none w-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-4">
                <div data-border className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div data-border className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
                <div>
                    <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                        {t("header")}
                    </p>
                    <p className="text-xs" style={{ color: "hsl(var(--primary))" }}>{t("status")}</p>
                </div>
            </div>

            {/* Organic traffic chart */}
            <div className="flex flex-col gap-4 px-6 py-6">
                <div className="flex items-end gap-2 h-32">
                    {BARS.map((h, i) => {
                        const opacity = 0.2 + (i / (BARS.length - 1)) * 0.8
                        return (
                            <div
                                key={i}
                                data-bar
                                className="flex-1 rounded-t-sm"
                                style={{ height: `${h}%`, background: `hsl(var(--primary) / ${opacity})` }}
                            />
                        )
                    })}
                </div>

                <div className="h-px" style={{ background: "hsl(var(--border))" }} />

                <div data-caption className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground)/0.6)" }}>
                        {t("trafficRising")}
                    </span>
                </div>
            </div>
        </div>
    )
}
