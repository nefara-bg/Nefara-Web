"use client"

import React, { useState, useEffect } from "react";
import * as motion from "motion/react-client";
import { Menu, X } from "lucide-react";
import LngSwitcher from '@/components/Header/components/LngSwitcher/LngSwitcher';
import { useTranslations } from "next-intl";

export function Navigation({ locale }: { locale: string }) {
  const t = useTranslations("header");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: t("home"), href: "#home" },
    { name: t("services"), href: "#services" },
    { name: t("about"), href: "#about" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-card/95 backdrop-blur-md shadow-sm py-4" : "py-6"
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2"
          >
            <svg
              className="w-8 h-8 text-foreground"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <path d="M16 2L4 8v16l12 6 12-6V8L16 2zm0 4l8 4-8 4-8-4 8-4zm-10 7.5l10 5v9l-10-5v-9zm12 14v-9l10-5v9l-10 5z" />
            </svg>
            <span className="text-xl font-bold text-foreground">Nefara</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="nav-link"
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {/* LngSwitcher from SoftwareSolutions */}
            <LngSwitcher locale={locale} />

            {/* CTA Button */}
            <button
              onClick={() => scrollToSection("#contact")}
              className="btn-outline text-sm py-2 px-4 ml-4"
            >
              {t("contact")}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <LngSwitcher locale={locale} />
            <button
              className="p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background pt-24 md:hidden"
        >
          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => scrollToSection(link.href)}
                className="text-xl font-medium text-foreground"
              >
                {link.name}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}
    </>
  );
}
