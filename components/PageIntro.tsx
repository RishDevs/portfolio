import { RevealLines } from "@/components/Reveal"

export function PageIntro({
  index,
  label,
  titleLines,
  blurb,
}: {
  index: string
  label: string
  titleLines: string[]
  blurb?: string
}) {
  return (
    <header className="wrap pt-32 pb-12 md:pt-40">
      {/* journal masthead */}
      <div
        className="rule"
        style={{ background: "rgba(245,247,250,0.5)" }}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 py-3">
        <span className="spec text-text">RK — AI Systems Journal</span>
        <span className="spec text-muted">{index}</span>
        <span className="spec hidden text-[var(--color-lime)] sm:inline">
          {label}
        </span>
      </div>
      <div className="rule-faint" style={{ background: "rgba(245,247,250,0.16)" }} />

      <RevealLines
        className="display-hero mt-12 max-w-[16ch]"
        lines={titleLines}
      />
      {blurb && (
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          {blurb}
        </p>
      )}
    </header>
  )
}
