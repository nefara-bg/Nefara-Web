"use client"

import { useTranslations } from "next-intl"

export default function SupportWidget() {
    const t = useTranslations("about.widgets.support")

    return (
        <div className="select-none w-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-4">
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#22c55e" }} />
                <div>
                    <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                        System Monitor
                    </p>
                    <p className="text-xs" style={{ color: "#22c55e" }}>All systems operational</p>
                </div>
            </div>

            {/* ECG + labels */}
            <div className="flex flex-col px-6 py-5">

                {/* 99.9% uptime — anchored above first peak */}
                <div className="relative h-14">
                    <div
                        className="absolute flex flex-col items-center"
                        style={{ left: "22.67%", bottom: 4, transform: "translateX(-50%)" }}
                    >
                        <span className="font-display font-bold leading-none"
                            style={{ fontSize: 22, color: "hsl(var(--primary))" }}>
                            99.9%
                        </span>
                        <span className="text-[10px] uppercase tracking-widest mt-0.5"
                            style={{ color: "hsl(var(--foreground)/0.4)" }}>
                            {t("uptime")}
                        </span>
                    </div>
                </div>

                {/* ECG */}
                <div className="relative w-full" style={{ aspectRatio: "150 / 36" }}>
                    <svg
                        width="100%"
                        height="100%"
                        viewBox="0 0 150 36"
                        preserveAspectRatio="none"
                        style={{ overflow: "visible", position: "absolute", inset: 0 }}
                    >
                        <line x1="0" y1="18" x2="150" y2="18"
                            stroke="hsl(var(--primary)/0.12)" strokeWidth={1} />

                        <path
                            d="M0,18 L26,18 L34,4 L42,32 L50,18 L76,18 L84,4 L92,32 L100,18 L150,18"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>

                    <div className="absolute w-[7px] h-[7px] rounded-full"
                        style={{ left: "22.67%", top: "11.11%", transform: "translate(-50%, -50%)", background: "hsl(var(--primary))" }} />
                    <div className="absolute w-[7px] h-[7px] rounded-full"
                        style={{ left: "61.33%", top: "88.89%", transform: "translate(-50%, -50%)", background: "hsl(var(--primary))" }} />
                </div>

                {/* 24/7 monitoring — anchored below second trough */}
                <div className="relative h-14">
                    <div
                        className="absolute flex flex-col items-center"
                        style={{ left: "61.33%", top: 4, transform: "translateX(-50%)" }}
                    >
                        <span className="font-display font-bold leading-none"
                            style={{ fontSize: 22, color: "hsl(var(--primary))" }}>
                            24/7
                        </span>
                        <span className="text-[10px] uppercase tracking-widest mt-0.5"
                            style={{ color: "hsl(var(--foreground)/0.4)" }}>
                            {t("monitoring")}
                        </span>
                    </div>
                </div>

            </div>
        </div>
    )
}
