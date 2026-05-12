"use client"

import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { useEffect, useRef, useState } from "react"

function readDonePts(): number[] {
    return Array.from(document.querySelectorAll("[data-scene-done-px]"))
        .map(el => Number(el.getAttribute("data-scene-done-px")))
        .sort((a, b) => a - b)
}

export function SceneIndicator({ scenes }: { scenes: number }) {
    const { scrollY } = useScroll()

    const [innerH, setInnerH] = useState(0)
    useEffect(() => {
        const update = () => setInnerH(window.innerHeight)
        update()
        window.addEventListener("resize", update, { passive: true })
        return () => window.removeEventListener("resize", update)
    }, [])

    // Done-at pixels published by each SceneTransition via data-scene-done-px.
    const [donePts, setDonePts] = useState<number[]>([])
    const donePtsRef = useRef<number[]>([])
    useEffect(() => {
        const update = () => {
            const pts = readDonePts()
            donePtsRef.current = pts
            setDonePts(pts)
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

    const [active, setActive] = useState(0)
    useMotionValueEvent(scrollY, "change", (y) => {
        const pts = donePtsRef.current
        if (pts.length === 0) return
        const idx = Math.min(scenes - 1, pts.filter(p => y >= p).length)
        setActive(idx)
    })

    // Once the last scene becomes active, ride the indicator off-screen with it
    // so it doesn't overlap the ContactCTA section.
    const lockY = donePts.at(-1) ?? Number.MAX_SAFE_INTEGER
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
