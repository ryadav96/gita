"use client"

import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck, Share, PenSquare, ZoomIn, ZoomOut } from "lucide-react"
import { useState, useEffect } from "react"
import { useApp } from "@/components/app-provider"
import { JournalDialog } from "@/components/journal/journal-dialog"
import { ShareDialog } from "@/components/verses/share-dialog"
import type { Verse } from "@/types"

interface VerseActionsProps {
  verse: Verse
  chapterId: number
  verseId: number
}

export function VerseActions({ verse, chapterId, verseId }: VerseActionsProps) {
  const { isBookmarked, toggleBookmark, markAsRead } = useApp()
  const [fontSize, setFontSize] = useState(100)
  const [journalOpen, setJournalOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)

  const bookmarked = isBookmarked(chapterId, verseId)

  // Mark verse as read when component mounts
  useEffect(() => {
    markAsRead(chapterId, verseId)
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const increaseFontSize = () => {
    setFontSize(Math.min(fontSize + 10, 150))
    document.documentElement.style.setProperty("--verse-font-size", `${fontSize + 10}%`)
  }

  const decreaseFontSize = () => {
    setFontSize(Math.max(fontSize - 10, 70))
    document.documentElement.style.setProperty("--verse-font-size", `${fontSize - 10}%`)
  }

  return (
    <div className="flex justify-between items-center">
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => toggleBookmark(chapterId, verseId)}
          aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
        >
          {bookmarked ? <BookmarkCheck className="h-4 w-4 text-primary" /> : <Bookmark className="h-4 w-4" />}
        </Button>

        <Button variant="outline" size="icon" onClick={() => setJournalOpen(true)} aria-label="Add notes">
          <PenSquare className="h-4 w-4" />
        </Button>

        <Button variant="outline" size="icon" onClick={() => setShareOpen(true)} aria-label="Share">
          <Share className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={decreaseFontSize}
          disabled={fontSize <= 70}
          aria-label="Decrease font size"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={increaseFontSize}
          disabled={fontSize >= 150}
          aria-label="Increase font size"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      <JournalDialog
        open={journalOpen}
        onOpenChange={setJournalOpen}
        chapterId={chapterId}
        verseId={verseId}
        verse={verse}
      />

      <ShareDialog open={shareOpen} onOpenChange={setShareOpen} verse={verse} />
    </div>
  )
}
