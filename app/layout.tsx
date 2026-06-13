import type { Metadata } from "next"
import { Inter, IBM_Plex_Mono } from "next/font/google"
import "./globals.css"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
import { CursorGlow } from "@/components/CursorGlow"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { CommandMenu } from "@/components/CommandMenu"
import { PreloaderExperience } from "@/components/PreloaderExperience"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-mono-custom",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Rishi Kolluru — AI Systems, Retrieval, Agents",
  description:
    "I build AI systems that retrieve, reason, route, and ship. MS Computer Science student at University at Buffalo focused on multimodal retrieval, LLM agents, RAG pipelines, and production-grade ML systems.",
  keywords: ["AI engineer", "ML engineer", "RAG", "retrieval", "LLM agents", "machine learning"],
  authors: [{ name: "Rishi Kolluru" }],
  openGraph: {
    title: "Rishi Kolluru — AI Systems, Retrieval, Agents",
    description: "I build AI systems that retrieve, reason, route, and ship.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishi Kolluru — AI Systems Engineer",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <body className="noise">
        <PreloaderExperience />
        <SmoothScrollProvider>
          <CursorGlow />
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <CommandMenu />
      </body>
    </html>
  )
}
