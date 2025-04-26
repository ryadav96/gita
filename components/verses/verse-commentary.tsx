"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Verse } from "@/types"
import { useApp } from "@/components/app-provider"

interface VerseCommentaryProps {
  verse: Verse
}

export function VerseCommentary({ verse }: VerseCommentaryProps) {
  const { isPremium } = useApp()

  const commentaries = [
    {
      id: "wisdom",
      icon: "🧠",
      label: "Wisdom",
      content: verse.commentary_wisdom,
      premium: false,
    },
    {
      id: "bhakti",
      icon: "📿",
      label: "Bhakti",
      content: verse.commentary_bhakti,
      premium: false,
    },
    {
      id: "life",
      icon: "💼",
      label: "Life",
      content: verse.commentary_life,
      premium: true,
    },
    {
      id: "work",
      icon: "🧑‍💼",
      label: "Work",
      content: verse.commentary_work,
      premium: true,
    },
  ]

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Commentaries</h3>

        <Tabs defaultValue="wisdom">
          <TabsList className="grid w-full grid-cols-4">
            {commentaries.map((commentary) => (
              <TabsTrigger key={commentary.id} value={commentary.id} disabled={commentary.premium && !isPremium}>
                <span className="mr-1">{commentary.icon}</span>
                <span>{commentary.label}</span>
                {commentary.premium && !isPremium && <span className="ml-1">🔒</span>}
              </TabsTrigger>
            ))}
          </TabsList>

          {commentaries.map((commentary) => (
            <TabsContent key={commentary.id} value={commentary.id} className="mt-4">
              {commentary.premium && !isPremium ? (
                <div className="text-center p-4">
                  <p className="mb-2">This commentary is available for premium users.</p>
                  <p className="text-sm text-muted-foreground">Upgrade to premium to access all commentaries.</p>
                </div>
              ) : (
                <div>
                  <p>{commentary.content}</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}
