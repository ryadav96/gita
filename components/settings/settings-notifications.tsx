"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TimePickerDemo } from "@/components/settings/time-picker"

export function SettingsNotifications() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Verse</CardTitle>
          <CardDescription>Receive a daily verse notification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="daily-verse">Enable daily verse</Label>
            <Switch id="daily-verse" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label>Notification time</Label>
            <TimePickerDemo />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Recap</CardTitle>
          <CardDescription>Receive a weekly summary of your reading progress</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="weekly-recap">Enable weekly recap</Label>
            <Switch id="weekly-recap" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="recap-day">Day of the week</Label>
            <Select defaultValue="sunday">
              <SelectTrigger id="recap-day">
                <SelectValue placeholder="Select day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sunday">Sunday</SelectItem>
                <SelectItem value="monday">Monday</SelectItem>
                <SelectItem value="saturday">Saturday</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Streak Reminders</CardTitle>
          <CardDescription>Get reminded to maintain your reading streak</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="streak-reminder">Enable streak reminders</Label>
            <Switch id="streak-reminder" defaultChecked />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reminder-time">Reminder time</Label>
            <Select defaultValue="evening">
              <SelectTrigger id="reminder-time">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="morning">Morning (8 AM)</SelectItem>
                <SelectItem value="afternoon">Afternoon (2 PM)</SelectItem>
                <SelectItem value="evening">Evening (8 PM)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
