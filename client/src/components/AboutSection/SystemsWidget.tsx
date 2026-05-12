export default function SystemsWidget() {
    const nodeW = 52, nodeH = 30, rx = 5
    const positions = [
        { id: "App", x: 12,  y: 16 },
        { id: "API", x: 164, y: 16 },
        { id: "DB",  x: 12,  y: 106 },
        { id: "CDN", x: 164, y: 106 },
    ]
    const edges = [
        { path: "M64,31 L164,31",   dur: 1.6 },
        { path: "M38,46 L38,106",   dur: 2.0 },
        { path: "M190,46 L190,106", dur: 1.8 },
        { path: "M64,121 L164,121", dur: 1.5 },
    ]

    return (
        <svg width="240" height="160" className="scale-150" viewBox="0 0 240 160" style={{ overflow: "visible" }}>
            {edges.map((e, i) => (
                <path key={i} d={e.path} fill="none"
                    stroke="hsl(var(--primary)/0.28)" strokeWidth={1.2} strokeDasharray="5 4" />
            ))}
            {edges.map((e, i) => (
                <circle key={`d${i}`} r="3.5" fill="hsl(var(--primary))" opacity="0.9">
                    <animateMotion dur={`${e.dur}s`} repeatCount="indefinite" begin={`${i * 0.55}s`} path={e.path} />
                </circle>
            ))}
            {positions.map((n) => (
                <g key={n.id}>
                    <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx={rx}
                        fill="hsl(var(--primary)/0.11)"
                        stroke="hsl(var(--primary)/0.45)" strokeWidth={1} />
                    <text x={n.x + nodeW / 2} y={n.y + nodeH / 2 + 4.5}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={11} fontWeight={700} fontFamily="monospace">
                        {n.id}
                    </text>
                </g>
            ))}
        </svg>
    )
}
