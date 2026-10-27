import { passages, type Passage } from "./kb"

// Small in-memory BM25 over the knowledge base. ~40 passages, so no vector
// store or embedding API is needed (and nothing here costs money).

const STOP = new Set(
  "a an and are as at be by did do does for from has have how i in is it its of on or rishi rishi's rishis he his him that the this to was were what when where which who why with you your can about tell me give please explain describe any used use uses ever some there been still currently really".split(" "),
)

export const tokenize = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^a-z0-9.@×%/-]+/g, " ")
    .split(/\s+/)
    .map((t) => t.replace(/^[./-]+|[./-]+$/g, ""))
    .filter((t) => t && !STOP.has(t))

// Query words mapped onto words the sources use.
const SYNONYMS: Record<string, string[]> = {
  speedup: ["throughput", "faster"],
  fast: ["throughput", "latency"],
  job: ["experience", "intern"],
  worked: ["experience", "intern"],
  before: ["previous", "intern"],
  work: ["experience", "projects"],
  school: ["education", "university"],
  college: ["education", "university"],
  grad: ["education", "m.s"],
  degree: ["education"],
  study: ["education"],
  gpa: ["gpa"],
  hire: ["availability", "contact"],
  rerank: ["reranking", "router"],
  search: ["retrieval", "hybrid"],
  serving: ["gateway", "inference"],
  inference: ["gateway"],
  distill: ["distillation", "cascade"],
  cheaper: ["cost", "cascade"],
  cost: ["cascade", "llm calls"],
  stack: ["skills", "technologies"],
  benchmark: ["benchmarks", "methodology", "measured"],
  benchmarks: ["methodology", "measured"],
  limitation: ["limitations"],
  weakness: ["limitations"],
}

type Doc = { p: Passage; tf: Map<string, number>; len: number }
const docs: Doc[] = passages.map((p) => {
  // Keywords and the source title count alongside the text itself.
  const toks = tokenize(`${p.topic} ${p.keywords ?? ""} ${p.source.title} ${p.brief} ${p.detail}`)
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
  const terms = [...new Set(base.flatMap((t) => [t, ...(SYNONYMS[t] ?? []).flatMap(tokenize)]))]
  const N = docs.length, k1 = 1.2, b = 0.75
  return docs
    .map((d) => {
      let score = 0
      for (const t of terms) {
        const f = d.tf.get(t)
        if (!f) continue
        const n = df.get(t) ?? 0
        const idf = Math.log(1 + (N - n + 0.5) / (n + 0.5))
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
