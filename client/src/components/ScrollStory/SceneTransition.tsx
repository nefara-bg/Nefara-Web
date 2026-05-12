"use client"

import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"

// 300vh runway. DONE at progress 0.55 → scrollY = 165vh.
// marginTop = -(300 - 165)vh = -135vh so visual position matches scroll at flip.
const FADE_OUT  = [0.38, 0.50] as const
const FADE_IN   = [0.40, 0.55] as const

export const SCENE_RUNWAY_VH  = 300
export const SCENE_THRESHOLD  = 0.55
// Each transition advances the story by THRESHOLD × RUNWAY_VH = 165vh of scroll.

const MARGIN = "-135vh"

// Guards nested SceneTransitions: when false (inside a fixed overlay), the nested
// transition must not apply its own scroll transforms — its `from` would otherwise
// fade out at the same scrollYProgress as the outer transition, causing a snap.
const ActiveContext = createContext(true)

export function SceneTransition({ from, to }: { from: ReactNode; to: ReactNode }) {
    const isActive = useContext(ActiveContext)

    const runwayRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: runwayRef,
        offset: ["start start", "end start"],
    })

    const [done, setDone] = useState(false)
    // React 18 bails on same-value updates, so calling setDone on every scroll event
    // only triggers a re-render on the two threshold crossings (up and down).
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setDone(isActive && v >= SCENE_THRESHOLD)
    })

    // When this transition activates, its runway target was previously inside a
    // fixed-positioned ancestor and useScroll's cached bounding rect is stale.
    // Without forcing a re-measurement, scrollYProgress can read past the threshold
    // on the next scroll event — flipping `done` instantly and causing the incoming
    // scene to pop in fully opaque instead of fading in.
    useEffect(() => {
        if (!isActive) return
        const id = requestAnimationFrame(() => {
            window.dispatchEvent(new Event("resize"))
        })
        return () => cancelAnimationFrame(id)
    }, [isActive])

    // Compute filter directly — avoids two intermediate blur MotionValues.
    const fromOpacity = useTransform(scrollYProgress, [...FADE_OUT], [1, 0])
    const fromY       = useTransform(scrollYProgress, [...FADE_OUT], [0, -16])
    const fromScale   = useTransform(scrollYProgress, [...FADE_OUT], [1, 0.92])
    const fromFilter  = useTransform(scrollYProgress, [...FADE_OUT], ["blur(0px)", "blur(4px)"])

    const toOpacity = useTransform(scrollYProgress, [...FADE_IN], [0, 1])
    const toY       = useTransform(scrollYProgress, [...FADE_IN], [16, 0])
    const toScale   = useTransform(scrollYProgress, [...FADE_IN], [1.08, 1])
    const toFilter  = useTransform(scrollYProgress, [...FADE_IN], ["blur(4px)", "blur(0px)"])

    return (
        <>
            <div ref={runwayRef} className="relative" style={{ height: "300vh" }}>
                <motion.div
                    className="sticky top-0 h-screen w-full overflow-hidden"
                    style={isActive ? { opacity: fromOpacity, y: fromY, scale: fromScale, filter: fromFilter } : {}}
                >
                    {from}
                </motion.div>
            </div>

            {/* done === isActive && scrollYProgress >= THRESHOLD, so using done directly
                as the context value is equivalent to the previous effectiveDone alias. */}
            <ActiveContext.Provider value={done}>
                <motion.div
                    className={`z-10 ${done ? "relative" : "fixed inset-0 pointer-events-none"}`}
                    style={done
                        ? { marginTop: MARGIN }
                        : isActive
                            ? { opacity: toOpacity, y: toY, scale: toScale, filter: toFilter }
                            : { opacity: 0 }
                    }
                >
                    {to}
                </motion.div>
            </ActiveContext.Provider>
        </>
    )
}
