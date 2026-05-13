"use client"

import React, { useActionState, useEffect, useState } from "react"
import { Check, Loader2 } from "lucide-react"
import { contactAction } from "@/actions/contact"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export function ContactSection() {
    const t = useTranslations("contact")
    const [state, formAction, isPending] = useActionState(contactAction, { error: null })
    const [isSuccess, setIsSuccess] = useState(false)

    useEffect(() => {
        if (state?.success) {
            setIsSuccess(true)
            toast.success(t("alert"))
        }
    }, [state, t])

    const displayEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
    const displayPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE

    const titleLines = t("heroTitle").split("\n")

    return (
        <section id="contact" className="bg-background">
            <style dangerouslySetInnerHTML={{ __html: `
                .cs-btn{position:relative;overflow:hidden}
                .cs-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.28) 50%,transparent 60%);transform:translateX(-120%);transition:transform 0s}
                .cs-btn:hover::after{transform:translateX(220%);transition:transform 0.55s ease}
            ` }} />
            <div className="mx-auto max-w-7xl px-6 lg:px-10 pt-14 pb-28">
                <div className="grid lg:grid-cols-[2fr_3fr] gap-8 xl:gap-14 items-start">

                    {/* Left — sticky info panel */}
                    <div className="lg:sticky lg:top-24 lg:flex lg:flex-col lg:items-start lg:text-left">
                        <h1 className="font-display text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-[1.05] tracking-tight mb-5">
                            {titleLines.map((line, i) => (
                                <React.Fragment key={i}>
                                    {line}
                                    {i < titleLines.length - 1 && <br />}
                                </React.Fragment>
                            ))}
                        </h1>
                        <p className="text-base text-muted-foreground leading-relaxed mb-10 max-w-xs">
                            {t("heroSubtitle")}
                        </p>

                        <div className="flex flex-col gap-5">
                            <a href={`mailto:${displayEmail}`} className="flex items-center gap-4 group">
                                <img src="/contacIcons/mailIcon.svg" alt="Email" className="w-8 h-8 shrink-0" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground mb-0.5">
                                        {t("emailTitle")}
                                    </p>
                                    <p className="text-sm font-semibold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                                        {displayEmail}
                                    </p>
                                </div>
                            </a>

                            <a href={`tel:${displayPhone}`} className="flex items-center gap-4 group">
                                <img src="/contacIcons/phoneIcon.svg" alt="Phone" className="w-8 h-8 shrink-0" />
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-muted-foreground mb-0.5">
                                        {t("phoneTitle")}
                                    </p>
                                    <p className="text-sm font-semibold text-foreground group-hover:text-[hsl(var(--primary))] transition-colors">
                                        {displayPhone}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right — form card */}
                    <div className="bg-card rounded-2xl border border-border shadow-[0_8px_48px_-16px_rgba(15,23,42,0.12)] p-8 md:p-10">
                        {state?.error && (
                            <p className="text-sm text-destructive italic mb-5">{state.error}</p>
                        )}

                        <form action={formAction} className="flex flex-col gap-5">
                            <div className="grid sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <Label htmlFor="name">{t("name")}</Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        required
                                        placeholder={t("namePlaceholder")}
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label htmlFor="email">{t("email")}</Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        placeholder={t("emailPlaceholder")}
                                    />
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="company">{t("company")}</Label>
                                <Input
                                    id="company"
                                    name="company"
                                    type="text"
                                    placeholder={t("companyPlaceholder")}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="service">{t("service")}</Label>
                                <select
                                    id="service"
                                    name="service"
                                    defaultValue=""
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 appearance-none cursor-pointer"
                                    style={{
                                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "right 0.75rem center",
                                        paddingRight: "2.5rem",
                                    }}
                                >
                                    <option value="" disabled>{t("servicePlaceholder")}</option>
                                    <option value="Web Development">{t("serviceOptions.web")}</option>
                                    <option value="Mobile Apps">{t("serviceOptions.mobile")}</option>
                                    <option value="Desktop Apps">{t("serviceOptions.desktop")}</option>
                                    <option value="Software Systems">{t("serviceOptions.software")}</option>
                                    <option value="SEO Optimisation">{t("serviceOptions.seo")}</option>
                                    <option value="Other">{t("serviceOptions.other")}</option>
                                </select>
                            </div>

                            <div className="space-y-1.5">
                                <Label htmlFor="message">{t("projectLabel")}</Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={5}
                                    placeholder={t("messagePlaceholder")}
                                    className="resize-none"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isPending || isSuccess}
                                className="cs-btn group w-full sm:w-auto flex items-center gap-2 rounded bg-[hsl(var(--primary))] px-7 py-3 text-[15px] font-semibold tracking-[-0.01em] text-white transition-all hover:bg-[hsl(var(--primary-strong))] hover:-translate-y-px hover:shadow-[0_4px_16px_-4px_rgba(0,196,178,0.5)] disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 disabled:shadow-none"
                            >
                                {isPending ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" />{t("loading")}</>
                                ) : isSuccess ? (
                                    <><Check className="w-4 h-4" />{t("alert")}</>
                                ) : (
                                    <>
                                        {t("button")}
                                        <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}
