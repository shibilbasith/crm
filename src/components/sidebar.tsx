"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/contexts/sidebar-context'
import { useTheme } from '@/contexts/theme-context'
import { 
  LayoutDashboard, 
  Users, 
  Phone, 
  Mail, 
  Calendar, 
  BarChart3, 
  Settings,
  Building2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Customers', href: '/customers', icon: Users },
  { name: 'Calls', href: '/calls', icon: Phone },
  { name: 'Emails', href: '/emails', icon: Mail },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Companies', href: '/companies', icon: Building2 },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar() {
  const { isCollapsed, setIsCollapsed, toggleSidebar } = useSidebar()
  const { settings } = useTheme()
  const pathname = usePathname()

  // Top position (horizontal layout)
  if (settings.sidebarPosition === 'top') {
    return (
      <TooltipProvider>
        <div className="hidden md:flex w-full bg-card border-b">
          <div className="flex h-16 items-center px-3 border-r">
            {!isCollapsed && (
              <h1 className="text-xl font-bold">CRM Dashboard</h1>
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
              
              const linkContent = (
                <Link
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
            <h1 className="text-xl font-bold flex-1">CRM Dashboard</h1>
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