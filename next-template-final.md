# Next.js Complete Production Template - Final Setup Guide

## 🚀 **Complete Tech Stack**
Production-ready Next.js 15 application with TypeScript, Tailwind CSS v4, shadcn/ui components, advanced theme customization, collapsible sidebar, full mobile responsiveness, and Docker deployment.

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

## 🏗️ **Complete Project Structure**
```
project-root/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/ (shadcn components)
│   │   ├── layout-wrapper.tsx
│   │   ├── navbar.tsx
│   │   ├── sidebar.tsx
│   │   ├── mobile-sidebar.tsx
│   │   └── theme-settings-panel.tsx
│   ├── contexts/
│   │   ├── theme-context.tsx
│   │   └── sidebar-context.tsx
│   └── lib/
│       └── utils.ts
├── public/
├── Dockerfile
├── .dockerignore
├── docker-compose.yml
├── deploy.sh
├── deploy.ps1
├── deploy-compose.sh
├── next.config.ts
├── package.json
└── README.md
```

## 🎨 **1. Theme System Implementation**

### Theme Context (`src/contexts/theme-context.tsx`)
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

### Sidebar Context (`src/contexts/sidebar-context.tsx`)
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
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}
```

## 🎛️ **2. Theme Settings Panel (`src/components/theme-settings-panel.tsx`)**
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

## 📱 **3. Mobile Responsive Components**

### Layout Wrapper (`src/components/layout-wrapper.tsx`)
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

### Mobile Sidebar (`src/components/mobile-sidebar.tsx`)
```typescript
"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu, Home, Settings } from 'lucide-react'

// Define your navigation items
const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Settings', href: '/settings', icon: Settings },
  // Add more navigation items as needed
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

### Responsive Navbar (`src/components/navbar.tsx`)
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

### Collapsible Sidebar (`src/components/sidebar.tsx`)
```typescript
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/contexts/sidebar-context'
import { useTheme } from '@/contexts/theme-context'
import { ChevronLeft, ChevronRight, Home, Settings } from 'lucide-react'

// Define your navigation items
const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Settings', href: '/settings', icon: Settings },
  // Add more navigation items as needed
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

## 🎨 **4. Layout Setup (`src/app/layout.tsx`)**
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

## 🎨 **5. Global Styles (`src/app/globals.css`)**
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  /* Add other theme variables as needed */
}

:root {
  --radius: 0.5rem;
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
}

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

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## 🐳 **6. Docker Deployment Files**

### Dockerfile
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```

### .dockerignore
```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local
.env

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# IDE
.vscode
.idea

# OS
Thumbs.db

# logs
logs
*.log

# git
.git
.gitignore

# docker
Dockerfile*
docker-compose*
.dockerignore

# documentation
README.md
*.md

# deployment scripts
deploy.sh
deploy.ps1
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: your-app-container
    ports:
      - "${PORT:-3000}:3000"
    environment:
      - NODE_ENV=production
      - NEXT_TELEMETRY_DISABLED=1
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

## 🚀 **7. Deployment Scripts**

### Linux/Mac Deploy Script (deploy.sh)
```bash
#!/bin/bash

# Application Deployment Script
set -e

# Configuration
APP_NAME="your-app"
PORT=${PORT:-3000}
IMAGE_TAG="latest"
CONTAINER_NAME="${APP_NAME}-container"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_success "Docker is running"
}

# Stop and remove existing container
cleanup_existing() {
    if docker ps -a --format 'table {{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        print_status "Stopping existing container: ${CONTAINER_NAME}"
        docker stop ${CONTAINER_NAME} > /dev/null 2>&1 || true
        docker rm ${CONTAINER_NAME} > /dev/null 2>&1 || true
        print_success "Cleaned up existing container"
    fi
}

# Build Docker image
build_image() {
    print_status "Building Docker image: ${APP_NAME}:${IMAGE_TAG}"
    if docker build -t ${APP_NAME}:${IMAGE_TAG} .; then
        print_success "Docker image built successfully"
    else
        print_error "Failed to build Docker image"
        exit 1
    fi
}

# Run container
run_container() {
    print_status "Starting container: ${CONTAINER_NAME} on port ${PORT}"
    if docker run -d \
        --name ${CONTAINER_NAME} \
        -p ${PORT}:3000 \
        --restart unless-stopped \
        ${APP_NAME}:${IMAGE_TAG}; then
        print_success "Container started successfully"
    else
        print_error "Failed to start container"
        exit 1
    fi
}

