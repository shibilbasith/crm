import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, User, Phone, Mail, Calendar } from 'lucide-react'

const activities = [
  {
    id: 1,
    type: 'call',
    description: 'Called John Smith',
    time: '2 minutes ago',
    icon: Phone,
    status: 'completed'
  },
  {
    id: 2,
    type: 'email',
    description: 'Sent proposal to Sarah Johnson',
    time: '15 minutes ago',
    icon: Mail,
    status: 'sent'
  },
  {
    id: 3,
    type: 'meeting',
    description: 'Meeting with Mike Davis scheduled',
    time: '1 hour ago',
    icon: Calendar,
    status: 'scheduled'
  },
  {
    id: 4,
    type: 'contact',
    description: 'New contact Emily Brown added',
    time: '2 hours ago',
    icon: User,
    status: 'new'
  },
  {
    id: 5,
    type: 'call',
    description: 'Missed call from David Wilson',
    time: '3 hours ago',
    icon: Phone,
    status: 'missed'
  }
]

export function ActivityFeed() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon
            return (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {activity.status}
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}