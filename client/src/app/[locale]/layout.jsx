import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getMessages, setRequestLocale } from "next-intl/server"
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