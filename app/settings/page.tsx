"use client"

import { useState } from "react"
import { SettingsGeneral } from "@/components/settings/settings-general"
import { SettingsNotifications } from "@/components/settings/settings-notifications"
import { SettingsAppearance } from "@/components/settings/settings-appearance"
import { SettingsStorage } from "@/components/settings/settings-storage"
import { SettingsPremium } from "@/components/settings/settings-premium"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general")

  return (
    <main className="container px-4 pb-6">
      <div className="py-4">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="general" onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
        </TabsList>
        <TabsContent value="general">
          <SettingsGeneral />
        </TabsContent>
        <TabsContent value="notifications">
          <SettingsNotifications />
        </TabsContent>
        <TabsContent value="appearance">
          <SettingsAppearance />
        </TabsContent>
        <TabsContent value="storage">
          <SettingsStorage />
        </TabsContent>
        <TabsContent value="premium">
          <SettingsPremium />
        </TabsContent>
      </Tabs>
    </main>
  )
}
