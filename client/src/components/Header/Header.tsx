"use client"

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import LngSwitcher from '@/components/Header/components/LngSwitcher/LngSwitcher'
import MobileNav from '@/components/Header/components/MobileNav/MobileNav'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface HeaderProps {
    locale?: string;
}

const Header: React.FC<HeaderProps> = ({ locale = "en" }) => {
    const t = useTranslations()

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50",
                "bg-background shadow-sm",
                "py-0 px-2 sm:px-6 md:px-8 lg:px-12 xl:px-20"
            )}
        >
            <div className="max-w-7xl w-full mx-auto flex items-center justify-between py-4">
                <div className="flex flex-row items-center gap-2">
                    <Image
                        src="/logo.svg"
                        alt="Our logo"
                        width={32}
                        height={32}
                    />
                    <h5 className="text-2xl font-bold select-none text-primary">Nefara</h5>
                </div>

                <div className="hidden md:flex flex-1 flex-row items-center justify-end gap-8 lg:gap-12">
                    <div className="flex flex-row gap-4 lg:gap-8">
                        <Link href="/#hero">
                            <p className={cn(
                                "text-sm transition-colors duration-200",
                                "hover:text-primary"
                            )}>
                                {t("header.home")}
                            </p>
                        </Link>
                        <Link href="/#services">
                            <p className={cn(
                                "text-sm transition-colors duration-200",
                                "hover:text-primary"
                            )}>
                                {t("header.services")}
                            </p>
                        </Link>
                        <Link href="/#about">
                            <p className={cn(
                                "text-sm transition-colors duration-200",
                                "hover:text-primary"
                            )}>
                                {t("header.about")}
                            </p>
                        </Link>
                        <Link href="/#contact">
                            <p className={cn(
                                "text-sm transition-colors duration-200",
                                "hover:text-primary"
                            )}>
                                {t("header.contact")}
                            </p>
                        </Link>
                    </div>

                    <div className="flex flex-row gap-2 md:gap-4">
                        <LngSwitcher locale={locale} />
                    </div>
                </div>

                <MobileNav locale={locale} />
            </div>
        </header>
    )
}

export default Header
