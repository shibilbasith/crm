import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Phone, PhoneCall, PhoneMissed, Clock } from 'lucide-react'

const calls = [
  {
    id: 1,
    contact: 'John Smith',
    type: 'outgoing',
    status: 'completed',
    duration: '15:32',
    time: '2 hours ago'
  },
  {
    id: 2,
    contact: 'Sarah Johnson',
    type: 'incoming',
    status: 'missed',
    duration: '0:00',
    time: '4 hours ago'
  },
  {
    id: 3,
    contact: 'Mike Davis',
    type: 'outgoing',
    status: 'completed',
    duration: '8:45',
    time: '1 day ago'
  },
  {
    id: 4,
    contact: 'Emily Brown',
    type: 'incoming',
    status: 'completed',
    duration: '22:18',
    time: '2 days ago'
  }
]

export default function CallsPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calls</h1>
              <p className="text-muted-foreground">
                Track and manage your call history and activities.
              </p>
            </div>
            <Button>
              <Phone className="mr-2 h-4 w-4" />
              Make Call
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Calls</CardTitle>
                <PhoneCall className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-muted-foreground">+12% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Missed Calls</CardTitle>
                <PhoneMissed className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8</div>
                <p className="text-xs text-muted-foreground">-3% from last week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12:45</div>
                <p className="text-xs text-muted-foreground">+2min from last week</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {calls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {call.contact.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{call.contact}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          {call.type === 'outgoing' ? (
                            <Phone className="h-3 w-3 rotate-12" />
                          ) : (
                            <Phone className="h-3 w-3 -rotate-12" />
                          )}
                          <span className="capitalize">{call.type}</span>
                          <span>•</span>
                          <span>{call.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{call.duration}</p>
                      </div>
                      <Badge 
                        variant={
                          call.status === 'completed' ? 'default' :
                          call.status === 'missed' ? 'destructive' : 'secondary'
                        }
                      >
                        {call.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
    </LayoutWrapper>
  )
}