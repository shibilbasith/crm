import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Search, Plus, Mail, Phone } from 'lucide-react'

const customers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567',
    status: 'active',
    value: '$2,400',
    lastContact: '2 days ago'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1 (555) 234-5678',
    status: 'pending',
    value: '$1,800',
    lastContact: '1 week ago'
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@example.com',
    phone: '+1 (555) 345-6789',
    status: 'active',
    value: '$3,200',
    lastContact: '3 days ago'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@example.com',
    phone: '+1 (555) 456-7890',
    status: 'inactive',
    value: '$950',
    lastContact: '2 weeks ago'
  }
]

export default function CustomersPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
              <p className="text-muted-foreground">
                Manage your customer relationships and contacts.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Customer
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <div className="relative w-full sm:flex-1 sm:max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-8" />
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Customers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div key={customer.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg space-y-3 sm:space-y-0">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarFallback>
                          {customer.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium">{customer.name}</p>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center">
                            <Mail className="mr-1 h-3 w-3" />
                            <span className="truncate">{customer.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone className="mr-1 h-3 w-3" />
                            {customer.phone}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-4">
                      <div className="text-left sm:text-right">
                        <p className="font-medium">{customer.value}</p>
                        <p className="text-sm text-muted-foreground">Last contact: {customer.lastContact}</p>
                      </div>
                      <Badge 
                        variant={
                          customer.status === 'active' ? 'default' :
                          customer.status === 'pending' ? 'secondary' : 'outline'
                        }
                      >
                        {customer.status}
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