"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MoonIcon, SunIcon, SunMoonIcon, MonitorIcon, Type } from "lucide-react"

interface ScriptOption {
  value: string
  label: string
  sample: string
}

export function SettingsAppearance() {
  const { theme, setTheme } = useTheme()
  const [fontSize, setFontSize] = useState<number>(100)
  const [scriptType, setScriptType] = useState<string>("devanagari")
  
  // Load saved appearance settings on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem("fontSizePreference")
    const savedScript = localStorage.getItem("preferredScript")
    
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize))
    }
    
    if (savedScript) {
      setScriptType(savedScript)
    }
  }, [])
  
  // Handle font size change
  const handleFontSizeChange = (value: number[]) => {
    const newSize = value[0]
    setFontSize(newSize)
    localStorage.setItem("fontSizePreference", newSize.toString())
  }
  
  // Handle script change
  const handleScriptChange = (value: string) => {
    setScriptType(value)
    localStorage.setItem("preferredScript", value)
  }
  
  const scriptOptions: ScriptOption[] = [
    {
      value: "devanagari",
      label: "Devanāgarī",
      sample: "यदा यदा हि धर्मस्य"
    },
    {
      value: "latin",
      label: "Latin / Roman",
      sample: "yadā yadā hi dharmasya"
    },
    {
      value: "both",
      label: "Both Scripts",
      sample: "यदा यदा / yadā yadā"
    }
  ]
  
  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: SunIcon
    },
    {
      value: "dark",
      label: "Dark",
      icon: MoonIcon
    },
    {
      value: "system",
      label: "System",
      icon: MonitorIcon
    }
  ]

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">App Theme</h3>
        <div className="grid grid-cols-3 gap-4">
          {themeOptions.map((option) => {
            const Icon = option.icon
            return (
              <Card 
                key={option.value}
                className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                  theme === option.value ? "border-2 border-primary" : ""
                }`}
                onClick={() => setTheme(option.value)}
              >
                <div className="flex flex-col items-center justify-center gap-2 py-2">
                  <Icon className="h-6 w-6" />
                  <span>{option.label}</span>
                </div>
              </Card>
            )
          })}
        </div>
      </div>
      
      {/* Script Selection */}
      <div>
        <h3 className="text-lg font-medium mb-4">Sanskrit Script</h3>
        <RadioGroup 
          value={scriptType}
          onValueChange={handleScriptChange}
          className="space-y-3"
        >
          {scriptOptions.map((option) => (
            <div 
              key={option.value}
              className={`flex items-center justify-between border p-4 rounded-md ${
                scriptType === option.value ? "border-primary bg-primary/5" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="cursor-pointer">
                  {option.label}
                </Label>
              </div>
              <div className={scriptType === option.value ? "text-primary" : "text-muted-foreground"}>
                {option.sample}
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>
      
      {/* Font Size Adjustment */}
      <div>
        <div className="flex justify-between mb-2">
          <h3 className="text-lg font-medium">Font Size</h3>
          <span className="text-sm text-muted-foreground">{fontSize}%</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Type className="h-4 w-4" />
          <Slider
            value={[fontSize]}
            min={70}
            max={150}
            step={10}
            onValueChange={handleFontSizeChange}
            className="flex-1"
          />
          <Type className="h-6 w-6" />
        </div>
        
        <div className="mt-4 p-4 bg-muted/30 rounded-md">
          <p className="text-xs text-muted-foreground mb-2">Preview:</p>
          <div style={{ fontSize: `${fontSize}%` }} className="space-y-2">
            <p className="font-medium">Sanskrit Verse</p>
            <p className="font-sans">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।</p>
            <p className="text-sm text-muted-foreground">Translation: You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
