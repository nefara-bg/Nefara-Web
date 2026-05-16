"use client"

import React from 'react'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import LngSwitcher from '@/components/Header/components/LngSwitcher/LngSwitcher'
import MobileNav from '@/components/Header/components/MobileNav/MobileNav'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
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

                    <div className="flex flex-row gap-3 md:gap-4 items-center">
                        <Link
                            href="/#contact"
                            className="relative inline-flex items-center rounded-xl h-10 w-40 bg-background border border-border overflow-hidden group"
                        >
                            <div
                                className="absolute left-1 top-1 h-8 w-8 rounded-lg flex items-center justify-center z-10 group-hover:w-[152px] transition-all duration-500"
                                style={{ background: "#00CBBB" }}
                            >
                                <ArrowRight className="w-4 h-4 text-white shrink-0" />
                            </div>
                            <span className="relative z-0 w-full text-center text-sm font-semibold text-foreground group-hover:text-white transition-colors duration-300 pl-3">
                                {t("header.contact")}
                            </span>
                        </Link>
                        <LngSwitcher locale={locale} />
                    </div>
                </div>

                <MobileNav locale={locale} />
            </div>
        </header>
    )
}

export default Header
