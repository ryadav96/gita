"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Search, Edit, Calendar, Tag } from "lucide-react"
import { useJournalEntries, JournalEntry } from "@/hooks/use-journal-entries"
import { fetchVerse } from "@/lib/gita-client"

const MOOD_COLORS: Record<string, string> = {
  inspired: "text-blue-500",
  reflective: "text-purple-500",
  peaceful: "text-green-500",
  questioning: "text-amber-500",
  grateful: "text-pink-500",
  other: "text-gray-500"
};

export function JournalEntries() {
  const { entries } = useJournalEntries()
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([])
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [versePreviews, setVersePreviews] = useState<Record<string, string>>({})
  const [allTags, setAllTags] = useState<string[]>([])
  
  // Get all unique tags
  useEffect(() => {
    const tags = new Set<string>()
    entries.forEach(entry => {
      if (entry.tags) {
        entry.tags.forEach(tag => tags.add(tag))
      }
    })
    setAllTags(Array.from(tags))
  }, [entries])
  
  // Filter entries based on search term and active tag
  useEffect(() => {
    let filtered = [...entries]
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by active tag
    if (activeTag) {
      filtered = filtered.filter(entry => 
        entry.tags?.includes(activeTag)
      )
    }
    
    // Sort by updated date (newest first)
    filtered.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    
    setFilteredEntries(filtered)
  }, [entries, searchTerm, activeTag])
  
  // Fetch verse previews for entries
  useEffect(() => {
    const fetchVersePreviews = async () => {
      const previews: Record<string, string> = {}
      
      for (const entry of filteredEntries) {
        // Skip if we already have a preview for this verse
        if (previews[entry.id]) continue
        
        try {
          const verseData = await fetchVerse(entry.chapterId, entry.verseId)
          if (verseData) {
            // Get the translation from any available source
            const translation = 
              verseData.purohit?.et || 
              verseData.siva?.et || 
              verseData.prabhu?.et || 
              verseData.slok
            
            // Store a short preview
            previews[entry.id] = translation.substring(0, 80) + "..."
          }
        } catch (error) {
          console.error("Error fetching verse preview:", error)
        }
      }
      
      setVersePreviews(previews)
    }
    
    if (filteredEntries.length > 0) {
      fetchVersePreviews()
    }
  }, [filteredEntries])
  
  if (entries.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">You haven't created any journal entries yet.</p>
        <Link href="/chapters">
          <Button>Start Reading</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="relative flex items-center mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search your journal entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 w-full"
        />
      </div>
      
      {/* Tag filtering */}
      {allTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge 
            variant={activeTag === null ? "secondary" : "outline"} 
            className="cursor-pointer"
            onClick={() => setActiveTag(null)}
          >
            All
          </Badge>
          {allTags.map(tag => (
            <Badge 
              key={tag}
              variant={activeTag === tag ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => setActiveTag(tag === activeTag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      )}
      
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-4">
          {filteredEntries.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No entries match your search criteria</p>
              {(searchTerm || activeTag) && (
                <Button 
                  variant="link" 
                  onClick={() => {
                    setSearchTerm("")
                    setActiveTag(null)
                  }}
                >
                  Clear filters
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredEntries.map((entry) => (
                <Card key={entry.id}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <Link
                        href={`/chapters/${entry.chapterId}/verses/${entry.verseId}`}
                        className="font-medium hover:underline"
                      >
                        Chapter {entry.chapterId}.{entry.verseId}
                      </Link>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(entry.updatedAt), { addSuffix: true })}
                        </span>
                        <Badge variant="outline" className={`ml-2 ${MOOD_COLORS[entry.mood || "other"]}`}>
                          {entry.mood}
                        </Badge>
                      </div>
                    </div>
                    
                    {versePreviews[entry.id] && (
                      <p className="text-sm italic text-muted-foreground">
                        {versePreviews[entry.id]}
                      </p>
                    )}
                    
                    <p className="text-sm">{entry.content.substring(0, 150)}...</p>
                    
                    <div className="flex justify-between items-center pt-2">
                      <div className="flex flex-wrap gap-1">
                        {entry.tags && entry.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="text-xs"
                      >
                        <Link href={`/chapters/${entry.chapterId}/verses/${entry.verseId}`}>
                          <Edit className="h-3 w-3 mr-1" />
                          Continue
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="calendar" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Group entries by month */}
            {Object.entries(
              filteredEntries.reduce<Record<string, JournalEntry[]>>((acc, entry) => {
                const date = new Date(entry.updatedAt)
                const monthYear = `${date.toLocaleString('default', { month: 'long' })} ${date.getFullYear()}`
                
                if (!acc[monthYear]) {
                  acc[monthYear] = []
                }
                acc[monthYear].push(entry)
                return acc
              }, {})
            ).map(([monthYear, groupedEntries]) => (
              <Card key={monthYear}>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <h3 className="font-medium">{monthYear}</h3>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2">
                  {groupedEntries.map(entry => (
                    <Link
                      key={entry.id}
                      href={`/chapters/${entry.chapterId}/verses/${entry.verseId}`}
                      className="block p-2 hover:bg-muted rounded-md"
                    >
                      <div className="flex justify-between text-sm">
                        <span>{new Date(entry.updatedAt).toLocaleDateString()}</span>
                        <span>Chapter {entry.chapterId}.{entry.verseId}</span>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
