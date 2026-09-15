import Link from "next/link"
import {
  ShieldAlert,
  KeyRound,
  Crosshair,
  ListChecks,
  Gauge,
  FileWarning,
  ArrowRight,
  Terminal,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { TopBanner } from "@/components/top-banner"
import { GlassCard } from "@/components/glass-card"

const features = [
  {
    icon: KeyRound,
    title: "Vulnerable OTP Lab",
    description:
      "Interact with a simulated, intentionally weak OTP login flow to see how improper enforcement plays out step by step.",
  },
  {
    icon: Crosshair,
    title: "Attack Simulation",
    description:
      "Walk through a scripted, non-exploitable pipeline that mirrors how a real assessment identifies an authentication bypass.",
  },
  {
    icon: FileWarning,
    title: "Vulnerability Reporting",
    description: "Read structured findings mapped to CWE categories, with impact and detection methodology.",
  },
  {
    icon: ListChecks,
    title: "Remediation Center",
    description: "Work through the concrete server-side fixes that close each gap, with a before/after checklist.",
  },
  {
    icon: Gauge,
    title: "Security Score",
    description: "Watch an animated score breakdown move from a critical baseline toward a hardened configuration.",
  },
]

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBanner />

      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <div className="flex items-center gap-2">
          <ShieldAlert className="size-5 text-primary" />
          <span className="font-mono text-sm font-semibold tracking-wide">OTPShield Lab</span>
        </div>
        <Button asChild size="sm">
          <Link href="/dashboard">
            Enter dashboard
            <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </header>

      <main className="grid-glow-bg flex-1">
        <section className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-primary">
            <Terminal className="size-3.5" />
            demo mode &middot; simulated data only
          </span>
          <h1 className="text-glow-primary text-balance text-4xl font-semibold leading-tight sm:text-6xl">
            OTPShield Lab
          </h1>
          <p className="max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
            An interactive OTP &amp; two-factor authentication security testing platform. Explore, in a fully
            simulated environment, how weak MFA enforcement is discovered, scored, and remediated.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Open Security Dashboard
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/otp-lab">Try the OTP Lab</Link>
            </Button>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-4 px-6 pb-24 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <GlassCard key={feature.title} className="flex flex-col gap-3 p-6">
                <div className="flex size-9 items-center justify-center rounded-md border border-primary/30 bg-primary/10 text-primary">
                  <Icon className="size-4" />
                </div>
                <h3 className="text-sm font-semibold">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </GlassCard>
            )
          })}
        </section>
      </main>

      <footer className="border-t border-border px-6 py-6 text-center font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
        Authorized security testing only &middot; no real systems are targeted
      </footer>
    </div>
  )
}
