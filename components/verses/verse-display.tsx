"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Heart, Share2, BookOpen, PenLine, Bookmark } from "lucide-react"
import { Verse } from "@/lib/gita-client"
import { fetchVersesFromChapter } from "@/lib/gita-client"
import { useJournalEntries } from "@/hooks/use-journal-entries"
import { useReadingProgress } from "@/hooks/use-reading-progress"
import { JournalDialog } from "@/components/journal/journal-dialog"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface VerseDisplayProps {
  verse: Verse
  chapterId: string
  verseId: string
}

export function VerseDisplay({ verse, chapterId, verseId }: VerseDisplayProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [totalVerses, setTotalVerses] = useState(0)
  const [showJournalDialog, setShowJournalDialog] = useState(false)
  const [currentView, setCurrentView] = useState<'verse' | 'notes'>('verse')
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  
  const chapterNum = parseInt(chapterId, 10)
  const verseNum = parseInt(verseId, 10)
  
  // Get journal functionality
  const { getEntry, hasEntry } = useJournalEntries()
  const journalEntry = getEntry(chapterNum, verseNum)
  
  // Use the new reading progress hook
  const { markVerseAsRead, getReadingStats } = useReadingProgress()
  
  // Add local storage for favorite verses
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('gita-favorite-verses') || '[]') as string[]
    const verseKey = `${chapterNum}_${verseNum}`
    setIsFavorite(favorites.includes(verseKey))
  }, [chapterNum, verseNum])
  
  // Track reading progress
  useEffect(() => {
    // Mark this verse as read and update reading progress
    markVerseAsRead(chapterNum, verseNum, totalVerses || 0)
  }, [chapterNum, verseNum, totalVerses, markVerseAsRead])
  
  // Fetch total number of verses in the chapter
  useEffect(() => {
    async function fetchVerseCount() {
      try {
        const verses = await fetchVersesFromChapter(chapterNum)
        setTotalVerses(verses.length)
        setHasReachedEnd(verseNum >= verses.length && chapterNum >= 18)
        
        // Update total verses in the reading progress
        markVerseAsRead(chapterNum, verseNum, verses.length)
      } catch (error) {
        console.error("Error fetching verses count:", error)
      }
    }
    
    fetchVerseCount()
  }, [chapterNum, verseNum, markVerseAsRead])
  
  const navigateToPreviousVerse = () => {
    if (verseNum > 1) {
      router.push(`/chapters/${chapterNum}/verses/${verseNum - 1}`)
    } else if (chapterNum > 1) {
      // If we're at the first verse of a chapter, go to the previous chapter
      router.push(`/chapters/${chapterNum - 1}/verses/1`) // Default to verse 1 of previous chapter
    }
  }
  
  const navigateToNextVerse = () => {
    if (verseNum < totalVerses) {
      router.push(`/chapters/${chapterNum}/verses/${verseNum + 1}`)
    } else if (chapterNum < 18) { // Bhagavad Gita has 18 chapters
      // If we're at the last verse of a chapter, go to the next chapter
      router.push(`/chapters/${chapterNum + 1}/verses/1`)
    }
  }
  
  const toggleFavorite = () => {
    const verseKey = `${chapterNum}_${verseNum}`
    const favorites = JSON.parse(localStorage.getItem('gita-favorite-verses') || '[]') as string[]
    
    let newFavorites
    if (isFavorite) {
      newFavorites = favorites.filter(v => v !== verseKey)
    } else {
      newFavorites = [...favorites, verseKey]
    }
    
    localStorage.setItem('gita-favorite-verses', JSON.stringify(newFavorites))
    setIsFavorite(!isFavorite)
  }
  
  const shareVerse = () => {
    // Get verse translation for sharing
    const translation = verse.purohit?.et || verse.siva?.et || verse.prabhu?.et || verse.slok
    
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita Chapter ${chapterNum}, Verse ${verseNum}`,
        text: `${translation}\n\nBhagavad Gita ${chapterNum}.${verseNum}`,
        url: window.location.href,
      }).catch((error) => console.error("Error sharing:", error))
    } else {
      // Fallback for browsers that don't support the Share API
      alert("Share functionality not available on this browser")
    }
  }
  
  // Get text for progress message
  const getProgressText = (): string => {
    const readingStats = getReadingStats()
    const totalProgress = readingStats.completionPercentage
    
    if (hasReachedEnd) {
      return "Congratulations on completing the Bhagavad Gita! You can reflect on your journey in your journal."
    } else if (totalProgress > 75) {
      return "You're making excellent progress through the Gita's wisdom!"
    } else if (totalProgress > 50) {
      return "You're more than halfway through this spiritual journey."
    } else if (totalProgress > 25) {
      return "You're gaining momentum in your study of the Gita."
    } else {
      return "You've begun your journey through the wisdom of the Bhagavad Gita."
    }
  }
  
  return (
    <div className="space-y-6">
      {/* Verse Navigation Header */}
      <div className="flex justify-between items-center">
        <Button 
          variant="outline" 
          size="sm"
          onClick={navigateToPreviousVerse}
          disabled={chapterNum === 1 && verseNum === 1}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Previous
        </Button>
        
        <div className="text-center">
          <h2 className="font-medium">Chapter {chapterNum}, Verse {verseNum}</h2>
          <p className="text-xs text-muted-foreground">{verseNum} of {totalVerses}</p>
        </div>
        
        <Button 
          variant="outline"
          size="sm"
          onClick={navigateToNextVerse}
          disabled={chapterNum === 18 && verseNum === totalVerses}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>
      
      {/* Reading progress message */}
      <div className="bg-muted/30 p-3 rounded-md text-sm text-center">
        {getProgressText()}
      </div>
      
      {/* View switcher */}
      <div className="flex border rounded-md overflow-hidden">
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium ${currentView === 'verse' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
          onClick={() => setCurrentView('verse')}
        >
          <BookOpen className="h-4 w-4 inline-block mr-1" />
          Verse
        </button>
        <button 
          className={`flex-1 py-2 px-4 text-sm font-medium flex items-center justify-center gap-2 ${currentView === 'notes' ? 'bg-primary text-primary-foreground' : 'bg-background'}`}
          onClick={() => setCurrentView('notes')}
        >
          <PenLine className="h-4 w-4" />
          My Notes
          {journalEntry && <Badge variant="outline" className="h-5 w-5 rounded-full p-0 flex items-center justify-center">•</Badge>}
        </button>
      </div>
      
      {currentView === 'verse' ? (
        <>
          {/* Sanskrit Shloka */}
          <Card className="p-6">
            <div className="text-center space-y-4">
              <h3 className="font-medium text-muted-foreground">Sanskrit</h3>
              <p className="text-lg font-medium whitespace-pre-line">{verse.slok}</p>
            </div>
          </Card>
        
          {/* Transliteration */}
          <Card className="p-6">
            <div className="text-center space-y-4">
              <h3 className="font-medium text-muted-foreground">Transliteration</h3>
              <p className="whitespace-pre-line">{verse.transliteration}</p>
            </div>
          </Card>
        
          {/* Commentaries & Translations */}
          <Tabs defaultValue="tej">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="tej">Swami Tejomayananda</TabsTrigger>
              <TabsTrigger value="siva">Swami Sivananda</TabsTrigger>
              <TabsTrigger value="purohit">Purohit Swami</TabsTrigger>
              <TabsTrigger value="prabhu">A.C.B. Prabhupada</TabsTrigger>
            </TabsList>
            
            <TabsContent value="tej" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h4 className="font-medium">Hindi Translation</h4>
                {verse.tej.ht && <p className="text-muted-foreground">{verse.tej.ht}</p>}
              </div>
            </TabsContent>
            
            <TabsContent value="siva" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h4 className="font-medium">English Translation</h4>
                {verse.siva.et && <p className="text-muted-foreground">{verse.siva.et}</p>}
                
                {verse.siva.ec && (
                  <>
                    <h4 className="font-medium pt-2">Commentary</h4>
                    <p className="text-muted-foreground">{verse.siva.ec}</p>
                  </>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="purohit" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h4 className="font-medium">English Translation</h4>
                {verse.purohit.et && <p className="text-muted-foreground">{verse.purohit.et}</p>}
              </div>
            </TabsContent>
            
            <TabsContent value="prabhu" className="p-4 border rounded-md mt-2">
              <div className="space-y-4">
                <h4 className="font-medium">English Translation</h4>
                {verse.prabhu.et && <p className="text-muted-foreground">{verse.prabhu.et}</p>}
                
                {verse.prabhu.ec && (
                  <>
                    <h4 className="font-medium pt-2">Commentary</h4>
                    <p className="text-muted-foreground">{verse.prabhu.ec}</p>
                  </>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </>
      ) : (
        // Notes view
        <div className="min-h-[300px]">
          {journalEntry ? (
            <Card className="p-6 space-y-4 h-full">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">Your Journal Entry</h3>
                  <p className="text-xs text-muted-foreground">
                    Last updated {formatDistanceToNow(new Date(journalEntry.updatedAt), { addSuffix: true })}
                  </p>
                </div>
                <Badge variant="outline" className={`${
                  journalEntry.mood === 'inspired' ? 'text-blue-500' : 
                  journalEntry.mood === 'reflective' ? 'text-purple-500' :
                  journalEntry.mood === 'peaceful' ? 'text-green-500' :
                  journalEntry.mood === 'questioning' ? 'text-amber-500' :
                  journalEntry.mood === 'grateful' ? 'text-pink-500' : 'text-gray-500'
                }`}>
                  {journalEntry.mood || 'other'}
                </Badge>
              </div>
              
              <div className="py-2 border-t border-b">
                <p className="whitespace-pre-wrap">{journalEntry.content}</p>
              </div>
              
              {journalEntry.tags && journalEntry.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {journalEntry.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="pt-4">
                <Button onClick={() => setShowJournalDialog(true)}>
                  Edit Journal Entry
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-6 flex flex-col items-center justify-center space-y-4 h-[300px]">
              <PenLine className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium text-xl">Create Your First Journal Entry</h3>
              <p className="text-center text-muted-foreground max-w-md">
                Reflect on this verse's meaning and how it applies to your life. 
                Journaling helps deepen your understanding of the Gita's teachings.
              </p>
              <Button onClick={() => setShowJournalDialog(true)}>
                Start Journaling
              </Button>
            </Card>
          )}
        </div>
      )}
      
      {/* Journal Dialog */}
      <JournalDialog
        open={showJournalDialog}
        onOpenChange={setShowJournalDialog}
        chapterId={chapterNum}
        verseId={verseNum}
        verse={verse}
      />
      
      {/* Action Buttons */}
      <div className="flex justify-center gap-4 pt-4 border-t">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFavorite}
          className={isFavorite ? "text-red-500" : ""}
          title={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart className={isFavorite ? "fill-red-500" : ""} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowJournalDialog(true)}
          className={hasEntry(chapterNum, verseNum) ? "text-primary" : ""}
          title="Open journal"
        >
          <PenLine className={hasEntry(chapterNum, verseNum) ? "fill-primary" : ""} />
        </Button>
        
        <Button
          variant="outline"
          size="icon"
          onClick={shareVerse}
          title="Share this verse"
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}