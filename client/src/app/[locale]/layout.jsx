import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation";
import { locales, routing } from "@/i18n/routing";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css"

export async function generateStaticParams() {
  const staticParams = locales.map((locale) => ({ locale }))
  console.log(staticParams)
  return staticParams
}

export async function generateMetadata({params}) {
    const {locale} = await params;
    const t = await getTranslations({locale});

    const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL

    return {
        title: t("seo.title"),
        description: t("seo.description"),
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                en: `${baseUrl}/en`,
                bg: `${baseUrl}/bg`,
                "x-default": `${baseUrl}/en`,
            },
        },
        openGraph: {
            title: t("seo.title"),
            description: t("seo.description"),
            type: "website",
            images: [`${baseUrl}/meta.webp`],
        },
        twitter: {
            card: "summary_large_image",
            title: t("seo.title"),
            description: t("seo.description"),
            images: [`${baseUrl}/meta.webp`],
        },
    };
}

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale)

  // Load messages for the current locale - explicitly pass locale for static generation
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Header locale={locale} />
      {children}
      <Footer/>
    </NextIntlClientProvider>
  )
}