# CRM Dashboard Project Prompt Template

## Project Overview
Create a modern, feature-rich CRM (Customer Relationship Management) dashboard using Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui components. The application should be a complete business management system with advanced theming capabilities.

## Tech Stack Requirements
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Theming**: next-themes
- **State Management**: React Context API

## Initial Setup Commands
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --yes
npx shadcn@latest init --yes
npx shadcn@latest add button card input checkbox dialog dropdown-menu badge slider sheet
npm install next-themes lucide-react @radix-ui/react-avatar
```

## Core Features Required

### 1. Navigation System
- **Sidebar Navigation**: Fixed left sidebar with navigation items
  - Dashboard (/)
  - Customers (/customers)
  - Calls (/calls)
  - Emails (/emails)
  - Calendar (/calendar)
  - Analytics (/analytics)
  - Companies (/companies)
  - Settings (/settings)
- **Top Navbar**: Contains search bar, notifications, theme settings, and user profile
- **Active State**: Visual indication of current page in sidebar

### 2. Advanced Theme System
- **Color Schemes**: Light, Dark, System preference
- **Color Themes**: 7 variants (Default, Green, Red, Orange, Violet, Blue, Yellow)
- **Border Radius**: 3 variants (None: 0rem, Small: 0.5rem, Large: 1rem)
- **Theme Persistence**: Save settings to localStorage
- **Live Preview**: Real-time preview of theme changes
- **Slide-out Panel**: Right-sliding sheet for theme settings (not popup/modal)

### 3. Dashboard Pages Content

#### Dashboard (/)
- Stats cards with metrics (customers, revenue, conversion rate, active calls)
- Recent customers list with avatars and status badges
- Activity feed with recent actions and timestamps
- Responsive grid layout

#### Customers (/customers)
- Customer list with search functionality
- Contact information (email, phone)
- Status badges (active, pending, inactive)
- Customer value and last contact date
- Add customer button

#### Calls (/calls)
- Call history with status (completed, missed)
- Call duration and timestamps
- Contact avatars and names
- Call statistics cards (total calls, missed calls, avg duration)
- Make call button

#### Emails (/emails)
- Email inbox with unread indicators
- Email preview with sender, subject, and snippet
- Email statistics (inbox count, sent count, archived count)
- Compose button

#### Calendar (/calendar)
- Upcoming events list
- Event types (meeting, call, demo)
- Attendee counts and time slots
- Calendar statistics
- New event button

#### Analytics (/analytics)
- Performance metrics cards
- Revenue growth, customer acquisition, conversion rates
- Placeholder charts areas
- Activity scores

#### Companies (/companies)
- Company list with industry and employee count
- Revenue information and contact counts
- Company status badges
- Search functionality

#### Settings (/settings)
- Profile settings (name, email, phone)
- Notification preferences with checkboxes
- Security settings (password change)
- Appearance settings integration

### 4. UI/UX Requirements
- **Responsive Design**: Mobile-first approach, works on all screen sizes
- **Custom Scrollbars**: Thin (6px), transparent track, semi-transparent thumb
- **Glass Morphism**: Navbar with backdrop blur effect
- **Consistent Spacing**: Use Tailwind spacing scale
- **Loading States**: Proper loading indicators where needed
- **Hover Effects**: Interactive elements with hover states
- **Accessibility**: Proper ARIA labels and keyboard navigation

### 5. Component Architecture
```
src/
├── app/
│   ├── layout.tsx (Theme providers)
│   ├── page.tsx (Dashboard)
│   ├── customers/page.tsx
│   ├── calls/page.tsx
│   ├── emails/page.tsx
│   ├── calendar/page.tsx
│   ├── analytics/page.tsx
│   ├── companies/page.tsx
│   └── settings/page.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── navbar.tsx
│   ├── sidebar.tsx
│   ├── theme-settings-panel.tsx
│   └── dashboard/
│       ├── stats-cards.tsx
│       ├── recent-customers.tsx
│       └── activity-feed.tsx
├── contexts/
│   └── theme-context.tsx
└── lib/
    └── utils.ts
```

### 6. Theme System Implementation
- **Context Provider**: Custom theme context with settings state
- **CSS Variables**: Dynamic CSS custom properties for themes
- **Theme Classes**: CSS classes for each color theme variant
- **Border Radius Mapping**: Convert variant names to CSS values
- **Persistence**: localStorage integration for settings

### 7. Data Structure Examples
```typescript
// Customer
interface Customer {
  id: number
  name: string
  email: string
  phone?: string
  status: 'active' | 'pending' | 'inactive'
  value: string
  lastContact: string
}

// Theme Settings
interface ThemeSettings {
  colorScheme: 'light' | 'dark' | 'system'
  borderRadius: 'none' | 'small' | 'large'
  colorTheme: 'default' | 'green' | 'red' | 'orange' | 'violet' | 'blue' | 'yellow'
}
```

### 8. Styling Guidelines
- **Color Themes**: Use oklch color space for better color consistency
- **Spacing**: Consistent padding and margins using Tailwind scale
- **Typography**: Clear hierarchy with proper font weights and sizes
- **Borders**: Subtle borders using border-border color
- **Shadows**: Minimal shadows for depth
- **Animations**: Smooth transitions for interactive elements

### 9. Layout Structure
```
┌─────────────────────────────────────┐
│ Sidebar │ Navbar (Search, Settings) │
│         ├─────────────────────────────┤
│         │ Scrollable Content Area    │
│         │                           │
│         │ Page-specific content     │
│         │                           │
└─────────────────────────────────────┘
```

### 10. Key Implementation Details
- **Theme Provider Wrapping**: Wrap app with both next-themes and custom theme provider
- **Sheet Component**: Use shadcn Sheet for slide-out theme panel
- **Avatar Component**: Custom avatar with fallback initials
- **Badge Variants**: Different badge styles for status indicators
- **Responsive Grids**: Use CSS Grid with responsive breakpoints
- **Icon Consistency**: Use Lucide React icons throughout
- **Search Functionality**: Global search bar in navbar
- **Mock Data**: Realistic sample data for all sections

## Success Criteria
- ✅ Complete navigation system with all pages
- ✅ Advanced theme customization with live preview
- ✅ Responsive design that works on all devices
- ✅ Professional UI with consistent design language
- ✅ Smooth animations and interactions
- ✅ Proper TypeScript typing throughout
- ✅ Clean, maintainable code structure
- ✅ Accessibility compliance
- ✅ Theme persistence across sessions
- ✅ Modern, business-appropriate design

## Additional Considerations
- **Performance**: Optimize for fast loading and smooth interactions
- **Scalability**: Component structure should support easy feature additions
- **Maintainability**: Clear separation of concerns and reusable components
- **User Experience**: Intuitive navigation and clear visual feedback
- **Business Context**: Design appropriate for professional CRM usage

This template provides a comprehensive foundation for building a modern, feature-rich CRM dashboard with advanced theming capabilities.