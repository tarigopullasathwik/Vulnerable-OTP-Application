"use client"

import { useState } from "react"
import { KeyRound, Lock, User, ShieldCheck, TerminalSquare } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { OtpInput } from "@/components/otp-input"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

const LOG_STEPS = [
  "[client] submitting username + password to /validate_login.php",
  "[server] credentials accepted -> OTP challenge issued",
  "[client] rendering 6-digit OTP input, awaiting user entry",
  "[client] submitting OTP value to session handler",
  "[server] session flag set to authenticated (no server-side OTP re-check observed)",
  "[analysis] result: authentication succeeded independent of OTP correctness",
]

export default function OtpLabPage() {
  const [demoMode, setDemoMode] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [log, setLog] = useState<string[]>([])
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  function runLab() {
    if (running) return
    setDone(false)
    setLog([])
    setRunning(true)
    LOG_STEPS.forEach((line, i) => {
      setTimeout(() => {
        setLog((prev) => [...prev, line])
        if (i === LOG_STEPS.length - 1) {
          setRunning(false)
          setDone(true)
        }
      }, (i + 1) * 550)
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">OTP Login Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A simulated, intentionally vulnerable authentication flow. No real accounts, backend, or network requests
          are involved.
        </p>
      </div>

      <Alert variant="warning">
        <ShieldCheck />
        <AlertTitle>Controlled lab environment</AlertTitle>
        <AlertDescription>
          Everything below runs client-side against mock state. This reproduces the observable behavior of the
          reference vulnerable app for educational purposes only &mdash; no bypass mechanics are executed or
          exploitable.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 lg:grid-cols-2">
        <GlassCard className="flex flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Simulated Login</h2>
            <div className="flex items-center gap-2">
              <Label htmlFor="demo-mode" className="text-xs text-muted-foreground">
                Demo Mode
              </Label>
              <Switch id="demo-mode" checked={demoMode} onCheckedChange={setDemoMode} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="lab_user"
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Label className="flex items-center gap-2">
              <KeyRound className="size-3.5" />
              6-digit OTP
            </Label>
            <OtpInput value={otp} onChange={setOtp} />
          </div>

          <Button onClick={runLab} disabled={running} className="mt-2">
            {running ? "Running simulation..." : "Login"}
          </Button>
        </GlassCard>

        <GlassCard className="flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <TerminalSquare className="size-4 text-primary" />
            <h2 className="text-sm font-semibold">Client-Side State Log</h2>
          </div>
          <div className="min-h-[220px] rounded-md border border-border bg-background/60 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
            {log.length === 0 && !running && (
              <p className="text-muted-foreground/60">Run the simulated login to see the step-by-step trace.</p>
            )}
            {log.map((line, i) => (
              <p key={i} className={i === log.length - 1 && done ? "text-warning" : "text-foreground/80"}>
                {`> ${line}`}
              </p>
            ))}
          </div>

          {done && (
            <Alert variant="destructive">
              <ShieldCheck />
              <AlertTitle>Educational takeaway</AlertTitle>
              <AlertDescription>
                Notice that the session reached &quot;authenticated&quot; state without the server ever confirming
                the OTP value. This is the core weakness documented in the vulnerability report: OTP verification
                must happen &mdash; and be enforced &mdash; on the server, not inferred from client-reported state.
              </AlertDescription>
            </Alert>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
