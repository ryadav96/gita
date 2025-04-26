"use client"

import { useApp } from "@/components/app-provider"
import { Button } from "@/components/ui/button"
import { Settings } from "lucide-react"
import Link from "next/link"

export function HomeHeader() {
  const { streak } = useApp()

  // Get time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 18) return "Good afternoon"
    return "Good evening"
  }

  return (
    <div className="flex items-center justify-between py-4">
      <div>
        <h1 className="text-2xl font-bold">{getGreeting()}</h1>
        <p className="text-muted-foreground">{streak > 0 ? `${streak} day streak 🔥` : "Start your journey today"}</p>
      </div>
      <Link href="/settings">
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </Link>
    </div>
  )
}
