"use client"

import { useTranslations } from "next-intl"

export default function SystemsWidget() {
    const t = useTranslations("about.widgets.systems")

    const nodeW = 64, nodeH = 36, rx = 6
    const positions = [
        { id: t("app"), x: 12,  y: 20 },
        { id: t("api"), x: 196, y: 20 },
        { id: t("db"),  x: 12,  y: 124 },
        { id: t("cdn"), x: 196, y: 124 },
    ]
    const edges = [
        { path: "M76,38 L196,38",    dur: 1.6 },
        { path: "M44,56 L44,124",    dur: 2.0 },
        { path: "M228,56 L228,124",  dur: 1.8 },
        { path: "M76,142 L196,142",  dur: 1.5 },
    ]

    return (
        <svg width="272" height="180" viewBox="0 0 272 180" style={{ overflow: "visible", maxWidth: "100%" }}>
            {edges.map((e, i) => (
                <path key={i} d={e.path} fill="none"
                    stroke="hsl(var(--primary)/0.28)" strokeWidth={1.2} strokeDasharray="5 4" />
            ))}
            {edges.map((e, i) => (
                <circle key={`d${i}`} r="4" fill="hsl(var(--primary))" opacity="0.9">
                    <animateMotion dur={`${e.dur}s`} repeatCount="indefinite" begin={`${i * 0.55}s`} path={e.path} />
                </circle>
            ))}
            {positions.map((n) => (
                <g key={n.id}>
                    <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx={rx}
                        fill="hsl(var(--primary)/0.11)"
                        stroke="hsl(var(--primary)/0.45)" strokeWidth={1} />
                    <text x={n.x + nodeW / 2} y={n.y + nodeH / 2 + 5}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={12} fontWeight={700} fontFamily="monospace">
                        {n.id}
                    </text>
                </g>
            ))}
        </svg>
    )
}
