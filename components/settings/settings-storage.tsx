"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Download, Trash2, RefreshCw } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsStorage() {
  const { toast } = useToast()

  const handleClearCache = () => {
    toast({
      title: "Cache cleared",
      description: "Your cache has been cleared successfully.",
    })
  }

  const handleExportData = () => {
    toast({
      title: "Data exported",
      description: "Your data has been exported successfully.",
    })
  }

  const handleSyncData = () => {
    toast({
      title: "Data synced",
      description: "Your data has been synced successfully.",
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
          <CardDescription>Manage your app storage</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Storage</span>
              <span>12.4 MB / 30 MB</span>
            </div>
            <Progress value={41} className="h-2" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Storage Breakdown</h4>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>Audio Files</span>
                <span>8.2 MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>App Data</span>
                <span>3.1 MB</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Journal Entries</span>
                <span>1.1 MB</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" onClick={handleClearCache}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cache
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Export or sync your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full" onClick={handleExportData}>
            <Download className="mr-2 h-4 w-4" />
            Export All Data
          </Button>

          <Button variant="outline" className="w-full" onClick={handleSyncData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Sync Data to Cloud
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
