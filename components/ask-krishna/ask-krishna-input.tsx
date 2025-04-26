"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Sparkles } from "lucide-react"

interface AskKrishnaInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  disabled?: boolean
  placeholder?: string
}

export function AskKrishnaInput({ 
  onSendMessage, 
  isLoading, 
  disabled = false,
  placeholder = "Ask Krishna about the wisdom of the Bhagavad Gita..."
}: AskKrishnaInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  
  // Focus textarea when component mounts
  useEffect(() => {
    if (textareaRef.current && !disabled) {
      textareaRef.current.focus()
    }
  }, [disabled])

  // Handle sending message
  const handleSendMessage = () => {
    const trimmedMessage = message.trim()
    if (trimmedMessage && !isLoading && !disabled) {
      onSendMessage(trimmedMessage)
      setMessage("")
    }
  }
  
  // Handle key press (ctrl+enter or command+enter to send)
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      handleSendMessage()
    }
  }
  
  // Auto-resize textarea based on content
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    if (textareaRef.current) {
      // Reset height to auto to calculate the new height based on content
      textareaRef.current.style.height = 'auto'
      // Set new height based on scrollHeight (with a max)
      const newHeight = Math.min(textareaRef.current.scrollHeight, 150)
      textareaRef.current.style.height = `${newHeight}px`
    }
  }
  
  // Example questions to show as suggestions
  const exampleQuestions = [
    "What does Krishna say about purpose in life?",
    "How to deal with difficult emotions?",
    "Explain karma yoga in simple terms",
    "How to overcome attachment to results?",
    "What is the meaning of dharma?"
  ]
  
  // Handle clicking on an example question
  const handleExampleClick = (question: string) => {
    setMessage(question)
    if (textareaRef.current) {
      textareaRef.current.focus()
      // Adjust height for the new content
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`
    }
  }

  return (
    <div className="space-y-3">
      {/* Show example questions if there's no message */}
      {message === "" && !isLoading && (
        <div className="flex flex-wrap gap-2">
          {exampleQuestions.map((question, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm" 
              className="text-xs flex items-center gap-1"
              onClick={() => handleExampleClick(question)}
              disabled={disabled}
            >
              <Sparkles className="h-3 w-3" />
              {question.length > 25 ? `${question.substring(0, 25)}...` : question}
            </Button>
          ))}
        </div>
      )}
      
      {/* Input area */}
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyPress}
          placeholder={placeholder}
          className="min-h-[60px] resize-none overflow-hidden py-3 pr-12"
          disabled={isLoading || disabled}
        />
        
        <Button
          size="icon"
          className="h-10 w-10 shrink-0 rounded-full"
          disabled={!message.trim() || isLoading || disabled}
          onClick={handleSendMessage}
        >
          <Send className="h-4 w-4" />
          <span className="sr-only">Send message</span>
        </Button>
      </div>
      
      {/* Input helpers */}
      <div className="flex items-center justify-between text-xs text-muted-foreground px-2">
        <div>
          Ctrl + Enter to send
        </div>
        <div>
          {message.length} / 500
        </div>
      </div>
    </div>
  )
}
