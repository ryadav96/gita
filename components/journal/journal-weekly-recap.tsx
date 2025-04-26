"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/app-provider"
import { Download, Share } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function JournalWeeklyRecap() {
  const { notes, streak } = useApp()
  const { toast } = useToast()

  const notesCount = Object.keys(notes).length
  const hasNotes = notesCount > 0

  // In a real app, this would be generated from actual user data
  const mockStats = {
    versesRead: 24,
    minutesSpent: 45,
    favoriteChapter: 2,
    topEmotions: ["Peaceful", "Motivated", "Curious"],
    wordCloud: ["dharma", "karma", "duty", "action", "peace", "mind", "soul", "wisdom"],
  }

  const handleDownload = () => {
    toast({
      title: "Recap downloaded",
      description: "Your weekly recap has been downloaded.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Sharing recap",
      description: "Opening sharing dialog...",
    })
  }

  if (!hasNotes) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">You need to create journal entries to see your weekly recap.</p>
        <Button variant="outline">Start Journaling</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 mt-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Weekly Gītā Journey</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted rounded-md p-4 text-center">
              <p className="text-3xl font-bold">{mockStats.versesRead}</p>
              <p className="text-sm text-muted-foreground">Verses Read</p>
            </div>
            <div className="bg-muted rounded-md p-4 text-center">
              <p className="text-3xl font-bold">{mockStats.minutesSpent}</p>
              <p className="text-sm text-muted-foreground">Minutes Spent</p>
            </div>
            <div className="bg-muted rounded-md p-4 text-center">
              <p className="text-3xl font-bold">{streak}</p>
              <p className="text-sm text-muted-foreground">Day Streak</p>
            </div>
            <div className="bg-muted rounded-md p-4 text-center">
              <p className="text-3xl font-bold">{notesCount}</p>
              <p className="text-sm text-muted-foreground">Journal Entries</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Word Cloud</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-2 py-4">
            {mockStats.wordCloud.map((word, index) => (
              <span
                key={word}
                className="px-2 py-1 bg-primary/10 rounded-md"
                style={{
                  fontSize: `${1 + (index % 3) * 0.25}rem`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-4">
        <Button variant="outline" className="flex-1" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
        <Button variant="outline" className="flex-1" onClick={handleShare}>
          <Share className="mr-2 h-4 w-4" />
          Share Recap
        </Button>
      </div>
    </div>
  )
}
