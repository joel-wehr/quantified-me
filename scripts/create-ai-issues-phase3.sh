#!/bin/bash

# Create Phase 3 AI development issues for Quantified Me
# AI Features - Claude Integration and Insights

REPO="joel-wehr/quantified-me"

echo "Creating Phase 3: AI Features issues..."
echo "========================================"
echo ""

# Issue 11: Claude API Integration
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Integrate Claude API for AI insights" \
  --label "agent:backend,priority:high,phase:3" \
  --body "## Agent Type
Backend Developer Agent

## Task Description
Integrate Anthropic Claude API for generating health insights from user metrics data.

## Requirements
- Install @anthropic-ai/sdk
- Create services/claude.ts
- Implement prompt templates for health analysis
- Add context building from user metrics
- Implement streaming responses
- Add error handling and retries
- Respect API rate limits
- Cache insights to reduce costs
- Add user consent tracking

## API Methods
\`\`\`typescript
generateInsight(userId: string, metricType: string): Promise<Insight>

analyzeTrends(userId: string, dateRange: DateRange): Promise<TrendAnalysis>

generateRecommendations(userId: string, goals: Goal[]): Promise<Recommendation[]>
\`\`\`

## Prompt Template Example
\`\`\`
You are a health data analyst. Analyze this user's activity data:
- Average daily steps: 8,500
- Weekly trend: +15%
- Sleep quality: 7.5 hrs average

Provide 2-3 evidence-based insights and one actionable recommendation.
Be concise, supportive, and focus on patterns.
\`\`\`

## Acceptance Criteria
- [ ] Claude SDK installed
- [ ] Service module created
- [ ] Prompt templates implemented
- [ ] Streaming responses working
- [ ] Error handling robust
- [ ] Rate limiting respected
- [ ] Caching implemented
- [ ] User consent checked
- [ ] Cost monitoring added
- [ ] Tests for AI service
- [ ] Documentation with examples"

# Issue 12: Insights Dashboard Component
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Build AI insights dashboard page" \
  --label "agent:frontend,priority:high,phase:3" \
  --body "## Agent Type
Frontend Developer Agent

## Task Description
Create a dedicated AI Insights page that displays Claude-generated health insights with interactive elements.

## Requirements
- Create pages/Insights.tsx
- Display insights in card format
- Add insight categories (trends, correlations, recommendations)
- Implement dismiss/save functionality
- Add insight history
- Show confidence scores
- Add \"Explain More\" button for detailed analysis
- Implement insight sharing
- Add refresh button

## Insight Card Components
- Icon based on category
- Title
- Description
- Supporting data visualization
- Confidence score (high/medium/low)
- Action buttons (dismiss, save, share)
- Timestamp

## Categories
- 🔥 Trends (activity patterns, improvements)
- 🔗 Correlations (sleep vs activity, etc.)
- 💡 Recommendations (evidence-based suggestions)
- ⚠️ Alerts (unusual patterns, health concerns)

## Acceptance Criteria
- [ ] Insights page created
- [ ] Card components implemented
- [ ] Categories working
- [ ] Dismiss/save functionality
- [ ] Insight history displayed
- [ ] Refresh working
- [ ] Responsive design
- [ ] Loading states
- [ ] Empty states
- [ ] Tests for components"

# Issue 13: AI Chat Interface
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Create AI chat interface for health questions" \
  --label "agent:frontend,agent:backend,priority:medium,phase:3" \
  --body "## Agent Type
Frontend + Backend Developer Agents

## Task Description
Build an interactive chat interface where users can ask questions about their health data and get AI-powered responses.

## Frontend Requirements
- Create components/chat/AIChat.tsx
- Implement chat UI with message bubbles
- Add typing indicator
- Support markdown in responses
- Add quick question suggestions
- Show data visualizations inline
- Add conversation history
- Implement voice input (optional)

## Backend Requirements
- Create POST /api/v1/chat endpoint
- Implement conversation context management
- Build RAG system with user's health data
- Stream responses using SSE
- Add safety guardrails (no medical advice)
- Limit conversation length
- Store chat history

## Safety Guardrails
\`\`\`
IMPORTANT: You are a health data analyst, NOT a doctor.
- Provide insights based on data patterns
- Never diagnose medical conditions
- Always recommend consulting healthcare providers
- Focus on trends and correlations
- Be supportive and non-judgmental
\`\`\`

## Acceptance Criteria
Frontend:
- [ ] Chat component created
- [ ] Message bubbles styled
- [ ] Streaming responses displayed
- [ ] Quick suggestions working
- [ ] History saved

Backend:
- [ ] Chat endpoint created
- [ ] Context management working
- [ ] RAG implemented
- [ ] SSE streaming working
- [ ] Safety guardrails enforced
- [ ] Tests >80% coverage"

# Issue 14: Recommendation Engine
gh issue create \
  --repo "$REPO" \
  --title "[Agent]: Build personalized recommendation engine" \
  --label "agent:backend,agent:data,priority:medium,phase:3" \
  --body "## Agent Type
Backend + Data Engineer Agents

## Task Description
Create a recommendation engine that generates personalized health suggestions based on user data patterns.

## Requirements
- Create services/recommendations.ts
- Implement pattern detection algorithms
- Use Claude for recommendation generation
- Add evidence linking (show supporting data)
- Implement recommendation scoring
- Add user feedback collection
- Track recommendation effectiveness
- Support multiple goal types

## Pattern Detection
- Consistency patterns (sleep schedule)
- Trend analysis (improving/declining)
- Correlation detection (sleep vs activity)
- Anomaly detection (unusual values)
- Goal progress tracking

## Recommendation Types
1. **Habit Formation**
   - \"Try going to bed 30 min earlier\"
   - Evidence: Sleep data + activity patterns

2. **Optimization**
   - \"Your best workouts happen after 7hrs sleep\"
   - Evidence: Correlation analysis

3. **Maintenance**
   - \"Keep up your current sleep schedule\"
   - Evidence: Consistency + positive trends

## Acceptance Criteria
- [ ] Recommendation service created
- [ ] Pattern detection implemented
- [ ] Claude integration working
- [ ] Evidence linking added
- [ ] Scoring system working
- [ ] Feedback collection added
- [ ] Effectiveness tracking
- [ ] Tests for algorithms
- [ ] Documentation with examples"

echo ""
echo "✅ Phase 3 issues created successfully!"
echo ""
