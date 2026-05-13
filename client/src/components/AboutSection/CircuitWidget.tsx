"use client"

const TRACES = [
    { d: "M 125 51 L 125 28 L 38 28 L 38 5",         cls: "ta" },
    { d: "M 150 51 L 150 5",                           cls: "tb" },
    { d: "M 175 51 L 175 28 L 262 28 L 262 5",         cls: "tc" },
    { d: "M 193 63 L 258 63 L 258 35",                 cls: "ta" },
    { d: "M 193 77 L 295 77",                           cls: "tb" },
    { d: "M 193 92 L 257 92 L 257 150",                cls: "tc" },
    { d: "M 175 104 L 175 128 L 265 128 L 265 150",    cls: "ta" },
    { d: "M 150 104 L 150 150",                         cls: "tb" },
    { d: "M 125 104 L 125 128 L 38 128 L 38 150",      cls: "tc" },
    { d: "M 107 92 L 48 92 L 48 150",                  cls: "ta" },
    { d: "M 107 77 L 5 77",                             cls: "tb" },
    { d: "M 107 63 L 48 63 L 48 5",                    cls: "tc" },
]

/* pads where traces meet the chip */
const CHIP_PADS = [
    { cx: 125, cy: 51,  cls: "ta" }, { cx: 150, cy: 51,  cls: "tb" }, { cx: 175, cy: 51,  cls: "tc" },
    { cx: 193, cy: 63,  cls: "ta" }, { cx: 193, cy: 77,  cls: "tb" }, { cx: 193, cy: 92,  cls: "tc" },
    { cx: 175, cy: 104, cls: "ta" }, { cx: 150, cy: 104, cls: "tb" }, { cx: 125, cy: 104, cls: "tc" },
    { cx: 107, cy: 92,  cls: "ta" }, { cx: 107, cy: 77,  cls: "tb" }, { cx: 107, cy: 63,  cls: "tc" },
]

/* vias at 90° corners */
const VIAS = [
    [125,28],[38,28],[175,28],[262,28],
    [258,63],[258,35],[257,92],[257,128],[265,128],
    [125,128],[38,128],[48,92],[48,63],
]

/* terminator pads at trace ends */
const ENDS = [
    [38,5,"ta"],[150,5,"tb"],[262,5,"tc"],
    [258,35,"ta"],[295,77,"tb"],[5,77,"tb"],
    [265,150,"ta"],[257,150,"tc"],[150,150,"tb"],
    [38,150,"tc"],[48,150,"ta"],[48,5,"tc"],
]

