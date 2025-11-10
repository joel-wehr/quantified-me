# Phoenix Theme Integration Guide

## Overview

Phoenix is a modern Bootstrap 5 admin template that we're integrating into Quantified Me's frontend. This document outlines the integration approach and structure.

## Phoenix Theme Details

**Version**: 1.23.0
**Framework**: Bootstrap 5.3.6
**Build System**: Gulp
**Location**: `C:\Users\joelw\Documents\GitHub\phoenix-theme\phoenix-v1.23.0`

### Key Features
- Modern, responsive admin dashboard
- Multiple dashboard layouts (E-commerce, Project Management, CRM, etc.)
- Rich component library (charts, forms, tables, etc.)
- Dark mode support
- RTL support
- Bootstrap 5.3.6 based

### Dependencies
- Bootstrap 5.3.6
- Chart.js 4.4.9
- Font Awesome 6.7.2
- Feather Icons
- Day.js
- Various other UI libraries

## Integration Strategy

### Approach: Asset Import + React Component Wrapper

We'll take a hybrid approach:

1. **Copy compiled assets** from Phoenix's `public/` directory
2. **Create React components** that wrap Phoenix's HTML structure
3. **Use Phoenix's CSS** directly (already compiled)
4. **Gradually componentize** as needed

This approach allows us to:
- Get started quickly with Phoenix's look and feel
- Maintain Phoenix's styling without rebuilding from SCSS
- Incrementally refactor into proper React components
- Leverage AI agents to accelerate component creation

## Directory Structure

```
frontend/
├── public/
│   ├── assets/              # Phoenix assets (copied)
│   │   ├── css/
│   │   │   ├── theme.min.css
│   │   │   ├── theme-rtl.min.css
│   │   │   └── user.min.css
│   │   ├── js/
│   │   │   ├── config.js
│   │   │   ├── phoenix.js
│   │   │   └── theme.js
│   │   ├── img/
│   │   └── video/
│   └── vendors/             # Third-party libraries (copied)
│       ├── simplebar/
│       ├── chart.js/
│       ├── feather-icons/
│       └── ...
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx           # Top navigation
│   │   │   ├── Sidebar.tsx          # Vertical navigation
│   │   │   ├── Footer.tsx           # Footer
│   │   │   └── MainLayout.tsx       # Main wrapper
│   │   ├── dashboard/
│   │   │   ├── DashboardHeader.tsx  # Dashboard header
│   │   │   ├── MetricCard.tsx       # Metric display cards
│   │   │   ├── ChartWidget.tsx      # Chart components
│   │   │   └── DataTable.tsx        # Data tables
│   │   ├── forms/
│   │   │   ├── DataEntryForm.tsx    # Manual entry
│   │   │   ├── CSVUpload.tsx        # File upload
│   │   │   └── FormComponents.tsx   # Reusable form elements
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       └── Modal.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx            # Main dashboard
│   │   ├── Metrics.tsx              # Metrics view
│   │   ├── Insights.tsx             # AI insights
│   │   ├── Settings.tsx             # User settings
│   │   └── DataImport.tsx           # Import page
│   └── hooks/
│       ├── usePhoenix.ts            # Phoenix utilities
│       └── useTheme.ts              # Theme management
```

## Assets to Copy

### Essential Assets
```
Phoenix public/assets/ → Quantified-Me frontend/public/assets/
├── css/
│   ├── theme.min.css         # Main theme (light mode)
│   ├── theme-rtl.min.css     # RTL version
│   ├── user.min.css          # User customizations
│   └── user-rtl.min.css
├── js/
│   ├── config.js             # Theme configuration
│   ├── phoenix.js            # Main theme JS
│   └── theme.js              # Theme utilities
└── img/
    ├── favicons/
    ├── icons/
    └── spot-illustrations/

Phoenix public/vendors/ → Quantified-Me frontend/public/vendors/
├── simplebar/                # Scrollbar
├── feather-icons/            # Icons (we might replace with React Icons)
└── chart.js/                 # Charts (we'll use react-chartjs-2)
```

