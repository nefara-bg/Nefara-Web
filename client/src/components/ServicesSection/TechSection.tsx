import { getTranslations } from "next-intl/server"
import { TechStickyScroll } from "./TechStickyScroll"

export default async function TechSection() {
    const t = await getTranslations("services.tech")

    return (
        <section className="relative bg-background">
            <TechStickyScroll
                s1Title={t("s1Title")}
                s1={t("s1")}
                s2Title={t("s2Title")}
                s2={t("s2")}
                s3Title={t("s3Title")}
                s3={t("s3")}
            />
        </section>
    )
}
