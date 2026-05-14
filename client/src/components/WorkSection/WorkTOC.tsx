"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

type Item = { id: string; name: string }
type Group = { id: string; name: string; children?: Item[] }

export function WorkTOC({ groups, label }: { groups: Group[]; label: string }) {
    const flat = useMemo(() => {
        const list: { id: string; name: string; level: 0 | 1; localIndex: number }[] = []
        let topIdx = 0
        for (const g of groups) {
            topIdx += 1
            list.push({ id: g.id, name: g.name, level: 0, localIndex: topIdx })
            if (g.children) {
                g.children.forEach((c, i) => {
                    list.push({ id: c.id, name: c.name, level: 1, localIndex: i + 1 })
                })
            }
        }
        return list
    }, [groups])

    const [active, setActive] = useState(flat[0]?.id ?? "")
    const fillRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sections = flat
            .map(({ id }) => document.getElementById(id))
            .filter((el): el is HTMLElement => !!el)

        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
                if (visible[0]) {
                    setActive((visible[0].target as HTMLElement).id)
                }
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        )
        sections.forEach((s) => observer.observe(s))

        return () => {
            observer.disconnect()
        }
    }, [flat])

    useEffect(() => {
        const fill = fillRef.current
        if (!fill) return
        const idx = flat.findIndex((it) => it.id === active)
        const target = idx < 0 ? 0 : ((idx + 1) / flat.length) * 100
        gsap.to(fill, { height: `${target}%`, duration: 0.6, ease: "power2.out" })
    }, [active, flat])

    const renderLink = (
        item: { id: string; name: string; level: 0 | 1; localIndex: number }
    ) => {
        const isActive = active === item.id
        return (
            <li key={item.id} className={item.level === 1 ? "pl-5" : ""}>
                <a
                    href={`#${item.id}`}
                    className={cn(
                        "group flex items-center gap-3 text-sm transition-colors duration-300",
                        isActive
                            ? "text-foreground"
                            : "text-muted-foreground/60 hover:text-foreground"
                    )}
                >
                    <span
                        className={cn(
                            "h-px transition-all duration-300 ease-out",
                            isActive
                                ? "w-7 bg-[hsl(var(--primary))]"
                                : "w-3 bg-[hsl(var(--border))] group-hover:w-5"
                        )}
                        aria-hidden="true"
                    />
                    <span className="font-mono text-[10px] text-muted-foreground/50">
                        0{item.localIndex}
                    </span>
                    <span
                        className={cn(
                            "font-display font-semibold transition-all duration-300",
                            isActive ? "translate-x-0.5" : ""
                        )}
                    >
                        {item.name}
                    </span>
                </a>
            </li>
        )
    }

    return (
        <aside className="hidden lg:block">
            <div className="sticky top-28">
                <div className="flex gap-5">
                    {/* Track + step-based fill — matches services page style */}
                    <div className="relative w-px shrink-0" style={{ minHeight: 180 }}>
                        <div
                            className="absolute inset-0 w-px"
                            style={{ background: "hsl(var(--border))" }}
                            aria-hidden="true"
                        />
                        <div className="absolute inset-0 w-px overflow-hidden">
                            <div
                                ref={fillRef}
                                className="w-full origin-top"
                                style={{ height: "0%", background: "hsl(var(--primary))" }}
                                aria-hidden="true"
                            />
                        </div>
                    </div>

                    <nav aria-label={label} className="flex-1">
                        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mb-5">
                            {label}
                        </p>
                        <ul className="space-y-3.5">{flat.map(renderLink)}</ul>
                    </nav>
                </div>
            </div>
        </aside>
    )
}
