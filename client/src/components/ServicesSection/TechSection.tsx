import { getTranslations } from "next-intl/server"
import { TechStickyScroll } from "./TechStickyScroll"

export default async function TechSection() {
    const t = await getTranslations("services.tech")

    return (
        <section className="relative bg-background">
            <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(174, 100%, 40%), transparent)" }} />
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
                <TechStickyScroll
                    s1Title={t("s1Title")}
                    s1={t("s1")}
                    s2Title={t("s2Title")}
                    s2={t("s2")}
                    s3Title={t("s3Title")}
                    s3={t("s3")}
                />
            </div>
        </section>
    )
}
