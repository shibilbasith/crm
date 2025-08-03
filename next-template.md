# Next.js + Tailwind + shadcn/ui + Advanced Theming Template

## Tech Stack Overview
Modern web application setup with Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui components, and a comprehensive theme customization system.

## Initial Setup Commands

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
npx shadcn@latest add button card input checkbox dialog dropdown-menu badge slider sheet
```

### 4. Install Additional Dependencies
```bash
npm install next-themes lucide-react @radix-ui/react-avatar
```

## Project Structure
```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── theme-settings-panel.tsx
│   └── navbar.tsx (optional)
├── contexts/
│   └── theme-context.tsx
└── lib/
    └── utils.ts
```

## Theme System Implementation

### 1. Theme Context (`src/contexts/theme-context.tsx`)
```typescript
"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeSettings {
  colorScheme: 'light' | 'dark' | 'system'
  borderRadius: 'none' | 'small' | 'large'
  colorTheme: 'default' | 'green' | 'red' | 'orange' | 'violet' | 'blue' | 'yellow'
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
    colorTheme: 'default'
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

### 2. Layout Setup (`src/app/layout.tsx`)
```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ThemeProvider } from "@/contexts/theme-context";
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
            {children}
          </ThemeProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}
```

### 3. Theme Settings Panel (`src/components/theme-settings-panel.tsx`)
```typescript
"use client"

import { Settings, Palette } from 'lucide-react'
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

  return (
    <SheetContent className="w-80">
      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <Palette className="h-5 w-5" />
          Theme Settings
        </SheetTitle>
      </SheetHeader>

      <div className="space-y-6 mt-6">
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

        <div className="pt-4">
          <h3 className="text-sm font-medium mb-3">Preview</h3>
          <div className="space-y-2">
            <div className="h-8 bg-primary rounded-[var(--radius)] flex items-center px-3 text-primary-foreground text-sm">
              Primary Button
            </div>
            <div className="h-8 bg-secondary rounded-[var(--radius)] flex items-center px-3 text-secondary-foreground text-sm">
              Secondary Button
            </div>
            <div className="h-8 bg-accent rounded-[var(--radius)] flex items-center px-3 text-accent-foreground text-sm">
              Accent Button
            </div>
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

### 5. Basic Usage Example (`src/app/page.tsx`)
```typescript
import { ThemeSettingsPanel } from '@/components/theme-settings-panel'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="fixed top-4 right-4">
        <ThemeSettingsPanel />
      </div>
      
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Welcome</h1>
          <p className="text-muted-foreground mt-2">
            Your Next.js app with advanced theming is ready!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Theme Customization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Click the settings icon to customize your theme with different colors, 
                border radius, and light/dark mode.
              </p>
              <div className="space-y-2">
                <Button className="w-full">Primary Button</Button>
                <Button variant="secondary" className="w-full">Secondary Button</Button>
                <Button variant="outline" className="w-full">Outline Button</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Features Included</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>✅ Next.js 15 with App Router</li>
                <li>✅ TypeScript support</li>
                <li>✅ Tailwind CSS v4</li>
                <li>✅ shadcn/ui components</li>
                <li>✅ Advanced theme system</li>
                <li>✅ Custom scrollbars</li>
                <li>✅ Settings persistence</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
```

## Theme System Features

### 🎨 **Color Schemes**
- Light mode
- Dark mode  
- System preference

### 🌈 **Color Themes**
- Default (Slate)
- Green
- Red
- Orange
- Violet
- Blue
- Yellow

### 📐 **Border Radius Options**
- None (0rem)
- Small (0.5rem)
- Large (1rem)

### 💾 **Persistence**
- Settings saved to localStorage
- Automatic restoration on page load
- Real-time CSS custom property updates

### 🎛️ **UI Features**
- Slide-out settings panel (Sheet component)
- Visual previews for all options
- Live theme switching
- Responsive design
- Custom scrollbars

## Usage Instructions

1. **Run the setup commands** in order
2. **Copy the provided code** into respective files
3. **Add the theme settings trigger** anywhere in your app:
   ```tsx
   import { ThemeSettingsPanel } from '@/components/theme-settings-panel'
   
   // In your component
   <ThemeSettingsPanel />
   ```
4. **Customize the color themes** by modifying the CSS variables
5. **Extend the theme system** by adding new options to the context

## Customization Options

### Adding New Color Themes
1. Add to `colorThemes` array in theme-settings-panel.tsx
2. Add corresponding CSS variables in globals.css
3. Update TypeScript types in theme-context.tsx

### Adding New Border Radius Options
1. Add to `borderRadiusOptions` array
2. Update the radius mapping in theme-context.tsx
3. Update TypeScript types

### Styling Customization
- Modify CSS variables for different color schemes
- Adjust component styling in theme-settings-panel.tsx
- Customize scrollbar appearance in globals.css

This template provides a solid foundation for any Next.js application requiring advanced theme customization capabilities.