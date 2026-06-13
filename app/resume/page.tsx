"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const skillGroups = [
  {
    category: "Modeling",
    color: "#6DEBFF",
    items: ["CNNs", "LSTMs", "Transformers", "Vision Transformers (ViT)", "Contrastive Learning", "XGBoost"],
  },
  {
    category: "Retrieval",
    color: "#B8FF3D",
    items: ["FAISS", "pgvector", "Redis", "Recall@K", "mAP", "Embedding Indexing"],
  },
  {
    category: "LLM Systems",
    color: "#8C6CFF",
    items: ["RAG Pipelines", "Multi-Agent Systems", "Prompt Engineering", "Guardrails", "Model Evaluation", "Dynamic Routing"],
  },
  {
    category: "Infrastructure",
    color: "#6DEBFF",
    items: ["FastAPI", "Docker", "CI/CD", "PostgreSQL", "REST APIs", "Prometheus/Grafana"],
  },
  {
    category: "Evaluation",
    color: "#B8FF3D",
    items: ["F1", "ROC-AUC", "RMSE", "P50/P95 Latency", "Cost Metrics", "SLA Adherence"],
  },
  {
    category: "Languages",
    color: "#A7B0C0",
    items: ["Python", "SQL", "Java", "C", "JavaScript"],
  },
]

const experience = [
  {
    role: "Software Engineering Intern (Data & ML Focus)",
    company: "Pullulate Private Limited",
    period: "Feb 2023 – Feb 2025",
    location: "Remote / Hyderabad",
    bullets: [
      "Built scalable Python-based data ingestion and validation pipelines supporting ML training and analytics workflows.",
      "Designed REST APIs exposing model inference endpoints and aggregated evaluation metrics.",
      "Implemented automated data quality monitoring, reducing downstream processing errors and improving dataset reliability.",
    ],
  },
  {
    role: "Analytics Lead",
    company: "CETA IARE",
    period: "Apr 2023 – Oct 2024",
    location: "IARE Campus",
    bullets: [
      "Designed automated dashboards and reproducible analysis pipelines to measure engagement and optimize decisions.",
      "Conducted controlled experiments using historical datasets to evaluate uplift and performance improvements.",
      "Documented analytical workflows to ensure repeatability and data transparency across teams.",
    ],
  },
]

const projects = [
  {
    title: "Multilingual Multimodal Retrieval Engine",
    stack: "PyTorch, ViT, FAISS",
    period: "2026",
    bullets: [
      "Dual-encoder multimodal retrieval using Vision Transformer (ViT-B/32) with contrastive learning.",
      "Engineered scalable dataset pipeline with Wikipedia REST API, TSV parsing, caching, and retry logic.",
      "FAISS (FlatIP, HNSW) achieving 91.7% Recall@1, 0.93 mAP, sub-millisecond latency.",
    ],
  },
  {
    title: "AI-Native Software Delivery Control Tower",
    stack: "Python, FastAPI, LLM Agents",
    period: "2026",
    bullets: [
      "6-agent orchestration system for automated code generation and validation workflows.",
      "Pydantic structured output validation for deterministic execution reliability.",
      "CI/CD stack (pytest, ruff, mypy, bandit) with YAML risk scoring and Prometheus monitoring.",
    ],
  },
  {
    title: "Cost-Aware LLM Support Copilot",
    stack: "Python, FastAPI, PostgreSQL",
    period: "2026",
    bullets: [
      "Cost-optimized LLM routing using multi-signal decision logic (intent, risk, retrieval confidence).",
      "RAG pipeline using pgvector and Redis caching for latency reduction and relevance.",
      "PII redaction, hallucination detection, prompt injection mitigation, P50/P95 observability.",
    ],
  },
]

