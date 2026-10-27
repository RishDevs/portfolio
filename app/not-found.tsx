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
          background: "#ec2a7a",
          border: "2.5px solid #16110e",
          boxShadow: "4px 4px 0 #16110e",
          fontFamily: "'Space Mono',monospace",
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: ".08em",
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
          textShadow: "4px 4px 0 #ec2a7a,-3px -2px 0 #0f9a94",
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
          style={{ padding: "14px 22px", background: "#16110e", color: "#ffa41b", border: "3px solid #16110e", boxShadow: "5px 5px 0 #ec2a7a" }}
        >
          Back to the cover →
        </Link>
        <a
          href="/Rishi_Kolluru_Resume.pdf"
          download="Rishi-Kolluru-Resume.pdf"
          style={{ padding: "14px 20px", background: "#ffa41b", border: "3px solid #16110e", boxShadow: "5px 5px 0 #16110e" }}
        >
          Download résumé ↓
        </a>
      </div>
    </main>
  )
}
