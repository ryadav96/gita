"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useApp } from "@/components/app-provider"
import { getAllVerses } from "@/lib/data"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

export function JournalEntries() {
  const { notes } = useApp()
  const [entries, setEntries] = useState<
    Array<{
      chapterId: number
      verseId: number
      content: string
      timestamp: string
    }>
  >([])

  useEffect(() => {
    // Convert notes object to array of entries
    const entriesArray = Object.entries(notes).map(([key, content]) => {
      const [chapterId, verseId] = key.split("_").map(Number)
      // In a real app, we'd store timestamps with notes
      // Here we're generating random past dates for demo
      const randomDaysAgo = Math.floor(Math.random() * 30) + 1
      const timestamp = new Date()
      timestamp.setDate(timestamp.getDate() - randomDaysAgo)

      return {
        chapterId,
        verseId,
        content,
        timestamp: timestamp.toISOString(),
      }
    })

    // Sort by timestamp, newest first
    entriesArray.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

    setEntries(entriesArray)
  }, [notes])

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
      {entries.map((entry, index) => {
        const verse = getAllVerses().find((v) => v.chapter === entry.chapterId && v.verse === entry.verseId)

        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <Link
                    href={`/chapters/${entry.chapterId}/verses/${entry.verseId}`}
                    className="font-medium hover:underline"
                  >
                    Chapter {entry.chapterId}.{entry.verseId}
                    {verse && ` - ${verse.title}`}
                  </Link>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(entry.timestamp), { addSuffix: true })}
                  </span>
                </div>
                <p className="text-sm line-clamp-3">{entry.content}</p>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
