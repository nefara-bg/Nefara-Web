import { Timeline } from "@/components/ui/timeline"
import { getTranslations } from "next-intl/server"

export default async function HowWeWork() {
    const t = await getTranslations("services.howWeWork")

    const data = [
        {
            title: t("step1.title"),
            content: (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("step1.content")}
                </p>
            ),
        },
        {
            title: t("step2.title"),
            content: (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("step2.content")}
                </p>
            ),
        },
        {
            title: t("step3.title"),
            content: (
                <p className="text-sm text-muted-foreground leading-relaxed">
                    {t("step3.content")}
                </p>
            ),
        },
    ]

    return (
        <section className="bg-background">
            <div className="mx-auto max-w-7xl px-6 lg:px-10 py-24 lg:py-32">
                <div className="grid lg:grid-cols-[5fr_7fr] gap-16 xl:gap-28 items-start">

                    {/* Left - sticky panel */}
                    <div className="lg:sticky lg:top-28">
                        <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground leading-[1.05] tracking-tight mb-5">
                            {t("heading")}
                        </h2>
                        <p className="text-base text-muted-foreground leading-relaxed max-w-sm">
                            {t("subtitle")}
                        </p>
                    </div>

                    {/* Right - timeline */}
                    <Timeline data={data} />
                </div>
            </div>
        </section>
    )
}
