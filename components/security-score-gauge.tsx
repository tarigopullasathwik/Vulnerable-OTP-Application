"use client"

import { cn } from "@/lib/utils"

export function SecurityScoreGauge({
  score,
  size = 200,
  className,
}: {
  score: number
  size?: number
  className?: string
}) {
  const clamped = Math.max(0, Math.min(100, score))
  const radius = size / 2 - 14
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (clamped / 100) * circumference
  const color = clamped < 40 ? "var(--destructive)" : clamped < 70 ? "var(--warning)" : "var(--accent)"

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--border)"
          strokeWidth={12}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={12}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-mono text-4xl font-semibold text-foreground">{clamped}</span>
        <span className="text-xs uppercase tracking-widest text-muted-foreground">/ 100</span>
      </div>
    </div>
  )
}
