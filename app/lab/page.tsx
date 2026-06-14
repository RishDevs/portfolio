import type { Metadata } from "next"
import { PageIntro } from "@/components/PageIntro"
import { LabGrid } from "@/components/lab/LabGrid"

export const metadata: Metadata = {
  title: "Lab",
  description:
    "A live archive of experiments, failures, benchmarks, and notes from building AI systems in public.",
}

export default function LabPage() {
  return (
    <>
      <PageIntro
        index="/lab"
        label="Building in public"
        titleLines={["The lab."]}
        blurb="A live archive of experiments, benchmarks, and notes from building AI systems in public. Some shipped, some in testing."
      />
      <LabGrid />
    </>
  )
}
