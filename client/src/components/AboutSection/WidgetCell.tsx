"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

export default function WidgetCell({ children, delay, side = "right" }: {
    children: React.ReactNode
    delay: number
    side?: "left" | "right"
}) {
    const ref = useRef<HTMLDivElement>(null)
    const fromX = side === "left" ? -24 : 24
    const start = 0.05 + delay * 0.3
    const end   = start + 0.45
    const subscribe = useContext(SceneScrollContext)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        gsap.set(el, { opacity: 0, x: fromX })
        return subscribe((v) => {
            const k = fade(v, start, end)
            gsap.set(el, { opacity: k, x: fromX * (1 - k) })
        })
    }, [subscribe, fromX, start, end])

    return (
        <div
            ref={ref}
            className="flex items-center justify-center w-full h-full py-6"
            style={{ opacity: 0 }}
        >
            {children}
        </div>
    )
}
