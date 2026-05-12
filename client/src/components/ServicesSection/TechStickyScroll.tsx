"use client";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";
import { KeyboardWidget } from "./KeyboardWidget";
import { QuicxStatsWidget } from "./QuicxStatsWidget";
import { PrinterWidget } from "./PrinterWidget";

interface Props {
    s1Title: string;
    s1: string;
    s1Keywords: string[];
    s2Title: string;
    s2: string;
    s3Title: string;
    s3: string;
}

export function TechStickyScroll({ s1Title, s1, s1Keywords, s2Title, s2, s3Title, s3 }: Props) {
    const content = [
        {
            title: s1Title,
            description: s1,
            content: <PrinterWidget keywords={s1Keywords} />,
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
