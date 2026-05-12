"use client"

import * as motion from "motion/react-client"
import { useTranslations } from "next-intl"

export default function ChatWidget() {
    const t = useTranslations("about.widgets.chat")

    return (
        <div className="flex flex-col gap-4 select-none w-full max-w-xs">
            <motion.div
                className="flex items-end gap-2"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <div className="w-10 h-10 rounded-full flex-shrink-0 grid place-items-center font-bold text-sm"
                    style={{ background: "hsl(var(--primary)/0.18)", color: "hsl(var(--primary))" }}>D</div>
                <div style={{
                    background: "hsl(var(--primary)/0.12)",
                    color: "hsl(var(--foreground)/0.85)",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    padding: "10px 16px", fontSize: 14, lineHeight: 1.5,
                }}>
                    {t("message1")}
                </div>
            </motion.div>

            <motion.div
                className="flex items-end gap-2 justify-end"
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.4 }}
            >
                <div style={{
                    background: "hsl(var(--foreground)/0.06)",
                    color: "hsl(var(--foreground)/0.8)",
                    borderRadius: "1rem 1rem 0.2rem 1rem",
                    padding: "10px 16px", fontSize: 14, lineHeight: 1.5,
                }}>
                    {t("message2")}
                </div>
                <div className="w-10 h-10 rounded-full flex-shrink-0 grid place-items-center font-bold text-sm"
                    style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.45)" }}>C</div>
            </motion.div>

            <motion.div
                className="flex items-center gap-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.35 }}
            >
                <div className="w-8 h-8 rounded-full flex-shrink-0"
                    style={{ background: "hsl(var(--primary)/0.18)" }} />
                <div className="flex items-center gap-[5px]"
                    style={{
                        background: "hsl(var(--primary)/0.12)",
                        padding: "12px 14px",
                        borderRadius: "1rem 1rem 1rem 0.2rem",
                    }}>
                    {[0, 0.22, 0.44].map((d, i) => (
                        <span key={i} style={{
                            display: "block", width: 8, height: 8, borderRadius: "50%",
                            background: "hsl(var(--primary))",
                            animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                        }} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
