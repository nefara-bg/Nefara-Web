"use client"

import { createContext, ReactNode, useContext, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"

const FADE_OUT  = [0.38, 0.50] as const
const FADE_IN   = [0.40, 0.55] as const

export const SCENE_RUNWAY_VH  = 300
export const SCENE_THRESHOLD  = 0.55
// Each transition advances the story by THRESHOLD × RUNWAY_VH = 165vh of scroll.

const MARGIN = "-135vh"

// Guards nested SceneTransitions: when false (inside a fixed overlay), the nested
// transition must not apply its own scroll transforms.
const ActiveContext = createContext(true)

export function SceneTransition({ from, to }: { from: ReactNode; to: ReactNode }) {
    const isActive = useContext(ActiveContext)

    const runwayRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: runwayRef,
        offset: ["start start", "end start"],
    })

    const [done, setDone] = useState(false)
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setDone(isActive && v >= SCENE_THRESHOLD)
    })

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

            <ActiveContext.Provider value={done}>
                {isActive && (
                    <motion.div
                        className={`z-10 ${done ? "relative" : "fixed inset-0 pointer-events-none"}`}
                        style={done
                            ? { marginTop: MARGIN }
                            : { opacity: toOpacity, y: toY, scale: toScale, filter: toFilter }
                        }
                    >
                        {to}
                    </motion.div>
                )}
            </ActiveContext.Provider>
        </>
    )
}
