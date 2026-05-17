"use client"

import React from "react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react"
import { SOCIAL_MEDIA_URLS } from "@/config/socialMedia"
import { Button } from "@/components/ui/button"

const Footer = () => {
    const t = useTranslations("footer")
    const tHeader = useTranslations("header")
    const tContact = useTranslations("contact")
    const currentYear = new Date().getFullYear()

    const navLinks = [
        { name: tHeader("home"), href: "/" },
        { name: tHeader("services"), href: "/services" },
        { name: tHeader("about"), href: "/about" },
        { name: tHeader("team"), href: "/team" },
        { name: tHeader("contact"), href: "/contact" },
    ]

    const serviceLinks = [
        { name: t("services.web"), href: "/services" },
        { name: t("services.desktop"), href: "/services" },
        { name: t("services.mobile"), href: "/services" },
        { name: t("services.consulting"), href: "/#contact" },
    ]

    const socials = [
        { href: SOCIAL_MEDIA_URLS.instagram, icon: Instagram, label: "Instagram" },
        { href: SOCIAL_MEDIA_URLS.facebook, icon: Facebook, label: "Facebook" },
        { href: SOCIAL_MEDIA_URLS.linkedin, icon: Linkedin, label: "LinkedIn" },
    ]

    return (
        <footer className="border-t-2 border-primary dark-section relative overflow-hidden">
            {/* Teal hairline + soft glow - blueprint accent */}
            {/* <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.55)] to-transparent" /> */}
            {/* <div className="pointer-events-none absolute -top-28 left-1/2 h-56 w-[44rem] -translate-x-1/2 rounded-full bg-[hsl(var(--primary)/0.12)] blur-3xl" /> */}

            <div className="relative mx-auto max-w-7xl px-6 sm:px-10 lg:px-16 pb-10">
                {/* CTA row
                <div className="max-w-2xl mx-auto flex flex-col items-center py-18 text-center">
                    <span className="text-primary font-manrope font-bold">{t("cta.eyebrow")}</span>
                    <h2 className="mt-1 mb-3 font-manrope text-4xl font-bold tracking-tight text-white md:text-5xl">
                        {t("cta.heading")}
                    </h2>
                    <p className="text-sm mb-6 text-white/55">
                        {t("text")}
                    </p>
                </div> */}

                {/* Main grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 pt-14 md:grid-cols-4 md:gap-10">
                    {/* Brand */}
                    <div data-footer-item className="sm:col-span-2">
                        <div className="relative mb-3 w-48 aspect-100/26">
                            <Image
                                src="/logo.svg"
                                alt="Nefara"
                                fill
                                sizes="28px"
                                className="object-contain"
                            />
                        </div>
                        <p className="mb-6 max-w-sm text-sm leading-relaxed text-white/55">
                            {t("text")}
                        </p>
                        <div className="flex items-center gap-2.5">
                            {socials.map(({ href, icon: Icon, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/60 transition-all hover:-translate-y-0.5 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                            <Button asChild variant={"outline"} className="flex items-center justify-center rounded-md border border-white/15 text-white/60 transition-all hover:-translate-y-0.5 hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]">
                                <Link href="/contact">{t("getInTouch")}</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav data-footer-item>
                        <p className="text-primary text-sm font-manrope font-bold uppercase mb-3">{t("nav.title")}</p>
                        <ul className="flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/60 transition-colors hover:text-[hsl(var(--primary))]"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Contact */}
                    <div data-footer-item>
                        <p className="text-primary text-sm font-manrope font-bold uppercase mb-3">{t("contact.title")}</p>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                    {t("contact.email")}
                                </span>
                                <a
                                    href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}
                                    className="mt-1 block break-all text-sm text-white/65 transition-colors hover:text-[hsl(var(--primary))]"
                                >
                                    {process.env.NEXT_PUBLIC_CONTACT_EMAIL}
                                </a>
                            </li>
                            <li>
                                <span className="block text-[10px] font-bold uppercase tracking-[0.14em] text-white/35">
                                    {t("contact.phone")}
                                </span>
                                <a
                                    href={`tel:${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}
                                    className="mt-1 block text-sm text-white/65 transition-colors hover:text-[hsl(var(--primary))]"
                                >
                                    {process.env.NEXT_PUBLIC_CONTACT_PHONE}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div data-footer-item className="mt-14 flex flex-col items-start gap-4 border-t border-white/10 pt-6 sm:flex-row sm:justify-between">
                    <p className="text-xs text-white/35">
                        © {currentYear} {t("copyright")}
                    </p>
                    <button
                        type="button"
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/45 transition-colors hover:text-[hsl(var(--primary))]"
                    >
                        {t("back")}
                        <span className="flex h-7 w-7 items-center justify-center rounded-md border border-white/15 transition-all group-hover:-translate-y-0.5 group-hover:border-[hsl(var(--primary))]">
                            <ArrowUp className="h-3.5 w-3.5" />
                        </span>
                    </button>
                </div>
            </div>
        </footer>
    )
}

export default Footer
