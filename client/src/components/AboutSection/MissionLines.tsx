"use client"

import * as motion from "motion/react-client"

const T = "hsl(var(--primary) / 0.65)"

function VLine({ left, right, top = "0%", bottom = "0%", delay = 0 }: {
    left?: string; right?: string; top?: string; bottom?: string; delay?: number
}) {
    return (
        <motion.div
            className="absolute w-px"
            style={{ background: T, left, right, top, bottom, transformOrigin: "top", scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        />
    )
}

function HLine({ top, left = "0%", right = "0%", delay = 0 }: {
    top: string; left?: string; right?: string; delay?: number
}) {
    return (
        <motion.div
            className="absolute h-px"
            style={{ background: T, top, left, right, transformOrigin: "left", scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        />
    )
}

function CrossTick({ left, top }: { left: string; top: string }) {
    const s = "hsl(var(--primary) / 0.55)"
    return (
        <motion.div
            className="absolute pointer-events-none"
            style={{ left, top, transform: "translate(-50%,-50%)", width: 14, height: 14 }}
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.8 }}
        >
            <div style={{ position: "absolute", width: 1, height: 14, background: s, left: 6, top: 0 }} />
            <div style={{ position: "absolute", height: 1, width: 14, background: s, top: 6, left: 0 }} />
        </motion.div>
    )
}

export default function MissionLines() {
    return (
        <>
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <VLine left="14.24%"  delay={0.05} />
                <VLine right="14.51%" delay={0.10} />
                <VLine left="50%" top="5.28%" delay={0.18} />

                <HLine top="5.28%"  left="50%"    right="14.51%" delay={0.28} />
                <HLine top="12.96%" left="0%"      right="14.51%" delay={0.34} />
                <HLine top="31.94%" left="14.24%"  right="14.51%" delay={0.40} />
                <HLine top="58.70%" left="0%"      right="14.51%" delay={0.46} />
                <HLine top="74.54%" left="14.24%"  right="14.51%" delay={0.52} />
            </div>

            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {[
                    ["14.24%", "12.96%"], ["50%", "12.96%"],
                    ["14.24%", "31.94%"], ["50%", "31.94%"],
                    ["14.24%", "58.70%"], ["50%", "58.70%"],
                    ["14.24%", "74.54%"], ["50%", "74.54%"],
                ].map(([l, t]) => (
                    <CrossTick key={`${l}-${t}`} left={l} top={t} />
                ))}
            </div>
        </>
    )
}
