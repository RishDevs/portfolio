"use client"

import Image from "next/image"
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react"
import s from "./ask.module.css"

type Mode = "recruiter" | "engineer"
type Source = { title: string; url: string }
type Msg = { id: number; from: "bot" | "you"; text: string; sources?: Source[]; note?: string; error?: boolean }

const MAX = 300
const SUGGESTIONS: Record<Mode, string[]> = {
  recruiter: [
    "Summarize Rishi's experience in 30 seconds.",
    "Which projects are most relevant to AI infrastructure?",
    "What technologies has he used?",
  ],
  engineer: [
    "How does the LLM Inference Gateway work?",
    "How does the hybrid retrieval combine dense and sparse search?",
    "How does the cascade decide when to use the larger model?",
  ],
}
const INTRO =
  "Ask me about Rishi's projects, skills, education or experience. I only answer from his résumé, his project READMEs and this issue, and I link the source. If it isn't in there, I'll say so."

function Avatar() {
  return (
    <span className={s.avatar} aria-hidden="true">
      <Image src="/rishi-comic.jpg" alt="" width={96} height={96} />
    </span>
  )
}

/** The chat itself. Used inside the main page's panel and on /ask. */
export function AskChat({ onClose, titleId }: { onClose?: () => void; titleId?: string }) {
  const [mode, setMode] = useState<Mode>("recruiter")
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [q, setQ] = useState("")
  const [busy, setBusy] = useState(false)
  const nextId = useRef(1)
  const thread = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLTextAreaElement>(null)
  const ctrl = useRef<AbortController | null>(null)

  useEffect(() => () => ctrl.current?.abort(), [])
  useEffect(() => {
    const el = thread.current
    if (el) el.scrollTop = el.scrollHeight
  }, [msgs, busy])

  const push = (m: Omit<Msg, "id">) => setMsgs((list) => [...list, { ...m, id: nextId.current++ }])

  async function ask(text: string) {
    const question = text.trim()
    if (!question) { input.current?.focus(); return }
    if (busy) return
    push({ from: "you", text: question })
    setQ("")
    setBusy(true)
    const c = new AbortController()
    ctrl.current = c
    const timer = setTimeout(() => c.abort("timeout"), 15000)
    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ q: question, mode }),
        signal: c.signal,
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`)
      push({
        from: "bot",
        text: data.answer,
        sources: data.sources,
        note: data.mode === "retrieval" ? "quoted from the source" : undefined,
      })
    } catch (e) {
      // Aborted because the component closed: say nothing. Timed out: fall through.
      if (c.signal.aborted && c.signal.reason !== "timeout") return
      const msg = c.signal.reason === "timeout" ? "timeout" : (e as Error).message
      push({
        from: "bot",
        error: true,
        text: /too many/i.test(msg)
          ? "Too many questions in a short time. Please try again in a few minutes."
          : /characters/i.test(msg)
            ? msg
            : "The assistant is unavailable right now. The rest of the site works normally, and you can email rishdevs.work@gmail.com.",
      })
    } finally {
      clearTimeout(timer)
      setBusy(false)
      input.current?.focus()
    }
  }

  const onSubmit = (e: FormEvent) => { e.preventDefault(); ask(q) }
  const onKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) { e.preventDefault(); ask(q) }
  }

  return (
    <div className={s.chat}>
      <header className={s.head}>
        <div className={s.headText}>
          <p className={s.kicker}>Ask Rishi&apos;s AI · Issue 01</p>
          <h2 id={titleId} className={s.title}>Spidey Sense</h2>
          <p className={s.sub}>Explore my projects, skills, and engineering decisions.</p>
        </div>
        {onClose && (
          <button type="button" className={s.close} onClick={onClose} aria-label="Close the assistant">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>
          </button>
        )}
      </header>

      <div className={s.bar}>
        <span className={s.barLabel} id="ask-mode-label">Answer for</span>
        <div className={s.modes} role="radiogroup" aria-labelledby="ask-mode-label">
          {(["recruiter", "engineer"] as Mode[]).map((m) => (
            <button key={m} type="button" role="radio" aria-checked={mode === m} className={s.mode} onClick={() => setMode(m)}>
              {m === "recruiter" ? "Recruiter" : "Engineer"}
            </button>
          ))}
        </div>
        <span className={s.barHint}>{mode === "recruiter" ? "Short and plain" : "Mechanisms and benchmarks"}</span>
      </div>

      <div className={s.thread} ref={thread} role="log" aria-live="polite" aria-relevant="additions">
        <div className={s.botRow}>
          <Avatar />
          <p className={s.balloon}>{INTRO}</p>
        </div>

        {msgs.map((m) =>
          m.from === "you" ? (
            <p key={m.id} className={s.you}>{m.text}</p>
          ) : (
            <div key={m.id} className={s.botRow}>
              <Avatar />
              <div className={`${s.balloon} ${m.error ? s.balloonError : ""}`}>
                <p>{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <p className={s.sources}>
                    <span className={s.sourcesLabel}>Source{m.sources.length > 1 ? "s" : ""}</span>
                    {m.sources.map((src) => (
                      <span key={src.title} className={s.sourceItem}>
                        <a href={src.url} {...(src.url.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                          {src.title}{src.url.startsWith("http") ? " ↗" : ""}
                        </a>
                      </span>
                    ))}
                    {m.note && <span className={s.note}>{m.note}</span>}
                  </p>
                )}
              </div>
            </div>
          ),
        )}

        {busy && (
          <div className={s.botRow} role="status">
            <span className={`${s.avatar} ${s.sensing}`} aria-hidden="true">
              <Image src="/rishi-comic.jpg" alt="" width={96} height={96} />
              <svg className={s.squiggles} viewBox="0 0 64 64"><path d="M8 18q4-5 2-11" /><path d="M18 8q1-6-3-10" /><path d="M46 8q-1-6 3-10" /><path d="M56 18q-4-5-2-11" /></svg>
            </span>
            <p className={`${s.balloon} ${s.thinking}`}>Spider-sense tingling… checking the résumé and project docs.</p>
          </div>
        )}
      </div>

      <div className={s.suggest}>
        <p className={s.suggestLabel} id="ask-try-label">Try one</p>
        <div className={s.chips} role="group" aria-labelledby="ask-try-label">
          {SUGGESTIONS[mode].map((t) => (
            <button key={t} type="button" className={s.chip} onClick={() => ask(t)} disabled={busy}>{t}</button>
          ))}
        </div>
      </div>

      <form className={s.form} onSubmit={onSubmit}>
        <label htmlFor="ask-input" className={s.srOnly}>Your question</label>
        <textarea
          id="ask-input"
          ref={input}
          className={s.input}
          rows={2}
          maxLength={MAX}
          value={q}
          placeholder="Ask about a project, a skill or a benchmark"
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        <div className={s.formFoot}>
          <span className={s.count}>{q.length} / {MAX}</span>
          <button type="submit" className={s.send} disabled={busy || !q.trim()}>Send</button>
        </div>
      </form>
    </div>
  )
}
