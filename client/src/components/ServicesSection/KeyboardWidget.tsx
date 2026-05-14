"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)
CustomEase.create("nefEase", "0.22, 1, 0.36, 1")

const ROWS = [
    ["esc", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"],
    ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'"],
    ["shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/"],
    ["fn", "ctrl", "opt", "cmd", "", "cmd", "opt", "—"],
]

const WIDE_KEYS = new Set(["esc", "tab", "caps", "shift", "fn", "ctrl", "opt", "cmd", "—"])

export function KeyboardWidget() {
    const containerRef = useRef<HTMLDivElement>(null)
    let idx = 0

    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        const keys = container.querySelectorAll<HTMLElement>(".keyboard-key")

        gsap.fromTo(
            keys,
            { opacity: 0, y: 5 },
            {
                opacity: 1,
                y: 0,
                duration: 0.28,
                ease: "nefEase",
                stagger: 0.013,
            }
        )
    }, [])

    return (
        <div
            className="w-full h-full rounded-xl overflow-hidden flex items-center justify-start bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
        >
            <div
                ref={containerRef}
                className="flex-shrink-0 pl-3"
                style={{
                    maskImage: "linear-gradient(to right, black 30%, transparent 88%)",
                    WebkitMaskImage: "linear-gradient(to right, black 30%, transparent 88%)",
                }}
            >
                <div
                    className="flex flex-col gap-[3px] rounded-[14px] p-2.5"
                    style={{ background: "#e2e4e8" }}
                >
                    {ROWS.map((row, ri) => (
                        <div key={ri} className="flex gap-[3px] items-center">
                            {row.map((key, ki) => {
                                const delay = idx++ * 0.013
                                void delay // delay is baked into the stagger order via DOM order
                                return (
                                    <div
                                        key={ki}
                                        className={[
                                            "keyboard-key flex items-center justify-center rounded-[4px] flex-shrink-0",
                                            "text-[7px] font-medium text-gray-600 select-none bg-white",
                                            "cursor-default",
                                            key === ""
                                                ? "h-6 w-14"
                                                : WIDE_KEYS.has(key)
                                                    ? "h-6 px-1.5 min-w-[28px]"
                                                    : "h-6 w-6",
                                        ].join(" ")}
                                        style={{
                                            boxShadow: "0 2px 0 #b0b4bc, 0 3px 5px rgba(0,0,0,0.14)",
                                            opacity: 0,
                                        }}
                                        onMouseEnter={(e) => {
                                            const el = e.currentTarget as HTMLElement
                                            gsap.to(el, { y: -3, duration: 0.1, ease: "power2.out" })
                                            el.style.boxShadow = "0 4px 0 #9097a3, 0 6px 12px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.9)"
                                        }}
                                        onMouseLeave={(e) => {
                                            const el = e.currentTarget as HTMLElement
                                            gsap.to(el, { y: 0, duration: 0.1, ease: "power2.out" })
                                            el.style.boxShadow = "0 2px 0 #b0b4bc, 0 3px 5px rgba(0,0,0,0.14)"
                                        }}
                                    >
                                        {key}
                                    </div>
                                )
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
