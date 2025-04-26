"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Check,
  Crown,
  X,
  CreditCard,
  Gift,
  Sparkles,
  MessageSquare,
  Volume2,
  BookOpen,
  Clock,
  Download,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function SettingsPremium() {
  const { toast } = useToast()
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly")
  const [isPremium, setIsPremium] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("isPremiumUser") === "true"
    }
    return false
  })
  
  // Plans data with features and pricing
  const plans = {
    monthly: {
      price: 4.99,
      billingPeriod: "month",
      discount: null,
    },
    yearly: {
      price: 39.99,
      billingPeriod: "year",
      discount: "33%",
    }
  }

  // Premium features
  const premiumFeatures = [
    {
      icon: <MessageSquare className="h-5 w-5 text-primary" />,
      title: "Unlimited AI Guidance",
      description: "Ask Krishna any spiritual question without daily limits",
    },
    {
      icon: <Volume2 className="h-5 w-5 text-primary" />,
      title: "Audio Commentary",
      description: "Listen to expert verse-by-verse audio explanations",
    },
    {
      icon: <BookOpen className="h-5 w-5 text-primary" />,
      title: "Multiple Translations",
      description: "Access 5+ scholarly translations for deeper understanding",
    },
    {
      icon: <Download className="h-5 w-5 text-primary" />,
      title: "Offline Access",
      description: "Download chapters for reading without internet connection",
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Advanced Journal Features",
      description: "Extended journaling with mood tracking and insights",
    },
    {
      icon: <Sparkles className="h-5 w-5 text-primary" />,
      title: "Ad-Free Experience",
      description: "Enjoy a distraction-free spiritual journey",
    }
  ]
  
  // Handle subscription
  const handleSubscribe = () => {
    // In a real app, this would integrate with a payment processor 
    toast({
      title: "Processing Payment",
      description: "Just for demonstration, we're simulating a successful payment."
    })
    
    // Simulate successful payment after 2 seconds
    setTimeout(() => {
      localStorage.setItem("isPremiumUser", "true")
      setIsPremium(true)
      toast({
        title: "Welcome to Premium!",
        description: "You now have full access to all premium features."
      })
    }, 2000)
  }
  
  // Handle restore purchase
  const handleRestorePurchase = () => {
    toast({
      title: "Purchase Restored",
      description: "Your premium access has been restored."
    })
    localStorage.setItem("isPremiumUser", "true")
    setIsPremium(true)
  }
  
  // Handle trial activation
  const handleActivateTrial = () => {
    // Set 7-day trial expiration
    const trialEnd = new Date()
    trialEnd.setDate(trialEnd.getDate() + 7)
    localStorage.setItem("premiumTrialEnd", trialEnd.toISOString())
    localStorage.setItem("isPremiumUser", "true")
    setIsPremium(true)
    
    toast({
      title: "Trial Activated",
      description: "Your 7-day premium trial has been activated. Enjoy!"
    })
  }
  
  // Handle cancellation
  const handleCancelSubscription = () => {
    toast({
      title: "Subscription Canceled",
      description: "For demo purposes, your premium access has been revoked immediately."
    })
    localStorage.removeItem("isPremiumUser")
    localStorage.removeItem("premiumTrialEnd")
    setIsPremium(false)
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Premium Subscription</h2>
        <p className="text-muted-foreground">
          Enhance your spiritual journey with premium features and unlimited access.
        </p>
      </div>

      {isPremium ? (
        <Card className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              <h3 className="text-lg font-medium">Active Premium Subscription</h3>
            </div>
            <Badge className="bg-green-600">Active</Badge>
          </div>
          
          <p className="text-muted-foreground">
            You have full access to all premium features of the Bhagavad Gita app.
            Thank you for supporting our mission to spread spiritual wisdom.
          </p>
          
          <div className="grid gap-3 sm:grid-cols-2">
            <Button 
              variant="outline"
              onClick={handleRestorePurchase}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Restore Purchases
            </Button>
            
            <Button 
              variant="destructive" 
              onClick={handleCancelSubscription}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel Subscription
            </Button>
          </div>
        </Card>
      ) : (
        <>
          {/* Plan selection */}
          <div className="grid gap-4 sm:grid-cols-2">
            {/* Monthly plan */}
            <Card 
              className={`p-5 cursor-pointer transition ${
                selectedPlan === "monthly" 
                ? "border-primary ring-2 ring-primary" 
                : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedPlan("monthly")}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-medium">Monthly</h3>
                {selectedPlan === "monthly" && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plans.monthly.price}</span>
                <span className="text-muted-foreground ml-1">/ month</span>
              </div>
              
              <p className="text-sm mt-2 text-muted-foreground">
                Flexible month-to-month billing
              </p>
            </Card>
            
            {/* Yearly plan */}
            <Card 
              className={`p-5 cursor-pointer transition ${
                selectedPlan === "yearly" 
                ? "border-primary ring-2 ring-primary" 
                : "hover:border-primary/50"
              }`}
              onClick={() => setSelectedPlan("yearly")}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-medium">Yearly</h3>
                  {plans.yearly.discount && (
                    <Badge className="bg-green-600 text-white">
                      Save {plans.yearly.discount}
                    </Badge>
                  )}
                </div>
                {selectedPlan === "yearly" && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
              
              <div className="flex items-baseline">
                <span className="text-3xl font-bold">${plans.yearly.price}</span>
                <span className="text-muted-foreground ml-1">/ year</span>
              </div>
              
              <p className="text-sm mt-2 text-muted-foreground">
                Save with our annual plan
              </p>
            </Card>
          </div>
          
          {/* Subscribe button */}
          <div className="flex justify-center">
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-2"
              onClick={handleSubscribe}
            >
              <CreditCard className="h-4 w-4" />
              Subscribe Now
            </Button>
          </div>
          
          {/* Free trial offer */}
          <Card className="p-4 bg-primary/5 border-primary/30">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Gift className="h-5 w-5 text-primary" />
                <div>
                  <h4 className="font-medium">Try Premium Free for 7 Days</h4>
                  <p className="text-sm text-muted-foreground">
                    Experience all premium features with no obligation
                  </p>
                </div>
              </div>
              <Button variant="outline" onClick={handleActivateTrial}>
                Start Free Trial
              </Button>
            </div>
          </Card>
          
          {/* Features list */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Premium Features</h3>
            
            <div className="grid gap-3 sm:grid-cols-2">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="mt-0.5">{feature.icon}</div>
                  <div>
                    <h4 className="font-medium">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
