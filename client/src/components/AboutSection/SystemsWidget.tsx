"use client"

import { useTranslations } from "next-intl"

// Triangle geometry (SVG units, viewBox 0 0 260 255)
const CX = 130, CY = 140, R = 100

function vertex(angleDeg: number) {
    const a = (angleDeg * Math.PI) / 180
    return { x: CX + R * Math.cos(a), y: CY + R * Math.sin(a) }
}

const V = [vertex(-90), vertex(30), vertex(150)] // top, bottom-right, bottom-left

const EDGES = [
    { x1: V[0].x, y1: V[0].y, x2: V[1].x, y2: V[1].y },
    { x1: V[1].x, y1: V[1].y, x2: V[2].x, y2: V[2].y },
    { x1: V[2].x, y1: V[2].y, x2: V[0].x, y2: V[0].y },
]

// Node visual radius
const NODE_R = 32

export default function SystemsWidget() {
    const t = useTranslations("about.widgets.systems")
    const labels = [t("quicx"), t("pmad"), t("sand")]

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

            {/* Triangle diagram */}
            <div className="flex items-center justify-center px-4 py-6">
                <svg
                    viewBox="0 0 260 255"
                    style={{ width: "100%", maxWidth: 260, overflow: "visible" }}
                >
                    <g>
                        {/* Dashed ghost edges */}
                        {EDGES.map((e, i) => (
                            <line key={`track-${i}`}
                                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                                stroke="hsl(var(--primary)/0.12)"
                                strokeWidth={1.5} strokeDasharray="6 5" />
                        ))}

                        {/* Edges */}
                        {EDGES.map((e, i) => (
                            <line key={`edge-${i}`}
                                x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
                                stroke="hsl(var(--primary)/0.35)"
                                strokeWidth={1.5} />
                        ))}

                        {/* Product nodes */}
                        {labels.map((label, i) => (
                            <g key={label}>
                                {/* Opaque background masks the edge lines underneath */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R + 6}
                                    fill="hsl(var(--background))" stroke="none" />
                                {/* Outer ring */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R + 5}
                                    fill="none"
                                    stroke="hsl(var(--primary)/0.2)"
                                    strokeWidth={1} />
                                {/* Inner filled circle */}
                                <circle cx={V[i].x} cy={V[i].y} r={NODE_R}
                                    fill="hsl(var(--primary)/0.12)"
                                    stroke="hsl(var(--primary)/0.5)"
                                    strokeWidth={1.5} />
                                <text
                                    x={V[i].x} y={V[i].y + 5}
                                    textAnchor="middle"
                                    fill="hsl(var(--primary))"
                                    fontSize={12} fontWeight={700} fontFamily="monospace">
                                    {label}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Center label */}
                    <g>
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
