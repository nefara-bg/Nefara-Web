"use client"

import { useTranslations } from "next-intl"

export default function ChatWidget() {
    const t = useTranslations("about.widgets.chat")

    return (
        <div className="select-none w-full h-full flex flex-col">
            {/* Header */}
            <div className="relative flex items-center gap-3 py-4 px-3">
                <div className="absolute inset-x-0 top-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: "hsl(var(--border))" }} />
                <div className="w-8 h-8 rounded-full flex-shrink-0 overflow-hidden"
                    style={{ background: "hsl(var(--primary)/0.15)" }}>
                    <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                </div>
                <div>
                    <p className="text-sm font-semibold leading-none mb-0.5" style={{ color: "hsl(var(--foreground))" }}>
                        Nefara
                    </p>
                    <p className="text-xs" style={{ color: "#22c55e" }}>Active now</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex flex-col flex-1 justify-between py-6 px-3">

                {/* Incoming */}
                <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden"
                        style={{ background: "hsl(var(--primary)/0.15)" }}>
                        <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                    </div>
                    <p
                        className="text-sm leading-relaxed px-4 py-2.5 max-w-[80%]"
                        style={{
                            background: "hsl(var(--primary)/0.1)",
                            color: "hsl(var(--foreground)/0.85)",
                            borderRadius: "0 var(--radius-lg) var(--radius-lg) var(--radius-lg)",
                        }}
                    >
                        {t("message1")}
                    </p>
                </div>

                {/* Outgoing */}
                <div className="flex items-end gap-2 justify-end">
                    <p
                        className="text-sm leading-relaxed px-4 py-2.5 max-w-[80%]"
                        style={{
                            background: "hsl(var(--primary))",
                            color: "hsl(var(--background))",
                            borderRadius: "var(--radius-lg) var(--radius-lg) 0 var(--radius-lg)",
                        }}
                    >
                        {t("message2")}
                    </p>
                    <div
                        className="w-6 h-6 rounded-full flex-shrink-0 grid place-items-center text-[10px] font-bold"
                        style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.4)" }}
                    >
                        C
                    </div>
                </div>

                {/* Typing */}
                <div className="flex items-end gap-2">
                    <div className="w-6 h-6 rounded-full flex-shrink-0 overflow-hidden"
                        style={{ background: "hsl(var(--primary)/0.15)" }}>
                        <img src="/features/nefara-pfp.svg" alt="Nefara" className="w-full h-full object-cover" />
                    </div>
                    <div
                        className="flex items-center gap-1 px-4 py-3"
                        style={{ borderRadius: "0 var(--radius-lg) var(--radius-lg) var(--radius-lg)", background: "hsl(var(--primary)/0.1)" }}
                    >
                        {[0, 0.22, 0.44].map((d, i) => (
                            <span key={i} style={{
                                display: "block", width: 6, height: 6, borderRadius: "50%",
                                background: "hsl(var(--primary))",
                                animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                            }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
