"use client"

import { useApp } from "@/components/app-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"
import { getVerseById, getChapterById } from "@/lib/data"

export function ContinueReading() {
  const { lastReadVerse, getChapterProgress } = useApp()

  if (!lastReadVerse) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Continue Reading</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You haven't started reading yet. Begin your journey by exploring chapters.
          </p>
          <div className="mt-4">
            <Link href="/chapters">
              <Button>Start Reading</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    )
  }

  const { chapterId, verseId } = lastReadVerse
  const verse = getVerseById(chapterId, verseId)
  const chapter = getChapterById(chapterId)
  const progress = getChapterProgress(chapterId) * 100

  if (!verse || !chapter) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Continue Reading</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium">
              Chapter {chapterId}.{verseId} - {chapter.name_translated}
            </h3>
            <p className="text-sm text-muted-foreground">{verse.title}</p>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-end">
            <Link href={`/chapters/${chapterId}/verses/${verseId}`}>
              <Button>Continue</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
