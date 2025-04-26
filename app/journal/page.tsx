"use client"

import { useState } from "react"
import { JournalEntries } from "@/components/journal/journal-entries"
import { JournalWeeklyRecap } from "@/components/journal/journal-weekly-recap"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function JournalPage() {
  const [activeTab, setActiveTab] = useState("entries")

  return (
    <main className="container px-4 pb-6">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Journal</h1>
      </div>

      <Tabs defaultValue="entries" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entries">My Entries</TabsTrigger>
          <TabsTrigger value="recap">Weekly Recap</TabsTrigger>
        </TabsList>
        <TabsContent value="entries">
          <JournalEntries />
        </TabsContent>
        <TabsContent value="recap">
          <JournalWeeklyRecap />
        </TabsContent>
      </Tabs>

      <AskKrishnaFab />
    </main>
  )
}
