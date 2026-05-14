"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(CustomEase)
CustomEase.create("nefEase", "0.22, 1, 0.36, 1")

export function ServiceCardHover({
    children,
    className,
}: {
    children: React.ReactNode
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const onEnter = () => gsap.to(el, { y: -6, scale: 1.02, duration: 0.25, ease: "nefEase" })
        const onLeave = () => gsap.to(el, { y: 0, scale: 1, duration: 0.25, ease: "nefEase" })

        el.addEventListener("mouseenter", onEnter)
        el.addEventListener("mouseleave", onLeave)

        return () => {
            el.removeEventListener("mouseenter", onEnter)
            el.removeEventListener("mouseleave", onLeave)
        }
    }, [])

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    )
}
