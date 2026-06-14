"use client"

import { Marquee } from "@/components/Marquee"

const ITEMS: { k: string; v: string }[] = [
  { k: "91.7%", v: "Recall@1" },
  { k: "0.93", v: "mAP" },
  { k: "<1ms", v: "FAISS latency" },
  { k: "ViT-B/32", v: "dual encoder" },
  { k: "6", v: "agent platform" },
  { k: "RAG", v: "+ dynamic routing" },
  { k: "P50/P95", v: "latency tracking" },
  { k: "pgvector", v: "+ Redis cache" },
  { k: "PyTorch", v: "/ FastAPI / Docker" },
  { k: "EN·ES·FR", v: "multilingual" },
]

export function ProofStrip() {
  return (
    <section
      className="paper relative border-y-2 border-[var(--color-ink)] py-4"
      aria-label="Key metrics"
    >
      <Marquee speed={34}>
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="mx-6 inline-flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="font-display text-2xl font-medium text-ink md:text-3xl">
              {item.k}
            </span>
            <span className="spec text-ink-soft">{item.v}</span>
            <span className="mx-4 text-lg text-[var(--color-vermillion)]">✦</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
