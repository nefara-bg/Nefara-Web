import React from 'react'
import ServiceCard from '@/components/ServiceCard/ServiceCard'
import FadeInSection from '@/components/FadeInSection/FadeInSection'
import SectionTag from '@/components/SectionTag/SectionTag'
import TextGradient from '@/components/TextGradient/TextGradient'
import { Link } from '@/i18n/navigation'
import SectionContainer from '@/components/SectionContainer/SectionContainer'
import { useTranslations } from 'next-intl'
import * as motion from 'motion/react-client'
import { Twemoji } from 'react-emoji-render'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const Services: React.FC = () => {
    const t = useTranslations()

    const services = [
        {
            title: t("services.web.title"),
            text: t("services.web.content.text"),
            content: [
                t("services.web.content.content1"),
                t("services.web.content.content2"),
                t("services.web.content.content3")
            ],
            icon: "🌐",
            image: "/webDev.webp",
            colors: ["#2b7fff", "#ad46ff"] as [string, string]
        },
        {
            title: t("services.desktop.title"),
            text: t("services.desktop.content.text"),
            content: [
                t("services.desktop.content.content1"),
                t("services.desktop.content.content2"),
                t("services.desktop.content.content3"),
            ],
            icon: "💻",
            image: "/desktopDev.webp",
            colors: ["#00c950", "#00bba7"] as [string, string]
        },
        {
            title: t("services.mobile.title"),
            text: t("services.mobile.content.text"),
            content: [
                t("services.mobile.content.content1"),
                t("services.mobile.content.content2"),
                t("services.mobile.content.content3"),
            ],
            icon: "📱",
            image: "/mobileDev.webp",
            colors: ["#ff6900", "#fb2c36"] as [string, string]
        }
    ]

    const gridVariants = {
        initial: { opacity: 0 },
        animate: {
            opacity: 1,
            transition: {
                duration: 0,
                when: "beforeChildren",
                staggerChildren: 0.2
            } as const
        }
    } as const

    return (
        <FadeInSection>
            <section
                id="services"
                className={cn(
                    "py-16 sm:py-20 md:py-24",
                    "px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24",
                    "flex items-center"
                )}
            >
                <SectionContainer className="flex flex-col items-center">
                    <SectionTag className="mb-8" content={`🚀 ${t("services.tag")}`} />

                    <div className="max-w-4xl">
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6">
                            <TextGradient>
                                {t("services.title")}
                            </TextGradient>
                        </h3>

                        <p className="text-center mb-12 text-base text-muted-foreground">
                            {t("services.content")}
                        </p>
                    </div>

                    <motion.div
                        className="flex flex-wrap -mx-4 mb-16"
                        variants={gridVariants}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        {services.map((service, i) => (
                            <ServiceCard serviceObject={service} key={i} />
                        ))}
                    </motion.div>

                    <div className="flex flex-col gap-6 items-center text-center">
                        <p className="text-sm text-muted-foreground">
                            {t("services.subtext")}
                        </p>

                        <Link href="/#contact">
                            <Button size="lg">
                                <Twemoji svg text={`${t("services.button")} 💬`} />
                            </Button>
                        </Link>
                    </div>
                </SectionContainer>
            </section>
        </FadeInSection>
    )
}

export default Services
