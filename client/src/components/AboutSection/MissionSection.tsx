import * as motion from "motion/react-client"
import { Layers, Shield, UserCog, MessageSquare } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"

export async function MissionSection() {
    const t = await getTranslations("about")

    const features = [
        { icon: UserCog, title: t("personalized.title"), description: t("personalized.content") },
        { icon: Layers, title: t("tech.title"), description: t("tech.content") },
        { icon: MessageSquare, title: t("communication.title"), description: t("communication.content") },
        { icon: Shield, title: t("quality.title"), description: t("quality.content") },
    ]

    return (
        <section className="bg-background section-shell">
            <div className="mx-auto max-w-7xl">
                {/* Mission header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 max-w-3xl mx-auto"
                >
                    <span className="eyebrow mb-5 justify-center">{t("tag")}</span>
                    <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mt-4 mb-5 leading-tight">
                        {t("subtitle")}{" "}
                        <span className="text-[hsl(var(--primary-strong))]">{t("subtitle2")}</span>
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {t("paragraph1")}
                    </p>
                </motion.div>

                {/* Features */}
                <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-7 h-full hover:border-[hsl(var(--primary)/0.35)] hover:shadow-[0_20px_48px_-20px_rgba(15,23,42,0.12)] hover:-translate-y-1">
                                    <div className="flex items-start gap-5">
                                        <div className="accent-chip w-12 h-12 shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                                                {feature.title}
                                            </h4>
                                            <p className="text-sm text-muted-foreground leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
