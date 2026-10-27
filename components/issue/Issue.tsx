"use client"

import dynamic from "next/dynamic"
import { useCallback, useEffect, useRef, useState } from "react"
import { issueMarkup } from "./markup"
import { IssueRuntime } from "./runtime"

// The assistant is optional: its code is fetched only when someone opens it.
const loadPanel = () => import("@/components/ask/AskPanel")
const AskPanel = dynamic(loadPanel, { ssr: false })

export function Issue() {
  const ref = useRef<HTMLDivElement>(null)
  const [askOpen, setAskOpen] = useState(false)
  const close = useCallback(() => setAskOpen(false), [])

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const runtime = new IssueRuntime(root)
    runtime.mount()
    document.documentElement.dataset.issueReady = "1"

    // "Ask my spidey sense" links go to /ask without JS; with JS they open the panel.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element).closest?.("[data-ask-open]")
      if (!a || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      setAskOpen(true)
    }
    const warm = (e: Event) => { if ((e.target as Element).closest?.("[data-ask-open]")) loadPanel() }
    root.addEventListener("click", onClick)
    root.addEventListener("pointerover", warm, { passive: true })
    root.addEventListener("focusin", warm)
    return () => {
      runtime.unmount()
      root.removeEventListener("click", onClick)
      root.removeEventListener("pointerover", warm)
      root.removeEventListener("focusin", warm)
    }
  }, [])

  return (
    <>
      <div
        ref={ref}
        className="issue-root"
        // Static design markup; the runtime above only mutates styles/text.
        dangerouslySetInnerHTML={{ __html: issueMarkup }}
        suppressHydrationWarning
      />
      {askOpen && <AskPanel onClose={close} />}
    </>
  )
}
