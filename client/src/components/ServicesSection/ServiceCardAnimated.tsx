"use client"

import { useRef, useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { CustomEase } from "gsap/CustomEase"

gsap.registerPlugin(ScrollTrigger, CustomEase)
CustomEase.create("nefEase", "0.22, 1, 0.36, 1")

export function ServiceCardAnimated({
    children,
    delay = 0,
}: {
    children: React.ReactNode
    delay?: number
}) {
    const ref = useRef<HTMLDivElement>(null)
    const prevY = useRef(0)
    const [dir, setDir] = useState<"down" | "up">("down")

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY
            setDir(y > prevY.current ? "down" : "up")
            prevY.current = y
        }
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    useEffect(() => {
        const el = ref.current
        if (!el) return

        const fromDown = { opacity: 0, y: 52, scale: 0.93, filter: "blur(6px)" }
        const fromUp   = { opacity: 0, y: -32, scale: 1.05, filter: "blur(6px)" }
        const toIn     = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }

        gsap.set(el, fromDown)

        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top bottom-=60px",
            end: "bottom top+=60px",
            onEnter: () => gsap.to(el, { ...toIn, duration: 0.6, delay, ease: "nefEase" }),
            onLeave: () => gsap.to(el, { ...fromUp, duration: 0.6, delay, ease: "nefEase" }),
            onEnterBack: () => gsap.to(el, { ...toIn, duration: 0.6, delay, ease: "nefEase" }),
            onLeaveBack: () => gsap.to(el, { ...fromDown, duration: 0.6, delay, ease: "nefEase" }),
        })

        return () => trigger.kill()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dir, delay])

    return (
        <div ref={ref} style={{ opacity: 0 }}>
            {children}
        </div>
    )
}
