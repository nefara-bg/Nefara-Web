"use client"

import * as motion from "motion/react-client"
import { useTranslations } from "next-intl"

// SVG spec: 1920×1080
//
// Grid lines:
//   Left vert    x=273.5  → 14.24% from left
//   Right vert   x=1641.5 → 14.51% from right
//   Center vert  x=960    → 50%, starts at y=57 (5.28%)
//   H y=57   (5.28%)  — center → right vert
//   H y=140  (12.96%) — left edge → right vert
//   H y=345  (31.94%) — left vert → right edge
//   H y=634  (58.70%) — left edge → right vert
//   H y=805  (74.54%) — left vert → right edge
//
// Text positions (from SVG path bounding boxes):
//   Heading           left col  y=73–109   center 8.43%
//   Feature01 title   right col y=165–196  center 16.71%
//   Feature01 desc    right col y=226–298  top 20.93%
//   Feature02 LARGE   left col  y=395–471  center 40.09%
//   Feature02 desc    left col  y=508–605  top 47.04%
//   Feature03 title   right col y=665–689  center 62.69%
//   Feature03 desc    right col y=727–772  top 67.31%
//   Feature04 title   left col  y=844–876  center 79.63%
//   Feature04 desc    left col  y=908–1007 top 84.07%

const T = "hsl(var(--primary) / 0.65)"

export function MissionSection() {
    const t = useTranslations("about")

    return (
        <section
            id="about"
            className="relative isolate overflow-hidden bg-background"
            style={{ height: "100vh" }}
        >
            {/* ── Blueprint grid ───────────────────────────────────────── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {/* Left vertical — full height */}
                <div className="absolute w-px"
                    style={{ background: T, left: "14.24%", top: 0, bottom: 0 }} />
                {/* Right vertical — full height */}
                <div className="absolute w-px"
                    style={{ background: T, right: "14.51%", top: 0, bottom: 0 }} />
                {/* Center vertical — y=5.28% → bottom */}
                <div className="absolute w-px"
                    style={{ background: T, left: "50%", top: "5.28%", bottom: 0 }} />
                {/* y=5.28% — right column only */}
                <div className="absolute h-px"
                    style={{ background: T, top: "5.28%", left: "50%", right: "14.51%" }} />
                {/* y=12.96% — left edge → right vert */}
                <div className="absolute h-px"
                    style={{ background: T, top: "12.96%", left: 0, right: "14.51%" }} />
                {/* y=31.94% — left vert → right edge */}
                <div className="absolute h-px"
                    style={{ background: T, top: "31.94%", left: "14.24%", right: "14.51%" }} />
                {/* y=58.70% — left edge → right vert */}
                <div className="absolute h-px"
                    style={{ background: T, top: "58.70%", left: 0, right: "14.51%" }} />
                {/* y=74.54% — left vert → right edge */}
                <div className="absolute h-px"
                    style={{ background: T, top: "74.54%", left: "14.24%", right: "14.51%" }} />
            </div>

            {/* ── Heading — LEFT col, y=73–109, center 8.43% ───────────── */}
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="absolute font-display font-extrabold text-foreground select-none"
                style={{
                    top: "8.43%",
                    transform: "translateY(-50%)",
                    left: "14.24%",
                    right: "50%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(1rem, 3.33vh, 2.2rem)",
                    lineHeight: 1.1,
                }}
            >
                {t("whatMakesDifferent")}
            </motion.h2>

            {/* ── Feature 01 title — RIGHT col, center 16.71% ─────────── */}
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.07 }}
                className="absolute font-display font-bold text-foreground select-none"
                style={{
                    top: "16.71%",
                    transform: "translateY(-50%)",
                    left: "50%",
                    right: "14.51%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.85rem, 2.87vh, 1.9rem)",
                    lineHeight: 1.2,
                }}
            >
                {t("directContact.title")}
            </motion.h3>

            {/* ── Feature 01 desc — RIGHT col, top 20.93% ─────────────── */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="absolute text-muted-foreground"
                style={{
                    top: "20.93%",
                    left: "50%",
                    right: "14.51%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.65rem, 1.3vh, 0.88rem)",
                    lineHeight: 1.65,
                }}
            >
                {t("directContact.content")}
            </motion.p>

            {/* ── Feature 02 LARGE — LEFT col, center 40.09% ───────────── */}
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.14 }}
                className="absolute font-display font-extrabold text-foreground select-none"
                style={{
                    top: "40.09%",
                    transform: "translateY(-50%)",
                    left: "14.24%",
                    right: "50%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(1rem, 3.52vh, 2.5rem)",
                    lineHeight: 1.15,
                }}
            >
                {t("ownToolsStatement")}
            </motion.h3>

            {/* ── Feature 02 desc — LEFT col, top 47.04% ───────────────── */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.17 }}
                className="absolute text-muted-foreground"
                style={{
                    top: "47.04%",
                    left: "14.24%",
                    right: "50%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.65rem, 1.3vh, 0.88rem)",
                    lineHeight: 1.65,
                }}
            >
                {t("ownTools.content")}
            </motion.p>

            {/* ── Feature 03 title — RIGHT col, center 62.69% ─────────── */}
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.21 }}
                className="absolute font-display font-bold text-foreground select-none"
                style={{
                    top: "62.69%",
                    transform: "translateY(-50%)",
                    left: "50%",
                    right: "14.51%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.75rem, 2.22vh, 1.5rem)",
                    lineHeight: 1.2,
                }}
            >
                {t("seoOptimization.title")}
            </motion.h3>

            {/* ── Feature 03 desc — RIGHT col, top 67.31% ─────────────── */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.24 }}
                className="absolute text-muted-foreground"
                style={{
                    top: "67.31%",
                    left: "50%",
                    right: "14.51%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.65rem, 1.3vh, 0.88rem)",
                    lineHeight: 1.65,
                }}
            >
                {t("seoOptimization.content")}
            </motion.p>

            {/* ── Feature 04 title — LEFT col, center 79.63% ───────────── */}
            <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.28 }}
                className="absolute font-display font-bold text-foreground select-none"
                style={{
                    top: "79.63%",
                    transform: "translateY(-50%)",
                    left: "14.24%",
                    right: "50%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.85rem, 2.96vh, 2rem)",
                    lineHeight: 1.2,
                }}
            >
                {t("maintenance.title")}
            </motion.h3>

            {/* ── Feature 04 desc — LEFT col, top 84.07% ───────────────── */}
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.31 }}
                className="absolute text-muted-foreground"
                style={{
                    top: "84.07%",
                    left: "14.24%",
                    right: "50%",
                    paddingLeft: "1.5rem",
                    paddingRight: "1rem",
                    fontSize: "clamp(0.65rem, 1.3vh, 0.88rem)",
                    lineHeight: 1.65,
                }}
            >
                {t("maintenance.content")}
            </motion.p>
        </section>
    )
}
