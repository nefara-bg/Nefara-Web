import { hasLocale } from "next-intl"
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { theme } from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from "next/font/google"
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import "@/app/globals.css"

const inter = Inter({
  subsets: ['latin', 'cyrillic']
})

export default async function RootLayout({ children, params }) {
  // Ensure that the incoming `locale` is valid
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <>
      <Header locale={locale} />
      {children}
      <Footer/>
    </>
  )
}