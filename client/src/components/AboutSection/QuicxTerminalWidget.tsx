"use client"

import { useEffect, useRef, useState } from "react"

type Seg = { text: string; color: string; bold?: boolean }

const LINES: Seg[][] = [
    [
        { text: "anastassow@Dimitars-MacBook-Pro", color: "#4ade80" },
        { text: " ~ ", color: "#cbd5e1" },
        { text: "%", color: "#64748b" },
        { text: " quicx", color: "#2dd4bf", bold: true },
        { text: " start", color: "#e2e8f0" },
        { text: " --config", color: "#94a3b8" },
        { text: " /Users/anastassow/Desktop/Quicx/quicx.conf", color: "#475569" },
    ],
    [
        { text: "config loaded: ", color: "#64748b" },
        { text: "/Users/anastassow/Desktop/Quicx/quicx.conf", color: "#2dd4bf" },
    ],
    [
        { text: "quicx v1.0.0 starting", color: "#f1f5f9", bold: true },
    ],
    [
        { text: "  port:    ", color: "#64748b" },
        { text: "16381", color: "#2dd4bf" },
    ],
    [
        { text: "  classes: ", color: "#64748b" },
        { text: "32 64 128 256 512 1024", color: "#2dd4bf" },
    ],
    [
        { text: "quicx", color: "#2dd4bf", bold: true },
        { text: " listening on port ", color: "#f1f5f9" },
        { text: "16381", color: "#2dd4bf" },
        { text: " [kqueue]", color: "#64748b" },
    ],
    [
        { text: "quicx cli socket: ", color: "#64748b" },
        { text: "/tmp/quicx.sock", color: "#2dd4bf" },
    ],
]

const DELAYS = [500, 1000, 1400, 1700, 1950, 2250, 2550]

export function QuicxTerminalWidget() {
    const [visible, setVisible] = useState(0)
    const [cursor, setCursor] = useState(true)
    const ref = useRef<HTMLDivElement>(null)
    const started = useRef(false)
    const timers = useRef<ReturnType<typeof setTimeout>[]>([])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true
                    timers.current = DELAYS.map((d, i) =>
                        setTimeout(() => setVisible(v => Math.max(v, i + 1)), d)
                    )
                }
            },
            { threshold: 0.4 }
        )
        observer.observe(el)
        return () => {
            observer.disconnect()
            timers.current.forEach(clearTimeout)
        }
    }, [])

    useEffect(() => {
        const id = setInterval(() => setCursor(c => !c), 530)
        return () => clearInterval(id)
    }, [])

    return (
        <div
            ref={ref}
            className="w-full h-full flex flex-col"
            style={{
                background: "#0d1117",
                fontFamily: "'SF Mono', 'Fira Code', ui-monospace, monospace",
            }}
        >
            {/* macOS chrome */}
            <div
                className="flex items-center gap-1.5 px-3 shrink-0 select-none"
                style={{ height: 30, background: "#161b22", borderBottom: "1px solid #0d1117" }}
            >
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#ff5f57" }} />
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#febc2e" }} />
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: "#28c840" }} />
                <span
                    className="flex-1 text-center"
                    style={{ fontSize: 10, color: "#475569", letterSpacing: "0.02em" }}
                >
                    quicx — zsh — 80×24
                </span>
            </div>

            {/* Terminal body */}
            <div
                className="flex-1 overflow-hidden px-3.5 py-3 flex flex-col"
                style={{ fontSize: 9, lineHeight: 1.7, color: "#e2e8f0" }}
            >
                {LINES.map((line, i) => (
                    <div
                        key={i}
                        className="whitespace-pre-wrap break-all"
                        style={{
                            opacity: visible > i ? 1 : 0,
                            transform: visible > i ? "translateY(0)" : "translateY(3px)",
                            transition: "opacity 0.18s ease, transform 0.18s ease",
                        }}
                    >
                        {line.map((seg, j) => (
                            <span
                                key={j}
                                style={{ color: seg.color, fontWeight: seg.bold ? 600 : 400 }}
                            >
                                {seg.text}
                            </span>
                        ))}
                    </div>
                ))}

                {/* Next prompt with blinking cursor */}
                <div
                    className="flex items-center mt-0.5"
                    style={{
                        opacity: visible >= LINES.length ? 1 : 0,
                        transition: "opacity 0.18s ease",
                    }}
                >
                    <span style={{ color: "#4ade80" }}>anastassow@Dimitars-MacBook-Pro</span>
                    <span style={{ color: "#cbd5e1" }}>&nbsp;~&nbsp;</span>
                    <span style={{ color: "#64748b" }}>%&nbsp;</span>
                    <span
                        style={{
                            color: "#2dd4bf",
                            opacity: cursor ? 1 : 0,
                            transition: "opacity 0.1s",
                        }}
                    >
                        ▌
                    </span>
                </div>
            </div>
        </div>
    )
}
