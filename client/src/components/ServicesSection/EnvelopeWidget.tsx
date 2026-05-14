"use client"

import { useStickyScrollProgress, ScrollValue } from "@/components/ui/sticky-scroll-reveal"
import { useState, useEffect, useRef } from "react"

const OPEN_START = 0.01
const OPEN_END   = 0.07

const fallback = new ScrollValue()

function clamp01(v: number) { return Math.max(0, Math.min(1, v)) }
function mapRange(start: number, end: number, v: number) {
    return clamp01((v - start) / (end - start))
}

export function EnvelopeWidget({ keywords }: { keywords: string[] }) {
    const scrollProgress = useStickyScrollProgress() ?? fallback
    const svRef = useRef(scrollProgress)
    svRef.current = scrollProgress

    const [progress, setProgress] = useState(0)

    useEffect(() => {
        setProgress(svRef.current.get())
        return svRef.current.on((v) => setProgress(v))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const flapOpen = mapRange(OPEN_START, OPEN_END, progress)
    const sealProgress = mapRange(OPEN_START, OPEN_END * 0.6, progress)

    // Letter Y: 0px → -58px
    const letterY = flapOpen * -58

    // Seal
    const sealOp    = 1 - sealProgress
    const sealScale = 1 - sealProgress
    const sealRot   = sealProgress * 180

    // Flap
    const midY = (50 * (1 - flapOpen)).toFixed(1)
    const topFlapClip = `polygon(50% ${midY}%, 100% 0%, 0% 0%)`

    const chipVisible = keywords.map((_, i) => flapOpen > 0.65 + i * 0.1)

    return (
        <div
            className="w-full h-full rounded-xl overflow-hidden flex items-center justify-center"
            style={{ background: "hsl(var(--background))" }}
        >
            <div className="relative flex items-center justify-center"
                 style={{ width: 240, height: 160 }}>

                {/* Inner letter */}
                <div
                    className="absolute w-full h-full flex flex-col items-center justify-center px-5 py-4 gap-2"
                    style={{
                        transform: `translateY(${letterY}px)`,
                        background: "#fff",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    }}
                >
                    <img
                        src="/logo.svg"
                        alt="Nefara"
                        style={{ width: 52, height: "auto" }}
                    />
                    <div className="flex flex-col items-center gap-1.5 w-full">
                        {keywords.map((kw, i) => (
                            <div
                                key={kw}
                                className="flex items-center gap-2 transition-all duration-200"
                                style={{
                                    opacity: chipVisible[i] ? 1 : 0,
                                    transform: chipVisible[i] ? "translateY(0)" : "translateY(5px)",
                                }}
                            >
                                <span
                                    className="w-1 h-1 rounded-full flex-shrink-0"
                                    style={{ background: "hsl(var(--primary))" }}
                                />
                                <span
                                    className="text-[10px] font-semibold"
                                    style={{ color: "hsl(var(--foreground))" }}
                                >
                                    {kw}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Wax seal */}
                <div
                    className="z-40 flex-shrink-0 flex items-center justify-center border-[3px]"
                    style={{
                        width: 36, height: 36,
                        opacity: sealOp,
                        transform: `scale(${sealScale}) rotate(${sealRot}deg)`,
                        background: "hsl(var(--primary)/0.9)",
                        borderColor: "hsl(var(--primary-strong))",
                        clipPath: "polygon(50% 0%,80% 10%,100% 35%,100% 70%,80% 90%,50% 100%,20% 90%,0% 70%,0% 35%,20% 10%)",
                    }}
                >
                    <svg width="18" height="18" viewBox="0 0 466 442" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M314.295 352.444C323.299 347.845 331.836 342.384 339.76 336.12C358.782 321.081 374.258 301.421 384.101 277.991C384.891 276.114 385.635 274.232 386.337 272.342C410.509 207.277 383.451 135.84 323.901 99.9415C359.413 134.217 376.049 183.642 366.651 232.217C364.789 241.846 360.209 280.809 331.556 302.517C307.217 324.305 270.96 331.972 237.965 319.32C192.575 301.916 170.545 252.653 188.763 209.286C189.173 208.307 189.602 207.339 190.047 206.383C184.782 213.064 180.34 220.513 176.925 228.645C156.388 277.534 180.497 332.964 230.822 353.72C231.638 354.057 232.46 354.384 233.291 354.703C246.542 359.784 260.25 362.003 273.67 361.67C287.827 361.318 301.663 358.123 314.295 352.444Z" fill="white"/>
                        <path d="M151.711 89.4874C142.707 94.0858 134.169 99.5467 126.245 105.811C107.224 120.85 91.7473 140.51 81.9045 163.941C81.1152 165.817 80.3706 167.699 79.669 169.589C55.4969 234.654 82.5545 306.091 142.105 341.99C106.592 307.714 89.9573 258.289 99.3547 209.714C101.217 200.085 105.796 161.122 134.45 139.414C158.788 117.626 195.046 109.959 228.041 122.611C273.431 140.015 295.46 189.278 277.243 232.645C276.832 233.624 276.404 234.592 275.959 235.548C281.224 228.867 285.666 221.418 289.081 213.286C309.618 164.397 285.509 108.967 235.184 88.2109C234.367 87.8741 233.545 87.5472 232.715 87.2285C219.464 82.1471 205.755 79.9276 192.336 80.2611C178.178 80.6127 164.343 83.808 151.711 89.4874Z" fill="white"/>
                    </svg>
                </div>

                {/* Top flap */}
                <div className="absolute w-full h-full" style={{ clipPath: topFlapClip, background: "#cbd5e1" }} />
                {/* Left flap */}
                <div className="absolute w-full h-full" style={{ clipPath: "polygon(50% 50%, 0% 0%, 0% 100%)", background: "#e2e8f0" }} />
                {/* Right flap */}
                <div className="absolute w-full h-full" style={{ clipPath: "polygon(50% 50%, 100% 0%, 100% 100%)", background: "#cbd5e1" }} />
                {/* Bottom flap */}
                <div className="absolute w-full h-full" style={{ clipPath: "polygon(50% 50%, 100% 100%, 0% 100%)", background: "#e2e8f0" }} />
            </div>
        </div>
    )
}
