"use client"

import * as motion from "motion/react-client"
import { useTranslations } from "next-intl"

// All pixel values are from the 1920×1080 SVG design spec.
// Converted to % of viewport width (vw) and % of viewport height (vh).
//
//   Left vertical   x=267        → 13.9% from left
//   Right vertical  x=1640       → 14.6% from right
//   Upper h-line    y=351.5      → 32.5% from top
//   Lower h-line    y=478        → 44.3% from top
//   Left vertical runs from navbar (y=88 = 8.1%) to lower h-line (44.3%)
//   Right vertical runs from upper h-line (32.5%) to bottom
//   Lower h-line starts at left edge and ends at right vertical
//
//   Button zone:
//     Top line  y=679.5  → 62.9%
//     Bot line  y=739.5  → 68.5%
//     Span      x=407–1557 → left 21.2%, right 18.9%
//     Tall ticks x=431.5 (22.4%) and x=1526.5 (20.5% from right), y 61.1%→70.4%
//     Inner ticks x=647.5 (33.7%), 904.5 (47.1%), 1317.5 (68.6%)
//
//   Buttons:
//     "Get Started"      x=648.5, w=255 → left 33.8%, width 13.3%
//     "View Our Services" x=905.5, w=411 → left 47.2%, width 21.4%

const T = "hsl(var(--primary) / 0.65)" // teal line colour

export function HeroSection() {
    const t = useTranslations("hero")

    const scrollTo = (id: string) => () => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <section
            id="home"
            className="relative isolate overflow-hidden bg-background"
            style={{ height: "100vh" }}
        >
            {/* ── Decorative blueprint grid ───────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

                {/* Left vertical: 13.9%x, 8.1% → 44.3%y */}
                <div className="absolute w-px"
                    style={{ background: T, left: "13.9%", top: "8.1%", height: "36.2%" }} />

                {/* Upper horizontal: 32.5%y, 13.9%x → right edge */}
                <div className="absolute h-px"
                    style={{ background: T, top: "32.5%", left: "13.9%", right: 0 }} />

                {/* Right vertical: 14.6% from right, 32.5%y → bottom */}
                <div className="absolute w-px"
                    style={{ background: T, right: "14.6%", top: "32.5%", bottom: 0 }} />

                {/* Lower horizontal: 44.3%y, left edge → 14.6% from right */}
                <div className="absolute h-px"
                    style={{ background: T, top: "44.3%", left: 0, right: "14.6%" }} />

                {/* Button zone – upper horizontal */}
                <div className="absolute h-px"
                    style={{ background: T, top: "62.9%", left: "21.2%", right: "18.9%" }} />

                {/* Button zone – lower horizontal */}
                <div className="absolute h-px"
                    style={{ background: T, top: "68.5%", left: "21.2%", right: "18.9%" }} />

                {/* Tall left bracket tick */}
                <div className="absolute w-px"
                    style={{ background: T, left: "22.4%", top: "61.1%", height: "9.3%" }} />

                {/* Tall right bracket tick */}
                <div className="absolute w-px"
                    style={{ background: T, right: "20.5%", top: "61.1%", height: "9.3%" }} />

                {/* Inner tick – left edge of "Get Started" */}
                <div className="absolute w-px"
                    style={{ background: T, left: "33.7%", top: "62.9%", height: "5.6%" }} />

                {/* Inner tick – between the two buttons */}
                <div className="absolute w-px"
                    style={{ background: T, left: "47.1%", top: "62.9%", height: "5.6%" }} />

                {/* Inner tick – right edge of "View Our Services" */}
                <div className="absolute w-px"
                    style={{ background: T, left: "68.6%", top: "62.9%", height: "5.6%" }} />
            </div>

            {/* ── Title ── fills y 32.5 → 44.3 ───────────────────────── */}
            <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="absolute w-full text-center font-display font-extrabold tracking-tight text-foreground select-none"
                style={{
                    top: "38.4%",
                    transform: "translateY(-50%)",
                    // min(7vw, 8vh) keeps the text inside the 11.8vh-tall box at any viewport
                    fontSize: "clamp(1.8rem, min(6.5vw, 8vh), 8rem)",
                    lineHeight: 1,
                    paddingLeft: "14%",
                    paddingRight: "14.6%",
                }}
            >
                {t("title")} {t("title2")}
            </motion.h1>

            {/* ── Subtitle ── fills y 44.3 → 62.9 ────────────────────── */}
            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="absolute text-center text-muted-foreground"
                style={{
                    top: "53.6%",
                    transform: "translateY(-50%)",
                    left: "14%",
                    right: "14.6%",
                    fontSize: "clamp(0.8rem, 1.1vw, 1.15rem)",
                    lineHeight: 1.65,
                }}
            >
                {t("content")}
            </motion.p>

            {/* ── Buttons ── y 62.9 → 68.5, x 33.7 → 68.6 ────────────── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="absolute flex"
                style={{
                    top: "62.9%",
                    left: "33.7%",
                    right: "31.4%",   // 100 - 68.6
                    height: "5.6%",
                }}
            >
                {/* "Contact Us" – 255 / 668 ≈ 38.2% of combined width */}
                <button
                    onClick={scrollTo("#contact")}
                    className="flex-none flex items-center justify-center font-display font-bold text-foreground bg-transparent hover:bg-[hsl(var(--primary)/0.06)] active:scale-[0.98] transition-colors cursor-pointer"
                    style={{
                        width: "38.2%",
                        border: `1px solid ${T}`,
                        fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                    }}
                >
                    {t("button")}
                </button>

                {/* "View Our Services" – 411 / 668 ≈ 61.5% */}
                <button
                    onClick={scrollTo("#services")}
                    className="flex-1 flex items-center justify-center font-display font-bold text-foreground bg-transparent hover:bg-[hsl(var(--primary)/0.06)] active:scale-[0.98] transition-colors cursor-pointer"
                    style={{
                        border: `1px solid ${T}`,
                        borderLeft: "none",
                        fontSize: "clamp(0.7rem, 0.9vw, 0.95rem)",
                    }}
                >
                    {t("secondaryButton")}
                </button>
            </motion.div>
        </section>
    )
}
