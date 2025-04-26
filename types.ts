// Define types for the app

export interface Chapter {
  chapter_number: number
  name: string
  name_transliterated: string
  name_translated: string
  verse_count: number
  summary: string
  summary_hindi?: string
}

export interface Verse {
  id: string
  chapter: number
  verse: number
  sanskrit: string
  transliteration: string
  translation: string
  translation_hindi?: string
  title: string
  commentaries: {
    wisdom: Commentary[]
    bhakti: Commentary[]
    life: Commentary[]
    work: Commentary[]
  }
}

export interface Commentary {
  author: string
  text: string
}

export interface Topic {
  id: string
  name: string
  emoji: string
}

export interface Commentator {
  id: string
  name: string
}

export interface Playlist {
  id: string
  title: string
  description: string
  trackCount: number
  duration: number
  premium: boolean
}
