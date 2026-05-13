"use client"

import { useContext, useEffect, useRef } from "react"
import gsap from "gsap"
import { SceneScrollContext } from "@/components/ScrollStory/SceneScrollContext"

const fade = (v: number, a: number, b: number) =>
    Math.max(0, Math.min(1, (v - a) / (b - a)))

export default function FeatureCardFlow({
    num, title, desc, side, delay,
}: {
    num: string
    title: string
    desc: string
    side: "left" | "right"
    delay: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const isLeft = side === "left"
    const fromX = isLeft ? -36 : 36
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
            className="relative w-full h-full overflow-hidden group cursor-default flex"
            style={{ opacity: 0 }}
        >
            <div className="flex flex-col justify-center px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className="font-manrope font-bold tracking-[0.18em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.28em] text-primary text-md">
                        {num}
                    </span>
                    <div
                        className="h-px transition-all duration-300 opacity-30 group-hover:opacity-80"
                        style={{ background: "hsl(var(--primary))", width: 18 }}
                    />
                </div>

                <h3 className="text-3xl font-manrope font-bold text-foreground transition-colors duration-200 group-hover:text-[hsl(var(--primary-strong))] mb-3">
                    {title}
                </h3>

                <p className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground/65 text-lg">
                    {desc}
                </p>
            </div>
        </div>
    )
}
