"use client"

import * as motion from "motion/react-client"

export default function MissionHeadingFlow({ heading }: { heading: string }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-3xl font-manrope pb-4 font-bold text-foreground"
        >
            {heading}
        </motion.h2>
    )
}