export function CircuitWidget() {
    return (
        <div className="w-full h-full flex items-center justify-center" style={{ background: "#060d18" }}>
            <style>{`
                .cw-bg  { stroke:#162032; stroke-width:1.4; fill:none; stroke-linecap:round; stroke-linejoin:round; }
                .cw-flow{ stroke-width:2; fill:none; stroke-linecap:round; stroke-linejoin:round;
                          stroke-dasharray:20 220; stroke-dashoffset:240;
                          animation:cw-anim 3s cubic-bezier(0.5,0,0.9,1) infinite;
                          filter:drop-shadow(0 0 5px currentColor); }
                .ta{ stroke:#2dd4bf; color:#2dd4bf; }
                .tb{ stroke:#67e8f9; color:#67e8f9; }
                .tc{ stroke:#5eead4; color:#5eead4; }
                .cw-flow.d0{animation-delay:0s}   .cw-flow.d1{animation-delay:.27s}
                .cw-flow.d2{animation-delay:.54s}  .cw-flow.d3{animation-delay:.81s}
                .cw-flow.d4{animation-delay:1.08s} .cw-flow.d5{animation-delay:1.35s}
                .cw-flow.d6{animation-delay:1.62s} .cw-flow.d7{animation-delay:.14s}
                .cw-flow.d8{animation-delay:.41s}  .cw-flow.d9{animation-delay:.68s}
                .cw-flow.d10{animation-delay:.95s} .cw-flow.d11{animation-delay:1.22s}
                @keyframes cw-anim{ to{ stroke-dashoffset:0; } }
            `}</style>

            <svg viewBox="0 0 300 155" className="w-full h-full" style={{ maxWidth: 296, maxHeight: 148 }}>

                {/* Background traces */}
                {TRACES.map((t, i) => <path key={`bg${i}`} className="cw-bg" d={t.d} />)}

                {/* Animated flow */}
                {TRACES.map((t, i) => (
                    <path key={`fl${i}`} className={`cw-flow ${t.cls} d${i}`} d={t.d} />
                ))}

                {/* Via circles */}
                {VIAS.map(([cx, cy], i) => (
                    <circle key={`v${i}`} cx={cx} cy={cy} r="2.5"
                        fill="#060d18" stroke="#1e3a4a" strokeWidth="1" />
                ))}

                {/* Endpoint pads */}
                {ENDS.map(([cx, cy, cls], i) => (
                    <circle key={`e${i}`} cx={cx as number} cy={cy as number} r="3.8"
                        fill="#060d18"
                        stroke={cls === "ta" ? "#2dd4bf" : cls === "tb" ? "#67e8f9" : "#5eead4"}
                        strokeWidth="1.3" opacity="0.9" />
                ))}

                {/* Chip body */}
                <rect x="106" y="50" width="88" height="55" rx="7"
                    fill="#081220"
                    stroke="#2dd4bf" strokeWidth="1.5" />
                {/* Soft glow overlay */}
                <rect x="106" y="50" width="88" height="55" rx="7"
                    fill="none" stroke="#2dd4bf" strokeWidth="8" opacity="0.06" />

                {/* Interior grid lines */}
                <line x1="114" y1="64" x2="186" y2="64" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
                <line x1="114" y1="91" x2="186" y2="91" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
                <line x1="143" y1="54" x2="143" y2="101" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />
                <line x1="157" y1="54" x2="157" y2="101" stroke="#2dd4bf" strokeWidth="0.4" opacity="0.12" />

                {/* Chip connection pads */}
                {CHIP_PADS.map(({ cx, cy, cls }, i) => (
                    <circle key={`cp${i}`} cx={cx} cy={cy} r="3.5"
                        fill="#081220"
                        stroke={cls === "ta" ? "#2dd4bf" : cls === "tb" ? "#67e8f9" : "#5eead4"}
                        strokeWidth="1.3" />
                ))}

                {/* Small glowing dot at each chip pad center */}
                {CHIP_PADS.map(({ cx, cy, cls }, i) => (
                    <circle key={`cpd${i}`} cx={cx} cy={cy} r="1.2"
                        fill={cls === "ta" ? "#2dd4bf" : cls === "tb" ? "#67e8f9" : "#5eead4"}
                        opacity="0.8" />
                ))}

                {/* Chip label */}
                <text x="150" y="75" textAnchor="middle"
                    fill="#2dd4bf" fontSize="9" fontWeight="700" letterSpacing="2.5"
                    fontFamily="'SF Mono','Fira Code',ui-monospace,monospace">
                    NEFARA
                </text>
                <text x="150" y="87" textAnchor="middle"
                    fill="#0d9488" fontSize="6" letterSpacing="1.8"
                    fontFamily="'SF Mono',ui-monospace,monospace">
                    SWE · 2025
                </text>

                {/* Small decorative dots inside chip */}
                {[[122,95],[150,95],[178,95]].map(([cx,cy],i)=>(
                    <circle key={`id${i}`} cx={cx} cy={cy} r="1.5"
                        fill="none"
                        stroke={i===0?"#2dd4bf":i===1?"#67e8f9":"#5eead4"}
                        strokeWidth="1" opacity="0.5" />
                ))}

            </svg>
        </div>
    )
}
