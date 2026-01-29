import About from "../../components/About/About"
import Contact from "../../components/Contact/Contact"
import Hero from "../../components/Hero/Hero"
import Services from "../../components/Services/Services"
import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    return (
        <div className="bg-background">
            <Hero />
            <Services />
            <About />
            <Contact />
        </div>
    )
}

export default Page
