"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)
if (!CustomEase.get("nefEase")) {
    CustomEase.create("nefEase", "0.22, 1, 0.36, 1")
}

type Props = {
    children: React.ReactNode
    className?: string
    delay?: number
    y?: number
    x?: number
    as?: "div" | "section" | "header" | "article"
}

export function RevealOnScroll({ children, className, delay = 0, y = 32, x = 0, as = "div" }: Props) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        gsap.set(el, { opacity: 0, y, x })

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top bottom-=80px",
            onEnter: () =>
                gsap.to(el, {
                    opacity: 1,
                    y: 0,
                    x: 0,
                    duration: 0.85,
                    delay,
                    ease: "nefEase",
                }),
            once: true,
        })

        return () => trigger.kill()
    }, [delay, y, x])

    const Tag = as as React.ElementType
    return (
        <Tag ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </Tag>
    )
}
