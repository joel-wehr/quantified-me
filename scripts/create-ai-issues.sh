#!/bin/bash

# Create comprehensive AI development issues for Quantified Me
# This script creates all Phase 1 tasks that can be handled by AI agents

REPO="joel-wehr/quantified-me"
PROJECT_NUMBER=3

echo "Creating AI Development Issues for Quantified Me"
echo "=================================================="
echo ""

# Phase 1: Foundation - High Priority Tasks

echo "Creating Phase 1 Foundation issues..."

# Issue 1: Router Setup
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Add React Router and create route configuration" \
  --label "agent:frontend,priority:high,phase:1" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Set up React Router for navigation and create route configuration for all pages in the application.

## Requirements
- Install react-router-dom
- Create route configuration in src/router.tsx
- Add routes for:
  - / (Dashboard)
  - /metrics/activity
  - /metrics/sleep
  - /metrics/recovery
  - /metrics/custom
  - /import (Data Import)
  - /insights (AI Insights)
  - /settings
  - /docs
- Implement 404 Not Found page
- Add route guards for future authentication
- Update navigation components to use react-router Link

## Acceptance Criteria
- [ ] react-router-dom installed
- [ ] Route configuration created
- [ ] All routes working and accessible
- [ ] Navigation links use react-router Link
- [ ] 404 page displays for unknown routes
- [ ] No TypeScript errors
- [ ] Routes render within MainLayout

## Context
Related files:
- frontend/src/App.tsx
- frontend/src/components/layout/Sidebar.tsx
- frontend/src/components/layout/Navbar.tsx
- frontend/src/pages/Dashboard.tsx

## Testing Requirements
- [ ] Unit tests for route configuration
- [ ] Navigation between pages works
- [ ] Back/forward browser buttons work"

# Issue 2: Chart.js Integration
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Integrate Chart.js for dashboard visualizations" \
  --label "agent:frontend,priority:high,phase:1" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Add Chart.js integration to display health metric trends on the dashboard with proper Phoenix theme styling.

## Requirements
- Install react-chartjs-2 and chart.js
- Create ChartWidget.tsx component in frontend/src/components/dashboard/
- Implement line chart for activity trends (7-day view)
- Implement bar chart for sleep patterns
- Use Phoenix theme colors from custom.css
- Make charts responsive
- Add loading states and error handling
- Add empty state for no data

## Acceptance Criteria
- [ ] Libraries installed (react-chartjs-2@^5.2.0, chart.js@^4.4.1)
- [ ] ChartWidget component created with TypeScript
- [ ] Line chart displays with sample data
- [ ] Bar chart displays with sample data
- [ ] Charts use Phoenix theme colors
- [ ] Charts are responsive (mobile, tablet, desktop)
- [ ] Loading state implemented
- [ ] Empty state implemented
- [ ] No console errors or warnings
- [ ] Component documented with JSDoc

## Context
Related files:
- frontend/src/pages/Dashboard.tsx (line 84-100: chart container)
- frontend/public/assets/css/custom.css (health metric colors)
- frontend/src/components/dashboard/MetricCard.tsx (for styling reference)

Phoenix theme colors to use:
- Activity: #10b981
- Sleep: #3b82f6
- Recovery: #8b5cf6
- Nutrition: #f59e0b

