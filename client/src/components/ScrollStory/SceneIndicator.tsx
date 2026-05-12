"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { useEffect, useState } from "react"
import { SCENE_RUNWAY_VH, SCENE_THRESHOLD } from "./SceneTransition"

export function SceneIndicator({ scenes }: { scenes: number }) {
    const { scrollY } = useScroll()

    const [stepPx, setStepPx] = useState(0)
    const [innerH, setInnerH] = useState(0)
    useEffect(() => {
        const update = () => {
            setStepPx(SCENE_THRESHOLD * SCENE_RUNWAY_VH * window.innerHeight / 100)
            setInnerH(window.innerHeight)
        }
        update()
        window.addEventListener("resize", update, { passive: true })
        return () => window.removeEventListener("resize", update)
    }, [])

    const [active, setActive] = useState(0)
    useMotionValueEvent(scrollY, "change", (y) => {
        if (stepPx <= 0) return
        const idx = Math.min(scenes - 1, Math.max(0, Math.floor(y / stepPx)))
        setActive(idx)
    })

    // Pin to R4's bottom: until the last scene becomes active, the indicator sits at
    // fixed bottom-6. Once scrollY passes the last-scene threshold, translate it up
    // at scroll-rate so it stays anchored to R4's bottom edge and rides off-screen
    // with R4 as the user continues into ContactCTA.
    const lockY = stepPx * (scenes - 1)
    const stickY = useTransform(scrollY, [lockY, lockY + innerH], [0, -innerH], { clamp: true })

    return (
        <div
            aria-hidden
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
        >
            <motion.div
                style={{ y: stickY }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-background"
            >
                {Array.from({ length: scenes }).map((_, i) => {
                    const isActive = i === active
                    return (
                        <motion.span
                            key={i}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{
                                scale: 1,
                                width: isActive ? 26 : 6,
                                opacity: isActive ? 1 : 0.35,
                                backgroundColor: isActive
                                    ? "hsl(var(--primary))"
                                    : "hsl(var(--foreground))",
                            }}
                            transition={{
                                scale: { duration: 0.55, delay: 0.15 + i * 0.09, ease: [0.34, 1.56, 0.64, 1] },
                                opacity: { duration: 0.45, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] },
                                width: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                                backgroundColor: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                            }}
                            className="block h-1.5 rounded-full"
                            style={{
                                boxShadow: isActive
                                    ? "0 0 10px 1px hsl(var(--primary)/0.55)"
                                    : "none",
                            }}
                        />
                    )
                })}
            </motion.div>
        </div>
    )
}
