import { NextResponse } from 'next/server';
import { getVersesFromChapter } from '@/lib/gita-utils';

export async function GET(
  request: Request,
  context: { params: { chapterNumber: string } }
) {
  try {
    // Properly destructure params from the awaited context
    const { chapterNumber: chapterNumberStr } = context.params;
    
    const chapterNumber = parseInt(chapterNumberStr, 10);
    
    if (isNaN(chapterNumber)) {
      return NextResponse.json({ error: 'Invalid chapter number' }, { status: 400 });
    }
    
    const verses = await getVersesFromChapter(chapterNumber);
    
    return NextResponse.json(verses);
  } catch (error) {
    console.error(`Error fetching verses for chapter ${context.params.chapterNumber}:`, error);
    return NextResponse.json({ error: 'Failed to fetch verses' }, { status: 500 });
  }
}