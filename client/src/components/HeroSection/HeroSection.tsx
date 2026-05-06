import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"
import HeroButtons from "./HeroButtons"
import HeroLines from "./HeroLines"

export async function HeroSection() {
    const t = await getTranslations("hero")

    return (
        <section
            id="home"
            className="relative isolate overflow-hidden bg-background"
            style={{ height: "100vh" }}
        >
            <HeroLines />

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
            <HeroButtons />
        </section>
    )
}
