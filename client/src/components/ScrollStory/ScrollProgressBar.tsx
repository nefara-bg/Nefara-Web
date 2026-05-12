"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"

export function ScrollProgressBar({ transitions: _ = 0 }: { transitions?: number }) {
    const { scrollY } = useScroll()

    const [storyPx, setStoryPx] = useState(0)
    useEffect(() => {
        const update = () => {
            const pts = Array.from(document.querySelectorAll("[data-scene-done-px]"))
                .map(el => Number(el.getAttribute("data-scene-done-px")))
            setStoryPx(pts.length ? Math.max(...pts) : 0)
        }
        update()
        const mo = new MutationObserver(update)
        mo.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["data-scene-done-px"] })
        window.addEventListener("resize", update, { passive: true })
        return () => {
            mo.disconnect()
            window.removeEventListener("resize", update)
        }
    }, [])

    const scaleX = useTransform(scrollY, [0, storyPx], [0, 1], { clamp: true })

    return (
        <div className="fixed top-16 left-0 right-0 h-1 bg-black/[0.04] z-30 pointer-events-none">
            <motion.div
                style={{ scaleX, transformOrigin: "left" }}
                className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-strong))]"
            />
        </div>
    )
}
