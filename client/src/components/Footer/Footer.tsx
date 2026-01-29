import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import SectionContainer from '@/components/SectionContainer/SectionContainer'
import Image from 'next/image'
import { parseBgPhone } from '@/utils/phone/phone'
import { encodeEmailForMailto, encodePhoneForTel } from '@/utils/url/url'
import { validateContactEmail, validateContactPhone } from '@/utils/env/env'
import { Mail, Phone, ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const Footer: React.FC = () => {
    const t = useTranslations()

    const links = [
        {
            title: t("footer.services.web"),
            link: `/#services`
        },
        {
            title: t("footer.services.desktop"),
            link: `/#services`
        },
        {
            title: t("footer.services.mobile"),
            link: `/#services`
        },
        {
            title: t("footer.services.consulting"),
            link: `/#contact`
        }
    ]

    const email = validateContactEmail(process.env.NEXT_PUBLIC_CONTACT_EMAIL)
    const phone = validateContactPhone(process.env.NEXT_PUBLIC_CONTACT_PHONE)
    const phoneLabel = phone ? parseBgPhone(phone) : ''

    return (
        <footer
            className={cn(
                "bg-gradient-to-br from-primary via-gray-700 to-gray-900",
                "relative z-10",
                "py-12 sm:py-16 md:py-20",
                "px-4 sm:px-6 md:px-24",
                "flex flex-col gap-6 md:gap-8"
            )}
        >
            <SectionContainer>
                <div className="flex flex-col">
                    <div className="grid grid-cols-1 lg:grid-cols-12 mb-8 gap-12 lg:gap-24">
                        <div className="lg:col-span-6 flex flex-col gap-6">
                            <div className="flex flex-row gap-4 items-center">
                                <Image
                                    src="/footer-logo.svg"
                                    alt="Our logo"
                                    width={56}
                                    height={56}
                                    style={{
                                        width: "3.2rem"
                                    }}
                                />
                                <h5 className="text-2xl font-bold text-background">Nefara</h5>
                            </div>

                            <p className="text-sm text-gray-300">{t("footer.text")}</p>
                        </div>

                        <div className="lg:col-span-3">
                            <p className="text-base font-bold text-background mb-6">
                                {t("footer.services.title")}
                            </p>

                            <div className="flex flex-col gap-2">
                                {links.map((link, i) => (
                                    <Link key={i} href={link.link}>
                                        <p className={cn(
                                            "text-sm text-gray-400",
                                            "transition-colors duration-200",
                                            "hover:text-gray-100",
                                            "whitespace-nowrap"
                                        )}>
                                            {link.title}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <p className="text-base font-bold text-background mb-6">
                                {t("footer.contact.title")}
                            </p>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-row gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/10 backdrop-blur-sm transition-colors group-hover:bg-background/20">
                                        <Mail className="w-5 h-5 text-background" />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-background">
                                            {t("footer.contact.email")}
                                        </p>
                                        <a
                                            href={`mailto:${encodeEmailForMailto(email)}`}
                                            className={cn(
                                                "text-sm text-gray-400",
                                                "transition-colors duration-200",
                                                "hover:text-gray-100",
                                                "whitespace-nowrap"
                                            )}
                                        >
                                            {email}
                                        </a>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background/10 backdrop-blur-sm transition-colors group-hover:bg-background/20">
                                        <Phone className="w-5 h-5 text-background" />
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-sm font-bold text-background">
                                            {t("footer.contact.phone")}
                                        </p>
                                        <a
                                            href={`tel:${encodePhoneForTel(phone)}`}
                                            className={cn(
                                                "text-sm text-gray-400",
                                                "transition-colors duration-200",
                                                "hover:text-gray-100",
                                                "whitespace-nowrap"
                                            )}
                                        >
                                            {phoneLabel}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-px bg-gray-500" />

                    <div className="mt-8 flex flex-col sm:flex-row gap-2 justify-between">
                        <p className="text-sm text-gray-500">
                            &copy; {new Date().getFullYear()} {t("footer.copyright")}
                        </p>
                        <Link href="/#hero">
                            <p className={cn(
                                "text-sm text-gray-400 group flex items-center gap-1.5",
                                "transition-colors duration-200",
                                "hover:text-gray-100",
                                "whitespace-nowrap"
                            )}>
                                {t("footer.back")}
                                <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
                            </p>
                        </Link>
                    </div>
                </div>
            </SectionContainer>
        </footer>
    )
}

export default Footer
