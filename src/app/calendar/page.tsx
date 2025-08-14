"use client"

import * as React from "react"
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Calendar as CalendarIcon,
  Clock,
  Plus,
  Video,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Users,
  MapPin,
  Bell,
} from 'lucide-react'
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from 'date-fns'
import { toast } from 'sonner'

interface CalendarEvent {
  id: string
  title: string
  description?: string
  startTime: string
  endTime: string
  date: string
  type: 'meeting' | 'call' | 'demo' | 'personal' | 'reminder'
  attendees?: string[]
  location?: string
  color: string
}

const initialEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Team Meeting',
    description: 'Weekly team sync and project updates',
    startTime: '09:00',
    endTime: '10:00',
    date: '2024-12-09',
    type: 'meeting',
    attendees: ['John Doe', 'Jane Smith', 'Mike Johnson'],
    location: 'Conference Room A',
    color: 'bg-blue-500',
  },
  {
    id: '2',
    title: 'Client Call - TechCorp',
    description: 'Quarterly business review with TechCorp',
    startTime: '14:00',
    endTime: '15:00',
    date: '2024-12-09',
    type: 'call',
    attendees: ['Sarah Wilson', 'Client Team'],
    location: 'Zoom Meeting',
    color: 'bg-green-500',
  },
  {
    id: '3',
    title: 'Product Demo',
    description: 'Demo new features to potential customers',
    startTime: '11:00',
    endTime: '12:00',
    date: '2024-12-10',
    type: 'demo',
    attendees: ['Sales Team', 'Prospects'],
    location: 'Demo Room',
    color: 'bg-purple-500',
  },
  {
    id: '4',
    title: 'Lunch Break',
    description: 'Personal time',
    startTime: '12:00',
    endTime: '13:00',
    date: '2024-12-11',
    type: 'personal',
    color: 'bg-orange-500',
  },
]

const eventTypes = [
  { value: 'meeting', label: 'Meeting', color: 'bg-blue-500' },
  { value: 'call', label: 'Call', color: 'bg-green-500' },
  { value: 'demo', label: 'Demo', color: 'bg-purple-500' },
  { value: 'personal', label: 'Personal', color: 'bg-orange-500' },
  { value: 'reminder', label: 'Reminder', color: 'bg-red-500' },
]

