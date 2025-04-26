"use client"

import type React from "react"
import { createContext, useContext, useEffect } from "react"
import { useLocalStorage } from "@/hooks/use-local-storage"

type AppContextType = {
  lastReadVerse: { chapterId: number; verseId: number } | null
  setLastReadVerse: (chapterId: number, verseId: number) => void
  bookmarks: { chapterId: number; verseId: number }[]
  toggleBookmark: (chapterId: number, verseId: number) => void
  isBookmarked: (chapterId: number, verseId: number) => boolean
  notes: Record<string, string>
  saveNote: (chapterId: number, verseId: number, content: string) => void
  getNote: (chapterId: number, verseId: number) => string
  selectedMood: string
  setSelectedMood: (mood: string) => void
  isPremium: boolean
  togglePremium: () => void
  readingProgress: Record<number, number[]>
  markAsRead: (chapterId: number, verseId: number) => void
  getChapterProgress: (chapterId: number) => number
  streak: number
  incrementStreak: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [lastReadVerse, setLastReadVerseState] = useLocalStorage<{ chapterId: number; verseId: number } | null>(
    "lastReadVerse",
    null,
  )
  const [bookmarks, setBookmarks] = useLocalStorage<{ chapterId: number; verseId: number }[]>("bookmarks", [])
  const [notes, setNotes] = useLocalStorage<Record<string, string>>("notes", {})
  const [selectedMood, setSelectedMoodState] = useLocalStorage<string>(
    "selectedMood",
    "🧘", // Default mood
  )
  const [isPremium, setIsPremium] = useLocalStorage<boolean>("isPremium", false)
  const [readingProgress, setReadingProgress] = useLocalStorage<Record<number, number[]>>("readingProgress", {})
  const [streak, setStreak] = useLocalStorage<number>("streak", 0)
  const [lastStreakDate, setLastStreakDate] = useLocalStorage<string | null>("lastStreakDate", null)

  // Check and update streak
  useEffect(() => {
    const today = new Date().toDateString()

    if (lastStreakDate !== today) {
      const yesterday = new Date()
      yesterday.setDate(yesterday.getDate() - 1)
      const yesterdayString = yesterday.toDateString()

      if (lastStreakDate === yesterdayString) {
        // Streak continues
        setLastStreakDate(today)
      } else if (lastStreakDate && lastStreakDate !== today) {
        // Streak broken
        setStreak(1)
        setLastStreakDate(today)
      }
    }
    // Only run when lastStreakDate changes, not on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastStreakDate])

  const setLastReadVerse = (chapterId: number, verseId: number) => {
    setLastReadVerseState({ chapterId, verseId })
  }

  const toggleBookmark = (chapterId: number, verseId: number) => {
    const bookmarkIndex = bookmarks.findIndex((b) => b.chapterId === chapterId && b.verseId === verseId)

    if (bookmarkIndex >= 0) {
      setBookmarks(bookmarks.filter((_, i) => i !== bookmarkIndex))
    } else {
      setBookmarks([...bookmarks, { chapterId, verseId }])
    }
  }

  const isBookmarked = (chapterId: number, verseId: number) => {
    return bookmarks.some((b) => b.chapterId === chapterId && b.verseId === verseId)
  }

  const saveNote = (chapterId: number, verseId: number, content: string) => {
    const key = `${chapterId}_${verseId}`
    setNotes({ ...notes, [key]: content })
  }

  const getNote = (chapterId: number, verseId: number) => {
    const key = `${chapterId}_${verseId}`
    return notes[key] || ""
  }

  const setSelectedMood = (mood: string) => {
    setSelectedMoodState(mood)
  }

  const togglePremium = () => {
    setIsPremium(!isPremium)
  }

  const markAsRead = (chapterId: number, verseId: number) => {
    const chapterVerses = readingProgress[chapterId] || []

    if (!chapterVerses.includes(verseId)) {
      const updatedChapterVerses = [...chapterVerses, verseId]
      setReadingProgress({
        ...readingProgress,
        [chapterId]: updatedChapterVerses,
      })

      // Update last read verse
      setLastReadVerse(chapterId, verseId)

      // Update streak if needed
      incrementStreak()
    }
  }

  const getChapterProgress = (chapterId: number) => {
    const chapterVerses = readingProgress[chapterId] || []
    // Assuming we know the total verses per chapter
    // This is a placeholder - in a real app, you'd get this from your data
    const totalVerses = chapterId === 1 ? 47 : chapterId === 2 ? 72 : chapterId === 3 ? 43 : 30 // Simplified

    return chapterVerses.length / totalVerses
  }

  const incrementStreak = () => {
    const today = new Date().toDateString()

    if (lastStreakDate !== today) {
      setStreak(streak + 1)
      setLastStreakDate(today)
    }
  }

  const value = {
    lastReadVerse,
    setLastReadVerse,
    bookmarks,
    toggleBookmark,
    isBookmarked,
    notes,
    saveNote,
    getNote,
    selectedMood,
    setSelectedMood,
    isPremium,
    togglePremium,
    readingProgress,
    markAsRead,
    getChapterProgress,
    streak,
    incrementStreak,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
