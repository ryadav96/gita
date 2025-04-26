"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AskKrishnaChat } from "@/components/ask-krishna/ask-krishna-chat"
import { MessageSquare, Sparkles } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AskKrishnaFab() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const pathname = usePathname()
  
  // Don't show FAB on Ask Krishna page or during onboarding
  if (pathname.includes("/ask-krishna") || pathname.includes("/onboarding")) {
    return null
  }

  return (
    <>
      {/* Small screen: fixed button in corner */}
      <div className="md:hidden fixed bottom-20 right-4 z-50">
        <Button
          variant="default"
          size="icon"
          className="h-12 w-12 rounded-full shadow-lg bg-primary text-primary-foreground"
          onClick={() => setIsDialogOpen(true)}
        >
          <Sparkles className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Medium+ screens: normal button with text */}
      <div className="hidden md:block fixed bottom-8 right-8 z-50">
        <Button
          variant="default"
          className="shadow-lg px-4 py-2 gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Ask Krishna</span>
        </Button>
      </div>
      
      {/* Chat dialog for quick access */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] h-[80vh] p-0">
          <div className="flex flex-col h-full">
            <AskKrishnaChat onClose={() => setIsDialogOpen(false)} />
            
            {/* Footer with link to full page */}
            <div className="p-3 text-center border-t text-sm text-muted-foreground">
              <Button variant="link" asChild>
                <Link href="/ask-krishna">
                  Open full Ask Krishna experience
                </Link>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