function EventDialog({ 
  event, 
  isOpen, 
  onClose, 
  onSave, 
  onDelete,
  selectedDate 
}: {
  event?: CalendarEvent
  isOpen: boolean
  onClose: () => void
  onSave: (event: CalendarEvent) => void
  onDelete?: (id: string) => void
  selectedDate?: Date
}) {
  const [formData, setFormData] = React.useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startTime: '09:00',
    endTime: '10:00',
    date: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'),
    type: 'meeting',
    location: '',
    attendees: [],
    color: 'bg-blue-500',
  })

  React.useEffect(() => {
    if (event) {
      setFormData(event)
    } else if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: format(selectedDate, 'yyyy-MM-dd')
      }))
    }
  }, [event, selectedDate])

  const handleSave = () => {
    if (!formData.title || !formData.startTime || !formData.endTime) {
      toast.error('Please fill in all required fields')
      return
    }

    const eventToSave: CalendarEvent = {
      id: event?.id || Date.now().toString(),
      title: formData.title!,
      description: formData.description,
      startTime: formData.startTime!,
      endTime: formData.endTime!,
      date: formData.date!,
      type: formData.type as CalendarEvent['type'],
      location: formData.location,
      attendees: formData.attendees,
      color: eventTypes.find(t => t.value === formData.type)?.color || 'bg-blue-500',
    }

    onSave(eventToSave)
    onClose()
    toast.success(event ? 'Event updated successfully' : 'Event created successfully')
  }

  const handleDelete = () => {
    if (event && onDelete) {
      onDelete(event.id)
      onClose()
      toast.success('Event deleted successfully')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{event ? 'Edit Event' : 'Create New Event'}</DialogTitle>
          <DialogDescription>
            {event ? 'Update event details' : 'Add a new event to your calendar'}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Event title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Event description"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as CalendarEvent['type'] }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${type.color}`} />
                        {type.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Start Time *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">End Time *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Meeting location or video link"
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between">
          <div>
            {event && onDelete && (
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {event ? 'Update' : 'Create'} Event
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function CalendarGrid({ 
  currentDate, 
  events, 
  onDateClick, 
  onEventClick 
}: {
  currentDate: Date
  events: CalendarEvent[]
  onDateClick: (date: Date) => void
  onEventClick: (event: CalendarEvent) => void
}) {
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(monthStart)
  const startDate = startOfWeek(monthStart)
  const endDate = endOfWeek(monthEnd)

  const days = []
  let day = startDate

  while (day <= endDate) {
    days.push(day)
    day = addDays(day, 1)
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date))
  }

  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {/* Header */}
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
        <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
          {day}
        </div>
      ))}
      
      {/* Calendar Days */}
      {days.map((day, index) => {
        const dayEvents = getEventsForDate(day)
        const isCurrentMonth = isSameMonth(day, currentDate)
        const isDayToday = isToday(day)
        
        return (
          <div
            key={index}
            className={`min-h-[100px] p-1 border border-border cursor-pointer hover:bg-muted/50 transition-colors ${
              !isCurrentMonth ? 'text-muted-foreground bg-muted/20' : ''
            } ${isDayToday ? 'bg-primary/10 border-primary' : ''}`}
            onClick={() => onDateClick(day)}
          >
            <div className={`text-sm font-medium mb-1 ${isDayToday ? 'text-primary' : ''}`}>
              {format(day, 'd')}
            </div>
            <div className="space-y-1">
              {dayEvents.slice(0, 2).map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded text-white cursor-pointer hover:opacity-80 ${event.color}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    onEventClick(event)
                  }}
                >
                  <div className="truncate font-medium">{event.title}</div>
                  <div className="truncate opacity-90">
                    {event.startTime} - {event.endTime}
                  </div>
                </div>
              ))}
              {dayEvents.length > 2 && (
                <div className="text-xs text-muted-foreground">
                  +{dayEvents.length - 2} more
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function EventsList({ 
  events, 
  onEventClick, 
  onEventEdit 
}: {
  events: CalendarEvent[]
  onEventClick: (event: CalendarEvent) => void
  onEventEdit: (event: CalendarEvent) => void
}) {
  const todayEvents = events.filter(event => isSameDay(parseISO(event.date), new Date()))
  const upcomingEvents = events
    .filter(event => !isSameDay(parseISO(event.date), new Date()))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="w-5 h-5" />
            Today's Events ({todayEvents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm">No events scheduled for today</p>
          ) : (
            <div className="space-y-3">
              {todayEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${event.color}`} />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                        {event.location && (
                          <>
                            <span>•</span>
                            <MapPin className="w-3 h-3" />
                            <span>{event.location}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onEventClick(event)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEventEdit(event)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Event
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length === 0 ? (
            <p className="text-muted-foreground text-sm">No upcoming events</p>
          ) : (
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => onEventClick(event)}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${event.color}`} />
                    <div>
                      <p className="font-medium">{event.title}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{format(parseISO(event.date), 'MMM d')}</span>
                        <span>•</span>
                        <Clock className="w-3 h-3" />
                        <span>{event.startTime} - {event.endTime}</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="capitalize">
                    {event.type}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = React.useState(new Date())
  const [events, setEvents] = React.useState<CalendarEvent[]>(initialEvents)
  const [selectedEvent, setSelectedEvent] = React.useState<CalendarEvent | null>(null)
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null)
  const [isEventDialogOpen, setIsEventDialogOpen] = React.useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = React.useState(false)

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1))
  }

  const handleDateClick = (date: Date) => {
    setSelectedDate(date)
    setSelectedEvent(null)
    setIsEventDialogOpen(true)
  }

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsViewDialogOpen(true)
  }

  const handleEventEdit = (event: CalendarEvent) => {
    setSelectedEvent(event)
    setIsEventDialogOpen(true)
  }

  const handleEventSave = (event: CalendarEvent) => {
    if (selectedEvent) {
      setEvents(prev => prev.map(e => e.id === event.id ? event : e))
    } else {
      setEvents(prev => [...prev, event])
    }
    setSelectedEvent(null)
    setSelectedDate(null)
  }

  const handleEventDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
    setSelectedEvent(null)
  }

  const todayEventsCount = events.filter(event => 
    isSameDay(parseISO(event.date), new Date())
  ).length

  const thisWeekEventsCount = events.filter(event => {
    const eventDate = parseISO(event.date)
    const weekStart = startOfWeek(new Date())
    const weekEnd = endOfWeek(new Date())
    return eventDate >= weekStart && eventDate <= weekEnd
  }).length

  const nextEvent = events
    .filter(event => parseISO(event.date) >= new Date())
    .sort((a, b) => new Date(a.date + ' ' + a.startTime).getTime() - new Date(b.date + ' ' + b.startTime).getTime())[0]

  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
            <p className="text-muted-foreground">
              Manage your schedule and events with our interactive calendar.
            </p>
          </div>
          <Button onClick={() => {
            setSelectedEvent(null)
            setSelectedDate(new Date())
            setIsEventDialogOpen(true)
          }}>
            <Plus className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Events</CardTitle>
              <CalendarIcon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayEventsCount}</div>
              <p className="text-xs text-muted-foreground">
                {todayEventsCount === 0 ? 'No events today' : 'Events scheduled'}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{thisWeekEventsCount}</div>
              <p className="text-xs text-muted-foreground">Events this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Event</CardTitle>
              <Video className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {nextEvent ? nextEvent.startTime : '--'}
              </div>
              <p className="text-xs text-muted-foreground">
                {nextEvent ? nextEvent.title : 'No upcoming events'}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar Layout */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Calendar Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">
                    {format(currentDate, 'MMMM yyyy')}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePreviousMonth}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextMonth}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <CalendarGrid
                  currentDate={currentDate}
                  events={events}
                  onDateClick={handleDateClick}
                  onEventClick={handleEventClick}
                />
              </CardContent>
            </Card>
          </div>

          {/* Events List */}
          <div className="lg:col-span-1">
            <EventsList
              events={events}
              onEventClick={handleEventClick}
              onEventEdit={handleEventEdit}
            />
          </div>
        </div>

        {/* Event Creation/Edit Dialog */}
        <EventDialog
          event={selectedEvent || undefined}
          isOpen={isEventDialogOpen}
          onClose={() => {
            setIsEventDialogOpen(false)
            setSelectedEvent(null)
            setSelectedDate(null)
          }}
          onSave={handleEventSave}
          onDelete={handleEventDelete}
          selectedDate={selectedDate || undefined}
        />

        {/* Event View Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            {selectedEvent && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${selectedEvent.color}`} />
                    {selectedEvent.title}
                  </DialogTitle>
                  <DialogDescription>
                    Event details and information
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {selectedEvent.description && (
                    <div>
                      <Label className="text-sm font-medium">Description</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedEvent.description}
                      </p>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Date</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(parseISO(selectedEvent.date), 'EEEE, MMMM d, yyyy')}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Time</Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {selectedEvent.startTime} - {selectedEvent.endTime}
                      </p>
                    </div>
                  </div>
                  {selectedEvent.location && (
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {selectedEvent.location}
                      </p>
                    </div>
                  )}
                  {selectedEvent.attendees && selectedEvent.attendees.length > 0 && (
                    <div>
                      <Label className="text-sm font-medium">Attendees</Label>
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {selectedEvent.attendees.join(', ')}
                      </p>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm font-medium">Type</Label>
                    <Badge variant="outline" className="mt-1 capitalize">
                      {selectedEvent.type}
                    </Badge>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setIsViewDialogOpen(false)
                    handleEventEdit(selectedEvent)
                  }}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Event
                  </Button>
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </LayoutWrapper>
  )
}