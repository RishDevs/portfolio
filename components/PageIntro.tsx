import { RevealLines } from "@/components/Reveal"
import { Scramble } from "@/components/Scramble"
import { Marquee } from "@/components/Marquee"

export function PageIntro({
  index,
  label,
  titleLines,
  blurb,
  watermark,
  keywords,
}: {
  index: string
  label: string
  titleLines: string[]
  blurb?: string
  watermark?: string
  keywords?: string[]
}) {
  return (
    <header className="relative overflow-hidden">
      {/* animated aurora field */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="animate-blob absolute -left-[10%] top-[-20%] h-[55vh] w-[55vh] rounded-full opacity-55 blur-[90px]"
          style={{ background: "radial-gradient(circle, #2747ff, transparent 65%)" }}
        />
        <div
          className="animate-blob-2 absolute right-[-10%] top-[10%] h-[45vh] w-[45vh] rounded-full opacity-35 blur-[100px]"
          style={{ background: "radial-gradient(circle, #ff4d2e, transparent 65%)" }}
        />
        <div className="bg-grid absolute inset-0 opacity-70" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(5,9,18,0.4) 70%, var(--color-bg) 100%)",
          }}
        />
      </div>

      {/* crop marks */}
      <span className="crop crop-tl text-muted" aria-hidden />
      <span className="crop crop-tr text-muted" aria-hidden />

      {/* giant watermark */}
      {watermark && (
        <span
          className="pointer-events-none absolute -right-2 bottom-0 -z-10 select-none font-display font-bold leading-none text-[var(--color-surface-2)] opacity-50"
          style={{ fontSize: "clamp(6rem, 22vw, 20rem)", letterSpacing: "-0.05em" }}
          aria-hidden
        >
          {watermark}
        </span>
      )}

      <div className="wrap pt-32 pb-14 md:pt-40 md:pb-20">
        {/* masthead */}
        <div className="rule" style={{ background: "rgba(244,241,250,0.45)" }} />
        <div className="flex flex-wrap items-center justify-between gap-2 py-3">
          <span className="spec text-text">RK // AI Research</span>
          <span className="spec text-muted">{index}</span>
          <Scramble
            text={label}
            className="spec hidden text-[var(--color-blue)] sm:inline"
          />
        </div>
        <div className="rule-faint" style={{ background: "rgba(244,241,250,0.16)" }} />

        <RevealLines className="display-hero mt-14 max-w-[16ch]" lines={titleLines} />

        {blurb && (
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {blurb}
          </p>
        )}
      </div>

      {/* keyword ticker */}
      {keywords && keywords.length > 0 && (
        <div className="relative border-y border-[var(--color-line)] bg-[var(--color-surface)]/60 py-3 backdrop-blur-sm">
          <Marquee speed={36}>
            {keywords.map((k, i) => (
              <span key={i} className="mx-6 inline-flex items-center gap-6 whitespace-nowrap">
                <span className="spec text-muted">{k}</span>
                <span className="text-[var(--color-red)]">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      )}
    </header>
  )
}
