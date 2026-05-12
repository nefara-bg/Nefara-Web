"use client";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll, MotionValue } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const StickyScrollProgressContext = createContext<MotionValue<number> | null>(null)
export const useStickyScrollProgress = () => useContext(StickyScrollProgressContext)

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
    const [activeCard, setActiveCard] = React.useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        container: ref,
        offset: ["start start", "end start"],
    });
    const cardLength = content.length;

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const cardsBreakpoints = content.map((_, index) => index / cardLength);
        const closestBreakpointIndex = cardsBreakpoints.reduce(
            (acc, breakpoint, index) => {
                const distance = Math.abs(latest - breakpoint);
                if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
                    return index;
                }
                return acc;
            },
            0
        );
        setActiveCard(closestBreakpointIndex);
    });

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

    const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

    useEffect(() => {
        setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
    }, [activeCard]);

    return (
        <motion.div
            animate={{
                backgroundColor: backgroundColors[activeCard % backgroundColors.length],
            }}
            className="h-[28rem] overflow-y-auto flex justify-center relative space-x-30 p-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            ref={ref}
        >
            <div className="relative flex items-start px-4">
                <div className="max-w-2xl">
                    {content.map((item, index) => (
                        <div key={item.title + index} className="my-20">
                            <motion.h2
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-2xl font-bold text-white"
                            >
                                {item.title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: activeCard === index ? 1 : 0.3 }}
                                className="text-base text-slate-300 max-w-sm mt-10"
                            >
                                {item.description}
                            </motion.p>
                        </div>
                    ))}
                    <div className="h-4" />
                </div>
            </div>
            <div
                style={{ background: backgroundGradient }}
                className={cn(
                    "hidden lg:block h-60 w-80 rounded-xl sticky top-[5rem] transition-all duration-500",
                    contentClassName
                )}
            >
                <StickyScrollProgressContext.Provider value={scrollYProgress}>
                    {content[activeCard].content ?? null}
                </StickyScrollProgressContext.Provider>
            </div>
        </motion.div>
    );
};
