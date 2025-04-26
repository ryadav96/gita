"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export function CopyDataScreen() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Simulate copying local data with a progress bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push("/onboarding/intro-carousel")
          }, 500)
          return 100
        }
        return prev + 4 // Complete in about 2.5 seconds (25 iterations)
      })
    }, 100)
    
    return () => clearInterval(interval)
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-2">Setting Up Your Gita</h1>
      <p className="text-muted-foreground mb-8 text-center">
        We're copying essential content for seamless offline access
      </p>
      
      <div className="w-full max-w-md mb-4">
        <Progress value={progress} className="h-2" />
      </div>
      
      <p className="text-sm text-muted-foreground">
        {progress < 100 ? "Copying data..." : "Complete!"}
      </p>
    </div>
  )
}