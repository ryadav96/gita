"use client"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AskKrishnaFab() {
  const pathname = usePathname()

  // Don't show on the Ask Krishna page
  if (pathname === "/ask-krishna") {
    return null
  }

  return (
    <div className="fixed bottom-20 right-4">
      <Link href="/ask-krishna">
        <Button size="lg" className="rounded-full h-14 w-14 shadow-lg">
          <MessageCircle className="h-6 w-6" />
          <span className="sr-only">Ask Krishna</span>
        </Button>
      </Link>
    </div>
  )
}
