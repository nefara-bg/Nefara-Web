import type { Variants } from "motion/react"

export const EASE = [0.16, 1, 0.3, 1] as const

export const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
}

export const slideFromLeft: Variants = {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const slideFromRight: Variants = {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE } },
}

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
}
