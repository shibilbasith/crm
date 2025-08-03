"use client"

import { useState, useEffect } from 'react'
import { Sidebar } from '@/components/sidebar'
import { Navbar } from '@/components/navbar'
import { MobileSidebar } from '@/components/mobile-sidebar'
import { useSidebar } from '@/contexts/sidebar-context'
import { useTheme } from '@/contexts/theme-context'
import { cn } from '@/lib/utils'

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

  // Desktop layouts
  // Left sidebar layout (default)
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

  // Right sidebar layout
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

  // Top sidebar layout (horizontal navbar)
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

  // Fallback to left layout
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