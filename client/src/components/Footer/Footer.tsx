"use client"

import React from "react";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Instagram, Facebook, Linkedin } from "lucide-react";
import { SOCIAL_MEDIA_URLS } from "@/config/socialMedia";

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
                <div className="flex flex-col gap-6">
                    {/* Main Footer Content */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        {/* Logo */}
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

                    {/* Social Media Icons - Below all other content */}
                    <div className="flex items-center justify-center md:justify-start gap-4 pt-4 border-t border-border/50 group">
                        <a
                            href={SOCIAL_MEDIA_URLS.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary transition-all duration-300 shadow-lg hover:scale-105"
                            aria-label="Instagram"
                        >
                            <Instagram className="w-5 h-5" />
                        </a>
                        <a
                            href={SOCIAL_MEDIA_URLS.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary transition-all duration-300 shadow-lg hover:scale-105"
                            aria-label="Facebook"
                        >
                            <Facebook className="w-5 h-5" />
                        </a>
                        <a
                            href={SOCIAL_MEDIA_URLS.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center w-12 h-12 rounded-full bg-background/90 dark:bg-background/80 backdrop-blur-sm border border-border/50 text-muted-foreground hover:text-primary transition-all duration-300 shadow-lg hover:scale-105"
                            aria-label="LinkedIn"
                        >
                            <Linkedin className="w-5 h-5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
