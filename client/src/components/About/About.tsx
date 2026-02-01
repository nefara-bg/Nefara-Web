import React from 'react'
import AboutCard from '@/components/AboutCard/AboutCard'
import { useTranslations } from 'next-intl'
import FadeInSection from '@/components/FadeInSection/FadeInSection'
import * as motion from 'motion/react-client'
import TextGradient from '@/components/TextGradient/TextGradient'
import SectionTag from '@/components/SectionTag/SectionTag'
import FeatureCard from '@/components/FeatureCard/FeatureCard'
import { Link } from '@/i18n/navigation'
import SectionContainer from '@/components/SectionContainer/SectionContainer'
import { cn } from '@/lib/utils'
import {
    Calendar,
    Clock,
    Star,
    Zap,
    Monitor,
    LifeBuoy,
    Search,
    Target,
    ArrowRight
} from 'lucide-react'

const About: React.FC = () => {
    const t = useTranslations()

    const stats = [
        { number: "3+", label: t("about.experience"), icon: <Calendar className="w-8 h-8" /> },
        { number: "24/7", label: t("about.support"), icon: <Clock className="w-8 h-8" /> },
        { number: "100%", label: t("about.client"), icon: <Star className="w-8 h-8" /> }
    ]

    const features = [
        {
            title: t("about.agile.title"),
            description: t("about.agile.content"),
            icon: <Zap className="w-5 h-5" />
        },
        {
            title: t("about.tech.title"),
            description: t("about.tech.content"),
            icon: <Monitor className="w-5 h-5" />
        },
        {
            title: t("about.featureSupport.title"),
            description: t("about.featureSupport.content"),
            icon: <LifeBuoy className="w-5 h-5" />
        },
        {
            title: t("about.quality.title"),
            description: t("about.quality.content"),
            icon: <Search className="w-5 h-5" />
        }
    ]

    const gridVariants = {
        initial: {},
        animate: {
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.2,
                when: "beforeChildren"
            } as const
        }
    } as const

    return (
        <FadeInSection>
            <section
                id="about"
                className={cn(
                    "py-16 sm:py-20 md:py-24",
                    "px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24",
                    "flex items-center",
                    "bg-gradient-to-br from-background to-secondary"
                )}
            >
                <SectionContainer className="flex flex-col items-center">
                    <div className="mb-16">
                        <div className="max-w-4xl mb-16 text-center">
                            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-foreground">
                                {t("about.title")} <TextGradient>Nefara</TextGradient>
                            </h3>
                            <p className="text-base text-muted-foreground">
                                {t("about.content")}
                            </p>
                        </div>
                        <motion.div
                            className="flex flex-wrap -mx-3"
                            variants={gridVariants}
                            initial="initial"
                            whileInView="animate"
                            viewport={{ once: true }}
                        >
                            {stats.map((stat, i) => (
                                <AboutCard cardContent={stat} key={i} />
                            ))}
                        </motion.div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 w-full">
                        <div className="flex flex-col">
                            <SectionTag
                                content={
                                    <>
                                        <Target className="w-3.5 h-3.5" />
                                        {t("about.tag")}
                                    </>
                                }
                                className="mb-8"
                            />

                            <div className="flex flex-col gap-8">
                                <h4 className="text-2xl sm:text-3xl font-bold">
                                    {t("about.subtitle")}{" "}
                                    <span className="text-muted-foreground">
                                        {t("about.subtitle2")}
                                    </span>
                                </h4>

                                <p className="text-base text-muted-foreground">
                                    {t("about.paragraph1")}
                                </p>
                                <p className="text-base text-muted-foreground">
                                    {t("about.paragraph2")}
                                </p>

                                {/* <Link
                                    href="/about"
                                    className="flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300 w-fit"
                                >
                                    Learn More About Us
                                    <ArrowRight className="w-4 h-4" />
                                </Link> */}
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            {features.map((feature, i) => (
                                <FeatureCard
                                    key={i}
                                    feature={feature}
                                />
                            ))}
                        </div>
                    </div>
                </SectionContainer>
            </section>
        </FadeInSection>
    )
}

export default About
