"use client"

import { useState } from "react"
import { RevealLines, Reveal } from "@/components/Reveal"

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
      "Ingestion, validation, and caching pipelines that turn messy sources into clean, reproducible training and retrieval corpora.",
    tools: ["Wikipedia REST API", "TSV parsing", "retry/caching", "Pandas"],
    metric: "Reliable, validated ingestion",
  },
  {
    id: "embeddings",
    label: "Embeddings",
    blurb:
      "Representation learning that maps text and images into a shared semantic space using contrastive objectives.",
    tools: ["ViT-B/32", "Transformers", "Contrastive learning", "HuggingFace"],
    metric: "Cross-lingual EN/ES/FR alignment",
  },
  {
    id: "retrieval",
    label: "Retrieval",
    blurb:
      "Vector search over learned embeddings with latency-aware indexing strategies for high-throughput semantic search.",
    tools: ["FAISS (FlatIP/HNSW)", "pgvector", "Redis"],
    metric: "91.7% Recall@1 · <1ms",
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
    metric: "Cost-optimized selection",
  },
  {
    id: "evaluation",
    label: "Evaluation",
    blurb:
      "Rigorous measurement: ranking quality, classification metrics, latency, and cost — not just accuracy.",
    tools: ["Recall@K", "mAP", "F1 / ROC-AUC", "P50/P95", "Cost metrics"],
    metric: "0.93 mAP · tracked SLAs",
  },
  {
    id: "deployment",
    label: "Deployment",
    blurb:
      "Serving, observability, and rollback safety — turning models into reliable, monitored services.",
    tools: ["FastAPI", "Docker", "CI/CD", "Prometheus/Grafana"],
    metric: "Observable, rollback-safe",
  },
]

export function SystemPipeline() {
  const [active, setActive] = useState(2)
  const node = NODES[active]

  return (
    <section
      className="section-pad relative border-y border-[var(--color-line)] bg-[var(--color-surface)]"
      id="system"
    >
      <div className="wrap">
        <div className="mb-12 max-w-3xl">
          <p className="label mb-5">/ 02 — System Map</p>
          <RevealLines
            className="display-xl"
            lines={["The pipeline behind", "everything I build."]}
          />
          <p className="mt-6 max-w-xl text-muted">
            My work sits at the intersection of ML modeling and software
            systems. Tap a stage to see the tools and proof behind it.
          </p>
        </div>

        {/* pipeline rail */}
        <Reveal className="relative">
          <div className="hide-scrollbar -mx-2 overflow-x-auto px-2 pb-4">
            <div className="flex min-w-max items-center gap-2">
              {NODES.map((n, i) => (
                <div key={n.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setActive(i)}
                    data-cursor
                    className={`group relative rounded-full border px-5 py-3 font-mono text-sm transition-all duration-300 ${
                      active === i
                        ? "border-green bg-green/10 text-green"
                        : "border-[var(--color-line-2)] text-muted hover:text-text"
                    }`}
                  >
                    <span className="mr-2 text-xs text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {n.label}
                  </button>
                  {i < NODES.length - 1 && (
                    <span
                      className={`h-px w-6 transition-colors duration-300 sm:w-10 ${
                        active === i ? "bg-green" : "bg-[var(--color-line-2)]"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* detail panel */}
        <div className="card mt-8 grid gap-8 p-8 md:grid-cols-[1.4fr_1fr] md:p-12">
          <div key={node.id} style={{ animation: "fadeUp 0.5s ease" }}>
            <p className="label-sm text-green">
              Stage {String(active + 1).padStart(2, "0")} / {NODES.length}
            </p>
            <h3 className="display-lg mt-4">{node.label}</h3>
            <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-muted">
              {node.blurb}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {node.tools.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[var(--color-line)] bg-[var(--color-bg)] p-7">
            <p className="label-sm text-faint">Proof</p>
            <p className="display-lg text-gradient">{node.metric}</p>
            <p className="font-mono text-xs text-faint">
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
