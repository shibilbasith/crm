# Next.js Dashboard Template with Dynamic Charts & Theming

A modern, responsive dashboard template built with Next.js 15, featuring dynamic theming, interactive charts, and a comprehensive component system.

## 🚀 Features

- **Dynamic Theme System** - 6 color themes (Red, Green, Orange, Violet, Blue, Yellow) with light/dark mode
- **Interactive Charts** - Area, Bar, Line, Pie, Radar, and Radial charts with tooltips
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Modern UI Components** - Built with shadcn/ui and Tailwind CSS
- **Authentication Ready** - Auth structure with sign-in/sign-up pages
- **Dashboard Layout** - Sidebar navigation with animated components
- **TypeScript** - Full type safety throughout the application

## 📦 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts with custom theming
- **Icons**: Lucide React
- **Animations**: Custom CSS animations
- **TypeScript**: Full type coverage
- **Database Ready**: Prisma schema included

## 🎨 Theme System

### Color Themes
```css
/* Available themes */
.theme-red { --primary: oklch(0.637 0.237 25.331); }
.theme-green { --primary: oklch(0.496 0.162 142.495); }
.theme-orange { --primary: oklch(0.705 0.169 70.67); }
.theme-violet { --primary: oklch(0.569 0.186 296.848); }
.theme-blue { --primary: oklch(0.578 0.148 233.339); }
.theme-yellow { --primary: oklch(0.832 0.173 85.109); }
```

### Dynamic Chart Colors
Charts automatically adapt to theme changes with proper color mappings:
- **Primary**: Main chart elements
- **Secondary**: Secondary data series
- **Tertiary**: Additional data points

## 📊 Chart Components

### Supported Chart Types
1. **Area Chart** - Revenue vs Expenses with gradients
2. **Bar Chart** - Weekly performance metrics
3. **Line Chart** - User activity over time
4. **Pie Chart** - Device usage distribution
5. **Radar Chart** - Team performance comparison
6. **Radial Chart** - Project completion status

### Chart Features
- **Interactive Tooltips** - Hover to see detailed data
- **Theme-Aware Colors** - Automatically match selected theme
- **Responsive Design** - Adapt to different screen sizes
- **Smooth Animations** - Native recharts animations

## 🏗️ Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── analytics/
│   ├── calendar/
│   ├── calls/
│   ├── companies/
│   ├── customers/
│   ├── emails/
│   ├── settings/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── dashboard/
│   │   ├── charts.tsx
│   │   ├── stats-cards.tsx
│   │   ├── recent-customers.tsx
│   │   └── activity-feed.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── chart.tsx
│   │   └── [other-ui-components]
│   ├── animated-container.tsx
│   ├── layout-wrapper.tsx
│   ├── navbar.tsx
│   └── sidebar.tsx
├── contexts/
├── lib/
└── middleware.ts
```

## 🎯 Key Components

### 1. Dynamic Charts Component
```typescript
// Dynamic theme-aware charts
function useThemeColors() {
  // Detects active theme and returns appropriate colors
  // Supports all 6 theme variants
}

