import { Manrope, Nunito_Sans, Poppins } from "next/font/google"
import { validateClientUrl } from "@/utils/env/env"
import "@/app/globals.css"
import { Toaster } from "@/components/ui/sonner"

const manrope = Manrope({
    subsets: ["latin", "cyrillic"],
    weight: ["500", "600", "700", "800"],
    variable: "--font-manrope",
    display: "swap",
})

const nunitoSans = Nunito_Sans({
    subsets: ["latin", "cyrillic"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-nunito-sans",
    display: "swap",
})

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-poppins",
    display: "swap",
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
        <html className={`${manrope.variable} ${nunitoSans.variable} ${poppins.variable}`} data-scroll-behaviour="smooth">
            <body>
                <div id="root">
                    {children}
                    <Toaster />
                </div>
            </body>
        </html>
    )
}
