import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"
import HeroButtonsFlow from "./HeroButtonsFlow"
import ScrollCta from "./ScrollCta"

export async function HeroSection() {
    const t = await getTranslations("hero")

    return (
        <section
            id="home-alt"
            className="relative isolate overflow-hidden flex flex-col items-center justify-center py-32 min-h-screen bg-background"
        >
            {/* Radial gradient — top right */}
            <div
                aria-hidden
                className="pointer-events-none absolute -z-10 top-0 right-0 w-[600px] h-[500px] rounded-full opacity-20 blur-3xl"
                style={{ background: "radial-gradient(ellipse at top right, var(--color-primary), transparent 70%)" }}
            />

            {/* Radial gradient — bottom left */}
            <div
                aria-hidden
                className="pointer-events-none absolute -z-10 bottom-0 left-0 w-[600px] h-[500px] rounded-full opacity-15 blur-3xl"
                style={{ background: "radial-gradient(ellipse at bottom left, var(--color-primary), transparent 70%)" }}
            />

            {/* Subtle technical grid */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10 opacity-[0.028]"
                style={{
                    backgroundImage:
                        "linear-gradient(var(--color-foreground) 1px, transparent 1px), " +
                        "linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
                    backgroundSize: "52px 52px",
                }}
            />


            <div className="max-w-3xl flex flex-col items-center gap-6 mx-auto px-6">

                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="text-center font-manrope font-bold tracking-tight text-6xl leading-none"
                >
                    {t("title")} {t("title2")}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                    className="text-center text-muted-foreground text-lg leading-relaxed max-w-2xl"
                >
                    {t("content")}
                </motion.p>

                <HeroButtonsFlow />
            </div>

            <ScrollCta label={t("scrollCta")} />
        </section>
    )
}
