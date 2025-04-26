import { VerseNavigation } from "@/components/verses/verse-navigation"
import { VerseContent } from "@/components/verses/verse-content"
import { VerseCommentary } from "@/components/verses/verse-commentary"
import { VerseActions } from "@/components/verses/verse-actions"
import { AudioPlayer } from "@/components/audio/audio-player"
import { getVerseById, getChapterById } from "@/lib/data"
import { notFound } from "next/navigation"

export default function VersePage({
  params,
}: {
  params: { chapterId: string; verseId: string }
}) {
  const chapterId = Number.parseInt(params.chapterId)
  const verseId = Number.parseInt(params.verseId)

  if (isNaN(chapterId) || isNaN(verseId) || chapterId < 1 || chapterId > 18) {
    notFound()
  }

  const chapter = getChapterById(chapterId)

  if (!chapter) {
    notFound()
  }

  const verse = getVerseById(chapterId, verseId)

  if (!verse) {
    notFound()
  }

  const totalVerses = chapter.verse_count
  const audioSrc = `/assets/gita/audio/sloka/${chapterId}_${verseId}.mp3`

  return (
    <main className="container px-4 pb-20">
      <VerseNavigation chapterId={chapterId} verseId={verseId} totalVerses={totalVerses} />

      <div className="space-y-6 mt-4">
        <VerseContent verse={verse} />
        <VerseCommentary verse={verse} />
        <VerseActions verse={verse} chapterId={chapterId} verseId={verseId} />
      </div>

      <div className="fixed bottom-16 left-0 right-0 bg-background border-t">
        <AudioPlayer src={audioSrc} verse={verse} />
      </div>
    </main>
  )
}
