# Next.js Advanced Template - Complete Setup Guide

## 🚀 **Tech Stack Overview**
Modern web application template with Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui components, advanced theme customization, collapsible sidebar, and full mobile responsiveness.

## 📦 **Initial Setup Commands**

### 1. Create Next.js Project
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
```

### 2. Initialize shadcn/ui
```bash
npx shadcn@latest init --yes
```

### 3. Add Essential shadcn Components
```bash
npx shadcn@latest add button card input checkbox dialog dropdown-menu badge slider sheet tooltip
```

### 4. Install Additional Dependencies
```bash
npm install next-themes lucide-react @radix-ui/react-avatar
```

## 🏗️ **Project Structure**
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── layout-wrapper.tsx
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── mobile-sidebar.tsx
│   └── theme-settings-panel.tsx
├── contexts/
│   ├── theme-context.tsx
│   └── sidebar-context.tsx
└── lib/
    └── utils.ts
```

## 🎨 **Theme System Implementation**

### 1. Theme Context (`src/contexts/theme-context.tsx`)
```typescript
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
```

### 2. Sidebar Context (`src/contexts/sidebar-context.tsx`)
```typescript
"use client"

import React, { createContext, useContext, useState } from 'react'

interface SidebarContextType {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  toggleSidebar: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
```

### 3. Layout Setup (`src/app/layout.tsx`)
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from "@/contexts/theme-context";
import { SidebarProvider } from "@/contexts/sidebar-context";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
```

### 4. Global Styles (`src/app/globals.css`)
Add these styles to your existing globals.css:

```css
/* Color Themes */
.theme-green {
  --primary: oklch(0.496 0.162 142.495);
  --primary-foreground: oklch(0.985 0 0);
}

.theme-red {
  --primary: oklch(0.637 0.237 25.331);
  --primary-foreground: oklch(0.985 0 0);
}

.theme-orange {
  --primary: oklch(0.705 0.169 70.67);
  --primary-foreground: oklch(0.985 0 0);
}

.theme-violet {
  --primary: oklch(0.569 0.186 296.848);
  --primary-foreground: oklch(0.985 0 0);
}

.theme-blue {
  --primary: oklch(0.578 0.148 233.339);
  --primary-foreground: oklch(0.985 0 0);
}

.theme-yellow {
  --primary: oklch(0.832 0.173 85.109);
  --primary-foreground: oklch(0.145 0 0);
}

.dark .theme-green {
  --primary: oklch(0.596 0.162 142.495);
}

.dark .theme-red {
  --primary: oklch(0.737 0.237 25.331);
}

.dark .theme-orange {
  --primary: oklch(0.805 0.169 70.67);
}

.dark .theme-violet {
  --primary: oklch(0.669 0.186 296.848);
}

.dark .theme-blue {
  --primary: oklch(0.678 0.148 233.339);
}

.dark .theme-yellow {
  --primary: oklch(0.732 0.173 85.109);
  --primary-foreground: oklch(0.145 0 0);
}

/* Custom Scrollbar Styles */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}

.dark ::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Firefox scrollbar */
* {
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.dark * {
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
```

## 🎛️ **Theme Settings Panel (`src/components/theme-settings-panel.tsx`)**
```typescript
"use client"

import { Settings, Palette, PanelLeft, PanelRight, PanelTop } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { useTheme } from '@/contexts/theme-context'
import { useTheme as useNextTheme } from 'next-themes'

const colorThemes = [
  { name: 'Default', value: 'default', color: 'bg-slate-500' },
  { name: 'Green', value: 'green', color: 'bg-green-500' },
  { name: 'Red', value: 'red', color: 'bg-red-500' },
  { name: 'Orange', value: 'orange', color: 'bg-orange-500' },
  { name: 'Violet', value: 'violet', color: 'bg-violet-500' },
  { name: 'Blue', value: 'blue', color: 'bg-blue-500' },
  { name: 'Yellow', value: 'yellow', color: 'bg-yellow-500' },
] as const

const borderRadiusOptions = [
  { name: 'None', value: 'none', description: '0rem' },
  { name: 'Small', value: 'small', description: '0.5rem' },
  { name: 'Large', value: 'large', description: '1rem' },
] as const

const sidebarPositionOptions = [
  { name: 'Left', value: 'left', icon: PanelLeft, description: 'Sidebar on left' },
  { name: 'Right', value: 'right', icon: PanelRight, description: 'Sidebar on right' },
  { name: 'Top', value: 'top', icon: PanelTop, description: 'Horizontal navbar' },
] as const

export function ThemeSettingsTrigger() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <ThemeSettingsContent />
    </Sheet>
  )
}

