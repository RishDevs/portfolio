// Knowledge base for "Ask Rishi's AI". Every passage restates verified content
// from one source: Rishi's résumé (public/Rishi_Kolluru_Resume.pdf), the
// READMEs of his three public repositories, or this site. `brief` is the
// recruiter-mode answer, `detail` the engineer-mode answer; both are complete
// sentences so they can be quoted directly when no LLM is available.
// Do not add claims that are not in those sources.

export type Source = { title: string; url: string }
export type Passage = {
  id: string
  topic: string
  source: Source
  keywords?: string
  brief: string
  detail: string
}

const RESUME: Source = { title: "Résumé", url: "/Rishi_Kolluru_Resume.pdf" }
const GW = "https://github.com/RishDevs/llm-inference-gateway"
const HS = "https://github.com/RishDevs/hybrid-search-engine"
const CC = "https://github.com/RishDevs/llm-small-model-cascade"
const gw = (t: string, a = ""): Source => ({ title: `LLM Inference Gateway · ${t}`, url: `${GW}${a}` })
const hs = (t: string, a = ""): Source => ({ title: `Hybrid Search Engine · ${t}`, url: `${HS}${a}` })
const cc = (t: string, a = ""): Source => ({ title: `Small-Model Cascade · ${t}`, url: `${CC}${a}` })
const HS_SIG = hs("Results summary", "/blob/main/docs/02-significance.md")
const HS_DEF = hs("Design defense", "/blob/main/docs/04-defense.md")

