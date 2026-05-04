"use client"

import React, { useState, useEffect, useRef } from "react"
import * as motion from "motion/react-client"
import { Menu, X, ChevronDown } from "lucide-react"
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
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [isMobileCompanyOpen, setIsMobileCompanyOpen] = useState(false)
  const companyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (companyRef.current && !companyRef.current.contains(e.target as Node)) {
        setIsCompanyOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
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
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image src="/logo.svg" alt="Nefara" width={96} height={96} priority />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            <Link
              href="/services"
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
            >
              {t("services")}
            </Link>

            {/* Company dropdown */}
            <div ref={companyRef} className="relative">
              <button
                onClick={() => setIsCompanyOpen((v) => !v)}
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
              >
                {t("company")}
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform duration-200", isCompanyOpen && "rotate-180")}
                />
              </button>

              {isCompanyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 mt-1 w-40 rounded-lg border border-border bg-card shadow-lg overflow-hidden"
                >
                  <Link
                    href="/#about"
                    onClick={() => setIsCompanyOpen(false)}
                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/team"
                    onClick={() => setIsCompanyOpen(false)}
                    className="block px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
                  >
                    {t("team")}
                  </Link>
                </motion.div>
              )}
            </div>

            <Link
              href="/contact"
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
            >
              {t("contact")}
            </Link>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2 shrink-0">
            <LngSwitcher locale={locale} />
            <Link href="/contact">
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
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0 }}>
              <Link
                href="/services"
                className="block py-4 px-2 border-b border-border font-display font-bold text-lg text-foreground hover:text-[hsl(var(--primary-strong))] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("services")}
              </Link>
            </motion.div>

            {/* Company expandable */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.06 }}>
              <button
                onClick={() => setIsMobileCompanyOpen((v) => !v)}
                className="w-full flex items-center justify-between py-4 px-2 border-b border-border font-display font-bold text-lg text-foreground hover:text-[hsl(var(--primary-strong))] transition-colors"
              >
                {t("company")}
                <ChevronDown
                  className={cn("h-5 w-5 transition-transform duration-200", isMobileCompanyOpen && "rotate-180")}
                />
              </button>
              {isMobileCompanyOpen && (
                <div className="flex flex-col pl-4">
                  <Link
                    href="/#about"
                    className="py-3 px-2 border-b border-border/50 text-base text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("about")}
                  </Link>
                  <Link
                    href="/team"
                    className="py-3 px-2 border-b border-border/50 text-base text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("team")}
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 }}>
              <Link
                href="/contact"
                className="block py-4 px-2 border-b border-border font-display font-bold text-lg text-foreground hover:text-[hsl(var(--primary-strong))] transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>
            </motion.div>

            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="mt-6">
              <Button className="w-full" size="lg">{t("button")}</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </>
  )
}
