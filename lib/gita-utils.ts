import fs from 'fs';
import path from 'path';

// Base path for Gita data
const gitaBasePath = path.join(process.cwd(), 'gita');

// Get list of all chapters
export async function getAllChapters() {
  const chaptersDir = path.join(gitaBasePath, 'chapter');
  const chapterFiles = fs.readdirSync(chaptersDir)
    .filter(file => file.startsWith('bhagavadgita_chapter_') && file.endsWith('.json'));
  
  const chapters = chapterFiles.map(file => {
    const fullPath = path.join(chaptersDir, file);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContents);
  });
  
  // Sort chapters by number
  return chapters.sort((a, b) => a.chapter_number - b.chapter_number);
}

// Get a specific chapter by number
export async function getChapterByNumber(chapterNumber: number) {
  const chaptersDir = path.join(gitaBasePath, 'chapter');
  const filePath = path.join(chaptersDir, `bhagavadgita_chapter_${chapterNumber}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading chapter ${chapterNumber}:`, error);
    return null;
  }
}

// Alias export for getChapter (pointing to getChapterByNumber) for backward compatibility
export const getChapter = getChapterByNumber;

// Get all verses from a chapter
export async function getVersesFromChapter(chapterNumber: number) {
  const slokDir = path.join(gitaBasePath, 'slok');
  
  try {
    // Read all files in the slok directory
    const files = fs.readdirSync(slokDir);
    
    // Filter files for the requested chapter
    const chapterVerseFiles = files.filter(file => 
      file.startsWith(`bhagavadgita_chapter_${chapterNumber}_slok_`) && 
      file.endsWith('.json')
    );
    
    const verses = chapterVerseFiles.map(file => {
      const fullPath = path.join(slokDir, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      return JSON.parse(fileContents);
    });
    
    // Sort verses by verse number
    return verses.sort((a, b) => a.verse - b.verse);
  } catch (error) {
    console.error(`Error reading verses for chapter ${chapterNumber}:`, error);
    return [];
  }
}

// Get a specific verse by chapter and verse number
export async function getVerse(chapterNumber: number, verseNumber: number) {
  const slokDir = path.join(gitaBasePath, 'slok');
  const filePath = path.join(slokDir, `bhagavadgita_chapter_${chapterNumber}_slok_${verseNumber}.json`);
  
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading verse ${chapterNumber}.${verseNumber}:`, error);
    return null;
  }
}