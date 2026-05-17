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
                    minHeight: "calc(100vh - 72px)",
                    background: [
                        "radial-gradient(ellipse 80% 60% at 10% 0%,   rgba(255,255,255,0.22) 0%, transparent 70%)",
                        "radial-gradient(ellipse 50% 50% at 90% 100%, rgba(0,140,130,0.55)   0%, transparent 65%)",
                        "radial-gradient(ellipse 60% 40% at 50% 110%, rgba(255,255,255,0.18) 0%, transparent 60%)",
                        "#00CBBB",
                    ].join(", "),
                }}
            >
                {/* Noise grain overlay — adds tactility without a grid */}
                <svg aria-hidden className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.035]">
                    <filter id="noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#noise)" />
                </svg>

                {/* Content */}
                <div className="relative z-10 max-w-4xl flex flex-col items-center gap-7 mx-auto px-6 text-center py-32">
                    <HeroText title={`${t("title")} ${t("title2")}`} content={t("content")} />
                    <HeroButtonsFlow />
                </div>

                <ScrollCta label={t("scrollCta")} />
            </div>
        </section>
    )
}
