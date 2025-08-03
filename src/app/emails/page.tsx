import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Mail, Send, Inbox, Archive } from 'lucide-react'

const emails = [
  {
    id: 1,
    from: 'John Smith',
    subject: 'Follow up on proposal',
    preview: 'Hi there, I wanted to follow up on the proposal we discussed...',
    time: '2 hours ago',
    status: 'unread'
  },
  {
    id: 2,
    from: 'Sarah Johnson',
    subject: 'Meeting confirmation',
    preview: 'Just confirming our meeting scheduled for tomorrow at 2 PM...',
    time: '5 hours ago',
    status: 'read'
  },
  {
    id: 3,
    from: 'Mike Davis',
    subject: 'Project update',
    preview: 'Here is the latest update on the project status and timeline...',
    time: '1 day ago',
    status: 'read'
  },
  {
    id: 4,
    from: 'Emily Brown',
    subject: 'Invoice #1234',
    preview: 'Please find attached the invoice for services rendered...',
    time: '2 days ago',
    status: 'archived'
  }
]

export default function EmailsPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Emails</h1>
              <p className="text-muted-foreground">
                Manage your email communications and campaigns.
              </p>
            </div>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Compose
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Inbox</CardTitle>
                <Inbox className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">3 unread</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sent</CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Archived</CardTitle>
                <Archive className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">89</div>
                <p className="text-xs text-muted-foreground">Total archived</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Emails</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emails.map((email) => (
                  <div key={email.id} className="flex items-start justify-between p-4 border rounded-lg hover:bg-accent/50 cursor-pointer">
                    <div className="flex items-start space-x-4 flex-1">
                      <Avatar>
                        <AvatarFallback>
                          {email.from.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className={`font-medium ${email.status === 'unread' ? 'font-bold' : ''}`}>
                            {email.from}
                          </p>
                          <span className="text-sm text-muted-foreground">{email.time}</span>
                        </div>
                        <p className={`text-sm ${email.status === 'unread' ? 'font-semibold' : 'text-muted-foreground'}`}>
                          {email.subject}
                        </p>
                        <p className="text-sm text-muted-foreground truncate mt-1">
                          {email.preview}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={
                        email.status === 'unread' ? 'default' :
                        email.status === 'archived' ? 'secondary' : 'outline'
                      }
                    >
                      {email.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
      </div>
    </LayoutWrapper>
  )
}