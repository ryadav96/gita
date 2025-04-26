"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function LanguagePicker() {
  const router = useRouter()
  const [selectedLanguage, setSelectedLanguage] = useState("english")
  
  // Get system language on mount
  useEffect(() => {
    const systemLanguage = navigator.language.split('-')[0]
    if (["english", "hindi", "sanskrit"].includes(systemLanguage)) {
      setSelectedLanguage(systemLanguage)
    }
  }, [])
  
  const handleContinue = () => {
    // Store language preference
    localStorage.setItem("preferredLanguage", selectedLanguage)
    
    // Navigate to the data copy screen
    router.push("/onboarding/copy-data")
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-8">Select Your Language</h1>
      
      <RadioGroup
        value={selectedLanguage}
        onValueChange={setSelectedLanguage}
        className="space-y-4 w-full max-w-md mb-8"
      >
        <div className="flex items-center space-x-2 border rounded-md p-4">
          <RadioGroupItem value="english" id="english" />
          <Label htmlFor="english" className="flex-1 cursor-pointer">English</Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-4">
          <RadioGroupItem value="hindi" id="hindi" />
          <Label htmlFor="hindi" className="flex-1 cursor-pointer">Hindi</Label>
        </div>
        
        <div className="flex items-center space-x-2 border rounded-md p-4">
          <RadioGroupItem value="sanskrit" id="sanskrit" />
          <Label htmlFor="sanskrit" className="flex-1 cursor-pointer">Sanskrit</Label>
        </div>
      </RadioGroup>
      
      <Button onClick={handleContinue} className="w-full max-w-md">
        Continue
      </Button>
    </div>
  )
}