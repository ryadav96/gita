"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Download, Twitter, Facebook } from "lucide-react"
import type { Verse } from "@/types"
import { useToast } from "@/hooks/use-toast"

interface ShareDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  verse: Verse
}

export function ShareDialog({ open, onOpenChange, verse }: ShareDialogProps) {
  const [activeTab, setActiveTab] = useState("image")
  const { toast } = useToast()

  const handleCopyText = () => {
    const text = `Bhagavad Gita ${verse.chapter}.${verse.verse}\n\n${verse.sanskrit}\n\n${verse.translation}`
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "The verse has been copied to your clipboard.",
    })
  }

  const handleDownload = () => {
    // In a real app, this would generate and download an image
    toast({
      title: "Download started",
      description: "Your image is being downloaded.",
    })
  }

  const handleShare = (platform: string) => {
    // In a real app, this would open the sharing dialog
    toast({
      title: `Sharing on ${platform}`,
      description: "Opening sharing dialog...",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Verse</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="image" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="image">Share as Image</TabsTrigger>
            <TabsTrigger value="text">Share as Text</TabsTrigger>
          </TabsList>

          <TabsContent value="image" className="mt-4">
            <div className="bg-muted aspect-square flex items-center justify-center rounded-md">
              <div className="text-center p-4 max-w-xs">
                <p className="text-sm text-muted-foreground mb-2">
                  Bhagavad Gita {verse.chapter}.{verse.verse}
                </p>
                <p className="font-sanskrit mb-4">{verse.sanskrit}</p>
                <p className="text-sm">{verse.translation}</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="text" className="mt-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm text-muted-foreground mb-2">
                Bhagavad Gita {verse.chapter}.{verse.verse}
              </p>
              <p className="font-sanskrit mb-4">{verse.sanskrit}</p>
              <p className="text-sm">{verse.translation}</p>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between sm:justify-between">
          {activeTab === "image" ? (
            <>
              <Button variant="outline" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => handleShare("Twitter")}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => handleShare("Facebook")}>
                  <Facebook className="h-4 w-4" />
                </Button>
              </div>
            </>
          ) : (
            <Button onClick={handleCopyText}>
              <Copy className="mr-2 h-4 w-4" />
              Copy to Clipboard
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
