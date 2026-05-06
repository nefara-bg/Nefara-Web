import { getTranslations } from "next-intl/server"
import MissionLines from "./MissionLines"
import MissionFeatures, { type FeatureData } from "./MissionFeatures"

export async function MissionSection() {
    const t = await getTranslations("about")

    const features: FeatureData[] = [
        {
            num: "01", side: "right",
            title: t("directContact.title"),
            desc: t("directContact.content"),
            top: "12.96%", height: "18.98%", delay: 0.15,
        },
        {
            num: "02", side: "left", large: true,
            title: t("ownToolsStatement"),
            desc: t("ownTools.content"),
            top: "31.94%", height: "26.76%", delay: 0.22,
        },
        {
            num: "03", side: "right",
            title: t("seoOptimization.title"),
            desc: t("seoOptimization.content"),
            top: "58.70%", height: "15.84%", delay: 0.30,
        },
        {
            num: "04", side: "left",
            title: t("maintenance.title"),
            desc: t("maintenance.content"),
            top: "74.54%", height: "25.46%", delay: 0.38,
        },
    ]

    return (
        <section
            id="about"
            className="relative isolate overflow-hidden bg-background"
            style={{ height: "100vh" }}
        >
            <MissionLines />
            <MissionFeatures heading={t("whatMakesDifferent")} features={features} />
        </section>
    )
}
