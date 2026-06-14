import type { Metadata } from "next"
import { PageIntro } from "@/components/PageIntro"
import { Reveal } from "@/components/Reveal"
import { MagneticButton } from "@/components/MagneticButton"
import { site } from "@/lib/site"

export const metadata: Metadata = {
  title: "About",
  description:
    "Rishi Kolluru — MS Computer Science student at the University at Buffalo building AI systems across retrieval, agents, and RAG infrastructure.",
}

const EDUCATION = [
  {
    school: "University at Buffalo (SUNY)",
    degree: "M.S. Computer Science & Engineering",
    when: "Aug 2025 — Present",
    where: "Buffalo, NY",
  },
  {
    school: "Institute of Aeronautical Engineering (IARE)",
    degree: "B.Tech Computer Science & Engineering",
    when: "Dec 2021 — Jul 2025",
    where: "Telangana, India",
  },
]

const EXPERIENCE = [
  {
    role: "Software Engineering Intern — Data & ML",
    org: "Pullulate Pvt. Ltd.",
    when: "Feb 2023 — Feb 2025",
    points: [
      "Built scalable Python data ingestion & validation pipelines for ML training and analytics.",
      "Designed REST APIs exposing model inference endpoints and aggregated evaluation metrics.",
      "Implemented automated data-quality monitoring, improving dataset reliability.",
    ],
  },
  {
    role: "Analytics Lead — CETA",
    org: "IARE",
    when: "Apr 2023 — Oct 2024",
    points: [
      "Designed automated dashboards and reproducible analysis pipelines.",
      "Ran controlled experiments on historical data to evaluate uplift.",
      "Documented analytical workflows for repeatability and transparency.",
    ],
  },
]

const PRINCIPLES = [
  "Show systems, not bullet points.",
  "Measure everything — latency and cost are features.",
  "Validate at every boundary.",
  "Build in public; learn from failures.",
  "Reliability beats novelty in production.",
  "High agency, end to end.",
]

const BUILD = [
  "Multimodal & cross-lingual retrieval engines",
  "Multi-agent orchestration platforms",
  "Cost-aware RAG infrastructure with guardrails",
  "Evaluation & observability frameworks",
]

const LEARNING = [
  "Reranking & retrieval evaluation beyond Recall@1",
  "Agent reliability and structured tool-use",
  "Latency/cost trade-offs in LLM serving",
  "Representation learning for cross-modal alignment",
]

const CAPABILITIES = [
  {
    title: "Modeling",
    items: ["CNNs", "LSTMs", "Transformers", "ViT", "XGBoost", "Contrastive"],
  },
  {
    title: "Retrieval",
    items: ["FAISS", "pgvector", "Redis", "Recall@K", "mAP", "HNSW / FlatIP"],
  },
  {
    title: "LLM Systems",
    items: ["RAG", "Multi-agent", "Guardrails", "Evaluation", "Routing"],
  },
  {
    title: "Infrastructure",
    items: ["FastAPI", "Docker", "CI/CD", "PostgreSQL", "REST APIs", "Prometheus"],
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

export default function AboutPage() {
  return (
    <>
      <PageIntro
        index="/about"
        label="The person"
        titleLines={["High-agency", "AI engineer."]}
      />

      <section className="wrap pb-24">
        {/* intro */}
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-2xl leading-relaxed md:text-3xl">
              I&apos;m Rishi — a CS graduate student who builds the kind of AI
              systems serious teams care about.{" "}
              <span className="text-gradient">
                Retrieval, agents, RAG, evaluation.
              </span>{" "}
              I care about systems that actually work: measured, observable, and
              shipped.
            </p>
          </div>
        </Reveal>

        {/* education + experience */}
        <div className="mt-24 grid gap-16 lg:grid-cols-2">
          <div>
            <p className="label mb-8">Education</p>
            <div className="flex flex-col gap-6">
              {EDUCATION.map((e) => (
                <Reveal key={e.school}>
                  <div className="border-l-2 border-[var(--color-line-2)] pl-6">
                    <p className="font-mono text-xs text-cyan">{e.when}</p>
                    <h3 className="mt-2 text-xl font-medium">{e.degree}</h3>
                    <p className="mt-1 text-muted">{e.school}</p>
                    <p className="text-sm text-faint">{e.where}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div>
            <p className="label mb-8">Experience</p>
            <div className="flex flex-col gap-8">
              {EXPERIENCE.map((e) => (
                <Reveal key={e.role}>
                  <div className="border-l-2 border-[var(--color-line-2)] pl-6">
                    <p className="font-mono text-xs text-cyan">{e.when}</p>
                    <h3 className="mt-2 text-xl font-medium">{e.role}</h3>
                    <p className="mt-1 text-muted">{e.org}</p>
                    <ul className="mt-3 flex flex-col gap-2">
                      {e.points.map((p, i) => (
                        <li key={i} className="flex gap-2 text-sm text-muted">
                          <span className="text-green">—</span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* what I build / learning */}
        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <Reveal>
            <div className="card h-full p-8">
              <p className="label mb-6 text-green">What I build</p>
              <ul className="flex flex-col gap-3">
                {BUILD.map((b) => (
                  <li key={b} className="flex gap-3 text-muted">
                    <span className="text-green">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="card h-full p-8">
              <p className="label mb-6 text-violet">What I&apos;m learning</p>
              <ul className="flex flex-col gap-3">
                {LEARNING.map((b) => (
                  <li key={b} className="flex gap-3 text-muted">
                    <span className="text-violet">→</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* skills by capability */}
        <div className="mt-24">
          <p className="label mb-8">Skills by capability</p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((c, i) => (
              <Reveal key={c.title} delay={i * 50}>
                <div className="card h-full p-7">
                  <h3 className="font-mono text-sm uppercase tracking-widest text-[var(--color-blue)]">
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

        {/* operating principles */}
        <div className="mt-24">
          <p className="label mb-8">Operating principles</p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-line)] sm:grid-cols-2 lg:grid-cols-3">
            {PRINCIPLES.map((p, i) => (
              <div key={p} className="bg-[var(--color-surface)] p-7">
                <span className="font-mono text-xs text-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lg leading-snug">{p}</p>
              </div>
            ))}
          </div>
        </div>

        {/* cta */}
        <div className="mt-24 flex flex-wrap items-center gap-3">
          <MagneticButton href="/contact" className="btn btn-primary">
            Get in Touch
          </MagneticButton>
          <MagneticButton
            href={site.github}
            external
            className="btn btn-ghost"
          >
            GitHub ↗
          </MagneticButton>
          <MagneticButton
            href={site.linkedin}
            external
            className="btn btn-ghost"
          >
            LinkedIn ↗
          </MagneticButton>
        </div>
      </section>
    </>
  )
}
