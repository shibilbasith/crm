import { StatsCards } from '@/components/dashboard/stats-cards'
import { RecentCustomers } from '@/components/dashboard/recent-customers'
import { ActivityFeed } from '@/components/dashboard/activity-feed'
import { LayoutWrapper } from '@/components/layout-wrapper'

export default function Dashboard() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's what's happening with your business today.
            </p>
          </div>
        </div>

        <StatsCards />

        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <RecentCustomers />
          <ActivityFeed />
        </div>
      </div>
    </LayoutWrapper>
  )
}
