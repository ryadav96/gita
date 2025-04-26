"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useTheme } from "next-themes"

export function SettingsAppearance() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue={theme} onValueChange={setTheme} className="grid grid-cols-3 gap-4">
            <div>
              <RadioGroupItem value="light" id="theme-light" className="sr-only" />
              <Label
                htmlFor="theme-light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-10 w-10 rounded-full bg-[#eaeaea] border" />
                <span>Light</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
              <Label
                htmlFor="theme-dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-10 w-10 rounded-full bg-[#1e1e1e] border" />
                <span>Dark</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="system" id="theme-system" className="sr-only" />
              <Label
                htmlFor="theme-system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <div className="mb-2 h-10 w-10 rounded-full bg-gradient-to-r from-[#eaeaea] to-[#1e1e1e] border" />
                <span>System</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Language</CardTitle>
          <CardDescription>Choose your preferred language for translations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ui-language">UI Language</Label>
            <Select defaultValue="english">
              <SelectTrigger id="ui-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="sanskrit">Sanskrit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="translation-language">Translation Language</Label>
            <Select defaultValue="english">
              <SelectTrigger id="translation-language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="both">Both</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Script</CardTitle>
          <CardDescription>Choose your preferred script for Sanskrit text</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup defaultValue="devanagari" className="grid grid-cols-2 gap-4">
            <div>
              <RadioGroupItem value="devanagari" id="script-devanagari" className="sr-only" />
              <Label
                htmlFor="script-devanagari"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-xl mb-2">देवनागरी</span>
                <span>Devanāgarī</span>
              </Label>
            </div>

            <div>
              <RadioGroupItem value="latin" id="script-latin" className="sr-only" />
              <Label
                htmlFor="script-latin"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
              >
                <span className="text-xl mb-2">Abc</span>
                <span>Latin (IAST)</span>
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Font Size</CardTitle>
          <CardDescription>Adjust the font size for reading</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="font-size">Text size</Label>
              <span className="text-sm text-muted-foreground">100%</span>
            </div>
            <Slider id="font-size" min={70} max={150} step={10} defaultValue={[100]} />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>A</span>
              <span className="text-lg">A</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
