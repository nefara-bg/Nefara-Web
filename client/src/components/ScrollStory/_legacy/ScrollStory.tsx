"use client"

import { ReactNode, useRef, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { EASE } from "@/lib/motion"

type Props = {
    scenes: [ReactNode, ReactNode]
}

const SCENE_BOUNDARY = 0.5
const FADE_STOPS = [0.4, 0.5] as const

export function ScrollStory({ scenes }: Props) {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

    const [activeScene, setActiveScene] = useState(0)
    useMotionValueEvent(scrollYProgress, "change", (v) => {
        const next = v < SCENE_BOUNDARY ? 0 : 1
        setActiveScene((prev) => (prev === next ? prev : next))
    })

    // Scene 0 - fades OUT only
    const s0Opacity = useTransform(scrollYProgress, [...FADE_STOPS], [1, 0])
    const s0Y = useTransform(scrollYProgress, [...FADE_STOPS], [0, -16])
    const s0Blur = useTransform(scrollYProgress, [...FADE_STOPS], [0, 4])
    const s0Filter = useTransform(s0Blur, (v) => `blur(${v}px)`)

    // Scene 1 - fades IN only
    const s1Opacity = useTransform(scrollYProgress, [...FADE_STOPS], [0, 1])
    const s1Y = useTransform(scrollYProgress, [...FADE_STOPS], [16, 0])
    const s1Blur = useTransform(scrollYProgress, [...FADE_STOPS], [4, 0])
    const s1Filter = useTransform(s1Blur, (v) => `blur(${v}px)`)

    const progressWidth = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"])

    const sceneOpacities = [s0Opacity, s1Opacity] as const
    const sceneYs = [s0Y, s1Y] as const
    const sceneFilters = [s0Filter, s1Filter] as const

    const gradients = [
        "radial-gradient(ellipse 70vw 55vh at 78% 42%, rgba(14,165,160,0.10), transparent 62%)",
        "radial-gradient(ellipse 60vw 50vh at 22% 50%, rgba(14,165,160,0.10), transparent 62%)",
    ]

    return (
        <section ref={ref} className="relative h-[300vh] md:h-[340vh] lg:h-[380vh]">
            <div className="sticky top-0 h-screen overflow-hidden bg-background">
                {sceneOpacities.map((opacity, i) => (
                    <motion.div
                        key={`grad-${i}`}
                        aria-hidden
                        style={{ opacity, background: gradients[i] }}
                        className="pointer-events-none absolute inset-0 will-change-[opacity]"
                    />
                ))}

                {scenes.map((scene, i) => (
                    <motion.div
                        key={`scene-${i}`}
                        style={{
                            opacity: sceneOpacities[i],
                            y: sceneYs[i],
                            filter: sceneFilters[i],
                        }}
                        className={`absolute inset-0 will-change-[transform,opacity,filter] ${
                            activeScene === i ? "" : "pointer-events-none"
                        }`}
                    >
                        {scene}
                    </motion.div>
                ))}

                <div className="absolute top-20 left-0 right-0 h-0.5 bg-black/[0.04] z-30 pointer-events-none">
                    <motion.div
                        style={{ width: progressWidth }}
                        className="h-full bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--primary-strong))]"
                    />
                </div>

                <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center items-center gap-2 pointer-events-none">
                    {Array.from({ length: 2 }).map((_, i) => (
                        <motion.span
                            key={i}
                            animate={{
                                scale: activeScene === i ? 1.3 : 1,
                                backgroundColor:
                                    activeScene === i ? "hsl(var(--primary))" : "rgba(30,32,40,0.18)",
                                width: activeScene === i ? 22 : 6,
                            }}
                            transition={{ duration: 0.4, ease: EASE }}
                            className="h-1.5 rounded-full"
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
