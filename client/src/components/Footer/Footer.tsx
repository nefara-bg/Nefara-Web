"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Instagram, Facebook, Linkedin } from "lucide-react"
import { SOCIAL_MEDIA_URLS } from "@/config/socialMedia"

const Footer = () => {
    const t = useTranslations("footer")
    const tHeader = useTranslations("header")
    const currentYear = new Date().getFullYear()

    const navLinks = [
        { name: tHeader("home"), href: "/#home" },
        { name: tHeader("services"), href: "/#services" },
        { name: tHeader("about"), href: "/#about" },
        { name: tHeader("contact"), href: "/#contact" },
    ]

    const serviceLinks = [
        { name: t("services.web"), href: "/#services" },
        { name: t("services.desktop"), href: "/#services" },
        { name: t("services.mobile"), href: "/#services" },
        { name: t("services.consulting"), href: "/#contact" },
    ]

    const socials = [
        { href: SOCIAL_MEDIA_URLS.instagram, icon: Instagram, label: "Instagram" },
        { href: SOCIAL_MEDIA_URLS.facebook, icon: Facebook, label: "Facebook" },
        { href: SOCIAL_MEDIA_URLS.linkedin, icon: Linkedin, label: "LinkedIn" },
    ]

    return (
        <footer className="dark-section pt-20 pb-10 px-4 sm:px-8 lg:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
                    {/* Brand */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-2 mb-5">
                            <Image
                                src="/logo.svg"
                                alt="Nefara"
                                width={28}
                                height={28}
                                className="brightness-0 invert opacity-90"
                            />
                            <span className="font-display text-xl font-bold text-white tracking-tight">Nefara</span>
                        </div>
                        <p className="text-sm text-white/50 leading-relaxed max-w-sm">{t("text")}</p>

                        {/* Socials */}
                        <div className="flex items-center gap-2 mt-6">
                            {socials.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex items-center justify-center w-10 h-10 rounded-md border border-white/15 text-white/60 hover:text-[hsl(var(--primary))] hover:border-[hsl(var(--primary))] transition-all"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Nav */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 mb-4">
                            {tHeader("services")}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-[hsl(var(--primary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 mb-4">
                            {t("services.title")}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            {serviceLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 hover:text-[hsl(var(--primary))] transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/40 mb-4">
                            {t("contact.title")}
                        </h4>
                        <ul className="flex flex-col gap-2.5">
                            <li className="text-sm text-white/60">
                                <span className="block text-[10px] uppercase tracking-[0.14em] text-white/30">
                                    {t("contact.email")}
                                </span>
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                                    className="hover:text-[hsl(var(--primary))] transition-colors break-all"
                                >
                                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                                </a>
                            </li>
                            <li className="text-sm text-white/60">
                                <span className="block text-[10px] uppercase tracking-[0.14em] text-white/30">
                                    {t("contact.phone")}
                                </span>
                                <a
                                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                                    className="hover:text-[hsl(var(--primary))] transition-colors"
                                >
                                    {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-14 pt-6 border-t border-white/8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-white/30">
                    <p>© {currentYear} {t("copyright")}</p>
                    <a href="#home" className="hover:text-[hsl(var(--primary))] transition-colors">
                        {t("back")}
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
