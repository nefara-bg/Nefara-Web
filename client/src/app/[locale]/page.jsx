import { Box } from "@mui/material"
import About from "../../components/About/About"
import Contact from "../../components/Contact/Contact"
import Hero from "../../components/Hero/Hero"
import Services from "../../components/Services/Services"
import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"

const Page = async ({ params }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale)

    return (
        <Box sx={{ bgcolor: "background.main" }}>
            <Hero />
            <Services />
            <About />
            <Contact />
        </Box>
    )
}

export default Page