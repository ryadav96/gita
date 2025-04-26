"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useAskKrishna } from "@/hooks/use-ask-krishna"
import { AskKrishnaInput } from "@/components/ask-krishna/ask-krishna-input"
import { AskKrishnaMessage } from "@/components/ask-krishna/ask-krishna-message"
import { Crown, X, Sparkles, Lock } from "lucide-react"
import Link from "next/link"

interface AskKrishnaChatProps {
  onClose?: () => void
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  verses?: {
    id: string
    chapter: string
    verse: string
    text: string
  }[]
}

export function AskKrishnaChat({ onClose }: AskKrishnaChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Namaste 🙏 I am Krishna AI, your spiritual guide. What questions do you have about dharma, life's purpose, or the teachings of the Bhagavad Gita?"
    }
  ])
  
  const [isLoading, setIsLoading] = useState(false)
  const [showQuotaAlert, setShowQuotaAlert] = useState(false)
  const { toast } = useToast()
  const { getResponse, checkQuota, grantTemporaryAccess, quota, isPremium } = useAskKrishna()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content
    }
    
    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)
    
    try {
      // Check if user has remaining quota
      const hasQuota = await checkQuota()
      
      if (!hasQuota && !isPremium) {
        // Show quota exceeded message
        setShowQuotaAlert(true)
        setIsLoading(false)
        return
      }
      
      // Get AI response
      const response = await getResponse(content)
      
      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        verses: response.verses
      }
      
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  // Grant temporary premium access (24 hours)
  const handleGrantAccess = () => {
    grantTemporaryAccess()
    setShowQuotaAlert(false)
    toast({
      title: "Premium Access Granted!",
      description: "You now have 24 hours of premium access. Enjoy unlimited questions!",
      variant: "default"
    })
  }
  
  // Clear conversation history
  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Namaste 🙏 I am Krishna AI, your spiritual guide. What questions do you have about dharma, life's purpose, or the teachings of the Bhagavad Gita?"
      }
    ])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h2 className="font-medium text-lg">Ask Krishna</h2>
        </div>
        <div className="flex items-center gap-2">
          {isPremium && (
            <Crown className="h-5 w-5 text-yellow-500" />
          )}
          {!isPremium && quota !== null && (
            <span className="text-xs text-muted-foreground">
              {quota} questions left today
            </span>
          )}
          {onClose && (
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => (
          <AskKrishnaMessage key={message.id} message={message} />
        ))}
        
        {/* Quota alert */}
        {showQuotaAlert && (
          <Card className="p-4 border-primary/50 bg-primary/5 space-y-3">
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              <h3 className="font-medium">Daily limit reached</h3>
            </div>
            
            <p className="text-sm">
              You've reached your daily limit of free questions. 
              Upgrade to premium for unlimited spiritual guidance.
            </p>
            
            <div className="flex flex-col gap-2">
              <Button onClick={handleGrantAccess}>
                Try Premium Free for 24 Hours
              </Button>
              <Button variant="outline" asChild>
                <Link href="/settings?tab=premium">View Premium Plans</Link>
              </Button>
            </div>
          </Card>
        )}
        
        {isLoading && (
          <div className="flex items-center justify-center p-4">
            <div className="animate-pulse flex items-center gap-1">
              <div className="h-2 w-2 bg-primary rounded-full"></div>
              <div className="h-2 w-2 bg-primary rounded-full animation-delay-200"></div>
              <div className="h-2 w-2 bg-primary rounded-full animation-delay-400"></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Clear chat button */}
      {messages.length > 1 && !showQuotaAlert && (
        <div className="px-4 py-2 flex justify-center">
          <Button variant="ghost" size="sm" onClick={handleClearChat}>
            Clear Chat
          </Button>
        </div>
      )}
      
      {/* Input */}
      <div className="border-t p-4">
        <AskKrishnaInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading}
          disabled={showQuotaAlert}
        />
      </div>
    </div>
  )
}
