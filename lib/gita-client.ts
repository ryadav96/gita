// Client-side utility for fetching Gita data

// Types for Gita data
export interface Chapter {
  chapter_number: number;
  verses_count: number;
  name: string;
  translation: string;
  transliteration: string;
  meaning: {
    en: string;
    hi: string;
  };
  summary: {
    en: string;
    hi: string;
  };
}

export interface CommentarySource {
  author: string;
  et?: string; // English translation
  ht?: string; // Hindi translation
  sc?: string; // Sanskrit commentary
  hc?: string; // Hindi commentary
  ec?: string; // English commentary
}

export interface Verse {
  _id: string;
  chapter: number;
  verse: number;
  slok: string;
  transliteration: string;
  tej: CommentarySource;
  siva: CommentarySource;
  purohit: CommentarySource;
  chinmay: CommentarySource;
  san: CommentarySource;
  adi: CommentarySource;
  gambir: CommentarySource;
  madhav: CommentarySource;
  anand: CommentarySource;
  rams: CommentarySource;
  raman: CommentarySource;
  abhinav: CommentarySource;
  sankar: CommentarySource;
  jaya: CommentarySource;
  vallabh: CommentarySource;
  ms: CommentarySource;
  srid: CommentarySource;
  dhan: CommentarySource;
  venkat: CommentarySource;
  puru: CommentarySource;
  neel: CommentarySource;
  prabhu: CommentarySource;
}

// Fetch all chapters
export async function fetchChapters(): Promise<Chapter[]> {
  try {
    const response = await fetch('/api/chapters');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return [];
  }
}

// Fetch a specific chapter
export async function fetchChapter(chapterNumber: number): Promise<Chapter | null> {
  try {
    const response = await fetch(`/api/chapters/${chapterNumber}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching chapter ${chapterNumber}:`, error);
    return null;
  }
}

// Fetch all verses from a chapter
export async function fetchVersesFromChapter(chapterNumber: number): Promise<Verse[]> {
  try {
    const response = await fetch(`/api/chapters/${chapterNumber}/verses`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterNumber}:`, error);
    return [];
  }
}

// Fetch a specific verse
export async function fetchVerse(chapterNumber: number, verseNumber: number): Promise<Verse | null> {
  try {
    const response = await fetch(`/api/chapters/${chapterNumber}/verses/${verseNumber}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching verse ${chapterNumber}.${verseNumber}:`, error);
    return null;
  }
}