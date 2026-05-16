import { getTranslations } from "next-intl/server"
import { HeroText } from "./HeroText"
import HeroButtonsFlow from "./HeroButtonsFlow"
import ScrollCta from "./ScrollCta"

export async function HeroSection() {
    const t = await getTranslations("hero")

    return (
        <section id="home-alt" className="relative px-4 pt-[72px] pb-0 bg-background">
            <div
                className="relative isolate overflow-hidden flex flex-col items-center justify-center rounded-2xl"
                style={{
                    background: "#00CBBB",
                    minHeight: "calc(100vh - 72px)",
                }}
            >
                {/* Dot grid texture */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 -z-10"
                    style={{
                        backgroundImage: "radial-gradient(rgba(255,255,255,0.13) 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                    }}
                />

                {/* Bottom-center radial glow */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[380px]"
                    style={{
                        background: "radial-gradient(ellipse at bottom, rgba(255,255,255,0.18) 0%, transparent 68%)",
                    }}
                />

                <div className="max-w-4xl flex flex-col items-center gap-7 mx-auto px-6 text-center py-32">
                    <HeroText title={`${t("title")} ${t("title2")}`} content={t("content")} />
                    <HeroButtonsFlow />
                </div>

                <ScrollCta label={t("scrollCta")} />
            </div>
        </section>
    )
}
