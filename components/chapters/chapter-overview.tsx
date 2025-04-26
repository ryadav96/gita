import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Chapter } from "@/types"

interface ChapterOverviewProps {
  chapter: Chapter
}

export function ChapterOverview({ chapter }: ChapterOverviewProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{chapter.name_translated}</h2>
            <p className="text-muted-foreground">{chapter.name_sanskrit}</p>
          </div>

          <Tabs defaultValue="english">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="hindi">Hindi</TabsTrigger>
            </TabsList>
            <TabsContent value="english" className="mt-4">
              <p>{chapter.summary}</p>
            </TabsContent>
            <TabsContent value="hindi" className="mt-4">
              <p>{chapter.summary_hindi || "Hindi translation not available"}</p>
            </TabsContent>
          </Tabs>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{chapter.verse_count} verses</span>
            <span>~{Math.ceil(chapter.verse_count * 1.5)} min read</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
