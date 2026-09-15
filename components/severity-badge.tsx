import { cn } from "@/lib/utils"
import type { Severity } from "@/lib/mock-data"

const styles: Record<Severity, string> = {
  critical: "border-destructive/40 bg-destructive/10 text-destructive",
  high: "border-warning/40 bg-warning/10 text-warning",
  medium: "border-primary/40 bg-primary/10 text-primary",
  low: "border-accent/40 bg-accent/10 text-accent",
}

export function SeverityBadge({ severity, className }: { severity: Severity; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-wider",
        styles[severity],
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" />
      {severity}
    </span>
  )
}
