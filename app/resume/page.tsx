import type { Metadata } from "next"
import { PageIntro } from "@/components/PageIntro"
import { Reveal } from "@/components/Reveal"
import { MagneticButton } from "@/components/MagneticButton"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "Résumé",
  description:
    "Rishi Kolluru's résumé — skills grouped by system capability across modeling, retrieval, LLM systems, infrastructure, and evaluation.",
}

const CAPABILITIES = [
  {
    title: "Modeling",
    items: ["CNNs", "LSTMs", "Transformers", "ViT", "XGBoost", "Contrastive learning"],
  },
  {
    title: "Retrieval",
    items: ["FAISS", "pgvector", "Redis", "Recall@K", "mAP", "HNSW / FlatIP"],
  },
  {
    title: "LLM Systems",
    items: ["RAG", "Multi-agent", "Guardrails", "Evaluation", "Dynamic routing"],
  },
  {
    title: "Infrastructure",
    items: ["FastAPI", "Docker", "CI/CD", "PostgreSQL", "REST APIs", "Prometheus/Grafana"],
  },
  {
    title: "Evaluation",
    items: ["F1", "ROC-AUC", "RMSE", "P50/P95", "Cost metrics", "SLA tracking"],
  },
  {
    title: "Languages",
    items: ["Python", "SQL", "Java", "C", "JavaScript"],
  },
]

const EXPERIENCE = [
  {
    role: "Software Engineering Intern (Data & ML)",
    org: "Pullulate Pvt. Ltd.",
    when: "Feb 2023 — Feb 2025",
  },
  {
    role: "Analytics Lead — CETA",
    org: "IARE",
    when: "Apr 2023 — Oct 2024",
  },
]

const EDUCATION = [
  {
    degree: "M.S. Computer Science & Engineering",
    org: "University at Buffalo (SUNY)",
    when: "2025 — Present",
  },
  {
    degree: "B.Tech Computer Science & Engineering",
    org: "Institute of Aeronautical Engineering",
    when: "2021 — 2025",
  },
]

export default function ResumePage() {
  return (
    <>
      <PageIntro
        index="/resume"
        label="Recruiter view"
        titleLines={["Résumé."]}
      />

      <section className="wrap pb-32">
        {/* recruiter summary + download */}
        <div className="card flex flex-col gap-8 p-8 md:flex-row md:items-center md:justify-between md:p-12">
          <p className="max-w-2xl text-lg leading-relaxed text-muted">
            <span className="text-green">Recruiter summary — </span>
            AI/ML engineer building production-grade systems across multimodal
            retrieval, multi-agent orchestration, and cost-aware RAG. I turn ML
            modeling into reliable software: pipelines, vector search, routing,
            evaluation, and deployment.
          </p>
          <MagneticButton
            href={site.resumePath}
            external
            className="btn btn-primary shrink-0"
          >
            Download PDF ↓
          </MagneticButton>
        </div>

        {/* skills by capability */}
        <div className="mt-20">
          <p className="label mb-8">Skills by capability</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <div className="card h-full p-7">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-green">
                    {c.title}
                  </h3>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {c.items.map((item) => (
                      <span key={item} className="chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* experience + education */}
        <div className="mt-20 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="label mb-8">Experience</p>
            <div className="flex flex-col">
              {EXPERIENCE.map((e) => (
                <div
                  key={e.role}
                  className="flex flex-col gap-1 border-b border-[var(--color-line)] py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-medium">{e.role}</h3>
                    <p className="text-muted">{e.org}</p>
                  </div>
                  <span className="font-mono text-xs text-faint">{e.when}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="label mb-8">Education</p>
            <div className="flex flex-col">
              {EDUCATION.map((e) => (
                <div
                  key={e.degree}
                  className="flex flex-col gap-1 border-b border-[var(--color-line)] py-5 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <div>
                    <h3 className="text-lg font-medium">{e.degree}</h3>
                    <p className="text-muted">{e.org}</p>
                  </div>
                  <span className="font-mono text-xs text-faint">{e.when}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* contact line */}
        <div className="mt-20 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[var(--color-line)] pt-8 font-mono text-sm text-muted">
          <a href={`mailto:${site.email}`} className="hover:text-text" data-cursor>
            {site.email}
          </a>
          <span className="text-faint">{site.phone}</span>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text"
            data-cursor
          >
            LinkedIn ↗
          </a>
          <a
            href={site.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-text"
            data-cursor
          >
            GitHub ↗
          </a>
        </div>
      </section>
    </>
  )
}
