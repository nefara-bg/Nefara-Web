"use client"

import { motion } from "motion/react"
import { ChevronDown } from "lucide-react"

interface ScrollCtaProps {
    label: string
}

export default function ScrollCta({ label }: ScrollCtaProps) {
    const scrollDown = () => {
        const section = document.querySelector("#home-alt")
        if (section) {
            window.scrollTo({ top: section.clientHeight, behavior: "smooth" })
        }
    }

    return (
        <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            onClick={scrollDown}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
            style={{ fontSize: "clamp(0.65rem, 0.8vw, 0.8rem)", letterSpacing: "0.08em" }}
        >
            <span className="uppercase tracking-widest">{label}</span>
            <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <ChevronDown className="w-4 h-4 group-hover:text-primary transition-colors" strokeWidth={1.5} />
            </motion.div>
        </motion.button>
    )
}