function ThemeSettingsContent() {
  const { settings, updateSettings } = useTheme()
  const { setTheme } = useNextTheme()

  const handleColorSchemeChange = (scheme: 'light' | 'dark' | 'system') => {
    updateSettings({ colorScheme: scheme })
    setTheme(scheme)
  }

  const handleBorderRadiusChange = (borderRadius: typeof settings.borderRadius) => {
    updateSettings({ borderRadius })
  }

  const handleColorThemeChange = (colorTheme: typeof settings.colorTheme) => {
    updateSettings({ colorTheme })
  }

  const handleSidebarPositionChange = (sidebarPosition: typeof settings.sidebarPosition) => {
    updateSettings({ sidebarPosition })
  }

  return (
    <SheetContent className="w-80 sm:w-96 p-4 sm:p-6">
      <SheetHeader className="pb-4">
        <SheetTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Settings
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Color Scheme</h3>
          <div className="flex gap-2">
            {(['light', 'dark', 'system'] as const).map((scheme) => (
              <Badge
                key={scheme}
                variant={settings.colorScheme === scheme ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => handleColorSchemeChange(scheme)}
              >
                {scheme}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Color Theme</h3>
          <div className="grid grid-cols-2 gap-2">
            {colorThemes.map((theme) => (
              <div
                key={theme.value}
                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border transition-colors ${
                  settings.colorTheme === theme.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-accent'
                }`}
                onClick={() => handleColorThemeChange(theme.value)}
              >
                <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                <span className="text-sm">{theme.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Border Radius</h3>
          <div className="grid grid-cols-3 gap-2">
            {borderRadiusOptions.map((option) => (
              <div
                key={option.value}
                className={`flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer border transition-colors ${
                  settings.borderRadius === option.value
                    ? 'border-primary bg-primary/10'
                    : 'border-border hover:bg-accent'
                }`}
                onClick={() => handleBorderRadiusChange(option.value)}
              >
                <div
                  className="w-6 h-6 bg-primary/20 border-2 border-primary/40"
                  style={{
                    borderRadius: option.value === 'none' ? '0' : 
                                 option.value === 'small' ? '4px' : '8px'
                  }}
                />
                <div className="text-center">
                  <div className="text-xs font-medium">{option.name}</div>
                  <div className="text-xs text-muted-foreground">{option.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3">Sidebar Position</h3>
          <div className="grid grid-cols-3 gap-2">
            {sidebarPositionOptions.map((option) => {
              const Icon = option.icon
              return (
                <div
                  key={option.value}
                  className={`flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer border transition-colors ${
                    settings.sidebarPosition === option.value
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:bg-accent'
                  }`}
                  onClick={() => handleSidebarPositionChange(option.value)}
                >
                  <Icon className="h-5 w-5 text-primary" />
                  <div className="text-center">
                    <div className="text-xs font-medium">{option.name}</div>
                    <div className="text-xs text-muted-foreground">{option.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SheetContent>
  )
}

export function ThemeSettingsPanel() {
  return <ThemeSettingsTrigger />
}
```

## 📱 **Mobile Responsive Components**

### 1. Layout Wrapper (`src/components/layout-wrapper.tsx`)
```typescript
"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { useSidebar } from '@/contexts/sidebar-context'
import { useTheme } from '@/contexts/theme-context'

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  const { isCollapsed } = useSidebar()
  const { settings } = useTheme()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Mobile layout - always use drawer
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen bg-background">
        <Navbar />
        <MobileSidebar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    )
  }

  // Desktop layouts based on sidebar position
  if (settings.sidebarPosition === 'left') {
    return (
      <div className="flex h-screen bg-background">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }

  if (settings.sidebarPosition === 'right') {
    return (
      <div className="flex h-screen bg-background">
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
        <div className="hidden md:block">
          <Sidebar />
        </div>
      </div>
    )
  }

  if (settings.sidebarPosition === 'top') {
    return (
      <div className="flex flex-col h-screen bg-background">
        <div className="hidden md:block">
          <Sidebar />
        </div>
        <div className="flex-1 flex flex-col overflow-hidden">
          <Navbar />
          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }

  // Fallback
  return (
    <div className="flex h-screen bg-background">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
```

### 2. Mobile Sidebar (`src/components/mobile-sidebar.tsx`)
```typescript
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

// Define your navigation items
const navigation = [
  { name: 'Home', href: '/', icon: /* Your Icon */ },
  // Add more navigation items
]

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="fixed top-4 left-4 z-50 md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation Menu</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col bg-card">
            <div className="flex h-16 items-center px-6 border-b">
              <h1 className="text-xl font-bold">Your App</h1>
            </div>
            
            <nav className="flex-1 space-y-1 p-4">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full',
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
```

### 3. Responsive Navbar (`src/components/navbar.tsx`)
```typescript
"use client"

import { Bell, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { ThemeSettingsTrigger } from '@/components/theme-settings-panel'

export function Navbar() {
  return (
    <div className="h-16 border-b bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
      <div className="flex h-full items-center justify-between px-4 md:px-6">
        {/* Left side - Search (hidden on mobile, shown on tablet+) */}
        <div className="hidden sm:flex items-center space-x-4 flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search..." 
              className="pl-8 bg-background/50" 
            />
          </div>
        </div>

        {/* Mobile search button */}
        <div className="sm:hidden">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Right side - Actions and user */}
        <div className="flex items-center space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Bell className="h-5 w-5" />
          </Button>
          
          <ThemeSettingsTrigger />
          
          <div className="flex items-center space-x-2 ml-2 md:ml-4">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">U</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">User Name</p>
              <p className="text-xs text-muted-foreground">Role</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 4. Collapsible Sidebar (`src/components/sidebar.tsx`)
```typescript
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/contexts/sidebar-context'
import { useTheme } from '@/contexts/theme-context'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Define your navigation items
const navigation = [
  { name: 'Home', href: '/', icon: /* Your Icon */ },
  // Add more navigation items
]

export function Sidebar() {
  const { isCollapsed, toggleSidebar } = useSidebar()
  const { settings } = useTheme()
  const pathname = usePathname()

  // Top position (horizontal layout)
  if (settings.sidebarPosition === 'top') {
    return (
      <TooltipProvider>
        <div className="hidden md:flex w-full bg-card border-b">
          <div className="flex h-16 items-center px-3 border-r">
            {!isCollapsed && (
              <h1 className="text-xl font-bold">Your App</h1>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="ml-2"
            >
              {isCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          <nav className={cn(
            "flex items-center space-x-1 p-2 transition-all duration-300",
            isCollapsed && "hidden"
          )}>
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </TooltipProvider>
    )
  }

  // Left or Right position (vertical layout)
  const tooltipSide = settings.sidebarPosition === 'right' ? 'left' : 'right'
  const borderClass = settings.sidebarPosition === 'right' ? 'border-l' : 'border-r'

  return (
    <TooltipProvider>
      <div className={cn(
        "hidden md:flex h-full flex-col bg-card transition-all duration-300",
        borderClass,
        isCollapsed ? "w-16" : "w-64"
      )}>
        <div className="flex h-16 items-center border-b px-3">
          {!isCollapsed && (
            <h1 className="text-xl font-bold flex-1">Your App</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
        
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            const linkContent = (
              <Link
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors w-full',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  isCollapsed ? 'justify-center' : ''
                )}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && item.name}
              </Link>
            )

            if (isCollapsed) {
              return (
                <Tooltip key={item.name} delayDuration={0}>
                  <TooltipTrigger asChild>
                    {linkContent}
                  </TooltipTrigger>
                  <TooltipContent side={tooltipSide} className="ml-2">
                    {item.name}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <div key={item.name}>
                {linkContent}
              </div>
            )
          })}
        </nav>
      </div>
    </TooltipProvider>
  )
}
```

### 5. Basic Usage Example (`src/app/page.tsx`)
```typescript
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome</h1>
          <p className="text-muted-foreground">
            Your advanced Next.js app with theming, sidebar, and mobile support!
          </p>
        </div>

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Features</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="text-sm space-y-2">
                <li>✅ Advanced theme customization</li>
                <li>✅ Collapsible sidebar with tooltips</li>
                <li>✅ Multiple sidebar positions</li>
                <li>✅ Full mobile responsiveness</li>
                <li>✅ Custom scrollbars</li>
                <li>✅ Settings persistence</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Theme Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full">Primary Button</Button>
                <Button variant="secondary" className="w-full">Secondary Button</Button>
                <Button variant="outline" className="w-full">Outline Button</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
```

## 🎯 **Advanced Features**

### 🎨 **Theme System**
- **4 Customization Types**: Color scheme, color theme, border radius, sidebar position
- **7 Color Themes**: Default, Green, Red, Orange, Violet, Blue, Yellow
- **3 Border Radius Options**: None, Small, Large
- **3 Sidebar Positions**: Left, Right, Top
- **Settings Persistence**: localStorage integration
- **Live Preview**: Real-time theme switching

### 📱 **Mobile Responsiveness**
- **Mobile-First Design**: Responsive breakpoints (sm: 640px, md: 768px, lg: 1024px)
- **Drawer Navigation**: Mobile sidebar with slide-out drawer
- **Adaptive Layouts**: Different layouts for mobile/tablet/desktop
- **Touch-Friendly**: Optimized for touch interactions
- **Responsive Grids**: `grid gap-4 sm:grid-cols-2 lg:grid-cols-3`

### 🎛️ **Sidebar Features**
- **Collapsible**: Smooth expand/collapse with animations
- **Tooltips**: Hover tooltips when collapsed
- **Position Aware**: Left, right, or top positioning
- **State Persistence**: Maintains collapse state during navigation
- **Mobile Drawer**: Automatic mobile drawer on small screens

### 🎪 **UI/UX Features**
- **Custom Scrollbars**: Thin, transparent scrollbars
- **Glass Morphism**: Backdrop blur effects
- **Smooth Animations**: 300ms transitions
- **Accessibility**: Screen reader support, proper ARIA labels
- **Performance**: Optimized rendering and state management

## 📋 **Usage Instructions**

1. **Run the setup commands** in order
2. **Copy the provided code** into respective files
3. **Customize navigation items** in sidebar and mobile-sidebar components
4. **Add your content** using the LayoutWrapper component
5. **Customize themes** by modifying CSS variables
6. **Extend functionality** by adding new theme options

## 🔧 **Customization Guide**

### Adding New Color Themes
1. Add to `colorThemes` array in theme-settings-panel.tsx
2. Add corresponding CSS variables in globals.css
3. Update TypeScript types in theme-context.tsx

### Adding Navigation Items
```typescript
const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Settings', href: '/settings', icon: Settings },
  // Add your items here
]
```

### Responsive Design Patterns
```css
/* Mobile-first responsive classes */
className="p-4 md:p-6"                    // Padding
className="space-y-4 md:space-y-6"        // Spacing
className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"  // Grids
className="hidden sm:block"               // Visibility
className="flex flex-col sm:flex-row"     // Layout direction
```

This template provides a complete foundation for building modern, responsive web applications with advanced theming capabilities, collapsible navigation, and mobile-first design principles.