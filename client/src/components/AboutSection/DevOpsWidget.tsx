"use client"

/* Barcode bars: [x, width] — rendered inside x=201..269, y=43..65 */
const BC: [number, number][] = [
    [201,2],[204,1],[206,3],[210,1],[212,2],[215,1],[217,3],[221,1],
    [223,2],[226,1],[228,2],[231,1],[233,3],[237,1],[239,2],[242,2],
    [245,1],[247,3],[251,1],[253,2],[256,1],[258,2],[261,3],[265,1],[267,2],
]

const LINE_COLORS = ["#2dd4bf", "#67e8f9", "#5eead4"] as const

export function DevOpsWidget() {
    return (
        <div className="w-full h-full flex items-center justify-center" style={{ background: "#060d18" }}>
            <style>{`
                @keyframes devops-dash { to { stroke-dashoffset: -10; } }
            `}</style>

            <svg viewBox="0 0 300 155" className="w-full h-full" style={{ maxWidth: 296, maxHeight: 148 }}>

                {/* ── LEFT: Source / Repo box ── */}
                <rect x="20" y="36" width="92" height="83" rx="9"
                    fill="#081220" stroke="#2dd4bf" strokeWidth="1.5"
                    style={{ filter: "drop-shadow(0 0 8px #2dd4bf22)" }} />

                {/* Corner screws */}
                {([[28,44],[103,44],[28,110],[103,110]] as [number,number][]).map(([cx,cy],i) => (
                    <circle key={i} cx={cx} cy={cy} r="1.8" fill="none" stroke="#1e3a4a" strokeWidth="1" />
                ))}

                {/* Code glyph */}
                <text x="66" y="74" textAnchor="middle" fill="#2dd4bf"
                    fontSize="17" fontWeight="700"
                    fontFamily="'SF Mono','Fira Code',ui-monospace,monospace">
                    {"</>"}
                </text>

                {/* Source label */}
                <text x="66" y="88" textAnchor="middle" fill="#0d9488"
                    fontSize="6.5" letterSpacing="1"
                    fontFamily="'SF Mono',ui-monospace,monospace">
                    main · push
                </text>

                {/* Activity pulse */}
                <circle cx="66" cy="101" r="2.5" fill="#2dd4bf" opacity="0.75" />
                <circle cx="66" cy="101" r="5.5" fill="none" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.3" />

                {/* ── CENTER: Animated dashed connectors ── */}
                {([53, 77, 101] as number[]).map((y, i) => (
                    <g key={i}>
                        {/* Left port */}
                        <circle cx="112" cy={y} r="2.8" fill="#060d18"
                            stroke={LINE_COLORS[i]} strokeWidth="1.3" />
                        {/* Flowing dashes */}
                        <line
                            x1="117" y1={y} x2="183" y2={y}
                            stroke={LINE_COLORS[i]}
                            strokeWidth="1.4"
                            strokeDasharray="4 5"
                            strokeLinecap="round"
                            style={{
                                animation: "devops-dash 0.55s linear infinite",
                                animationDelay: `${i * 0.16}s`,
                            }}
                        />
                        {/* Right port */}
                        <circle cx="188" cy={y} r="2.8" fill="#060d18"
                            stroke={LINE_COLORS[i]} strokeWidth="1.3" />
                    </g>
                ))}

                {/* ── RIGHT: Deployment card ── */}
                <rect x="191" y="36" width="89" height="83" rx="9"
                    fill="#081220" stroke="#162032" strokeWidth="1" />

                {/* Barcode background strip */}
                <rect x="199" y="43" width="73" height="22" rx="2" fill="#030a12" />

                {/* Guard bars */}
                <rect x="199" y="43" width="2"  height="22" fill="#2dd4bf" />
                <rect x="269" y="43" width="2"  height="22" fill="#2dd4bf" />

                {/* Barcode data bars */}
                {BC.map(([x, w], i) => (
                    <rect key={i} x={x} y={43} width={w} height={22} fill="#2dd4bf" opacity="0.88" />
                ))}

                {/* Subtle divider */}
                <line x1="199" y1="71" x2="272" y2="71" stroke="#162032" strokeWidth="0.8" />

                {/* Version tag */}
                <rect x="199" y="76" width="44" height="9" rx="2.5" fill="#08121f" />
                <text x="203" y="83" fill="#67e8f9"
                    fontSize="6.5" fontFamily="'SF Mono',ui-monospace,monospace" fontWeight="600">
                    v2.1.4
                </text>

                {/* Status row */}
                <rect x="199" y="89" width="70" height="9" rx="2.5" fill="#08121f" />
                <circle cx="204" cy="93.5" r="2.3" fill="#2dd4bf" opacity="0.9" />
                <text x="209" y="96" fill="#5eead4"
                    fontSize="6.5" fontFamily="'SF Mono',ui-monospace,monospace">
                    prod · deployed
                </text>

                {/* Check badge top-right of card */}
                <circle cx="268" cy="52" r="7.5"
                    fill="#0d948820" stroke="#0d9488" strokeWidth="1" />
                <text x="268" y="55.5" textAnchor="middle"
                    fill="#2dd4bf" fontSize="9" fontWeight="700">✓</text>

            </svg>
        </div>
    )
}
