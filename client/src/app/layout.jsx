import { hasLocale } from "next-intl"
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { theme } from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({
  subsets: ['latin', 'cyrillic']
})

export default async function RootLayout({ children, params }) {
  return (
    <html className={inter.className} data-scroll-behaviour="smooth">
        <body>
          <div id="root">
            <AppRouterCacheProvider>
              <ThemeProvider theme={theme}>
                {children}
              </ThemeProvider>
            </AppRouterCacheProvider>
          </div>
        </body>
    </html>
  )
}