export function DashboardCharts() {
  const themeColors = useThemeColors()
  // Charts automatically use theme colors
}
```

### 2. Theme System
```css
/* CSS Variables for theming */
:root {
  --primary: oklch(0.205 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
}
```

### 3. Responsive Layout
```typescript
// Layout wrapper with sidebar and mobile support
export function LayoutWrapper({ children }) {
  // Responsive sidebar navigation
  // Mobile-friendly design
  // Theme settings panel
}
```

## 🚀 Getting Started

### 1. Installation
```bash
npx create-next-app@latest dashboard-template
cd dashboard-template
npm install
```

### 2. Dependencies
```bash
# Core dependencies
npm install recharts lucide-react

# shadcn/ui components
npx shadcn@latest add card button chart tooltip badge
npx shadcn@latest add dropdown-menu sheet dialog input label
```

### 3. Environment Setup
```bash
# Create .env file
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-secret"
```

### 4. Run Development Server
```bash
npm run dev
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Layout Adaptations
- **Mobile**: Collapsible sidebar, stacked charts
- **Tablet**: Grid layouts, responsive charts
- **Desktop**: Full sidebar, multi-column layouts

## 🎨 Customization

### Adding New Themes
1. Add theme class to `globals.css`
2. Update `useThemeColors` hook
3. Add theme option to settings

### Creating New Charts
1. Import recharts components
2. Use `useThemeColors` hook
3. Add responsive container
4. Include tooltips and styling

### Custom Components
- Follow shadcn/ui patterns
- Use Tailwind CSS classes
- Implement proper TypeScript types

## 📊 Chart Data Structure

### Area Chart Data
```typescript
const areaChartData = [
  { month: 'Jan', revenue: 4000, expenses: 2400 },
  { month: 'Feb', revenue: 3000, expenses: 1398 },
  // ...
]
```

### Bar Chart Data
```typescript
const barChartData = [
  { name: 'Mon', sales: 120, leads: 80 },
  { name: 'Tue', sales: 190, leads: 130 },
  // ...
]
```

## 🔧 Configuration

### Tailwind Config
```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Custom color system
      }
    }
  }
}
```

### Next.js Config
```javascript
// next.config.js
module.exports = {
  experimental: {
    appDir: true
  }
}
```

## 🎯 Best Practices

### Component Structure
- Use TypeScript for all components
- Implement proper error boundaries
- Follow React best practices
- Use custom hooks for logic

### Styling Guidelines
- Use Tailwind CSS utilities
- Implement consistent spacing
- Follow design system patterns
- Ensure accessibility compliance

### Performance Optimization
- Lazy load chart components
- Optimize image assets
- Use React.memo for expensive components
- Implement proper caching strategies

## 📚 Usage Examples

### Basic Dashboard Page
```typescript
export default function Dashboard() {
  return (
    <LayoutWrapper>
      <div className="p-6 space-y-6">
        <StatsCards />
        <DashboardCharts />
        <div className="grid gap-6 lg:grid-cols-2">
          <RecentCustomers />
          <ActivityFeed />
        </div>
      </div>
    </LayoutWrapper>
  )
}
```

### Custom Chart Implementation
```typescript
function CustomChart() {
  const themeColors = useThemeColors()
  
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '8px'
        }} />
        <Bar dataKey="value" fill={themeColors.primary} />
      </BarChart>
    </ResponsiveContainer>
  )
}
```

## 🔒 Authentication Structure

### Pages
- `/sign-in` - Login page
- `/sign-up` - Registration page
- Protected routes with middleware

### Components
- Auth forms with validation
- Session management
- Route protection

## 📱 Mobile Optimization

### Features
- Touch-friendly interactions
- Responsive chart sizing
- Mobile navigation patterns
- Optimized performance

### Implementation
- CSS Grid and Flexbox
- Responsive breakpoints
- Touch gesture support
- Mobile-first approach

## 🎨 Animation System

### Components
- Animated containers with stagger effects
- Smooth transitions between themes
- Chart animation on load
- Interactive hover states

### Implementation
```typescript
// Animated container with stagger
<AnimatedContainer 
  className="grid gap-4" 
  delay={0.1} 
  staggerChildren={0.1}
>
  {children}
</AnimatedContainer>
```

## 🚀 Deployment

### Build Process
```bash
npm run build
npm start
```

### Environment Variables
- Database configuration
- Authentication secrets
- API endpoints

### Platform Support
- Vercel (recommended)
- Netlify
- Docker deployment
- Traditional hosting

## 📈 Performance Metrics

### Lighthouse Scores
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 90+

### Optimization Features
- Code splitting
- Image optimization
- CSS optimization
- Bundle analysis

## 🛠️ Development Tools

### Recommended Extensions
- TypeScript
- Tailwind CSS IntelliSense
- ES7+ React/Redux/React-Native snippets
- Prettier

### Scripts
```json
{
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint"
}
```

## 📄 License

MIT License - feel free to use this template for personal and commercial projects.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

---

This template provides a solid foundation for building modern dashboard applications with Next.js, featuring dynamic theming, interactive charts, and responsive design patterns.