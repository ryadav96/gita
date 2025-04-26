"use client"

import { useState } from "react"
import { ChapterList } from "@/components/chapters/chapter-list"
import { ChapterGrid } from "@/components/chapters/chapter-grid"
import { Button } from "@/components/ui/button"
import { Grid2X2, List } from "lucide-react"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function ChaptersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  return (
    <main className="container px-4 pb-6">
      <div className="flex items-center justify-between py-4">
        <h1 className="text-2xl font-bold">Chapters</h1>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
          >
            <Grid2X2 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? <ChapterGrid /> : <ChapterList />}
      <AskKrishnaFab />
    </main>
  )
}
