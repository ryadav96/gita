import { NextResponse } from 'next/server';
import { getVerse } from '@/lib/gita-utils';

export async function GET(
  request: Request,
  { params }: { params: { chapterNumber: string; verseNumber: string } }
) {
  try {
    const chapterNumber = parseInt(params.chapterNumber, 10);
    const verseNumber = parseInt(params.verseNumber, 10);
    
    if (isNaN(chapterNumber) || isNaN(verseNumber)) {
      return NextResponse.json({ error: 'Invalid chapter or verse number' }, { status: 400 });
    }
    
    const verse = await getVerse(chapterNumber, verseNumber);
    
    if (!verse) {
      return NextResponse.json({ error: 'Verse not found' }, { status: 404 });
    }
    
    return NextResponse.json(verse);
  } catch (error) {
    console.error(`Error fetching verse ${params.chapterNumber}.${params.verseNumber}:`, error);
    return NextResponse.json({ error: 'Failed to fetch verse' }, { status: 500 });
  }
}