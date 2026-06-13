"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

type Mode = "retrieval" | "agent" | "rag" | "evaluation"

type Step = { label: string; detail: string; color: string }

const modes: Record<Mode, { label: string; steps: Step[]; description: string }> = {
  retrieval: {
    label: "Retrieval Mode",
    description: "Multilingual multimodal text-image search pipeline",
    steps: [
      { label: "Query", detail: "Text or image input (EN/ES/FR)", color: "#6DEBFF" },
      { label: "Text Encoder", detail: "ViT-B/32 + multilingual tokenizer", color: "#8C6CFF" },
      { label: "Embedding", detail: "Contrastive aligned embedding space", color: "#8C6CFF" },
      { label: "FAISS Index", detail: "FlatIP or HNSW similarity search", color: "#6DEBFF" },
      { label: "Top-K Results", detail: "Ranked image/text candidates", color: "#B8FF3D" },
      { label: "Evaluation", detail: "Recall@K, mAP scoring", color: "#B8FF3D" },
    ],
  },
  agent: {
    label: "Agent Mode",
    description: "Multi-agent software delivery orchestration",
    steps: [
      { label: "Task", detail: "Engineering task or PR description", color: "#6DEBFF" },
      { label: "Planner Agent", detail: "Breaks task into structured steps", color: "#8C6CFF" },
      { label: "Code Agent", detail: "Generates implementation code", color: "#8C6CFF" },
      { label: "Test Agent", detail: "pytest + type checking", color: "#6DEBFF" },
      { label: "Security Agent", detail: "bandit + pip-audit scans", color: "#FF5C7A" },
      { label: "Review Agent", detail: "ruff + mypy linting", color: "#B8FF3D" },
      { label: "Report", detail: "Risk score + deployment decision", color: "#B8FF3D" },
    ],
  },
  rag: {
    label: "RAG Mode",
    description: "Cost-aware LLM support with guardrails",
    steps: [
      { label: "User Query", detail: "Support ticket or question", color: "#6DEBFF" },
      { label: "Router", detail: "Intent + risk scoring", color: "#8C6CFF" },
      { label: "Retriever", detail: "pgvector semantic search", color: "#6DEBFF" },
      { label: "Reranker", detail: "Relevance scoring", color: "#8C6CFF" },
      { label: "Guardrails", detail: "PII redaction + injection detection", color: "#FF5C7A" },
      { label: "LLM", detail: "Cost-selected model (GPT/local)", color: "#B8FF3D" },
      { label: "Evaluator", detail: "Hallucination + SLA check", color: "#B8FF3D" },
    ],
  },
  evaluation: {
    label: "Evaluation Mode",
    description: "ML system evaluation and observability",
    steps: [
      { label: "Predictions", detail: "Model output batch", color: "#6DEBFF" },
      { label: "Precision/Recall", detail: "Classification metrics", color: "#8C6CFF" },
      { label: "mAP / F1", detail: "Ranking and detection metrics", color: "#8C6CFF" },
      { label: "Latency (P50/P95)", detail: "Tail latency distribution", color: "#6DEBFF" },
      { label: "Cost Tracking", detail: "Token + compute cost", color: "#FF5C7A" },
      { label: "Dashboard", detail: "Prometheus + Grafana", color: "#B8FF3D" },
    ],
  },
}

