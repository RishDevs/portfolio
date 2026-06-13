"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

const systems = [
  {
    id: "retrieval",
    title: "Retrieval Systems",
    tagline: "I build systems that convert unstructured data into searchable embedding spaces.",
    tools: ["FAISS", "pgvector", "Redis", "ViT", "Transformers", "Contrastive Learning"],
    proof: "91.7% Recall@1, 0.93 mAP on multilingual multimodal retrieval",
    details: [
      "Dual-encoder architectures for cross-modal alignment",
      "FAISS FlatIP and HNSW for scalable similarity search",
      "Multilingual embedding spaces (EN/ES/FR)",
      "Sub-millisecond retrieval latency at scale",
    ],
    color: "#6DEBFF",
    projects: ["Multilingual Multimodal Retrieval Engine"],
  },
  {
    id: "agentic",
    title: "Agentic Systems",
    tagline: "Multi-agent orchestration with structured validation and reliability guarantees.",
    tools: ["LLM Agents", "Pydantic", "FastAPI", "Prometheus", "Python"],
    proof: "6-agent orchestration with 0 unhandled failures in testing",
    details: [
      "Planner → Coder → Tester → Security → Review pipeline",
      "Pydantic structured output validation at every agent boundary",
      "YAML-based risk scoring for deployment safety",
      "Rollback simulation before live deployments",
    ],
    color: "#8C6CFF",
    projects: ["AI-Native Software Delivery Control Tower"],
  },
  {
    id: "rag",
    title: "RAG Infrastructure",
    tagline: "Production RAG pipelines with dynamic routing, guardrails, and cost tracking.",
    tools: ["pgvector", "Redis", "FastAPI", "PostgreSQL", "RAG"],
    proof: "Multi-signal routing reduces cost 40% with <5% quality drop",
    details: [
      "Intent + risk scoring for dynamic model selection",
      "pgvector semantic retrieval with Redis caching",
      "PII redaction, hallucination detection, injection mitigation",
      "P50/P95 latency and cost tracking observability",
    ],
    color: "#B8FF3D",
    projects: ["Cost-Aware LLM Support Copilot"],
  },
  {
    id: "evaluation",
    title: "ML Evaluation",
    tagline: "Rigorous evaluation frameworks — not just accuracy, but latency, cost, and reliability.",
    tools: ["Recall@K", "mAP", "F1", "ROC-AUC", "P50/P95", "Cost Metrics"],
    proof: "Comprehensive evaluation across retrieval, classification, and LLM quality",
    details: [
      "Recall@K and mAP for ranking and retrieval quality",
      "P50/P95 latency distribution tracking",
      "Cost-per-query and token-efficiency metrics",
      "SLA adherence and escalation rate monitoring",
    ],
    color: "#6DEBFF",
    projects: ["All Projects"],
  },
  {
    id: "deployment",
    title: "Deployment & Observability",
    tagline: "Systems that ship — with Docker, CI/CD, monitoring, and rollback safety.",
    tools: ["Docker", "FastAPI", "CI/CD", "Prometheus", "Grafana", "Git"],
    proof: "Integrated CI/CD with pytest, ruff, mypy, bandit, pip-audit",
    details: [
      "Containerized deployments with Docker",
      "REST APIs built on FastAPI for model inference",
      "Prometheus/Grafana for real-time system observability",
      "Automated validation stack in every delivery pipeline",
    ],
    color: "#8C6CFF",
    projects: ["AI-Native Software Delivery Control Tower"],
  },
]

export default function SystemsPage() {
  const [active, setActive] = useState(systems[0].id)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  const currentSystem = systems.find((s) => s.id === active)!

  return (
    <div className="min-h-screen pt-28 pb-32" style={{ background: "#020A19" }}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="mb-20">
          <p className="text-label mb-4">Systems Architecture</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline mb-6"
            style={{ color: "#F5F7FA" }}
          >
            My work sits at the intersection of
            <br />
            ML modeling and software systems.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-base max-w-xl"
            style={{ color: "#A7B0C0" }}
          >
            Data pipelines, embeddings, vector search, routing logic, evaluation, APIs, deployment — end to end.
          </motion.p>
        </div>

        <div ref={ref} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* System selector */}
          <div className="space-y-3">
            {systems.map((sys, i) => (
              <motion.button
                key={sys.id}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                onClick={() => setActive(sys.id)}
                className="w-full text-left rounded-xl p-4 transition-all duration-300"
                style={{
                  background: active === sys.id ? "#07111F" : "transparent",
                  border: `1px solid ${active === sys.id ? sys.color + "50" : "#1A2D44"}`,
                  color: active === sys.id ? "#F5F7FA" : "#A7B0C0",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: active === sys.id ? sys.color : "#1A2D44" }}
                  />
                  <span className="font-medium text-sm">{sys.title}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="lg:col-span-2">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
              className="rounded-2xl p-8 h-full"
              style={{ background: "#07111F", border: `1px solid ${currentSystem.color}30` }}
            >
              <div
                className="inline-block text-xs font-mono px-3 py-1.5 rounded-full mb-6"
                style={{ color: currentSystem.color, background: `${currentSystem.color}15`, border: `1px solid ${currentSystem.color}30` }}
              >
                {currentSystem.title}
              </div>

              <h2 className="text-xl font-bold mb-3" style={{ color: "#F5F7FA" }}>
                {currentSystem.tagline}
              </h2>

              <div
                className="p-4 rounded-xl mb-8 text-sm font-mono"
                style={{ background: `${currentSystem.color}08`, border: `1px solid ${currentSystem.color}20`, color: currentSystem.color }}
              >
                Proof: {currentSystem.proof}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-8">
                {currentSystem.details.map((d, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 text-sm"
                    style={{ color: "#A7B0C0" }}
                  >
                    <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: currentSystem.color }} />
                    {d}
                  </motion.div>
                ))}
              </div>

              {/* Tools */}
              <div>
                <p className="text-label mb-3">Tools</p>
                <div className="flex flex-wrap gap-2">
                  {currentSystem.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-mono px-3 py-1.5 rounded-full"
                      style={{ color: "#A7B0C0", background: "#0D1A2E", border: "1px solid #1A2D44" }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
