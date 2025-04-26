"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Share2, BookOpen, Heart, Quote } from "lucide-react"
import Link from "next/link"
import { fetchVerse, fetchChapter, Verse } from "@/lib/gita-client"

interface DailyDose {
  id: string
  chapter: number
  verse: number
  text: string
  translation: string
  insight: string
}

export function DailyGitaDose() {
  const [dailyVerse, setDailyVerse] = useState<DailyDose | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const loadDailyVerse = async () => {
      setIsLoading(true)
      
      try {
        // Get current date and use it to select a verse (changes daily)
        const today = new Date()
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
        
        // Check if we've already stored today's verse
        const storedDate = localStorage.getItem('dailyVerseDate')
        const currentDate = today.toDateString()
        
        // If it's a new day or we don't have a stored verse, get a new one
        if (storedDate !== currentDate) {
          // Use the day of year to pick a chapter and verse
          // This is just a simple algorithm to get a new verse each day
          // For Gita: 18 chapters with varying verse counts, ~700 total verses
          const chapterNum = (dayOfYear % 18) + 1 // Chapters 1-18
          
          // Get a verse number - assuming chapters have different verse counts
          // We'll get chapter details first to know how many verses it has
          const chapterData = await fetchChapter(chapterNum)
          if (!chapterData) {
            throw new Error("Could not fetch chapter data")
          }
          
          // Use verses_count to get a valid verse number
          const verseNum = (dayOfYear % chapterData.verses_count) + 1
          
          // Fetch the verse from API
          const verseData = await fetchVerse(chapterNum, verseNum)
          if (!verseData) {
            throw new Error("Could not fetch verse data")
          }
          
          // Create a daily dose object from the verse data
          const newVerse: DailyDose = {
            id: `${chapterNum}-${verseNum}`,
            chapter: chapterNum,
            verse: verseNum,
            text: verseData.slok,
            translation: verseData.purohit.et || verseData.siva.et || verseData.prabhu.et || "",
            insight: generateInsight(verseData)
          }
          
          setDailyVerse(newVerse)
          
          // Store in localStorage for later retrieval
          localStorage.setItem('dailyVerse', JSON.stringify(newVerse))
          localStorage.setItem('dailyVerseDate', currentDate)
          setIsLiked(false)
          localStorage.setItem('dailyVerseLiked', 'false')
        } else {
          // Retrieve the stored verse and liked state
          const storedVerse = localStorage.getItem('dailyVerse')
          const storedLiked = localStorage.getItem('dailyVerseLiked')
          
          if (storedVerse) {
            setDailyVerse(JSON.parse(storedVerse))
          } else {
            // Fallback if something went wrong - fetch chapter 1, verse 1
            const verseData = await fetchVerse(1, 1)
            if (verseData) {
              const fallbackVerse: DailyDose = {
                id: "1-1",
                chapter: 1,
                verse: 1,
                text: verseData.slok,
                translation: verseData.purohit.et || verseData.siva.et || verseData.prabhu.et || "",
                insight: generateInsight(verseData)
              }
              setDailyVerse(fallbackVerse)
            }
          }
          
          setIsLiked(storedLiked === 'true')
        }
      } catch (error) {
        console.error("Error loading daily verse:", error)
        // Fallback to a predefined verse or fetch a default one
        const fallbackData = await fetchVerse(2, 47) // Famous verse 2.47
        if (fallbackData) {
          const fallbackVerse: DailyDose = {
            id: "2-47",
            chapter: 2,
            verse: 47,
            text: fallbackData.slok,
            translation: fallbackData.purohit.et || fallbackData.siva.et || fallbackData.prabhu.et || "",
            insight: "This verse teaches us to focus on our actions rather than their results. By performing our duties without attachment to outcomes, we develop equanimity and spiritual awareness."
          }
          setDailyVerse(fallbackVerse)
        }
      } finally {
        setIsLoading(false)
      }
    }

    loadDailyVerse()
  }, [])

  // Generate insight from verse data by combining commentaries
  function generateInsight(verseData: Verse): string {
    // Try to use commentary if available, otherwise use a generic insight
    const commentaries = [
      verseData.prabhu.ec, 
      verseData.siva.ec, 
      verseData.chinmay.hc
    ].filter(Boolean)
    
    if (commentaries.length > 0) {
      // Use the first available commentary, limit to ~150 chars for brevity
      const rawInsight = commentaries[0] || ""
      return rawInsight.length > 180 
        ? rawInsight.substring(0, 180) + "..."
        : rawInsight
    }
    
    // Default insight if no commentary is available
    return "This verse from the Bhagavad Gita offers profound wisdom for contemplation and application in daily life. Reflect on its meaning and how it relates to your current situation."
  }

  const handleLikeToggle = () => {
    const newLikedState = !isLiked
    setIsLiked(newLikedState)
    localStorage.setItem('dailyVerseLiked', newLikedState.toString())
  }

  const handleShare = () => {
    if (dailyVerse && navigator.share) {
      navigator
        .share({
          title: `Bhagavad Gita ${dailyVerse.chapter}:${dailyVerse.verse}`,
          text: `"${dailyVerse.translation}" - Bhagavad Gita ${dailyVerse.chapter}:${dailyVerse.verse}`,
          url: window.location.origin
        })
        .catch((error) => console.error("Error sharing:", error))
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full overflow-hidden animate-pulse">
        <CardHeader className="bg-muted/30 h-12" />
        <CardContent className="py-6 space-y-4">
          <div className="h-24 bg-muted/30 rounded-md" />
          <div className="h-16 bg-muted/30 rounded-md" />
        </CardContent>
        <CardFooter className="bg-muted/20 h-12" />
      </Card>
    )
  }

  if (!dailyVerse) return null

  return (
    <Card className="w-full overflow-hidden shadow-md">
      <CardHeader className="bg-primary/10 py-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="h-5 w-5 text-primary" />
            <h2 className="font-medium">Daily Wisdom</h2>
          </div>
          <div className="text-xs font-medium bg-background/80 px-2 py-1 rounded-full">
            Chapter {dailyVerse.chapter}, Verse {dailyVerse.verse}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="text-sm text-primary/90 font-medium">Original Sanskrit</div>
          <p className="text-sm italic leading-relaxed whitespace-pre-line">{dailyVerse.text}</p>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm text-primary/90 font-medium">Translation</div>
          <p className="text-base leading-relaxed">{dailyVerse.translation}</p>
        </div>
        
        <div className="space-y-2 pt-2">
          <div className="text-sm text-primary/90 font-medium">Today's Insight</div>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {dailyVerse.insight}
          </p>
        </div>
      </CardContent>
      
      <CardFooter className="p-2 bg-muted/20 border-t flex justify-between">
        <div className="flex gap-1">
          <Button variant="ghost" size="sm" onClick={handleLikeToggle}>
            <Heart 
              className={`h-4 w-4 mr-1 ${isLiked ? "fill-red-500 text-red-500" : ""}`} 
            />
            <span className="text-xs">{isLiked ? "Liked" : "Like"}</span>
          </Button>
          
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            <span className="text-xs">Share</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/chapters/${dailyVerse.chapter}`}>
            <BookOpen className="h-4 w-4 mr-1" />
            <span className="text-xs">Read Chapter</span>
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
