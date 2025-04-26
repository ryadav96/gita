"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, ChevronRight, Share2, MessageSquare, User } from "lucide-react"
import Link from "next/link"

interface MessageProps {
  message: {
    id: string
    role: "user" | "assistant"
    content: string
    verses?: {
      id: string
      chapter: string
      verse: string
      text: string
    }[]
  }
}

export function AskKrishnaMessage({ message }: MessageProps) {
  const [showFullVerses, setShowFullVerses] = useState(false)
  
  // Handle verse link click
  const handleVerseLinkClick = (event: React.MouseEvent, verseId: string) => {
    event.preventDefault()
    // In a real app, navigate to verse or show a verse modal
    console.log(`Navigate to verse: ${verseId}`)
    window.location.href = `/chapters/${verseId.split('-')[0]}?verse=${verseId}`
  }
  
  return (
    <div className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`flex gap-3 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : ""}`}>
        {/* Avatar */}
        <Avatar className="h-8 w-8 flex-shrink-0">
          {message.role === "user" ? (
            <User className="h-5 w-5" />
          ) : (
            <MessageSquare className="h-5 w-5" />
          )}
        </Avatar>
        
        {/* Message Content */}
        <div className={`space-y-3 ${message.role === "user" ? "items-end" : "items-start"}`}>
          <div 
            className={`rounded-lg p-3 ${
              message.role === "user" 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted"
            }`}
          >
            <p className="whitespace-pre-wrap">{message.content}</p>
          </div>
          
          {/* Related Verses */}
          {message.verses && message.verses.length > 0 && (
            <div className="space-y-2 w-full">
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <BookOpen className="h-4 w-4" />
                <span>Related verses from the Bhagavad Gita:</span>
              </div>
              
              <div className="space-y-2">
                {message.verses.slice(0, showFullVerses ? undefined : 1).map((verse) => (
                  <Card 
                    key={verse.id} 
                    className="p-3 text-sm bg-background/50 hover:bg-background"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline">
                        Chapter {verse.chapter}, Verse {verse.verse}
                      </Badge>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-6 w-6"
                        asChild
                      >
                        <Link href={`/chapters/${verse.chapter}?verse=${verse.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                    <p className="text-sm">{verse.text}</p>
                  </Card>
                ))}
                
                {message.verses.length > 1 && !showFullVerses && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs w-full"
                    onClick={() => setShowFullVerses(true)}
                  >
                    Show {message.verses.length - 1} more verses
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
