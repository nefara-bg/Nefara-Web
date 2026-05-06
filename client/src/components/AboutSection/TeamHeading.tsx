"use client"

import * as motion from "motion/react-client"

export default function TeamHeading({
    sectionLabel,
    mainTitle,
    mainTitle2,
    subText,
}: {
    sectionLabel: string
    mainTitle: string
    mainTitle2: string
    subText: string
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
            <span className="eyebrow mb-5 justify-center">{sectionLabel}</span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-5 leading-[1.05] tracking-tight">
                {mainTitle} <br />
                <span className="text-[hsl(var(--primary-strong))]">{mainTitle2}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{subText}</p>
        </motion.div>
    )
}
