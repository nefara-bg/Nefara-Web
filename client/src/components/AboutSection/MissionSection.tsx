import * as motion from "motion/react-client"
import { getTranslations } from "next-intl/server"

export async function MissionSection() {
    const t = await getTranslations("about")

    const features = [
        { num: "01", title: t("directContact.title"), description: t("directContact.content") },
        { num: "02", title: t("ownTools.title"), description: t("ownTools.content") },
        { num: "03", title: t("seoOptimization.title"), description: t("seoOptimization.content") },
        { num: "04", title: t("maintenance.title"), description: t("maintenance.content") },
    ]

    return (
        <section className="bg-background section-shell">
            <div className="mx-auto max-w-7xl">
                {/* Mission header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 max-w-3xl"
                >
                    <span className="eyebrow mb-5">{t("tag")}</span>
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-5 leading-tight">
                        {t("subtitle")}{" "}
                        <span className="text-[hsl(var(--primary-strong))]">{t("subtitle2")}</span>
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {t("paragraph1")}
                    </p>
                </motion.div>

                {/* Features grid */}
                <div className="border border-border rounded-md overflow-hidden grid md:grid-cols-2 divide-y divide-border md:[&>*:nth-child(odd)]:border-r md:[&>*:nth-child(odd)]:border-border bg-card">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.num}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                            className="p-8 md:p-10 hover:bg-primary/8 transition-colors"
                        >
                            <span className="block text-xs font-bold tracking-[0.12em] text-[hsl(var(--primary-strong))] mb-4">
                                {feature.num}
                            </span>
                            <h4 className="font-display text-lg md:text-xl font-bold text-foreground mb-3 leading-snug">
                                {feature.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
