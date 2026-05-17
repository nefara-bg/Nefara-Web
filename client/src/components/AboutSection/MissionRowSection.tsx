import { ReactNode } from "react"
import FeatureCardFlow from "./FeatureCardFlow"
import WidgetCell from "./WidgetCell"

export function MissionRowSection({
    num,
    title,
    desc,
    widget,
}: {
    num: string
    title: string
    desc: string
    widget: ReactNode
}) {
    return (
        <section
            className="relative min-h-screen py-16 md:py-32 bg-background flex flex-col justify-center"
            style={{ transform: "translateZ(0)" }}
        >
            <div className="relative max-w-7xl px-4 flex items-center mx-auto w-full flex-1">
                <div className="flex w-full h-full items-stretch flex-col md:flex-row">
                    <FeatureCardFlow num={num} title={title} desc={desc} />
                    <div className="w-full h-full">
                        <WidgetCell>{widget}</WidgetCell>
                    </div>
                </div>
            </div>
        </section>
    )
}
