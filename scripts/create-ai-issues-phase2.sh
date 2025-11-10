#!/bin/bash

# Create Phase 2 AI development issues for Quantified Me
# Core Features - Data Entry and Visualization

REPO="joel-wehr/quantified-me"

echo "Creating Phase 2: Core Features issues..."
echo "==========================================="
echo ""

# Issue 7: Manual Data Entry Form
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Build manual data entry form component" \
  --label "agent:frontend,priority:high,phase:2" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Create a comprehensive manual data entry form for adding health metrics with validation and Phoenix styling.

## Requirements
- Create components/forms/DataEntryForm.tsx
- Support all metric types (activity, sleep, recovery, nutrition, custom)
- Add date/time picker (use flatpickr or similar)
- Implement form validation with Zod
- Add unit selector dropdown
- Support custom metric names
- Add metadata field (optional JSON)
- Show success/error notifications
- Add form reset after successful submission
- Make mobile-friendly

## Form Fields
- Metric Type (dropdown: Activity, Sleep, Recovery, Nutrition, Custom)
- Metric Name (text input, autocomplete suggestions)
- Value (number input, validate positive)
- Unit (dropdown based on metric type)
- Date/Time (datetime picker)
- Notes (textarea, optional)
- Source (auto-set to 'manual')

## Acceptance Criteria
- [ ] Component created with TypeScript
- [ ] All form fields implemented
- [ ] Validation working
- [ ] Connected to POST /api/v1/metrics endpoint
- [ ] Success/error notifications
- [ ] Form resets after submission
- [ ] Mobile responsive
- [ ] Accessible (ARIA, keyboard nav)
- [ ] Unit tests for validation
- [ ] E2E test for submission flow

## Context
API endpoint: backend/src/routes/metrics.ts
Phoenix forms: Use Phoenix theme form classes"

# Issue 8: CSV Import
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Implement CSV file upload and parsing" \
  --label "agent:frontend,agent:backend,priority:high,phase:2" \
  --body "## Agent Type
Frontend + Backend Developer Agents

## Task Description
Build CSV upload functionality for bulk health data import with parsing, validation, and preview.

## Frontend Requirements
- Create components/forms/CSVUpload.tsx
- Add drag-and-drop file upload
- Show file parsing preview (first 10 rows)
- Add column mapping interface
- Validate data before submission
- Show progress bar during upload
- Handle errors gracefully
- Support files up to 10MB

## Backend Requirements
- Create POST /api/v1/import/csv endpoint
- Parse CSV using csv-parser or papaparse
- Validate each row
- Bulk insert to database (batch of 100)
- Return import summary (success/failed counts)
- Add rate limiting (10 files per hour)

## CSV Format
\`\`\`csv
date,time,metric_type,metric_name,value,unit,notes
2025-01-01,08:00,activity,steps,8547,steps,Morning walk
2025-01-01,23:00,sleep,duration,7.5,hours,Good sleep
\`\`\`

## Acceptance Criteria
Frontend:
- [ ] Upload component created
- [ ] Drag-and-drop working
- [ ] Preview displays correctly
- [ ] Column mapping interface
- [ ] Progress indicator
- [ ] Error handling

Backend:
- [ ] CSV endpoint created
- [ ] Parsing working
- [ ] Validation implemented
- [ ] Bulk insert optimized
- [ ] Import summary returned
- [ ] Tests >80% coverage"

# Issue 9: Data Normalization Engine
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Build data normalization and unit conversion system" \
  --label "agent:backend,priority:medium,phase:2" \
  --body "## Agent Type
Backend Developer Agent

## Task Description
Create a data normalization service that converts different data formats and units into a standardized schema.

## Requirements
- Create services/normalization.ts
- Support multiple date/time formats
- Convert units (miles to km, lbs to kg, etc.)
- Normalize metric names (\"Step Count\" -> \"steps\")
- Handle missing data gracefully
- Validate numeric ranges
- Add logging for normalization actions

## Supported Conversions
**Distance:**
- miles ↔ kilometers
- feet ↔ meters

**Weight:**
- lbs ↔ kg
- oz ↔ grams

**Time:**
- 12-hour ↔ 24-hour
- seconds ↔ minutes ↔ hours

**Date Formats:**
- MM/DD/YYYY
- DD/MM/YYYY
- YYYY-MM-DD
- ISO 8601

## Acceptance Criteria
- [ ] Normalization service created
- [ ] All conversions implemented
- [ ] Unit tests for each conversion
- [ ] Edge cases handled (null, invalid)
- [ ] Logging implemented
- [ ] Documentation with examples
- [ ] Performance optimized (handle 1000+ records)"

# Issue 10: Dashboard Data Integration
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Connect dashboard to real API data" \
  --label "agent:frontend,priority:high,phase:2" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Replace mock data in dashboard with real API calls and add loading/error states.

## Requirements
- Create api/metrics.ts API client
- Use React Query or SWR for data fetching
- Add loading skeletons for metric cards
- Add error boundaries
- Implement data refresh (pull-to-refresh on mobile)
- Add date range selector
- Cache API responses
- Handle empty states

## API Client Methods
\`\`\`typescript
getMetrics(params: {
  startDate?: string;
  endDate?: string;
  metricType?: string;
  limit?: number;
}) => Promise<Metric[]>

getMetricsSummary(userId: string) => Promise<Summary>

getLatestMetrics(count: number) => Promise<Metric[]>
\`\`\`

## Acceptance Criteria
- [ ] API client created
- [ ] Dashboard uses real data
- [ ] Loading states implemented
- [ ] Error states implemented
- [ ] Empty states implemented
- [ ] Data refresh working
- [ ] Date range selector working
- [ ] Caching implemented
- [ ] No memory leaks
- [ ] Tests for API client"

echo ""
echo "✅ Phase 2 issues created successfully!"
echo ""
