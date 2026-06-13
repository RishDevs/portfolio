"use client"

import { useRef, useState } from "react"

const items = [
  { label: "91.7% Recall@1", detail: "Multilingual multimodal retrieval" },
  { label: "0.93 mAP", detail: "On Google Research WIT dataset" },
  { label: "FAISS Retrieval", detail: "FlatIP & HNSW indexing" },
  { label: "ViT-B/32", detail: "Vision Transformer dual encoder" },
  { label: "6-Agent Platform", detail: "Multi-agent orchestration system" },
  { label: "RAG + Dynamic Routing", detail: "Cost-aware LLM selection" },
  { label: "P50/P95 Latency", detail: "Full observability stack" },
  { label: "PyTorch", detail: "Deep learning framework" },
  { label: "FastAPI", detail: "Production REST APIs" },
  { label: "pgvector", detail: "PostgreSQL vector extension" },
  { label: "Redis", detail: "High-performance caching" },
  { label: "Docker", detail: "Containerized deployments" },
  { label: "Pydantic", detail: "Structured output validation" },
  { label: "Prometheus/Grafana", detail: "System observability" },
]

export function ProofMarquee() {
  const [paused, setPaused] = useState(false)
  const [tooltip, setTooltip] = useState<{ label: string; detail: string; x: number } | null>(null)

  const doubled = [...items, ...items]

  return (
    <section className="relative py-6 overflow-hidden border-y" style={{ borderColor: "#1A2D44" }}>
      {/* Fade edges */}
      <div
        className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to right, #020A19, transparent)" }}
      />
      <div
        className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
        style={{ background: "linear-gradient(to left, #020A19, transparent)" }}
      />

      <div
        className="flex"
        style={{
          animation: paused ? "none" : "marquee 35s linear infinite",
          width: "max-content",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => { setPaused(false); setTooltip(null) }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-6 cursor-default group"
            onMouseEnter={(e) => setTooltip({ ...item, x: e.clientX })}
            onMouseLeave={() => setTooltip(null)}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: i % 3 === 0 ? "#B8FF3D" : i % 3 === 1 ? "#6DEBFF" : "#8C6CFF" }}
            />
            <span
              className="text-sm font-mono font-medium whitespace-nowrap transition-colors group-hover:text-white"
              style={{ color: "#A7B0C0" }}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed top-auto pointer-events-none z-20 px-3 py-1.5 rounded-lg text-xs font-mono"
          style={{
            bottom: "100%",
            left: tooltip.x,
            transform: "translateX(-50%)",
            background: "#07111F",
            border: "1px solid #1A2D44",
            color: "#6DEBFF",
          }}
        >
          {tooltip.detail}
        </div>
      )}
    </section>
  )
}
