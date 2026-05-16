import { getTranslations } from "next-intl/server"
import * as motion from "motion/react-client"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"

export async function TeamCTABanner() {
    const t = await getTranslations("about.teamSection.cta")

    return (
        <div className="mx-auto max-w-7xl px-6 lg:px-10 mb-20 lg:mb-28">
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="dark-section relative flex flex-col justify-between min-h-[300px] rounded-2xl overflow-hidden px-10 pt-10 pb-10 lg:px-14 lg:pt-12 lg:pb-12"
            >
                {/* Heading */}
                <h2 className="font-display text-4xl lg:text-6xl font-bold leading-[1.05] tracking-tight max-w-xl">
                    {t("heading")}
                </h2>

                {/* Button — bottom right */}
                <div className="flex justify-end mt-10">
                    <Link
                        href="/work"
                        className="group inline-flex items-center gap-2 text-sm font-semibold border-b pb-0.5 transition-colors"
                        style={{
                            color: "hsl(var(--primary))",
                            borderColor: "hsl(var(--primary) / 0.4)",
                        }}
                    >
                        {t("button")}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </motion.div>
        </div>
    )
}
