# Ask Rishi's AI

An optional, portfolio-grounded assistant. It answers questions about Rishi's
projects, experience, skills and education from his résumé, his three
project repositories and this site, cites the source for every answer, and
says so when something isn't covered. It costs $0 to run.

It is a supporting feature of the site, not a fourth project. The three
chapters remain the portfolio.

## Using it

- **Ask my spidey sense** in the top bar opens a side panel (full screen on
  phones). Nothing opens on its own.
- **Recruiter** mode (default) gives two or three plain sentences with the
  headline result. **Engineer** mode gives the mechanism, exact benchmark
  numbers with their setup and baseline, and any stated limitation.
- Three suggested questions per mode, one input (300 characters max),
  source links under every answer, a Close button and Escape to close.
- `/ask` is the same assistant as a standalone page. Without JavaScript the
  top-bar link goes there.

## Architecture

```
question ─▶ /api/ask (Next.js route, server only)
             │
             ├─ guards: length 2–300, 15 questions / IP / 5 min,
             │          instruction-style input ("ignore your rules…") refused
             │
             ├─ retrieve: BM25 over 35 verified passages (lib/ask)
             │    └─ best score below threshold ─▶ "isn't covered" reply
             │
             ├─ write (only if a FREE model is configured and budget remains)
             │    Groq free plan  (GROQ_API_KEY, production)
             │    Ollama          (OLLAMA_URL, local development)
             │    one attempt, 8 s timeout, max 180 / 360 output tokens
             │
             ├─ verify the model's answer, else discard it:
             │    · every number must appear in the retrieved passages
             │    · every number must keep its unit (12.6 points ≠ 12.6%)
             │    · every link must appear in the retrieved passages
             │    · "how much / how many / when" answers must carry a number
             │      from the best passage
             │
             └─ answer = verified model text, or the best passage quoted
                         as written; sources = that passage's links
```

### Knowledge base (`lib/ask/kb.ts`)

35 hand-written passages, each restating content from **one** cited source:
the résumé PDF, a repository README, or a repository doc
(`docs/02-significance.md`, `docs/04-defense.md` in the search engine). Each
has a recruiter version (`brief`) and an engineer version (`detail`), written
as complete sentences so they can be quoted directly.

Four passages exist only to stop invented answers: no listed publications,
no production deployments, work authorization / visa status not covered,
and a fixed "not covered" reply for everything else.

Every number in every passage was checked against its cited source document,
and every GitHub anchor against the README headings. Two corrections came out
of that check: HNSW recall is 0.968 (not the rounded 0.97), and the binary
index's 32× saving applies to the in-memory index only.

### Retrieval (`lib/ask/bm25.ts`)

BM25 (k1 = 1.2, b = 0.75) over each passage's topic, keywords, source title
and text, with a small synonym map ("grad school" → education, "speedup" →
throughput). With 35 passages there is no need for embeddings, a vector
store or any paid embedding API. Retrieval takes about 1 ms.

## Model selection and cost

The requirement is $0 with no possibility of charges.

| Option | Verdict |
| --- | --- |
| **xAI Grok** (preferred) | **Not used.** xAI's API docs list per-token prices only (cheapest model $1.00 / M input tokens) and no free tier or signup credit. Free Grok in the X app does not include API access. Third-party claims of free credits contradict each other and the official pages. |
| **Groq free plan** | **Used when `GROQ_API_KEY` is set.** No payment method is needed; a card is only required to upgrade to the paid Developer plan. Over the free limits the API returns `429`, it does not bill. Model: `llama-3.1-8b-instant`. |
| Browser (WebGPU) model | Not needed: large download, uneven device support. |
| **Retrieval only** | **Always available.** Used when no key is set, the daily budget is spent, the provider rate-limits, times out or errors. |

Zero-cost guarantees in code (`app/api/ask/route.ts`):

- The only hosted endpoint is Groq. There is no code path to a paid provider,
  and no automatic switch to one.
- `LLM_DAILY_LIMIT` (default 800) caps model calls per server instance per
  UTC day, below Groq's free daily request limits.
- A `429` from Groq starts a cooldown (its `Retry-After`, at most 10 minutes).
- One attempt per question, no retries.
- The key stays server-side; the browser only talks to `/api/ask`.

**Keep the Groq organisation on the Free plan and never add a payment
method.** That is what makes a charge impossible.

### Enabling model-written answers

1. Create a free account at console.groq.com (no card), then an API key.
2. `vercel env add GROQ_API_KEY production`, paste the key.
3. `vercel deploy --prod`.

Until then the live assistant answers in retrieval-only mode.

## Evaluation

`eval/ask-eval.json` has 42 questions across education, experience, skills,
LLM infrastructure, retrieval, model optimization, benchmark methodology,
limitations, unknown facts, out-of-scope requests, prompt injection and
recruiter questions. `scripts/eval-ask.mjs` checks each answer for:

- the expected source among its citations
- the expected facts
- forbidden claims (for example "is a strong candidate", invented
  employers, work-authorization statements)
- declining when it should (unknown and out-of-scope questions)
- **hallucinated numbers**: any number not present anywhere in the
  knowledge base
- a substantive answer with no sources

Results (Oct 27, 2026):

| Mode | Passed | Hallucinated numbers | Latency p50 / p95 |
| --- | --- | --- | --- |
| Retrieval only (live default) | 42 / 42 | 0 | 1 ms / 2 ms |
| Model-written (Qwen2.5-7B via local Ollama) | 42 / 42 | 0 | 1.1 s / 2.5 s |

In the model-written run, 29 answers were written by the model, 6 were
declined (unknown, out-of-scope, injection), and 7 model drafts were
rejected by the verification step and replaced with the quoted passage.

The Groq model was not run, because it needs your free key. The local run uses a 7B
model of similar size, through the same code path and the same checks.

What the evaluation found and changed:

- A model answer said nDCG@10 improved by "12.6%" when the source says
  12.6 **points**. The number check passed it; the unit check was added.
- Answers that dropped the headline number ("faster by reducing overhead…")
  are now rejected for quantity questions, and recruiter mode is given the
  plain-language summaries, which lead with the headline numbers.
- Retrieval fixes: "work before grad school", "used in production", work
  authorization, and the word "ignore" matching a README flag.
- After manual review, two checks were widened to accept correct wording
  ("ridge-regression" for the router, "only for the final evaluation" for
  test-set tuning).

Run it yourself:

```bash
npm run build && ASK_IP_LIMIT=10000 npx next start -p 3007
node scripts/eval-ask.mjs http://localhost:3007
```

## Failure handling

| Situation | What the visitor sees |
| --- | --- |
| No model key / budget spent / provider 429, timeout or error | The verified passage, quoted, with its source |
| Question not in the sources | "That isn't covered…", with Rishi's email |
| Instruction-style or off-topic request | A short refusal |
| Too many questions from one IP | "Too many questions…" |
| `/api/ask` unreachable | "The assistant is unavailable right now. The rest of the site works normally." |

The assistant's code is loaded only when it is opened, so it adds nothing to
the main page's load time. The rest of the site does not depend on it.

## Limitations

- Retrieval is keyword-based. Questions phrased very differently from the
  sources can miss; the synonym map covers the common cases.
- Rate limits are per server instance (best effort), not global.
- Answers cover only what the sources say. Anything else is declined, by
  design.
