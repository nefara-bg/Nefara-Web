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

    return (
        <section className="min-h-screen py-32 bg-background flex flex-col justify-center">
            <div
                className="relative max-w-7xl px-8 flex mx-auto w-full"
            >
                <div className="flex w-full">
                    {widgetSide === "left" ? (
                        <>
                            <WidgetCell side="left" delay={0.1}>{widget}</WidgetCell>
                            <FeatureCardFlow num={num} title={title} desc={desc} side="right" delay={0.1} />
                        </>
                    ) : (
                        <>
                            <FeatureCardFlow num={num} title={title} desc={desc} side="left" delay={0.1} />
                            <WidgetCell side="right" delay={0.1}>{widget}</WidgetCell>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
