"use client"

import { useEffect, useRef } from "react"
import { issueMarkup } from "./markup"
import { IssueRuntime } from "./runtime"

export function Issue() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const runtime = new IssueRuntime(root)
    runtime.mount()
    document.documentElement.dataset.issueReady = "1"
    return () => runtime.unmount()
  }, [])

  return (
    <div
      ref={ref}
      // Static design markup; the runtime above only mutates styles/text.
      dangerouslySetInnerHTML={{ __html: issueMarkup }}
      suppressHydrationWarning
    />
  )
}
