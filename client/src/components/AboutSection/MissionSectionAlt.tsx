import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"
import { CONTAINER_STYLE } from "@/config/container"
import MissionHeadingFlow from "./MissionHeadingFlow"
import FeatureCardFlow from "./FeatureCardFlow"
import WidgetCell from "./WidgetCell"
import ChatWidget from "./ChatWidget"
import SystemsWidget from "./SystemsWidget"
import SEOWidget from "./SEOWidget"
import SupportWidget from "./SupportWidget"

export async function MissionSectionAlt() {
    const t = await getTranslations("about")

    return (
        <section
            id="about-alt"
            className="relative isolate overflow-hidden bg-background flex flex-col"
        >
            <div className="relative pt-32 flex flex-col h-full mx-auto" style={{ ...CONTAINER_STYLE, margin: "0 auto" }}>
                {/* Heading row */}
                <div className="relative grid grid-cols-2 items-end pt-16">
                    <div className="pl-6 flex flex-col gap-2 pb-2">
                        <motion.div
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -12 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="h-px w-6" style={{ background: "hsl(var(--primary))" }} />
                            <span className="font-manrope font-bold tracking-wide uppercase text-primary text-xs">
                                {t("whyNefara")}
                            </span>
                        </motion.div>
                        <MissionHeadingFlow heading={t("whatMakesDifferent")} />
                    </div>
                    <div className="relative w-full h-full">
                    </div>
                </div>

                {/* Cards: rows 1–4 */}
                <div className="relative grid grid-cols-2 flex-1">

                    <WidgetCell delay={0.15} side="left">
                        <ChatWidget />
                    </WidgetCell>
                    <FeatureCardFlow
                        num="01"
                        title={t("directContact.title")}
                        desc={t("directContact.content")}
                        side="right"
                        delay={0.15}
                    />
                    <FeatureCardFlow
                        num="02"
                        title={t("ownToolsStatement")}
                        desc={t("ownTools.content")}
                        side="left"
                        delay={0.22}
                    />
                    <WidgetCell delay={0.22} side="right">
                        <SystemsWidget />
                    </WidgetCell>
                    <WidgetCell delay={0.30} side="left">
                        <SEOWidget />
                    </WidgetCell>
                    <FeatureCardFlow
                        num="03"
                        title={t("seoOptimization.title")}
                        desc={t("seoOptimization.content")}
                        side="right"
                        delay={0.30}
                    />
                    <FeatureCardFlow
                        num="04"
                        title={t("maintenance.title")}
                        desc={t("maintenance.content")}
                        side="left"
                        delay={0.38}
                    />
                    <WidgetCell delay={0.38} side="right">
                        <SupportWidget />
                    </WidgetCell>
                </div>

            </div>
        </section>
    )
}
