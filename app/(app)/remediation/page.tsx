"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { remediationItems, secureConfigChecklist } from "@/lib/mock-data"

export default function RemediationPage() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const doneCount = Object.values(checked).filter(Boolean).length
  const pct = Math.round((doneCount / remediationItems.length) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Remediation Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Server-side fixes required to close the gaps identified in the vulnerability report.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-3 lg:col-span-2">
          <GlassCard className="p-5">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="font-semibold">Remediation Progress</span>
              <span className="font-mono text-muted-foreground">
                {doneCount}/{remediationItems.length}
              </span>
            </div>
            <Progress value={pct} indicatorClassName="bg-accent" />
          </GlassCard>

          {remediationItems.map((item) => (
            <GlassCard key={item.id} className="flex items-start gap-3 p-5">
              <Checkbox
                id={item.id}
                checked={!!checked[item.id]}
                onCheckedChange={(v) => setChecked((prev) => ({ ...prev, [item.id]: !!v }))}
                className="mt-0.5"
              />
              <label htmlFor={item.id} className="flex flex-1 flex-col gap-1 cursor-pointer">
                <span
                  className={`text-sm font-medium ${checked[item.id] ? "text-muted-foreground line-through" : "text-foreground"}`}
                >
                  {item.label}
                </span>
                <span className="text-sm leading-relaxed text-muted-foreground">{item.detail}</span>
              </label>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="flex h-fit flex-col gap-3 p-5">
          <h2 className="text-sm font-semibold">Secure Configuration Target</h2>
          <p className="text-xs text-muted-foreground">
            Controls that should be enforced once remediation is complete.
          </p>
          <div className="mt-2 flex flex-col gap-2.5">
            {secureConfigChecklist.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground/90">
                <CheckCircle2 className="size-4 shrink-0 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
