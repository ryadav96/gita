"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Progress } from "@/components/ui/progress"

export function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const router = useRouter()
  const [isFirstInstall, setIsFirstInstall] = useState(false)

  useEffect(() => {
    // Check if this is the first install
    const checkFirstInstall = async () => {
      // In a real app, you'd use localStorage or another storage mechanism
      const firstInstall = localStorage.getItem("firstInstall") === null
      setIsFirstInstall(firstInstall)
      
      if (firstInstall) {
        localStorage.setItem("firstInstall", "false")
      }
    }
    
    checkFirstInstall()
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          // Navigate based on first install status
          if (isFirstInstall) {
            router.push("/onboarding/language")
          } else {
            router.push("/")
          }
          return 100
        }
        return prev + 10
      })
    }, 200)
    
    return () => clearInterval(interval)
  }, [isFirstInstall, router])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <div className="relative w-32 h-32 mb-8">
        <Image
          src="/placeholder-logo.svg"
          alt="Bhagavad Gita App"
          fill
          priority
          className="object-contain"
        />
      </div>
      <h1 className="text-2xl font-bold mb-8">Bhagavad Gita</h1>
      <div className="w-64">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  )
}