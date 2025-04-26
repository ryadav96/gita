"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsGeneral } from "@/components/settings/settings-general"
import { SettingsAppearance } from "@/components/settings/settings-appearance"
import { SettingsNotifications } from "@/components/settings/settings-notifications"
import { SettingsPremium } from "@/components/settings/settings-premium"
import { SettingsStorage } from "@/components/settings/settings-storage"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState<string>("general")
  
  // Get tab from URL query parameter if present
  useEffect(() => {
    const tabParam = searchParams.get("tab")
    if (tabParam && ["general", "appearance", "notifications", "premium", "storage"].includes(tabParam)) {
      setActiveTab(tabParam)
    }
  }, [searchParams])

  return (
    <div className="container py-6 space-y-6 max-w-3xl">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ChevronLeft className="h-5 w-5" />
          <span>Back</span>
        </Link>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="premium">Premium</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <SettingsGeneral />
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-6">
          <SettingsAppearance />
        </TabsContent>
        
        <TabsContent value="notifications" className="space-y-6">
          <SettingsNotifications />
        </TabsContent>
        
        <TabsContent value="premium" className="space-y-6">
          <SettingsPremium />
        </TabsContent>
        
        <TabsContent value="storage" className="space-y-6">
          <SettingsStorage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
