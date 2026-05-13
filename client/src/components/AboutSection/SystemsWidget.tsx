"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

const LINE_START = 0.0
const LINE_END   = 0.85

// Node animation window
const NODES_IN  = [0.30, 0.50] as const

// Edge lengths (px in viewBox units)
const EDGE_LENGTHS = [120, 68, 68, 120] as const
const EDGE_STARTS  = [0.40, 0.45, 0.45, 0.55] as const
const EDGE_ENDS    = [0.60, 0.65, 0.65, 0.75] as const

export default function SystemsWidget() {
    const t = useTranslations("about.widgets.systems")

    const subscribe    = useContext(SceneScrollContext)
    const borderTopRef = useRef<HTMLDivElement>(null)
    const borderBotRef = useRef<HTMLDivElement>(null)
    const nodeRefs     = useRef<(SVGGElement | null)[]>([])
    const edgeRefs     = useRef<(SVGPathElement | null)[]>([])
    const dotRefs      = useRef<(SVGCircleElement | null)[]>([])

    const nodeW = 64, nodeH = 36, rx = 6
    const nodes = [
        { label: t("app"), x: 12,  y: 20  },
        { label: t("api"), x: 196, y: 20  },
        { label: t("db"),  x: 12,  y: 124 },
        { label: t("cdn"), x: 196, y: 124 },
    ]
    const edges = [
        { d: "M76,38 L196,38",   dur: 1.6 },
        { d: "M44,56 L44,124",   dur: 2.0 },
        { d: "M228,56 L228,124", dur: 1.8 },
        { d: "M76,142 L196,142", dur: 1.5 },
    ]

    useEffect(() => {
        // Header borders
        gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: 0, transformOrigin: "left center" })

        // Nodes hidden
        nodeRefs.current.forEach(el => el && gsap.set(el, { opacity: 0, scale: 0.85, transformOrigin: "center center" }))

        // Edges hidden
        edgeRefs.current.forEach((el, i) => el && gsap.set(el, {
            strokeDasharray: EDGE_LENGTHS[i],
            strokeDashoffset: EDGE_LENGTHS[i],
        }))

        // Dots hidden
        dotRefs.current.forEach(el => el && gsap.set(el, { opacity: 0 }))

        return subscribe((v) => {
            // Header borders
            const lineK = fade(v, LINE_START, LINE_END)
            gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: lineK })

            // Nodes
            const kn = fade(v, NODES_IN[0], NODES_IN[1])
            nodeRefs.current.forEach(el => el && gsap.set(el, { opacity: kn, scale: 0.85 + 0.15 * kn }))

            // Edges + dots
            edgeRefs.current.forEach((el, i) => {
                if (!el) return
                const ke = fade(v, EDGE_STARTS[i], EDGE_ENDS[i])
                gsap.set(el, { strokeDashoffset: EDGE_LENGTHS[i] * (1 - ke) })

                const dot = dotRefs.current[i]
                if (dot) gsap.set(dot, { opacity: ke })
            })
        })
    }, [subscribe])

    return (
        <div className="select-none w-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 px-6 py-4">
                <div ref={borderTopRef} className="absolute inset-x-0 top-0 h-px"
                    style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
                <div ref={borderBotRef} className="absolute inset-x-0 bottom-0 h-px"
                    style={{ background: "hsl(var(--border))", transform: "scaleX(0)", transformOrigin: "left center" }} />
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "hsl(var(--primary))" }} />
                <div>
                    <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                        {t("header")}
                    </p>
                    <p className="text-xs" style={{ color: "hsl(var(--primary))" }}>{t("status")}</p>
                </div>
            </div>

            {/* Diagram */}
            <div className="flex items-center justify-center px-6 py-5">
                <svg width="272" height="180" viewBox="0 0 272 180" style={{ overflow: "visible", maxWidth: "100%" }}>
                    {/* Edges (dashed track) */}
                    {edges.map((e, i) => (
                        <path key={`track-${i}`} d={e.d} fill="none"
                            stroke="hsl(var(--primary)/0.15)" strokeWidth={1.2} strokeDasharray="5 4" />
                    ))}

                    {/* Edges (animated draw-in) */}
                    {edges.map((e, i) => (
                        <path
                            key={`edge-${i}`}
                            ref={el => { edgeRefs.current[i] = el }}
                            d={e.d}
                            fill="none"
                            stroke="hsl(var(--primary)/0.5)"
                            strokeWidth={1.2}
                            strokeDasharray={EDGE_LENGTHS[i]}
                            strokeDashoffset={EDGE_LENGTHS[i]}
                        />
                    ))}

                    {/* Moving dots along edges */}
                    {edges.map((e, i) => (
                        <circle key={`dot-${i}`} ref={el => { dotRefs.current[i] = el }} r="3.5"
                            fill="hsl(var(--primary))" opacity="0">
                            <animateMotion dur={`${e.dur}s`} repeatCount="indefinite"
                                begin={`${i * 0.55}s`} path={e.d} />
                        </circle>
                    ))}

                    {/* Nodes */}
                    {nodes.map((n, i) => (
                        <g key={n.label} ref={el => { nodeRefs.current[i] = el }} style={{ opacity: 0 }}>
                            <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx={rx}
                                fill="hsl(var(--primary)/0.1)"
                                stroke="hsl(var(--primary)/0.4)" strokeWidth={1} />
                            <text x={n.x + nodeW / 2} y={n.y + nodeH / 2 + 5}
                                textAnchor="middle"
                                fill="hsl(var(--primary))"
                                fontSize={12} fontWeight={700} fontFamily="monospace">
                                {n.label}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    )
}