## Sample Data Structure
\`\`\`typescript
interface ChartData {
  labels: string[]; // ['Mon', 'Tue', 'Wed', ...]
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}
\`\`\`

## Testing Requirements
- [ ] Unit tests for ChartWidget component
- [ ] Test with empty data
- [ ] Test with real data
- [ ] Visual regression test"

# Issue 3: Backend API Endpoints
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Create REST API endpoints for health metrics CRUD" \
  --label "agent:backend,priority:high,phase:1" \
  --body "## Agent Type
Backend Developer Agent

## Task Description
Implement RESTful API endpoints for managing health metrics with proper validation and error handling.

## Requirements
- Create routes file: backend/src/routes/metrics.ts
- Implement endpoints:
  - POST /api/v1/metrics - Create new metric
  - GET /api/v1/metrics - List metrics (with pagination and filters)
  - GET /api/v1/metrics/:id - Get single metric
  - PUT /api/v1/metrics/:id - Update metric
  - DELETE /api/v1/metrics/:id - Delete metric
- Add Zod validation schemas
- Implement proper error handling
- Add rate limiting (100 requests/hour per IP)
- Return consistent JSON responses

## Validation Schema (Zod)
\`\`\`typescript
{
  metric_type: 'activity' | 'sleep' | 'recovery' | 'nutrition' | 'custom',
  metric_name: string (required, max 100 chars),
  value: number (required),
  unit: string (required, max 20 chars),
  timestamp: ISO 8601 datetime (required),
  source: 'manual' | 'import' | 'api',
  metadata: object (optional)
}
\`\`\`

## Response Format
\`\`\`json
{
  \"success\": true,
  \"data\": {...},
  \"error\": null
}
\`\`\`

## Acceptance Criteria
- [ ] Routes file created
- [ ] All 5 endpoints implemented
- [ ] Zod validation working
- [ ] Rate limiting configured
- [ ] Error handling implemented
- [ ] OpenAPI/Swagger documentation
- [ ] Unit tests >80% coverage
- [ ] Integration tests for all endpoints
- [ ] No security vulnerabilities

## Context
Related files:
- backend/src/index.ts (main Express app)
- ARCHITECTURE.md (line 215-234: health_metrics schema)

Database schema:
- Table: health_metrics
- See ARCHITECTURE.md for full schema

## Testing Requirements
- [ ] Unit tests for validation
- [ ] Integration tests for endpoints
- [ ] Test rate limiting
- [ ] Test error cases
- [ ] Test pagination"

# Issue 4: Database Setup
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Set up PostgreSQL database with initial migrations" \
  --label "agent:backend,priority:high,phase:1" \
  --body "## Agent Type
Backend Developer Agent

## Task Description
Set up PostgreSQL database connection and create initial database migrations for the core schema.

## Requirements
- Install database dependencies (pg, drizzle-orm or prisma)
- Create database connection module
- Create migration files for:
  - users table
  - health_metrics table
  - data_sources table
  - ai_insights table
- Add seed data for development
- Configure connection pooling
- Add database health check endpoint

## Database Schema

### users table
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP,
  preferences JSONB
);
\`\`\`

### health_metrics table
\`\`\`sql
CREATE TABLE health_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  metric_type VARCHAR(50) NOT NULL,
  metric_name VARCHAR(100) NOT NULL,
  value NUMERIC NOT NULL,
  unit VARCHAR(20) NOT NULL,
  timestamp TIMESTAMP NOT NULL,
  source VARCHAR(20) NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_user_timestamp (user_id, timestamp),
  INDEX idx_metric_type (metric_type)
);
\`\`\`

## Acceptance Criteria
- [ ] Database dependencies installed
- [ ] Connection module created
- [ ] All migrations created
- [ ] Migrations run successfully
- [ ] Seed data created
- [ ] Connection pooling configured
- [ ] Health check endpoint works
- [ ] Documentation updated
- [ ] No security issues (no plaintext passwords)

## Context
See ARCHITECTURE.md lines 215-260 for full schema details

## Environment Variables
Add to .env:
- DATABASE_URL
- DATABASE_POOL_MIN
- DATABASE_POOL_MAX

## Testing Requirements
- [ ] Connection test
- [ ] Migration test
- [ ] Rollback test
- [ ] Seed data test"

# Issue 5: Authentication System
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Implement AWS Cognito authentication" \
  --label "agent:backend,priority:high,phase:1" \
  --body "## Agent Type
Backend Developer Agent

## Task Description
Integrate AWS Cognito for user authentication and create login/register endpoints.

## Requirements
- Install AWS Cognito SDK (@aws-sdk/client-cognito-identity-provider)
- Create auth service module
- Implement endpoints:
  - POST /api/v1/auth/register
  - POST /api/v1/auth/login
  - POST /api/v1/auth/refresh
  - POST /api/v1/auth/logout
  - GET /api/v1/auth/me (get current user)
- Add JWT token validation middleware
- Implement password requirements (min 8 chars, uppercase, lowercase, number)
- Add rate limiting on auth endpoints (5 attempts per minute)

## Acceptance Criteria
- [ ] Cognito SDK installed
- [ ] Auth service created
- [ ] All 5 endpoints implemented
- [ ] JWT middleware working
- [ ] Password validation enforced
- [ ] Rate limiting configured
- [ ] Secure cookie handling
- [ ] CSRF protection added
- [ ] Unit tests >80% coverage
- [ ] Integration tests for auth flow
- [ ] Security audit passed

## Environment Variables
\`\`\`
COGNITO_USER_POOL_ID=
COGNITO_CLIENT_ID=
JWT_SECRET=
JWT_EXPIRES_IN=7d
\`\`\`

## Context
See ARCHITECTURE.md for authentication architecture

## Security Requirements
- [ ] Passwords never logged
- [ ] Tokens stored securely
- [ ] HTTPS only for auth endpoints
- [ ] No SQL injection vulnerabilities
- [ ] XSS protection enabled

## Testing Requirements
- [ ] Test registration flow
- [ ] Test login flow
- [ ] Test token refresh
- [ ] Test invalid credentials
- [ ] Test rate limiting"

# Issue 6: Login/Register Pages
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Create authentication pages (login, register)" \
  --label "agent:frontend,priority:high,phase:1" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Build login and registration pages using Phoenix theme styling with form validation.

## Requirements
- Create pages/Login.tsx
- Create pages/Register.tsx
- Use Phoenix form components and styling
- Add client-side validation (email format, password strength)
- Show validation errors inline
- Add loading states during submission
- Add success/error messages
- Implement password visibility toggle
- Add \"Forgot Password\" link (placeholder for now)
- Make responsive for mobile

## Form Fields

### Login
- Email (required, email format)
- Password (required, min 8 chars)
- Remember Me (checkbox)
- Submit button

### Register
- Email (required, email format)
- Password (required, min 8 chars, strength indicator)
- Confirm Password (must match)
- Terms & Conditions (checkbox, required)
- Submit button

## Acceptance Criteria
- [ ] Login page created with Phoenix styling
- [ ] Register page created with Phoenix styling
- [ ] Form validation working
- [ ] Loading states implemented
- [ ] Error handling implemented
- [ ] Password strength indicator on register
- [ ] Responsive on mobile/tablet/desktop
- [ ] Accessible (ARIA labels, keyboard navigation)
- [ ] TypeScript types defined
- [ ] Connected to backend auth API

## Context
Phoenix theme reference:
- Forms: See Phoenix demo HTML
- Colors: /frontend/public/assets/css/theme.min.css
- Components: /frontend/src/components/layout/

## Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter
- At least 1 lowercase letter
- At least 1 number

## Testing Requirements
- [ ] Unit tests for validation logic
- [ ] E2E tests for login flow
- [ ] E2E tests for register flow
- [ ] Test error states
- [ ] Test accessibility"

echo ""
echo "✅ Phase 1 issues created successfully!"
echo ""
echo "Next: Run this script to create Phase 2 issues:"
echo "  ./scripts/create-ai-issues-phase2.sh"
