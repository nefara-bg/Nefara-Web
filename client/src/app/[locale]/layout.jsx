import { NextIntlClientProvider } from "next-intl";
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
    <html lang={locale} className={inter.className}>
      <head>
            <link rel="icon" type="image/png" href="/tab-logo.png" media="(prefers-color-scheme: light)" />
            <link rel="icon" type="image/png" href="/tab-logo-dark.png" media="(prefers-color-scheme: dark)" />
            <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32" />

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
        </head>
        <body>
          <div id="root">
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                <NextIntlClientProvider>
                  <Header locale={locale} />
                  {children}
                  <Footer/>
                </NextIntlClientProvider>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </div>
        </body>
    </html>
  )
}