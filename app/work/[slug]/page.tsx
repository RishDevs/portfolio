import { notFound } from "next/navigation"
import Link from "next/link"
import { projects, getProject } from "@/lib/projects"
import type { Metadata } from "next"
import { CaseStudyClient } from "./CaseStudyClient"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) return {}
  return {
    title: project.title,
    description: project.description,
  }
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)
  if (!project) notFound()

  const currentIndex = projects.findIndex((p) => p.slug === slug)
  const next = projects[(currentIndex + 1) % projects.length]

  return <CaseStudyClient project={project} next={next} />
}
