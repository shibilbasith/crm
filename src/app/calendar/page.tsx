import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, Plus, Video } from 'lucide-react'

const events = [
  {
    id: 1,
    title: 'Team Meeting',
    time: '9:00 AM - 10:00 AM',
    date: 'Today',
    type: 'meeting',
    attendees: 5
  },
  {
    id: 2,
    title: 'Client Call - John Smith',
    time: '2:00 PM - 3:00 PM',
    date: 'Today',
    type: 'call',
    attendees: 2
  },
  {
    id: 3,
    title: 'Product Demo',
    time: '11:00 AM - 12:00 PM',
    date: 'Tomorrow',
    type: 'demo',
    attendees: 8
  },
  {
    id: 4,
    title: 'Sales Review',
    time: '3:00 PM - 4:00 PM',
    date: 'Tomorrow',
    type: 'meeting',
    attendees: 3
  }
]

export default function CalendarPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
              <p className="text-muted-foreground">
                Manage your schedule and upcoming events.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Event
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">2 meetings, 2 calls</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Week</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">32 hours scheduled</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Next Meeting</CardTitle>
                <Video className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2:00 PM</div>
                <p className="text-xs text-muted-foreground">Client Call</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <p className="font-medium">{event.title}</p>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3" />
                          <span>{event.time}</span>
                          <span>•</span>
                          <span>{event.date}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {event.attendees} attendees
                        </span>
                        <Badge variant="outline" className="capitalize">
                          {event.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Video className="mr-2 h-4 w-4" />
                  Start Video Call
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Clock className="mr-2 h-4 w-4" />
                  Block Time
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>
    </LayoutWrapper>
  )
}