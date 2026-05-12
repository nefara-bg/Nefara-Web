"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { KeyboardWidget } from "./KeyboardWidget";
import { QuicxStatsWidget } from "./QuicxStatsWidget";

interface Props {
    s1Title: string;
    s1: string;
    s2Title: string;
    s2: string;
    s3Title: string;
    s3: string;
}

export function TechStickyScroll({ s1Title, s1, s2Title, s2, s3Title, s3 }: Props) {
    const content = [
        {
            title: s1Title,
            description: s1,
            content: <div className="w-full h-full rounded-lg border border-white/20 bg-white/5" />,
        },
        {
            title: s2Title,
            description: s2,
            content: <QuicxStatsWidget />,
        },
        {
            title: s3Title,
            description: s3,
            content: <KeyboardWidget />,
        },
    ];

    return <StickyScroll content={content} />;
}
