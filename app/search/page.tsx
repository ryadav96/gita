"use client"

import { useState } from "react"
import { SearchBar } from "@/components/search/search-bar"
import { SearchFilters } from "@/components/search/search-filters"
import { SearchResults } from "@/components/search/search-results"
import { AskKrishnaResults } from "@/components/search/ask-krishna-results"
import { AskKrishnaFab } from "@/components/ask-krishna-fab"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [isAiQuery, setIsAiQuery] = useState(false)
  const [filters, setFilters] = useState({
    emotions: [] as string[],
    chapter: "",
    commentators: [] as string[],
  })

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery)
    // Detect if this is an AI query (question format)
    setIsAiQuery(searchQuery.trim().endsWith("?"))
  }

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
  }

  return (
    <main className="container px-4 pb-6">
      <div className="py-4">
        <SearchBar onSearch={handleSearch} />
        <SearchFilters filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {isAiQuery && query ? <AskKrishnaResults query={query} /> : <SearchResults query={query} filters={filters} />}

      <AskKrishnaFab />
    </main>
  )
}
