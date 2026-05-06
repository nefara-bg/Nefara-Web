"use client"

import * as motion from "motion/react-client"
import { Linkedin } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function TeamMemberCard({
    name,
    role,
    linkedin,
    index,
}: {
    name: string
    role: string
    linkedin: string
    index: number
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.12 }}
            className={index === 1 ? "md:-translate-y-8" : ""}
        >
            <Card className="group relative overflow-hidden">
                <div className="aspect-[3/4] relative flex items-center justify-center bg-gradient-to-br from-[hsl(var(--primary)/0.10)] via-card to-[hsl(var(--secondary)/0.05)]">
                    <div className="absolute inset-0 grid-pattern opacity-30" />
                    <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-card border border-border text-muted-foreground hover:text-[hsl(var(--primary-strong))] hover:border-[hsl(var(--primary))] transition-all duration-300 shadow-md group-hover:scale-105"
                        aria-label={`${name} LinkedIn`}
                    >
                        <Linkedin className="w-6 h-6" />
                    </a>
                </div>
                <div className="p-5 text-center border-t border-border">
                    <h3 className="font-display text-lg font-bold text-foreground">{name}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground font-bold">
                        {role}
                    </p>
                </div>
            </Card>
        </motion.div>
    )
}
