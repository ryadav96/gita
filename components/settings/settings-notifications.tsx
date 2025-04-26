"use client"

import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TimePicker } from "@/components/settings/time-picker"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Bell, Calendar, Crown } from "lucide-react"
import { Card } from "@/components/ui/card"

interface NotificationSettings {
  dailyVerseEnabled: boolean
  dailyVerseTime: string // HH:MM format
  weeklyRecapEnabled: boolean
  specialEventsEnabled: boolean
  readingReminderEnabled: boolean
  readingReminderDays: string[] // Days of week: 'mon', 'tue', etc.
  streakAlertEnabled: boolean
}

export function SettingsNotifications() {
  const [isPremium, setIsPremium] = useState(false)
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    dailyVerseEnabled: true,
    dailyVerseTime: "07:00",
    weeklyRecapEnabled: true,
    specialEventsEnabled: true,
    readingReminderEnabled: false,
    readingReminderDays: ['mon', 'wed', 'fri'],
    streakAlertEnabled: true
  })
  
  // Check premium status and load notification settings
  useEffect(() => {
    // Check premium status
    const storedPremium = localStorage.getItem("isPremiumUser")
    const tempAccess = localStorage.getItem("temporaryPremiumAccess")
    const premiumStatus = storedPremium === "true" || (tempAccess && new Date(tempAccess) > new Date())
    setIsPremium(premiumStatus)
    
    // Load notification settings
    const savedSettings = localStorage.getItem("notificationSettings")
    if (savedSettings) {
      setNotificationSettings(JSON.parse(savedSettings))
    }
  }, [])
  
  // Save settings whenever they change
  useEffect(() => {
    localStorage.setItem("notificationSettings", JSON.stringify(notificationSettings))
  }, [notificationSettings])
  
  // Update a single setting
  const updateSetting = (key: keyof NotificationSettings, value: any) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }
  
  // Toggle a day in reading reminder days
  const toggleDay = (day: string) => {
    setNotificationSettings(prev => {
      const currentDays = [...prev.readingReminderDays]
      const dayIndex = currentDays.indexOf(day)
      
      if (dayIndex >= 0) {
        currentDays.splice(dayIndex, 1)
      } else {
        currentDays.push(day)
      }
      
      return {
        ...prev,
        readingReminderDays: currentDays
      }
    })
  }
  
  // Request notification permissions
  const requestPermissions = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      console.log(`Notification permission: ${permission}`)
      
      // Show a test notification if granted
      if (permission === 'granted') {
        new Notification('Bhagavad Gita App', {
          body: 'Notifications enabled successfully!',
          icon: '/placeholder-logo.svg'
        })
      }
    }
  }
  
  // Format days to show abbreviated names
  const formatDays = (days: string[]): string => {
    if (days.length === 7) return "Every day"
    if (days.length === 0) return "None"
    
    const dayNames: { [key: string]: string } = {
      'mon': 'Mon', 'tue': 'Tue', 'wed': 'Wed', 
      'thu': 'Thu', 'fri': 'Fri', 'sat': 'Sat', 'sun': 'Sun'
    }
    
    return days.map(d => dayNames[d]).join(', ')
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-medium">Push Notifications</h3>
        <Button variant="outline" size="sm" onClick={requestPermissions}>
          Enable
        </Button>
      </div>
      
      <div className="space-y-6">
        {/* Daily Verse */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base" htmlFor="daily-verse">
              Daily Gita Verse
            </Label>
            <p className="text-sm text-muted-foreground">
              Receive a verse with morning inspiration
            </p>
          </div>
          <Switch 
            id="daily-verse"
            checked={notificationSettings.dailyVerseEnabled}
            onCheckedChange={(checked) => updateSetting('dailyVerseEnabled', checked)}
          />
        </div>
        
        {notificationSettings.dailyVerseEnabled && (
          <div className="pl-6 border-l-2 border-muted space-y-4">
            <div>
              <Label htmlFor="time-picker">Delivery Time</Label>
              <TimePicker 
                value={notificationSettings.dailyVerseTime}
                onChange={(time) => updateSetting('dailyVerseTime', time)}
              />
            </div>
          </div>
        )}
        
        {/* Weekly Recap */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base" htmlFor="weekly-recap">
              Weekly Recap
            </Label>
            <p className="text-sm text-muted-foreground">
              Sunday summary of your journal entries and progress
            </p>
          </div>
          <Switch 
            id="weekly-recap"
            checked={notificationSettings.weeklyRecapEnabled}
            onCheckedChange={(checked) => updateSetting('weeklyRecapEnabled', checked)}
          />
        </div>
        
        {/* Special Events */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base" htmlFor="special-events">
              Special Events & Festivals
            </Label>
            <p className="text-sm text-muted-foreground">
              Krishna Janmashtami, Gita Jayanti, and other events
            </p>
          </div>
          <Switch 
            id="special-events"
            checked={notificationSettings.specialEventsEnabled}
            onCheckedChange={(checked) => updateSetting('specialEventsEnabled', checked)}
          />
        </div>
        
        {/* Reading Reminders */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base" htmlFor="reading-reminder">
              Reading Reminders
            </Label>
            <p className="text-sm text-muted-foreground">
              {notificationSettings.readingReminderEnabled ? 
                `Active on: ${formatDays(notificationSettings.readingReminderDays)}` : 
                "Remind you to read based on your goal"
              }
            </p>
          </div>
          <Switch 
            id="reading-reminder"
            checked={notificationSettings.readingReminderEnabled}
            onCheckedChange={(checked) => updateSetting('readingReminderEnabled', checked)}
          />
        </div>
        
        {notificationSettings.readingReminderEnabled && (
          <div className="pl-6 border-l-2 border-muted">
            <Label className="mb-2 block">Days</Label>
            <div className="flex flex-wrap gap-2">
              {['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].map((day) => (
                <Button
                  key={day}
                  size="sm"
                  variant={notificationSettings.readingReminderDays.includes(day) ? "default" : "outline"}
                  className="w-10 h-10 rounded-full p-0"
                  onClick={() => toggleDay(day)}
                >
                  {day.charAt(0).toUpperCase()}
                </Button>
              ))}
            </div>
          </div>
        )}
        
        {/* Streak Alerts */}
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base" htmlFor="streak-alert">
              Streak Alerts
            </Label>
            <p className="text-sm text-muted-foreground">
              Remind you when your streak is at risk
            </p>
          </div>
          <Switch 
            id="streak-alert"
            checked={notificationSettings.streakAlertEnabled}
            onCheckedChange={(checked) => updateSetting('streakAlertEnabled', checked)}
          />
        </div>
      </div>
      
      {/* Premium Feature */}
      <Card className="p-4 bg-muted/30">
        <div className="flex items-start gap-3">
          <Crown className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium">Premium Features</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Premium members receive personalized verse recommendations 
              based on their interests and reading patterns.
            </p>
            
            {!isPremium && (
              <Button size="sm" variant="outline" asChild>
                <a href="/settings?tab=premium">Upgrade to Premium</a>
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
