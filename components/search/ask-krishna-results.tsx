"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, ThumbsUp, ThumbsDown, Copy, Bookmark, Share } from "lucide-react"
import Link from "next/link"
import { askKrishnaQuery } from "@/lib/data"
import { useApp } from "@/components/app-provider"
import { useToast } from "@/hooks/use-toast"

interface AskKrishnaResultsProps {
  query: string
}

export function AskKrishnaResults({ query }: AskKrishnaResultsProps) {
  const [result, setResult] = useState<{
    answer: string
    relatedVerses: Array<{ chapter: number; verse: number; title: string }>
  } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { isPremium } = useApp()
  const { toast } = useToast()

  useEffect(() => {
    if (!query) return

    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      const response = askKrishnaQuery(query)
      setResult(response)
      setIsLoading(false)
    }, 1000)
  }, [query])

  const handleCopy = () => {
    if (!result) return

    navigator.clipboard.writeText(result.answer)
    toast({
      title: "Copied to clipboard",
      description: "The answer has been copied to your clipboard.",
    })
  }

  const handleBookmark = () => {
    toast({
      title: "Answer bookmarked",
      description: "This answer has been saved to your bookmarks.",
    })
  }

  const handleShare = () => {
    toast({
      title: "Sharing answer",
      description: "Opening sharing dialog...",
    })
  }

  const handleFeedback = (type: "positive" | "negative") => {
    toast({
      title: `Feedback received`,
      description: `Thank you for your ${type} feedback.`,
    })
  }

  if (isLoading) {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Krishna is thinking...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!result) return null

  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MessageCircle className="mr-2 h-5 w-5" />
            Krishna's Answer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>{result.answer}</p>

            {!isPremium && (
              <div className="bg-primary/10 p-3 rounded-md text-sm">
                <p>You've used 1 of 3 daily Ask-Krishna queries. Upgrade to premium for unlimited queries.</p>
              </div>
            )}

            <div className="flex justify-between items-center">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleFeedback("positive")}>
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  Helpful
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleFeedback("negative")}>
                  <ThumbsDown className="mr-1 h-4 w-4" />
                  Not Helpful
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleBookmark}>
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleShare}>
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {result.relatedVerses.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Related Verses</h3>
          <div className="space-y-2">
            {result.relatedVerses.map((verse) => (
              <Link key={`${verse.chapter}_${verse.verse}`} href={`/chapters/${verse.chapter}/verses/${verse.verse}`}>
                <Card className="hover:bg-accent transition-colors">
                  <CardContent className="p-3">
                    <p className="font-medium">
                      {verse.chapter}.{verse.verse} - {verse.title}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
