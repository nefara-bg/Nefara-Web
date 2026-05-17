"use client"

const INPUT_Y  = [16, 43, 70, 97]
const HIDDEN_Y = [28, 65, 102]
const OUTPUT_Y = [46, 84]

const PULSES = [
    { path: "M 20 16 L 100 28",  dur: "1.8", begin: "0"   },
    { path: "M 20 43 L 100 65",  dur: "2.1", begin: "0.5" },
    { path: "M 20 70 L 100 102", dur: "1.9", begin: "1.0" },
    { path: "M 20 97 L 100 65",  dur: "2.3", begin: "1.5" },
    { path: "M 100 28 L 180 46", dur: "1.4", begin: "0.2" },
    { path: "M 100 65 L 180 84", dur: "1.6", begin: "0.7" },
    { path: "M 100 102 L 180 46",dur: "2.0", begin: "1.2" },
    { path: "M 100 28 L 180 84", dur: "1.7", begin: "0.9" },
]

export function AIMLWidget() {
    return (
        <div
            className="w-full h-full flex items-center"
            style={{ background: "#060d18", gap: 18, padding: "0 20px" }}
        >
            <style>{`
                .nfeva-vp{width:130px;height:130px;border-radius:50%;display:flex;
                    justify-content:center;align-items:center;background:#000;
                    overflow:hidden;flex-shrink:0;perspective:600px}
                .nfeva{transform-style:preserve-3d;animation:nfeva-rot 4s linear infinite alternate}
                .nfeva-head{position:relative;width:39px;height:26px;
                    border-radius:48% 53% 45% 55%/79% 79% 20% 22%;
                    background:linear-gradient(to right,white 45%,gray)}
                .nfeva-ec{width:29px;height:18px;position:absolute;left:50%;top:55%;
                    border-radius:45% 53% 45% 48%/62% 59% 35% 34%;
                    background-color:#0c203c;
                    box-shadow:0 0 2px 1px white,inset 0 0 0 1px black;
                    transform:translate(-50%,-50%);
                    animation:nfeva-ec 4s linear infinite alternate}
                .nfeva-eye{width:8px;height:10px;position:absolute;border-radius:50%}
                .nfeva-eye:first-child{left:5px;top:50%;
                    background:repeating-linear-gradient(65deg,#9bdaeb 0,#9bdaeb 1px,white 2px);
                    box-shadow:inset 0 0 3px #04b8d5,0 0 8px 1px #0bdaeb;
                    transform:translate(0,-50%) rotate(-65deg)}
                .nfeva-eye:nth-child(2){right:5px;top:50%;
                    background:repeating-linear-gradient(-65deg,#9bdaeb 0,#9bdaeb 1px,white 2px);
                    box-shadow:inset 0 0 3px #04b8d5,0 0 8px 1px #0bdaeb;
                    transform:translate(0,-50%) rotate(65deg)}
                .nfeva-body{width:39px;height:52px;position:relative;margin-top:2px;
                    border-radius:47% 53% 45% 55%/12% 9% 90% 88%;
                    background:linear-gradient(to right,white 35%,gray)}
                .nfeva-hand{position:absolute;top:5px;width:13px;height:36px;border-radius:40%}
                .nfeva-hand:first-child{left:-10px;
                    background:linear-gradient(to left,white 15%,gray);
                    box-shadow:3px 0 3px rgba(0,0,0,.25);
                    transform:rotateY(55deg) rotateZ(10deg);
                    animation:nfeva-cl 4s linear infinite alternate}
                .nfeva-hand:nth-child(2){left:92%;
                    background:linear-gradient(to right,white 15%,gray);
                    transform:rotateY(55deg) rotateZ(-10deg);
                    animation:nfeva-cr 4s linear infinite alternate}
                .nfeva-scanner{width:0;height:0;position:absolute;left:60%;top:10%;
                    border-top:73px solid #9bdaeb;
                    border-left:102px solid transparent;
                    border-right:102px solid transparent;
                    transform-origin:top left;
                    mask:linear-gradient(to right,white,transparent 35%);
                    -webkit-mask:linear-gradient(to right,white,transparent 35%);
                    animation:nfeva-glow 2s cubic-bezier(.86,0,.07,1) infinite}
                .nfeva-scanpt{width:3px;aspect-ratio:1;border-radius:50%;position:absolute;
                    left:60%;top:10%;background:#9bdaeb;
                    box-shadow:inset 0 0 2px rgba(0,0,0,.5);
                    animation:nfeva-ec 4s linear infinite}
                @keyframes nfeva-rot{from{transform:rotateY(0)}to{transform:rotateY(25deg)}}
                @keyframes nfeva-ec{from{transform:translate(-50%,-50%)}to{transform:translate(-40%,-50%)}}
                @keyframes nfeva-cl{from{transform:rotateY(55deg) rotateZ(10deg)}to{transform:rotateY(30deg) rotateZ(10deg)}}
                @keyframes nfeva-cr{from{transform:rotateY(55deg) rotateZ(-10deg)}to{transform:rotateY(70deg) rotateZ(-10deg)}}
                @keyframes nfeva-glow{
                    from{opacity:0} 20%{opacity:1}
                    45%{transform:rotate(-25deg)} 75%{transform:rotate(5deg)}
                    100%{opacity:0}}
            `}</style>

            {/* EVA Robot */}
            <div className="nfeva-vp">
                <div className="nfeva">
                    <div className="nfeva-head">
                        <div className="nfeva-ec">
                            <div className="nfeva-eye" />
                            <div className="nfeva-eye" />
                        </div>
                    </div>
                    <div className="nfeva-body">
                        <div className="nfeva-hand" />
                        <div className="nfeva-hand" />
                        <div className="nfeva-scanner" />
                        <div className="nfeva-scanpt" />
                    </div>
                </div>
            </div>

            {/* Neural Network */}
            <div className="flex-1 h-full flex flex-col items-center justify-center" style={{ gap: 8 }}>
                <svg viewBox="0 0 200 120" className="w-full" style={{ maxHeight: 130 }}>

                    {/* All connections - faint */}
                    {INPUT_Y.flatMap((iy, ii) =>
                        HIDDEN_Y.map((hy, hi) => (
                            <line key={`ih${ii}${hi}`} x1="20" y1={iy} x2="100" y2={hy}
                                stroke="#2dd4bf" strokeWidth="0.6" opacity="0.18" />
                        ))
                    )}
                    {HIDDEN_Y.flatMap((hy, hi) =>
                        OUTPUT_Y.map((oy, oi) => (
                            <line key={`ho${hi}${oi}`} x1="100" y1={hy} x2="180" y2={oy}
                                stroke="#2dd4bf" strokeWidth="0.6" opacity="0.22" />
                        ))
                    )}

                    {/* Input nodes */}
                    {INPUT_Y.map((y, i) => (
                        <circle key={`in${i}`} cx="20" cy={y} r="5"
                            fill="#2dd4bf18" stroke="#2dd4bf" strokeWidth="1.4" />
                    ))}

                    {/* Hidden nodes */}
                    {HIDDEN_Y.map((y, i) => (
                        <circle key={`hn${i}`} cx="100" cy={y} r="5.5"
                            fill="#2dd4bf30" stroke="#2dd4bf" strokeWidth="1.4" />
                    ))}

                    {/* Output nodes - glowing */}
                    {OUTPUT_Y.map((y, i) => (
                        <g key={`on${i}`}>
                            <circle cx="180" cy={y} r="9"
                                fill="#2dd4bf18" stroke="none" />
                            <circle cx="180" cy={y} r="6.5"
                                fill="#2dd4bf" stroke="#0d9488" strokeWidth="1.5"
                                style={{ filter: "drop-shadow(0 0 5px #2dd4bf)" }} />
                        </g>
                    ))}

                    {/* Animated pulses */}
                    {PULSES.map((p, i) => (
                        <circle key={`p${i}`} r="2.5"
                            fill={i % 3 === 0 ? "#2dd4bf" : i % 3 === 1 ? "#67e8f9" : "#5eead4"}
                            style={{ filter: "drop-shadow(0 0 3px #2dd4bf)" }}>
                            {/* @ts-ignore */}
                            <animateMotion
                                path={p.path}
                                dur={`${p.dur}s`}
                                begin={`${p.begin}s`}
                                repeatCount="indefinite"
                            />
                        </circle>
                    ))}

                    {/* Layer labels */}
                    <text x="20" y="115" textAnchor="middle" fill="#334155" fontSize="6" fontFamily="monospace">INPUT</text>
                    <text x="100" y="115" textAnchor="middle" fill="#334155" fontSize="6" fontFamily="monospace">HIDDEN</text>
                    <text x="180" y="115" textAnchor="middle" fill="#334155" fontSize="6" fontFamily="monospace">OUTPUT</text>
                </svg>

                {/* Sand stats */}
                <div className="flex gap-4 font-mono" style={{ fontSize: 9 }}>
                    <span style={{ color: "#64748b" }}>
                        epoch&nbsp;<span style={{ color: "#2dd4bf", fontWeight: 700 }}>38/50</span>
                    </span>
                    <span style={{ color: "#64748b" }}>
                        loss&nbsp;<span style={{ color: "#2dd4bf", fontWeight: 700 }}>0.0021↘</span>
                    </span>
                    <span style={{ color: "#64748b" }}>
                        acc&nbsp;<span style={{ color: "#2dd4bf", fontWeight: 700 }}>97.4%↗</span>
                    </span>
                </div>
            </div>
        </div>
    )
}
