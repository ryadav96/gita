import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getAllTopics } from "@/lib/data"

export function ExploreByTopic() {
  const topics = getAllTopics()

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Explore by Topic</h2>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-1">
          {topics.map((topic) => (
            <Link key={topic.id} href={`/topics/${topic.id}`}>
              <Button variant="outline" className="h-auto py-2 px-4 flex flex-col items-center">
                <span className="text-xl mb-1">{topic.emoji}</span>
                <span className="text-sm">{topic.name}</span>
              </Button>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
