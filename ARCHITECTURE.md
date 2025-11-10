# Quantified Me - System Architecture

## Vision
A privacy-focused personal health intelligence platform that unifies health data, surfaces transparent insights, and uses AI agents to assist (not replace) human decision-making.

## Architecture Overview

### Deployment Model
- **Type**: Web Application
- **Infrastructure**: AWS Cloud
- **Repository**: GitHub with extensive automation
- **Development Strategy**: AI sub-agent assisted rapid development

---

## System Components

### 1. Frontend Layer
**Technology**: Bootstrap Admin Template + Modern JS Framework

**Components**:
- **Dashboard**: Visual health metrics, trends, and insights
- **Data Import UI**: Manual entry forms, CSV upload, API configuration
- **Analytics Views**: Customizable charts and trend analysis
- **AI Assistant Interface**: Chat/conversation interface for AI-powered insights
- **Settings & Privacy Controls**: Data management, export, deletion

**AWS Services**:
- **S3 + CloudFront**: Static website hosting with global CDN
- **Route 53**: DNS management

### 2. Backend API Layer
**Technology**: RESTful API (Node.js/Python)

**Components**:
- **Authentication Service**: User registration, login, session management
- **Data Ingestion API**: Endpoints for manual entry, CSV upload, API imports
- **Data Normalization Engine**: Transform disparate data into unified schema
- **Query API**: Retrieve metrics, trends, aggregations
- **AI Agent Orchestration**: Manage AI analysis requests and responses

**AWS Services**:
- **API Gateway**: RESTful API endpoints with rate limiting
- **Lambda**: Serverless functions for API logic
- **Cognito**: User authentication and authorization
- **ECS/Fargate**: Container orchestration for backend services (if non-serverless)

### 3. Data Layer
**Privacy-Focused Encrypted Storage**

**Components**:
- **User Health Database**: Encrypted metrics, timestamps, metadata
- **Data Lake**: Raw imported data for reprocessing
- **Analytics Cache**: Pre-computed aggregations and trends

**AWS Services**:
- **RDS (PostgreSQL)**: Primary relational database with encryption at rest
- **DynamoDB**: NoSQL for high-volume time-series data
- **S3**: Encrypted object storage for raw imports and backups
- **KMS**: Key management for encryption

### 4. AI Agent Layer
**API-Based Intelligence with User Consent**

**Components**:
- **Insight Generator**: Analyzes patterns and generates explanations
- **Trend Detector**: Identifies correlations and anomalies
- **Recommendation Engine**: Evidence-based suggestions
- **Report Generator**: Creates summaries and visualizations

**Integration**:
- **Claude API**: Primary AI for analysis and insights
- **OpenAI API**: Optional secondary for specific tasks
- **Agent Orchestration**: Queue-based system for async AI tasks

**AWS Services**:
- **SQS**: Message queue for AI task management
- **Lambda**: Process AI requests and responses
- **Secrets Manager**: Secure API key storage

### 5. Data Processing Pipeline

**Components**:
- **Import Processor**: Validate and parse incoming data
- **Normalization Engine**: Convert to unified schema
- **Aggregation Service**: Calculate daily/weekly/monthly rollups
- **Trend Calculator**: Compute moving averages, percentiles

**AWS Services**:
- **Step Functions**: Orchestrate multi-step data pipelines
- **Lambda**: Individual processing tasks
- **EventBridge**: Schedule periodic aggregations

### 6. Security & Privacy Layer

**Components**:
- **Encryption at Rest**: All data encrypted in storage
- **Encryption in Transit**: TLS for all communications
- **Access Controls**: Fine-grained permissions
- **Audit Logging**: Track all data access
- **Data Export/Deletion**: User data portability and right to forget

**AWS Services**:
- **KMS**: Encryption key management
- **IAM**: Access control and policies
- **CloudTrail**: Audit logging
- **WAF**: Web application firewall

---

## AI Sub-Agent Development Strategy

### Agent Roles

