"use client"

import { useState } from "react"

import { GlassCard } from "@/components/glass-card"
import { SecurityScoreGauge } from "@/components/security-score-gauge"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { scoreCategories, overallScore, remediatedScore } from "@/lib/mock-data"

export default function SecurityScorePage() {
  const [remediated, setRemediated] = useState(false)

  const categories = scoreCategories.map((cat) => ({
    ...cat,
    score: remediated ? Math.min(100, cat.score + (100 - cat.score) * 0.85) : cat.score,
  }))

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Security Score</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Composite score across authentication, session, and transport controls.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="remediated" className="text-sm text-muted-foreground">
            Simulate remediation
          </Label>
          <Switch id="remediated" checked={remediated} onCheckedChange={setRemediated} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <GlassCard className="flex flex-col items-center justify-center gap-2 p-8">
          <SecurityScoreGauge score={remediated ? remediatedScore : overallScore} />
          <p className="text-sm text-muted-foreground">
            {remediated ? "Projected post-remediation score" : "Current baseline score"}
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-4 p-6 lg:col-span-2">
          <h2 className="text-sm font-semibold">Category Breakdown</h2>
          {categories.map((cat) => (
            <div key={cat.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-foreground">
                  {cat.label} <span className="text-muted-foreground">&middot; weight {cat.weight}%</span>
                </span>
                <span className="font-mono text-muted-foreground">{Math.round(cat.score)}%</span>
              </div>
              <Progress
                value={cat.score}
                indicatorClassName={cat.score < 30 ? "bg-destructive" : cat.score < 60 ? "bg-warning" : "bg-accent"}
              />
            </div>
          ))}
        </GlassCard>
      </div>
    </div>
  )
}
