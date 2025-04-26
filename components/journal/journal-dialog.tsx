"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useApp } from "@/components/app-provider"
import type { Verse } from "@/types"

interface JournalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapterId: number
  verseId: number
  verse: Verse
}

export function JournalDialog({ open, onOpenChange, chapterId, verseId, verse }: JournalDialogProps) {
  const { getNote, saveNote, isPremium } = useApp()
  const [content, setContent] = useState("")

  useEffect(() => {
    if (open) {
      setContent(getNote(chapterId, verseId))
    }
  }, [open, chapterId, verseId, getNote])

  const handleSave = () => {
    saveNote(chapterId, verseId, content)
    onOpenChange(false)
  }

  const promptQuestions = [
    "What does this verse mean to you?",
    "How can you apply this teaching in your life?",
    "What challenges does this verse help you address?",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Journal Entry</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">
              Chapter {chapterId}.{verseId} - {verse.title}
            </p>
            <p className="text-sm italic">{verse.translation}</p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Reflection Prompts:</p>
            <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-5">
              {promptQuestions.map((question, index) => (
                <li key={index}>{question}</li>
              ))}
            </ul>
          </div>

          <Textarea
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            className="resize-none"
            disabled={!isPremium && content.length > 500}
          />

          {!isPremium && (
            <p className="text-xs text-muted-foreground">
              Free users can write up to 500 characters.
              {content.length > 500 && " Upgrade to premium to continue writing."}
              <br />
              {content.length}/500 characters used.
            </p>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!isPremium && content.length > 500}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
