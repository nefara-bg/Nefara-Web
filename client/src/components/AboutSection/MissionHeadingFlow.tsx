"use client"

import * as motion from "motion/react-client"

export default function MissionHeadingFlow({ heading }: { heading: string }) {
    return (
        <motion.h2
            initial={{ opacity: 0, y: -8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="font-display pb-2 pt-6 font-extrabold text-foreground"
            style={{
                paddingLeft: "1.5rem",
                paddingRight: "1rem",
                fontSize: "clamp(1rem, 3.33vh, 2.2rem)",
                lineHeight: 1.1,
            }}
        >
            {heading}
        </motion.h2>
    )
}
