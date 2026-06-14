import type { Metadata } from "next"
import Link from "next/link"
import { PageIntro } from "@/components/PageIntro"
import { Reveal } from "@/components/Reveal"

export const metadata: Metadata = {
  title: "Systems",
  description:
    "Rishi Kolluru as a systems thinker: retrieval systems, agentic systems, RAG infrastructure, ML evaluation, and deployment & observability.",
}

const SYSTEMS = [
  {
    n: "01",
    title: "Retrieval Systems",
    desc: "I build systems that convert unstructured data into searchable embedding spaces, then retrieve at low latency and high recall.",
    flow: ["Data", "Embeddings", "Vector Index", "Top-K", "Re-rank"],
    tools: ["FAISS", "pgvector", "Redis", "ViT", "Contrastive learning"],
    proof: "91.7% Recall@1 · 0.93 mAP",
    project: {
      label: "Multilingual Retrieval Engine",
      href: "/work/multilingual-multimodal-retrieval",
    },
  },
  {
    n: "02",
    title: "Agentic Systems",
    desc: "Multi-agent orchestration with structured validation at every boundary — planning, generation, testing, and review as cooperating agents.",
    flow: ["Task", "Planner", "Coder", "Tester", "Security", "Review"],
    tools: ["LLM agents", "Pydantic", "FastAPI", "CI/CD"],
    proof: "6-agent platform · 0 unhandled failures in test",
    project: {
      label: "Software Delivery Control Tower",
      href: "/work/ai-software-delivery-control-tower",
    },
  },
  {
    n: "03",
    title: "RAG Infrastructure",
    desc: "Retrieval-augmented generation with routing, reranking, guardrails, and caching — designed for cost, latency, and safety.",
    flow: ["Query", "Router", "Retriever", "Reranker", "Guardrails", "LLM"],
    tools: ["pgvector", "Redis", "Dynamic routing", "PII redaction"],
    proof: "P95 −60% with caching · cost-aware routing",
    project: {
      label: "Cost-Aware LLM Copilot",
      href: "/work/cost-aware-llm-support-copilot",
    },
  },
  {
    n: "04",
    title: "ML Evaluation",
    desc: "Measurement as a first-class concern: ranking quality, classification metrics, latency percentiles, and cost — not just accuracy.",
    flow: ["Predictions", "Metrics", "Slices", "Latency", "Cost"],
    tools: ["Recall@K", "mAP", "F1 / ROC-AUC", "RMSE", "P50/P95"],
    proof: "mAP adds ~30% more signal vs Recall@1 alone",
    project: { label: "The Lab", href: "/lab" },
  },
  {
    n: "05",
    title: "Deployment & Observability",
    desc: "Turning models into reliable, monitored services with rollback safety and full request-level observability.",
    flow: ["Model", "API", "Container", "Monitor", "Rollback"],
    tools: ["FastAPI", "Docker", "CI/CD", "Prometheus/Grafana"],
    proof: "Observable, rollback-safe deployments",
    project: {
      label: "Software Delivery Control Tower",
      href: "/work/ai-software-delivery-control-tower",
    },
  },
]

export default function SystemsPage() {
  return (
    <>
      <PageIntro
        index="/systems"
        label="Systems thinking"
        titleLines={["I think in", "systems."]}
        blurb="My work sits at the intersection of ML modeling and software systems — data pipelines, embeddings, vector search, routing logic, evaluation, APIs, and deployment."
        watermark="SYS"
        keywords={[
          "Retrieval",
          "Agentic",
          "RAG infra",
          "Evaluation",
          "Deployment",
          "Observability",
        ]}
      />

      <section className="wrap pb-32">
        <div className="flex flex-col gap-6">
          {SYSTEMS.map((s, i) => (
            <Reveal key={s.n} delay={i * 60}>
              <div className="card group grid gap-8 p-8 transition-all duration-500 hover:border-[var(--color-blue)]/50 hover:shadow-[0_0_70px_-24px_rgba(45,125,255,0.55)] md:grid-cols-[1fr_1.1fr] md:p-12">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm text-faint">{s.n}</span>
                    <span className="h-px flex-1 bg-[var(--color-line)]" />
                  </div>
                  <h2 className="display-lg mt-6">{s.title}</h2>
                  <p className="mt-5 max-w-[48ch] leading-relaxed text-muted">
                    {s.desc}
                  </p>
                  <Link
                    href={s.project.href}
                    data-cursor
                    className="link-underline mt-6 inline-block font-mono text-xs uppercase tracking-widest text-green"
                  >
                    → {s.project.label}
                  </Link>
                </div>

                <div className="flex flex-col justify-between gap-8">
                  {/* node flow */}
                  <div className="flex flex-wrap items-center gap-2">
                    {s.flow.map((node, j) => (
                      <span key={node} className="flex items-center gap-2">
                        <span className="rounded-full border border-[var(--color-line-2)] px-3 py-1.5 font-mono text-xs text-muted transition-colors duration-300 group-hover:border-[var(--color-blue)]/40 group-hover:text-text">
                          {node}
                        </span>
                        {j < s.flow.length - 1 && (
                          <span className="text-[var(--color-red)]">→</span>
                        )}
                      </span>
                    ))}
                  </div>

                  <div>
                    <p className="label-sm mb-3 text-faint">Tools</p>
                    <div className="flex flex-wrap gap-2">
                      {s.tools.map((t) => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-bg)] p-5">
                    <p className="label-sm text-faint">Proof</p>
                    <p className="mt-2 font-mono text-green">{s.proof}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
