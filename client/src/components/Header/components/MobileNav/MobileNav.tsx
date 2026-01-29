"use client"

import React, { useState } from 'react'
import { Menu } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import LngSwitcher from '@/components/Header/components/LngSwitcher/LngSwitcher'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

interface MobileNavProps {
    locale?: string;
}

const MobileNav: React.FC<MobileNavProps> = ({ locale = "en" }) => {
    const [mobileMenu, setMobileMenu] = useState(false)
    const t = useTranslations()

    return (
        <>
            <div className="flex flex-1 justify-end items-end md:hidden">
                <Menu
                    onClick={() => setMobileMenu(true)}
                    className="cursor-pointer text-foreground"
                />
            </div>

            <Sheet open={mobileMenu} onOpenChange={setMobileMenu}>
                <SheetContent side="right">
                    <div className="h-full py-8 px-4 flex flex-col">
                        <Image
                            src="/logo.svg"
                            alt="Our logo"
                            width={48}
                            height={48}
                            className="mb-12"
                        />

                        <div className="flex flex-col gap-4 mb-6">
                            <Link href="/#hero" onClick={() => setMobileMenu(false)}>
                                <p className={cn(
                                    "text-sm transition-colors duration-200",
                                    "hover:text-primary"
                                )}>
                                    {t("header.home")}
                                </p>
                            </Link>
                            <Link href="/#services" onClick={() => setMobileMenu(false)}>
                                <p className={cn(
                                    "text-sm transition-colors duration-200",
                                    "hover:text-primary"
                                )}>
                                    {t("header.services")}
                                </p>
                            </Link>
                            <Link href="/#about" onClick={() => setMobileMenu(false)}>
                                <p className={cn(
                                    "text-sm transition-colors duration-200",
                                    "hover:text-primary"
                                )}>
                                    {t("header.about")}
                                </p>
                            </Link>
                            <Link href="/#contact" onClick={() => setMobileMenu(false)}>
                                <p className={cn(
                                    "text-sm transition-colors duration-200",
                                    "hover:text-primary"
                                )}>
                                    {t("header.contact")}
                                </p>
                            </Link>
                        </div>

                        <LngSwitcher locale={locale} />
                    </div>
                </SheetContent>
            </Sheet>
        </>
    )
}

export default MobileNav