### Assets to Skip
- Full vendor libraries (we'll use npm packages instead)
- Multiple dashboard HTML files (we'll create React versions)
- Pug templates (not needed for React)

## React Integration Pattern

### 1. Main Layout Component

```tsx
// src/components/layout/MainLayout.tsx
import { useEffect } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  useEffect(() => {
    // Initialize Phoenix theme
    if (window.phoenix) {
      window.phoenix.utils.docReady(() => {
        window.phoenix.init();
      });
    }
  }, []);

  return (
    <main className="main" id="top">
      <Sidebar />
      <div className="content">
        <Navbar />
        <div className="container-fluid px-0">
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}
```

### 2. Dashboard Component

```tsx
// src/pages/Dashboard.tsx
import MetricCard from '../components/dashboard/MetricCard';
import ChartWidget from '../components/dashboard/ChartWidget';

export default function Dashboard() {
  return (
    <div className="pb-9">
      <div className="row mb-4 g-3">
        <div className="col-12 col-xxl-6">
          <h2 className="mb-2">Health Dashboard</h2>
          <h5 className="text-body-tertiary fw-normal">
            Your personal health metrics at a glance
          </h5>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <MetricCard
          title="Steps Today"
          value="8,547"
          change="+12%"
          icon="activity"
        />
        <MetricCard
          title="Sleep Last Night"
          value="7.5 hrs"
          change="+5%"
          icon="moon"
        />
        {/* More metrics */}
      </div>

      <div className="row g-3">
        <ChartWidget title="Activity Trend" type="line" />
        <ChartWidget title="Sleep Pattern" type="bar" />
      </div>
    </div>
  );
}
```

### 3. Theme Configuration

```tsx
// src/hooks/usePhoenix.ts
import { useEffect } from 'react';

export function usePhoenix() {
  useEffect(() => {
    // Load Phoenix config
    const script = document.createElement('script');
    script.src = '/assets/js/config.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
}

export function useTheme() {
  const setTheme = (theme: 'light' | 'dark' | 'auto') => {
    if (window.config) {
      window.config.set({ theme });
    }
  };

  return { setTheme };
}
```

## Integration Steps

### Phase 1: Basic Setup
1. Copy essential Phoenix assets to `frontend/public/`
2. Update `index.html` with Phoenix structure
3. Create basic layout components (Navbar, Sidebar, Footer)
4. Test theme loading and styling

### Phase 2: Dashboard Components
1. Create main dashboard page
2. Build metric card components
3. Integrate Chart.js for visualizations
4. Add responsive behavior

### Phase 3: Forms & Data Entry
1. Create data entry forms using Phoenix form styles
2. Build CSV upload component
3. Add form validation
4. Connect to backend API

### Phase 4: Additional Pages
1. Insights page with AI-generated content
2. Settings page
3. Data management page
4. User profile page

### Phase 5: Advanced Features
1. Dark mode support
2. Custom theme colors for health metrics
3. Mobile optimizations
4. Accessibility improvements

## Customization Strategy

### Colors
Phoenix uses Bootstrap 5's color system. We can customize:

```css
/* frontend/public/assets/css/custom.css */
:root {
  --phoenix-primary: #your-brand-color;
  --phoenix-secondary: #your-secondary-color;
  /* Health-specific colors */
  --health-activity: #10b981;
  --health-sleep: #3b82f6;
  --health-recovery: #8b5cf6;
  --health-nutrition: #f59e0b;
}
```

### Components
- Use Phoenix's component structure
- Wrap in React components for reusability
- Add custom components as needed
- Maintain Phoenix class naming for consistency

## AI Agent Tasks

We can use AI agents to accelerate component creation:

### Agent Tasks to Create
1. **Frontend Agent**: Convert Phoenix HTML dashboard to React components
2. **Frontend Agent**: Create metric card component library
3. **Frontend Agent**: Build chart widget components
4. **Frontend Agent**: Implement responsive navigation
5. **Frontend Agent**: Add dark mode toggle

Each task should reference Phoenix HTML examples and desired React patterns.

## Testing Strategy

1. **Visual Regression**: Compare with Phoenix demo pages
2. **Responsive Testing**: Test on mobile, tablet, desktop
3. **Cross-browser**: Chrome, Firefox, Safari, Edge
4. **Theme Testing**: Light mode, dark mode, auto
5. **Accessibility**: ARIA labels, keyboard navigation

## Migration from Phoenix Updates

When Phoenix releases updates:

1. Review changelog for breaking changes
2. Copy new compiled assets
3. Test all pages for visual/functional issues
4. Update custom components if needed
5. Update this documentation

## Resources

- **Phoenix Demo**: `C:\Users\joelw\Documents\GitHub\phoenix-theme\phoenix-v1.23.0\public\index.html`
- **Phoenix Docs**: `C:\Users\joelw\Documents\GitHub\phoenix-theme\phoenix-v1.23.0\public\documentation\`
- **Bootstrap 5 Docs**: https://getbootstrap.com/docs/5.3/
- **Chart.js Docs**: https://www.chartjs.org/docs/

## Next Steps

1. Run asset copy script
2. Update `frontend/index.html` with Phoenix structure
3. Create basic layout components
4. Build first dashboard page
5. Test and iterate

---

*This integration approach balances speed (using pre-built Phoenix assets) with flexibility (React components for dynamic health data).*
