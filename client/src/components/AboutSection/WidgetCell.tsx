"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

// Lines fill down slightly earlier than the widget fades in
const LINE_START = 0.0
const LINE_END   = 0.85

export default function WidgetCell({ children, delay, side = "right" }: {
    children: React.ReactNode
    delay: number
    side?: "left" | "right"
}) {
    const ref      = useRef<HTMLDivElement>(null)
    const lineL    = useRef<HTMLDivElement>(null)
    const lineR    = useRef<HTMLDivElement>(null)
    const fromX    = side === "left" ? -24 : 24
    const start    = 0.05 + delay * 0.3
    const end      = start + 0.45
    const subscribe = useContext(SceneScrollContext)

    // Position fixed lines to widget's left/right edges
    useEffect(() => {
        const place = () => {
            const el = ref.current
            if (!el || !lineL.current || !lineR.current) return
            const { left, right } = el.getBoundingClientRect()
            lineL.current.style.left = `${left}px`
            lineR.current.style.left = `${right}px`
        }
        place()
        window.addEventListener("resize", place)
        return () => window.removeEventListener("resize", place)
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        gsap.set(el, { opacity: 0, x: fromX })
        gsap.set([lineL.current, lineR.current], { scaleY: 0, transformOrigin: "top center" })

        return subscribe((v) => {
            // Widget fade-in
            const k = fade(v, start, end)
            gsap.set(el, { opacity: k, x: fromX * (1 - k) })

            // Lines fill down from top
            const lineK = fade(v, LINE_START, LINE_END)
            gsap.set([lineL.current, lineR.current], { scaleY: lineK })
        })
    }, [subscribe, fromX, start, end])

    return (
        <div className="relative flex items-stretch justify-center w-full h-full py-6">
            {/* Left decorative line — spans full viewport height, fills downward on scroll */}
            <div
                ref={lineL}
                className="pointer-events-none fixed left-0 top-0 bottom-0 w-px"
                style={{ background: "hsl(var(--border))", transform: "scaleY(0)", transformOrigin: "top center" }}
            />
            {/* Right decorative line */}
            <div
                ref={lineR}
                className="pointer-events-none fixed right-0 top-0 bottom-0 w-px"
                style={{ background: "hsl(var(--border))", transform: "scaleY(0)", transformOrigin: "top center" }}
            />
            <div
                ref={ref}
                className="w-full h-full"
                style={{ opacity: 0 }}
            >
                {children}
            </div>
        </div>
    )
}
