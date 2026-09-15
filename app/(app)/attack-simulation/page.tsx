"use client"

import { useState } from "react"
import { Play, RotateCcw, CheckCircle2, Circle, Loader2 } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { SeverityBadge } from "@/components/severity-badge"
import { Button } from "@/components/ui/button"
import { attackSteps, featuredVulnerability } from "@/lib/mock-data"

export default function AttackSimulationPage() {
  const [activeStep, setActiveStep] = useState(-1)
  const [running, setRunning] = useState(false)
  const [finished, setFinished] = useState(false)

  function run() {
    if (running) return
    setFinished(false)
    setActiveStep(-1)
    setRunning(true)
    attackSteps.forEach((_, i) => {
      setTimeout(() => {
        setActiveStep(i)
        if (i === attackSteps.length - 1) {
          setRunning(false)
          setFinished(true)
        }
      }, (i + 1) * 700)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Attack Simulation</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            A scripted, non-exploitable walkthrough of how the OTP bypass condition is identified.
          </p>
        </div>
        <Button onClick={run} disabled={running}>
          {running ? <Loader2 className="size-4 animate-spin" /> : finished ? <RotateCcw className="size-4" /> : <Play className="size-4" />}
          {running ? "Running..." : finished ? "Replay simulation" : "Run simulation"}
        </Button>
      </div>

      <div className="flex flex-col gap-3">
        {attackSteps.map((step, i) => {
          const reached = i <= activeStep
          const current = i === activeStep && running
          return (
            <GlassCard
              key={step.id}
              className={`flex flex-col gap-2 p-5 transition-colors ${reached ? "border-primary/40" : ""}`}
            >
              <div className="flex items-center gap-3">
                {reached ? (
                  <CheckCircle2 className={`size-4 shrink-0 ${current ? "text-primary" : "text-accent"}`} />
                ) : (
                  <Circle className="size-4 shrink-0 text-muted-foreground" />
                )}
                <span className="font-mono text-xs text-muted-foreground">Step {i + 1}</span>
                <h3 className="text-sm font-semibold">{step.title}</h3>
              </div>
              <p className="pl-7 text-sm text-muted-foreground">{step.description}</p>
              {reached && (
                <div className="ml-7 mt-1 grid gap-2 rounded-md border border-border bg-background/60 p-3 font-mono text-xs sm:grid-cols-2">
                  <div>
                    <p className="text-muted-foreground/70">request</p>
                    <p className="whitespace-pre-wrap text-foreground/90">{step.request}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground/70">
                      response &middot; {step.status} &middot; {step.timingMs}ms
                    </p>
                    <p className="whitespace-pre-wrap text-foreground/90">{step.response}</p>
                  </div>
                </div>
              )}
            </GlassCard>
          )
        })}
      </div>

      {finished && (
        <GlassCard className="flex flex-col gap-3 border-destructive/30 p-6">
          <div className="flex flex-wrap items-center gap-3">
            <SeverityBadge severity="critical" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {featuredVulnerability.cwe}
            </span>
          </div>
          <h2 className="text-base font-semibold">OTP verification control appears insufficiently enforced.</h2>
          <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <p>
              <span className="text-foreground">Impact: </span>
              {featuredVulnerability.impact}
            </p>
            <p>
              <span className="text-foreground">Recommended mitigation: </span>
              Enforce OTP validation server-side and bind the result to the session before elevating auth state.
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  )
}
