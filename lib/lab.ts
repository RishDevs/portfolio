export type LabEntry = {
  id: string
  title: string
  date: string
  category: string
  status: "shipped" | "testing"
  metric: string
  insight: string
}

export const labEntries: LabEntry[] = [
  {
    id: "faiss-flatip-vs-hnsw",
    title: "FAISS FlatIP vs HNSW: Practical Tradeoffs",
    date: "2026-03",
    category: "Retrieval Experiments",
    status: "shipped",
    metric: "10x throughput with HNSW at 99.2% recall retention",
    insight: "FlatIP is exact but doesn't scale. HNSW at ef=100 hits the sweet spot for most production retrieval.",
  },
  {
    id: "cost-aware-routing-experiments",
    title: "Building a Cost-Aware LLM Router",
    date: "2026-02",
    category: "LLM Systems",
    status: "shipped",
    metric: "40% cost reduction with <5% quality drop",
    insight: "Intent classification + retrieval confidence is a better routing signal than query length alone.",
  },
  {
    id: "multi-agent-guardrails",
    title: "How to Design Multi-Agent Guardrails",
    date: "2026-02",
    category: "Agent Evaluations",
    status: "shipped",
    metric: "6-agent system with 0 unhandled failures in testing",
    insight: "Pydantic validation at every agent boundary eliminates most hallucination cascades.",
  },
  {
    id: "recall-at-k-limits",
    title: "Why Retrieval Evaluation Needs More Than Recall@1",
    date: "2026-01",
    category: "ML Evaluation",
    status: "shipped",
    metric: "mAP adds 30% more signal vs Recall@1 alone",
    insight: "Recall@1 misses ranking quality. mAP and MRR surface whether the right result is first or fifth.",
  },
  {
    id: "octmnist-cnn-experiments",
    title: "What I Learned from Training CNNs on OCTMNIST",
    date: "2025-12",
    category: "DL Training Runs",
    status: "shipped",
    metric: "94.1% accuracy with data augmentation",
    insight: "Aggressive augmentation outperforms architecture complexity for medical image classification.",
  },
  {
    id: "rag-guardrail-tests",
    title: "RAG Guardrail Stress Tests",
    date: "2026-01",
    category: "RAG Guardrail Tests",
    status: "testing",
    metric: "PII redaction: 98.7% recall on test set",
    insight: "Regex + NER ensemble catches more PII patterns than either approach alone.",
  },
  {
    id: "latency-benchmarks",
    title: "P50/P95 Latency Benchmarks: RAG vs Direct LLM",
    date: "2026-02",
    category: "Latency Benchmarks",
    status: "shipped",
    metric: "Redis cache reduces P95 by 60% on repeated queries",
    insight: "Caching retrieval results is higher leverage than model compression for most support use cases.",
  },
  {
    id: "contrastive-learning-notes",
    title: "Contrastive Learning for Cross-Modal Alignment",
    date: "2025-11",
    category: "DL Training Runs",
    status: "shipped",
    metric: "0.93 mAP on WIT multilingual retrieval",
    insight: "Temperature scaling in InfoNCE loss has outsized impact on alignment quality.",
  },
]
