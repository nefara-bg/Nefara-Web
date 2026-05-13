import { ReactNode } from "react"
import { CONTAINER_STYLE } from "@/config/container"
import FeatureCardFlow from "./FeatureCardFlow"
import WidgetCell from "./WidgetCell"

export function MissionRowSection({
    num,
    title,
    desc,
    widget,
    widgetSide,
}: {
    num: string
    title: string
    desc: string
    widget: ReactNode
    widgetSide: "left" | "right"
}) {
    const cardSide = widgetSide === "left" ? "right" : "left"
    const horizontalOffset = "4"

    return (
        <section className="min-h-screen md:h-screen py-16 md:py-32 bg-background flex flex-col justify-center md:overflow-hidden" style={{ transform: "translateZ(0)" }}>
            <div
                className={`relative max-w-7xl px-${horizontalOffset} flex items-center mx-auto w-full flex-1`}
            >
                <div className={`flex w-full h-full items-stretch ${widgetSide === "left" ? "flex-col-reverse md:flex-row" : "flex-col md:flex-row"}`}>
                    {widgetSide === "left" ? (
                        <>
                            <WidgetCell lineOffset={horizontalOffset} side="left" delay={0.1}>{widget}</WidgetCell>
                            <FeatureCardFlow num={num} title={title} desc={desc} side="right" delay={0.1} />
                        </>
                    ) : (
                        <>
                            <FeatureCardFlow num={num} title={title} desc={desc} side="left" delay={0.1} />
                            <WidgetCell lineOffset={horizontalOffset} side="right" delay={0.1}>{widget}</WidgetCell>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
