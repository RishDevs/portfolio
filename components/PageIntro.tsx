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
    <header className="wrap pt-36 pb-12 md:pt-44">
      <div className="flex items-center gap-4">
        <span className="font-mono text-sm text-green">{index}</span>
        <span className="h-px flex-1 bg-[var(--color-line)]" />
        <span className="label">{label}</span>
      </div>
      <RevealLines
        className="display-hero mt-10 max-w-[16ch]"
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
