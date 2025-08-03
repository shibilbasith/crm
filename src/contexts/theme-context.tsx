"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeSettings {
  colorScheme: 'light' | 'dark' | 'system'
  borderRadius: 'none' | 'small' | 'large'
  colorTheme: 'default' | 'green' | 'red' | 'orange' | 'violet' | 'blue' | 'yellow'
  sidebarPosition: 'left' | 'right' | 'top'
}

interface ThemeContextType {
  settings: ThemeSettings
  updateSettings: (settings: Partial<ThemeSettings>) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ThemeSettings>({
    colorScheme: 'system',
    borderRadius: 'small',
    colorTheme: 'default',
    sidebarPosition: 'left'
  })

  useEffect(() => {
    const saved = localStorage.getItem('theme-settings')
    if (saved) {
      setSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme-settings', JSON.stringify(settings))
    
    // Apply border radius to CSS custom property
    const radiusValue = {
      'none': '0rem',
      'small': '0.5rem',
      'large': '1rem'
    }[settings.borderRadius]
    document.documentElement.style.setProperty('--radius', radiusValue)
    
    // Apply color theme
    document.documentElement.className = document.documentElement.className
      .replace(/theme-\w+/g, '')
    if (settings.colorTheme !== 'default') {
      document.documentElement.classList.add(`theme-${settings.colorTheme}`)
    }
  }, [settings])

  const updateSettings = (newSettings: Partial<ThemeSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }))
  }

  return (
    <ThemeContext.Provider value={{ settings, updateSettings }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}