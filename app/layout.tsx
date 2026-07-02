import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LocaleProvider } from "@/components/locale-provider"
import "./globals.css"

// Configure fonts with proper options
const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist',
  display: 'swap',
})
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono',
  display: 'swap',
})
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: '--font-space-grotesk',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nookcraftlab.com'),
  title: {
    default: "NookCraftLab — Think What You Want, Build What You Want",
    template: "%s | NookCraftLab",
  },
  description:
    "Custom mechanical keyboard studio. Premium artisan keycaps, custom keyboards, and bespoke typing experiences crafted with precision.",
  keywords: ["custom keyboard", "mechanical keyboard", "artisan keycaps", "custom keyset", "NookCraftLab", "客制化键盘", "定制键盘"],
  authors: [{ name: "NookCraftLab" }],
  creator: "NookCraftLab",
  publisher: "NookCraftLab",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "/",
    title: "NookCraftLab — Think What You Want, Build What You Want",
    description: "Custom mechanical keyboard studio. Premium artisan keycaps, custom keyboards, and bespoke typing experiences.",
    siteName: "NookCraftLab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "NookCraftLab — Custom Mechanical Keyboard Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NookCraftLab — Think What You Want, Build What You Want",
    description: "Custom mechanical keyboard studio. Premium artisan keycaps, custom keyboards, and bespoke typing experiences.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning className={`${geist.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <LocaleProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={true} storageKey="theme-mode">
            {children}
          </ThemeProvider>
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  )
}
