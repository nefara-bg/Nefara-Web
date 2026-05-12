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
            <div className="relative flex flex-col h-full mx-auto" style={{ ...CONTAINER_STYLE, margin: "0 auto" }}>
                {/* Cards: rows 1–4 */}
                <div className="relative grid grid-cols-2 flex-1" style={{ gridAutoRows: "minmax(100vh, auto)" }}>

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
                        title={t("maintenance.title")}
                        desc={t("maintenance.content")}
                        side="left"
                        delay={0.38}
                    />
                    <WidgetCell delay={0.38} side="right">
                        <SupportWidget />
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
                        title={t("ownToolsStatement")}
                        desc={t("ownTools.content")}
                        side="left"
                        delay={0.22}
                    />
                    <WidgetCell delay={0.22} side="right">
                        <SystemsWidget />
                    </WidgetCell>
                </div>

            </div>
        </section>
    )
}
