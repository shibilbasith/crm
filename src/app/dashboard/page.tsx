'use client'

import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentCustomers } from '@/components/dashboard/recent-customers'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { DashboardCharts } from '@/components/dashboard/charts'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Dashboard() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && !session) {
      router.push('/')
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user?.name}! Here's what's happening with your business today.
            </p>
          </div>
        </div>

        <StatsCards />

        <DashboardCharts />

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <RecentCustomers />
          <ActivityFeed />
        </div>
      </div>
    </LayoutWrapper>
  )
}