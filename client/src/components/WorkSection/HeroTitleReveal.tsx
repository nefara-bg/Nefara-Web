"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)
if (!CustomEase.get("nefEase")) {
    CustomEase.create("nefEase", "0.22, 1, 0.36, 1")
}

export function HeroTitleReveal({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const root = ref.current
        if (!root) return
        const items = root.querySelectorAll<HTMLElement>("[data-reveal]")
        gsap.set(items, { opacity: 0, y: 40 })
        gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "nefEase",
            stagger: 0.12,
            delay: 0.1,
        })
    }, [])

    return <div ref={ref}>{children}</div>
}
