"use client"

import { useTranslations } from "next-intl"
import { TrendingUp } from "lucide-react"

// Organic-traffic bars — rising left to right.
const BARS = [26, 34, 30, 46, 52, 68, 96]

export function SEOWidget() {
    const t = useTranslations("about.widgets.seo")

    return (
        <div className="select-none w-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-4">
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))" }} />
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
                                className="flex-1 rounded-t-sm"
                                style={{ height: `${h}%`, background: `hsl(var(--primary) / ${opacity})` }}
                            />
                        )
                    })}
                </div>

                <div className="h-px" style={{ background: "hsl(var(--border))" }} />

                <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--primary))" }} />
                    <span className="text-xs font-medium" style={{ color: "hsl(var(--foreground)/0.6)" }}>
                        {t("trafficRising")}
                    </span>
                </div>
            </div>
        </div>
    )
}
