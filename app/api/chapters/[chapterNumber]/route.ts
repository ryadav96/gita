import { NextResponse } from 'next/server';
import { getChapterByNumber } from '@/lib/gita-utils';

export async function GET(
  request: Request,
  { params }: { params: { chapterNumber: string } }
) {
  try {
    const chapterNumber = parseInt(params.chapterNumber, 10);
    
    if (isNaN(chapterNumber)) {
      return NextResponse.json({ error: 'Invalid chapter number' }, { status: 400 });
    }
    
    const chapter = await getChapterByNumber(chapterNumber);
    
    if (!chapter) {
      return NextResponse.json({ error: 'Chapter not found' }, { status: 404 });
    }
    
    return NextResponse.json(chapter);
  } catch (error) {
    console.error(`Error fetching chapter ${params.chapterNumber}:`, error);
    return NextResponse.json({ error: 'Failed to fetch chapter' }, { status: 500 });
  }
}