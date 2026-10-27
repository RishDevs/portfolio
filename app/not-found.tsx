import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Page not found — Rishi Kolluru",
}

// Styled to match the "Issue 01" design (same palette, type and comic panels).
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        gap: 24,
        maxWidth: 1360,
        margin: "0 auto",
        padding: "80px clamp(16px,3.2vw,40px)",
      }}
    >
      <span
        style={{
          padding: "6px 12px",
          background: "#ffa41b",
          border: "2px solid #16110e",
          fontFamily: "Archivo,sans-serif",
          fontStretch: "75%",
          fontSize: 13,
          fontWeight: 800,
          letterSpacing: ".05em",
          textTransform: "uppercase",
        }}
      >
        Error 404 · Missing panel
      </span>
      <h1
        style={{
          margin: 0,
          fontFamily: "'Rozha One',serif",
          fontWeight: 400,
          fontSize: "clamp(56px,9vw,140px)",
          lineHeight: 0.85,
          textShadow: "3px 3px 0 #ec2a7a",
        }}
      >
        This page isn&apos;t in the issue.
      </h1>
      <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.5 }}>
        The link may be old. Everything lives on one page now.
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          fontFamily: "Archivo,sans-serif",
          fontStretch: "75%",
          fontWeight: 800,
          fontSize: 17,
          letterSpacing: ".03em",
          textTransform: "uppercase",
        }}
      >
        <Link
          href="/"
          style={{ padding: "14px 22px", background: "#16110e", color: "#ffa41b", border: "3px solid #16110e", minHeight: 44, display: "inline-flex", alignItems: "center" }}
        >
          Back to the cover
        </Link>
        <a
          href="/Rishi_Kolluru_Resume.pdf"
          download="Rishi-Kolluru-Resume.pdf"
          style={{ padding: "14px 20px", background: "#ffa41b", border: "3px solid #16110e", minHeight: 44, display: "inline-flex", alignItems: "center" }}
        >
          Download résumé
        </a>
      </div>
    </main>
  )
}
