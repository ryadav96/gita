"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export function IntroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedScript, setSelectedScript] = useState("devanagari")
  const [selectedGoal, setSelectedGoal] = useState("1-verse")
  const router = useRouter()

  const slides = [
    {
      title: "Welcome to Bhagavad Gita",
      description: "Explore the timeless wisdom of Krishna's teaching to Arjuna on the battlefield of Kurukshetra.",
      content: (
        <div className="h-64 flex items-center justify-center">
          <div className="bg-primary/20 h-40 w-40 rounded-full flex items-center justify-center">
            <span className="text-5xl">🕉️</span>
          </div>
        </div>
      )
    },
    {
      title: "Choose Your Script",
      description: "Select your preferred script for reading slokas",
      content: (
        <RadioGroup
          value={selectedScript}
          onValueChange={setSelectedScript}
          className="space-y-4 w-full max-w-md mb-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="devanagari" id="devanagari" />
            <Label htmlFor="devanagari" className="flex-1 cursor-pointer">Devanāgarī</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="latin" id="latin" />
            <Label htmlFor="latin" className="flex-1 cursor-pointer">Latin / Roman</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="both" id="both" />
            <Label htmlFor="both" className="flex-1 cursor-pointer">Show Both</Label>
          </div>
        </RadioGroup>
      )
    },
    {
      title: "Set Your Goal",
      description: "How much Gita would you like to read daily?",
      content: (
        <RadioGroup
          value={selectedGoal}
          onValueChange={setSelectedGoal}
          className="space-y-4 w-full max-w-md mb-4"
        >
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="1-verse" id="1-verse" />
            <Label htmlFor="1-verse" className="flex-1 cursor-pointer">1 verse per day (5 mins)</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="3-verses" id="3-verses" />
            <Label htmlFor="3-verses" className="flex-1 cursor-pointer">3 verses per day (15 mins)</Label>
          </div>
          
          <div className="flex items-center space-x-2 border rounded-md p-4">
            <RadioGroupItem value="chapter" id="chapter" />
            <Label htmlFor="chapter" className="flex-1 cursor-pointer">1 chapter per week</Label>
          </div>
        </RadioGroup>
      )
    }
  ]

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      // Save user preferences
      localStorage.setItem("preferredScript", selectedScript)
      localStorage.setItem("dailyGoal", selectedGoal)
      localStorage.setItem("onboardingComplete", "true")
      
      // Navigate to home with first visit flag
      router.push("/?firstVisit=true")
    }
  }

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }
  
  const handleSkip = () => {
    // Save default preferences
    localStorage.setItem("preferredScript", "devanagari")
    localStorage.setItem("dailyGoal", "1-verse")
    localStorage.setItem("onboardingComplete", "true")
    
    // Navigate to home with first visit flag
    router.push("/?firstVisit=true")
  }

  return (
    <div className="flex flex-col min-h-screen p-6">
      <div className="flex justify-end">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-2 text-center">{slides[currentSlide].title}</h1>
          <p className="text-muted-foreground mb-8 text-center">
            {slides[currentSlide].description}
          </p>
          
          {slides[currentSlide].content}
        </div>
      </div>
      
      <div className="flex justify-between w-full max-w-md mx-auto mt-8">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        
        <div className="flex space-x-1">
          {slides.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-primary' : 'bg-muted'}`}
            />
          ))}
        </div>
        
        <Button onClick={handleNext}>
          {currentSlide === slides.length - 1 ? 'Start' : 'Next'}
          <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}