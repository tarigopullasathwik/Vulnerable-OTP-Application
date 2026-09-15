"use client"

import { ArrowDown } from "lucide-react"

import { GlassCard } from "@/components/glass-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { architectureFlow } from "@/lib/mock-data"

export default function ArchitecturePage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Architecture</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Request flow through the authentication pipeline, contrasted between the vulnerable lab and a remediated
          design.
        </p>
      </div>

      <Tabs defaultValue="vulnerable">
        <TabsList>
          <TabsTrigger value="vulnerable">Vulnerable Lab</TabsTrigger>
          <TabsTrigger value="secure">Secure / Remediated</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerable">
          <FlowDiagram mode="weak" />
        </TabsContent>
        <TabsContent value="secure">
          <FlowDiagram mode="secure" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function FlowDiagram({ mode }: { mode: "weak" | "secure" }) {
  const borderClass = mode === "weak" ? "border-destructive/30" : "border-accent/30"
  const textClass = mode === "weak" ? "text-destructive/90" : "text-accent/90"

  return (
    <div className="flex flex-col items-center gap-1">
      {architectureFlow.map((node, i) => (
        <div key={node.id} className="flex w-full flex-col items-center gap-1">
          <GlassCard className={`w-full max-w-lg p-4 sm:max-w-xl ${borderClass}`}>
            <p className="text-center text-sm font-semibold">{node.label}</p>
            <p className={`mt-1 text-center text-xs leading-relaxed ${textClass}`}>
              {mode === "weak" ? node.weak : node.secure}
            </p>
          </GlassCard>
          {i < architectureFlow.length - 1 && (
            <ArrowDown className="size-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  )
}
