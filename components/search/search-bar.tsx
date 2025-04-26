"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Mic, Camera } from "lucide-react"

interface SearchBarProps {
  onSearch: (query: string) => void
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleVoiceSearch = () => {
    // In a real app, this would activate voice recognition
    alert("Voice search would be activated here")
  }

  const handleOCRSearch = () => {
    // In a real app, this would activate the camera for OCR
    alert("OCR search would be activated here")
  }

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search verses or ask a question..."
          className="pl-8"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <Button type="submit" variant="default" size="icon">
        <Search className="h-4 w-4" />
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={handleVoiceSearch}>
        <Mic className="h-4 w-4" />
      </Button>
      <Button type="button" variant="outline" size="icon" onClick={handleOCRSearch}>
        <Camera className="h-4 w-4" />
      </Button>
    </form>
  )
}
