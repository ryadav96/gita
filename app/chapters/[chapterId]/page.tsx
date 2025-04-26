import { ChapterOverview } from "@/components/chapters/chapter-overview"

interface ChapterPageProps {
  params: {
    chapterId: string
  }
}

export default function ChapterPage({ params }: ChapterPageProps) {
  return (
    <main className="container px-4 pb-20">
      <ChapterOverview chapterId={params.chapterId} />
    </main>
  )
}
