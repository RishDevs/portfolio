"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const principles = [
  "Systems over scripts. I don't just write code — I build things that work reliably under real conditions.",
  "Evaluation is not optional. Every model, pipeline, and agent gets measured.",
  "Understand why before optimizing what. Root cause first, then performance.",
  "Shipping beats perfecting. Iterating on a live system beats polishing in private.",
]

const skills = [
  { category: "Modeling", items: ["CNNs", "LSTMs", "Transformers", "Vision Transformers", "XGBoost"] },
  { category: "Retrieval", items: ["FAISS", "pgvector", "Redis", "Recall@K", "mAP"] },
  { category: "LLM Systems", items: ["RAG", "Multi-Agent", "Guardrails", "Prompt Engineering", "Routing"] },
  { category: "Infrastructure", items: ["FastAPI", "Docker", "CI/CD", "PostgreSQL", "REST APIs"] },
  { category: "Evaluation", items: ["F1", "ROC-AUC", "RMSE", "P50/P95 Latency", "Cost Metrics"] },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-28 pb-32" style={{ background: "#020A19" }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Intro */}
        <div className="mb-20">
          <p className="text-label mb-4">About</p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="text-headline mb-8"
            style={{ color: "#F5F7FA" }}
          >
            I&apos;m already building the kind of AI systems that serious teams care about.
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-4 text-base leading-relaxed"
            style={{ color: "#A7B0C0" }}
          >
            <p>
              I&apos;m Rishi Kolluru — an MS Computer Science and Engineering student at the University at Buffalo with a B.Tech from IARE, India. I build AI systems that retrieve, reason, route, and ship.
            </p>
            <p>
              My work sits at the intersection of ML research and software engineering. I don&apos;t stop at training a model — I care about data pipelines, vector search, LLM agents, evaluation rigor, guardrails, APIs, and observability.
            </p>
            <p>
              The three systems I&apos;ve built — a multilingual multimodal retrieval engine, a 6-agent software delivery platform, and a cost-aware LLM support copilot — are systems I would be comfortable defending in a production review.
            </p>
          </motion.div>
        </div>

        {/* Education */}
        <Section title="Education">
          <div className="space-y-4">
            <EducationCard
              degree="Master of Science, Computer Science and Engineering"
              school="State University of New York at Buffalo"
              period="Aug 2025 – Present"
              location="Buffalo, NY"
              color="#6DEBFF"
            />
            <EducationCard
              degree="Bachelor of Technology, Computer Science and Engineering"
              school="Institute of Aeronautical Engineering (IARE)"
              period="Dec 2021 – Jul 2025"
              location="Telangana, India"
              color="#8C6CFF"
            />
          </div>
        </Section>

        {/* Experience */}
        <Section title="Experience">
          <div className="space-y-4">
            <ExperienceCard
              role="Software Engineering Intern (Data & ML Focus)"
              company="Pullulate Private Limited"
              period="Feb 2023 – Feb 2025"
              location="Remote / Hyderabad"
              bullets={[
                "Built scalable Python-based data ingestion and validation pipelines for ML training and analytics workflows.",
                "Designed REST APIs exposing model inference endpoints and aggregated evaluation metrics.",
                "Implemented automated data quality monitoring, reducing downstream processing errors.",
              ]}
            />
            <ExperienceCard
              role="Analytics Lead"
              company="CETA IARE"
              period="Apr 2023 – Oct 2024"
              location="IARE Campus"
              bullets={[
                "Designed automated dashboards and reproducible analysis pipelines.",
                "Conducted controlled experiments using historical datasets to evaluate uplift.",
                "Documented analytical workflows to ensure repeatability across teams.",
              ]}
            />
          </div>
        </Section>

        {/* What I Build */}
        <Section title="What I Build">
          <div className="space-y-3 text-base leading-relaxed" style={{ color: "#A7B0C0" }}>
            <p>
              Retrieval systems that scale — dual encoders, FAISS, pgvector, cross-lingual embeddings.
            </p>
            <p>
              Agentic platforms with reliability — multi-agent orchestration, structured validation, risk scoring.
            </p>
            <p>
              LLM infrastructure that&apos;s honest about trade-offs — cost-aware routing, RAG pipelines, real guardrails.
            </p>
            <p>
              Evaluation frameworks that surface truth — not just accuracy, but latency, cost, and failure modes.
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section title="Technical Skills">
          <div className="space-y-4">
            {skills.map((group) => (
              <div key={group.category} className="rounded-xl p-5" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
                <p className="text-xs font-mono mb-3" style={{ color: "#6DEBFF" }}>{group.category}</p>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm px-3 py-1 rounded-full font-medium"
                      style={{ color: "#F5F7FA", background: "#0D1A2E", border: "1px solid #1A2D44" }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Principles */}
        <Section title="Operating Principles">
          <ul className="space-y-4">
            {principles.map((p, i) => (
              <li key={i} className="flex items-start gap-4" style={{ color: "#A7B0C0" }}>
                <span
                  className="mt-1.5 text-xs font-mono flex-shrink-0"
                  style={{ color: "#B8FF3D" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* CTA */}
        <div className="mt-20 flex flex-wrap gap-4">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm transition-all hover:scale-105"
            style={{ background: "#B8FF3D", color: "#020A19" }}
          >
            View Resume
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm border transition-colors"
            style={{ border: "1px solid #1A2D44", color: "#F5F7FA" }}
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7 }}
      className="mb-16"
    >
      <p className="text-label mb-6">{title}</p>
      {children}
    </motion.section>
  )
}

function EducationCard({ degree, school, period, location, color }: { degree: string; school: string; period: string; location: string; color: string }) {
  return (
    <div className="rounded-xl p-6" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
      <p className="font-bold mb-1" style={{ color: "#F5F7FA" }}>{degree}</p>
      <p className="text-sm font-medium mb-2" style={{ color }}>
        {school}
      </p>
      <p className="text-xs font-mono" style={{ color: "#A7B0C0" }}>
        {period} · {location}
      </p>
    </div>
  )
}

function ExperienceCard({ role, company, period, location, bullets }: { role: string; company: string; period: string; location: string; bullets: string[] }) {
  return (
    <div className="rounded-xl p-6" style={{ background: "#07111F", border: "1px solid #1A2D44" }}>
      <p className="font-bold mb-1" style={{ color: "#F5F7FA" }}>{role}</p>
      <p className="text-sm font-medium mb-1" style={{ color: "#6DEBFF" }}>{company}</p>
      <p className="text-xs font-mono mb-4" style={{ color: "#A7B0C0" }}>
        {period} · {location}
      </p>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "#A7B0C0" }}>
            <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: "#1A2D44" }} />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}
