import { Link } from "@/i18n/navigation"
import { getLocale, getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function NotFound() {
    const locale = await getLocale()
    const t = await getTranslations({ locale })

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center bg-background overflow-hidden">
            <div className="absolute inset-0 grid-pattern opacity-50 -z-10" />
            <div
                className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full -z-10"
                style={{
                    background:
                        "radial-gradient(circle, hsl(var(--primary) / 0.18) 0%, transparent 70%)",
                }}
            />

            <p className="font-display text-[clamp(7rem,18vw,12rem)] font-extrabold leading-none bg-gradient-to-br from-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent select-none">
                404
            </p>

            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                {t("notFound.title")}
            </h1>
            <p className="text-muted-foreground max-w-md mb-8">{t("notFound.content")}</p>

            <Link href="/">
                <Button size="lg">
                    <ArrowLeft className="w-4 h-4" />
                    {t("notFound.button")}
                </Button>
            </Link>
        </div>
    )
}
