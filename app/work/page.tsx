import type { Metadata } from "next"
import { PageIntro } from "@/components/PageIntro"
import { WorkIndex } from "@/components/work/WorkIndex"

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected systems built across retrieval, agents, LLM infrastructure, and machine learning evaluation.",
}

export default function WorkPage() {
  return (
    <>
      <PageIntro
        index="/work"
        label="Index of systems"
        titleLines={["Selected", "work."]}
        blurb="Projects shown as systems, not résumé bullets — each with architecture, evaluation metrics, and a recruiter takeaway."
      />
      <WorkIndex />
    </>
  )
}
