"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  ShieldAlert,
  LayoutDashboard,
  KeyRound,
  Crosshair,
  FileWarning,
  ListChecks,
  Gauge,
  Network,
  Info,
  ClipboardCheck,
  Menu,
  X,
} from "lucide-react"

import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/otp-lab", label: "OTP Lab", icon: KeyRound },
  { href: "/attack-simulation", label: "Attack Simulation", icon: Crosshair },
  { href: "/vulnerability-report", label: "Vulnerability Report", icon: FileWarning },
  { href: "/report", label: "Export Report", icon: ClipboardCheck },
  { href: "/remediation", label: "Remediation", icon: ListChecks },
  { href: "/security-score", label: "Security Score", icon: Gauge },
  { href: "/architecture", label: "Architecture", icon: Network },
  { href: "/about", label: "About", icon: Info },
]

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed left-4 top-4 z-40 flex size-9 items-center justify-center rounded-md border border-border bg-card text-foreground lg:hidden"
        aria-label="Open navigation"
      >
        <Menu className="size-4" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-border px-5 py-5">
          <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <ShieldAlert className="size-5 text-primary" />
            <span className="font-mono text-sm font-semibold tracking-wide text-foreground">OTPShield Lab</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="flex size-7 items-center justify-center rounded-md text-muted-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X className="size-4" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
          {nav.map((item) => {
            const active = pathname === item.href
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                )}
              >
                <Icon className="size-4 shrink-0" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            Demo mode &middot; simulated data only
          </p>
        </div>
      </aside>
    </>
  )
}
