"use client"

import { useState } from "react"
import { AskKrishnaChat } from "@/components/ask-krishna/ask-krishna-chat"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ChevronLeft, Info, MessageSquare, Crown, Sparkles } from "lucide-react"
import { useAskKrishna } from "@/hooks/use-ask-krishna"

export default function AskKrishnaPage() {
  const [activeTab, setActiveTab] = useState<string>("chat")
  const { isPremium, quota } = useAskKrishna()

  return (
    <div className="container max-w-4xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold">Ask Krishna</h1>
        </div>
        
        {isPremium ? (
          <Badge className="flex items-center gap-1 bg-yellow-500/90 hover:bg-yellow-500 text-black">
            <Crown className="h-3.5 w-3.5" />
            <span>Premium</span>
          </Badge>
        ) : (
          <Badge variant="outline" className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{quota} questions left today</span>
          </Badge>
        )}
      </div>
      
      <div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                <span>Ask a Question</span>
              </div>
            </TabsTrigger>
            <TabsTrigger value="about">
              <div className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span>About</span>
              </div>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="h-[calc(100vh-200px)] min-h-[500px]">
            <Card className="h-full p-0 overflow-hidden">
              <AskKrishnaChat />
            </Card>
          </TabsContent>
          
          <TabsContent value="about" className="space-y-6">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-medium">About Ask Krishna</h2>
              </div>
              
              <div className="space-y-4">
                <p>
                  Ask Krishna is an AI-powered spiritual guide that helps you explore the timeless wisdom of the Bhagavad Gita. It offers insights and guidance on life's questions through the lens of Krishna's teachings.
                </p>
                
                <h3 className="text-lg font-medium">How it works</h3>
                <p>
                  Ask a question about dharma, life's purpose, ethical dilemmas, spiritual practices, or any aspect of the Bhagavad Gita. Krishna AI will respond with relevant insights, often citing specific verses from the Gita to deepen your understanding.
                </p>
                
                <h3 className="text-lg font-medium">Example questions you can ask:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>"What does Krishna say about overcoming fear?"</li>
                  <li>"How can I find my purpose in life?"</li>
                  <li>"What is the meaning of karma yoga?"</li>
                  <li>"How to deal with difficult emotions like anger?"</li>
                  <li>"What is the significance of detachment?"</li>
                </ul>
                
                {!isPremium && (
                  <>
                    <h3 className="text-lg font-medium">Free vs Premium Access</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <Card className="p-4 space-y-3">
                        <h4 className="font-medium">Free Access</h4>
                        <p className="text-sm text-muted-foreground">
                          Free users can ask up to 3 questions per day.
                        </p>
                      </Card>
                      
                      <Card className="p-4 space-y-3 border-primary">
                        <h4 className="font-medium flex items-center gap-1">
                          <Crown className="h-4 w-4 text-yellow-500" />
                          Premium Access
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Unlimited questions and deeper spiritual insights.
                        </p>
                        <Button asChild size="sm">
                          <Link href="/settings?tab=premium">
                            Upgrade to Premium
                          </Link>
                        </Button>
                      </Card>
                    </div>
                  </>
                )}
                
                <div className="text-sm text-muted-foreground bg-muted p-4 rounded-md">
                  <p className="italic">
                    Note: Krishna AI is designed to provide spiritual guidance based on the Bhagavad Gita's teachings. While it can offer insight and perspective, it should not replace professional advice for serious medical, legal, or mental health concerns.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
