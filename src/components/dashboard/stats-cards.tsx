import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnimatedContainer } from '@/components/animated-container'
import { TrendingUp, TrendingDown, Users, DollarSign, Target, Phone } from 'lucide-react'

const stats = [
  {
    title: 'Total Customers',
    value: '2,847',
    change: '+12.5%',
    trend: 'up',
    icon: Users
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+8.2%',
    trend: 'up',
    icon: DollarSign
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    trend: 'down',
    icon: Target
  },
  {
    title: 'Active Calls',
    value: '127',
    change: '+5.4%',
    trend: 'up',
    icon: Phone
  }
]

export function StatsCards() {
  return (
    <AnimatedContainer
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      delay={0.1}
      staggerChildren={0.1}
    >
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                {stat.trend === 'up' ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <Badge variant={stat.trend === 'up' ? 'default' : 'destructive'} className="text-xs">
                  {stat.change}
                </Badge>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </AnimatedContainer>
  )
}