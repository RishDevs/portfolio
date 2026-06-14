import type { Metadata } from "next"
import { Space_Grotesk, IBM_Plex_Mono, Instrument_Serif } from "next/font/google"
import "./globals.css"
import { site } from "@/lib/site"
import { SmoothScroll } from "@/components/SmoothScroll"
import { Cursor } from "@/components/Cursor"
import { Grain } from "@/components/Grain"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CommandMenu } from "@/components/CommandMenu"
import { Preloader } from "@/components/Preloader"

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
})

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["italic", "normal"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://rishikolluru.com"),
  title: {
    default: "Rishi Kolluru — AI Research Engineer",
    template: "%s — Rishi Kolluru",
  },
  description: site.subtitle,
  keywords: [
    "Rishi Kolluru",
    "AI engineer",
    "ML engineer",
    "multimodal retrieval",
    "RAG",
    "LLM agents",
    "machine learning",
    "University at Buffalo",
  ],
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    title: "Rishi Kolluru — AI Research Engineer",
    description: site.tagline,
    type: "website",
    siteName: "Rishi Kolluru",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Kolluru — AI Research Engineer",
    description: site.tagline,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${mono.variable} ${serif.variable}`}
    >
      <body>
        <Preloader />
        <Grain />
        <Cursor />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
        <CommandMenu />
      </body>
    </html>
  )
}
