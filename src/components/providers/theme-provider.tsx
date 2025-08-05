"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'dark'

type ThemeProviderContextType = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Always use dark theme
    setTheme('dark')
  }, [])

  useEffect(() => {
    if (mounted) {
      // Always set dark mode
      document.documentElement.classList.remove('light')
      document.documentElement.classList.add('dark')
    }
  }, [mounted])

  const toggleTheme = () => {
    // No-op since we only support dark mode
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <ThemeProviderContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    // Return dark theme as fallback instead of throwing error
    return { theme: 'dark' as Theme, toggleTheme: () => {}, setTheme: () => {} }
  }
  return context
}
