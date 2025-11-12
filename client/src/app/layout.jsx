import { theme } from '@/theme/theme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import { Inter } from "next/font/google"
import "@/app/globals.css"

const inter = Inter({
  subsets: ['latin', 'cyrillic']
})

export async function generateMetadata() {
    const baseUrl = process.env.NEXT_PUBLIC_CLIENT_URL

    return {
        icons: {
            icon: [
                { url: `${baseUrl}/favicon.png`, sizes: "32x32", type: "image/png" },
                { url: `${baseUrl}/tab-logo.png`, type: "image/png", media: "(prefers-color-scheme: light)" },
                { url: `${baseUrl}/tab-logo-dark.png`, type: "image/png", media: "(prefers-color-scheme: dark)" },
            ],
        },
    };
}

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