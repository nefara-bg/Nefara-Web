import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { HeroSection } from "@/components/HeroSection/HeroSection"
import { MissionSection } from "@/components/AboutSection/MissionSection"
import { ContactCTA } from "@/components/ContactSection/ContactCTA"

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <MissionSection />
            <ContactCTA />
        </main>
    )
}

export default Page
