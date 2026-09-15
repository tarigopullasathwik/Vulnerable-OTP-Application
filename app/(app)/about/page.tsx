import { ShieldAlert, GraduationCap, ScrollText, Github } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { Separator } from "@/components/ui/separator"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">About This Lab</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Context, scope, and ethical boundaries for the OTPShield Lab platform.
        </p>
      </div>

      <GlassCard className="flex flex-col gap-4 p-6">
        <div className="flex items-center gap-3">
          <ShieldAlert className="size-5 text-primary" />
          <h2 className="text-sm font-semibold">Purpose</h2>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          OTPShield Lab is an educational, entirely simulated dashboard built around a documented weakness in a
          reference vulnerable OTP/2FA login application: OTP results are trusted without being cryptographically
          enforced on the server. Every screen in this app &mdash; the login lab, the attack simulation, the
          report, and the score &mdash; operates on mock data and client-side state. Nothing here connects to, or
          is capable of connecting to, a real authentication system.
        </p>
      </GlassCard>

      <Separator />

      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard className="flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-4 text-accent" />
            <h3 className="text-sm font-semibold">Intended Use</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Security awareness training, secure-coding education, and demonstrating how missing server-side
            enforcement of MFA is discovered and fixed &mdash; used only against systems you own or are explicitly
            authorized to test.
          </p>
        </GlassCard>

        <GlassCard className="flex flex-col gap-3 p-6">
          <div className="flex items-center gap-2">
            <ScrollText className="size-4 text-warning" />
            <h3 className="text-sm font-semibold">Not Included</h3>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            This dashboard does not perform real network requests against any authentication service, does not
            store credentials, and does not implement any working exploit code. All &quot;attack&quot; steps are
            pre-scripted narrative content.
          </p>
        </GlassCard>
      </div>

      <GlassCard className="flex items-center gap-3 p-6">
        <Github className="size-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Findings referenced here map to CWE-287, CWE-307, CWE-384, CWE-200, and CWE-778.
        </p>
      </GlassCard>
    </div>
  )
}
