import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

export async function ContactCTA() {
    const t = await getTranslations("contact")

    return (
        <section className="dark-section relative overflow-hidden py-28 md:py-40 px-6 text-center">
            {/* Centered teal radial glow */}
            <div
                className="absolute inset-0 -z-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse 700px 400px at 50% 50%, hsl(var(--primary) / 0.09) 0%, transparent 68%)",
                }}
            />

            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] font-bold text-white leading-tight mb-4">
                    {t("cta.title")}
                </h2>
                <p className="text-white/40 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                    {t("cta.subtitle")}
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                    <Link href="/contact">
                        <Button size="lg">{t("cta.button")}</Button>
                    </Link>
                    <Link href="/team">
                        <Button size="lg" variant="ghostLight">{t("cta.secondaryButton")}</Button>
                    </Link>
                </div>
            </div>
        </section>
    )
}
