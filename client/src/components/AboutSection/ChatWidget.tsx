"use client"

import * as motion from "motion/react-client"
import { useTranslations } from "next-intl"

export default function ChatWidget() {
    const t = useTranslations("about.widgets.chat")

    return (
        <div className="flex flex-col scale-150 gap-3 select-none" style={{ width: 260 }}>
            <motion.div
                className="flex items-end gap-1.5"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <div className="w-8 h-8 rounded-full flex-shrink-0 grid place-items-center font-bold text-[11px]"
                    style={{ background: "hsl(var(--primary)/0.18)", color: "hsl(var(--primary))" }}>D</div>
                <div style={{
                    background: "hsl(var(--primary)/0.12)",
                    color: "hsl(var(--foreground)/0.85)",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    padding: "8px 13px", fontSize: 12, lineHeight: 1.45,
                }}>
                    {t("message1")}
                </div>
            </motion.div>

            <motion.div
                className="flex items-end gap-1.5 justify-end"
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55, duration: 0.4 }}
            >
                <div style={{
                    background: "hsl(var(--foreground)/0.06)",
                    color: "hsl(var(--foreground)/0.8)",
                    borderRadius: "1rem 1rem 0.2rem 1rem",
                    padding: "8px 13px", fontSize: 12, lineHeight: 1.45,
                }}>
                    {t("message2")}
                </div>
                <div className="w-8 h-8 rounded-full flex-shrink-0 grid place-items-center font-bold text-[11px]"
                    style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.45)" }}>C</div>
            </motion.div>

            <motion.div
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.0, duration: 0.35 }}
            >
                <div className="w-6 h-6 rounded-full flex-shrink-0"
                    style={{ background: "hsl(var(--primary)/0.18)" }} />
                <div className="flex items-center gap-[4px]"
                    style={{
                        background: "hsl(var(--primary)/0.12)",
                        padding: "10px 11px",
                        borderRadius: "1rem 1rem 1rem 0.2rem",
                    }}>
                    {[0, 0.22, 0.44].map((d, i) => (
                        <span key={i} style={{
                            display: "block", width: 7, height: 7, borderRadius: "50%",
                            background: "hsl(var(--primary))",
                            animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                        }} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}
