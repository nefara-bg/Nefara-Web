"use client"

import React, { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Footer from "@/components/Footer/Footer"

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps the page content and reveals the footer underneath it.
 *
 * When the footer fits within the viewport it is pinned (`fixed`) behind the
 * content, which carries an opaque background and bottom spacing equal to the
 * footer height — scrolling to the end slides the content up and uncovers the
 * footer ("footer comes up" illusion). GSAP fades the footer's content in as
 * it is revealed.
 *
 * When the footer is taller than the viewport (short screens) a pinned footer
 * would clip and become unscrollable, so the effect is disabled and the footer
 * falls back to a normal in-flow footer the user can scroll through fully.
 */
const FooterRevealLayout = ({ children }: { children: React.ReactNode }) => {
    const contentRef = useRef<HTMLDivElement>(null)
    const footerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const content = contentRef.current
        const footerWrap = footerRef.current
        if (!content || !footerWrap) return

        let ctx: gsap.Context | null = null
        let last = { footerHeight: -1, viewportHeight: -1 }

        const build = () => {
            const footerHeight = footerWrap.offsetHeight
            const viewportHeight = window.innerHeight
            // Skip rebuilds when nothing relevant changed (avoids RO loops).
            if (
                ctx &&
                footerHeight === last.footerHeight &&
                viewportHeight === last.viewportHeight
            ) {
                return
            }
            last = { footerHeight, viewportHeight }

            ctx?.revert()
            ctx = null
            content.style.marginBottom = ""
            footerWrap.style.position = ""

            // A pinned footer taller than the viewport would clip — only do the
            // reveal when the whole footer fits on screen.
            const fits = footerHeight < viewportHeight

            if (fits) {
                footerWrap.style.position = "fixed"
                content.style.marginBottom = `${footerHeight}px`
            }

            ctx = gsap.context(() => {
                const items =
                    footerWrap.querySelectorAll<HTMLElement>("[data-footer-item]")

                gsap.from(items, {
                    y: fits ? 64 : 40,
                    autoAlpha: 0,
                    ease: "power2.out",
                    stagger: 0.12,
                    scrollTrigger: fits
                        ? {
                              // Tie the entrance to the reveal progress.
                              trigger: content,
                              start: "bottom bottom",
                              end: () => `+=${footerWrap.offsetHeight}`,
                              scrub: 0.6,
                          }
                        : {
                              // Plain on-enter fade for the in-flow fallback.
                              trigger: footerWrap,
                              start: "top 80%",
                          },
                })
            })

            ScrollTrigger.refresh()
        }

        build()

        let raf = 0
        const onResize = () => {
            cancelAnimationFrame(raf)
            raf = requestAnimationFrame(build)
        }
        window.addEventListener("resize", onResize)
        const ro = new ResizeObserver(onResize)
        ro.observe(footerWrap)

        return () => {
            window.removeEventListener("resize", onResize)
            ro.disconnect()
            cancelAnimationFrame(raf)
            ctx?.revert()
            content.style.marginBottom = ""
            footerWrap.style.position = ""
        }
    }, [])

    return (
        <>
            <div ref={contentRef} className="relative z-10 min-h-screen bg-background" style={{ boxShadow: "0 8px 40px 8px rgba(0,0,0,0.28)" }}>
                {children}
            </div>
            <div ref={footerRef} className="inset-x-0 bottom-0 z-0">
                <Footer />
            </div>
        </>
    )
}

export default FooterRevealLayout