#### 1. **Backend Developer Agent**
- Build API endpoints
- Implement data models
- Write database migrations
- Create Lambda functions

#### 2. **Frontend Developer Agent**
- Integrate Bootstrap template
- Build React/Vue components
- Implement data visualization
- Create responsive layouts

#### 3. **DevOps Agent**
- Write GitHub Actions workflows
- Create IaC (Terraform/CloudFormation)
- Set up CI/CD pipelines
- Configure AWS services

#### 4. **Data Engineer Agent**
- Design data schemas
- Build ETL pipelines
- Implement normalization logic
- Optimize queries

#### 5. **Testing Agent**
- Write unit tests
- Create integration tests
- Perform security audits
- Generate test data

#### 6. **Documentation Agent**
- Write API documentation
- Create user guides
- Generate code comments
- Maintain architecture docs

### Agent Coordination Workflow

```
You (Orchestrator)
    ↓
[Create GitHub Issue with Specification]
    ↓
[GitHub Action Triggers AI Agent]
    ↓
[Agent Develops Solution]
    ↓
[Agent Creates Pull Request]
    ↓
[Automated Tests Run]
    ↓
[You Review & Merge]
```

---

## GitHub Automation Strategy

### GitHub Actions Workflows

#### 1. **CI/CD Pipeline**
- Run tests on every push
- Build and deploy to staging
- Deploy to production on main branch merge
- Run security scans

#### 2. **AI Agent Triggers**
- Issue labeled "agent:backend" → Trigger backend agent
- Issue labeled "agent:frontend" → Trigger frontend agent
- Issue labeled "agent:devops" → Trigger DevOps agent

#### 3. **Automated Code Review**
- Lint and format checks
- Security vulnerability scanning
- Code coverage reporting
- Performance benchmarking

#### 4. **Dependency Management**
- Automated dependency updates
- Security patch notifications
- Breaking change detection

#### 5. **Documentation Generation**
- Auto-generate API docs from code
- Update architecture diagrams
- Create changelog on release

### GitHub Projects Setup
- **Kanban Board**: Backlog, In Progress, Review, Done
- **Milestones**: MVP, Beta, V1.0, etc.
- **Labels**: feature, bug, agent:*, priority:high/medium/low
- **Issue Templates**: Feature requests, bug reports, agent tasks

---

## Technology Stack Recommendations

### Frontend
- **Framework**: React or Vue.js
- **UI**: Bootstrap 5 Admin Template
- **Charts**: Chart.js or D3.js
- **State Management**: Redux/Zustand or Pinia
- **Build Tool**: Vite or Next.js

### Backend
- **Runtime**: Node.js (TypeScript) or Python
- **Framework**: Express.js/Fastify or FastAPI
- **ORM**: Prisma/TypeORM or SQLAlchemy
- **Validation**: Zod or Pydantic
- **Testing**: Jest/Vitest or pytest

### Infrastructure
- **IaC**: AWS CDK or Terraform
- **CI/CD**: GitHub Actions
- **Monitoring**: AWS CloudWatch + X-Ray
- **Secrets**: AWS Secrets Manager
- **Container Registry**: Amazon ECR

### Database
- **Primary**: PostgreSQL (RDS) with encryption
- **Time-Series**: DynamoDB or TimescaleDB
- **Cache**: ElastiCache (Redis)

---

## Data Model (Initial Schema)

### Users
```sql
users
  - id (uuid, primary key)
  - email (encrypted)
  - password_hash
  - created_at
  - last_login
  - preferences (jsonb)
```

### Health Metrics
```sql
health_metrics
  - id (uuid, primary key)
  - user_id (foreign key)
  - metric_type (activity, sleep, recovery, custom)
  - metric_name (steps, hours_sleep, hrv, etc.)
  - value (numeric)
  - unit (steps, hours, ms, etc.)
  - timestamp
  - source (manual, import, api)
  - metadata (jsonb)
  - created_at
```

