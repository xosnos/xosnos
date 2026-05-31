"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )
  const { resolvedTheme, setTheme } = useTheme()

  if (!mounted) {
    return (
      <button
        className="btn-social btn-social-animated bg-secondary text-secondary-foreground"
        aria-label="Toggle theme"
      >
        <span className="h-[1.2rem] w-[1.2rem]" />
      </button>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="btn-social btn-social-animated bg-secondary text-secondary-foreground"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
