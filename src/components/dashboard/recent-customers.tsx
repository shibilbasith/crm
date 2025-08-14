import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { AnimatedContainer } from '@/components/animated-container'

const customers = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john@example.com',
    status: 'active',
    value: '$2,400'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    status: 'pending',
    value: '$1,800'
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike@example.com',
    status: 'active',
    value: '$3,200'
  },
  {
    id: 4,
    name: 'Emily Brown',
    email: 'emily@example.com',
    status: 'inactive',
    value: '$950'
  },
  {
    id: 5,
    name: 'David Wilson',
    email: 'david@example.com',
    status: 'active',
    value: '$2,100'
  }
]

export function RecentCustomers() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Customers</CardTitle>
      </CardHeader>
      <CardContent>
        <AnimatedContainer 
          className="space-y-4"
          delay={0.3}
          staggerChildren={0.08}
          direction="left"
        >
          {customers.map((customer) => (
            <div key={customer.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarFallback>
                  {customer.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  {customer.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {customer.email}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant={
                    customer.status === 'active' ? 'default' :
                    customer.status === 'pending' ? 'secondary' : 'outline'
                  }
                >
                  {customer.status}
                </Badge>
                <div className="text-sm font-medium">
                  {customer.value}
                </div>
              </div>
            </div>
          ))}
        </AnimatedContainer>
      </CardContent>
    </Card>
  )
}