export const passages: Passage[] = [
  // ---- Profile, availability, contact ---------------------------------------
  {
    id: "summary", topic: "profile", source: RESUME,
    keywords: "summary summarize overview 30 seconds who is background experience candidate strong profile about",
    brief: "Rishi Kolluru is an ML / AI engineer finishing an M.S. in Computer Science and Engineering at the University at Buffalo (December 2026). His three portfolio projects cover LLM serving (12.2× throughput vs one-at-a-time serving), hybrid retrieval (+12.6 nDCG@10 over BM25) and model distillation (68% fewer LLM calls at teacher-level accuracy), and he spent two years as a data and ML intern at Pullulate.",
    detail: "Rishi's portfolio is three systems, each measured against a baseline: an LLM inference gateway with continuous micro-batching and token-budget admission control (12.2× throughput vs a request-at-a-time baseline on one T4, 39% of vLLM), a hybrid BM25 + dense retriever with a learned rerank router (+12.6 nDCG@10 over BM25 across 3 BEIR datasets, −57% mean query latency vs reranking every query), and an LLM-to-DistilBERT cascade (68% fewer LLM calls at 89.3% vs the teacher's 89.1% accuracy). Before his M.S. he was a software engineering intern in data and ML at Pullulate from February 2023 to February 2025.",
  },
  {
    id: "ai-infra", topic: "profile", source: { title: "Portfolio · Contents", url: "/#issue" },
    keywords: "relevant ai infrastructure ml infrastructure platform serving systems most relevant projects which",
    brief: "For AI infrastructure, the most relevant work is the LLM Inference Gateway (batching, streaming, admission control and benchmarking on a GPU) and the Small-Model Cascade (routing traffic between a cheap model and an LLM to cut cost). The Hybrid Search Engine covers retrieval infrastructure, including a CI quality gate.",
    detail: "The LLM Inference Gateway is the serving-infrastructure project: an asyncio FastAPI front end, an engine thread doing prefill micro-batches and per-lane decode, KV-memory admission control with preemption, and load tests against a naive server and vLLM. The Small-Model Cascade is cost infrastructure: a calibrated confidence gate in front of an ONNX INT8 student, with escalations to an OpenAI-compatible LLM endpoint. The Hybrid Search Engine adds retrieval infrastructure: FAISS index benchmarking, a SQLite reranker score cache and a GitHub Actions retrieval-quality gate.",
  },
  {
    id: "availability", topic: "profile", source: RESUME,
    keywords: "available availability when start graduate graduation hire hiring roles looking open full-time job",
    brief: "Rishi's M.S. is expected in December 2026, and the portfolio says he is open to full-time ML / AI engineering roles from then, including ML infrastructure, LLM serving and applied retrieval.",
    detail: "Rishi's M.S. in Computer Science and Engineering at the University at Buffalo is expected in December 2026. The portfolio lists him as open to full-time ML / AI roles, specifically ML infrastructure, LLM serving and applied retrieval. For start dates or anything else about availability, email rishdevs.work@gmail.com.",
  },
  {
    id: "contact", topic: "profile", source: RESUME,
    keywords: "contact email reach hire linkedin github message phone get in touch",
    brief: "You can reach Rishi at rishdevs.work@gmail.com, on LinkedIn at linkedin.com/in/rishi-kolluru, or on GitHub at github.com/RishDevs.",
    detail: "To contact Rishi, email rishdevs.work@gmail.com. He is also on LinkedIn (linkedin.com/in/rishi-kolluru) and GitHub (github.com/RishDevs), and his résumé can be downloaded from this site.",
  },
  {
    id: "location", topic: "profile", source: RESUME,
    keywords: "where based location live city timezone buffalo new york",
    brief: "Rishi is based in Buffalo, New York.",
    detail: "Rishi is based in Buffalo, New York (Eastern Time), where he studies at the University at Buffalo. He previously studied and worked in Hyderabad, India.",
  },

  // ---- Education -------------------------------------------------------------
  {
    id: "edu-ms", topic: "education", source: { title: "Résumé · Education", url: RESUME.url },
    keywords: "education degree masters m.s. ms university buffalo suny school grad graduate study studying",
    brief: "Rishi is completing an M.S. in Computer Science and Engineering at the University at Buffalo (SUNY), August 2025 to December 2026 (expected).",
    detail: "Rishi's current degree is an M.S. in Computer Science and Engineering at the University at Buffalo, SUNY, from August 2025 with expected completion in December 2026.",
  },
  {
    id: "edu-btech", topic: "education", source: { title: "Résumé · Education", url: RESUME.url },
    keywords: "education degree bachelors b.tech btech undergraduate iare institute aeronautical engineering india telangana",
    brief: "Rishi earned a B.Tech. in Computer Science and Engineering from the Institute of Aeronautical Engineering (IARE) in Telangana, India (December 2021 to July 2025).",
    detail: "Rishi's undergraduate degree is a B.Tech. in Computer Science and Engineering from the Institute of Aeronautical Engineering (IARE), Telangana, India, from December 2021 to July 2025.",
  },

  // ---- Experience --------------------------------------------------------------
  {
    id: "exp-pullulate", topic: "experience", source: { title: "Résumé · Experience", url: RESUME.url },
    keywords: "experience work worked job internship intern pullulate startup company employer before previous prior earlier career before grad school",
    brief: "Rishi was a Software Engineering Intern in Data and ML at Pullulate Private Limited, a college-incubated startup, from February 2023 to February 2025 (remote / Hyderabad).",
    detail: "From February 2023 to February 2025 Rishi was a Software Engineering Intern (Data and ML) at Pullulate Private Limited, a college-incubated startup, working remotely and in Hyderabad. His work there covered data preprocessing, product classification and recommendation prototypes, and an LLM shopping-assistant prototype.",
  },
  {
    id: "exp-pull-data", topic: "experience", source: { title: "Résumé · Experience", url: RESUME.url },
    keywords: "pullulate pandas scikit-learn preprocessing data pipeline metadata duplicate listings gi-tagged",
    brief: "At Pullulate, Rishi built Pandas and scikit-learn preprocessing workflows for GI-tagged product data, reaching 95% product-category mapping accuracy.",
    detail: "At Pullulate, Rishi built Pandas and scikit-learn preprocessing workflows to standardize GI-tagged product metadata, detect duplicate listings and prepare datasets, reaching 95% product-category mapping accuracy.",
  },
  {
    id: "exp-pull-models", topic: "experience", source: { title: "Résumé · Experience", url: RESUME.url },
    keywords: "pullulate classifier classification recommendation recommender tf-idf logistic regression cosine precision",
    brief: "At Pullulate, Rishi developed TF-IDF product classification (94% held-out accuracy) and a content-based recommender (89% Precision@5).",
    detail: "At Pullulate, Rishi developed TF-IDF-based product classification with Logistic Regression (94% held-out accuracy) and a content-based recommendation prototype using cosine similarity (89% Precision@5).",
  },
  {
    id: "exp-pull-llm", topic: "experience", source: { title: "Résumé · Experience", url: RESUME.url },
    keywords: "pullulate openai api shopping assistant chatbot llm prototype gi certifications",
    brief: "At Pullulate, Rishi integrated the OpenAI API into a shopping-assistant prototype, with 92% response accuracy on a manually evaluated test set.",
    detail: "At Pullulate, Rishi integrated the OpenAI API into a shopping-assistant prototype that answered product queries, explained GI certifications and supported product discovery; it reached 92% response accuracy on a manually evaluated test set.",
  },
  {
    id: "exp-ceta", topic: "experience", source: { title: "Résumé · Experience", url: RESUME.url },
    keywords: "ceta club analytics lead leadership random forest power bi dashboards assessment iare",
    brief: "From April 2023 to October 2024, Rishi was Analytics Lead of CETA, IARE's computer science club, where he built a Random Forest proficiency classifier (94% held-out accuracy) and 3 Power BI dashboards.",
    detail: "As Analytics Lead of CETA (IARE's computer science club, April 2023 to October 2024), Rishi analyzed 1,200+ coding-assessment records across 8 DSA topics with Python and Pandas, built a Random Forest proficiency classifier with 94% held-out accuracy, and surfaced results in 3 Power BI dashboards.",
  },

  // ---- Skills -----------------------------------------------------------------
  {
    id: "skills-all", topic: "skills", source: { title: "Résumé · Technical Skills", url: RESUME.url },
    keywords: "skills technologies stack tools used technology languages frameworks software engineering demonstrate",
    brief: "Rishi works mainly in Python, with PyTorch, Hugging Face Transformers, vLLM, ONNX Runtime and scikit-learn for ML; FAISS, BM25 and Sentence-Transformers for retrieval; and FastAPI, asyncio, Docker, GitHub Actions, PostgreSQL and Redis for systems.",
    detail: "Per his résumé: languages are Python, Java, SQL, C and JavaScript. ML / LLM: PyTorch, Hugging Face Transformers, vLLM, ONNX Runtime, scikit-learn, TensorFlow, MLflow, Ollama. Retrieval: FAISS, BM25, Sentence-Transformers, cross-encoders, HNSW, IVF-PQ, reciprocal rank fusion. Systems: FastAPI, asyncio, Docker, GitHub Actions, PostgreSQL, Redis, Git, Linux, REST APIs. The projects show these in use: asyncio and FastAPI in the gateway, FAISS and GitHub Actions in the search engine, ONNX Runtime and Ollama in the cascade.",
  },
  {
    id: "skills-swe", topic: "skills", source: { title: "Portfolio · three projects", url: "/#issue" },
    keywords: "software engineering skills testing tests ci api design reproducible docker engineering practices",
    brief: "Beyond ML, the projects show software engineering practice: FastAPI services, asyncio concurrency, Docker, unit tests, a CI quality gate in GitHub Actions, and reproducible benchmark scripts.",
    detail: "The repositories show: an asyncio FastAPI server with SSE streaming and 429 backpressure (gateway), Docker and docker-compose for GPU deployment, a Makefile-driven reproducible pipeline with 37 unit tests and a GitHub Actions gate that fails PRs on retrieval regressions (search engine), and ONNX export with a parity check plus a FastAPI classification service (cascade).",
  },

  // ---- Chapter 01: LLM Inference Gateway --------------------------------------
  {
    id: "gw-overview", topic: "gateway", source: gw("README", "#readme"),
    keywords: "inference gateway llm serving how work works what is overview batching streaming qwen",
    brief: "The LLM Inference Gateway is a serving layer in front of Qwen2.5-1.5B that serves many users at once on one free T4 GPU. It batches requests, streams tokens, and limits GPU work so bursts don't crash it, reaching 12.2× the throughput of serving one request at a time.",
    detail: "The gateway is a FastAPI (asyncio) front end that submits requests to a waiting queue with admission checks (queue cap, token budget, prefill cap). An engine thread prefills new requests as a micro-batch, merges them into a running lane, decodes each lane, evicts finished requests and rebalances lanes; tokens flow back through per-request asyncio queues as OpenAI-compatible Server-Sent Events. The model is Qwen2.5-1.5B in fp16 with PyTorch SDPA.",
  },
  {
    id: "gw-batching", topic: "gateway", source: gw("What it does", "#what-it-does"),
    keywords: "continuous batching micro-batching dynamic batching tradeoffs trade-offs throughput improve how merge prefill decode",
    brief: "Instead of serving one request at a time, the gateway keeps a running batch: new requests are prefilled together and join at the next decode step, and finished ones leave right away, so the GPU stays busy and nobody waits behind someone else's long answer.",
    detail: "Continuous (dynamic) micro-batching: new requests are prefilled together as a micro-batch and merged into the running batch at the next decode step, and finished requests are evicted immediately. The tradeoff is padding: batched sequences of different lengths carry padding in the KV cache, which is why the gateway adds length lanes, and why it still trails vLLM, whose paged KV cache avoids padding and copying when requests join or leave.",
  },
  {
    id: "gw-results", topic: "gateway", source: gw("Results", "#results"),
    keywords: "throughput results benchmark speedup 12.2 tok/s tokens per second biggest fastest t4 32 users",
    brief: "With 32 concurrent users on one T4, the gateway delivered 12.2× the throughput of a request-at-a-time baseline (236.3 vs 19.4 tokens/s) and cut median time to first token from 109 s to 150 ms.",
    detail: "32 concurrent users, mixed prompts (64–512 tokens in, 32–256 out), mean ± std of 3 runs: naive batch-1 serving 19.4 ± 1.1 tok/s, the gateway 236.3 ± 10.1 tok/s (12.2×), vLLM 602.1 ± 18.0 tok/s. Median time to first token: 109 s naive, 150 ms gateway, 114 ms vLLM. p99 end-to-end latency: 139 s naive, 22.7 s gateway (−84%), 8.3 s vLLM.",
  },
  {
    id: "gw-vllm", topic: "gateway", source: gw("Results", "#results"),
    keywords: "vllm comparison compare gap limitation limitations why slower than vllm 39%",
    brief: "On the same GPU the gateway reaches 39% of vLLM's throughput. It is a from-scratch scheduler, not a vLLM replacement.",
    detail: "The gateway reaches 39% of vLLM's throughput on the same T4 (236.3 vs 602.1 tok/s). The README attributes the gap to vLLM's paged KV cache (no padding and no copying when requests join or leave), CUDA graphs and custom kernels.",
  },
  {
    id: "gw-admission", topic: "gateway", source: gw("Burst results", "#burst-32--128--32-users-prompts-up-to-3072-tokens"),
    keywords: "admission control backpressure preemption oom out of memory burst reliability crash 429 memory",
    brief: "Under a burst from 32 to 128 users with long prompts, the gateway had 0 out-of-memory errors and peaked at 7.0 GB of the 15 GB GPU; without admission control the server ran out of memory 3 times and failed 77% of requests in the spike.",
    detail: "Every batch reserves the padded KV-cache memory its next step needs against a budget sized from free GPU memory; the newest request is paused and later resumed if memory runs short, prefill size is capped, and a full queue returns 429 with Retry-After. In the 32 → 128 → 32 user burst with prompts up to 3,072 tokens: admission control on gave 0 OOMs, 7.0 GB peak memory, and 87 requests timed out (most extra load got a fast 429); off gave 3 OOMs, 14.1 GB peak, and 181 of 236 requests (77%) failed.",
  },
  {
    id: "gw-lanes", topic: "gateway", source: gw("Long prompts", "#long-mixed-prompts-1282048-tokens-in-64512-out-32-users"),
    keywords: "length lanes bucketing padding profiler cost model kv tokens 62% long prompts p99",
    brief: "Length lanes keep short and long sequences in separate batches, which cut padded KV tokens by 62% and improved throughput 1.13× on long, mixed-length prompts.",
    detail: "The running set can split into length lanes so short sequences don't carry the padding of long ones; a cost model calibrated on the GPU at startup decides when a split pays for its extra forward pass. On long mixed prompts (128–2048 in, 64–512 out, 32 users): 122.8 vs 108.8 tok/s (1.13×), p99 latency 87.1 s vs 99.3 s (−12%). The PyTorch Profiler run showed 62% fewer padded KV tokens. With short prompts lanes make no difference, because the cost model only splits when padding is expensive enough.",
  },
  {
    id: "gw-method", topic: "gateway", source: gw("Results", "#results"),
    keywords: "benchmark methodology measured how measure setup colab t4 runs baseline ignore_eos limitations caveats",
    brief: "Gateway benchmarks ran on Google Colab Tesla T4 GPUs, compared against a request-at-a-time baseline and vLLM on the same GPU, and report the mean of 3 runs with different random workloads.",
    detail: "Measured on Google Colab Tesla T4 (15 GB) GPUs with Qwen2.5-1.5B-Instruct in fp16. Every request generates exactly max_tokens (ignore_eos), client and server share one machine, and steady-state numbers are mean ± standard deviation of 3 runs, each with a different random workload. Load tests are closed-loop; scripts/run_benchmarks.sh reproduces the sweep, burst test and profiler run. Results should be read with that setup in mind: one small model, one GPU, synthetic workloads.",
  },

  // ---- Chapter 02: Hybrid Search ------------------------------------------------
  {
    id: "hs-overview", topic: "search", source: hs("README", "#readme"),
    keywords: "hybrid search retrieval engine how work dense sparse combine bm25 embeddings fusion rrf",
    brief: "The Hybrid Search Engine runs keyword search (BM25) and vector search side by side and fuses their rankings, so it handles both exact terms and paraphrases. A cross-encoder can re-score the top candidates when a learned router predicts it will help.",
    detail: "A from-scratch BM25 (scipy sparse matrix, Lucene-style IDF) and bge-small-en-v1.5 embeddings in FAISS each return their top 100 for every query; the two rankings are combined with weighted reciprocal rank fusion. A cross-encoder (gte-reranker-modernbert-base) can then score the top 30 fused candidates and its ranking is fused back in as a voter rather than replacing the first-stage order.",
  },
  {
    id: "hs-results", topic: "search", source: { title: "Résumé · Hybrid Search & Ranking Engine", url: RESUME.url },
    keywords: "ndcg results improvement beir quality accuracy 12.6 5.5 dense bm25 significance",
    brief: "Tuned on dev splits only, the hybrid retriever improved nDCG@10 by 5.5 points over dense retrieval and 12.6 over BM25 across 3 BEIR datasets (p < 10^-5).",
    detail: "Across SciFact, NFCorpus and FiQA, with fusion weights, reranker and depth grid-searched on BEIR train/dev splits only, the hybrid pipeline improved nDCG@10 by 5.5 points over dense retrieval and 12.6 points over BM25 (paired t-test, p < 10^-5). Test queries were used only for the final evaluation.",
  },
  {
    id: "hs-router", topic: "search", source: HS_SIG,
    keywords: "router rerank reranking decide when which queries cross-encoder ridge regression latency 57% 49% 69%",
    brief: "A small learned router predicts which queries will benefit from expensive reranking and sends only 49% of them to the cross-encoder, cutting mean query latency 57% while keeping 69% of the full reranking gain (vs 49% for random selection).",
    detail: "A ridge-regression model over eight cheap query features predicts how much reranking will help each query; only queries above a threshold pay for the 1.6 s/query CPU cross-encoder. Sending 49% of queries to the reranker cut mean query latency 57% and recovered 69% of the full reranking gain, versus 49% when the same share is picked at random. The router is trained on dev queries and measured on test.",
  },
  {
    id: "hs-faiss", topic: "search", source: HS_SIG,
    keywords: "faiss benchmark hnsw ivf quantization binary index memory recall speed 51x 32x 200k",
    brief: "Rishi benchmarked 12 FAISS index configurations on 200K documents: HNSW was 51× faster than exact search at 0.968 Recall@10, and binary quantization with rescoring shrank the index 32× for a 0.01-point nDCG loss.",
    detail: "12 configurations (flat, scalar/product/binary quantization, HNSW, IVF) on a 200K-document Quora sample, measuring recall vs exact search, single-query latency, memory, build time and nDCG. HNSW: 51× faster than exact at 0.968 Recall@10. Binary quantization with rescoring: the in-memory index is exactly 32× smaller at a 0.01-point nDCG loss, but the float32 vectors used for rescoring stay on disk, so total storage does not shrink 32×.",
  },
  {
    id: "hs-ci", topic: "search", source: HS_DEF,
    keywords: "ci github actions quality gate regression pull request cache sqlite 88 minutes 39 seconds tests",
    brief: "A GitHub Actions gate evaluates retrieval quality on every pull request and fails it if quality drops more than 0.5 points; caching reranker scores cut the gate from 88 minutes to 39 seconds.",
    detail: "The CI gate runs the SciFact evaluation on CPU for every PR and fails if nDCG@10 or recall@100 drops more than 0.5 points below results/baseline.json. Cross-encoder scores are cached in SQLite by (model, query, passage), so CI only scores new pairs; that cut gate time from 88 minutes to 39 seconds.",
  },
  {
    id: "hs-limits", topic: "search", source: hs("Status", "#status"),
    keywords: "limitations limits next steps hosted production deployed not datasets license cpu reranker slow",
    brief: "The search engine's FastAPI service runs locally and is not hosted. Listed next steps are faster CPU reranking (ONNX/int8), incremental indexing and a held-out fourth dataset.",
    detail: "Per the README, the FastAPI /search service runs locally (not hosted). A reranked query takes about 1.6 s on CPU versus under 10 ms without reranking, which is why the router exists. Possible next steps listed: faster CPU reranking (ONNX/int8), incremental indexing, and evaluation on a held-out fourth dataset. Several BEIR datasets are non-commercial, so licenses must be checked before commercial use.",
  },

  // ---- Chapter 03: Cascade ---------------------------------------------------------
  {
    id: "cc-overview", topic: "cascade", source: cc("README", "#readme"),
    keywords: "cascade small model distillation how work decide when larger model llm confidence routing clinc150",
    brief: "The Small-Model Cascade distills an open LLM into a small INT8 DistilBERT model that answers in milliseconds on a CPU; each request goes to the LLM only when the small model isn't confident. It cut LLM calls by 68% at teacher-level accuracy.",
    detail: "Intent classification on CLINC150 (150 intents plus out-of-scope). Offline: an open Qwen LLM labels the data with decoding constrained to the 151 labels, DistilBERT is fine-tuned on those labels, exported to ONNX and quantized to INT8, then a temperature T and threshold τ are fit on validation. Online: the student computes softmax(logits / T); if confidence ≥ τ it answers, otherwise the request is escalated to the LLM.",
  },
  {
    id: "cc-decide", topic: "cascade", source: cc("How it works", "#how-it-works"),
    keywords: "decide threshold tau temperature scaling confidence calibration escalate when larger model budget 1%",
    brief: "The cascade escalates to the large model when the small model's calibrated confidence falls below a threshold. The threshold is chosen so the small model disagrees with the LLM on at most 1% of validation traffic.",
    detail: "Temperature scaling is fitted on the validation split; τ is the threshold that lets the student answer as much as possible while disagreeing with the teacher on at most 1% of validation traffic. Calibration tradeoff: T = 0.94 lowered test log-loss (0.4493 to 0.4478) but raised ECE from 0.021 to 0.027; it was kept because, with τ re-picked, coverage rose from 67.3% to 68.0% at the same 89.27% accuracy.",
  },
  {
    id: "cc-results", topic: "cascade", source: cc("Results", "#results"),
    keywords: "cascade results accuracy llm calls 68% 89.3 out-of-scope recall cost cheaper",
    brief: "With a 27.8B Qwen teacher, the cascade sent only 32% of requests to the LLM (68% fewer calls) and scored 89.27% accuracy vs 89.09% for the teacher alone.",
    detail: "CLINC150 test split (5,500 utterances, 18% out-of-scope): teacher only 89.09% accuracy and 88.8% out-of-scope recall; student only 85.69% and 79.3%; cascade 89.27% and 89.6%, with 32.0% LLM calls. Out-of-scope messages are 30% of escalations against 18% of traffic.",
  },
  {
    id: "cc-student", topic: "cascade", source: cc("Results", "#results"),
    keywords: "onnx int8 quantization student latency size 65 mb 257 1.9 ms cpu distilbert model optimization",
    brief: "The student model was exported to ONNX and quantized to INT8: 257 MB to 65 MB, 1.9 ms median latency on a CPU, with 98.3% agreement with the full-precision model.",
    detail: "DistilBERT student, ONNX Runtime, dynamic INT8 quantization: 257 MB to 65 MB (about 4×), 1.9 ms p50 and 3.1 ms p95 at batch size 1 on one CPU thread (Apple M4 Pro); FP32 runs at 3.6 ms. Prediction agreement with the FP32 PyTorch model is 98.3%.",
  },
  {
    id: "cc-teacher", topic: "cascade", source: cc("Teacher comparison", "#results"),
    keywords: "teacher labels ollama zero-shot 7b 27.8b qwen constrained decoding labeling cost free 16 hours",
    brief: "Training labels came from an open LLM run locally through Ollama at zero API cost. A stronger 27.8B teacher let 68% of traffic skip the LLM, versus 45% with a 7B teacher.",
    detail: "All 23,850 utterances were labeled zero-shot by a local Qwen model through Ollama with decoding constrained to the label set: 0 invalid outputs, about 16 hours on a laptop for the 27.8B teacher, no API cost. Same pipeline and 1% budget: Qwen2.5-7B teacher 72.4% accuracy, cascade 72.6%, 45.0% of LLM calls avoided (~100 min labeling); Qwen3.8 27.8B teacher 89.1%, cascade 89.3%, 68.0% avoided. Constrained decoding raised the 7B teacher from 67.8% to 74.6% vs free-form prompting.",
  },

  // ---- Explicitly not in the sources (prevents invented answers) ----------------
  {
    id: "no-publications", topic: "unknown", source: RESUME,
    keywords: "publications papers published research paper conference journal arxiv",
    brief: "Rishi's résumé and portfolio do not list any research publications.",
    detail: "Rishi's résumé and portfolio do not list any research publications. His projects are open-source repositories with reproducible benchmarks.",
  },
  {
    id: "no-work-authorization", topic: "unknown", source: RESUME,
    keywords: "work authorization authorized visa sponsorship sponsor citizen citizenship green card permit opt cpt h1b h-1b immigration status us united states",
    brief: "Work authorization and visa status are not covered in Rishi's résumé or portfolio, so I can't answer that. Please ask him directly at rishdevs.work@gmail.com.",
    detail: "Work authorization and visa status are not covered in Rishi's résumé or portfolio, so I can't answer that. Please ask him directly at rishdevs.work@gmail.com.",
  },
  {
    id: "no-production", topic: "unknown", source: { title: "Project READMEs", url: "https://github.com/RishDevs" },
    keywords: "production deployed deployment users customers real-world scale live hosted company projects used in production",
    brief: "The portfolio projects are open-source systems benchmarked on free GPUs and local machines; none is described as a production deployment.",
    detail: "None of the three projects is described as a production deployment. The gateway was benchmarked on Colab T4 GPUs, the search engine's FastAPI service runs locally (not hosted), and the cascade runs on a laptop or a free Kaggle/Colab T4.",
  },
]

/** Topics the assistant refuses to speculate on, answered with a fixed line. */
export const UNCOVERED =
  "That isn't covered in Rishi's résumé, project READMEs or this portfolio, so I can't answer it. You can ask him directly at rishdevs.work@gmail.com."
