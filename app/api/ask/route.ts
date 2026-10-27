import { search, type Hit } from "@/lib/ask/bm25"

// Letters page backend. Retrieval is BM25 over passages from Rishi's résumé.
// The reply is written by an LLM when one is configured, otherwise the best
// passage is quoted as written:
//   GROQ_API_KEY (+ optional GROQ_MODEL)        → Groq free tier (production)
//   OLLAMA_URL   (+ optional OLLAMA_MODEL)       → local Ollama (development)
//   neither                                      → retrieval only

const MIN_SCORE = 1.2
const MAX_Q = 300
const NOT_COVERED =
  "That isn't covered in Rishi's résumé or this issue. Try asking about his projects, experience, skills or availability, or email rishdevs.work@gmail.com."

// Best-effort per-instance rate limit: 12 questions per IP per 5 minutes.
const hits = new Map<string, number[]>()
function limited(ip: string) {
  const now = Date.now(), win = 5 * 60_000
  const list = (hits.get(ip) ?? []).filter((t) => now - t < win)
  list.push(now)
  hits.set(ip, list)
  if (hits.size > 5000) hits.clear()
  return list.length > 12
}

const SYSTEM = `You answer visitors' questions about Rishi Kolluru on his portfolio site.
Rules:
- Use ONLY the facts in the passages provided. If they don't answer the question, say it isn't covered and suggest emailing rishdevs.work@gmail.com.
- Answer in 1 to 3 plain sentences, third person ("Rishi ..."), no lists, no markdown.
- Keep every number exactly as written and keep its baseline (e.g. "vs one-at-a-time", "over BM25", "vs teacher").
- Never mention "passages", sources or bracketed numbers like [1]; just state the facts.
- Never use exclamation marks. Never invent employers, dates, numbers or links.`

type LLM = { url: string; key?: string; model: string }
function llmConfig(): LLM | null {
  if (process.env.GROQ_API_KEY)
    return { url: "https://api.groq.com/openai/v1/chat/completions", key: process.env.GROQ_API_KEY, model: process.env.GROQ_MODEL || "llama-3.1-8b-instant" }
  if (process.env.OLLAMA_URL)
    return { url: `${process.env.OLLAMA_URL.replace(/\/$/, "")}/v1/chat/completions`, model: process.env.OLLAMA_MODEL || "llama3.1:8b" }
  return null
}

async function generate(llm: LLM, q: string, context: Hit[]): Promise<string | null> {
  const passages = context.map((h, i) => `[${i + 1}] ${h.passage.text}`).join("\n")
  try {
    const res = await fetch(llm.url, {
      method: "POST",
      headers: { "content-type": "application/json", ...(llm.key ? { authorization: `Bearer ${llm.key}` } : {}) },
      body: JSON.stringify({
        model: llm.model,
        temperature: 0.2,
        max_tokens: 220,
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: `Passages:\n${passages}\n\nQuestion: ${q}` },
        ],
      }),
      signal: AbortSignal.timeout(9000),
    })
    if (!res.ok) return null
    const data = await res.json()
    const text: unknown = data?.choices?.[0]?.message?.content
    return typeof text === "string" && text.trim() ? text.trim() : null
  } catch {
    return null
  }
}

const clean = (s: string) =>
  s
    .replace(/,?\s*\(?\s*(as (stated|mentioned|noted) )?in passages? \[\d+\](\s*(and|,)\s*\[\d+\])*\s*\)?/gi, "")
    .replace(/\s*\[\d+\]/g, "")
    .replace(/!/g, ".").replace(/\.{2,}(?!\.)/g, ".").replace(/\s+/g, " ").trim()

export async function POST(request: Request) {
  let q = ""
  try {
    const body = await request.json()
    q = typeof body?.q === "string" ? body.q.trim() : ""
  } catch {
    return Response.json({ error: "Send JSON like {\"q\": \"...\"}." }, { status: 400 })
  }
  if (q.length < 2 || q.length > MAX_Q)
    return Response.json({ error: `Questions must be 2–${MAX_Q} characters.` }, { status: 400 })

  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local"
  if (limited(ip)) return Response.json({ error: "Too many questions. Try again in a few minutes." }, { status: 429 })

  const found = search(q, 4)
  if (!found.length || found[0].score < MIN_SCORE)
    return Response.json({ answer: NOT_COVERED, sources: [], mode: "none" })

  const llm = llmConfig()
  const written = llm ? await generate(llm, q, found) : null
  const answer = clean(written ?? found[0].passage.text)
  // Cite only passages that scored close to the best match.
  const used = written ? found.filter((h) => h.score >= found[0].score * 0.6) : found.slice(0, 1)
  const sources = [...new Set(used.map((h) => h.passage.source))].slice(0, 3)
  return Response.json(
    { answer, sources, mode: written ? "llm" : "retrieval" },
    { headers: { "cache-control": "no-store" } },
  )
}
