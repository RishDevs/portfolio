"use client"

import { useState } from "react"

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      data-cursor
      onClick={() => {
        navigator.clipboard?.writeText(email)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
      }}
      className="btn btn-ghost"
    >
      {copied ? "Copied ✓" : "Copy Email"}
    </button>
  )
}
