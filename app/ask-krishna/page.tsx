"use client"

import { useRef, useEffect } from "react"
import { AskKrishnaChat } from "@/components/ask-krishna/ask-krishna-chat"
import { AskKrishnaInput } from "@/components/ask-krishna/ask-krishna-input"
import { AskKrishnaMessage } from "@/components/ask-krishna/ask-krishna-message"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useAskKrishna } from "@/hooks/use-ask-krishna"

export default function AskKrishnaPage() {
  const { messages, isLoading, sendMessage } = useAskKrishna()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      sendMessage(message)
    }
  }

  return (
    <main className="container flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center py-4 px-4">
        <Link href="/">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-2">Ask Krishna</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <AskKrishnaChat>
          {messages.map((msg, index) => (
            <AskKrishnaMessage
              key={index}
              message={msg.content}
              isUser={msg.role === "user"}
              timestamp={msg.timestamp}
            />
          ))}
          <div ref={messagesEndRef} />
        </AskKrishnaChat>
      </div>

      <div className="p-4 border-t">
        <AskKrishnaInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </main>
  )
}
