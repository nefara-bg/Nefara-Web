import { Inter } from "next/font/google"
import { validateClientUrl } from "@/utils/env/env"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({
    subsets: ['latin', 'cyrillic']
})

export async function generateMetadata() {
    const baseUrl = validateClientUrl(process.env.NEXT_PUBLIC_CLIENT_URL)

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className={inter.className} data-scroll-behaviour="smooth">
            <body>
                <div id="root">
                    {children}
                    <Toaster />
                </div>
            </body>
        </html>
    )
}
