import Link from 'next/link';
import { getAllChapters } from '@/lib/gita-utils'; 

async function getChaptersData() {
  const chapters = await getAllChapters();
  return chapters;
}

export default async function ChaptersPage() {
  const chapters = await getChaptersData();

  return (
    <div>
      <h1 className="text-2xl font-bold p-4">Bhagavad Gita Chapters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {chapters.map((chapter) => (
          <Link key={chapter.chapter_number} href={`/chapters/${chapter.chapter_number}`} passHref>
            <div className="block p-6 border rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 cursor-pointer">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                Chapter {chapter.chapter_number}: {chapter.name}
              </h2>
              <h3 className="text-md font-semibold text-gray-700 dark:text-gray-400 mb-2">
                {chapter.translation}
              </h3>
              <p className="font-normal text-sm text-gray-700 dark:text-gray-400">
                {chapter.summary.en.substring(0, 120)}... {/* Show a snippet */}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
