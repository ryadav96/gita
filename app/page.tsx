import { HomeHeader } from "@/components/home/home-header"
import { ContinueReading } from "@/components/home/continue-reading"
import { DailyGitaDose } from "@/components/home/daily-gita-dose"
import { ExploreByChapter } from "@/components/home/explore-by-chapter"
import { ExploreByTopic } from "@/components/home/explore-by-topic"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function Home() {
  return (
    <main className="container px-4 pb-6">
      <HomeHeader />
      <div className="space-y-6 mt-4">
        {/* Continue Reading Section */}
        <section>
          <ContinueReading />
        </section>
        
        {/* Daily Gita Dose Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Daily Gita Dose</h2>
          <DailyGitaDose />
        </section>
        
        {/* Explore By Chapter Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Explore By Chapter</h2>
          <ExploreByChapter />
        </section>
        
        {/* Explore By Topic Section */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Explore By Topic</h2>
          <ExploreByTopic />
        </section>
      </div>
      <AskKrishnaFab />
    </main>
  )
}
