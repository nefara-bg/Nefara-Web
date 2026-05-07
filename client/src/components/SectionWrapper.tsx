"use client"

import { ReactNode } from "react"
import { motion } from "motion/react"
import { EASE } from "@/lib/motion"

type Props = {
    children: ReactNode
    className?: string
    delay?: number
}

export function SectionWrapper({ children, className, delay = 0 }: Props) {
    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE, delay }}
            className={className}
        >
            {children}
        </motion.section>
    )
}
