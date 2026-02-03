"use client"

import React, { useActionState, useEffect, useState } from "react";
import * as motion from "motion/react-client";
import { Mail, Phone, Send, Check, Clock, FileText, Loader2 } from "lucide-react";
import { contactAction } from "@/actions/contact";
import { toast } from "sonner";

const benefits = [
    {
        icon: Clock,
        title: "Fast Response Time",
        description: "We respond to all inquiries as soon as possible.",
    },
    {
        icon: Check,
        title: "Free Consultation",
        description: "Discovery calls to discuss your needs.",
    },
    {
        icon: FileText,
        title: "Custom Proposals",
        description: "Tailored solutions and transparent pricing.",
    },
];

export function ContactSection() {
    const [state, formAction, isPending] = useActionState(contactAction, { error: null });
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setIsSuccess(true);
            toast.success("Message sent successfully!");
        }
        if (state?.error) {
            // Error is handled by displaying it, or we can toast it
        }
    }, [state]);

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
                    <p className="section-label mb-4">Ready to Start?</p>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        Let's Build Something
                        <br />
                        Amazing Together
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Turn your vision into reality. Share your project details and we'll craft a
                        custom solution that exceeds your expectations.
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
                                    <h4 className="text-foreground font-semibold">Email Us</h4>
                                    <p className="text-muted-foreground text-sm">{displayEmail}</p>
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
                                    <h4 className="text-foreground font-semibold">Call Us</h4>
                                    <p className="text-muted-foreground text-sm">{displayPhone}</p>
                                </div>
                            </a>
                        </div>

                        {/* Benefits */}
                        <h3 className="text-lg font-semibold text-foreground mb-6">Why Work With Us?</h3>
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
                                Prefer to call? <a href={`tel:${telPhone}`} className="text-foreground font-medium hover:underline">{displayPhone}</a>
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
                                Send us a message
                            </h3>
                            <p className="text-muted-foreground text-sm mb-6">
                                Fill out the form below and we'll get back to you as soon as possible.
                            </p>

                            {state?.error && (
                                <p className="text-sm text-destructive italic mb-4">
                                    {state.error}
                                </p>
                            )}

                            <form action={formAction} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="form-input"
                                        placeholder="you@example.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                                        Subject *
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        required
                                        className="form-input"
                                        placeholder="Project inquiry"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                                        Your message *
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        className="form-input resize-none"
                                        placeholder="Tell us about your project..."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending || isSuccess}
                                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70"
                                >
                                    {isPending ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Sending...
                                        </>
                                    ) : isSuccess ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            Message Sent!
                                        </>
                                    ) : (
                                        <>
                                            <Send className="w-5 h-5" />
                                            Send Message
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
