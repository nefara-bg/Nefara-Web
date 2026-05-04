"use client"

import React, { useActionState, useEffect, useState } from "react"
import * as motion from "motion/react-client"
import { Mail, Phone, Send, Check, Clock, FileText, Loader2 } from "lucide-react"
import { contactAction } from "@/actions/contact"
import { toast } from "sonner"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

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

    const benefits = [
        { icon: Clock, title: t("time.title"), description: t("time.content") },
        { icon: Check, title: t("consultation.title"), description: t("consultation.content") },
        { icon: FileText, title: t("proposals.title"), description: t("proposals.content") },
    ]

    const displayEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL
    const displayPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE

    return (
        <section id="contact" className="bg-background section-shell">
            <div className="mx-auto max-w-7xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto mb-14 md:mb-20"
                >
                    <span className="eyebrow mb-5 justify-center">{t("tag")}</span>
                    <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-5 leading-[1.05] tracking-tight">
                        {t("title")} <br />
                        <span className="text-[hsl(var(--primary-strong))]">{t("subtitle")}</span>
                    </h2>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                        {t("content")}
                    </p>
                </motion.div>

                {/* Split layout */}
                <Card className="overflow-hidden grid lg:grid-cols-5 max-w-6xl mx-auto shadow-[0_24px_60px_-20px_rgba(15,23,42,0.16)]">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-3 p-8 md:p-12"
                    >
                        <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                            {t("formTitle")}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-8">{t("formText")}</p>

                        {state?.error && (
                            <p className="text-sm text-destructive italic mb-4">{state.error}</p>
                        )}

                        <form action={formAction} className="flex flex-col gap-5">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">{t("email")} *</Label>
                                    <Input id="email" name="email" type="email" required placeholder={t("emailPlaceholder")} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">{t("subject")} *</Label>
                                    <Input id="subject" name="subject" required placeholder={t("subjectPlaceholder")} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">{t("message")} *</Label>
                                <Textarea id="message" name="message" required rows={5} placeholder={t("messagePlaceholder")} />
                            </div>
                            <Button type="submit" size="lg" disabled={isPending || isSuccess} className="w-full sm:w-auto sm:self-start">
                                {isPending ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        {t("loading")}
                                    </>
                                ) : isSuccess ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {t("alert")}
                                    </>
                                ) : (
                                    <>
                                        {t("button")}
                                        <Send className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </motion.div>

                    {/* Dark info panel */}
                    <motion.div
                        initial={{ opacity: 0, x: 16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-2 dark-section p-8 md:p-12 relative overflow-hidden"
                    >
                        <div
                            className="absolute -top-20 -right-20 w-64 h-64 rounded-full opacity-50"
                            style={{
                                background: "radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)",
                            }}
                        />

                        <div className="relative">
                            <h3 className="font-display text-2xl font-bold text-white mb-6">
                                {t("infoTitle")}
                            </h3>

                            {/* Direct contacts */}
                            <div className="flex flex-col gap-3 mb-8">
                                <a
                                    href={`mailto:${displayEmail}`}
                                    className="flex items-center gap-3 p-3 rounded-md border border-white/10 hover:border-[hsl(var(--primary))] hover:bg-white/5 transition-all"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-md bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary))]">
                                        <Mail className="w-4 h-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-white/50">{t("emailTitle")}</p>
                                        <p className="text-sm text-white truncate">{displayEmail}</p>
                                    </div>
                                </a>
                                <a
                                    href={`tel:${displayPhone}`}
                                    className="flex items-center gap-3 p-3 rounded-md border border-white/10 hover:border-[hsl(var(--primary))] hover:bg-white/5 transition-all"
                                >
                                    <span className="flex items-center justify-center w-9 h-9 rounded-md bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary))]">
                                        <Phone className="w-4 h-4" />
                                    </span>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-white/50">{t("phoneTitle")}</p>
                                        <p className="text-sm text-white">{displayPhone}</p>
                                    </div>
                                </a>
                            </div>

                            {/* Benefits list */}
                            <div className="flex flex-col gap-5">
                                {benefits.map((benefit, i) => {
                                    const Icon = benefit.icon
                                    return (
                                        <div key={benefit.title} className="flex items-start gap-3">
                                            <span className="flex items-center justify-center w-8 h-8 rounded-md bg-[hsl(var(--primary)/0.18)] text-[hsl(var(--primary))] shrink-0">
                                                <Icon className="w-4 h-4" />
                                            </span>
                                            <div>
                                                <p className="text-sm font-bold text-white mb-0.5">{benefit.title}</p>
                                                <p className="text-xs text-white/60 leading-relaxed">{benefit.description}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/10">
                                <p className="text-xs text-white/60">
                                    {t("call")}{" "}
                                    <a href={`tel:${displayPhone}`} className="text-[hsl(var(--primary))] font-bold hover:underline">
                                        {displayPhone}
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </Card>
            </div>
        </section>
    )
}
