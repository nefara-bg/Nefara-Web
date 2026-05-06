"use client"

import * as motion from "motion/react-client"
import FeatureCard from "./FeatureCard"
import ChatWidget from "./ChatWidget"
import SystemsWidget from "./SystemsWidget"
import SEOWidget from "./SEOWidget"
import SupportWidget from "./SupportWidget"

export type FeatureData = {
    num: string
    title: string
    desc: string
    side: "left" | "right"
    large?: boolean
    top: string
    height: string
    delay: number
}

const WIDGETS: Record<string, React.ReactNode> = {
    "01": <ChatWidget />,
    "02": <SystemsWidget />,
    "03": <SEOWidget />,
    "04": <SupportWidget />,
}

export default function MissionFeatures({
    heading,
    features,
}: {
    heading: string
    features: FeatureData[]
}) {
    return (
        <>
            <motion.h2
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="absolute font-display font-extrabold text-foreground select-none"
                style={{
                    top: "8.43%", transform: "translateY(-50%)",
                    left: "14.24%", right: "50%",
                    paddingLeft: "1.5rem", paddingRight: "1rem",
                    fontSize: "clamp(1rem, 3.33vh, 2.2rem)",
                    lineHeight: 1.1,
                }}
            >
                {heading}
            </motion.h2>

            {features.map((f) => (
                <FeatureCard key={f.num} {...f} widget={WIDGETS[f.num]} />
            ))}
        </>
    )
}
