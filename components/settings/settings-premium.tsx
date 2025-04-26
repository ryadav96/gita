"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown } from "lucide-react"
import { useApp } from "@/components/app-provider"
import { useToast } from "@/hooks/use-toast"

export function SettingsPremium() {
  const { isPremium, togglePremium } = useApp()
  const { toast } = useToast()

  const handleSubscribe = () => {
    togglePremium()
    toast({
      title: isPremium ? "Subscription cancelled" : "Subscription activated",
      description: isPremium
        ? "Your premium subscription has been cancelled."
        : "Thank you for subscribing to premium!",
    })
  }

  const handleRestorePurchase = () => {
    toast({
      title: "Restoring purchase",
      description: "Checking for previous purchases...",
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Crown className="mr-2 h-5 w-5 text-primary" />
              Premium Status
            </CardTitle>
            <Badge variant={isPremium ? "default" : "outline"}>{isPremium ? "Active" : "Inactive"}</Badge>
          </div>
          <CardDescription>
            {isPremium ? "You are currently on a premium plan" : "Upgrade to premium for full access"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Unlimited Ask-Krishna queries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>All audio playlists and downloads</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>All commentaries unlocked</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Unlimited journal entries</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Cloud backup and sync</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Ad-free experience</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Button className="w-full" onClick={handleSubscribe}>
            {isPremium ? "Cancel Subscription" : "Subscribe Now"}
          </Button>
          {!isPremium && (
            <Button variant="outline" className="w-full" onClick={handleRestorePurchase}>
              Restore Purchase
            </Button>
          )}
        </CardFooter>
      </Card>

      {!isPremium && (
        <Card>
          <CardHeader>
            <CardTitle>Subscription Plans</CardTitle>
            <CardDescription>Choose a plan that works for you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-primary/20">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <h3 className="font-bold">Monthly</h3>
                    <p className="text-3xl font-bold">₹199</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                    <Button className="w-full mt-2">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary">
                <CardContent className="p-4">
                  <div className="text-center space-y-2">
                    <Badge className="mb-2">Best Value</Badge>
                    <h3 className="font-bold">Yearly</h3>
                    <p className="text-3xl font-bold">₹999</p>
                    <p className="text-sm text-muted-foreground">per year</p>
                    <Button className="w-full mt-2">Subscribe</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center text-sm text-muted-foreground">
              <p>7-day free trial with all plans. Cancel anytime.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
