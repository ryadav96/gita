"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { SlidersHorizontal, X } from "lucide-react"
import { getAllChapters, getAllCommentators } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

interface SearchFiltersProps {
  filters: {
    emotions: string[]
    chapter: string
    commentators: string[]
  }
  onFilterChange: (filters: SearchFiltersProps["filters"]) => void
}

export function SearchFilters({ filters, onFilterChange }: SearchFiltersProps) {
  const [localFilters, setLocalFilters] = useState(filters)
  const chapters = getAllChapters()
  const commentators = getAllCommentators()

  const emotions = [
    { value: "confused", label: "Confused 🤔" },
    { value: "motivated", label: "Motivated 💪" },
    { value: "peaceful", label: "Peaceful 🧘" },
    { value: "wisdom", label: "Wisdom 🧠" },
    { value: "devotion", label: "Devotion 🙏" },
    { value: "duty", label: "Duty ⚔️" },
  ]

  const handleEmotionToggle = (emotion: string) => {
    setLocalFilters((prev) => {
      const newEmotions = prev.emotions.includes(emotion)
        ? prev.emotions.filter((e) => e !== emotion)
        : [...prev.emotions, emotion]

      return { ...prev, emotions: newEmotions }
    })
  }

  const handleChapterChange = (chapter: string) => {
    setLocalFilters((prev) => ({ ...prev, chapter }))
  }

  const handleCommentatorToggle = (commentator: string) => {
    setLocalFilters((prev) => {
      const newCommentators = prev.commentators.includes(commentator)
        ? prev.commentators.filter((c) => c !== commentator)
        : [...prev.commentators, commentator]

      return { ...prev, commentators: newCommentators }
    })
  }

  const handleApply = () => {
    onFilterChange(localFilters)
  }

  const handleReset = () => {
    const resetFilters = {
      emotions: [],
      chapter: "",
      commentators: [],
    }
    setLocalFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  const hasActiveFilters =
    localFilters.emotions.length > 0 || localFilters.chapter !== "" || localFilters.commentators.length > 0

  return (
    <div className="mt-4">
      <Sheet>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className={hasActiveFilters ? "bg-primary/10" : ""}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="ml-2 rounded-full bg-primary w-5 h-5 text-xs flex items-center justify-center text-primary-foreground">
                {localFilters.emotions.length + 
                  (localFilters.chapter ? 1 : 0) + 
                  localFilters.commentators.length}
              </span>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Search Filters</SheetTitle>
          </SheetHeader>
          
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <Label>Emotions</Label>
              <div className="grid grid-cols-2 gap-2">
                {emotions.map((emotion) => (
                  <div key={emotion.value} className="flex items-center space-x-2">
                    <Checkbox
                      id={`emotion-${emotion.value}`}
                      checked={localFilters.emotions.includes(emotion.value)}
                      onCheckedChange={() => handleEmotionToggle(emotion.value)}
                    />
                    <Label htmlFor={`emotion-${emotion.value}`}>
                      {emotion.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="chapter">Chapter</Label>
              <Select
                value={localFilters.chapter}
                onValueChange={handleChapterChange}
              >
                <SelectTrigger id="chapter">
                  <SelectValue placeholder="All Chapters" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Chapters</SelectItem>
                  {chapters.map((chapter) => (
                    <SelectItem 
                      key={chapter.chapter_number} 
                      value={chapter.chapter_number.toString()}
                    >
                      {chapter.chapter_number}: {chapter.translation || chapter.name_translated}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Commentators</Label>
              <div className="space-y-2">
                {commentators.map((commentator) => (
                  <div key={commentator.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`commentator-${commentator.id}`}
                      checked={localFilters.commentators.includes(commentator.id)}
                      onCheckedChange={() => handleCommentatorToggle(commentator.id)}
                    />
                    <Label htmlFor={`commentator-${commentator.id}`}>
                      {commentator.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <SheetFooter>
            <div className="flex space-x-2 w-full">
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="flex-1"
              >
                Reset
              </Button>
              <Button 
                onClick={handleApply}
                className="flex-1"
              >
                Apply Filters
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-2">
          {localFilters.emotions.map((emotion) => (
            <Badge key={emotion} variant="secondary" className="flex items-center">
              {emotions.find(e => e.value === emotion)?.label}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => {
                  handleEmotionToggle(emotion);
                  handleApply();
                }}
              />
            </Badge>
          ))}
          
          {localFilters.chapter && (
            <Badge variant="secondary" className="flex items-center">
              Chapter {localFilters.chapter}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => {
                  handleChapterChange("");
                  handleApply();
                }}
              />
            </Badge>
          )}
          
          {localFilters.commentators.map((commentator) => (
            <Badge key={commentator} variant="secondary" className="flex items-center">
              {commentators.find(c => c.id === commentator)?.name}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={() => {
                  handleCommentatorToggle(commentator);
                  handleApply();
                }}
              />
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
