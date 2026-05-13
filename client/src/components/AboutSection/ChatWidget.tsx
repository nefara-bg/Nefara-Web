"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { useTranslations } from "next-intl"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const stops = [
    { start: 0.00, end: 0.35, fromX: -8 },
    { start: 0.35, end: 0.70, fromX:  8 },
    { start: 0.70, end: 1.00, fromX:  0 },
] as const

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

export default function ChatWidget() {
    const t = useTranslations("about.widgets.chat")
    const subscribe = useContext(SceneScrollContext)
    const itemsRef = useRef<(HTMLDivElement | null)[]>([])

    useEffect(() => {
        const apply = (v: number) => {
            itemsRef.current.forEach((el, i) => {
                if (!el) return
                const s = stops[i]
                const k = fade(v, s.start, s.end)
                gsap.set(el, { opacity: k, x: s.fromX * (1 - k) })
            })
        }
        apply(0)
        return subscribe(apply)
    }, [subscribe])

    const setRef = (i: number) => (el: HTMLDivElement | null) => { itemsRef.current[i] = el }

    return (
        <div className="flex flex-col gap-12 select-none w-full max-w-lg">
            <div
                ref={setRef(0)}
                className="flex items-end gap-2"
                style={{ opacity: 0 }}
            >
                <div className="w-10 h-10 rounded-full flex-shrink-0 grid place-items-center font-bold text-sm"
                    style={{ background: "hsl(var(--primary)/0.18)", color: "hsl(var(--primary))" }}>D</div>
                <div style={{
                    background: "hsl(var(--primary)/0.12)",
                    color: "hsl(var(--foreground)/0.85)",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    padding: "10px 16px", fontSize: 14, lineHeight: 1.5,
                }}>
                    {t("message1")}
                </div>
            </div>

            <div
                ref={setRef(1)}
                className="flex items-end gap-2 justify-end"
                style={{ opacity: 0 }}
            >
                <div style={{
                    background: "hsl(var(--foreground)/0.06)",
                    color: "hsl(var(--foreground)/0.8)",
                    borderRadius: "1rem 1rem 0.2rem 1rem",
                    padding: "10px 16px", fontSize: 14, lineHeight: 1.5,
                }}>
                    {t("message2")}
                </div>
                <div className="w-10 h-10 rounded-full flex-shrink-0 grid place-items-center font-bold text-sm"
                    style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.45)" }}>C</div>
            </div>

            <div
                ref={setRef(2)}
                className="flex items-center gap-2"
                style={{ opacity: 0 }}
            >
                <div className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{ background: "hsl(var(--primary)/0.18)" }} />
                <div className="flex items-center gap-[5px]"
                    style={{
                        background: "hsl(var(--primary)/0.12)",
                        padding: "12px 14px",
                        borderRadius: "1rem 1rem 1rem 0.2rem",
                    }}>
                    {[0, 0.22, 0.44].map((d, i) => (
                        <span key={i} style={{
                            display: "block", width: 8, height: 8, borderRadius: "50%",
                            background: "hsl(var(--primary))",
                            animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                        }} />
                    ))}
                </div>
            </div>
        </div>
    )
}
