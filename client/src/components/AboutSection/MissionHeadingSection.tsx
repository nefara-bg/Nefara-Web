import * as motion from "motion/react-client"
import { CONTAINER_STYLE } from "@/config/container"
import MissionHeadingFlow from "./MissionHeadingFlow"

export function MissionHeadingSection({
    tagline,
    heading,
}: {
    tagline: string
    heading: string
}) {
    return (
        <section className="h-screen bg-background overflow-hidden">
            <div
                className="relative flex h-full"
                style={{ ...CONTAINER_STYLE, margin: "0 auto" }}
            >
                {/* Left column: content */}
                <div className="flex flex-col justify-center pl-6 gap-2 w-1/2">
                    <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="h-px w-6" style={{ background: "hsl(var(--primary))" }} />
                        <span className="font-manrope font-bold tracking-wide uppercase text-primary text-xs">
                            {tagline}
                        </span>
                    </motion.div>
                    <MissionHeadingFlow heading={heading} />
                </div>

                {/* Right column: decorative */}
                <div className="w-1/2" />
            </div>
        </section>
    )
}
