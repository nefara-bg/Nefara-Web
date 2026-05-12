"use client"

import * as motion from "motion/react-client"

export default function FeatureCardFlow({
    num, title, desc, side, delay,
}: {
    num: string
    title: string
    desc: string
    side: "left" | "right"
    delay: number
}) {
    const isLeft = side === "left"

    return (
        <motion.div
            className="relative w-full h-full overflow-hidden group cursor-default flex"
            initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: isLeft
                        ? "radial-gradient(ellipse 75% 70% at 0% 50%, hsl(var(--primary)/0.09) 0%, transparent 100%)"
                        : "radial-gradient(ellipse 75% 70% at 100% 50%, hsl(var(--primary)/0.09) 0%, transparent 100%)",
                }}
            />
            <div
                className={`absolute top-[8%] bottom-[8%] w-px pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isLeft ? "left-0" : "right-0"}`}
                style={{
                    background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)",
                    boxShadow: "0 0 8px 2px hsl(var(--primary)/0.4)",
                }}
            />

            <div className="flex flex-col justify-center px-6 py-6">
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className="font-manrope font-bold tracking-[0.18em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.28em] text-primary text-md"
                    >
                        {num}
                    </span>
                    <div
                        className="h-px transition-all duration-300 opacity-30 group-hover:opacity-80"
                        style={{ background: "hsl(var(--primary))", width: 18 }}
                    />
                </div>

                <h3
                    className="text-3xl font-manrope font-bold text-foreground transition-colors duration-200 group-hover:text-[hsl(var(--primary-strong))] mb-3"
                >
                    {title}
                </h3>

                <p
                    className=" text-muted-foreground transition-colors duration-200 group-hover:text-foreground/65 text-lg"
                >
                    {desc}
                </p>
            </div>
        </motion.div>
    )
}
