import type { Metadata, Viewport } from "next"
import { preload } from "react-dom"
import "./globals.css"

const title = "Rishi Kolluru — ML / AI Engineer · Issue 01"
const description =
  "Rishi Kolluru — ML / AI engineer (MS CS, University at Buffalo, Dec 2026). LLM serving at 12.2× throughput, hybrid retrieval +12.6 nDCG@10, and a distilled cascade with 68% fewer LLM calls."

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Rishi Kolluru", url: "https://github.com/RishDevs" }],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Rishi Kolluru",
    images: [{ url: "/rishi-comic.jpg", width: 880, height: 1320, alt: "Rishi Kolluru, illustrated as a comic hero" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/rishi-comic.jpg"] },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4e9d2",
}

// Runs before first paint: enables the pre-reveal hiding in globals.css, with a
// failsafe that reveals everything if the page runtime never starts.
const bootScript = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!d.dataset.issueReady)d.classList.remove('js')},5000)})();`

const preloadFonts = [
  "/fonts/archivo-latin.woff2",
  "/fonts/rozha-one-latin.woff2",
  "/fonts/space-mono-400-latin.woff2",
]

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // React dedupes these; hand-written <link rel="preload"> tags were emitted twice.
  preloadFonts.forEach((href) => preload(href, { as: "font", type: "font/woff2", crossOrigin: "anonymous" }))
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
      </head>
      <body>{children}</body>
    </html>
  )
}
