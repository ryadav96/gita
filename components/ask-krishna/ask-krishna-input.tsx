"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Mic } from "lucide-react"
import { useApp } from "@/components/app-provider"

interface AskKrishnaInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
}

export function AskKrishnaInput({ onSendMessage, isLoading }: AskKrishnaInputProps) {
  const [message, setMessage] = useState("")
  const { isPremium } = useApp()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      setMessage("")
    }
  }

  const handleVoiceInput = () => {
    // In a real app, this would activate voice recognition
    alert("Voice input would be activated here")
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        placeholder="Ask Krishna a question..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
      />
      <Button type="button" variant="outline" size="icon" onClick={handleVoiceInput}>
        <Mic className="h-4 w-4" />
      </Button>
      <Button type="submit" disabled={!message.trim() || isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  )
}
