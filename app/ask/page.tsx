import type { Metadata } from "next"
import Link from "next/link"
import { AskChat } from "@/components/ask/AskChat"
import s from "@/components/ask/ask.module.css"

export const metadata: Metadata = {
  title: "Ask Rishi's AI — Issue 01",
  description:
    "Ask about Rishi Kolluru's projects, skills and engineering decisions. Answers come only from his résumé, project READMEs and portfolio, with sources.",
}

export default function AskPage() {
  return (
    <main className={s.page}>
      <nav className={s.pageTop} aria-label="Site">
        <Link href="/" className={s.pageLink}>Back to the portfolio</Link>
        <a href="/Rishi_Kolluru_Resume.pdf" download="Rishi-Kolluru-Resume.pdf" className={s.pageLink}>Résumé</a>
      </nav>
      <section className={s.pageCard}>
        <AskChat titleId="ask-title" />
      </section>
    </main>
  )
}
