'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { AnimatedContainer } from '@/components/animated-container'
import { useEffect, useState } from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
  Legend
} from 'recharts'

// Dummy data for different charts
const areaChartData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  { month: 'Mar', revenue: 2000, expenses: 9800 },
  { month: 'Apr', revenue: 2780, expenses: 3908 },
  { month: 'May', revenue: 1890, expenses: 4800 },
  { month: 'Jun', revenue: 2390, expenses: 3800 },
  { month: 'Jul', revenue: 3490, expenses: 4300 }
]

const barChartData = [
  { name: 'Mon', sales: 120, leads: 80 },
  { name: 'Tue', sales: 190, leads: 130 },
  { name: 'Wed', sales: 300, leads: 200 },
  { name: 'Thu', sales: 500, leads: 280 },
  { name: 'Fri', sales: 200, leads: 180 },
  { name: 'Sat', sales: 280, leads: 230 },
  { name: 'Sun', sales: 150, leads: 120 }
]

const lineChartData = [
  { time: '00:00', users: 20 },
  { time: '04:00', users: 15 },
  { time: '08:00', users: 45 },
  { time: '12:00', users: 80 },
  { time: '16:00', users: 65 },
  { time: '20:00', users: 40 },
  { time: '24:00', users: 25 }
]

// Pie chart data will be created dynamically in the component

const radarChartData = [
  { subject: 'Sales', A: 120, B: 110, fullMark: 150 },
  { subject: 'Marketing', A: 98, B: 130, fullMark: 150 },
  { subject: 'Development', A: 86, B: 130, fullMark: 150 },
  { subject: 'Support', A: 99, B: 100, fullMark: 150 },
  { subject: 'Design', A: 85, B: 90, fullMark: 150 },
  { subject: 'Research', A: 65, B: 85, fullMark: 150 }
]

const radialChartData = [
  { name: 'Completed', value: 75, fill: '#3b82f6' },
  { name: 'In Progress', value: 60, fill: '#60a5fa' },
  { name: 'Pending', value: 40, fill: '#93c5fd' }
]

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-1))'
  },
  expenses: {
    label: 'Expenses',
    color: 'hsl(var(--chart-2))'
  },
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))'
  },
  leads: {
    label: 'Leads',
    color: 'hsl(var(--chart-2))'
  },
  users: {
    label: 'Users',
    color: 'hsl(var(--chart-1))'
  },
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))'
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))'
  },
  tablet: {
    label: 'Tablet',
    color: 'hsl(var(--chart-3))'
  },
  completed: {
    label: 'Completed',
    color: 'hsl(var(--chart-1))'
  },
  inProgress: {
    label: 'In Progress',
    color: 'hsl(var(--chart-2))'
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--chart-3))'
  }
} satisfies ChartConfig

function useThemeColors() {
  const [colors, setColors] = useState({
    primary: '#3b82f6',
    secondary: '#60a5fa',
    tertiary: '#93c5fd'
  })

  useEffect(() => {
    const updateColors = () => {
      const root = document.documentElement

      // Define theme color mappings
      const themeColors = {
        'theme-red': {
          primary: '#ef4444',   // Red-500
          secondary: '#f87171', // Red-400
          tertiary: '#fca5a5'   // Red-300
        },
        'theme-green': {
          primary: '#22c55e',   // Green-500
          secondary: '#4ade80', // Green-400
          tertiary: '#86efac'   // Green-300
        },
        'theme-orange': {
          primary: '#f97316',   // Orange-500
          secondary: '#fb923c', // Orange-400
          tertiary: '#fdba74'   // Orange-300
        },
        'theme-violet': {
          primary: '#8b5cf6',   // Violet-500
          secondary: '#a78bfa', // Violet-400
          tertiary: '#c4b5fd'   // Violet-300
        },
        'theme-blue': {
          primary: '#3b82f6',   // Blue-500
          secondary: '#60a5fa', // Blue-400
          tertiary: '#93c5fd'   // Blue-300
        },
        'theme-yellow': {
          primary: '#eab308',   // Yellow-500
          secondary: '#facc15', // Yellow-400
          tertiary: '#fde047'   // Yellow-300
        }
      }

      // Check which theme is active
      let activeTheme = null
      for (const theme of Object.keys(themeColors)) {
        if (root.classList.contains(theme)) {
          activeTheme = theme
          break
        }
      }

      if (activeTheme && themeColors[activeTheme]) {
        setColors(themeColors[activeTheme])
      } else {
        // Fallback to blue theme if no theme is detected
        setColors(themeColors['theme-blue'])
      }
    }

    updateColors()

    // Listen for theme changes
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return colors
}

export function DashboardCharts() {
  const themeColors = useThemeColors()

  // Create pie chart data with dynamic colors
  const pieChartData = [
    { name: 'Desktop', value: 45, fill: themeColors.primary },
    { name: 'Mobile', value: 35, fill: themeColors.secondary },
    { name: 'Tablet', value: 20, fill: themeColors.tertiary }
  ]

  // Create radial chart data with dynamic colors
  const dynamicRadialChartData = [
    { name: 'Completed', value: 75, fill: themeColors.primary },
    { name: 'In Progress', value: 60, fill: themeColors.secondary },
    { name: 'Pending', value: 40, fill: themeColors.tertiary }
  ]

  return (
    <AnimatedContainer className="space-y-6" delay={0.2}>
      {/* Area Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue vs Expenses</CardTitle>
          <CardDescription>Monthly comparison of revenue and expenses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaChartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColors.secondary} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={themeColors.secondary} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                    color: 'hsl(var(--foreground))'
                  }}
                  formatter={(value, name) => [`$${value.toLocaleString()}`, name === 'revenue' ? 'Revenue' : 'Expenses']}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke={themeColors.primary}
                  fillOpacity={1}
                  fill="url(#colorRevenue)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stackId="1"
                  stroke={themeColors.secondary}
                  fillOpacity={1}
                  fill="url(#colorExpenses)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Performance</CardTitle>
            <CardDescription>Sales and leads by day of week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value, name) => [value, name === 'sales' ? 'Sales' : 'Leads']}
                  />
                  <Bar dataKey="sales" fill={themeColors.primary} />
                  <Bar dataKey="leads" fill={themeColors.secondary} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card>
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Active users throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData}>
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value) => [value, 'Active Users']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke={themeColors.primary}
                    strokeWidth={2}
                    dot={{ fill: themeColors.primary }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Device Usage</CardTitle>
            <CardDescription>Traffic by device type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto aspect-square max-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <Pie
                    data={pieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Team Performance</CardTitle>
            <CardDescription>Department comparison</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto aspect-square max-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarChartData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value, name) => [value, name === 'A' ? 'Team A' : 'Team B']}
                  />
                  <Legend />
                  <Radar
                    name="Team A"
                    dataKey="A"
                    stroke={themeColors.primary}
                    fill={themeColors.primary}
                    fillOpacity={0.6}
                  />
                  <Radar
                    name="Team B"
                    dataKey="B"
                    stroke={themeColors.secondary}
                    fill={themeColors.secondary}
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Radial Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Project Status</CardTitle>
            <CardDescription>Task completion rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mx-auto aspect-square max-h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart data={dynamicRadialChartData} cx="50%" cy="50%" innerRadius="20%" outerRadius="90%">
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                      color: 'hsl(var(--foreground))'
                    }}
                    formatter={(value, name) => [`${value}%`, name]}
                  />
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff' }}
                    background
                    clockWise
                    dataKey="value"
                  >
                    {dynamicRadialChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </RadialBar>
                </RadialBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedContainer>
  )
}