# Show deployment info
show_deployment_info() {
    echo ""
    echo "======================================"
    print_success "🚀 Application Deployed Successfully!"
    echo "======================================"
    echo ""
    echo "📱 Application URL: http://localhost:${PORT}"
    echo "🐳 Container Name: ${CONTAINER_NAME}"
    echo "🏷️  Image: ${APP_NAME}:${IMAGE_TAG}"
    echo "🔌 Port: ${PORT}"
    echo ""
    echo "📋 Useful Commands:"
    echo "   View logs:     docker logs ${CONTAINER_NAME}"
    echo "   Stop app:      docker stop ${CONTAINER_NAME}"
    echo "   Start app:     docker start ${CONTAINER_NAME}"
    echo "   Remove app:    docker rm -f ${CONTAINER_NAME}"
    echo ""
}

# Main function
main() {
    echo "======================================"
    echo "🚀 Application Deployment Script"
    echo "======================================"
    echo ""
    
    # Parse arguments
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--port)
                PORT="$2"
                shift 2
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS]"
                echo "Options:"
                echo "  -p, --port PORT    Set the port (default: 3000)"
                echo "  -h, --help         Show this help"
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    check_docker
    cleanup_existing
    build_image
    run_container
    show_deployment_info
}

main "$@"
```

### Windows PowerShell Deploy Script (deploy.ps1)
```powershell
# Application Deployment Script for Windows PowerShell
param(
    [string]$Port = "3000",
    [switch]$Help
)

# Configuration
$APP_NAME = "your-app"
$IMAGE_TAG = "latest"
$CONTAINER_NAME = "$APP_NAME-container"

function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

if ($Help) {
    Write-Host "Application Deployment Script"
    Write-Host "Usage: .\deploy.ps1 [OPTIONS]"
    Write-Host "Options:"
    Write-Host "  -Port <PORT>     Set the port (default: 3000)"
    Write-Host "  -Help            Show this help"
    exit 0
}

function Test-Docker {
    try {
        docker info | Out-Null
        Write-Success "Docker is running"
        return $true
    }
    catch {
        Write-Error "Docker is not running. Please start Docker and try again."
        return $false
    }
}

function Remove-ExistingContainer {
    $existingContainer = docker ps -a --format "table {{.Names}}" | Select-String "^$CONTAINER_NAME$"
    if ($existingContainer) {
        Write-Status "Stopping existing container: $CONTAINER_NAME"
        docker stop $CONTAINER_NAME | Out-Null
        docker rm $CONTAINER_NAME | Out-Null
        Write-Success "Cleaned up existing container"
    }
}

function Build-DockerImage {
    Write-Status "Building Docker image: ${APP_NAME}:${IMAGE_TAG}"
    try {
        docker build -t "${APP_NAME}:${IMAGE_TAG}" .
        Write-Success "Docker image built successfully"
        return $true
    }
    catch {
        Write-Error "Failed to build Docker image"
        return $false
    }
}

function Start-Container {
    Write-Status "Starting container: $CONTAINER_NAME on port $Port"
    try {
        docker run -d --name $CONTAINER_NAME -p "${Port}:3000" --restart unless-stopped "${APP_NAME}:${IMAGE_TAG}" | Out-Null
        Write-Success "Container started successfully"
        return $true
    }
    catch {
        Write-Error "Failed to start container"
        return $false
    }
}

function Show-DeploymentInfo {
    Write-Host ""
    Write-Host "======================================" -ForegroundColor Green
    Write-Success "🚀 Application Deployed Successfully!"
    Write-Host "======================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "📱 Application URL: http://localhost:$Port"
    Write-Host "🐳 Container Name: $CONTAINER_NAME"
    Write-Host "🏷️  Image: ${APP_NAME}:${IMAGE_TAG}"
    Write-Host "🔌 Port: $Port"
    Write-Host ""
}

function Main {
    Write-Host "======================================" -ForegroundColor Blue
    Write-Host "🚀 Application Deployment Script" -ForegroundColor Blue
    Write-Host "======================================" -ForegroundColor Blue
    Write-Host ""
    
    if (-not (Test-Docker)) { exit 1 }
    Remove-ExistingContainer
    if (-not (Build-DockerImage)) { exit 1 }
    if (-not (Start-Container)) { exit 1 }
    Show-DeploymentInfo
}

try {
    Main
}
catch {
    Write-Error "Deployment failed: $($_.Exception.Message)"
    exit 1
}
```

### Docker Compose Deploy Script (deploy-compose.sh)
```bash
#!/bin/bash

# Docker Compose Deployment Script
set -e

APP_NAME="your-app"
PORT=${PORT:-3000}

print_status() {
    echo -e "\033[0;34m[INFO]\033[0m $1"
}

