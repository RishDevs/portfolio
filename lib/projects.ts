export type Project = {
  slug: string
  number: string
  title: string
  tagline: string
  category: string
  categories: string[]
  stack: string[]
  metrics: string[]
  mainMetric: string
  description: string
  problem: string
  whyItMatters: string
  architecture: string[]
  evaluation: { label: string; value: string }[]
  failureModes: string[]
  improvements: string[]
  recruiterTakeaway: string
  github: string
  status: string
}

export const projects: Project[] = [
  {
    slug: "multilingual-multimodal-retrieval",
    number: "01",
    title: "Multilingual Multimodal Retrieval Engine",
    tagline: "Cross-lingual text-image retrieval over Google Research WIT",
    category: "Retrieval",
    categories: ["Retrieval", "Deep Learning"],
    stack: ["PyTorch", "ViT-B/32", "FAISS", "Wikipedia API", "Python"],
    metrics: ["91.7% Recall@1", "0.93 mAP", "Sub-ms FAISS latency", "EN/ES/FR"],
    mainMetric: "91.7% Recall@1",
    description:
      "A dual-encoder multimodal retrieval system using Vision Transformer (ViT-B/32) with contrastive learning to align cross-lingual text-image embeddings across English, Spanish, and French.",
    problem:
      "Cross-lingual image retrieval is hard: text and images live in different embedding spaces, and most retrieval systems only support a single language.",
    whyItMatters:
      "Multilingual multimodal retrieval is critical for global-scale AI search systems. Building this proves I can work at the intersection of representation learning, vector search, and scalable data engineering.",
    architecture: [
      "Wikipedia REST API",
      "TSV Metadata Parser",
      "Image/Text Preprocessing",
      "ViT-B/32 Dual Encoder",
      "Contrastive Embedding Space",
      "FAISS FlatIP / HNSW",
      "Top-K Retrieval API",
    ],
    evaluation: [
      { label: "Recall@1", value: "91.7%" },
      { label: "mAP", value: "0.93" },
      { label: "FAISS Latency", value: "<1ms" },
      { label: "Languages", value: "EN/ES/FR" },
    ],
    failureModes: [
      "Low-resource language recall drops without multilingual pre-training",
      "FAISS FlatIP degrades at >10M vectors (HNSW recommended)",
      "Rare visual concepts underrepresented in WIT",
    ],
    improvements: [
      "Switched from flat cosine to HNSW for scalability",
      "Added caching and retry logic to Wikipedia API pipeline",
      "Optimized embedding indexing for memory efficiency",
    ],
    recruiterTakeaway:
      "This project proves I can build ML systems that combine data engineering, representation learning, vector search, evaluation, and latency-aware retrieval — end to end.",
    github: "https://github.com/RishDevs",
    status: "Shipped",
  },
  {
    slug: "ai-software-delivery-control-tower",
    number: "02",
    title: "AI-Native Software Delivery Control Tower",
    tagline: "Local-first multi-agent orchestration for automated code validation",
    category: "Agents",
    categories: ["Agents", "LLM Systems", "Infrastructure"],
    stack: ["Python", "FastAPI", "LLM Agents", "Pydantic", "CI/CD", "Prometheus"],
    metrics: ["6 LLM agents", "Pydantic validation", "YAML risk scoring", "Prometheus/Grafana"],
    mainMetric: "6-Agent Platform",
    description:
      "A local-first multi-agent orchestration system coordinating 6 LLM agents for automated code generation, validation, risk assessment, and deployment safety.",
    problem:
      "Software delivery still requires humans to manually review, test, and assess risk at every step — creating bottlenecks and inconsistency.",
    whyItMatters:
      "Agentic software delivery is where AI is headed. This system shows I understand multi-agent orchestration, structured validation, and observability — not just prompting.",
    architecture: [
      "Task Input",
      "Planner Agent",
      "Code Generation Agent",
      "Test Agent (pytest)",
      "Security Agent (bandit/pip-audit)",
      "Review Agent (ruff/mypy)",
      "Risk Scoring Engine",
      "Monitoring & Rollback",
    ],
    evaluation: [
      { label: "Agents", value: "6" },
      { label: "Validation", value: "Pydantic" },
      { label: "Risk Scoring", value: "YAML-based" },
      { label: "Observability", value: "Prometheus/Grafana" },
    ],
    failureModes: [
      "LLM hallucinations in structured output (mitigated by Pydantic)",
      "Agent deadlocks on ambiguous tasks",
      "CI/CD integration latency",
    ],
    improvements: [
      "Added Pydantic validation for deterministic structured output",
      "Integrated YAML-based risk scoring for deployment safety",
      "Built rollback simulation before live deployments",
    ],
    recruiterTakeaway:
      "This project shows I can design production multi-agent systems with reliability guarantees — structured output, validation, risk scoring, and observability from day one.",
    github: "https://github.com/RishDevs",
    status: "Shipped",
  },
  {
    slug: "cost-aware-llm-support-copilot",
    number: "03",
    title: "Cost-Aware LLM Support Copilot",
    tagline: "RAG pipeline with dynamic model routing, guardrails, and cost tracking",
    category: "LLM Systems",
    categories: ["LLM Systems", "Infrastructure", "Retrieval"],
    stack: ["Python", "FastAPI", "PostgreSQL pgvector", "Redis", "RAG"],
    metrics: ["P50/P95 tracking", "PII redaction", "Dynamic routing", "pgvector + Redis"],
    mainMetric: "RAG + Dynamic Routing",
    description:
      "A cost-optimized LLM support system with multi-signal routing, RAG pipeline using pgvector, Redis caching, and guardrails including PII redaction, hallucination detection, and prompt injection mitigation.",
    problem:
      "LLM support systems that blindly route every query to GPT-4 are expensive, slow, and unsafe. Cost, latency, and safety need to be first-class concerns.",
    whyItMatters:
      "This is real AI infrastructure. Dynamic routing, RAG, guardrails, and observability are exactly what production AI systems need — and most demos skip all of it.",
    architecture: [
      "User Query",
      "Intent Classifier + Risk Scorer",
      "Dynamic Router (cost-aware)",
      "RAG Retriever (pgvector)",
      "Redis Cache Layer",
      "Reranker",
      "Guardrails (PII/hallucination/injection)",
      "LLM (model-selected)",
      "Response Evaluator",
    ],
    evaluation: [
      { label: "Latency", value: "P50/P95 tracked" },
      { label: "Cache Hit Rate", value: "Redis" },
      { label: "Guardrails", value: "3 layers" },
      { label: "Cost Savings", value: "Dynamic routing" },
    ],
    failureModes: [
      "Retrieval confidence miscalibration → wrong model selected",
      "PII regex misses rare formats",
      "Cache invalidation on knowledge base updates",
    ],
    improvements: [
      "Multi-signal routing logic (intent + risk + retrieval confidence)",
      "Redis caching to reduce redundant LLM calls",
      "SLA adherence and escalation rate tracking",
    ],
    recruiterTakeaway:
      "This project proves I can build production AI infrastructure — not just a chatbot. Dynamic routing, cost tracking, RAG, guardrails, and observability are all first-class.",
    github: "https://github.com/RishDevs",
    status: "Shipped",
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
