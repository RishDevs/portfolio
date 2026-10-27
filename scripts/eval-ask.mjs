#!/usr/bin/env node
// Evaluate Ask Rishi's AI against eval/ask-eval.json.
//
//   node scripts/eval-ask.mjs [baseUrl] [--out results.json]
//
// Start a server first (npm run build && ASK_IP_LIMIT=10000 npx next start).
// Checks per question: cites the expected source, contains the expected facts,
// avoids forbidden claims, declines unknown / out-of-scope questions, and uses
// no number that is absent from the knowledge base (a hallucinated figure).
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)))
const args = process.argv.slice(2)
const base = (args.find((a) => /^https?:/.test(a)) || "http://localhost:3000").replace(/\/$/, "")
const outIdx = args.indexOf("--out")
const out = outIdx >= 0 ? args[outIdx + 1] : null

const { questions } = JSON.parse(fs.readFileSync(path.join(root, "eval/ask-eval.json"), "utf8"))
const { passages, UNCOVERED } = await import(path.join(root, "lib/ask/kb.ts"))
const kbText = passages.map((p) => `${p.brief} ${p.detail} ${p.source.title}`).join(" ")
const nums = (s) => new Set((s.replace(/−/g, "-").match(/\d+(?:[.,]\d+)*/g) ?? []).map((n) => n.replace(/,/g, "").replace(/\.0+$/, "")))
const kbNums = nums(kbText)
const DECLINE = /isn't covered|not covered|can't answer|cannot answer|don't have|do not have|no information/i
const lc = (s) => s.toLowerCase()

const rows = []
for (const item of questions) {
  const t0 = performance.now()
  let data = {}, status = 0
  try {
    const res = await fetch(`${base}/api/ask`, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ q: item.q, mode: item.mode }) })
    status = res.status
    data = await res.json()
  } catch (e) {
    data = { error: String(e) }
  }
  const ms = Math.round(performance.now() - t0)
  const answer = data.answer ?? ""
  const cited = (data.sources ?? []).map((s) => `${s.title} ${s.url}`).join(" | ")
  const fails = []
  if (status !== 200) fails.push(`HTTP ${status} ${data.error ?? ""}`)
  const declined = answer === UNCOVERED || DECLINE.test(answer)
  if (item.unknown && !declined) fails.push("should decline")
  if (!item.unknown) {
    if (item.source && !lc(cited).includes(lc(item.source))) fails.push(`missing source "${item.source}"`)
    if (item.any && !item.any.some((p) => lc(answer).includes(lc(p)))) fails.push(`missing one of ${JSON.stringify(item.any)}`)
    if (item.all && !item.all.every((p) => lc(answer).includes(lc(p)))) fails.push(`missing ${JSON.stringify(item.all)}`)
  }
  if (item.none) for (const p of item.none) if (lc(answer).includes(lc(p))) fails.push(`forbidden "${p}"`)
  const invented = [...nums(answer)].filter((n) => !kbNums.has(n))
  if (invented.length) fails.push(`numbers not in knowledge base: ${invented.join(", ")}`)
  if (data.answer && !declined && !(data.sources ?? []).length) fails.push("substantive answer without sources")
  rows.push({ ...item, ms, mode_used: data.mode, answer, cited, fails, hallucinated: invented.length > 0 })
  process.stdout.write(fails.length ? "x" : ".")
}
process.stdout.write("\n")

const pass = rows.filter((r) => !r.fails.length).length
const lat = rows.map((r) => r.ms).sort((a, b) => a - b)
const pct = (p) => lat[Math.min(lat.length - 1, Math.floor((p / 100) * lat.length))]
const byCat = {}
for (const r of rows) {
  const c = (byCat[r.cat] ??= { n: 0, pass: 0 })
  c.n++
  if (!r.fails.length) c.pass++
}
const modes = rows.reduce((m, r) => ((m[r.mode_used ?? "error"] = (m[r.mode_used ?? "error"] ?? 0) + 1), m), {})
const summary = {
  base, total: rows.length, passed: pass, accuracy: +(pass / rows.length).toFixed(3),
  hallucinations: rows.filter((r) => r.hallucinated).length,
  latency_ms: { p50: pct(50), p95: pct(95), max: lat[lat.length - 1] },
  answer_modes: modes, by_category: byCat,
}
console.log(JSON.stringify(summary, null, 2))
for (const r of rows.filter((r) => r.fails.length)) console.log(`\n✗ ${r.id} [${r.mode}] ${r.q}\n  ${r.fails.join("; ")}\n  → ${r.answer.slice(0, 220)}`)
if (out) fs.writeFileSync(out, JSON.stringify({ summary, rows }, null, 2))
process.exit(pass === rows.length ? 0 : 1)
