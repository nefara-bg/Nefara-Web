export default function SystemsWidget() {
    const nodeW = 36, nodeH = 22, rx = 4
    const positions = [
        { id: "App", x: 8,   y: 12 },
        { id: "API", x: 116, y: 12 },
        { id: "DB",  x: 8,   y: 76 },
        { id: "CDN", x: 116, y: 76 },
    ]
    const edges = [
        { path: "M44,23 L116,23",  dur: 1.6 },
        { path: "M26,34 L26,76",   dur: 2.0 },
        { path: "M134,34 L134,76", dur: 1.8 },
        { path: "M44,87 L116,87",  dur: 1.5 },
    ]

    return (
        <svg width="170" height="115" viewBox="0 0 170 115" style={{ overflow: "visible" }}>
            {edges.map((e, i) => (
                <path key={i} d={e.path} fill="none"
                    stroke="hsl(var(--primary)/0.28)" strokeWidth={1} strokeDasharray="4 3" />
            ))}
            {edges.map((e, i) => (
                <circle key={`d${i}`} r="2.5" fill="hsl(var(--primary))" opacity="0.9">
                    <animateMotion dur={`${e.dur}s`} repeatCount="indefinite" begin={`${i * 0.55}s`} path={e.path} />
                </circle>
            ))}
            {positions.map((n) => (
                <g key={n.id}>
                    <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx={rx}
                        fill="hsl(var(--primary)/0.11)"
                        stroke="hsl(var(--primary)/0.45)" strokeWidth={0.75} />
                    <text x={n.x + nodeW / 2} y={n.y + nodeH / 2 + 3.5}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={8} fontWeight={700} fontFamily="monospace">
                        {n.id}
                    </text>
                </g>
            ))}
        </svg>
    )
}
