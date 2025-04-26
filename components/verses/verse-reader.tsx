"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  PenSquare, 
  Share2, 
  MoreHorizontal,
  Play,
  Pause,
  Volume2,
  Type
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

interface VerseReaderProps {
  chapterId: string
  verseId: string
  isDaily?: boolean
  mood?: string
}

export function VerseReader({ chapterId, verseId, isDaily = false, mood }: VerseReaderProps) {
  const router = useRouter()
  const [isFavorite, setIsFavorite] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioProgress, setAudioProgress] = useState(0)
  const [fontSize, setFontSize] = useState(100) // 100% is default
  const [showTransliteration, setShowTransliteration] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  
  // Mock verse data - in a real app, this would come from an API or local data store
  const verseData = {
    id: verseId,
    chapter: chapterId,
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata\nabhyutthānam adharmasya tadātmānaṁ sṛijāmyaham",
    translation: "Whenever there is a decline in righteousness and an increase in unrighteousness, O Arjuna, at that time I manifest myself on earth.",
    wordMeanings: {
      "yadā yadā": "whenever",
      "hi": "certainly",
      "dharmasya": "of righteousness",
      "glānir": "decline",
      // More word meanings...
    },
    audioUrl: "/path-to-audio.mp3", // Mock URL
    commentaries: {
      wisdom: "This verse underscores the divine intervention that occurs whenever dharma declines...",
      bhakti: "The Lord's promise to appear whenever dharma declines is a profound expression of His love...",
      life: "In our personal lives, this verse reminds us that divine help arrives when we need it most...",
      work: "In professional contexts, this verse teaches us to uphold ethical standards even when surrounded by corruption..."
    }
  }

  // Navigate to previous/next verse
  const navigateVerse = (direction: 'prev' | 'next') => {
    const currentVerseNum = parseInt(verseId)
    const newVerseNum = direction === 'prev' ? Math.max(1, currentVerseNum - 1) : currentVerseNum + 1
    
    // Save reading progress
    localStorage.setItem('lastReadChapter', chapterId)
    localStorage.setItem('lastReadVerse', newVerseNum.toString())
    
    // Navigate to the new verse
    router.push(`/chapters/${chapterId}/verses/${newVerseNum}`)
  }

  // Audio controls
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Toggle favorite status
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    // In a real app, save to local storage or user data
  }

  // Open journal entry
  const openJournal = () => {
    // In a real app, this would open a journal dialog or navigate
    router.push(`/journal/new?chapter=${chapterId}&verse=${verseId}`)
  }

  // Share verse
  const shareVerse = () => {
    // In a real app, this would open share options
    if (navigator.share) {
      navigator.share({
        title: `Bhagavad Gita Chapter ${chapterId}, Verse ${verseId}`,
        text: `${verseData.translation}`,
        url: `https://bhagavadgita.app/chapters/${chapterId}/verses/${verseId}`
      })
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(`${verseData.translation} - Bhagavad Gita ${chapterId}.${verseId}`)
      // Show a toast notification (not implemented here)
    }
  }

  // Adjust font size
  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
  }

  // Simulate audio progress
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false)
            clearInterval(interval)
            return 0
          }
          return prev + 1
        })
      }, 100)
    }
    
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying])

  return (
    <div className="space-y-6">
      {/* Verse Navigation Header */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigateVerse('prev')} 
          disabled={verseId === "1"}
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Prev
        </Button>
        
        <div className="text-center">
          <div className="text-sm font-medium">Ch {chapterId}</div>
          <div className="text-xs text-muted-foreground">Verse {verseId}</div>
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigateVerse('next')}
        >
          Next
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      {/* Sanskrit Verse */}
      <div className={`space-y-6 transition-all`} style={{ fontSize: `${fontSize}%` }}>
        <div className="bg-muted/40 rounded-lg p-4">
          <div className="font-sanskrit text-xl leading-relaxed tracking-wide text-center">
            {verseData.sanskrit.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
          
          {showTransliteration && (
            <div className="text-sm text-muted-foreground mt-4 italic text-center">
              {verseData.transliteration.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              ))}
            </div>
          )}
        </div>

        {/* Translation */}
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg">{verseData.translation}</p>
        </div>
      </div>

      {/* Audio Control */}
      <div className="bg-muted/30 rounded-lg p-3 flex items-center space-x-3">
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 rounded-full"
          onClick={togglePlayPause}
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4" />
          )}
        </Button>
        
        <div className="flex-1">
          <Slider 
            value={[audioProgress]} 
            max={100} 
            step={1}
            className="cursor-pointer" 
          />
        </div>
        
        <div className="text-xs text-muted-foreground w-12 text-right">
          {Math.floor(audioProgress / 10)}s
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex flex-col items-center gap-1 h-auto py-2", 
            isFavorite ? "text-red-500" : "")}
          onClick={toggleFavorite}
        >
          <Heart className={cn("h-5 w-5", isFavorite ? "fill-red-500" : "")} />
          <span className="text-xs">Favorite</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2"
          onClick={openJournal}
        >
          <PenSquare className="h-5 w-5" />
          <span className="text-xs">Add Notes</span>
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="flex flex-col items-center gap-1 h-auto py-2"
          onClick={shareVerse}
        >
          <Share2 className="h-5 w-5" />
          <span className="text-xs">Share</span>
        </Button>
        
        <Drawer>
          <DrawerTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="flex flex-col items-center gap-1 h-auto py-2"
            >
              <MoreHorizontal className="h-5 w-5" />
              <span className="text-xs">More</span>
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="p-4 space-y-4">
              <h4 className="font-medium">Display Options</h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm">Font Size</label>
                  <div className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    <Slider 
                      value={[fontSize]} 
                      min={70} 
                      max={150} 
                      step={10}
                      onValueChange={handleFontSizeChange}
                      className="w-32" 
                    />
                    <Type className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <label className="text-sm">Show Transliteration</label>
                  <Button 
                    variant={showTransliteration ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShowTransliteration(!showTransliteration)}
                  >
                    {showTransliteration ? "On" : "Off"}
                  </Button>
                </div>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>

      {/* Commentary Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <Button className="w-full mt-4">View Commentary</Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh]">
          <SheetHeader>
            <SheetTitle>Commentary</SheetTitle>
          </SheetHeader>
          <Tabs defaultValue="wisdom" className="mt-4">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="wisdom">Wisdom</TabsTrigger>
              <TabsTrigger value="bhakti">Bhakti</TabsTrigger>
              <TabsTrigger value="life">Life</TabsTrigger>
              <TabsTrigger value="work">Work</TabsTrigger>
            </TabsList>
            <TabsContent value="wisdom" className="prose dark:prose-invert">
              <p>{verseData.commentaries.wisdom}</p>
            </TabsContent>
            <TabsContent value="bhakti" className="prose dark:prose-invert">
              <p>{verseData.commentaries.bhakti}</p>
            </TabsContent>
            <TabsContent value="life" className="prose dark:prose-invert">
              <p>{verseData.commentaries.life}</p>
            </TabsContent>
            <TabsContent value="work" className="prose dark:prose-invert">
              <p>{verseData.commentaries.work}</p>
            </TabsContent>
          </Tabs>
        </SheetContent>
      </Sheet>
      
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={verseData.audioUrl} 
        onEnded={() => setIsPlaying(false)}
        style={{ display: 'none' }}
      />
    </div>
  )
}