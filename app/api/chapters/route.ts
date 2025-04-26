import { NextResponse } from 'next/server';
import { getAllChapters } from '@/lib/gita-utils';

export async function GET(request: Request) {
  try {
    const chapters = await getAllChapters();
    return NextResponse.json(chapters);
  } catch (error) {
    console.error('Error fetching chapters:', error);
    return NextResponse.json({ error: 'Failed to fetch chapters' }, { status: 500 });
  }
}