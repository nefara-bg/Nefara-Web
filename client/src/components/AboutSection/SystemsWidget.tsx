"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { ActiveContext } from "@/components/ScrollStory/SceneTransition"

const LINE_START = 0.0
const LINE_END   = 0.85

// Triangle geometry (SVG units, viewBox 0 0 260 255)
const CX = 130, CY = 140, R = 100

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
const borderTopRef = useRef<HTMLDivElement>(null)
    const borderBotRef = useRef<HTMLDivElement>(null)
    const groupRef     = useRef<SVGGElement>(null)
    const nodeRefs     = useRef<(SVGGElement | null)[]>([])
    const labelRefs    = useRef<(SVGGElement | null)[]>([])
    const edgeRefs     = useRef<(SVGLineElement | null)[]>([])
    const centerRef    = useRef<SVGGElement>(null)

    const labels = [t("quicx"), t("pmad"), t("sand")]

    const isDone = useContext(ActiveContext)

    const tlRef = useRef<gsap.core.Timeline | null>(null)


    const setToReset = () => {
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
    }

    const playEntryTimeline = () => {
        tlRef.current?.kill()
        const TOTAL = 2.4
        const t = (frac: number) => frac * TOTAL

        const tl = gsap.timeline()
        tlRef.current = tl

        // Borders
        tl.to([borderTopRef.current, borderBotRef.current],
            { scaleX: 1, duration: t(LINE_END - LINE_START), ease: "power2.out" },
            t(LINE_START))

        // Triangle rotation + counter-rotation
        tl.to(groupRef.current,
            {
                rotation: ROTATE_DEG,
                svgOrigin: `${CX} ${CY}`,
                duration: t(ROTATE_END - ROTATE_START),
                ease: "power1.inOut",
                onUpdate() {
                    const rot = gsap.getProperty(groupRef.current, "rotation") as number
                    labelRefs.current.forEach((el, i) => {
                        if (!el) return
                        gsap.set(el, { rotation: -rot, svgOrigin: `${V[i].x} ${V[i].y}` })
                    })
                },
            },
            t(ROTATE_START))

        // Nodes one by one
        nodeRefs.current.forEach((el, i) => {
            if (!el) return
            tl.to(el,
                { opacity: 1, scale: 1, transformOrigin: "center center", duration: t(NODE_ENDS[i] - NODE_STARTS[i]), ease: "back.out(1.4)" },
                t(NODE_STARTS[i]))
        })

        // Edges draw in
        edgeRefs.current.forEach((el, i) => {
            if (!el) return
            tl.to(el,
                { strokeDashoffset: 0, duration: t(EDGE_ENDS[i] - EDGE_STARTS[i]), ease: "power2.out" },
                t(EDGE_STARTS[i]))
        })

        // Center label
        tl.to(centerRef.current,
            { opacity: 1, scale: 1, transformOrigin: "center center", duration: t(CENTER_IN[1] - CENTER_IN[0]), ease: "power2.out" },
            t(CENTER_IN[0]))
    }

    // Initialize to reset state on mount so no snap occurs before the entry animation
    useEffect(() => {
        setToReset()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Fire entry animation once when the scene transition completes
    useEffect(() => {
        if (!isDone) return
        playEntryTimeline()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDone])

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
                    viewBox="0 0 260 255"
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

                    {/* Center label — outside rotating group so it stays upright */}
                    <g ref={centerRef} style={{ opacity: 0 }}>
                        <text
                            x={CX} y={CY - 6}
                            textAnchor="middle"
                            fill="hsl(var(--primary))"
                            fontSize={22} fontWeight={700} fontFamily="monospace">
                            3
                        </text>
                        <text
                            x={CX} y={CY + 12}
                            textAnchor="middle"
                            fill="hsl(var(--primary)/0.6)"
                            fontSize={9} fontWeight={500} fontFamily="monospace"
                            letterSpacing="0.08em">
                            {t("products")}
                        </text>
                    </g>
                </svg>
            </div>
        </div>
    )
}
