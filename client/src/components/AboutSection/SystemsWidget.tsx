"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

const LINE_START = 0.0
const LINE_END   = 0.85

// Triangle geometry (SVG units, viewBox 0 0 260 240)
const CX = 130, CY = 122, R = 80

function vertex(angleDeg: number) {
    const a = (angleDeg * Math.PI) / 180
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
}

const V = [vertex(-90), vertex(30), vertex(150)] // top, bottom-right, bottom-left

// Equilateral triangle side length
const EDGE_LEN = Math.round(R * Math.sqrt(3))

// Node entry: one by one
const NODE_STARTS = [0.15, 0.30, 0.45] as const
const NODE_ENDS   = [0.30, 0.45, 0.60] as const

// Edge draw-in overlapping node appearance
const EDGE_STARTS = [0.25, 0.38, 0.50] as const
const EDGE_ENDS   = [0.40, 0.53, 0.65] as const

// Center label fade-in
const CENTER_IN = [0.55, 0.72] as const

// Rotation: 0° → 120° over full scroll
const ROTATE_START = 0.10
const ROTATE_END   = 0.92
const ROTATE_DEG   = 120

const EDGES = [
    { x1: V[0].x, y1: V[0].y, x2: V[1].x, y2: V[1].y },
    { x1: V[1].x, y1: V[1].y, x2: V[2].x, y2: V[2].y },
    { x1: V[2].x, y1: V[2].y, x2: V[0].x, y2: V[0].y },
]

// Node visual radius
const NODE_R = 32

export default function SystemsWidget() {
    const t = useTranslations("about.widgets.systems")
    const subscribe = useContext(SceneScrollContext)

    const borderTopRef = useRef<HTMLDivElement>(null)
    const borderBotRef = useRef<HTMLDivElement>(null)
    const groupRef     = useRef<SVGGElement>(null)
    const nodeRefs     = useRef<(SVGGElement | null)[]>([])
    const labelRefs    = useRef<(SVGGElement | null)[]>([])
    const edgeRefs     = useRef<(SVGLineElement | null)[]>([])
    const centerRef    = useRef<SVGGElement>(null)

    const labels = [t("quicx"), t("pmad"), t("sandokan")]

    useEffect(() => {
        gsap.set([borderTopRef.current, borderBotRef.current], {
            scaleX: 0, transformOrigin: "left center",
        })
        gsap.set(groupRef.current, { rotation: 0, svgOrigin: `${CX} ${CY}` })
        nodeRefs.current.forEach(el => el && gsap.set(el, {
            opacity: 0, scale: 0.5, transformOrigin: "center center",
        }))
        edgeRefs.current.forEach(el => el && gsap.set(el, {
            strokeDasharray: EDGE_LEN,
            strokeDashoffset: EDGE_LEN,
        }))
        gsap.set(centerRef.current, { opacity: 0, scale: 0.8, transformOrigin: "center center" })

        return subscribe((v) => {
            gsap.set([borderTopRef.current, borderBotRef.current], { scaleX: fade(v, LINE_START, LINE_END) })

            // Rotate triangle, counter-rotate labels to keep them upright
            const rotDeg = fade(v, ROTATE_START, ROTATE_END) * ROTATE_DEG
            gsap.set(groupRef.current, { rotation: rotDeg, svgOrigin: `${CX} ${CY}` })
            labelRefs.current.forEach((el, i) => {
                if (!el) return
                gsap.set(el, { rotation: -rotDeg, svgOrigin: `${V[i].x} ${V[i].y}` })
            })

            // Nodes appear one by one
            nodeRefs.current.forEach((el, i) => {
                if (!el) return
                const k = fade(v, NODE_STARTS[i], NODE_ENDS[i])
                gsap.set(el, { opacity: k, scale: 0.5 + 0.5 * k, transformOrigin: "center center" })
            })

            // Edges draw in
            edgeRefs.current.forEach((el, i) => {
                if (!el) return
                gsap.set(el, { strokeDashoffset: EDGE_LEN * (1 - fade(v, EDGE_STARTS[i], EDGE_ENDS[i])) })
            })

            // Center label
            const kc = fade(v, CENTER_IN[0], CENTER_IN[1])
            gsap.set(centerRef.current, { opacity: kc, scale: 0.8 + 0.2 * kc, transformOrigin: "center center" })
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

            {/* Triangle diagram */}
            <div className="flex items-center justify-center px-4 py-6">
                <svg
                    viewBox="0 0 260 240"
                    style={{ width: "100%", maxWidth: 260, overflow: "visible" }}
                >

                    {/* Rotating group: edges + nodes */}
                    <g ref={groupRef}>
                        {/* Dashed ghost edges */}
                        {EDGES.map((e, i) => (
                            <line key={`track-${i}`}
                                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                                stroke="hsl(var(--primary)/0.12)"
                                strokeWidth={1.5} strokeDasharray="6 5" />
                        ))}

                        {/* Animated draw-in edges */}
                        {EDGES.map((e, i) => (
                            <line key={`edge-${i}`}
                                ref={el => { edgeRefs.current[i] = el }}
                                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                                stroke="hsl(var(--primary)/0.35)"
                                strokeWidth={1.5}
                                strokeDasharray={EDGE_LEN}
                                strokeDashoffset={EDGE_LEN} />
                        ))}

                        {/* Product nodes */}
                        {labels.map((label, i) => (
                            <g key={label} ref={el => { nodeRefs.current[i] = el }} style={{ opacity: 0 }}>
                                {/* Opaque background masks the edge lines underneath */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R + 6}
                                    fill="hsl(var(--background))" stroke="none" />
                                {/* Outer ring (like reference image) */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R + 5}
                                    fill="none"
                                    stroke="hsl(var(--primary)/0.2)"
                                    strokeWidth={1} />
                                {/* Inner filled circle */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R}
                                    fill="hsl(var(--primary)/0.12)"
                                    stroke="hsl(var(--primary)/0.5)"
                                    strokeWidth={1.5} />
                                {/* Label — counter-rotated to stay upright */}
                                <g ref={el => { labelRefs.current[i] = el }}>
                                    <text
                                        x={V[i].x} y={V[i].y + 5}
                                        textAnchor="middle"
                                        fill="hsl(var(--primary))"
                                        fontSize={12} fontWeight={700} fontFamily="monospace">
                                        {label}
                                    </text>
                                </g>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>
        </div>
    )
}
