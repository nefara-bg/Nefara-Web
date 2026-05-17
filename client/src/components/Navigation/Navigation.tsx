"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import * as motion from "motion/react-client"
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react"
import { EASE } from "@/lib/motion"
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
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setIsCompanyOpen(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    closeTimer.current = setTimeout(() => setIsCompanyOpen(false), 120)
  }, [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 border transition-all duration-500 border-secondary/15",
          isScrolled
            ? "bg-card/90 backdrop-blur-xl"
            : "bg-card/70 backdrop-blur-md"
        )}
      >
        <div className="w-full h-16 px-6 lg:px-10 grid grid-cols-[auto_1fr_auto] items-center gap-6">
          {/* Logo – left */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="Nefara" width={96} height={96} priority />
          </Link>

          {/* Desktop nav – centred */}
          <div className="hidden md:flex items-center justify-center gap-1">
            <Link
              href="/services"
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
            >
              {t("services")}
            </Link>

            {/* Company dropdown */}
            <div
              ref={companyRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
              >
                {t("company")}
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200 text-[hsl(var(--primary))]",
                    isCompanyOpen && "rotate-180"
                  )}
                />
              </button>

              {isCompanyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  style={{ transformOrigin: "top center" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
                  style={{ width: "max-content", minWidth: 420 }}
                >
                  {/* Top accent line */}
                  <div className="h-px w-full" style={{ background: "linear-gradient(to right, transparent, hsl(var(--primary)/0.5), transparent)" }} />

                  <div className="p-5 flex flex-col gap-1">
                    <Link
                      href="/#about"
                      onClick={() => setIsCompanyOpen(false)}
                      className="group flex items-center gap-4 rounded-xl px-3 py-4 transition-all duration-200 hover:bg-[hsl(var(--foreground)/0.04)]"
                    >
                      <Image src="/aboutUsIcon.svg" alt="About" width={48} height={48} className="flex-shrink-0" />
                      <div>
                        <div className="text-base font-medium text-foreground group-hover:text-[hsl(var(--primary-strong))] transition-colors">
                          {t("aboutTitle")}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground whitespace-nowrap">
                          {t("aboutDesc")}
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/team"
                      onClick={() => setIsCompanyOpen(false)}
                      className="group flex items-center gap-4 rounded-xl px-3 py-4 transition-all duration-200 hover:bg-[hsl(var(--foreground)/0.04)]"
                    >
                      <Image src="/OurTeamIcon.svg" alt="Team" width={52} height={52} className="flex-shrink-0" />
                      <div>
                        <div className="text-base font-medium text-foreground group-hover:text-[hsl(var(--primary-strong))] transition-colors">
                          {t("teamTitle")}
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground whitespace-nowrap">
                          {t("teamDesc")}
                        </div>
                      </div>
                    </Link>
                  </div>

                  {/* Bottom CTA bar */}
                  <div className="border-t border-border/50 bg-[hsl(var(--foreground)/0.02)] px-5 py-2.5 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Ready to build something great?</span>
                    <Link
                      href="/contact"
                      onClick={() => setIsCompanyOpen(false)}
                      className="flex items-center gap-1 text-xs font-semibold text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-strong))] transition-colors"
                    >
                      Get in touch <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </motion.div>
              )}
            </div>

            <Link
              href="/work"
              className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-[hsl(var(--foreground)/0.04)] transition-colors"
            >
              {t("work")}
            </Link>
          </div>

          {/* Actions – right */}
          <div className="hidden md:flex items-center gap-3 justify-self-end">
            <LngSwitcher locale={locale} />
            <Button asChild variant="slide" className="w-36">
              <Link href="/contact">{t("button")}</Link>
            </Button>
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
