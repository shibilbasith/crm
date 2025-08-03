import { LayoutWrapper } from '@/components/layout-wrapper'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Settings, User, Bell, Shield, Palette } from 'lucide-react'

export default function SettingsPage() {
  return (
    <LayoutWrapper>
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
              <p className="text-muted-foreground">
                Manage your account settings and preferences.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input placeholder="Enter your full name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input placeholder="Enter your email" defaultValue="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input placeholder="Enter your phone" defaultValue="+1 (555) 123-4567" />
                </div>
                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="email-notifications" defaultChecked />
                  <label htmlFor="email-notifications" className="text-sm">
                    Email notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="push-notifications" defaultChecked />
                  <label htmlFor="push-notifications" className="text-sm">
                    Push notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="sms-notifications" />
                  <label htmlFor="sms-notifications" className="text-sm">
                    SMS notifications
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="marketing-emails" />
                  <label htmlFor="marketing-emails" className="text-sm">
                    Marketing emails
                  </label>
                </div>
                <Button>Update Preferences</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Password</label>
                  <Input type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">New Password</label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Confirm Password</label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button>Change Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Customize your dashboard appearance using the theme settings panel.
                </p>
                <div className="flex items-center space-x-2">
                  <Checkbox id="compact-mode" />
                  <label htmlFor="compact-mode" className="text-sm">
                    Compact mode
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="animations" defaultChecked />
                  <label htmlFor="animations" className="text-sm">
                    Enable animations
                  </label>
                </div>
                <Button variant="outline">
                  <Settings className="mr-2 h-4 w-4" />
                  Open Theme Settings
                </Button>
              </CardContent>
            </Card>
          </div>
      </div>
    </LayoutWrapper>
  )
}