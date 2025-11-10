# Getting Started with Quantified Me

This guide will help you set up and run Quantified Me on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher ([Download](https://nodejs.org/))
- **npm** 9.x or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- **AWS CLI** ([Install Guide](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))
- **Docker Desktop** (optional, for local database) ([Download](https://www.docker.com/products/docker-desktop/))

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/quantified-me.git
cd quantified-me
```

### 2. Run Setup Script

```bash
npm run setup
```

This will:
- Install all dependencies (root, backend, frontend)
- Create `.env` file from `.env.example`
- Check for required tools

### 3. Configure Environment Variables

Edit the `.env` file with your configuration:

```bash
# Required for local development
DATABASE_URL=postgresql://postgres:password@localhost:5432/quantified_me
JWT_SECRET=your-super-secret-jwt-key-change-this

# AWS (for cloud features)
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=123456789012

# AI APIs (optional for local development)
ANTHROPIC_API_KEY=your-anthropic-api-key
OPENAI_API_KEY=your-openai-api-key
```

### 4. Set Up Local Database (Optional)

**Option A: Using Docker**

```bash
docker run --name quantified-me-postgres \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=quantified_me \
  -p 5432:5432 \
  -d postgres:16
```

**Option B: Using Local PostgreSQL**

Install PostgreSQL and create a database:

```bash
createdb quantified_me
```

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

The API will be available at: `http://localhost:3001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The web app will be available at: `http://localhost:3000`

### 6. Verify Installation

Visit `http://localhost:3000` in your browser. You should see:
- The Quantified Me welcome page
- API Status showing "connected"

## Project Structure

```
quantified-me/
├── .github/              # GitHub Actions workflows and issue templates
│   ├── workflows/        # CI/CD, AI agents, security scans
│   └── ISSUE_TEMPLATE/   # Issue templates for features, bugs, agents
├── backend/              # API and business logic
│   ├── src/              # TypeScript source files
│   │   ├── index.ts      # Main entry point
│   │   ├── routes/       # API route handlers
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   └── utils/        # Helper functions
│   ├── tests/            # Test files
│   └── package.json      # Backend dependencies
├── frontend/             # React web application
│   ├── src/              # TypeScript + React source
│   │   ├── main.tsx      # Entry point
│   │   ├── App.tsx       # Root component
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   └── api/          # API client
│   ├── public/           # Static assets
│   └── package.json      # Frontend dependencies
├── infrastructure/       # Infrastructure as Code
│   ├── terraform/        # Terraform configs
│   └── cdk/              # AWS CDK (if using)
├── shared/               # Shared code between frontend/backend
│   ├── types/            # TypeScript type definitions
│   └── schemas/          # Validation schemas
├── docs/                 # Documentation
│   ├── GETTING_STARTED.md  # This file
│   ├── AI_WORKFLOW.md      # AI agent usage guide
│   └── API.md              # API documentation
├── scripts/              # Utility scripts
│   └── setup.js          # Initial setup script
├── .env.example          # Environment variable template
├── ARCHITECTURE.md       # System architecture
├── README.md             # Project overview
└── package.json          # Root package.json (workspaces)
```

## Development Workflow

### 1. Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

Edit files in `frontend/` or `backend/` directories.

### 3. Run Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

### 4. Commit Changes

```bash
git add .
git commit -m "feat: add your feature description"
```

### 5. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## Using AI Agents

You can use AI agents to accelerate development:

### Create an Agent Task

1. Go to GitHub Issues
2. Click "New Issue"
3. Choose "AI Agent Task" template
4. Fill in the details
5. Select the agent type
6. Submit

The AI agent will:
- Analyze your requirements
- Implement the feature
- Create a PR for review

See [AI_WORKFLOW.md](./AI_WORKFLOW.md) for detailed instructions.

## Common Tasks

### Adding a New API Endpoint

1. Create route handler in `backend/src/routes/`
2. Add validation schema using Zod
3. Implement business logic in `backend/src/services/`
4. Add tests in `backend/tests/`
5. Update API documentation

Or create an issue with `agent:backend` label to have an AI agent do it!

### Adding a New UI Component

1. Create component in `frontend/src/components/`
2. Import Bootstrap classes for styling
3. Connect to API using hooks
4. Add to appropriate page
5. Write component tests

Or create an issue with `agent:frontend` label!

### Running Database Migrations

```bash
cd backend
npm run migrate
```

### Building for Production

```bash
# Build both frontend and backend
npm run build

# Or individually
cd backend && npm run build
cd frontend && npm run build
```

## AWS Setup

### 1. Create AWS Account

If you don't have one: [Create AWS Account](https://aws.amazon.com/)

### 2. Configure AWS CLI

```bash
aws configure
```

Enter:
- AWS Access Key ID
- AWS Secret Access Key
- Default region (e.g., `us-east-1`)
- Output format (`json`)

### 3. Deploy Infrastructure

```bash
cd infrastructure/terraform
terraform init
terraform plan
terraform apply
```

Or use the `agent:devops` for automated infrastructure setup!

## Troubleshooting

### Port Already in Use

If port 3000 or 3001 is already in use:

```bash
# Find and kill the process (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Or change the port in .env
APP_PORT=3002
```

### Database Connection Error

1. Verify PostgreSQL is running
2. Check DATABASE_URL in `.env`
3. Ensure database exists: `createdb quantified_me`

### Module Not Found

Reinstall dependencies:

```bash
npm run setup
```

### API Not Connecting

1. Ensure backend is running on port 3001
2. Check browser console for CORS errors
3. Verify `API_URL` in frontend `.env.local`

## Next Steps

1. **Review Architecture**: Read [ARCHITECTURE.md](../ARCHITECTURE.md)
2. **Explore AI Workflow**: See [AI_WORKFLOW.md](./AI_WORKFLOW.md)
3. **Set Up GitHub**: Create repository and enable Actions
4. **Configure AWS**: Set up cloud infrastructure
5. **Start Building**: Create your first feature!

## Resources

- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [Anthropic Claude API](https://docs.anthropic.com/)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)

## Getting Help

- **Documentation Issues**: Create issue with `docs` label
- **Setup Problems**: Create issue with `setup` label
- **General Questions**: Create issue with `question` label

Happy coding! 🚀
