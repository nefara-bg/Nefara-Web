import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { HeroSection } from "@/components/HeroSection/HeroSection"
import { ServicesSection } from "@/components/ServicesSection/ServicesSection"
import { DreamTeam } from "@/components/DreamTeam/DreamTeam"
import { ContactSection } from "@/components/ContactSection/ContactSection"

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <main className="min-h-screen bg-background">
            <HeroSection />
            <ServicesSection />
            <DreamTeam />
            <ContactSection />
        </main>
    )
}

export default Page
