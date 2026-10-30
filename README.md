<img src=".github/header.svg" width="100%" alt="portfolio — Portfolio — README header">

# Rishi Kolluru — Portfolio · Issue 01

A single-page, comic-book-style portfolio for **Rishi Kolluru**, ML / AI engineer
(M.S. CSE, University at Buffalo, Dec 2026). Each "chapter" is one system with a
live, interactive demo and numbers that each come with a baseline.

**Live:** https://rishi-kolluru.vercel.app
**Résumé:** https://rishi-kolluru.vercel.app/resume

## Chapters

| Chapter | System | Headline |
| --- | --- | --- |
| 01 · LLM serving | [LLM Inference Gateway](https://github.com/RishDevs/llm-inference-gateway) | 12.2× throughput, TTFT 109 s → 150 ms, 0 OOMs under a 4× burst |
| 02 · Retrieval | [Hybrid Search & Ranking Engine](https://github.com/RishDevs/hybrid-search-engine) | +12.6 nDCG@10 over BM25, −57% query latency |
| 03 · Distillation | [LLM-to-Small-Model Cascade](https://github.com/RishDevs/llm-small-model-cascade) | −68% LLM calls at teacher-level accuracy |

## Interactive pieces

- **Continuous-batching demo** — toggle one-at-a-time vs. batched serving and
  watch tokens stream, TTFT and queue depth change.
- **4× burst grid** — 100 requests against an unguarded server vs. the gateway.
- **Learned rerank router** — random vs. learned selection at the same budget.
- **Cascade demo** — fire 100 queries through the confidence gate.
- **Live request traces**, a sticky chapter tracker, and an animated wire scene
  that changes shape per chapter.

## Stack

- [Next.js 16](https://nextjs.org) (App Router; the page is static, `/api/ask` is the only server route)
- The Claude Design comic, ported 1:1:
  - `components/issue/markup.ts` — the page markup (generated from the export)
  - `components/issue/runtime.js` — animation, demos and the chapter wire scene
  - `components/issue/Issue.tsx` — mounts the runtime and opens the assistant
- Self-hosted fonts: Rozha One, Archivo, Space Mono (`public/fonts`)
- Deployed on Vercel

## Ask Rishi's AI (optional)

**Ask my spidey sense** in the top bar opens a small assistant that answers
questions about the projects, experience, skills and education, from the
résumé and the project repositories only, with sources. It has Recruiter and
Engineer modes, costs $0 to run (retrieval-only by default, Groq's free plan
if `GROQ_API_KEY` is set; xAI Grok has no free API tier), and is loaded only
when opened. Architecture, cost guarantees and the 42-question evaluation are
in [docs/assistant.md](docs/assistant.md).

## Résumé

The PDF lives at `public/Rishi_Kolluru_Resume.pdf`. Every "Résumé" button
downloads it as `Rishi-Kolluru-Resume.pdf`; `/resume` and `/cv` open it in the
browser. It's served with `must-revalidate`, so replacing the file and
redeploying updates it immediately.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

Assistant evaluation (42 questions, see `docs/assistant.md`):

```bash
npm run build && ASK_IP_LIMIT=10000 npx next start -p 3007
node scripts/eval-ask.mjs http://localhost:3007
```

Deploy:

```bash
vercel deploy --prod
```
