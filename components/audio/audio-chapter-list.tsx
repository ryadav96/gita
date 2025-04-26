"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Lock } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { getAllChapters } from "@/lib/data"
import Link from "next/link"

export function AudioChapterList() {
  const { isPremium } = useApp()
  const chapters = getAllChapters()

  return (
    <div className="space-y-4 mt-4">
      {chapters.map((chapter) => (
        <Card key={chapter.chapter_number}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">
                  Chapter {chapter.chapter_number}: {chapter.name_translated}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {chapter.verse_count} verses • {Math.ceil(chapter.verse_count * 0.5)} min
                </p>
              </div>

              <div className="flex space-x-2">
                <Link href={`/audio/chapters/${chapter.chapter_number}`}>
                  <Button variant="outline" size="icon">
                    <Play className="h-4 w-4" />
                  </Button>
                </Link>

                <Button variant="outline" size="icon" disabled={!isPremium && chapter.chapter_number > 6}>
                  {!isPremium && chapter.chapter_number > 6 ? (
                    <Lock className="h-4 w-4" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
