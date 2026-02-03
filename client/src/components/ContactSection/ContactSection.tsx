"use client"

import React, { useActionState, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Mail, Phone, Send, Check, Clock, FileText, Loader2 } from "lucide-react";
import { contactAction } from "@/actions/contact";
import { toast } from "sonner";

import { useTranslations } from "next-intl";

export function ContactSection() {
    const t = useTranslations("contact");
    const [state, formAction, isPending] = useActionState(contactAction, { error: null });
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setIsSuccess(true);
            toast.success(t("alert"));
        }
        if (state?.error) {
            // Error is handled by displaying it, or we can toast it
        }
    }, [state]);

    const benefits = [
        {
            icon: Clock,
            title: t("time.title"),
            description: t("time.content"),
        },
        {
            icon: Check,
            title: t("consultation.title"),
            description: t("consultation.content"),
        },
        {
            icon: FileText,
            title: t("proposals.title"),
            description: t("proposals.content"),
        },
    ];

    // Use values compatible with nefara-elevate visual but maybe fallbacks for logic
    // Hardcoding for now to match exactly the design request as primary goal
    const displayEmail = "contacts@nefara.org";
    const displayPhone = "+359 88 738 3000";
    const telPhone = "+359887383000";

    return (
        <section id="contact" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="section-label mb-4">{t("tag")}</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t("title")}
                        <br />
                        {t("subtitle")}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t("content")}
                    </p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {/* Left: Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Contact Cards */}
                        <div className="space-y-4 mb-10">
                            <a
                                href={`mailto:${displayEmail}`}
                                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Mail className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-semibold">{t("emailTitle")}</h4>
                                    <p className="text-muted-foreground text-sm">{t("emailContent")}</p>
                                </div>
                            </a>

                            <a
                                href={`tel:${telPhone}`}
                                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Phone className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h4 className="text-foreground font-semibold">{t("phoneTitle")}</h4>
                                    <p className="text-muted-foreground text-sm">{t("phoneContent")}</p>
                                </div>
                            </a>
                        </div>

                        {/* Benefits */}
                        <h3 className="text-lg font-semibold text-foreground mb-6">{t("infoTitle")}</h3>
                        <div className="space-y-4">
                            {benefits.map((benefit, index) => (
                                <motion.div
                                    key={benefit.title}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                        <benefit.icon className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <h4 className="text-foreground font-medium mb-1">{benefit.title}</h4>
                                        <p className="text-muted-foreground text-sm">{benefit.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-8 p-4 rounded-lg bg-secondary/50">
                            <p className="text-sm text-muted-foreground">
                                {t("call")} <a href={`tel:${telPhone}`} className="text-foreground font-medium hover:underline">{displayPhone}</a>
                            </p>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="p-8 rounded-2xl bg-card border border-border card-elevated">
                            <h3 className="text-xl font-semibold text-foreground mb-2">
                                {t("formTitle")}
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                {t("formText")}
                            </p>

                            {state?.error && (
                                <p className="text-sm text-destructive italic mb-4">
                                    {state.error}
                                </p>
                            )}

                            <form action={formAction} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        {t("email")} *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                                        placeholder={t("emailPlaceholder")}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                        {t("subject")} *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300"
                                        placeholder={t("subjectPlaceholder")}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        {t("message")} *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="flex min-h-[120px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all duration-300"
                                        placeholder={t("messagePlaceholder")}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending || isSuccess}
                                    className="w-full bg-primary text-primary-foreground h-12 rounded-xl font-medium flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-70 transition-all duration-300 shadow-md shadow-primary/20"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            {t("loading")}
                                        </>
                                    ) : isSuccess ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            {t("alert")}
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            {t("button")}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