print_success() {
    echo -e "\033[0;32m[SUCCESS]\033[0m $1"
}

main() {
    echo "======================================"
    echo "🚀 Docker Compose Deployment"
    echo "======================================"
    echo ""
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -p|--port)
                PORT="$2"
                shift 2
                ;;
            down)
                print_status "Stopping containers..."
                docker-compose down
                print_success "Containers stopped"
                exit 0
                ;;
            logs)
                print_status "Showing logs..."
                docker-compose logs -f
                exit 0
                ;;
            -h|--help)
                echo "Usage: $0 [OPTIONS] [COMMAND]"
                echo "Commands:"
                echo "  down           Stop containers"
                echo "  logs           Show logs"
                echo "Options:"
                echo "  -p, --port     Set port"
                echo "  -h, --help     Show help"
                exit 0
                ;;
            *)
                echo "Unknown option: $1"
                exit 1
                ;;
        esac
    done
    
    export PORT
    
    print_status "Starting application with Docker Compose..."
    print_status "Port: ${PORT}"
    
    if docker-compose up -d --build; then
        print_success "Application deployed successfully!"
        echo ""
        echo "📱 Application URL: http://localhost:${PORT}"
        echo ""
        echo "📋 Commands:"
        echo "   View logs:     ./deploy-compose.sh logs"
        echo "   Stop app:      ./deploy-compose.sh down"
    else
        echo "Deployment failed"
        exit 1
    fi
}

main "$@"
```

## 📋 **8. Next.js Configuration (`next.config.ts`)**
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Optional: Add other configurations
  experimental: {
    // Enable if you need server actions
    serverActions: {
      allowedOrigins: ['localhost:3000', '0.0.0.0:3000']
    }
  },
  
  // Optional: Configure images if needed
  images: {
    remotePatterns: [
      // Add any remote image patterns you need
    ],
  },
};

export default nextConfig;
```

## 📱 **9. Usage Example (`src/app/page.tsx`)**
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
            Your production-ready Next.js app with advanced features!
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
                <li>✅ Docker deployment ready</li>
                <li>✅ Custom scrollbars</li>
                <li>✅ Settings persistence</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button className="w-full">Primary Action</Button>
                <Button variant="secondary" className="w-full">Secondary Action</Button>
                <Button variant="outline" className="w-full">Outline Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LayoutWrapper>
  )
}
```

## 🚀 **10. Deployment Instructions**

### Quick Start
```bash
# 1. Setup the project
npm install

# 2. Deploy with Docker (Linux/Mac)
chmod +x deploy.sh
./deploy.sh

# 3. Deploy with Docker (Windows)
.\deploy.ps1

# 4. Deploy with Docker Compose
chmod +x deploy-compose.sh
./deploy-compose.sh

# 5. Access your app
# http://localhost:3000
```

### Custom Port Deployment
```bash
# Linux/Mac
./deploy.sh -p 8080

# Windows
.\deploy.ps1 -Port 8080

# Docker Compose
PORT=8080 ./deploy-compose.sh
```

## 🎯 **Complete Feature Set**

### 🎨 **Theme System**
- **4 Customization Types**: Color scheme, color theme, border radius, sidebar position
- **7 Color Themes**: Default, Green, Red, Orange, Violet, Blue, Yellow
- **3 Border Radius Options**: None, Small, Large
- **3 Sidebar Positions**: Left, Right, Top
- **Settings Persistence**: localStorage integration

### 📱 **Mobile Responsiveness**
- **Mobile-First Design**: Responsive breakpoints
- **Drawer Navigation**: Mobile sidebar with slide-out
- **Adaptive Layouts**: Different layouts for mobile/tablet/desktop
- **Touch-Friendly**: Optimized for mobile interactions

### 🎛️ **Sidebar Features**
- **Collapsible**: Smooth expand/collapse animations
- **Tooltips**: Hover tooltips when collapsed
- **Position Aware**: Left, right, or top positioning
- **State Persistence**: Maintains state during navigation

### 🐳 **Docker Deployment**
- **Multi-platform Scripts**: Linux/Mac and Windows support
- **Docker Compose**: Alternative deployment method
- **Production Ready**: Optimized Docker configuration
- **Health Checks**: Container health monitoring

### 🎪 **Additional Features**
- **Custom Scrollbars**: Thin, transparent scrollbars
- **Glass Morphism**: Backdrop blur effects
- **Accessibility**: Screen reader support, ARIA labels
- **Performance**: Optimized rendering and state management
- **TypeScript**: Fully typed throughout

This template provides everything needed to build and deploy a modern, production-ready Next.js application with advanced theming, responsive design, and professional deployment capabilities.