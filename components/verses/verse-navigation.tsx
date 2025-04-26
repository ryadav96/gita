import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

interface VerseNavigationProps {
  chapterId: number
  verseId: number
  totalVerses: number
}

export function VerseNavigation({ chapterId, verseId, totalVerses }: VerseNavigationProps) {
  const hasPrevious = verseId > 1
  const hasNext = verseId < totalVerses

  const previousHref = hasPrevious ? `/chapters/${chapterId}/verses/${verseId - 1}` : ""

  const nextHref = hasNext ? `/chapters/${chapterId}/verses/${verseId + 1}` : ""

  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <Link href={`/chapters/${chapterId}`}>
          <Button variant="ghost" size="sm">
            Chapter {chapterId}
          </Button>
        </Link>
        <span className="mx-2 text-muted-foreground">/</span>
        <span className="text-sm font-medium">
          Verse {verseId} of {totalVerses}
        </span>
      </div>

      <div className="flex space-x-2">
        <Button variant="outline" size="icon" disabled={!hasPrevious} asChild={hasPrevious}>
          {hasPrevious ? (
            <Link href={previousHref}>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>

        <Button variant="outline" size="icon" disabled={!hasNext} asChild={hasNext}>
          {hasNext ? (
            <Link href={nextHref}>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}
