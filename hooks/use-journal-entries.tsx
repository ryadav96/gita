import { useState, useEffect } from 'react';

export interface JournalEntry {
  id: string;
  chapterId: number;
  verseId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  mood?: 'inspired' | 'reflective' | 'peaceful' | 'questioning' | 'grateful' | 'other';
}

export function useJournalEntries() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  // Load entries from local storage on initial mount
  useEffect(() => {
    const storedEntries = localStorage.getItem('gita-journal-entries');
    if (storedEntries) {
      try {
        setEntries(JSON.parse(storedEntries));
      } catch (error) {
        console.error('Error parsing journal entries from local storage:', error);
        setEntries([]);
      }
    }
  }, []);

  // Save entries to local storage whenever they change
  useEffect(() => {
    if (entries.length > 0) {
      localStorage.setItem('gita-journal-entries', JSON.stringify(entries));
    }
  }, [entries]);

  // Add a new entry or update an existing one
  const saveEntry = (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    // Check if an entry for this verse already exists
    const entryId = `${entry.chapterId}_${entry.verseId}`;
    const existingEntryIndex = entries.findIndex(e => e.id === entryId);
    
    const now = new Date().toISOString();
    
    if (existingEntryIndex >= 0) {
      // Update existing entry
      const updatedEntries = [...entries];
      updatedEntries[existingEntryIndex] = {
        ...updatedEntries[existingEntryIndex],
        content: entry.content,
        updatedAt: now,
        tags: entry.tags,
        mood: entry.mood
      };
      setEntries(updatedEntries);
    } else {
      // Create new entry
      const newEntry: JournalEntry = {
        id: entryId,
        chapterId: entry.chapterId,
        verseId: entry.verseId,
        content: entry.content,
        createdAt: now,
        updatedAt: now,
        tags: entry.tags,
        mood: entry.mood
      };
      setEntries(prev => [...prev, newEntry]);
    }
  };

  // Get an entry by chapter and verse ID
  const getEntry = (chapterId: number, verseId: number): JournalEntry | undefined => {
    const entryId = `${chapterId}_${verseId}`;
    return entries.find(entry => entry.id === entryId);
  };

  // Delete an entry
  const deleteEntry = (chapterId: number, verseId: number) => {
    const entryId = `${chapterId}_${verseId}`;
    setEntries(prev => prev.filter(entry => entry.id !== entryId));
    
    // If entries array becomes empty after deletion, clear localStorage as well
    if (entries.length <= 1) {
      localStorage.removeItem('gita-journal-entries');
    }
  };

  // Check if an entry exists for a verse
  const hasEntry = (chapterId: number, verseId: number): boolean => {
    const entryId = `${chapterId}_${verseId}`;
    return entries.some(entry => entry.id === entryId);
  };

  return {
    entries,
    saveEntry,
    getEntry,
    deleteEntry,
    hasEntry
  };
}