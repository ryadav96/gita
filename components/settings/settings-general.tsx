"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useReadingProgress } from "@/hooks/use-reading-progress"

export function SettingsGeneral() {
  // Language settings
  const [language, setLanguage] = useLocalStorage<string>("gita-language", "english")
  const [preferredTranslation, setPreferredTranslation] = useLocalStorage<string>(
    "gita-preferred-translation",
    "siva"
  )
  
  // Notification settings
  const [dailyReminder, setDailyReminder] = useState(false)
  const [reminderTime, setReminderTime] = useState("08:00")
  
  // Reading progress stats
  const { getReadingStats } = useReadingProgress()
  const [resetDialogOpen, setResetDialogOpen] = useState(false)
  const stats = getReadingStats()
  
  // Handle permission request for notifications
  useEffect(() => {
    const checkPermission = async () => {
      if (typeof window !== "undefined" && "Notification" in window) {
        if (Notification.permission === "granted") {
          const storedReminder = localStorage.getItem("gita-daily-reminder") === "true"
          setDailyReminder(storedReminder)
        }
      }
    }
    
    checkPermission()
  }, [])
  
  const handleReminderToggle = async (checked: boolean) => {
    if (typeof window !== "undefined" && "Notification" in window) {
      if (checked && Notification.permission !== "granted") {
        const permission = await Notification.requestPermission()
        if (permission !== "granted") {
          return // Don't enable if permission not granted
        }
      }
      
      setDailyReminder(checked)
      localStorage.setItem("gita-daily-reminder", checked.toString())
      
      if (checked) {
        // Register reminder logic would go here
        console.log("Daily reminder enabled for", reminderTime)
      } else {
        // Unregister reminder logic would go here
        console.log("Daily reminder disabled")
      }
    }
  }
  
  const handleReminderTimeChange = (time: string) => {
    setReminderTime(time)
    localStorage.setItem("gita-reminder-time", time)
    
    if (dailyReminder) {
      // Update reminder logic would go here
      console.log("Reminder time changed to", time)
    }
  }
  
  const resetAllProgress = () => {
    // Clear all reading progress data from localStorage
    localStorage.removeItem("gita-reading-progress")
    localStorage.removeItem("gita-last-read-verse")
    
    // Force reload to refresh the app state
    window.location.reload()
  }
  
  const exportReadingData = () => {
    // Collect all relevant reading data
    const data = {
      readingProgress: JSON.parse(localStorage.getItem("gita-reading-progress") || "{}"),
      lastReadVerse: JSON.parse(localStorage.getItem("gita-last-read-verse") || "{}"),
      favoriteVerses: JSON.parse(localStorage.getItem("gita-favorite-verses") || "[]"),
      journalEntries: JSON.parse(localStorage.getItem("gita-journal-entries") || "[]")
    }
    
    // Create downloadable JSON file
    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    
    // Create download link and trigger it
    const exportName = `bhagavad-gita-data-${new Date().toISOString().split('T')[0]}.json`
    
    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportName)
    linkElement.click()
  }
  
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Language Settings</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="language">App Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                  <SelectItem value="sanskrit">Sanskrit</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="translation">Preferred Translation</Label>
            <Select value={preferredTranslation} onValueChange={setPreferredTranslation}>
              <SelectTrigger id="translation">
                <SelectValue placeholder="Select translation" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="siva">Swami Sivananda</SelectItem>
                  <SelectItem value="purohit">Purohit Swami</SelectItem>
                  <SelectItem value="prabhu">A.C.B. Prabhupada</SelectItem>
                  <SelectItem value="tej">Swami Tejomayananda</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Daily Reminder</h3>
        <div className="flex items-center justify-between">
          <Label htmlFor="reminder" className="cursor-pointer">
            Remind me to read daily
          </Label>
          <Switch 
            id="reminder" 
            checked={dailyReminder}
            onCheckedChange={handleReminderToggle}
          />
        </div>
        
        {dailyReminder && (
          <div className="space-y-2">
            <Label htmlFor="reminder-time">Reminder Time</Label>
            <input
              id="reminder-time"
              type="time"
              value={reminderTime}
              onChange={(e) => handleReminderTimeChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Reading Progress</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground">Completion</div>
            <div className="text-2xl font-semibold">{stats.completionPercentage}%</div>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground">Reading Streak</div>
            <div className="text-2xl font-semibold">{stats.currentStreak} days</div>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground">Chapters Completed</div>
            <div className="text-2xl font-semibold">{stats.completedChapters}/{stats.totalChapters}</div>
          </div>
          
          <div className="p-4 border rounded-md">
            <div className="text-sm text-muted-foreground">Time Spent</div>
            <div className="text-2xl font-semibold">{stats.timeSpent}</div>
          </div>
        </div>
        
        <div className="pt-2 space-y-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={exportReadingData}
          >
            Export Reading Data
          </Button>
          
          <AlertDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full">
                Reset Reading Progress
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Reset Reading Progress</AlertDialogTitle>
                <AlertDialogDescription>
                  This will reset all your reading progress, including completed chapters, current position, and reading streak. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={resetAllProgress}>
                  Reset Progress
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
