"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface KrishnaResponse {
  text: string
  verses?: {
    id: string
    chapter: string
    verse: string
    text: string
  }[]
}

// Sample verses for demonstration
const sampleVerses = [
  {
    id: "2-47",
    chapter: "2",
    verse: "47",
    text: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction."
  },
  {
    id: "2-48",
    chapter: "2",
    verse: "48",
    text: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga."
  },
  {
    id: "3-19",
    chapter: "3",
    verse: "19",
    text: "Therefore, without being attached to the fruits of activities, one should act as a matter of duty, for by working without attachment one attains the Supreme."
  },
  {
    id: "4-7",
    chapter: "4",
    verse: "7",
    text: "Whenever and wherever there is a decline in dharma and a predominant rise of adharma—at that time I manifest Myself."
  },
  {
    id: "4-8",
    chapter: "4",
    verse: "8",
    text: "To deliver the pious and to annihilate the miscreants, as well as to reestablish the principles of dharma, I Myself appear, millennium after millennium."
  },
  {
    id: "5-11",
    chapter: "5",
    verse: "11",
    text: "The yogis, abandoning attachment, act with body, mind, intelligence and even with the senses, only for the purpose of purification."
  },
  {
    id: "6-5",
    chapter: "6",
    verse: "5",
    text: "One must deliver himself with the help of his mind, and not degrade himself. The mind is the friend of the conditioned soul, and his enemy as well."
  },
  {
    id: "9-22",
    chapter: "9",
    verse: "22",
    text: "But those who always worship Me with exclusive devotion, meditating on My transcendental form—to them I carry what they lack, and I preserve what they have."
  },
  {
    id: "12-13",
    chapter: "12",
    verse: "13",
    text: "One who is not envious but is a kind friend to all living entities, who does not think oneself a proprietor and is free from false ego, who is equal in both happiness and distress, who is tolerant..."
  },
  {
    id: "18-66",
    chapter: "18",
    verse: "66",
    text: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear."
  }
]

// Predefined responses for common questions
const predefinedResponses: Record<string, KrishnaResponse> = {
  "what is karma yoga": {
    text: "Karma Yoga is the path of selfless action. It involves performing your duties without attachment to the results. When you act without selfish motives, your actions become a form of spiritual practice.\n\nKrishna explains in the Bhagavad Gita that by working without being attached to the fruits of your labor, you can achieve liberation. The key is to dedicate your actions to a higher purpose rather than personal gain.",
    verses: [sampleVerses[0], sampleVerses[1], sampleVerses[2]]
  },
  "how to find purpose": {
    text: "Finding your purpose, according to Krishna's teachings, involves understanding your own nature (svadharma) and using your natural talents and inclinations to serve others.\n\nKrishna explains that it's better to perform your own duty imperfectly than to perform another's duty perfectly. By aligning your actions with your true nature while maintaining spiritual awareness, you'll discover your deeper purpose.",
    verses: [sampleVerses[0], sampleVerses[5]]
  },
  "dealing with fear": {
    text: "Krishna teaches that fear arises from attachment and identifying with the temporary body rather than your eternal soul (atman).\n\nTo overcome fear, Krishna advises developing equanimity through spiritual knowledge, understanding your true immortal nature, and surrendering to divine will. When you realize that your essential self is eternal and cannot be destroyed, fear begins to dissolve.",
    verses: [sampleVerses[9], sampleVerses[6]]
  },
  "what is dharma": {
    text: "Dharma refers to one's righteous duty, the moral order that sustains the cosmos, society, and the individual. It's often translated as 'righteousness' or 'natural law.'\n\nIn the Bhagavad Gita, Krishna explains that dharma varies according to one's nature, station in life, and capabilities. Following your dharma while maintaining spiritual awareness leads to harmony and spiritual progress.",
    verses: [sampleVerses[3], sampleVerses[4]]
  }
}

