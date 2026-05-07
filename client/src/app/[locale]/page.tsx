import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { MissionSectionAlt } from "@/components/AboutSection/MissionSectionAlt"
import { ContactCTA } from "@/components/ContactSection/ContactCTA"
import { HeroSection } from "@/components/HeroSection/HeroSection"
import { HeroMissionTransition } from "@/components/ScrollStory/HeroMissionTransition"

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background">
            <HeroMissionTransition
                hero={<HeroSection />}
                mission={<MissionSectionAlt />}
            />
            <ContactCTA />
        </main>
    )
}

export default Page
