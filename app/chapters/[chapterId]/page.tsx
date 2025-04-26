import { ChapterOverview } from "@/components/chapters/chapter-overview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, BookOpen, Play } from "lucide-react"
import Link from "next/link"
import { getChapterById } from "@/lib/data"
import { notFound } from "next/navigation"

export default function ChapterPage({
  params,
}: {
  params: { chapterId: string }
}) {
  const chapterId = Number.parseInt(params.chapterId)

  if (isNaN(chapterId) || chapterId < 1 || chapterId > 18) {
    notFound()
  }

  const chapter = getChapterById(chapterId)

  if (!chapter) {
    notFound()
  }

  return (
    <main className="container px-4 pb-6">
      <div className="flex items-center py-4">
        <Link href="/chapters">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Chapter {chapterId}</h1>
      </div>

      <ChapterOverview chapter={chapter} />

      <div className="flex space-x-4 mt-6">
        <Link href={`/chapters/${chapterId}/verses/1`} className="flex-1">
          <Button className="w-full">
            <BookOpen className="mr-2 h-4 w-4" />
            Start Reading
          </Button>
        </Link>
        <Link href={`/audio/chapters/${chapterId}`} className="flex-1">
          <Button variant="outline" className="w-full">
            <Play className="mr-2 h-4 w-4" />
            Play Audio
          </Button>
        </Link>
      </div>
    </main>
  )
}
