"use client"

import { Settings, Bell, Search, User } from 'lucide-react'
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
              placeholder="Search customers, companies, deals..." 
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
              <AvatarFallback className="text-xs">JD</AvatarFallback>
            </Avatar>
            <div className="hidden lg:block">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}