"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { searchVerses } from "@/lib/data"

interface SearchResultsProps {
  query: string
  filters: {
    emotions: string[]
    chapter: string
    commentators: string[]
  }
}

export function SearchResults({ query, filters }: SearchResultsProps) {
  const [results, setResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query && !filters.emotions.length && !filters.chapter && !filters.commentators.length) {
      setResults([])
      return
    }

    setIsLoading(true)

    // Simulate search delay
    setTimeout(() => {
      const searchResults = searchVerses(query, filters)
      setResults(searchResults)
      setIsLoading(false)
    }, 500)
  }, [query, filters])

  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="h-24 p-4" />
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (results.length === 0) {
    return (
      <div className="py-8 text-center">
        {query || filters.emotions.length || filters.chapter || filters.commentators.length ? (
          <p className="text-muted-foreground">No results found. Try adjusting your search or filters.</p>
        ) : (
          <p className="text-muted-foreground">Enter a search term or select filters to find verses.</p>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-4 mt-4">
      {results.map((verse) => (
        <Link key={`${verse.chapter}_${verse.verse}`} href={`/chapters/${verse.chapter}/verses/${verse.verse}`}>
          <Card className="hover:bg-accent transition-colors">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">
                    {verse.chapter}.{verse.verse} - {verse.title}
                  </h3>
                  <div className="flex space-x-1">
                    {verse.emotions?.map((emotion: string) => (
                      <Badge key={emotion} variant="outline">
                        {emotion}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm italic">{verse.sanskrit}</p>
                <p className="text-sm">{verse.translation}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
