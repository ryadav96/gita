"use client"

import { useApp } from "@/components/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getDailyVerse } from "@/lib/data"

export function DailyGitaDose() {
  const { selectedMood, setSelectedMood } = useApp()

  const moodOptions = [
    { emoji: "🤔", label: "Confused" },
    { emoji: "💪", label: "Motivated" },
    { emoji: "🧘", label: "Peaceful" },
    { emoji: "🧠", label: "Wisdom" },
  ]

  const dailyVerse = getDailyVerse(selectedMood)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Daily Gita Dose
          <div className="flex space-x-2">
            {moodOptions.map((mood) => (
              <Button
                key={mood.emoji}
                variant={selectedMood === mood.emoji ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedMood(mood.emoji)}
                className="h-8 w-8 p-0"
                title={mood.label}
              >
                {mood.emoji}
              </Button>
            ))}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">
              Chapter {dailyVerse.chapter}.{dailyVerse.verse}
            </h3>
            <p className="text-sm text-muted-foreground">{dailyVerse.title}</p>
          </div>
          <p className="text-sm italic">{dailyVerse.sanskrit}</p>
          <p>{dailyVerse.translation}</p>
          <div className="flex justify-end">
            <Link href={`/chapters/${dailyVerse.chapter}/verses/${dailyVerse.verse}`}>
              <Button variant="outline" size="sm">
                Read More
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
