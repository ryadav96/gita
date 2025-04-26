"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, Settings, Sparkles } from "lucide-react"
import { useJournalEntries, JournalEntry } from "@/hooks/use-journal-entries"

export function JournalWeeklyRecap() {
  const { entries } = useJournalEntries()
  const [weeklyEntries, setWeeklyEntries] = useState<JournalEntry[]>([])
  const [mostCommonTags, setMostCommonTags] = useState<Array<{tag: string, count: number}>>([])
  const [moodDistribution, setMoodDistribution] = useState<Record<string, number>>({})
  
  // Get entries from the past week
  useEffect(() => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
    
    const recentEntries = entries.filter(entry => {
      const entryDate = new Date(entry.updatedAt)
      return entryDate >= oneWeekAgo
    })
    
    setWeeklyEntries(recentEntries)
    
    // Calculate most common tags
    const tagCounts: Record<string, number> = {}
    recentEntries.forEach(entry => {
      if (entry.tags) {
        entry.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1
        })
      }
    })
    
    const sortedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    
    setMostCommonTags(sortedTags)
    
    // Calculate mood distribution
    const moodCounts: Record<string, number> = {}
    recentEntries.forEach(entry => {
      const mood = entry.mood || 'other'
      moodCounts[mood] = (moodCounts[mood] || 0) + 1
    })
    
    setMoodDistribution(moodCounts)
  }, [entries])
  
  if (weeklyEntries.length === 0) {
    return null
  }

  // Calculate total entries and percentage change from previous week
  const previousWeekStart = new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000)
  const previousWeekEnd = new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
  
  const previousWeekEntries = entries.filter(entry => {
    const entryDate = new Date(entry.updatedAt)
    return entryDate >= previousWeekStart && entryDate <= previousWeekEnd
  })
  
  const entryCountChange = previousWeekEntries.length > 0 
    ? ((weeklyEntries.length - previousWeekEntries.length) / previousWeekEntries.length) * 100
    : 100
  
  // Get chapter with most journal entries this week
  const chapterCounts: Record<string, number> = {}
  weeklyEntries.forEach(entry => {
    const chapterId = entry.chapterId.toString()
    chapterCounts[chapterId] = (chapterCounts[chapterId] || 0) + 1
  })
  
  const topChapter = Object.entries(chapterCounts)
    .sort((a, b) => b[1] - a[1])[0]
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Your Weekly Journal Insights
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Journal Entries</p>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{weeklyEntries.length}</span>
              <span className={`text-xs ${entryCountChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {entryCountChange >= 0 ? '+' : ''}{Math.round(entryCountChange)}%
              </span>
            </div>
          </div>
          
          {topChapter && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Most Reflected Chapter</p>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">Chapter {topChapter[0]}</span>
                <span className="text-xs text-muted-foreground">{topChapter[1]} entries</span>
              </div>
            </div>
          )}
        </div>
        
        {mostCommonTags.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Common Themes This Week</p>
            <div className="flex flex-wrap gap-2">
              {mostCommonTags.map(({ tag, count }) => (
                <Badge key={tag} variant="outline" className="flex items-center gap-1">
                  {tag}
                  <span className="text-xs text-muted-foreground ml-1">{count}</span>
                </Badge>
              ))}
            </div>
          </div>
        )}
        
        {Object.keys(moodDistribution).length > 0 && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">Mood Distribution</p>
            {Object.entries(moodDistribution).map(([mood, count]) => {
              const percentage = (count / weeklyEntries.length) * 100
              return (
                <div key={mood} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="capitalize">{mood}</span>
                    <span>{Math.round(percentage)}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              )
            })}
          </div>
        )}
        
        <div className="pt-2 text-xs text-muted-foreground border-t">
          <p>Consistent journaling helps deepen your understanding of the Gita's teachings.</p>
        </div>
      </CardContent>
    </Card>
  )
}
