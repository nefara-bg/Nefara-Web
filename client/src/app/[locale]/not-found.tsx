import { Link } from "@/i18n/navigation"
import { getLocale, getTranslations } from "next-intl/server"
import { Button } from "@/components/ui/button"

export default async function NotFound() {
    // Get locale from next-intl context (extracted from the route)
    const locale = await getLocale();

    // Get translations for the locale
    const t = await getTranslations({ locale });

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-16 px-4 text-center">
            <h2 className="text-6xl font-bold text-primary mb-6">404</h2>

            <h4 className="text-3xl font-semibold mb-2 text-foreground">{t("notFound.title")}</h4>
            <p className="text-sm text-muted-foreground mb-8 max-w-md">{t("notFound.content")}</p>

            <Link href="/">
                <Button size="lg">
                    {t("notFound.button")}
                </Button>
            </Link>
        </div>
    )
}
