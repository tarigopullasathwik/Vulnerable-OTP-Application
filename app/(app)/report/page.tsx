"use client"

import { useState } from "react"
import { RefreshCw, Printer, Download, FileText } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { SeverityBadge } from "@/components/severity-badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { reportMeta } from "@/lib/mock-data"

export default function ReportPage() {
  const [generatedAt, setGeneratedAt] = useState(() => new Date())

  function downloadJson() {
    const payload = { ...reportMeta, generatedAt: generatedAt.toISOString() }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "otpshield-lab-report.json"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Security Report</h1>
          <p className="mt-1 text-sm text-muted-foreground">Exportable summary of the simulated assessment.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={() => setGeneratedAt(new Date())}>
            <RefreshCw className="size-3.5" />
            Generate Report
          </Button>
          <Button size="sm" variant="outline" onClick={() => window.print()}>
            <Printer className="size-3.5" />
            Export PDF
          </Button>
          <Button size="sm" onClick={downloadJson}>
            <Download className="size-3.5" />
            Download JSON
          </Button>
        </div>
      </div>

      <GlassCard className="flex flex-col gap-5 p-6">
        <div className="flex items-center gap-3">
          <FileText className="size-5 text-primary" />
          <div>
            <p className="text-sm font-semibold">{reportMeta.project}</p>
            <p className="font-mono text-xs text-muted-foreground">
              Generated {generatedAt.toLocaleString()}
            </p>
          </div>
        </div>

        <Separator />

        <dl className="grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Target</dt>
            <dd className="mt-1 text-sm">{reportMeta.target}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Finding</dt>
            <dd className="mt-1 text-sm">{reportMeta.finding}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Severity</dt>
            <dd className="mt-1">
              <SeverityBadge severity={reportMeta.severity} />
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Risk</dt>
            <dd className="mt-1 text-sm text-destructive">{reportMeta.risk}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Evidence</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground/90">{reportMeta.evidence}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase tracking-widest text-muted-foreground">Recommendation</dt>
            <dd className="mt-1 text-sm leading-relaxed text-foreground/90">{reportMeta.recommendation}</dd>
          </div>
        </dl>
      </GlassCard>
    </div>
  )
}
