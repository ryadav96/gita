"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useApp } from "@/components/app-provider"
import Link from "next/link"
import { getAllChapters } from "@/lib/data"
import { Chapter } from "@/types" // Import the updated Chapter type
import { useEffect, useState } from "react" // Import useEffect and useState

export function ChapterList() {
  const { getChapterProgress } = useApp()
  // Use state to hold chapters, fetch them client-side
  const [chapters, setChapters] = useState<Chapter[]>([])

  useEffect(() => {
    // Fetch chapters when the component mounts
    const fetchedChapters = getAllChapters()
    setChapters(fetchedChapters)
  }, []) // Empty dependency array ensures this runs only once

  return (
    <div className="space-y-4">
      {chapters.map((chapter) => {
        const progress = getChapterProgress(chapter.chapter_number)

        return (
          <Link key={chapter.chapter_number} href={`/chapters/${chapter.chapter_number}`}>
            <Card className="hover:bg-accent transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="relative w-12 h-12 flex items-center justify-center">
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
                  <div className="flex-1">
                    {/* Use the correct field names from the updated Chapter type */}
                    <h3 className="font-medium">{chapter.translation}</h3>
                    <div className="flex justify-between">
                      {/* Use the correct field name for verse count */}
                      <p className="text-sm text-muted-foreground">{chapter.verses_count} verses</p>
                      <p className="text-sm text-muted-foreground">{Math.round(progress * 100)}% complete</p>
                    </div>
                    {/* Use the correct field name for summary */}
                    <p className="mt-2 text-sm line-clamp-2">{chapter.summary.en}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        )
      })}
    </div>
  )
}