export default function ResumePage() {
  return (
    <div className="min-h-screen pt-28 pb-32" style={{ background: "#020A19" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
            <div>
              <p className="text-label mb-3">Resume</p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold mb-2"
                style={{ color: "#F5F7FA" }}
              >
                Rishi Kolluru
              </motion.h1>
              <p className="text-sm font-mono" style={{ color: "#6DEBFF" }}>
                AI Systems Engineer · MS CSE @ University at Buffalo
              </p>
              <div className="flex flex-wrap gap-4 mt-3 text-sm" style={{ color: "#A7B0C0" }}>
                <a href="mailto:rishikolluru.work@gmail.com" style={{ color: "#A7B0C0" }}>
                  rishikolluru.work@gmail.com
                </a>
                <a href="https://github.com/RishDevs" target="_blank" rel="noopener noreferrer" style={{ color: "#A7B0C0" }}>
                  github.com/RishDevs
                </a>
                <a href="https://linkedin.com/in/rishi-kolluru" target="_blank" rel="noopener noreferrer" style={{ color: "#A7B0C0" }}>
                  linkedin.com/in/rishi-kolluru
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/RishDevs"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                style={{ background: "#B8FF3D", color: "#020A19" }}
              >
                View GitHub ↗
              </a>
              <span
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full text-sm border"
                style={{ border: "1px solid #1A2D44", color: "#A7B0C0" }}
              >
                PDF Coming Soon
              </span>
            </div>
          </div>

          {/* Recruiter summary */}
          <div
            className="p-6 rounded-2xl"
            style={{
              background: "linear-gradient(135deg, rgba(109,235,255,0.05), rgba(140,108,255,0.05))",
              border: "1px solid rgba(109,235,255,0.2)",
            }}
          >
            <p className="text-label mb-3" style={{ color: "#6DEBFF" }}>Recruiter Summary</p>
            <p className="text-sm leading-relaxed" style={{ color: "#F5F7FA" }}>
              MS Computer Science student at University at Buffalo building production-grade AI systems. Three shipped projects: multilingual multimodal retrieval (91.7% Recall@1), 6-agent software delivery platform, and cost-aware LLM support copilot with RAG, routing, and guardrails. I evaluate what I build and I care about latency, cost, and reliability — not just accuracy.
            </p>
          </div>
        </div>

        {/* Education */}
        <ResumeSection title="Education">
          <div className="space-y-4">
            <ResumeCard>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-bold" style={{ color: "#F5F7FA" }}>Master of Science, Computer Science and Engineering</p>
                  <p className="text-sm" style={{ color: "#6DEBFF" }}>State University of New York at Buffalo</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>Aug 2025 – Present</p>
                  <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>Buffalo, NY</p>
                </div>
              </div>
            </ResumeCard>
            <ResumeCard>
              <div className="flex justify-between gap-4">
                <div>
                  <p className="font-bold" style={{ color: "#F5F7FA" }}>Bachelor of Technology, Computer Science and Engineering</p>
                  <p className="text-sm" style={{ color: "#8C6CFF" }}>Institute of Aeronautical Engineering (IARE)</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>Dec 2021 – Jul 2025</p>
                  <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>Telangana, India</p>
                </div>
              </div>
            </ResumeCard>
          </div>
        </ResumeSection>

        {/* Skills */}
        <ResumeSection title="Technical Skills">
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <ResumeCard key={group.category}>
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-xs font-mono flex-shrink-0 w-28" style={{ color: group.color }}>
                    {group.category}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span key={item} className="text-sm" style={{ color: "#F5F7FA" }}>
                        {item}
                        <span style={{ color: "#1A2D44" }}> ·</span>
                      </span>
                    ))}
                  </div>
                </div>
              </ResumeCard>
            ))}
          </div>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          <div className="space-y-4">
            {experience.map((exp) => (
              <ResumeCard key={exp.role}>
                <div className="flex justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold" style={{ color: "#F5F7FA" }}>{exp.role}</p>
                    <p className="text-sm" style={{ color: "#6DEBFF" }}>{exp.company}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>{exp.period}</p>
                    <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>{exp.location}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {exp.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#A7B0C0" }}>
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#1A2D44" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </ResumeCard>
            ))}
          </div>
        </ResumeSection>

        {/* Projects */}
        <ResumeSection title="Projects">
          <div className="space-y-4">
            {projects.map((proj) => (
              <ResumeCard key={proj.title}>
                <div className="flex justify-between gap-4 mb-3">
                  <div>
                    <p className="font-bold" style={{ color: "#F5F7FA" }}>{proj.title}</p>
                    <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>{proj.stack}</p>
                  </div>
                  <p className="text-xs font-mono flex-shrink-0" style={{ color: "#A7B0C0" }}>{proj.period}</p>
                </div>
                <ul className="space-y-2">
                  {proj.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#A7B0C0" }}>
                      <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#B8FF3D" }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </ResumeCard>
            ))}
          </div>
        </ResumeSection>
      </div>
    </div>
  )
}

function ResumeSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      className="mb-12"
    >
      <p className="text-label mb-5">{title}</p>
      {children}
    </motion.section>
  )
}

function ResumeCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl p-5" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
      {children}
    </div>
  )
}
