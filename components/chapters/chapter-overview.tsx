"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Play, BookOpen, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { fetchChapter, fetchVersesFromChapter, Chapter } from "@/lib/gita-client"

interface ChapterOverviewProps {
  chapterId: string
}

export function ChapterOverview({ chapterId }: ChapterOverviewProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [chapter, setChapter] = useState<Chapter | null>(null)
  const [loading, setLoading] = useState(true)
  const [versesCount, setVersesCount] = useState(0)
  
  useEffect(() => {
    async function loadChapterData() {
      setLoading(true)
      try {
        const chapterNumber = parseInt(chapterId, 10)
        const chapterData = await fetchChapter(chapterNumber)
        if (chapterData) {
          setChapter(chapterData)
        }
        
        // Get verses count
        const verses = await fetchVersesFromChapter(chapterNumber)
        setVersesCount(verses.length)
      } catch (error) {
        console.error("Error loading chapter data:", error)
      } finally {
        setLoading(false)
      }
    }
    
    loadChapterData()
  }, [chapterId])

  const handleStartReading = () => {
    router.push(`/chapters/${chapterId}/verses/1`)
  }

  const handlePlayAudio = () => {
    // In a real app, this would play audio or navigate to the audio player
    router.push(`/audio?chapter=${chapterId}`)
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, save this to local storage or user preferences
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-[300px]">Loading chapter information...</div>
  }

  if (!chapter) {
    return <div className="text-center p-4">Chapter not found</div>
  }

  // Calculate estimated read time (roughly 30 seconds per verse)
  const estimatedReadTime = Math.max(1, Math.round(versesCount * 0.5)) + " min"

  // Common themes in Bhagavad Gita - in a real app, these would be determined by chapter content
  const themes = [
    "Dharma", 
    "Karma Yoga", 
    "Bhakti", 
    "Self-Realization"
  ]

  return (
    <div className="space-y-6">
      {/* Chapter Header */}
      <div className="relative">
        <div className="aspect-[16/9] bg-gradient-to-r from-primary/20 to-primary/40 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h1 className="text-3xl font-bold text-center">Chapter {chapter.chapter_number}</h1>
            <h2 className="text-xl text-center text-muted-foreground">{chapter.name}</h2>
            <p className="text-lg text-center">{chapter.translation}</p>
          </div>
        </div>
      </div>

      {/* Chapter Actions */}
      <div className="flex gap-4">
        <Button className="flex-1" onClick={handleStartReading}>
          <BookOpen className="mr-2 h-4 w-4" />
          Start Reading
        </Button>
        <Button 
          variant="secondary"
          className="flex-1"
          onClick={handlePlayAudio}
        >
          <Play className="mr-2 h-4 w-4" />
          Play Intro
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          onClick={toggleFavorite}
          className={isFavorite ? "text-red-500" : ""}
        >
          <Heart className={isFavorite ? "fill-red-500" : ""} />
        </Button>
      </div>

      {/* Chapter Info */}
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <div className="text-muted-foreground">{versesCount} verses</div>
          <div className="text-muted-foreground">~{estimatedReadTime} read</div>
        </div>
        
        <div>
          <h3 className="font-medium mb-2">Themes</h3>
          <div className="flex flex-wrap gap-2">
            {themes.map((theme) => (
              <Badge key={theme} variant="secondary">{theme}</Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-2">Summary</h3>
          <div className="space-y-2">
            <p className="text-muted-foreground">{chapter.summary.en}</p>
            <h4 className="font-medium mt-2">हिंदी सारांश</h4>
            <p className="text-muted-foreground">{chapter.summary.hi}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
