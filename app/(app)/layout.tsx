import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBanner } from "@/components/top-banner"

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopBanner />
        <main className="grid-glow-bg flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <div className="mx-auto w-full max-w-6xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
