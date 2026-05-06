"use client"

import * as motion from "motion/react-client"

export default function WidgetCell({ children, delay, side = "right" }: {
    children: React.ReactNode
    delay: number
    side?: "left" | "right"
}) {
    return (
        <motion.div
            className="flex items-center justify-center w-full h-full py-6"
            initial={{ opacity: 0, x: side === "left" ? -24 : 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {children}
        </motion.div>
    )
}
