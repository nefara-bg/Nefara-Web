import React from 'react'
import { Link } from '@/i18n/navigation'
import FadeInSection from '@/components/FadeInSection/FadeInSection'
import SectionTag from '@/components/SectionTag/SectionTag'
import TextGradient from '@/components/TextGradient/TextGradient'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Stars } from 'lucide-react'

const Hero: React.FC = () => {
    const t = useTranslations()

    return (
        <FadeInSection>
            <section
                id="hero"
                className={cn(
                    "py-16 sm:py-20 md:py-24 lg:py-28",
                    "px-4 sm:px-12 md:px-16 lg:px-20 xl:px-24",
                    "flex items-center justify-center",
                    "bg-gradient-to-br from-background via-secondary to-muted",
                    "min-h-[min(100vh,60rem)]",
                    "pt-16 sm:pt-20 md:pt-24 lg:pt-28"
                )}
            >
                <div className="flex flex-col items-center text-center max-w-4xl">
                    <SectionTag
                        className="mb-12"
                        content={
                            <>
                                <Stars className="w-3.5 h-3.5 text-primary" />
                                {t("hero.tag")}
                            </>
                        }
                    />

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 text-foreground">
                        {t("hero.title")}
                        <TextGradient className="block">
                            {t("hero.title2")}
                        </TextGradient>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl mb-12 text-muted-foreground">
                        {t("hero.content")}
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
                        <Link href="/#contact">
                            <Button size="lg" className="w-full md:w-auto">
                                {t("hero.button")}
                            </Button>
                        </Link>
                        <Link href="/#services">
                            <Button size="lg" variant="outline" className="w-full md:w-auto">
                                {t("hero.secondaryButton")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </FadeInSection>
    )
}

export default Hero
