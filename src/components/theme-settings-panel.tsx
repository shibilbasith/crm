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
                                className={`flex items-center gap-2 p-2 rounded-md cursor-pointer border transition-colors ${settings.colorTheme === theme.value
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
                                className={`flex flex-col items-center gap-2 p-3 rounded-md cursor-pointer border transition-colors ${settings.borderRadius === option.value
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

// Keep the old export for backward compatibility
export function ThemeSettingsPanel() {
    return <ThemeSettingsTrigger />
}