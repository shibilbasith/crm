import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Building2, Plus, Search, Users, DollarSign } from 'lucide-react'

const companies = [
  {
    id: 1,
    name: 'Acme Corporation',
    industry: 'Technology',
    employees: 250,
    revenue: '$2.5M',
    status: 'active',
    contacts: 5
  },
  {
    id: 2,
    name: 'Global Solutions Inc',
    industry: 'Consulting',
    employees: 150,
    revenue: '$1.8M',
    status: 'prospect',
    contacts: 3
  },
  {
    id: 3,
    name: 'Tech Innovations Ltd',
    industry: 'Software',
    employees: 75,
    revenue: '$950K',
    status: 'active',
    contacts: 8
  },
  {
    id: 4,
    name: 'Manufacturing Co',
    industry: 'Manufacturing',
    employees: 500,
    revenue: '$5.2M',
    status: 'inactive',
    contacts: 2
  }
]

export default function CompaniesPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
              <p className="text-muted-foreground">
                Manage your business relationships and company accounts.
              </p>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search companies..." className="pl-8" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
                <Building2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">68% of total</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.4M</div>
                <p className="text-xs text-muted-foreground">Combined revenue</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Companies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.map((company) => (
                  <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>{company.industry}</span>
                          <span>•</span>
                          <span>{company.employees} employees</span>
                          <span>•</span>
                          <span>{company.contacts} contacts</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="font-medium">{company.revenue}</p>
                        <p className="text-sm text-muted-foreground">Annual revenue</p>
                      </div>
                      <Badge 
                        variant={
                          company.status === 'active' ? 'default' :
                          company.status === 'prospect' ? 'secondary' : 'outline'
                        }
                      >
                        {company.status}
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