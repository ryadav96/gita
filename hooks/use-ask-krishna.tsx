"use client"

import { useState } from "react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function useAskKrishna() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Namaste! I am Krishna, your spiritual guide. How may I assist you on your journey today?",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async (message: string) => {
    // Add user message
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // Generate a response based on the message
      let response = ""

      if (message.toLowerCase().includes("duty") || message.toLowerCase().includes("dharma")) {
        response =
          "Your dharma or duty is that which aligns with your true nature and the cosmic order. As I said in the Gita, 'It is better to perform one's own duties imperfectly than to master the duties of another.'"
      } else if (message.toLowerCase().includes("purpose") || message.toLowerCase().includes("meaning")) {
        response =
          "The purpose of life is to realize your divine nature. You are not this body, but the eternal soul within. Through yoga, meditation, and selfless action, you can discover your true self."
      } else if (message.toLowerCase().includes("meditation") || message.toLowerCase().includes("focus")) {
        response =
          "Meditation is the path to self-realization. Fix your mind on me with unwavering concentration. As I taught Arjuna, 'For one who has conquered the mind, the mind is the best of friends; but for one who has failed to do so, the mind will remain the greatest enemy.'"
      } else if (message.toLowerCase().includes("fear") || message.toLowerCase().includes("afraid")) {
        response =
          "Fear arises from attachment to the temporary. Remember that you are eternal - never born and never dying. 'For the soul there is neither birth nor death at any time. He has not come into being, does not come into being, and will not come into being. He is unborn, eternal, ever-existing, and primeval.'"
      } else {
        response =
          "The answers you seek are within you. Look inward with a peaceful mind, and practice karma yoga - action without attachment to results. Remember that I am always with you, guiding your path when you open your heart to divine wisdom."
      }

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1500)
  }

  return {
    messages,
    isLoading,
    sendMessage,
  }
}
