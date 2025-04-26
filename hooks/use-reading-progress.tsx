"use client"

import { useState, useEffect } from "react"
import { useLocalStorage } from "./use-local-storage"

// Define types for reading progress
interface LastReadVerse {
  chapterId: number
  verseId: number
  timestamp: string
}

interface ReadingProgress {
  chaptersProgress: Record<number, number> // chapter -> furthest verse read
  totalVerses: Record<number, number> // chapter -> total verses
  completionPercentage: number
  streak: {
    current: number
    lastReadDate: string
  }
  timeSpent: number // time in seconds
}

export function useReadingProgress() {
  // Initialize from localStorage
  const [lastReadVerse, setLastReadVerse] = useLocalStorage<LastReadVerse>(
    "gita-last-read-verse",
    {
      chapterId: 1,
      verseId: 1,
      timestamp: new Date().toISOString(),
    }
  )

  const [readingProgress, setReadingProgress] = useLocalStorage<ReadingProgress>(
    "gita-reading-progress",
    {
      chaptersProgress: {},
      totalVerses: {},
      completionPercentage: 0,
      streak: {
        current: 0,
        lastReadDate: new Date().toISOString().split("T")[0], // Just the date part
      },
      timeSpent: 0,
    }
  )

  // Start timing the reading session
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null)

  useEffect(() => {
    // Start the timer when the hook is first used
    setSessionStartTime(new Date())
    
    // Update streak on component mount
    updateStreak()
    
    // Save time spent when the user leaves/refreshes
    const saveTimeSpent = () => {
      if (sessionStartTime) {
        const sessionTime = Math.floor((new Date().getTime() - sessionStartTime.getTime()) / 1000)
        setReadingProgress(prev => ({
          ...prev,
          timeSpent: prev.timeSpent + sessionTime
        }))
      }
    }
    
    window.addEventListener('beforeunload', saveTimeSpent)
    
    return () => {
      window.removeEventListener('beforeunload', saveTimeSpent)
      saveTimeSpent() // Save time when component unmounts too
    }
  }, [])

  // Update the streak based on reading dates
  const updateStreak = () => {
    const today = new Date().toISOString().split("T")[0]
    const lastDate = readingProgress.streak.lastReadDate

    if (lastDate === today) {
      // Already read today, do nothing
      return
    }

    // Calculate if the streak continues or resets
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)
    const yesterdayStr = yesterday.toISOString().split("T")[0]

    setReadingProgress(prev => ({
      ...prev,
      streak: {
        current: lastDate === yesterdayStr ? prev.streak.current + 1 : 1,
        lastReadDate: today
      }
    }))
  }

  // Save verse as read and update progress
  const markVerseAsRead = (
    chapterId: number, 
    verseId: number, 
    totalVersesInChapter: number,
    totalChapters: number = 18, // Bhagavad Gita has 18 chapters
    totalVersesMap?: Record<number, number>
  ) => {
    // Update last read verse
    const timestamp = new Date().toISOString()
    setLastReadVerse({
      chapterId,
      verseId,
      timestamp,
    })

    // Update chapter progress if this is the furthest verse read
    const currentProgress = readingProgress.chaptersProgress[chapterId] || 0
    const newChapterProgress = { ...readingProgress.chaptersProgress }
    
    if (verseId > currentProgress) {
      newChapterProgress[chapterId] = verseId
    }

    // Update total verses counts if provided
    const newTotalVerses = { ...readingProgress.totalVerses }
    if (totalVersesInChapter) {
      newTotalVerses[chapterId] = totalVersesInChapter
    }
    if (totalVersesMap) {
      Object.entries(totalVersesMap).forEach(([chapter, verses]) => {
        newTotalVerses[Number(chapter)] = verses
      })
    }

    // Calculate overall completion percentage
    let completedVerses = 0
    let totalVerses = 0
    
    for (let chapter = 1; chapter <= totalChapters; chapter++) {
      const versesRead = newChapterProgress[chapter] || 0
      const versesInChapter = newTotalVerses[chapter] || 0
      
      if (versesInChapter > 0) {
        completedVerses += Math.min(versesRead, versesInChapter)
        totalVerses += versesInChapter
      }
    }
    
    const completionPercentage = totalVerses > 0 
      ? Math.floor((completedVerses / totalVerses) * 100) 
      : readingProgress.completionPercentage

    // Update streak
    updateStreak()

    setReadingProgress(prev => ({
      ...prev,
      chaptersProgress: newChapterProgress,
      totalVerses: newTotalVerses,
      completionPercentage,
    }))
  }

  // Get furthest read verse for a chapter
  const getFurthestReadVerse = (chapterId: number): number => {
    return readingProgress.chaptersProgress[chapterId] || 0
  }

  // Check if a verse has been read
  const isVerseRead = (chapterId: number, verseId: number): boolean => {
    const furthestVerse = readingProgress.chaptersProgress[chapterId] || 0
    return verseId <= furthestVerse
  }

  // Get formatted reading stats
  const getReadingStats = () => {
    const totalChapters = Object.keys(readingProgress.totalVerses).length
    const completedChapters = Object.keys(readingProgress.chaptersProgress)
      .filter(chapter => {
        const chapterId = Number(chapter)
        const read = readingProgress.chaptersProgress[chapterId] || 0
        const total = readingProgress.totalVerses[chapterId] || 0
        return total > 0 && read >= total
      }).length

    // Format time spent
    const timeSpent = readingProgress.timeSpent
    const hours = Math.floor(timeSpent / 3600)
    const minutes = Math.floor((timeSpent % 3600) / 60)
    
    return {
      completionPercentage: readingProgress.completionPercentage,
      completedChapters,
      totalChapters,
      currentStreak: readingProgress.streak.current,
      timeSpent: hours > 0 
        ? `${hours}h ${minutes}m` 
        : `${minutes}m`,
      lastReadVerse
    }
  }

  // Get suggested verse to continue reading
  const getSuggestedContinuation = () => {
    if (!lastReadVerse) return { chapterId: 1, verseId: 1 }

    const { chapterId, verseId } = lastReadVerse
    const totalInChapter = readingProgress.totalVerses[chapterId]
    
    // If we've reached the end of the chapter
    if (totalInChapter && verseId >= totalInChapter) {
      // Suggest the first verse of the next chapter
      if (chapterId < 18) {
        return { chapterId: chapterId + 1, verseId: 1 }
      }
      // If we're at the end of the Gita, suggest the first chapter
      return { chapterId: 1, verseId: 1 }
    }
    
    // Otherwise continue with the next verse
    return { chapterId, verseId: verseId + 1 }
  }

  return {
    lastReadVerse,
    readingProgress,
    markVerseAsRead,
    getFurthestReadVerse,
    isVerseRead,
    getReadingStats,
    getSuggestedContinuation
  }
}