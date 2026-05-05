"use client"

import * as motion from "motion/react-client"
import { useTranslations } from "next-intl"

// SVG 1920×1080 grid → viewport %
// Verticals:  left=14.24%, center=50%, right=14.51% from right
// Horizontals: 5.28%, 12.96%, 31.94%, 58.70%, 74.54%
// Text centres from path bboxes:
//   heading 8.43%  |  f01 title 16.71% / desc 20.93%
//   f02 title 40.09% / desc 47.04%
//   f03 title 62.69% / desc 67.31%
//   f04 title 79.63% / desc 84.07%

const T = "hsl(var(--primary) / 0.65)"

// ── Animated grid ────────────────────────────────────────────────────────────

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

// ── Widget: chat (Feature 01 – Direct Communication) ─────────────────────────

function ChatWidget() {
    return (
        <div className="flex flex-col gap-2 select-none" style={{ width: 186 }}>

            {/* Dev message */}
            <motion.div
                className="flex items-end gap-1.5"
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1, duration: 0.4 }}
            >
                <div className="w-6 h-6 rounded-full flex-shrink-0 grid place-items-center font-bold text-[9px]"
                    style={{ background: "hsl(var(--primary)/0.18)", color: "hsl(var(--primary))" }}>D</div>
                <div style={{
                    background: "hsl(var(--primary)/0.12)",
                    color: "hsl(var(--foreground)/0.85)",
                    borderRadius: "1rem 1rem 1rem 0.2rem",
                    padding: "6px 10px", fontSize: 9, lineHeight: 1.45,
                }}>
                    Ready to build your vision!
                </div>
            </motion.div>

            {/* Client message */}
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
                    padding: "6px 10px", fontSize: 9, lineHeight: 1.45,
                }}>
                    Let's get started!
                </div>
                <div className="w-6 h-6 rounded-full flex-shrink-0 grid place-items-center font-bold text-[9px]"
                    style={{ background: "hsl(var(--foreground)/0.08)", color: "hsl(var(--foreground)/0.45)" }}>C</div>
            </motion.div>

            {/* Typing indicator */}
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
                        padding: "7px 11px",
                        borderRadius: "1rem 1rem 1rem 0.2rem",
                    }}>
                    {[0, 0.22, 0.44].map((d, i) => (
                        <span key={i} style={{
                            display: "block", width: 5, height: 5, borderRadius: "50%",
                            background: "hsl(var(--primary))",
                            animation: `typingBounce 1.4s ease-in-out ${d}s infinite`,
                        }} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

// ── Widget: node graph (Feature 02 – Software Systems) ───────────────────────

function SystemsWidget() {
    // Square grid: App(TL) API(TR) DB(BL) CDN(BR)
    const nodeW = 36, nodeH = 22, rx = 4
    const positions = [
        { id: "App", x: 8,   y: 12 },
        { id: "API", x: 116, y: 12 },
        { id: "DB",  x: 8,   y: 76 },
        { id: "CDN", x: 116, y: 76 },
    ]
    // Edge: [fromCenterX, fromCenterY, toCenterX, toCenterY]
    const edges = [
        { path: "M44,23 L116,23",  dur: 1.6 },
        { path: "M26,34 L26,76",   dur: 2.0 },
        { path: "M134,34 L134,76", dur: 1.8 },
        { path: "M44,87 L116,87",  dur: 1.5 },
    ]

    return (
        <svg width="170" height="115" viewBox="0 0 170 115" style={{ overflow: "visible" }}>
            {/* Connection lines */}
            {edges.map((e, i) => (
                <path key={i} d={e.path} fill="none"
                    stroke="hsl(var(--primary)/0.28)" strokeWidth={1} strokeDasharray="4 3" />
            ))}

            {/* Animated flow dots */}
            {edges.map((e, i) => (
                <circle key={`d${i}`} r="2.5" fill="hsl(var(--primary))" opacity="0.9">
                    <animateMotion dur={`${e.dur}s`} repeatCount="indefinite" begin={`${i * 0.55}s`} path={e.path} />
                </circle>
            ))}

            {/* Nodes */}
            {positions.map((n) => (
                <g key={n.id}>
                    <rect x={n.x} y={n.y} width={nodeW} height={nodeH} rx={rx}
                        fill="hsl(var(--primary)/0.11)"
                        stroke="hsl(var(--primary)/0.45)" strokeWidth={0.75} />
                    <text x={n.x + nodeW / 2} y={n.y + nodeH / 2 + 3.5}
                        textAnchor="middle"
                        fill="hsl(var(--primary))"
                        fontSize={8} fontWeight={700} fontFamily="monospace">
                        {n.id}
                    </text>
                </g>
            ))}
        </svg>
    )
}

// ── Widget: SEO chart (Feature 03) ───────────────────────────────────────────

function SEOWidget() {
    const bars = [
        { h: 22, d: 0 }, { h: 38, d: 0.18 }, { h: 52, d: 0.36 },
        { h: 68, d: 0.54 }, { h: 82, d: 0.72 }, { h: 100, d: 0.90 },
    ]
    return (
        <div className="flex flex-col gap-2 select-none" style={{ width: 140 }}>
            {/* Rank pill */}
            <div className="flex items-center gap-2">
                <span className="font-bold px-1.5 py-0.5 rounded"
                    style={{ background: "hsl(var(--primary)/0.14)", color: "hsl(var(--primary))", fontSize: 8 }}>
                    #1
                </span>
                <span style={{ fontSize: 8, color: "hsl(var(--foreground)/0.45)" }}>nefara.com</span>
            </div>

            {/* Bars */}
            <div className="flex items-end gap-[3px]" style={{ height: 46 }}>
                {bars.map((b, i) => (
                    <div key={i} className="flex-1 rounded-sm"
                        style={{
                            height: `${b.h}%`,
                            background: `hsl(var(--primary) / ${0.22 + b.h / 100 * 0.7})`,
                            transformOrigin: "bottom",
                            animation: `barPulse 2.8s ease-in-out ${b.d}s infinite`,
                        }} />
                ))}
            </div>

            {/* Trend */}
            <div className="flex items-center gap-1"
                style={{ fontSize: 8, color: "hsl(var(--primary))", fontWeight: 600 }}>
                <span>↑</span><span>Organic traffic rising</span>
            </div>
        </div>
    )
}

// ── Widget: monitoring (Feature 04 – Support) ────────────────────────────────

function SupportWidget() {
    return (
        <div className="flex flex-col gap-3 select-none" style={{ width: 160 }}>
            {/* Status */}
            <div className="flex items-center gap-2">
                <div className="relative w-2 h-2 flex-shrink-0">
                    <div className="absolute inset-0 rounded-full" style={{ background: "#22c55e" }} />
                    <div className="absolute inset-0 rounded-full"
                        style={{ background: "#22c55e", animation: "pulseRing 1.8s ease-out infinite" }} />
                </div>
                <span style={{ fontSize: 8.5, color: "hsl(var(--foreground)/0.6)" }}>
                    All systems operational
                </span>
            </div>

            {/* ECG line */}
            <svg width="150" height="36" viewBox="0 0 150 36" style={{ overflow: "visible" }}>
                {/* Faint guide line */}
                <line x1="0" y1="18" x2="150" y2="18"
                    stroke="hsl(var(--primary)/0.15)" strokeWidth={1} />
                {/* Animated pulse */}
                <path
                    d="M0,18 L26,18 L34,4 L42,32 L50,18 L76,18 L84,4 L92,32 L100,18 L150,18"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="280"
                    style={{ animation: "ecgScan 2.2s linear infinite" }}
                />
            </svg>

            {/* Stats */}
            <div className="flex gap-5">
                <div>
                    <div className="font-display font-bold" style={{ color: "hsl(var(--primary))", fontSize: 15 }}>
                        99.9%
                    </div>
                    <div style={{ fontSize: 8, color: "hsl(var(--foreground)/0.4)" }}>Uptime</div>
                </div>
                <div>
                    <div className="font-display font-bold" style={{ color: "hsl(var(--primary))", fontSize: 15 }}>
                        24/7
                    </div>
                    <div style={{ fontSize: 8, color: "hsl(var(--foreground)/0.4)" }}>Monitoring</div>
                </div>
            </div>
        </div>
    )
}

// ── Feature card ─────────────────────────────────────────────────────────────

function FeatureCard({
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
            {/* Radial glow from the shared grid edge */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: isLeft
                        ? "radial-gradient(ellipse 75% 70% at 0% 50%, hsl(var(--primary)/0.09) 0%, transparent 100%)"
                        : "radial-gradient(ellipse 75% 70% at 100% 50%, hsl(var(--primary)/0.09) 0%, transparent 100%)",
                }}
            />

            {/* Shared-edge accent glow */}
            <div
                className={`absolute top-[8%] bottom-[8%] w-px pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100 ${isLeft ? "left-0" : "right-0"}`}
                style={{
                    background: "linear-gradient(to bottom, transparent, hsl(var(--primary)), transparent)",
                    boxShadow: "0 0 8px 2px hsl(var(--primary)/0.4)",
                }}
            />

            {/* Text – always visible, takes left ~58% */}
            <div
                className="absolute inset-y-0 left-0 flex flex-col justify-center pl-6"
                style={{ right: "40%" }}
            >
                {/* Number + expanding dash */}
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

                {/* Title */}
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

                {/* Description */}
                <p
                    className="text-muted-foreground transition-colors duration-200 group-hover:text-foreground/65"
                    style={{ fontSize: "clamp(0.58rem, 1.15vh, 0.8rem)", lineHeight: 1.7 }}
                >
                    {desc}
                </p>
            </div>

            {/* Widget – right 40%, slides in on hover */}
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

// ── Section ───────────────────────────────────────────────────────────────────

export function MissionSection() {
    const t = useTranslations("about")

    const features: {
        num: string; title: string; desc: string
        side: "left" | "right"; large?: boolean
        top: string; height: string; delay: number
        widget: React.ReactNode
    }[] = [
        {
            num: "01", side: "right",
            title: t("directContact.title"),
            desc: t("directContact.content"),
            top: "12.96%", height: "18.98%", delay: 0.15,
            widget: <ChatWidget />,
        },
        {
            num: "02", side: "left", large: true,
            title: t("ownToolsStatement"),
            desc: t("ownTools.content"),
            top: "31.94%", height: "26.76%", delay: 0.22,
            widget: <SystemsWidget />,
        },
        {
            num: "03", side: "right",
            title: t("seoOptimization.title"),
            desc: t("seoOptimization.content"),
            top: "58.70%", height: "15.84%", delay: 0.30,
            widget: <SEOWidget />,
        },
        {
            num: "04", side: "left",
            title: t("maintenance.title"),
            desc: t("maintenance.content"),
            top: "74.54%", height: "25.46%", delay: 0.38,
            widget: <SupportWidget />,
        },
    ]

    return (
        <section
            id="about"
            className="relative isolate overflow-hidden bg-background"
            style={{ height: "100vh" }}
        >
            {/* ── Animated blueprint grid ─────────────────────────────── */}
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

            {/* ── Cross-ticks at intersections ────────────────────────── */}
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

            {/* ── Heading ─────────────────────────────────────────────── */}
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
                {t("whatMakesDifferent")}
            </motion.h2>

            {/* ── Feature cards ───────────────────────────────────────── */}
            {features.map((f) => (
                <FeatureCard key={f.num} {...f} />
            ))}
        </section>
    )
}
