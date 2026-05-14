"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

type Item = { id: string; name: string }
type Group = { id: string; name: string; children?: Item[] }
type FlatItem = { id: string; name: string; level: 0 | 1; localIndex: number }

export function WorkTOC({ groups, label }: { groups: Group[]; label: string }) {
    const flat = useMemo<FlatItem[]>(() => {
        const list: FlatItem[] = []
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
    const [open, setOpen] = useState(false)
    const desktopFillRef = useRef<HTMLDivElement>(null)
    const mobileFillRef = useRef<HTMLDivElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)

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
        const idx = flat.findIndex((it) => it.id === active)
        const target = idx < 0 ? 0 : ((idx + 1) / flat.length) * 100
        if (desktopFillRef.current) {
            gsap.to(desktopFillRef.current, {
                height: `${target}%`,
                duration: 0.6,
                ease: "power2.out",
            })
        }
        if (mobileFillRef.current) {
            gsap.to(mobileFillRef.current, {
                width: `${target}%`,
                duration: 0.6,
                ease: "power2.out",
            })
        }
    }, [active, flat])

    // Close on Escape; lock body scroll while open
    useEffect(() => {
        if (!open) return
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        window.addEventListener("keydown", onKey)
        const prev = document.body.style.overflow
        document.body.style.overflow = "hidden"
        return () => {
            window.removeEventListener("keydown", onKey)
            document.body.style.overflow = prev
        }
    }, [open])

    // Animate overlay open/close
    useEffect(() => {
        const ov = overlayRef.current
        const pn = panelRef.current
        if (!ov || !pn) return
        if (open) {
            gsap.set(ov, { display: "flex" })
            gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: "power2.out" })
            gsap.fromTo(
                pn,
                { y: 24, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.35, ease: "power3.out" }
            )
        } else {
            gsap.to(ov, {
                opacity: 0,
                duration: 0.2,
                ease: "power2.in",
                onComplete: () => {
                    if (overlayRef.current) overlayRef.current.style.display = "none"
                },
            })
        }
    }, [open])

    const renderLink = (item: FlatItem, onClick?: () => void) => {
        const isActive = active === item.id
        return (
            <li key={item.id} className={item.level === 1 ? "pl-5" : ""}>
                <a
                    href={`#${item.id}`}
                    onClick={onClick}
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

    const desktopBody = (
        <div className="flex gap-5">
            <div className="relative w-px shrink-0" style={{ minHeight: 180 }}>
                <div
                    className="absolute inset-0 w-px"
                    style={{ background: "hsl(var(--border))" }}
                    aria-hidden="true"
                />
                <div className="absolute inset-0 w-px overflow-hidden">
                    <div
                        ref={desktopFillRef}
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
                <ul className="space-y-3.5">{flat.map((it) => renderLink(it))}</ul>
            </nav>
        </div>
    )

    const mobileBody = (onItemClick: () => void) => (
        <div className="flex flex-col gap-7">
            {/* Top progress bar */}
            <div>
                <div className="mb-3 flex items-baseline justify-between">
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {label}
                    </p>
                    <p className="font-mono text-[10px] tabular-nums text-muted-foreground">
                        {(() => {
                            const idx = flat.findIndex((it) => it.id === active)
                            return `${String(idx < 0 ? 1 : idx + 1).padStart(2, "0")} / ${String(flat.length).padStart(2, "0")}`
                        })()}
                    </p>
                </div>
                <div className="relative h-[3px] w-full overflow-hidden rounded-full" style={{ background: "hsl(var(--border))" }}>
                    <div
                        ref={mobileFillRef}
                        className="absolute left-0 top-0 h-full rounded-full"
                        style={{ width: "0%", background: "hsl(var(--primary))" }}
                        aria-hidden="true"
                    />
                </div>
            </div>

            {/* Grouped sections */}
            <div className="flex flex-col gap-6">
                {groups.map((group, gIdx) => {
                    const isGroupActive = active === group.id
                    return (
                        <div key={group.id} className="flex flex-col gap-2">
                            <a
                                href={`#${group.id}`}
                                onClick={onItemClick}
                                className={cn(
                                    "flex items-center justify-between rounded-xl border px-4 py-3.5 transition-colors",
                                    isGroupActive
                                        ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.08)]"
                                        : "border-white/10 bg-white/[0.02] active:bg-white/[0.05]"
                                )}
                            >
                                <div className="flex items-center gap-3">
                                    <span
                                        className={cn(
                                            "font-mono text-[11px] tabular-nums",
                                            isGroupActive
                                                ? "text-[hsl(var(--primary))]"
                                                : "text-muted-foreground/70"
                                        )}
                                    >
                                        {String(gIdx + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={cn(
                                            "font-display text-base font-semibold",
                                            isGroupActive ? "text-foreground" : "text-foreground/90"
                                        )}
                                    >
                                        {group.name}
                                    </span>
                                </div>
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={cn(
                                        "h-4 w-4",
                                        isGroupActive
                                            ? "text-[hsl(var(--primary))]"
                                            : "text-muted-foreground/50"
                                    )}
                                    aria-hidden="true"
                                >
                                    <polyline points="9 6 15 12 9 18" />
                                </svg>
                            </a>

                            {group.children && group.children.length > 0 && (
                                <ul className="ml-3 flex flex-col gap-1.5 border-l border-white/10 pl-3">
                                    {group.children.map((child, cIdx) => {
                                        const isActive = active === child.id
                                        return (
                                            <li key={child.id}>
                                                <a
                                                    href={`#${child.id}`}
                                                    onClick={onItemClick}
                                                    className={cn(
                                                        "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
                                                        isActive
                                                            ? "bg-white/[0.04] text-foreground"
                                                            : "text-muted-foreground/70 active:bg-white/[0.03]"
                                                    )}
                                                >
                                                    <span
                                                        className={cn(
                                                            "h-1.5 w-1.5 rounded-full transition-colors",
                                                            isActive
                                                                ? "bg-[hsl(var(--primary))]"
                                                                : "bg-white/20"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span className="font-mono text-[10px] tabular-nums text-muted-foreground/60">
                                                        {String(cIdx + 1).padStart(2, "0")}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "text-sm",
                                                            isActive ? "font-semibold" : "font-medium"
                                                        )}
                                                    >
                                                        {child.name}
                                                    </span>
                                                </a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden lg:block">
                <div className="sticky top-28">{desktopBody}</div>
            </aside>

            {/* Mobile floating trigger */}
            <div className="lg:hidden pointer-events-none sticky top-20 z-40 flex justify-end pr-4 mb-8">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    aria-label={label}
                    aria-expanded={open}
                    className="pointer-events-auto flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-card/95 text-foreground shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)] backdrop-blur-md transition-transform duration-200 active:scale-95"
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        <circle cx="5" cy="8" r="1" fill="currentColor" />
                        <line x1="9" y1="8" x2="19" y2="8" />
                        <circle cx="5" cy="16" r="1" fill="currentColor" />
                        <line x1="9" y1="16" x2="19" y2="16" />
                    </svg>
                </button>
            </div>

            {/* Mobile overlay */}
            <div
                ref={overlayRef}
                className="fixed inset-0 z-50 hidden items-end justify-center bg-black/60 backdrop-blur-sm lg:hidden"
                style={{ display: "none" }}
                onClick={(e) => {
                    if (e.target === e.currentTarget) setOpen(false)
                }}
                role="dialog"
                aria-modal="true"
                aria-label={label}
            >
                <div
                    ref={panelRef}
                    className="relative w-full max-h-[85vh] overflow-y-auto rounded-t-3xl border border-white/10 border-b-0 bg-card px-5 pt-4 pb-8 shadow-2xl"
                >
                    <div className="sticky top-0 z-10 -mx-5 -mt-4 mb-4 flex items-center justify-center bg-card/95 backdrop-blur-sm px-5 pt-3 pb-3">
                        <span className="h-1 w-10 rounded-full bg-white/15" aria-hidden="true" />
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Close"
                            className="absolute right-4 top-2.5 flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:text-foreground"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                className="h-4 w-4"
                                aria-hidden="true"
                            >
                                <line x1="6" y1="6" x2="18" y2="18" />
                                <line x1="18" y1="6" x2="6" y2="18" />
                            </svg>
                        </button>
                    </div>
                    {mobileBody(() => setOpen(false))}
                </div>
            </div>
        </>
    )
}
