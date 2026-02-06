"use client"

import React from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Footer = () => {
    const t = useTranslations("footer");
    const tHeader = useTranslations("header");
    const currentYear = new Date().getFullYear();

    const links = [
        { name: tHeader("home"), href: "/#home" },
        { name: tHeader("services"), href: "/#services" },
        { name: tHeader("about"), href: "/#about" },
        { name: tHeader("contact"), href: "/#contact" },
    ];

    return (
        <footer className="py-12 bg-card border-t border-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    {/* <div className="flex items-center gap-2">
                        <svg
                            className="w-8 h-8 text-foreground"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                        >
                            <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 4l8 4-8 4-8-4 8-4zm-10 7.5l10 5v9l-10-5v-9zm12 14v-9l10-5v9l-10 5z" />
                        </svg>
                        <span className="text-xl font-bold text-foreground">Nefara</span>
                    </div> */}
                    <div className="flex flex-row items-center gap-1">
                        <Image
                            src="/logo.svg"
                            alt="Our logo"
                            width={20}
                            height={20}
                        />
                        <h5 className="text-2xl font-bold select-none text-primary">efara</h5>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        {links.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Copyright */}
                    <p className="text-muted-foreground text-sm">
                        © {currentYear} {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
