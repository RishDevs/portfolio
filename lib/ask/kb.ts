// Knowledge base for the Letters page. Every passage restates a fact from
// Rishi's résumé (public/Rishi_Kolluru_Resume.pdf) or this site, written as a
// complete sentence so it can be quoted directly when no LLM is available.

export type Passage = { id: string; source: string; text: string }

export const passages: Passage[] = [
  // Profile
  { id: "role", source: "Résumé", text: "Rishi Kolluru is an ML / AI engineer focused on LLM systems: serving, retrieval and distillation, with every result measured against a baseline." },
  { id: "availability", source: "Résumé", text: "Rishi graduates with an M.S. in Computer Science and Engineering from the University at Buffalo in December 2026 and is open to full-time ML / AI engineering roles, including ML infrastructure, LLM serving and applied retrieval." },
  { id: "location", source: "Résumé", text: "Rishi is based in Buffalo, New York (Eastern Time)." },
  { id: "contact", source: "Résumé", text: "To contact or hire Rishi, email rishdevs.work@gmail.com, or reach him on LinkedIn at linkedin.com/in/rishi-kolluru or GitHub at github.com/RishDevs. His résumé is downloadable from this site." },

  // Education
  { id: "edu-ub", source: "Résumé · Education", text: "Rishi is studying for an M.S. in Computer Science and Engineering at the University at Buffalo, SUNY, from August 2025 to December 2026 (expected)." },
  { id: "edu-iare", source: "Résumé · Education", text: "Rishi earned a B.Tech. in Computer Science and Engineering from the Institute of Aeronautical Engineering (IARE) in Telangana, India, from December 2021 to July 2025." },

  // Skills
  { id: "skills-lang", source: "Résumé · Skills", text: "Rishi programs in Python, Java, SQL, C and JavaScript." },
  { id: "skills-ml", source: "Résumé · Skills", text: "Rishi's ML and LLM tools include PyTorch, Hugging Face Transformers, vLLM, ONNX Runtime, scikit-learn, TensorFlow, MLflow and Ollama." },
  { id: "skills-retrieval", source: "Résumé · Skills", text: "Rishi's retrieval tools include FAISS, BM25, Sentence-Transformers, cross-encoders, HNSW, IVF-PQ and reciprocal rank fusion." },
  { id: "skills-systems", source: "Résumé · Skills", text: "Rishi's systems tools include FastAPI, asyncio, Docker, GitHub Actions, PostgreSQL, Redis, Git, Linux and REST APIs." },

  // LLM Inference Gateway
  { id: "gw-overview", source: "Chapter 01 · LLM Inference Gateway", text: "Rishi built an LLM inference gateway in FastAPI for Qwen2.5-1.5B with continuous micro-batching, FP16/SDPA inference and token streaming. It is at github.com/RishDevs/llm-inference-gateway." },
  { id: "gw-throughput", source: "Chapter 01 · LLM Inference Gateway", text: "In closed-loop load tests at 32 concurrent users on one T4 GPU, Rishi's inference gateway delivered 12.2× the throughput of a request-at-a-time baseline and reached 39% of vLLM's throughput (means of 3 runs). This is the biggest speedup in his portfolio." },
  { id: "gw-ttft", source: "Chapter 01 · LLM Inference Gateway", text: "Rishi's inference gateway cut the queue-driven median time to first token from 109 seconds to 150 milliseconds compared with serving one request at a time." },
  { id: "gw-admission", source: "Chapter 01 · LLM Inference Gateway", text: "Rishi implemented token-budget admission control with preemption and backpressure. Under a 4× long-context burst the gateway had zero out-of-memory errors at 7.0 GB peak memory, while the unguarded server crashed 3 times and failed 77% of requests." },
  { id: "gw-lanes", source: "Chapter 01 · LLM Inference Gateway", text: "Rishi profiled decoding with PyTorch Profiler and added cost-model-driven length lanes, cutting padded KV tokens by 62% and improving throughput 1.13× and p99 latency 12% on long mixed-length prompts." },

  // Hybrid Search
  { id: "hs-overview", source: "Chapter 02 · Hybrid Search & Ranking Engine", text: "Rishi built a hybrid search engine combining a from-scratch BM25, bge-small embeddings in FAISS, weighted reciprocal rank fusion and cross-encoder reranking, so it handles both exact terms and paraphrases. It is at github.com/RishDevs/hybrid-search-engine." },
  { id: "hs-ndcg", source: "Chapter 02 · Hybrid Search & Ranking Engine", text: "With fusion weights and the reranker tuned on dev splits only, Rishi's hybrid retriever improved nDCG@10 by 5.5 points over dense retrieval and 12.6 points over BM25 across 3 BEIR datasets (p < 10^-5)." },
  { id: "hs-router", source: "Chapter 02 · Hybrid Search & Ranking Engine", text: "To decide what to rerank, Rishi trained a ridge-regression router that predicts each query's reranking gain from 8 retrieval signals and sends only 49% of queries to the 1.6 s/query CPU cross-encoder. It cut mean query latency 57% and kept 69% of the full reranking gain, versus 49% for picking queries at random." },
  { id: "hs-faiss", source: "Chapter 02 · Hybrid Search & Ranking Engine", text: "Rishi benchmarked 12 FAISS configurations on a 200K-document corpus: HNSW was 51× faster than exact search at 0.97 Recall@10, and binary quantization with rescoring shrank the index 32× at a 0.01-point nDCG loss." },
  { id: "hs-ci", source: "Chapter 02 · Hybrid Search & Ranking Engine", text: "Rishi added a GitHub Actions gate that fails pull requests on retrieval drops over 0.5 points, and reranker score caching cut the gate time from 88 minutes to 39 seconds." },

  // Cascade
  { id: "cc-overview", source: "Chapter 03 · LLM-to-Small-Model Cascade", text: "Rishi built a confidence-routed cascade for CLINC150 intent classification: an INT8 DistilBERT student handles confident queries and defers the rest to a 27.8B Qwen teacher. It is at github.com/RishDevs/llm-small-model-cascade." },
  { id: "cc-calls", source: "Chapter 03 · LLM-to-Small-Model Cascade", text: "Under a 1% teacher-disagreement budget, Rishi's cascade cut LLM calls by 68% compared with sending every query to the teacher, at teacher-level accuracy (89.3% vs the teacher's 89.1%)." },
  { id: "cc-distill", source: "Chapter 03 · LLM-to-Small-Model Cascade", text: "Rishi trained the student without human annotation by distilling the teacher's zero-shot labels, generated locally through Ollama with JSON-schema constrained decoding: 0 invalid outputs and no API cost. With a 7B teacher instead, the cascade avoided only 45% of LLM calls versus 68% with the 27.8B teacher." },
  { id: "cc-onnx", source: "Chapter 03 · LLM-to-Small-Model Cascade", text: "Rishi exported the student to ONNX with dynamic INT8 quantization, shrinking it 4× from 257 MB to 65 MB and serving at 1.9 ms p50 and 3.1 ms p95 on CPU, 1.9× faster than FP32 with 98.3% prediction agreement." },

  // Experience
  { id: "exp-pullulate", source: "Résumé · Experience", text: "Before grad school, Rishi was a Software Engineering Intern in Data and ML at Pullulate Private Limited, a college-incubated startup, from February 2023 to February 2025 (remote / Hyderabad, India)." },
  { id: "exp-pull-data", source: "Résumé · Experience", text: "At Pullulate, Rishi built Pandas and scikit-learn preprocessing workflows to standardize GI-tagged product metadata, detect duplicate listings and prepare datasets, reaching 95% product-category mapping accuracy." },
  { id: "exp-pull-models", source: "Résumé · Experience", text: "At Pullulate, Rishi developed TF-IDF product classification and content-based recommendation prototypes with Logistic Regression and cosine similarity, reaching 94% held-out accuracy and 89% Precision@5." },
  { id: "exp-pull-assistant", source: "Résumé · Experience", text: "At Pullulate, Rishi integrated the OpenAI API into a shopping-assistant prototype that answered product queries, explained GI certifications and supported product discovery, with 92% response accuracy on a manually evaluated test set." },
  { id: "exp-ceta", source: "Résumé · Experience", text: "From April 2023 to October 2024, Rishi was Analytics Lead of CETA, the computer science club at IARE. He analyzed 1,200+ coding-assessment records across 8 DSA topics and built a Random Forest proficiency classifier (94% held-out accuracy), with results in 3 Power BI dashboards." },

  // Site
  { id: "site", source: "This issue", text: "This portfolio is a comic called Issue 01, set on Earth-716. Its three chapters are the inference gateway, the hybrid search engine and the small-model cascade, each with a live demo." },
]
