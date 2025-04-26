"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/components/app-provider"
import Link from "next/link"
import { getAllChapters } from "@/lib/data"

export function ExploreByChapter() {
  const { getChapterProgress } = useApp()
  const chapters = getAllChapters()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Explore by Chapter</h2>
      <div className="grid grid-cols-3 gap-4">
        {chapters.map((chapter) => {
          const progress = getChapterProgress(chapter.chapter_number)

          return (
            <Link key={chapter.chapter_number} href={`/chapters/${chapter.chapter_number}`}>
              <Card className="h-full">
                <CardContent className="p-4 flex flex-col items-center justify-center">
                  <div className="relative w-12 h-12 flex items-center justify-center mb-2">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-muted-foreground/20"
                        strokeWidth="2"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        className="stroke-primary"
                        strokeWidth="2"
                        strokeDasharray={100}
                        strokeDashoffset={100 - progress * 100}
                        transform="rotate(-90 18 18)"
                      />
                    </svg>
                    <span className="absolute text-lg font-bold">{chapter.chapter_number}</span>
                  </div>
                  <p className="text-sm font-medium text-center">{chapter.name_translated}</p>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
