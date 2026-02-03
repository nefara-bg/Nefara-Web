"use client"

import React from "react";

import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations("footer");
    const tHeader = useTranslations("header");
    const currentYear = new Date().getFullYear();

    const scrollToSection = (href: string) => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    };

    const links = [
        { name: tHeader("home"), id: "home" },
        { name: tHeader("services"), id: "services" },
        { name: tHeader("about"), id: "about" },
        { name: tHeader("contact"), id: "contact" },
    ];

    return (
        <footer className="py-12 bg-card border-t border-border">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <svg
                            className="w-8 h-8 text-foreground"
                            viewBox="0 0 32 32"
                            fill="currentColor"
                        >
                            <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 4l8 4-8 4-8-4 8-4zm-10 7.5l10 5v9l-10-5v-9zm12 14v-9l10-5v9l-10 5z" />
                        </svg>
                        <span className="text-xl font-bold text-foreground">Nefara</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-8">
                        {links.map((link) => (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(`#${link.id}`)}
                                className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                            >
                                {link.name}
                            </button>
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
