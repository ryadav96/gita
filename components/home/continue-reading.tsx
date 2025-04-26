"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { BookOpen, Clock, Calendar } from "lucide-react"
import { useReadingProgress } from "@/hooks/use-reading-progress"

export function ContinueReading() {
  const router = useRouter()
  const { lastReadVerse, readingProgress, getSuggestedContinuation, getReadingStats } = useReadingProgress()
  const [chapterTitles, setChapterTitles] = useState<Record<number, string>>({})

  useEffect(() => {
    // Fetch chapter titles
    async function fetchChapterTitles() {
      try {
        const response = await fetch('/api/chapters')
        const data = await response.json()
        const titles: Record<number, string> = {}
        
        data.forEach((chapter: any) => {
          titles[chapter.id] = chapter.name
        })
        
        setChapterTitles(titles)
      } catch (error) {
        console.error("Failed to fetch chapter titles:", error)
      }
    }
    
    fetchChapterTitles()
  }, [])

  // Get reading stats
  const stats = getReadingStats()
  const { chapterId, verseId } = lastReadVerse || { chapterId: 1, verseId: 1 }

  // Format last read time
  const getTimeAgo = () => {
    if (!lastReadVerse?.timestamp) return "Never"
    
    const now = new Date()
    const lastRead = new Date(lastReadVerse.timestamp)
    const diffHours = Math.floor((now.getTime() - lastRead.getTime()) / (1000 * 60 * 60))
    
    if (diffHours < 1) return "Just now"
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    
    const diffDays = Math.floor(diffHours / 24)
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays} days ago`
    
    const diffWeeks = Math.floor(diffDays / 7)
    if (diffWeeks === 1) return "Last week"
    if (diffWeeks < 4) return `${diffWeeks} weeks ago`
    
    return lastRead.toLocaleDateString()
  }

  // Continue reading - either the next verse or where they left off
  const handleContinueReading = () => {
    const nextReading = getSuggestedContinuation()
    router.push(`/chapters/${nextReading.chapterId}/verses/${nextReading.verseId}`)
  }

  // Start a new reading if no progress
  const handleStartReading = () => {
    router.push('/chapters/1/verses/1')
  }

  const hasProgress = stats.completionPercentage > 0

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Reading</h2>
        {hasProgress && (
          <span className="text-sm text-muted-foreground">
            {stats.completionPercentage}% Complete
          </span>
        )}
      </div>
      
      {hasProgress ? (
        <>
          <div className="space-y-4 pt-1">
            <Progress value={stats.completionPercentage} className="h-2" />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Read</p>
                  <p className="font-medium">Chapter {chapterId}, Verse {verseId}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Session</p>
                  <p className="font-medium">{getTimeAgo()}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Reading Streak</p>
                  <p className="font-medium">{stats.currentStreak} day{stats.currentStreak !== 1 ? 's' : ''}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                  <p className="font-medium">{stats.timeSpent}</p>
                </div>
              </div>
            </div>
            
            <Button className="w-full" onClick={handleContinueReading}>
              Continue Reading
            </Button>
          </div>
        </>
      ) : (
        <div className="py-6 text-center space-y-4">
          <BookOpen className="h-12 w-12 mx-auto text-muted-foreground" />
          <div>
            <h3 className="text-lg font-medium">Begin Your Journey</h3>
            <p className="text-sm text-muted-foreground">
              Start reading the Bhagavad Gita to track your progress
            </p>
          </div>
          <Button className="w-full" onClick={handleStartReading}>
            Start Reading
          </Button>
        </div>
      )}
    </Card>
  )
}
