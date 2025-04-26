import { notFound } from "next/navigation"
import { getChapter, getVerse } from "@/lib/gita-utils"
import { VerseDisplay } from "@/components/verses/verse-display"

interface VersePageProps {
  params: {
    chapterId: string
    verseId: string
  }
}

export default async function VersePage({ params }: VersePageProps) {
  const { chapterId, verseId } = params
  
  // Validate chapter ID and verse ID are numbers
  const chapterNum = parseInt(chapterId, 10)
  const verseNum = parseInt(verseId, 10)
  
  if (isNaN(chapterNum) || isNaN(verseNum)) {
    return notFound()
  }
  
  // Get chapter and verse data
  const verse = await getVerse(chapterNum, verseNum)
  const chapter = await getChapter(chapterNum)
  
  if (!verse || !chapter) {
    return notFound()
  }
  
  return (
    <main className="container max-w-3xl mx-auto px-4 pb-24">
      <VerseDisplay verse={verse} chapterId={chapterId} verseId={verseId} />
    </main>
  )
}
