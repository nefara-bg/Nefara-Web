"use client"

import * as motion from "motion/react-client"

export default function FeatureCard({
    num, title, desc, side, large = false, top, height, delay, widget,
}: {
    num: string
    title: string
    desc: string
    side: "left" | "right"
    large?: boolean
    top: string
    height: string
    delay: number
    widget: React.ReactNode
}) {
    const isLeft = side === "left"

    return (
        <motion.div
            className="absolute overflow-hidden group cursor-default"
            initial={{ opacity: 0, x: isLeft ? -36 : 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
                top, height,
                left: isLeft ? "14.24%" : "50%",
                right: isLeft ? "50%" : "14.51%",
            }}
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

            <div
                className="absolute inset-y-0 left-0 flex flex-col justify-center pl-6"
                style={{ right: "40%" }}
            >
                <div className="flex items-center gap-2 mb-3">
                    <span
                        className="font-mono font-bold tracking-[0.18em] transition-[letter-spacing] duration-300 group-hover:tracking-[0.28em]"
                        style={{ color: "hsl(var(--primary))", fontSize: "clamp(0.48rem, 0.68vh, 0.62rem)" }}
                    >
                        {num}
                    </span>
                    <div
                        className="h-px transition-all duration-300 opacity-30 group-hover:opacity-80"
                        style={{ background: "hsl(var(--primary))", width: 18 }}
                    />
                </div>

                <h3
                    className={`font-display text-foreground leading-tight transition-colors duration-200 group-hover:text-[hsl(var(--primary-strong))] ${large ? "font-extrabold mb-4" : "font-bold mb-3"}`}
                    style={{
                        fontSize: large
                            ? "clamp(0.88rem, 3.1vh, 2.1rem)"
                            : "clamp(0.78rem, 2.3vh, 1.55rem)",
                        lineHeight: 1.18,
                    }}
                >
                    {title}
                </h3>

                <p
                    className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground/65"
                    style={{ fontSize: "clamp(0.58rem, 1.15vh, 0.8rem)", lineHeight: 1.7 }}
                >
                    {desc}
                </p>
            </div>

            <div
                className="absolute inset-y-0 right-0 flex items-center justify-center
                            opacity-0 group-hover:opacity-100
                            translate-x-6 group-hover:translate-x-0
                            transition-all duration-500"
                style={{ left: "60%", paddingRight: "1.5rem" }}
            >
                {widget}
            </div>
        </motion.div>
    )
}
