import { routing } from "@/i18n/routing"
import { hasLocale } from "next-intl"
import { notFound } from "next/navigation"
import { setRequestLocale } from "next-intl/server"
import { getTranslations } from "next-intl/server"
import { HeroSection } from "@/components/HeroSection/HeroSection"
import { ContactCTA } from "@/components/ContactSection/ContactCTA"
import { MissionRowSection } from "@/components/AboutSection/MissionRowSection"
import ChatWidget from "@/components/AboutSection/ChatWidget"
import SystemsWidget from "@/components/AboutSection/SystemsWidget"
import { SEOWidget } from "@/components/AboutSection/SEOWidget"
import SupportWidget from "@/components/AboutSection/SupportWidget"
import { SceneTransition } from "@/components/ScrollStory/SceneTransition"
import { ScrollProgressBar } from "@/components/ScrollStory/ScrollProgressBar"
import { SceneIndicator } from "@/components/ScrollStory/SceneIndicator"
import { ReactNode } from "react"

const MID_SCENE_PRE_VH = 100

function buildScrollStory(scenes: ReactNode[], isFirst = true): ReactNode {
    if (scenes.length === 1) return scenes[0]
    const [first, ...rest] = scenes
    return (
        <SceneTransition
            from={first}
            to={buildScrollStory(rest, false)}
            preVh={isFirst ? 0 : MID_SCENE_PRE_VH}
        />
    )
}

const Page = async ({ params }: { params: Promise<{ locale: string }> }) => {
    const { locale } = await params

    if (!hasLocale(routing.locales, locale)) {
        notFound()
    }

    setRequestLocale(locale)

    const t = await getTranslations("about")

    const scenes: ReactNode[] = [
        <HeroSection key="hero" />,
        <MissionRowSection
            key="row1"
            num="01"
            title={t("directContact.title")}
            desc={t("directContact.content")}
            widget={<ChatWidget />}
            widgetSide="left"
        />,
        <MissionRowSection
            key="row2"
            num="02"
            title={t("maintenance.title")}
            desc={t("maintenance.content")}
            widget={<SupportWidget />}
            widgetSide="right"
        />,
        <MissionRowSection
            key="row3"
            num="03"
            title={t("seoOptimization.title")}
            desc={t("seoOptimization.content")}
            widget={<SEOWidget />}
            widgetSide="left"
        />,
        <MissionRowSection
            key="row4"
            num="04"
            title={t("ownToolsStatement")}
            desc={t("ownTools.content")}
            widget={<SystemsWidget />}
            widgetSide="right"
        />
    ]

    return (
        <main className="min-h-screen bg-background">
            <ScrollProgressBar transitions={scenes.length - 1} />
            <SceneIndicator scenes={scenes.length} />
            {buildScrollStory(scenes, true)}
            <div data-scene-indicator-hide />
            <ContactCTA key="contact" />
        </main>
    )
}

export default Page
