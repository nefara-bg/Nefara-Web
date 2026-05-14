"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const PATH_LENGTH    = 280
const CONNECTOR_LEN  = 26   // SVG units — each connector is 26 units long (y=4→-22 or y=32→58)
const START = 0.35
const END   = 0.95

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

// v = START + (cumLen / PATH_LENGTH) × (END - START)
//   peak  (cumLen ≈  42): 0.35 + (42/280)  × 0.6 ≈ 0.440
//   trough(cumLen ≈ 159): 0.35 + (159/280) × 0.6 ≈ 0.691
const V_PEAK   = 0.440
const V_TROUGH = 0.691

// Sequence per landmark:  dot [v, v+0.02]  →  connector [v, v+0.08]  →  label [v+0.04, v+0.12]
const UPTIME_DOT_IN   = [V_PEAK,   V_PEAK   + 0.02] as const
const UPTIME_LINE_IN  = [V_PEAK,   V_PEAK   + 0.08] as const
const UPTIME_IN       = [V_PEAK   + 0.04, V_PEAK   + 0.12] as const

const MONITOR_DOT_IN  = [V_TROUGH, V_TROUGH + 0.02] as const
const MONITOR_LINE_IN = [V_TROUGH, V_TROUGH + 0.08] as const
const MONITOR_IN      = [V_TROUGH + 0.04, V_TROUGH + 0.12] as const

export default function SupportWidget() {
    const t = useTranslations("about.widgets.support")
    const subscribe = useContext(SceneScrollContext)

    const borderTopRef    = useRef<HTMLDivElement>(null)
    const borderBotRef    = useRef<HTMLDivElement>(null)
    const pathRef         = useRef<SVGPathElement>(null)
    const uptimeLineRef   = useRef<SVGLineElement>(null)
    const monitorLineRef  = useRef<SVGLineElement>(null)
    const uptimeDotRef    = useRef<HTMLDivElement>(null)
    const monitorDotRef   = useRef<HTMLDivElement>(null)
    const uptimeRef       = useRef<HTMLDivElement>(null)
    const monitorRef      = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const path = pathRef.current
        if (!path) return

        gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: 0, transformOrigin: "left center" })
        gsap.set(path,               { strokeDashoffset: PATH_LENGTH })
        gsap.set(uptimeLineRef.current,  { strokeDashoffset: CONNECTOR_LEN })
        gsap.set(monitorLineRef.current, { strokeDashoffset: CONNECTOR_LEN })
        gsap.set(uptimeDotRef.current,   { scale: 0, opacity: 0 })
        gsap.set(monitorDotRef.current,  { scale: 0, opacity: 0 })
        gsap.set(uptimeRef.current,      { opacity: 0, y: 6 })
        gsap.set(monitorRef.current,     { opacity: 0, y: -6 })

        return subscribe((v) => {
            gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: Math.min(1, v / 0.85) })

            gsap.set(path, { strokeDashoffset: PATH_LENGTH * (1 - fade(v, START, END)) })

            const kud = fade(v, UPTIME_DOT_IN[0],  UPTIME_DOT_IN[1])
            gsap.set(uptimeDotRef.current,   { scale: kud, opacity: kud })
            gsap.set(uptimeLineRef.current,  { strokeDashoffset: CONNECTOR_LEN * (1 - fade(v, UPTIME_LINE_IN[0], UPTIME_LINE_IN[1])) })
            const ku = fade(v, UPTIME_IN[0], UPTIME_IN[1])
            gsap.set(uptimeRef.current,      { opacity: ku, y: 6 * (1 - ku) })

            const kmd = fade(v, MONITOR_DOT_IN[0], MONITOR_DOT_IN[1])
            gsap.set(monitorDotRef.current,  { scale: kmd, opacity: kmd })
            gsap.set(monitorLineRef.current, { strokeDashoffset: CONNECTOR_LEN * (1 - fade(v, MONITOR_LINE_IN[0], MONITOR_LINE_IN[1])) })
            const km = fade(v, MONITOR_IN[0], MONITOR_IN[1])
            gsap.set(monitorRef.current,     { opacity: km, y: -6 * (1 - km) })
        })
    }, [subscribe])

    return (
        <div className="select-none w-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-4">
                <div ref={borderTopRef} className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
                <div ref={borderBotRef} className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
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
                        ref={uptimeRef}
                        className="absolute flex flex-col items-center"
                        style={{ left: "22.67%", bottom: 4, transform: "translateX(-50%)", opacity: 0 }}
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
                            ref={pathRef}
                            d="M0,18 L26,18 L34,4 L42,32 L50,18 L76,18 L84,4 L92,32 L100,18 L150,18"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="0.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeDasharray={PATH_LENGTH}
                            strokeDashoffset={PATH_LENGTH}
                        />
                    </svg>

                    <div ref={uptimeDotRef} className="absolute w-[7px] h-[7px] rounded-full"
                        style={{ left: "22.67%", top: "11.11%", transform: "translate(-50%, -50%)", background: "hsl(var(--primary))", opacity: 0 }} />
                    <div ref={monitorDotRef} className="absolute w-[7px] h-[7px] rounded-full"
                        style={{ left: "61.33%", top: "88.89%", transform: "translate(-50%, -50%)", background: "hsl(var(--primary))", opacity: 0 }} />
                </div>

                {/* 24/7 monitoring — anchored below second trough */}
                <div className="relative h-14">
                    <div
                        ref={monitorRef}
                        className="absolute flex flex-col items-center"
                        style={{ left: "61.33%", top: 4, transform: "translateX(-50%)", opacity: 0 }}
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
