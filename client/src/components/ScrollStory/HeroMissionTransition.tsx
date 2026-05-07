"use client"

import { ReactNode, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"

// Runway: 300vh. Hero sticks for 200vh (300 - 100 = sticky range).
//
// Crossfade happens at progress 0.38–0.55 (scrollY ~114–165vh).
//
// DONE_THRESHOLD = 0.55 → scrollY = 0.55 × 300 = 165vh.
// At that scroll position, if mission sits at document y = 165vh (natural flow),
// its visual top = 165 - 165 = 0 → perfectly at viewport top, no jump.
// To place it there: marginTop = 165vh - 300vh (runway) = -135vh.

const HERO_FADE_OUT   = [0.38, 0.50] as const
const MISSION_FADE_IN = [0.40, 0.55] as const
const DONE_THRESHOLD  = 0.55
const MISSION_MARGIN  = "-135vh" // = -(300 - 165)vh

export function HeroMissionTransition({
    hero,
    mission,
}: {
    hero: ReactNode
    mission: ReactNode
}) {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })

    // Flip once transition is done — mission switches from fixed overlay to natural scroll
    const [done, setDone] = useState(false)
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        setDone(v >= DONE_THRESHOLD)
    })

    const heroOpacity = useTransform(scrollYProgress, [...HERO_FADE_OUT], [1, 0])
    const heroY       = useTransform(scrollYProgress, [...HERO_FADE_OUT], [0, -16])
    const heroBlur    = useTransform(scrollYProgress, [...HERO_FADE_OUT], [0, 4])
    const heroFilter  = useTransform(heroBlur, (v) => `blur(${v}px)`)

    const missionOpacity = useTransform(scrollYProgress, [...MISSION_FADE_IN], [0, 1])
    const missionY       = useTransform(scrollYProgress, [...MISSION_FADE_IN], [16, 0])
    const missionBlur    = useTransform(scrollYProgress, [...MISSION_FADE_IN], [4, 0])
    const missionFilter  = useTransform(missionBlur, (v) => `blur(${v}px)`)

    const progressWidth = useTransform(scrollYProgress, [0, 0.67], ["0%", "100%"])

    return (
        <>
            <div className="fixed top-16 left-0 right-0 h-0.5 bg-black/[0.04] z-30 pointer-events-none">
                <motion.div
                    style={{ width: progressWidth }}
                    className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-strong))]"
                />
            </div>

            {/* 300vh runway — hero sticks for the first 200vh */}
            <div ref={ref} className="relative" style={{ height: "300vh" }}>
                <motion.div
                    className="sticky top-0 h-screen w-full overflow-hidden z-0"
                    style={{ opacity: heroOpacity, y: heroY, filter: heroFilter }}
                >
                    {hero}
                </motion.div>
            </div>

            {/* Single DOM node — never unmounts, so whileInView once:true state is preserved.
                Fixed overlay during crossfade → switches to natural scroll when done. */}
            <motion.div
                className={`z-10 ${done ? "relative" : "fixed inset-0 pointer-events-none"}`}
                style={done
                    ? { marginTop: MISSION_MARGIN }
                    : { opacity: missionOpacity, y: missionY, filter: missionFilter }
                }
            >
                {mission}
            </motion.div>
        </>
    )
}
