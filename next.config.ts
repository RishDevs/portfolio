import type { NextConfig } from "next"

const RESUME_PATH = "/Rishi_Kolluru_Resume.pdf"

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
      {
        source: RESUME_PATH,
        headers: [
          { key: "Content-Type", value: "application/pdf" },
          // Opens in the browser's PDF viewer; "Save" keeps a clean filename.
          // The site's buttons use the `download` attribute to save directly.
          {
            key: "Content-Disposition",
            value: 'inline; filename="Rishi-Kolluru-Resume.pdf"',
          },
          // Always revalidate so a replaced résumé is never served stale.
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
          { key: "X-Robots-Tag", value: "noindex" },
        ],
      },
    ]
  },
  async redirects() {
    return [
      { source: "/resume", destination: RESUME_PATH, permanent: false },
      { source: "/cv", destination: RESUME_PATH, permanent: false },
      // Pages from the previous design now live as chapters on the home page.
      { source: "/work/:slug*", destination: "/#contents", permanent: false },
      { source: "/systems", destination: "/#gateway", permanent: false },
      { source: "/lab", destination: "/#stack", permanent: false },
      { source: "/about", destination: "/#about", permanent: false },
      { source: "/contact", destination: "/#contact", permanent: false },
    ]
  },
}

export default nextConfig
