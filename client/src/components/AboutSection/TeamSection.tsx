import * as motion from "motion/react-client"
import { Linkedin } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"

export async function TeamSection() {
    const t = await getTranslations("about")

    const stats = [
        { value: "3+", label: t("stats.yearsExperience") },
        { value: "24/7", label: t("stats.supportAvailable") },
        { value: "100%", label: t("stats.clientSatisfaction") },
    ]

    const teamMembers = [
        {
            name: t("team.members.dimitarDimkov"),
            role: t("team.roles.prSpecialist"),
            linkedin: "https://www.linkedin.com/in/dimitar-dimkov-20a0233ab/",
        },
        {
            name: t("team.members.dimitarAnastasov"),
            role: t("team.roles.softwareDeveloper"),
            linkedin: "https://www.linkedin.com/in/dimitar-anastasov-339a94310/",
        },
        {
            name: t("team.members.martinVelchev"),
            role: t("team.roles.fullStackDeveloper"),
            linkedin: "https://www.linkedin.com/in/martin-velchev-5917b836b/",
        },
    ]

    return (
        <section id="about" className="bg-[hsl(var(--muted))] section-shell">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
                >
                    <span className="eyebrow mb-5 justify-center">{t("sectionLabel")}</span>
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-5 leading-[1.05] tracking-tight">
                        {t("mainTitle")} <br />
                        <span className="text-[hsl(var(--primary-strong))]">{t("mainTitle2")}</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground">{t("subText")}</p>
                </motion.div>

                {/* Team — staggered */}
                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.12 }}
                            className={index === 1 ? "md:-translate-y-8" : ""}
                        >
                            <Card className="group relative overflow-hidden">
                                <div className="aspect-[3/4] relative flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/0.10)] via-card to-[hsl(var(--secondary)/0.05)]">
                                    <div className="absolute inset-0 grid-pattern opacity-30" />
                                    {member.linkedin && (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border text-muted-foreground hover:text-[hsl(var(--primary-strong))] hover:border-[hsl(var(--primary))] transition-all duration-300 shadow-md group-hover:scale-105"
                                            aria-label={`${member.name} LinkedIn`}
                                        >
                                            <Linkedin className="w-6 h-6" />
                                        </a>
                                    )}
                                </div>
                                <div className="p-5 text-center border-t border-border">
                                    <h3 className="font-display text-lg font-bold text-foreground">{member.name}</h3>
                                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-bold">
                                        {member.role}
                                    </p>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
                    {stats.map((stat) => (
                        <Card
                            key={stat.label}
                            className="p-8 text-center hover:border-[hsl(var(--primary)/0.4)] hover:shadow-[0_20px_48px_-20px_rgba(15,23,42,0.12)] hover:-translate-y-1"
                        >
                            <div className="font-display text-4xl md:text-5xl font-bold text-[hsl(var(--primary-strong))] mb-2">
                                {stat.value}
                            </div>
                            <p className="text-xs md:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}
