import { HomeHeader } from "@/components/home/home-header"
import { DailyGitaDose } from "@/components/home/daily-gita-dose"
import { ContinueReading } from "@/components/home/continue-reading"
import { ExploreByChapter } from "@/components/home/explore-by-chapter"
import { ExploreByTopic } from "@/components/home/explore-by-topic"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function Home() {
  return (
    <main className="container px-4 pb-6">
      <HomeHeader />
      <div className="space-y-6 mt-4">
        <DailyGitaDose />
        <ContinueReading />
        <ExploreByChapter />
        <ExploreByTopic />
      </div>
      <AskKrishnaFab />
    </main>
  )
}