export function AISystemVisualizer() {
  const [activeMode, setActiveMode] = useState<Mode>("retrieval")
  const [activeStep, setActiveStep] = useState<number | null>(null)
  const [animating, setAnimating] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-15%" })

  // Auto-animate through steps when in view
  useEffect(() => {
    if (!inView) return
    let stepIdx = 0
    const mode = modes[activeMode]
    setAnimating(true)
    setActiveStep(0)

    const interval = setInterval(() => {
      stepIdx = (stepIdx + 1) % mode.steps.length
      setActiveStep(stepIdx)
      if (stepIdx === mode.steps.length - 1) {
        setTimeout(() => {
          setActiveStep(null)
          setAnimating(false)
        }, 800)
        clearInterval(interval)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [inView, activeMode])

  const currentMode = modes[activeMode]

  return (
    <section ref={ref} className="py-32 px-6 max-w-7xl mx-auto">
      <div className="mb-12">
        <p className="text-label mb-3">AI System Visualizer</p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="text-headline"
          style={{ color: "#F5F7FA" }}
        >
          Inside the systems I build.
        </motion.h2>
      </div>

      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: "#07111F", border: "1px solid #1A2D44" }}
      >
        {/* Mode selector */}
        <div className="flex overflow-x-auto border-b" style={{ borderColor: "#1A2D44" }}>
          {(Object.keys(modes) as Mode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => { setActiveMode(mode); setActiveStep(null) }}
              className="relative flex-1 min-w-fit px-6 py-4 text-sm font-medium transition-colors"
              style={{ color: activeMode === mode ? "#F5F7FA" : "#A7B0C0" }}
            >
              {modes[mode].label}
              {activeMode === mode && (
                <motion.div
                  layoutId="mode-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ background: "#6DEBFF" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Visualizer */}
        <div className="p-8">
          <p className="text-sm mb-8" style={{ color: "#A7B0C0" }}>
            {currentMode.description}
          </p>

          {/* Pipeline flow */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            {currentMode.steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeMode}-${i}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="relative"
                    onMouseEnter={() => setActiveStep(i)}
                    onMouseLeave={() => setActiveStep(null)}
                  >
                    <div
                      className="px-4 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300"
                      style={{
                        background: activeStep === i
                          ? `rgba(${step.color === "#6DEBFF" ? "109,235,255" : step.color === "#8C6CFF" ? "140,108,255" : step.color === "#B8FF3D" ? "184,255,61" : "255,92,122"},0.15)`
                          : "#0D1A2E",
                        border: `1px solid ${activeStep === i ? step.color : "#1A2D44"}`,
                        color: activeStep === i ? step.color : "#A7B0C0",
                        boxShadow: activeStep === i ? `0 0 20px ${step.color}30` : "none",
                      }}
                    >
                      {step.label}
                    </div>

                    {/* Step detail tooltip */}
                    {activeStep === i && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 rounded-lg text-xs font-mono whitespace-nowrap z-10"
                        style={{
                          background: "#020A19",
                          border: `1px solid ${step.color}40`,
                          color: step.color,
                        }}
                      >
                        {step.detail}
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {i < currentMode.steps.length - 1 && (
                  <motion.span
                    animate={{
                      color: activeStep === i ? "#6DEBFF" : "#1A2D44",
                      scale: activeStep === i ? 1.2 : 1,
                    }}
                    className="text-lg select-none"
                  >
                    →
                  </motion.span>
                )}
              </div>
            ))}
          </div>

          {/* Bottom: live metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t" style={{ borderColor: "#1A2D44" }}>
            {activeMode === "retrieval" && [
              { label: "Recall@1", value: "91.7%" },
              { label: "mAP", value: "0.93" },
              { label: "Index Latency", value: "<1ms" },
              { label: "Languages", value: "3" },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>{m.label}</p>
                <p className="text-xl font-bold" style={{ color: "#6DEBFF" }}>{m.value}</p>
              </div>
            ))}
            {activeMode === "agent" && [
              { label: "Agents", value: "6" },
              { label: "Validation", value: "Pydantic" },
              { label: "Risk Score", value: "YAML" },
              { label: "CI Stack", value: "4 tools" },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>{m.label}</p>
                <p className="text-xl font-bold" style={{ color: "#8C6CFF" }}>{m.value}</p>
              </div>
            ))}
            {activeMode === "rag" && [
              { label: "Routing", value: "Dynamic" },
              { label: "Guardrails", value: "3 layers" },
              { label: "Cache", value: "Redis" },
              { label: "Latency", value: "P50/P95" },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>{m.label}</p>
                <p className="text-xl font-bold" style={{ color: "#B8FF3D" }}>{m.value}</p>
              </div>
            ))}
            {activeMode === "evaluation" && [
              { label: "Metrics", value: "F1/mAP" },
              { label: "Latency", value: "P95 tracked" },
              { label: "Cost", value: "Per-token" },
              { label: "SLA", value: "Monitored" },
            ].map((m) => (
              <div key={m.label} className="metric-card">
                <p className="text-xs font-mono mb-1" style={{ color: "#A7B0C0" }}>{m.label}</p>
                <p className="text-xl font-bold" style={{ color: "#6DEBFF" }}>{m.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
