"use client"

import { ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import FeatureCardFlow from "./FeatureCardFlow"
import WidgetCell from "./WidgetCell"

gsap.registerPlugin(ScrollTrigger)

export type MissionRow = {
    num: string
    title: string
    desc: string
    widget: ReactNode
}

/**
 * The mission rows merged into one continuous section.
 *
 * - Each feature card fades in as it rises through the lower half of the
 *   viewport, is fully sharp only briefly at centre, then fades back out
 *   through the upper half - scrubbed to scroll.
 * - On `md`+ the widgets get an extra scroll-linked upward drift so they
 *   travel faster than the text (decoupled "sticky scroll" parallax).
 */
export function MissionRows({ rows }: { rows: MissionRow[] }) {
    const sectionRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        // Feature card fade in / fade out - every screen size.
        const ctx = gsap.context(() => {
            section
                .querySelectorAll<HTMLElement>("[data-card-trigger]")
                .forEach((trigger) => {
                    const card = trigger.querySelector<HTMLElement>("[data-feature-card]")
                    if (!card) return

                    gsap
                        .timeline({
                            scrollTrigger: {
                                // The trigger tracks the card's travel through
                                // the viewport; `center top` ends the timeline
                                // early so the card fades out sooner.
                                trigger,
                                start: "top bottom",
                                end: "center top",
                                scrub: true,
                            },
                        })
                        .fromTo(card, { autoAlpha: 0 }, { autoAlpha: 1, ease: "none", duration: 1 })
                        .to(card, { autoAlpha: 1, duration: 0.4 }) // brief hold at centre
                        .to(card, { autoAlpha: 0, ease: "none", duration: 1 })

                    // Widget fades out as its row leaves towards the top.
                    const row = trigger.closest<HTMLElement>("[data-mission-row]")
                    const widget = row?.querySelector<HTMLElement>("[data-parallax-widget]")
                    if (row && widget) {
                        gsap.fromTo(
                            widget,
                            { autoAlpha: 1 },
                            {
                                autoAlpha: 0,
                                ease: "none",
                                scrollTrigger: {
                                    trigger: row,
                                    start: "center center",
                                    end: "bottom top",
                                    scrub: true,
                                },
                            }
                        )
                    }
                })
        }, section)

        // Widget parallax - desktop only.
        const mm = gsap.matchMedia()

        mm.add("(min-width: 768px)", () => {
            const widgets =
                section.querySelectorAll<HTMLElement>("[data-parallax-widget]")
            // Widgets lead the text by ±35vh across their own row's scroll range.
            const lead = () => window.innerHeight * 0.35

            widgets.forEach((widget) => {
                const row = widget.closest("[data-mission-row]") ?? widget

                gsap.fromTo(
                    widget,
                    { y: () => lead() },
                    {
                        y: () => -lead(),
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                            invalidateOnRefresh: true,
                        },
                    }
                )
            })
        })

        return () => {
            ctx.revert()
            mm.revert()
        }
    }, [])

    return (
        <section ref={sectionRef} className="relative bg-background py-24 md:py-32">
            <div className="mx-auto max-w-6xl px-4">
                {rows.map((row) => (
                    <div
                        key={row.num}
                        data-mission-row
                        className="grid items-center gap-y-10 md:min-h-[80vh] md:grid-cols-2 md:gap-x-16"
                    >
                        <div data-card-trigger className="w-full">
                            <div data-feature-card className="w-full">
                                <FeatureCardFlow num={row.num} title={row.title} desc={row.desc} />
                            </div>
                        </div>
                        <div data-parallax-widget className="w-full max-w-md mx-auto">
                            <WidgetCell>{row.widget}</WidgetCell>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
