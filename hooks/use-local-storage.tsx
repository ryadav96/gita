"use client"

import { useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, initialValue: T) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue)

  // Load from localStorage on initial mount
  useEffect(() => {
    const loadFromStorage = () => {
      try {
        // Get from local storage by key
        const item = window.localStorage.getItem(key)
        // Parse stored json or if none return initialValue
        if (item !== null) {
          setStoredValue(JSON.parse(item))
        }
      } catch (error) {
        // If error also return initialValue
        console.error(error)
      }
    }

    loadFromStorage()
    // Only run this effect once on mount with the initial key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      // Save state
      setStoredValue(valueToStore)
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error)
    }
  }

  return [storedValue, setValue] as const
}
