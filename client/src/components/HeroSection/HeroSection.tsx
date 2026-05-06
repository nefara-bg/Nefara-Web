import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"
import HeroButtonsFlow from "./HeroButtonsFlow"
import { TitleLines } from "./TitleLines"
import { CONTAINER_STYLE } from "@/config/container"

export async function HeroSection() {
    const t = await getTranslations("hero")

    return (
        <section
            id="home-alt"
            className="relative isolate overflow-hidden bg-background flex flex-col"
            style={{ height: "100vh" }}
        >
            <div className="flex flex-col h-full" style={{ ...CONTAINER_STYLE, margin: "0 auto" }}>
                {/* Spacer: 0 → 32.5vh */}
                <div style={{ flex: "0 0 32.5vh" }} />

                {/* Title zone: 32.5vh → 44.3vh (11.8vh) */}
                <div
                    style={{ flex: "0 0 11.8vh", paddingLeft: "14%", paddingRight: "14.6%" }}
                    className="relative flex border-0 border-primary items-center w-full mx-auto"
                >
                    <TitleLines />
                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.05 }}
                        className="text-center font-manrope font-bold tracking-tight w-full"
                        style={{
                            fontSize: "clamp(1.8rem, min(6.5vw, 8vh), 8rem)",
                            lineHeight: 1,
                        }}
                    >
                        {t("title")} {t("title2")}
                    </motion.h1>
                </div>

                {/* Subtitle zone: 44.3vh → 62.9vh (18.6vh) */}
                <div
                    style={{ flex: "0 0 18.6vh", paddingLeft: "14%", paddingRight: "14.6%" }}
                    className="flex items-center justify-center"
                >
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.15 }}
                        className="w-full text-center text-muted-foreground"
                        style={{
                            fontSize: "clamp(0.8rem, 1.1vw, 1.15rem)",
                            lineHeight: 1.65,
                        }}
                    >
                        {t("content")}
                    </motion.p>
                </div>

                {/* Button zone: 62.9vh → 68.5vh (5.6vh) */}
                <HeroButtonsFlow />
            </div>
        </section>
    )
}
