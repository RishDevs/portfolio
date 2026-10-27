import { passages, type Passage } from "./kb"

const STOP = new Set(
  "a an and are as at be by did do does for from has have how i in is it its of on or rishi rishi's he his him that the this to was were what when where which who why with you your can about tell me".split(" "),
)

export const tokenize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9.@×%-]+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[.-]+|[.-]+$/g, ""))
    .filter((t) => t && !STOP.has(t))

// A few query words map onto the words the résumé actually uses.
const SYNONYMS: Record<string, string[]> = {
  speedup: ["throughput", "faster"],
  fast: ["throughput", "faster", "latency"],
  job: ["intern", "role", "roles"],
  work: ["intern", "roles", "built"],
  worked: ["intern"],
  before: ["intern", "pullulate"],
  school: ["university", "b.tech", "m.s"],
  grad: ["m.s", "university"],
  degree: ["m.s", "b.tech", "university"],
  available: ["availability", "graduates", "open"],
  hire: ["open", "roles"],
  rerank: ["reranking", "router", "cross-encoder"],
  search: ["retrieval", "hybrid"],
  llm: ["llm", "inference", "serving"],
  email: ["contact", "rishdevs.work@gmail.com"],
  contact: ["email", "reach"],
  good: ["skills", "tools", "programs"],
  know: ["skills", "tools", "programs"],
  reach: ["contact"],
  stack: ["tools", "skills"],
  languages: ["programs"],
}

type Doc = { p: Passage; tf: Map<string, number>; len: number }
const docs: Doc[] = passages.map((p) => {
  const toks = tokenize(`${p.source} ${p.text}`)
  const tf = new Map<string, number>()
  toks.forEach((t) => tf.set(t, (tf.get(t) ?? 0) + 1))
  return { p, tf, len: toks.length }
})
const avgLen = docs.reduce((s, d) => s + d.len, 0) / docs.length
const df = new Map<string, number>()
docs.forEach((d) => d.tf.forEach((_, t) => df.set(t, (df.get(t) ?? 0) + 1)))

export type Hit = { passage: Passage; score: number }

export function search(query: string, k = 4): Hit[] {
  const base = tokenize(query)
  const terms = [...new Set(base.flatMap((t) => [t, ...(SYNONYMS[t] ?? [])]))]
  const N = docs.length, k1 = 1.2, b = 0.75
  return docs
    .map((d) => {
      let score = 0
      for (const t of terms) {
        const f = d.tf.get(t)
        if (!f) continue
        const idf = Math.log(1 + (N - (df.get(t) ?? 0) + 0.5) / ((df.get(t) ?? 0) + 0.5))
        // Synonym expansions count half as much as words the visitor typed.
        const w = base.includes(t) ? 1 : 0.5
        score += w * idf * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / avgLen)))
      }
      return { passage: d.p, score }
    })
    .filter((h) => h.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
}