export function useAskKrishna() {
  const FREE_DAILY_LIMIT = 3
  const { toast } = useToast()
  const [quota, setQuota] = useState<number | null>(null)
  const [isPremium, setIsPremium] = useState(false)
  
  // Check premium status and quota on mount
  useEffect(() => {
    checkPremiumStatus()
    checkRemainingQuota()
  }, [])
  
  // Check if user is premium
  const checkPremiumStatus = () => {
    const storedPremium = localStorage.getItem("isPremiumUser")
    const tempAccess = localStorage.getItem("temporaryPremiumAccess")
    
    // User is premium if they've paid OR have temporary access that hasn't expired
    const hasPremium = storedPremium === "true"
    const hasTempAccess = tempAccess && new Date(tempAccess) > new Date()
    
    setIsPremium(hasPremium || hasTempAccess)
    return hasPremium || hasTempAccess
  }
  
  // Check remaining daily quota
  const checkRemainingQuota = () => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem("askKrishnaQuotaDate")
    const storedCount = localStorage.getItem("askKrishnaCount")
    
    if (storedDate !== today) {
      // Reset quota for new day
      localStorage.setItem("askKrishnaQuotaDate", today)
      localStorage.setItem("askKrishnaCount", "0")
      setQuota(FREE_DAILY_LIMIT)
      return FREE_DAILY_LIMIT
    } else {
      const usedCount = storedCount ? parseInt(storedCount) : 0
      const remainingQuota = Math.max(0, FREE_DAILY_LIMIT - usedCount)
      setQuota(remainingQuota)
      return remainingQuota
    }
  }
  
  // Check if user has quota remaining
  const checkQuota = async (): Promise<boolean> => {
    const hasPremium = checkPremiumStatus()
    if (hasPremium) return true
    
    const remainingQuota = checkRemainingQuota()
    return remainingQuota > 0
  }
  
  // Update quota after a question is asked
  const updateQuota = () => {
    if (isPremium) return
    
    const today = new Date().toDateString()
    const storedCount = localStorage.getItem("askKrishnaCount")
    const usedCount = storedCount ? parseInt(storedCount) : 0
    
    const newCount = usedCount + 1
    localStorage.setItem("askKrishnaQuotaDate", today)
    localStorage.setItem("askKrishnaCount", newCount.toString())
    
    const remainingQuota = Math.max(0, FREE_DAILY_LIMIT - newCount)
    setQuota(remainingQuota)
    
    if (remainingQuota === 0) {
      toast({
        title: "Daily limit reached",
        description: "You've reached your free daily limit of questions."
      })
    } else if (remainingQuota === 1) {
      toast({
        title: "Almost at daily limit",
        description: "You have 1 question remaining today."
      })
    }
    
    return remainingQuota
  }
  
  // Grant temporary premium access
  const grantTemporaryAccess = () => {
    const tomorrow = new Date()
    tomorrow.setHours(tomorrow.getHours() + 24)
    localStorage.setItem("temporaryPremiumAccess", tomorrow.toISOString())
    setIsPremium(true)
  }
  
  // Generate a response for a query
  const getResponse = async (query: string): Promise<KrishnaResponse> => {
    // Update quota first (for non-premium users)
    if (!isPremium) {
      updateQuota()
    }
    
    // For demo purposes, add a delay to simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Check for predefined response
    const queryLower = query.toLowerCase()
    
    // Look for matching predefined responses
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (queryLower.includes(key)) {
        return response
      }
    }
    
    // Generate a default response with random verses
    const randomVerses = []
    const usedIndexes = new Set()
    
    // Get 1-3 random verses
    const numVerses = Math.floor(Math.random() * 3) + 1
    
    for (let i = 0; i < numVerses; i++) {
      let index
      do {
        index = Math.floor(Math.random() * sampleVerses.length)
      } while (usedIndexes.has(index))
      
      usedIndexes.add(index)
      randomVerses.push(sampleVerses[index])
    }
    
    return {
      text: `Thank you for your question about "${query}". In the Bhagavad Gita, Lord Krishna offers wisdom that can guide us in all aspects of life. \n\nRemember that true wisdom comes from applying these teachings in your daily life, not just understanding them intellectually. Through sincere practice and self-reflection, you'll find deeper meaning in Krishna's words.`,
      verses: randomVerses
    }
  }
  
  // Return hook methods and state
  return {
    getResponse,
    checkQuota,
    grantTemporaryAccess,
    isPremium,
    quota
  }
}
