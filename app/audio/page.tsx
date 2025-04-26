"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AudioChapterList } from "@/components/audio/audio-chapter-list"
import { AudioCuratedSeries } from "@/components/audio/audio-curated-series"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function AudioPage() {
  const [activeTab, setActiveTab] = useState("chapters")

  return (
    <main className="container px-4 pb-6">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Audio</h1>
      </div>

      <Tabs defaultValue="chapters" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chapters">Chapter Playlists</TabsTrigger>
          <TabsTrigger value="curated">Curated Series</TabsTrigger>
        </TabsList>
        <TabsContent value="chapters">
          <AudioChapterList />
        </TabsContent>
        <TabsContent value="curated">
          <AudioCuratedSeries />
        </TabsContent>
      </Tabs>

      <AskKrishnaFab />
    </main>
  )
}
