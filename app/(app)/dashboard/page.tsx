import Link from "next/link"
import { AlertTriangle, ShieldOff, Activity, KeyRound, ArrowRight } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { SeverityBadge } from "@/components/severity-badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { overallScore, scoreCategories, vulnerabilities, featuredVulnerability } from "@/lib/mock-data"

export default function DashboardPage() {
  const criticalCount = vulnerabilities.filter((v) => v.severity === "critical").length

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Security Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live overview of the simulated authentication posture for the OTP lab environment.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Security Score</span>
            <Activity className="size-4 text-primary" />
          </div>
          <p className="mt-3 font-mono text-3xl font-semibold text-destructive">{overallScore}/100</p>
          <p className="mt-1 text-xs text-muted-foreground">Critical risk baseline</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">OTP Verification</span>
            <KeyRound className="size-4 text-warning" />
          </div>
          <p className="mt-3 font-mono text-3xl font-semibold text-warning">Weak</p>
          <p className="mt-1 text-xs text-muted-foreground">Not server-enforced</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Vulnerabilities</span>
            <AlertTriangle className="size-4 text-destructive" />
          </div>
          <p className="mt-3 font-mono text-3xl font-semibold">{vulnerabilities.length}</p>
          <p className="mt-1 text-xs text-muted-foreground">{criticalCount} critical finding</p>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">Risk Level</span>
            <ShieldOff className="size-4 text-destructive" />
          </div>
          <p className="mt-3 font-mono text-3xl font-semibold text-destructive">Critical</p>
          <p className="mt-1 text-xs text-muted-foreground">Immediate remediation advised</p>
        </GlassCard>
      </div>

      <GlassCard className="flex flex-col gap-4 border-destructive/30 p-6">
        <div className="flex flex-wrap items-center gap-3">
          <SeverityBadge severity="critical" />
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            {featuredVulnerability.cwe}
          </span>
        </div>
        <h2 className="text-lg font-semibold">{featuredVulnerability.name}</h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">{featuredVulnerability.description}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link href="/vulnerability-report">
              View full report
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link href="/attack-simulation">Run attack simulation</Link>
          </Button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h2 className="text-sm font-semibold">Security Controls Breakdown</h2>
        <div className="mt-4 flex flex-col gap-4">
          {scoreCategories.map((cat) => (
            <div key={cat.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground">{cat.label}</span>
                <span className="font-mono text-muted-foreground">{cat.score}%</span>
              </div>
              <Progress
                value={cat.score}
                indicatorClassName={cat.score < 30 ? "bg-destructive" : cat.score < 60 ? "bg-warning" : "bg-accent"}
              />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
