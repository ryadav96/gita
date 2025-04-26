"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Download, Lock } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { Badge } from "@/components/ui/badge"
import { getCuratedPlaylists } from "@/lib/data"

export function AudioCuratedSeries() {
  const { isPremium } = useApp()
  const playlists = getCuratedPlaylists()

  return (
    <div className="space-y-4 mt-4">
      {playlists.map((playlist) => (
        <Card key={playlist.id}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{playlist.title}</h3>
                  {playlist.premium && !isPremium && <Badge variant="outline">Premium</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">
                  {playlist.trackCount} tracks • {playlist.duration} min
                </p>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="icon" disabled={playlist.premium && !isPremium}>
                  {playlist.premium && !isPremium ? <Lock className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>

                <Button variant="outline" size="icon" disabled={playlist.premium && !isPremium}>
                  {playlist.premium && !isPremium ? <Lock className="h-4 w-4" /> : <Download className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
