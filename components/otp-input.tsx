"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"

export function OtpInput({
  length = 6,
  value,
  onChange,
  className,
}: {
  length?: number
  value: string
  onChange: (value: string) => void
  className?: string
}) {
  const refs = useRef<Array<HTMLInputElement | null>>([])

  function setDigit(index: number, digit: string) {
    const digits = value.padEnd(length, " ").split("")
    digits[index] = digit
    const next = digits.join("").replace(/ /g, "")
    onChange(next.slice(0, length))
  }

  return (
    <div className={cn("flex gap-2", className)}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          value={value[i] ?? ""}
          onChange={(e) => {
            const char = e.target.value.replace(/\D/g, "").slice(-1)
            setDigit(i, char)
            if (char && i < length - 1) refs.current[i + 1]?.focus()
          }}
          onKeyDown={(e) => {
            if (e.key === "Backspace" && !value[i] && i > 0) {
              refs.current[i - 1]?.focus()
            }
          }}
          inputMode="numeric"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          className="size-11 rounded-md border border-input bg-secondary/40 text-center font-mono text-lg text-foreground outline-none focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring sm:size-12"
        />
      ))}
    </div>
  )
}
