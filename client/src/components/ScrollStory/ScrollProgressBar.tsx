"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState } from "react"
import { SCENE_RUNWAY_VH, SCENE_THRESHOLD } from "./SceneTransition"

// Each transition advances exactly SCENE_THRESHOLD × SCENE_RUNWAY_VH = 165vh of scroll.
// Pass the number of transitions (scenes - 1) so the bar fills across the whole story.
export function ScrollProgressBar({ transitions }: { transitions: number }) {
    const { scrollY } = useScroll()

    // Story height in pixels — recomputed on resize so vh→px stays accurate.
    const [storyPx, setStoryPx] = useState(0)
    useEffect(() => {
        const update = () =>
            setStoryPx(transitions * SCENE_THRESHOLD * SCENE_RUNWAY_VH * window.innerHeight / 100)
        update()
        window.addEventListener("resize", update, { passive: true })
        return () => window.removeEventListener("resize", update)
    }, [transitions])

    // Clamp so the bar stays full after the last transition.
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
