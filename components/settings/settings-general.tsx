"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useApp } from "@/components/app-provider"

export function SettingsGeneral() {
  const { streak } = useApp()
  const [readingGoal, setReadingGoal] = useState(5)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reading Goals</CardTitle>
          <CardDescription>Set your daily and weekly reading goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="verses-per-day">Verses per day</Label>
              <span className="text-sm text-muted-foreground">{readingGoal} verses</span>
            </div>
            <Slider
              id="verses-per-day"
              min={1}
              max={20}
              step={1}
              value={[readingGoal]}
              onValueChange={(value) => setReadingGoal(value[0])}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapter-goal">Chapter goal</Label>
            <Select defaultValue="weekly">
              <SelectTrigger id="chapter-goal">
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weekly">1 chapter per week</SelectItem>
                <SelectItem value="biweekly">1 chapter per 2 weeks</SelectItem>
                <SelectItem value="monthly">1 chapter per month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
          <CardDescription>Select your interests to personalize recommendations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {["Entrepreneur", "Student", "Professional", "Spiritual Seeker", "Leader", "Parent"].map((interest) => (
              <Button key={interest} variant="outline" className="justify-start">
                {interest}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Streak</CardTitle>
          <CardDescription>Your current reading streak</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{streak} days</p>
              <p className="text-sm text-muted-foreground">Keep it going!</p>
            </div>
            <Button variant="outline">Share Streak</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
