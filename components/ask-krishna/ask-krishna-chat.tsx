import type React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AskKrishnaChatProps {
  children: React.ReactNode
}

export function AskKrishnaChat({ children }: AskKrishnaChatProps) {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4 pb-4">{children}</div>
    </ScrollArea>
  )
}
