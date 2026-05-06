import { getTranslations } from "next-intl/server"
import { Card } from "@/components/ui/card"
import TeamHeading from "./TeamHeading"
import TeamMemberCard from "./TeamMemberCard"

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
                <TeamHeading
                    sectionLabel={t("sectionLabel")}
                    mainTitle={t("mainTitle")}
                    mainTitle2={t("mainTitle2")}
                    subText={t("subText")}
                />

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-20 md:mb-28 max-w-5xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <TeamMemberCard key={member.name} {...member} index={index} />
                    ))}
                </div>

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
