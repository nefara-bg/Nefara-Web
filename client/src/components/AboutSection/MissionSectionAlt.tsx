import { getTranslations } from "next-intl/server"
import { CONTAINER_WIDTH } from "@/config/container"
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
            <div className="relative flex flex-col h-full mx-auto" style={{ width: CONTAINER_WIDTH }}>
                <div className="absolute w-px h-full bg-primary top-0 left-0 z-10" />
                <div className="absolute w-px h-full bg-primary top-0 right-0 z-10" />
                <div className="absolute w-px h-full bg-primary top-10 left-1/2 z-10" />

                {/* Heading row */}
                <div className="relative grid grid-cols-2 items-end pt-10">
                    <MissionHeadingFlow heading={t("whatMakesDifferent")} />
                    <div className="relative w-full h-full">
                        <div className="absolute w-full h-px bg-primary top-0 left-0 z-10" />
                    </div>
                    <div className="absolute h-px w-[100vw] bg-primary bottom-0 right-0" />
                </div>

                {/* Cards: rows 1–4 */}
                <div className="grid grid-cols-2 flex-1">
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
                    <div className="col-span-2 h-px bg-primary" />
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
                    <div className="col-span-2 h-px bg-primary" />
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
                    <div className="col-span-2 h-px bg-primary" />
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
