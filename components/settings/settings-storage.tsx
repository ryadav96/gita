"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Cloud, CloudOff, Database, Download, HardDrive, RefreshCw, Trash2, Upload, Crown } from "lucide-react"
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface StorageItem {
  key: string
  name: string
  size: number
  lastUpdated?: Date
}

interface StorageInfo {
  totalUsed: number
  totalAvailable: number
  items: StorageItem[]
}

export function SettingsStorage() {
  const [isPremium, setIsPremium] = useState(false)
  const [syncEnabled, setSyncEnabled] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [storageInfo, setStorageInfo] = useState<StorageInfo>({
    totalUsed: 0,
    totalAvailable: 50 * 1024 * 1024, // 50MB for free users
    items: []
  })
  
  // Check premium status and load storage info
  useEffect(() => {
    const checkStatus = () => {
      // Check premium status
      const storedPremium = localStorage.getItem("isPremiumUser")
      const tempAccess = localStorage.getItem("temporaryPremiumAccess")
      const premiumStatus = storedPremium === "true" || (tempAccess && new Date(tempAccess) > new Date())
      setIsPremium(premiumStatus)
      
      // Check sync status
      const storedSync = localStorage.getItem("syncEnabled")
      setSyncEnabled(storedSync === "true")
      
      // Set premium storage limit if premium
      const availableStorage = premiumStatus ? 500 * 1024 * 1024 : 50 * 1024 * 1024 // 500MB for premium, 50MB for free
      
      // Calculate storage usage (mock data for demo)
      // In a real app, this would come from an API or IndexedDB measurement
      setTimeout(() => {
        setStorageInfo({
          totalUsed: 12 * 1024 * 1024, // 12MB used
          totalAvailable: availableStorage,
          items: [
            {
              key: "journal-entries",
              name: "Journal Entries",
              size: 5 * 1024 * 1024, // 5MB
              lastUpdated: new Date(2025, 3, 20) // April 20, 2025
            },
            {
              key: "cached-verses",
              name: "Cached Verses & Commentary",
              size: 4 * 1024 * 1024, // 4MB
              lastUpdated: new Date(2025, 3, 22) // April 22, 2025
            },
            {
              key: "audio-downloads",
              name: "Downloaded Audio",
              size: 2.5 * 1024 * 1024, // 2.5MB
              lastUpdated: new Date(2025, 3, 24) // April 24, 2025
            },
            {
              key: "favorites",
              name: "Favorites & Bookmarks",
              size: 0.5 * 1024 * 1024, // 0.5MB
              lastUpdated: new Date(2025, 3, 25) // April 25, 2025
            }
          ]
        })
        setIsLoading(false)
      }, 1000)
    }
    
    checkStatus()
  }, [])
  
  // Format bytes to human-readable size
  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }
  
  // Handle toggling cloud sync
  const handleToggleSync = () => {
    const newValue = !syncEnabled
    setSyncEnabled(newValue)
    localStorage.setItem("syncEnabled", newValue.toString())
    
    // In a real app, this would enable/disable cloud sync functionality
  }
  
  // Clear specific storage item
  const handleClearItem = (key: string) => {
    // In a real app, this would clear the specific data
    console.log(`Clearing item: ${key}`)
    
    // Update storage info
    setStorageInfo(prev => {
      const itemIndex = prev.items.findIndex(item => item.key === key)
      if (itemIndex === -1) return prev
      
      const clearedSize = prev.items[itemIndex].size
      const newItems = [...prev.items]
      newItems[itemIndex] = { ...newItems[itemIndex], size: 0 }
      
      return {
        ...prev,
        totalUsed: prev.totalUsed - clearedSize,
        items: newItems
      }
    })
  }
  
  // Perform full export of user data
  const handleExportData = () => {
    // In a real app, this would collect and export all user data
    console.log("Exporting user data")
    
    // Mock export - in a real app, this would create a JSON file for download
    const mockData = {
      userData: {
        preferences: {
          theme: localStorage.getItem("theme"),
          fontSizePreference: localStorage.getItem("fontSizePreference"),
          preferredScript: localStorage.getItem("preferredScript")
        },
        journalEntries: localStorage.getItem("journalEntries"),
        favorites: localStorage.getItem("favoriteVerses"),
        readingProgress: localStorage.getItem("readingProgress")
      },
      exportDate: new Date().toISOString()
    }
    
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mockData, null, 2))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "bhagavad_gita_data.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }
  
  // Format last updated date
  const formatLastUpdated = (date?: Date): string => {
    if (!date) return 'Never'
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }
  
  const handleBackup = () => {
    // In a real app, this would trigger a full backup to cloud
    console.log("Backing up data to cloud")
    alert("Backup started. This may take a few minutes.")
  }
  
  const handleRestore = () => {
    // In a real app, this would restore from cloud backup
    console.log("Restoring data from cloud")
    alert("Restore started. This may take a few minutes.")
  }

  return (
    <div className="space-y-6">
      {/* Storage Usage Summary */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-medium">Storage Usage</h3>
          <Badge variant={isPremium ? "default" : "outline"}>
            {isPremium ? "Premium" : "Free"}
          </Badge>
        </div>
        
        {isLoading ? (
          <div className="h-16 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading storage information...</p>
          </div>
        ) : (
          <>
            <div className="flex justify-between mb-2 text-sm">
              <span>{formatBytes(storageInfo.totalUsed)} used</span>
              <span>{formatBytes(storageInfo.totalAvailable)} available</span>
            </div>
            <Progress 
              value={(storageInfo.totalUsed / storageInfo.totalAvailable) * 100} 
              className="h-2"
            />
            
            <p className="text-xs text-muted-foreground mt-2">
              {isPremium ? (
                `Premium users get ${formatBytes(storageInfo.totalAvailable)} of storage`
              ) : (
                `Free users get ${formatBytes(storageInfo.totalAvailable)} of storage. Upgrade for more.`
              )}
            </p>
          </>
        )}
      </div>
      
      {/* Storage Items */}
      <div>
        <h3 className="text-lg font-medium mb-4">Storage Details</h3>
        
        {isLoading ? (
          <div className="h-32 flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Loading details...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {storageInfo.items.map((item) => (
              <Card key={item.key} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <div className="flex flex-col gap-1 mt-1">
                      <p className="text-sm text-muted-foreground">
                        Size: {formatBytes(item.size)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last updated: {formatLastUpdated(item.lastUpdated)}
                      </p>
                    </div>
                  </div>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Clear
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Clear {item.name}?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will delete all {item.name.toLowerCase()} from your device. 
                          {item.key === "journal-entries" && " Your journal entries will be permanently deleted if you haven't enabled cloud sync."}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleClearItem(item.key)}
                        >
                          Clear
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Cloud Sync */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-medium flex items-center">
              {isPremium ? (
                <>
                  <Cloud className="h-5 w-5 mr-2" />
                  Cloud Sync
                </>
              ) : (
                <>
                  <CloudOff className="h-5 w-5 mr-2" />
                  Cloud Sync
                </>
              )}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              {isPremium ? 
                "Sync your data across devices" : 
                "Upgrade to premium to enable cloud sync"
              }
            </p>
          </div>
          
          <Switch 
            checked={syncEnabled}
            onCheckedChange={handleToggleSync}
            disabled={!isPremium}
          />
        </div>
        
        {isPremium && syncEnabled && (
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="flex items-center justify-center"
              onClick={handleBackup}
            >
              <Upload className="h-4 w-4 mr-2" />
              Backup Now
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center justify-center"
              onClick={handleRestore}
            >
              <Download className="h-4 w-4 mr-2" />
              Restore
            </Button>
          </div>
        )}
        
        {!isPremium && (
          <Card className="p-4 bg-muted/30">
            <div className="flex items-start gap-3">
              <Crown className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-medium">Premium Feature</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Upgrade to premium to enable cloud sync and never lose your journal entries, 
                  bookmarks, and reading progress.
                </p>
                
                <Button size="sm" asChild>
                  <a href="/settings?tab=premium">Upgrade to Premium</a>
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
      
      {/* Data Management */}
      <div>
        <h3 className="text-lg font-medium mb-4">Data Management</h3>
        
        <div className="flex flex-col gap-3">
          <Button 
            variant="outline" 
            className="justify-start"
            onClick={handleExportData}
          >
            <Database className="h-4 w-4 mr-2" />
            Export All Data
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="justify-start">
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear all data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your data from this device, including journal entries, 
                  bookmarks, favorites, and reading progress. This action cannot be undone.
                  {syncEnabled && isPremium ? 
                    " Your data will remain in the cloud and can be restored later." : 
                    " We recommend exporting your data first."
                  }
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction>Clear All Data</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  )
}
