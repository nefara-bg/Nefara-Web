"use client"

import { useEffect, useRef, useState } from "react"

const STATS = [
    { value: 21847, decimals: 0, suffix: " tasks/sec",  label: "throughput" },
    { value: 62.9,  decimals: 1, suffix: " kb",         label: "daemon binary size" },
    { value: 1.181, decimals: 3, suffix: " ms",         label: "avg latency" },
]

function useCountUp(target: number, decimals: number, duration = 1600) {
    const [display, setDisplay] = useState("0")
    const raf = useRef<number | null>(null)

    useEffect(() => {
        const start = performance.now()
        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - t, 3)
            const val = eased * target
            setDisplay(
                decimals === 0
                    ? Math.floor(val).toLocaleString("en-US")
                    : val.toFixed(decimals)
            )
            if (t < 1) raf.current = requestAnimationFrame(tick)
        }
        raf.current = requestAnimationFrame(tick)
        return () => { if (raf.current) cancelAnimationFrame(raf.current) }
    }, [target, decimals, duration])

    return display
}

function Stat({ value, decimals, suffix, label }: typeof STATS[number]) {
    const display = useCountUp(value, decimals)
    return (
        <div className="flex flex-col gap-1">
            <span
                className="font-mono font-bold leading-none tabular-nums"
                style={{
                    fontSize: "clamp(1.3rem, 3.8vw, 1.75rem)",
                    color: "hsl(var(--primary))",
                }}
            >
                {display}
                <span className="text-[0.55em] font-semibold opacity-80 ml-0.5">{suffix}</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.14em] font-semibold"
                  style={{ color: "rgba(255,255,255,0.35)" }}>
                {label}
            </span>
        </div>
    )
}

export function QuicxStatsWidget() {
    return (
        <div
            className="w-full h-full rounded-xl flex flex-col justify-center gap-6 px-7"
            style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
            }}
        >
            {STATS.map((s) => (
                <Stat key={s.label} {...s} />
            ))}
        </div>
    )
}
