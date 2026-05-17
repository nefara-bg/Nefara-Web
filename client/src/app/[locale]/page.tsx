import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { HeroSection } from "@/components/HeroSection/HeroSection"
import { ContactCTA } from "@/components/ContactSection/ContactCTA"
import { ProductsPreview } from "@/components/HomeSection/ProductsPreview"
import { MissionRowSection } from "@/components/AboutSection/MissionRowSection"
import ChatWidget from "@/components/AboutSection/ChatWidget"
import SystemsWidget from "@/components/AboutSection/SystemsWidget"
import { SEOWidget } from "@/components/AboutSection/SEOWidget"
import SupportWidget from "@/components/AboutSection/SupportWidget"

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    const t = await getTranslations("about")

    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <MissionRowSection
                num="01"
                title={t("directContact.title")}
                desc={t("directContact.content")}
                widget={<ChatWidget />}
                widgetSide="left"
            />
            <MissionRowSection
                num="02"
                title={t("maintenance.title")}
                desc={t("maintenance.content")}
                widget={<SupportWidget />}
                widgetSide="right"
            />
            <MissionRowSection
                num="03"
                title={t("seoOptimization.title")}
                desc={t("seoOptimization.content")}
                widget={<SEOWidget />}
                widgetSide="left"
            />
            <MissionRowSection
                num="04"
                title={t("ownToolsStatement")}
                desc={t("ownTools.content")}
                widget={<SystemsWidget />}
                widgetSide="right"
            />
            <ProductsPreview />
            <ContactCTA />
        </main>
    )
}

export default Page
