"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, BookOpen, Headphones, BookMarked, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

export function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      name: "Home",
      href: "/",
      icon: Home,
      active: pathname === "/",
    },
    {
      name: "Chapters",
      href: "/chapters",
      icon: BookOpen,
      active: pathname.startsWith("/chapters"),
    },
    {
      name: "Audio",
      href: "/audio",
      icon: Headphones,
      active: pathname.startsWith("/audio"),
    },
    {
      name: "Journal",
      href: "/journal",
      icon: BookMarked,
      active: pathname.startsWith("/journal"),
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
      active: pathname.startsWith("/settings"),
    },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-50">
      <nav className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center py-2 px-3 text-xs",
              item.active ? "text-primary" : "text-muted-foreground hover:text-primary",
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  )
}
