"use client"

import { useState } from "react"
import { ShieldAlert, X } from "lucide-react"

export function TopBanner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="flex items-center gap-3 border-b border-warning/30 bg-warning/10 px-4 py-2 text-warning">
      <ShieldAlert className="size-4 shrink-0" />
      <p className="flex-1 text-xs font-medium leading-relaxed sm:text-sm">
        AUTHORIZED SECURITY TESTING ONLY &mdash; all data, accounts, and attack output on this platform are simulated for
        education. No real systems are targeted.
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss banner"
        className="shrink-0 rounded-md p-1 hover:bg-warning/20"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
