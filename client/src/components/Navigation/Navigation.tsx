"use client"

import React, { useState, useEffect } from "react"
import * as motion from "motion/react-client"
import { Menu, X } from "lucide-react"
import LngSwitcher from "@/components/Header/components/LngSwitcher/LngSwitcher"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function Navigation({ locale }: { locale: string }) {
  const t = useTranslations("header")
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { name: t("home"), href: "/#home" },
    { name: t("services"), href: "/#services" },
    { name: t("about"), href: "/#about" },
    { name: t("contact"), href: "/#contact" },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300",
          isScrolled
            ? "border-border bg-card/90 backdrop-blur-xl shadow-[0_1px_16px_rgba(15,23,42,0.06)]"
            : "border-transparent bg-card/70 backdrop-blur-md"
        )}
      >
        <div className="mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8 flex items-center gap-6">
          {/* Logo */}
          <Link href="/#home" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.svg" alt="Nefara" width={28} height={28} priority />
            <span className="font-display text-xl font-bold tracking-tight text-foreground">
              Nefara
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <LngSwitcher locale={locale} />
            <Link href="/#contact">
              <Button size="sm">{t("button")}</Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <LngSwitcher locale={locale} />
            <Button
              variant="outline"
              size="icon"
              aria-label="Menu"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile drawer */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-card/95 backdrop-blur-md pt-20 px-6 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex flex-col gap-2" onClick={(e) => e.stopPropagation()}>
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Link
                  href={link.href}
                  className="block py-4 px-2 border-b border-border font-display font-bold text-lg text-foreground hover:text-[hsl(var(--primary-strong))] transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <Link href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-6">
              <Button className="w-full" size="lg">{t("button")}</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  )
}
