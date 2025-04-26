"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { X, PlusCircle } from "lucide-react"
import { useJournalEntries, JournalEntry } from "@/hooks/use-journal-entries"
import { Verse } from "@/lib/gita-client"
import { formatDistanceToNow } from "date-fns"

interface JournalDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  chapterId: number
  verseId: number
  verse: Verse
}

export function JournalDialog({ open, onOpenChange, chapterId, verseId, verse }: JournalDialogProps) {
  const { getEntry, saveEntry, deleteEntry } = useJournalEntries()
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [mood, setMood] = useState<JournalEntry["mood"]>("reflective")
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  
  const promptQuestions = [
    "What does this verse mean to you personally?",
    "How might you apply this teaching in your daily life?",
    "What challenges in your life does this verse help you address?",
    "What emotions does this verse evoke in you?",
    "How does this verse connect to other spiritual teachings you're familiar with?"
  ]

  useEffect(() => {
    if (open) {
      const existingEntry = getEntry(chapterId, verseId)
      if (existingEntry) {
        setContent(existingEntry.content)
        setTags(existingEntry.tags || [])
        setMood(existingEntry.mood || "reflective")
        
        const updatedDate = new Date(existingEntry.updatedAt)
        setLastUpdated(formatDistanceToNow(updatedDate, { addSuffix: true }))
      } else {
        setContent("")
        setTags([])
        setMood("reflective")
        setLastUpdated(null)
      }
      setShowDeleteConfirm(false)
    }
  }, [open, chapterId, verseId, getEntry])

  const handleSave = () => {
    saveEntry({
      chapterId,
      verseId,
      content,
      tags,
      mood
    })
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (showDeleteConfirm) {
      deleteEntry(chapterId, verseId)
      setShowDeleteConfirm(false)
      onOpenChange(false)
    } else {
      setShowDeleteConfirm(true)
    }
  }

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault()
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  const versePreview = verse.siva?.et || verse.purohit?.et || verse.prabhu?.et || verse.slok

  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      if (!newOpen && showDeleteConfirm) {
        setShowDeleteConfirm(false)
      }
      onOpenChange(newOpen)
    }}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Journal Entry</DialogTitle>
          {lastUpdated && (
            <p className="text-xs text-muted-foreground">Last updated {lastUpdated}</p>
          )}
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-muted p-3 rounded-md">
            <p className="text-sm text-muted-foreground mb-1">
              Chapter {chapterId}.{verseId}
            </p>
            <p className="text-sm italic line-clamp-3">{versePreview}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="journal-content">Your Reflections</Label>
            <Textarea
              id="journal-content"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className="resize-none"
            />
            
            <div className="space-y-1 mt-2">
              <p className="text-sm font-medium">Reflection Prompts:</p>
              <ul className="text-xs text-muted-foreground space-y-1 list-disc pl-5">
                {promptQuestions.map((question, index) => (
                  <li key={index}>{question}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-2">
            <Label>How did this verse make you feel?</Label>
            <RadioGroup 
              value={mood} 
              onValueChange={(value) => setMood(value as JournalEntry["mood"])}
              className="flex flex-wrap gap-2"
            >
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="inspired" id="inspired" />
                <Label htmlFor="inspired" className="text-sm">Inspired</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="reflective" id="reflective" />
                <Label htmlFor="reflective" className="text-sm">Reflective</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="peaceful" id="peaceful" />
                <Label htmlFor="peaceful" className="text-sm">Peaceful</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="questioning" id="questioning" />
                <Label htmlFor="questioning" className="text-sm">Questioning</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="grateful" id="grateful" />
                <Label htmlFor="grateful" className="text-sm">Grateful</Label>
              </div>
              <div className="flex items-center space-x-1">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other" className="text-sm">Other</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1 mb-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-2 py-0.5">
                  {tag}
                  <button 
                    className="ml-1 hover:text-destructive" 
                    onClick={() => handleRemoveTag(tag)}
                    type="button"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
            <form onSubmit={handleAddTag} className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a tag..."
                className="flex-1"
              />
              <Button type="submit" size="sm" variant="outline">
                <PlusCircle className="h-4 w-4 mr-1" />
                Add
              </Button>
            </form>
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          {lastUpdated ? (
            <>
              {showDeleteConfirm ? (
                <div className="w-full flex-1 flex flex-col sm:flex-row gap-2">
                  <Button 
                    variant="destructive" 
                    className="w-full sm:flex-1"
                    onClick={handleDelete}
                  >
                    Confirm Delete
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full sm:flex-1" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <Button 
                  variant="outline" 
                  className="w-full sm:w-auto" 
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              )}
              <Button 
                onClick={handleSave}
                disabled={!content.trim()}
                className="w-full sm:w-auto"
              >
                Update
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button 
                onClick={handleSave}
                disabled={!content.trim()}
                className="w-full sm:w-auto"
              >
                Save
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
