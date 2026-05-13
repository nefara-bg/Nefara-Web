"use client"

/* Ellipse: center (143,69), rx=80, ry=57 — 12 waypoints every 30° */
const ORBIT1 =
    "223,69; 212,41; 183,20; 143,12; 103,20; 74,41; 63,69; 74,97; 103,118; 143,126; 183,118; 212,97; 223,69"
const ORBIT2 =
    "63,69; 74,97; 103,118; 143,126; 183,118; 212,97; 223,69; 212,41; 183,20; 143,12; 103,20; 74,41; 63,69"

const CURSOR = "M 0 0 L 0 10.5 L 3 8 L 5 13 L 7 12.5 L 5 7.5 L 9 7.5 Z"

export function SEOWidget() {
    return (
        <div className="w-full h-full flex items-center justify-center" style={{ background: "#060d18" }}>
            <svg
                viewBox="0 0 300 155"
                className="w-full h-full"
                style={{ maxWidth: 296, maxHeight: 148, overflow: "visible" }}
            >

                {/* ── Browser window ── */}
                <rect x="65" y="15" width="155" height="108" rx="9"
                    fill="#0a1628" stroke="#1e3a4a" strokeWidth="1" />

                {/* Chrome bar */}
                <rect x="65" y="15" width="155" height="24" rx="9" fill="#0f2035" />
                <rect x="65" y="31" width="155" height="8" fill="#0f2035" />

                {/* Traffic lights */}
                <circle cx="78" cy="27" r="3.5" fill="#ff5f57" />
                <circle cx="88" cy="27" r="3.5" fill="#febc2e" />
                <circle cx="98" cy="27" r="3.5" fill="#28c840" />

                {/* URL bar */}
                <rect x="110" y="21" width="98" height="12" rx="6" fill="#162032" />
                <text x="159" y="29.5" textAnchor="middle" fill="#2dd4bf" fontSize="6.5"
                    fontFamily="'SF Mono',ui-monospace,monospace">nefara.dev</text>

                {/* Divider */}
                <line x1="65" y1="39" x2="220" y2="39" stroke="#162032" strokeWidth="0.8" />

                {/* ── SERP content ── */}
                {/* Rank badge + URL */}
                <rect x="74" y="45" width="16" height="11" rx="3.5" fill="#2dd4bf" />
                <text x="82" y="52.5" textAnchor="middle" fill="white"
                    fontSize="7" fontWeight="700" fontFamily="monospace">#1</text>
                <text x="95" y="52.5" fill="#67e8f9" fontSize="7"
                    fontFamily="'SF Mono',ui-monospace,monospace">nefara.dev</text>

                {/* Title line */}
                <rect x="74" y="60" width="125" height="7" rx="2" fill="#162032" />
                <text x="78" y="65.5" fill="#94a3b8" fontSize="5.8">
                    Software Solutions — Fast. Clean. Precise.
                </text>

                {/* Description placeholder lines */}
                <rect x="74" y="71" width="115" height="5.5" rx="2" fill="#0f1e2e" />
                <rect x="74" y="79" width="90"  height="5.5" rx="2" fill="#0f1e2e" />

                {/* Keyword chips */}
                {([
                    { x: 74,  label: "systems", w: 32 },
                    { x: 110, label: "web",     w: 22 },
                    { x: 136, label: "devops",  w: 28 },
                    { x: 168, label: "C++",     w: 20 },
                ] as { x: number; label: string; w: number }[]).map(({ x, label, w }) => (
                    <g key={label}>
                        <rect x={x} y={88} width={w} height={9} rx="4.5"
                            fill="#2dd4bf14" stroke="#2dd4bf" strokeWidth="0.7" />
                        <text x={x + w / 2} y={94} textAnchor="middle"
                            fill="#2dd4bf" fontSize="5.5" fontFamily="monospace">{label}</text>
                    </g>
                ))}

                {/* Core Web Vitals */}
                <text x="74" y="108" fill="#334155" fontSize="5.5" fontFamily="monospace">
                    Core Web Vitals
                </text>
                {([
                    { x: 74,  label: "LCP 1.1s", col: "#2dd4bf" },
                    { x: 109, label: "CLS 0.0",  col: "#5eead4" },
                    { x: 142, label: "INP 4ms",  col: "#67e8f9" },
                ] as { x: number; label: string; col: string }[]).map(({ x, label, col }) => (
                    <g key={label}>
                        <rect x={x} y={110} width={31} height={9} rx="2.5" fill="#0d948818" />
                        <text x={x + 15.5} y={116.5} textAnchor="middle"
                            fill={col} fontSize="5.8" fontFamily="monospace">{label}</text>
                    </g>
                ))}

                {/* ── Cursor 1 — #1 rank — clockwise ── */}
                <g>
                    {/* @ts-ignore — SMIL animateTransform */}
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={ORBIT1}
                        dur="10s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                    <path d={CURSOR} fill="#2dd4bf"
                        style={{ filter: "drop-shadow(0 0 4px #2dd4bf90)" }} />
                    <circle cx="15" cy="-4" r="9" fill="#2dd4bf"
                        style={{ filter: "drop-shadow(0 0 6px #2dd4bf80)" }} />
                    <text x="15" y="-0.5" textAnchor="middle"
                        fill="white" fontSize="7.5" fontWeight="700" fontFamily="monospace">#1</text>
                    <rect x="24" y="-11" width="43" height="15" rx="7.5" fill="#2dd4bf" />
                    <text x="45.5" y="-2.5" textAnchor="middle"
                        fill="white" fontSize="7" fontWeight="600">Top Rank</text>
                </g>

                {/* ── Cursor 2 — perf score — counter-clockwise ── */}
                <g>
                    {/* @ts-ignore — SMIL animateTransform */}
                    <animateTransform
                        attributeName="transform"
                        type="translate"
                        values={ORBIT2}
                        dur="10s"
                        repeatCount="indefinite"
                        calcMode="linear"
                    />
                    <path d={CURSOR} fill="#0d9488"
                        style={{ filter: "drop-shadow(0 0 4px #0d948890)" }} />
                    <circle cx="15" cy="-4" r="9" fill="#0d9488"
                        style={{ filter: "drop-shadow(0 0 6px #0d948870)" }} />
                    <text x="15" y="-0.5" textAnchor="middle"
                        fill="white" fontSize="7.5" fontWeight="700" fontFamily="monospace">98</text>
                    <rect x="24" y="-11" width="50" height="15" rx="7.5" fill="#0d9488" />
                    <text x="49" y="-2.5" textAnchor="middle"
                        fill="white" fontSize="7" fontWeight="600">Perf Score</text>
                </g>

            </svg>
        </div>
    )
}
