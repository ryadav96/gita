"use client"

import { JournalEntries } from "@/components/journal/journal-entries"
import { JournalWeeklyRecap } from "@/components/journal/journal-weekly-recap"

export default function JournalPage() {
  return (
    <div className="container max-w-4xl mx-auto px-4 pb-20">
      <h1 className="text-2xl font-bold mb-6">Your Journal</h1>
      
      <div className="mb-8">
        <JournalWeeklyRecap />
      </div>
      
      <h2 className="text-xl font-semibold mb-4">All Journal Entries</h2>
      <JournalEntries />
    </div>
  )
}
