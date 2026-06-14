"use client"

import { useState } from "react"
import { Reveal } from "@/components/Reveal"

type Node = {
  id: string
  label: string
  blurb: string
  tools: string[]
  metric: string
}

const NODES: Node[] = [
  {
    id: "data",
    label: "Data",
    blurb:
      "Ingestion, validation, and caching pipelines that turn messy sources into clean, reproducible corpora.",
    tools: ["Wikipedia REST API", "TSV parsing", "retry/caching", "Pandas"],
    metric: "Validated ingestion",
  },
  {
    id: "embeddings",
    label: "Embeddings",
    blurb:
      "Representation learning that maps text and images into a shared semantic space using contrastive objectives.",
    tools: ["ViT-B/32", "Transformers", "Contrastive learning", "HuggingFace"],
    metric: "EN/ES/FR alignment",
  },
  {
    id: "retrieval",
    label: "Retrieval",
    blurb:
      "Vector search over learned embeddings with latency-aware indexing for high-throughput semantic search.",
    tools: ["FAISS (FlatIP/HNSW)", "pgvector", "Redis"],
    metric: "91.7% Recall@1",
  },
  {
    id: "reasoning",
    label: "Reasoning",
    blurb:
      "LLM agents and RAG pipelines that plan, retrieve, and compose answers — with structured validation at every boundary.",
    tools: ["LLM agents", "RAG", "Pydantic", "Prompt engineering"],
    metric: "6-agent orchestration",
  },
  {
    id: "routing",
    label: "Routing",
    blurb:
      "Cost-aware model selection using multi-signal decision logic — intent, risk, and retrieval confidence.",
    tools: ["Dynamic routing", "Risk scoring", "Intent classify"],
    metric: "Cost-optimized",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    blurb:
      "Rigorous measurement: ranking quality, classification metrics, latency, and cost — not just accuracy.",
    tools: ["Recall@K", "mAP", "F1 / ROC-AUC", "P50/P95", "Cost"],
    metric: "0.93 mAP",
  },
  {
    id: "deployment",
    label: "Deployment",
    blurb:
      "Serving, observability, and rollback safety — turning models into reliable, monitored services.",
    tools: ["FastAPI", "Docker", "CI/CD", "Prometheus/Grafana"],
    metric: "Rollback-safe",
  },
]

export function SystemPipeline() {
  const [active, setActive] = useState(2)
  const node = NODES[active]

  return (
    <section className="paper section-pad border-t-2 border-[var(--color-ink)]" id="system">
      <div className="wrap">
        <div className="mb-12 max-w-3xl">
          <p className="spec text-[var(--color-vermillion)]">§ 02 — System Schematic</p>
          <h2 className="display-serif mt-4 text-[clamp(2.4rem,7vw,6rem)]">
            The pipeline behind
            <br />
            <span className="italic">everything I build.</span>
          </h2>
          <p className="mt-6 max-w-xl text-ink-soft">
            ML modeling meets software systems. Select a stage to read the tools
            and proof behind it.
          </p>
        </div>

        {/* schematic rail */}
        <Reveal>
          <div className="hide-scrollbar -mx-2 overflow-x-auto px-2 pb-4">
            <div className="flex min-w-max items-stretch">
              {NODES.map((n, i) => (
                <div key={n.id} className="flex items-center">
                  <button
                    onClick={() => setActive(i)}
                    data-cursor
                    className={`group flex flex-col items-start border px-5 py-4 text-left transition-all duration-300 ${
                      active === i
                        ? "border-[var(--color-ink)] bg-[var(--color-ink)] text-[var(--color-paper)]"
                        : "border-[var(--color-rule)] text-ink-soft hover:border-[var(--color-ink)] hover:text-ink"
                    }`}
                  >
                    <span
                      className={`index-num text-[0.65rem] ${
                        active === i
                          ? "text-[var(--color-lime)]"
                          : "text-ink-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-mono text-sm">{n.label}</span>
                  </button>
                  {i < NODES.length - 1 && (
                    <span className="h-px w-5 bg-[var(--color-rule)] sm:w-8" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* detail */}
        <div className="mt-8 grid gap-px overflow-hidden border border-[var(--color-ink)] bg-[var(--color-ink)] md:grid-cols-[1.5fr_1fr]">
          <div
            key={node.id}
            className="bg-[var(--color-paper)] p-8 md:p-12"
            style={{ animation: "fadeUp 0.5s ease" }}
          >
            <p className="spec text-[var(--color-vermillion)]">
              Stage {String(active + 1).padStart(2, "0")} / {NODES.length} — {node.label}
            </p>
            <p className="mt-5 max-w-[52ch] text-xl leading-relaxed text-ink md:text-2xl">
              {node.blurb}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {node.tools.map((t) => (
                <span key={t} className="chip-ink">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 bg-[var(--color-ink)] p-8 text-[var(--color-paper)] md:p-10">
            <p className="spec text-[var(--color-lime)]">Proof</p>
            <p className="display-lg text-[var(--color-paper)]">{node.metric}</p>
            <p className="font-mono text-[0.65rem] leading-relaxed text-[var(--color-paper)]/60">
              data → embeddings → retrieval → reasoning → routing → evaluation →
              deployment
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { scrollbar-width: none; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: none; } }
      `}</style>
    </section>
  )
}
