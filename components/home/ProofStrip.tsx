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
      className="relative border-y border-[var(--color-line)] bg-[var(--color-surface)] py-5"
      aria-label="Key metrics"
    >
      <Marquee speed={32}>
        {ITEMS.map((item, i) => (
          <span
            key={i}
            className="group mx-7 inline-flex items-baseline gap-2 whitespace-nowrap"
          >
            <span className="display-lg font-display text-text transition-colors group-hover:text-green">
              {item.k}
            </span>
            <span className="label-sm text-faint">{item.v}</span>
            <span className="mx-5 text-[var(--color-line-2)]">/</span>
          </span>
        ))}
      </Marquee>
    </section>
  )
}
