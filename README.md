# Quantified Me

> Personal health intelligence platform that unifies data from multiple sources to help individuals understand and improve their well-being.

## Vision

Quantified Me is a privacy-focused platform that:
- ✅ Collects and normalizes health metrics from various sources
- ✅ Surfaces clear trends and evidence-based insights
- ✅ Uses AI agents to assist (not replace) human decision-making
- ✅ Ensures users own and control their data
- ✅ Maintains transparency - no black-box scores

## Architecture

See [ARCHITECTURE.md](./ARCHITECTURE.md) for complete system design and technical details.

### Tech Stack
- **Frontend**: React + Bootstrap Admin Template
- **Backend**: Node.js/TypeScript + Express
- **Database**: PostgreSQL (RDS) + DynamoDB
- **AI**: Claude API + OpenAI API
- **Infrastructure**: AWS (Lambda, API Gateway, S3, CloudFront)
- **CI/CD**: GitHub Actions

## Project Structure

```
quantified-me/
├── .github/              # GitHub Actions workflows
├── backend/              # API and business logic
├── frontend/             # Web application UI
├── infrastructure/       # IaC (Terraform/CDK)
├── shared/              # Shared types and utilities
├── docs/                # Documentation
└── scripts/             # Setup and utility scripts
```

## Development Setup

### Prerequisites
- Node.js 18+ or Python 3.11+
- Docker Desktop
- AWS CLI configured
- Git

### Quick Start

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/quantified-me.git
cd quantified-me

# Install dependencies
npm install  # or: pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run development server
npm run dev  # or: python manage.py runserver
```

## AI-Assisted Development

This project uses AI sub-agents to accelerate development:

1. Create an issue with appropriate label (`agent:backend`, `agent:frontend`, etc.)
2. AI agent automatically creates a PR with implementation
3. Review and merge the changes

See [docs/AI_WORKFLOW.md](./docs/AI_WORKFLOW.md) for details.

## Contributing

This is a personal project, but suggestions and feedback are welcome via issues.

## Privacy & Security

- All data encrypted at rest and in transit
- User data never shared without explicit consent
- GDPR-compliant data export and deletion
- Open source and transparent

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Roadmap

- [ ] Phase 1: Foundation (Auth, Database, Basic UI)
- [ ] Phase 2: Core Data Features (Manual entry, CSV import)
- [ ] Phase 3: AI Integration (Insights, Trends, Recommendations)
- [ ] Phase 4: Advanced Features (Custom metrics, API integrations)
- [ ] Phase 5: Beta Launch

---

Built with transparency, privacy, and human autonomy at its core.
