"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import gsap from "gsap";

// Observable value that replaces Framer Motion's MotionValue for scroll progress
export class ScrollValue {
    private _value = 0;
    private _subs: Set<(v: number) => void> = new Set();
    get() { return this._value; }
    set(v: number) {
        this._value = v;
        this._subs.forEach(s => s(v));
    }
    on(fn: (v: number) => void) {
        this._subs.add(fn);
        return () => this._subs.delete(fn);
    }
}

export const StickyScrollProgressContext = createContext<ScrollValue | null>(null);
export const useStickyScrollProgress = () => useContext(StickyScrollProgressContext);

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode;
    }[];
    contentClassName?: string;
}) => {
    const [activeCard, setActiveCard] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const scrollValueRef = useRef(new ScrollValue());
    const textRefs = useRef<(HTMLDivElement | null)[]>([]);
    const gradientRef = useRef<HTMLDivElement>(null);

    const cardLength = content.length;

    const backgroundColors = [
        "hsl(202, 60%, 10%)",
        "hsl(202, 60%, 7%)",
        "hsl(202, 55%, 13%)",
    ];

    const linearGradients = [
        "linear-gradient(to bottom right, hsl(174, 100%, 40%), hsl(174, 80%, 28%))",
        "linear-gradient(to bottom right, hsl(174, 90%, 35%), hsl(202, 60%, 30%))",
        "linear-gradient(to bottom right, hsl(174, 100%, 38%), hsl(174, 70%, 22%))",
    ];

    // Track scroll within container and update ScrollValue
    useEffect(() => {
        const container = ref.current;
        if (!container) return;

        const sv = scrollValueRef.current;

        const onScroll = () => {
            const scrollTop = container.scrollTop;
            const scrollHeight = container.scrollHeight - container.clientHeight;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
            sv.set(progress);

            const cardsBreakpoints = content.map((_, i) => i / cardLength);
            const closest = cardsBreakpoints.reduce((acc, bp, i) =>
                Math.abs(progress - bp) < Math.abs(progress - cardsBreakpoints[acc]) ? i : acc
            , 0);
            setActiveCard(closest);
        };

        container.addEventListener("scroll", onScroll, { passive: true });
        return () => container.removeEventListener("scroll", onScroll);
    }, [cardLength, content]);

    // Initial opacity animation (mirrors Framer's initial:0 → animate to 1 or 0.3)
    useEffect(() => {
        textRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.fromTo(el, { opacity: 0 }, { opacity: i === 0 ? 1 : 0.3, duration: 0.3, ease: "power2.out" });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Animate background color and text opacity when activeCard changes
    useEffect(() => {
        if (ref.current) {
            gsap.to(ref.current, {
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
                duration: 0.3,
                ease: "power2.out",
            });
        }
        if (gradientRef.current) {
            gradientRef.current.style.transition = "background 500ms";
            gradientRef.current.style.background = linearGradients[activeCard % linearGradients.length];
        }
        textRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, { opacity: activeCard === i ? 1 : 0.3, duration: 0.3, ease: "power2.out" });
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeCard]);

    return (
        <div
            ref={ref}
            className="h-[36rem] overflow-y-auto flex justify-center relative space-x-30 p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            style={{ backgroundColor: backgroundColors[0] }}
        >
            <div className="relative flex items-start px-4">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-48">
                            <div
                                ref={el => { textRefs.current[index] = el; }}
                                style={{ opacity: 0 }}
                            >
                                <h2 className="text-2xl font-bold text-white">
                                    {item.title}
                                </h2>
                                <p className="text-base text-slate-300 max-w-sm mt-10">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                    <div className="h-4" />
                </div>
            </div>
            <div
                ref={gradientRef}
                style={{ background: linearGradients[0] }}
                className={cn(
                    "hidden lg:block h-60 w-80 rounded-xl sticky top-[5rem]",
                    contentClassName
                )}
            >
                <StickyScrollProgressContext.Provider value={scrollValueRef.current}>
                    {content[activeCard].content ?? null}
                </StickyScrollProgressContext.Provider>
            </div>
        </div>
    );
};
