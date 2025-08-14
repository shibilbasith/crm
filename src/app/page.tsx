'use client'

import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentCustomers } from '@/components/dashboard/recent-customers'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { DashboardCharts } from '@/components/dashboard/charts'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { BeautifulLanding } from '@/components/ui/beautiful-landing'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function HomePage() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  // If user is authenticated, redirect to dashboard
  useEffect(() => {
    if (!isPending && session) {
      router.push('/dashboard')
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // If user is authenticated, show loading while redirecting
  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // Show landing page for unauthenticated users
  return <BeautifulLanding />
}
