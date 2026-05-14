"use client"

import { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create("nefEase", "0.22, 1, 0.36, 1")

export function AnimatedLeftPanel({
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

        gsap.set(el, { opacity: 0, x: -32 })

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top bottom-=80px",
            end: "bottom top+=80px",
            onEnter:      () => gsap.to(el, { opacity: 1, x: 0, duration: 0.65, ease: "nefEase" }),
            onLeave:      () => gsap.to(el, { opacity: 0, x: -32, duration: 0.65, ease: "nefEase" }),
            onEnterBack:  () => gsap.to(el, { opacity: 1, x: 0, duration: 0.65, ease: "nefEase" }),
            onLeaveBack:  () => gsap.to(el, { opacity: 0, x: -32, duration: 0.65, ease: "nefEase" }),
        })

        return () => trigger.kill()
    }, [])

    return (
        <div ref={ref} className={className} style={{ opacity: 0 }}>
            {children}
        </div>
    )
}
