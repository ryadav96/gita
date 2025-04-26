"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { Clock } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { 
  Select,
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"

interface TimePickerProps {
  value: string
  onChange: (value: string) => void
  use12Hour?: boolean
}

export function TimePicker({ value = "08:00", onChange, use12Hour = false }: TimePickerProps) {
  const [hours, setHours] = useState<string>("08")
  const [minutes, setMinutes] = useState<string>("00")
  const [period, setPeriod] = useState<"AM" | "PM">("AM")
  
  useEffect(() => {
    if (!value) return
    
    try {
      const [hourStr, minuteStr] = value.split(":")
      let hour = parseInt(hourStr)
      const minute = parseInt(minuteStr)
      
      if (use12Hour) {
        const newPeriod = hour >= 12 ? "PM" : "AM"
        hour = hour % 12
        hour = hour === 0 ? 12 : hour
        setHours(hour.toString().padStart(2, '0'))
        setPeriod(newPeriod)
      } else {
        setHours(hour.toString().padStart(2, '0'))
      }
      
      setMinutes(minute.toString().padStart(2, '0'))
    } catch (error) {
      console.error("Error parsing time:", error)
    }
  }, [value, use12Hour])
  
  const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max)
  
  const handleHoursChange = (newHours: string) => {
    let numHours = parseInt(newHours) || 0
    
    if (use12Hour) {
      numHours = clamp(numHours, 1, 12)
    } else {
      numHours = clamp(numHours, 0, 23)
    }
    
    const formattedHours = numHours.toString().padStart(2, '0')
    setHours(formattedHours)
    updateTime(formattedHours, minutes, period)
  }
  
  const handleMinutesChange = (newMinutes: string) => {
    let numMinutes = parseInt(newMinutes) || 0
    numMinutes = clamp(numMinutes, 0, 59)
    
    const formattedMinutes = numMinutes.toString().padStart(2, '0')
    setMinutes(formattedMinutes)
    updateTime(hours, formattedMinutes, period)
  }
  
  const handlePeriodChange = (newPeriod: string) => {
    const validPeriod = newPeriod as "AM" | "PM"
    setPeriod(validPeriod)
    updateTime(hours, minutes, validPeriod)
  }
  
  const updateTime = (h: string, m: string, p: "AM" | "PM") => {
    let hour = parseInt(h)
    
    if (use12Hour) {
      if (p === "PM" && hour < 12) {
        hour += 12
      } else if (p === "AM" && hour === 12) {
        hour = 0
      }
    }
    
    const formattedHour = hour.toString().padStart(2, '0')
    const newTime = `${formattedHour}:${m}`
    
    onChange(newTime)
  }
  
  const incrementHours = () => {
    let numHours = parseInt(hours) || 0
    if (use12Hour) {
      numHours = (numHours % 12) + 1
    } else {
      numHours = (numHours + 1) % 24
    }
    const formattedHours = numHours.toString().padStart(2, '0')
    setHours(formattedHours)
    updateTime(formattedHours, minutes, period)
  }
  
  const decrementHours = () => {
    let numHours = parseInt(hours) || 0
    if (use12Hour) {
      numHours = ((numHours + 10) % 12) + 1
    } else {
      numHours = (numHours + 23) % 24
    }
    const formattedHours = numHours.toString().padStart(2, '0')
    setHours(formattedHours)
    updateTime(formattedHours, minutes, period)
  }
  
  const incrementMinutes = () => {
    let numMinutes = parseInt(minutes) || 0
    numMinutes = (numMinutes + 5) % 60
    const formattedMinutes = numMinutes.toString().padStart(2, '0')
    setMinutes(formattedMinutes)
    updateTime(hours, formattedMinutes, period)
  }
  
  const decrementMinutes = () => {
    let numMinutes = parseInt(minutes) || 0
    numMinutes = (numMinutes + 55) % 60
    const formattedMinutes = numMinutes.toString().padStart(2, '0')
    setMinutes(formattedMinutes)
    updateTime(hours, formattedMinutes, period)
  }
  
  const togglePeriod = () => {
    const newPeriod = period === "AM" ? "PM" : "AM"
    setPeriod(newPeriod)
    updateTime(hours, minutes, newPeriod)
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      <div className="grid gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={incrementHours}
        >
          ▲
        </Button>
        <Input
          className="h-10 w-12 text-center"
          value={hours}
          onChange={(e) => handleHoursChange(e.target.value)}
          min={use12Hour ? 1 : 0}
          max={use12Hour ? 12 : 23}
        />
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={decrementHours}
        >
          ▼
        </Button>
      </div>
      
      <span className="text-xl font-bold mb-1">:</span>
      
      <div className="grid gap-1">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={incrementMinutes}
        >
          ▲
        </Button>
        <Input
          className="h-10 w-12 text-center"
          value={minutes}
          onChange={(e) => handleMinutesChange(e.target.value)}
          min={0}
          max={59}
        />
        <Button 
          variant="ghost" 
          size="icon"
          className="h-8 w-8" 
          onClick={decrementMinutes}
        >
          ▼
        </Button>
      </div>
      
      {use12Hour && (
        <div className="ml-1">
          <Button
            variant="outline"
            className="h-10 px-3"
            onClick={togglePeriod}
          >
            {period}
          </Button>
        </div>
      )}
    </div>
  )
}

export function TimePickerDemo() {
  const [time, setTime] = React.useState("08:00")

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn("w-full justify-start text-left font-normal", !time && "text-muted-foreground")}
        >
          <Clock className="mr-2 h-4 w-4" />
          {time ? time : "Select time"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-4">
        <div className="space-y-2">
          <div className="grid gap-2">
            <Label htmlFor="time">Time</Label>
            <TimePicker value={time} onChange={setTime} use12Hour />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