### Data Sources
```sql
data_sources
  - id (uuid, primary key)
  - user_id (foreign key)
  - source_type (csv, api, manual)
  - source_name
  - configuration (encrypted jsonb)
  - last_sync
  - status (active, paused, error)
```

### AI Insights
```sql
ai_insights
  - id (uuid, primary key)
  - user_id (foreign key)
  - insight_type (trend, correlation, recommendation)
  - title
  - description
  - confidence_score
  - supporting_data (jsonb)
  - created_at
  - dismissed (boolean)
```

---

## Development Phases

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up GitHub repository with project structure
- [ ] Configure AWS account and IAM roles
- [ ] Create CI/CD pipeline skeleton
- [ ] Implement basic authentication
- [ ] Set up database and initial schema
- [ ] Integrate Bootstrap template

### Phase 2: Core Data Features (Weeks 3-4)
- [ ] Manual data entry UI and API
- [ ] CSV import functionality
- [ ] Data normalization engine
- [ ] Basic dashboard with charts
- [ ] Data export functionality

### Phase 3: AI Integration (Weeks 5-6)
- [ ] Claude API integration
- [ ] Insight generation engine
- [ ] Trend detection algorithms
- [ ] AI assistant chat interface
- [ ] Recommendation system

### Phase 4: Advanced Features (Weeks 7-8)
- [ ] Custom metric definitions
- [ ] Advanced analytics and correlations
- [ ] API integration framework (for future wearable integrations)
- [ ] Mobile-responsive optimizations
- [ ] User settings and preferences

### Phase 5: Polish & Launch (Weeks 9-10)
- [ ] Comprehensive testing
- [ ] Security audit
- [ ] Performance optimization
- [ ] User documentation
- [ ] Beta launch

---

## Security & Privacy Considerations

### Data Protection
- All PII encrypted at rest using AWS KMS
- TLS 1.3 for all data in transit
- Database connection encryption
- Encrypted backups

### Access Control
- Multi-factor authentication support
- Session management with secure tokens
- API rate limiting
- IP-based access controls (optional)

### Compliance
- GDPR-ready data export/deletion
- Audit logs for all data access
- Privacy policy and terms of service
- User consent tracking for AI analysis

### AI Data Handling
- Explicit user consent before sending data to AI APIs
- No long-term storage of data by AI providers
- Transparency about what data is shared
- Option to disable AI features entirely

---

## Monitoring & Observability

### Metrics to Track
- API response times
- Database query performance
- Error rates and types
- User engagement metrics
- AI processing success rates
- Cost per user

### Tools
- CloudWatch Dashboards
- CloudWatch Alarms
- X-Ray for distributed tracing
- CloudTrail for security auditing
- Custom metrics for business KPIs

---

## Cost Optimization

### Estimated Monthly AWS Costs (100 users)
- **Compute**: Lambda/Fargate - $20-50
- **Database**: RDS + DynamoDB - $50-100
- **Storage**: S3 + backups - $10-20
- **Data Transfer**: CloudFront + API - $10-30
- **Other Services**: Cognito, SQS, etc. - $10-20
- **Total**: ~$100-220/month

### Scaling Strategy
- Start with serverless (Lambda) for low baseline costs
- Use DynamoDB on-demand pricing initially
- Implement caching to reduce database load
- Monitor and optimize based on usage patterns

---

## Next Steps

1. **Initialize GitHub Repository**
   - Create repo structure
   - Set up branch protection
   - Configure GitHub Projects

2. **Set Up AWS Foundation**
   - Configure AWS account
   - Create IAM roles and policies
   - Set up infrastructure as code

3. **Bootstrap Development Environment**
   - Set up local development
   - Create Docker containers
   - Configure environment variables

4. **Implement First Feature**
   - User authentication
   - Basic dashboard
   - Manual data entry

5. **Enable AI Agent Workflow**
   - Create GitHub Action for agent triggers
   - Test agent PR creation
   - Refine agent prompts
