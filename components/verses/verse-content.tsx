"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Verse } from "@/types"

interface VerseContentProps {
  verse: Verse
}

export function VerseContent({ verse }: VerseContentProps) {
  const [showTransliteration, setShowTransliteration] = useState(true)

  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              {verse.chapter}.{verse.verse}
            </h2>
            <p className="text-muted-foreground">{verse.title}</p>
          </div>

          <div className="text-center font-sanskrit text-xl leading-relaxed">{verse.sanskrit}</div>

          <div className="flex items-center space-x-2 justify-end">
            <Switch id="transliteration" checked={showTransliteration} onCheckedChange={setShowTransliteration} />
            <Label htmlFor="transliteration">Transliteration</Label>
          </div>

          {showTransliteration && (
            <div className="text-center italic text-muted-foreground">{verse.transliteration}</div>
          )}

          <Tabs defaultValue="english">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="english">English</TabsTrigger>
              <TabsTrigger value="hindi">Hindi</TabsTrigger>
            </TabsList>
            <TabsContent value="english" className="mt-4">
              <p>{verse.translation}</p>
            </TabsContent>
            <TabsContent value="hindi" className="mt-4">
              <p>{verse.translation_hindi || "Hindi translation not available"}</p>
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
