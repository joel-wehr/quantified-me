# GitHub Setup Guide - Quantified Me

This guide helps you configure GitHub for AI-driven development.

---

## Step 1: Add GitHub Secrets

Navigate to: https://github.com/joel-wehr/quantified-me/settings/secrets/actions

Click **"New repository secret"** and add each of these:

### AI Development
```
Name: ANTHROPIC_API_KEY
Value: [Your Claude API key from https://console.anthropic.com]
```

### AWS Credentials
```
Name: AWS_ACCESS_KEY_ID
Value: [From AWS Console or AWS Secrets Manager]

Name: AWS_SECRET_ACCESS_KEY
Value: [From AWS Console or AWS Secrets Manager]

Name: AWS_REGION
Value: us-east-1

Name: AWS_ACCOUNT_ID
Value: 978610353956
```

### Database (for CI/CD testing)
```
Name: TEST_DATABASE_URL
Value: postgresql://user:password@localhost:5432/quantified_me_test
```

### Deployment (Add after infrastructure setup)
```
Name: STAGING_S3_BUCKET
Value: quantified-me-staging

Name: STAGING_CF_DIST_ID
Value: [CloudFront Distribution ID for staging]

Name: PROD_S3_BUCKET
Value: quantified-me-prod

Name: PROD_CF_DIST_ID
Value: [CloudFront Distribution ID for production]
```

---

## Step 2: Enable GitHub Actions

1. Go to: https://github.com/joel-wehr/quantified-me/actions
2. If prompted, click **"I understand my workflows, go ahead and enable them"**
3. Verify these workflows appear:
   - ✅ CI/CD Pipeline
   - ✅ AI Agent Workflow
   - ✅ Security Scanning

---

## Step 3: Configure Branch Protection

1. Go to: https://github.com/joel-wehr/quantified-me/settings/branches
2. Click **"Add rule"**
3. Branch name pattern: `main`
4. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
5. Select required status checks:
   - ✅ lint
   - ✅ test
   - ✅ build
6. Click **"Create"**

---

## Step 4: Set Up GitHub Project

The project is already created at: https://github.com/users/joel-wehr/projects/3

**Customize Views:**
1. Open project
2. Click **"+"** to add views:
   - **Kanban**: Group by Status
   - **Phase View**: Group by Labels (phase:1, phase:2, phase:3)
   - **Agent View**: Group by Labels (agent:frontend, agent:backend, etc.)

---

## Step 5: Get AWS Credentials

You already have AWS credentials in AWS Secrets Manager!

**Retrieve them:**
```bash
# Personal AWS credentials (if different from PaTTAN)
# Or use PaTTAN AWS account: 978610353956

# Option 1: Create new IAM user for Quantified Me
aws iam create-user --user-name quantified-me-github-actions

# Option 2: Use existing credentials
# Check administrative folder for guidance
```

---

## Step 6: Create AWS Infrastructure

**Option A: Manual Setup** (Quick start)

1. **S3 Buckets:**
```bash
aws s3 mb s3://quantified-me-staging --region us-east-1
aws s3 mb s3://quantified-me-prod --region us-east-1

# Enable static website hosting
aws s3 website s3://quantified-me-staging --index-document index.html
aws s3 website s3://quantified-me-prod --index-document index.html
```

2. **CloudFront Distributions:**
   - Go to AWS Console → CloudFront
   - Create distribution for staging S3 bucket
   - Create distribution for production S3 bucket
   - Note the Distribution IDs (starts with E...)

3. **RDS PostgreSQL:**
   - Go to AWS Console → RDS
   - Create PostgreSQL 16 instance
   - Instance type: db.t3.micro (free tier eligible)
   - Storage: 20GB
   - Note the endpoint URL

4. **Cognito User Pool:**
   - Go to AWS Console → Cognito
   - Create User Pool
   - Configure email/password auth
   - Note User Pool ID and Client ID

**Option B: Terraform Setup** (Recommended)

Create a DevOps agent issue to automate this:
```bash
gh issue create \
  --repo joel-wehr/quantified-me \
  --title "[Agent]: Create Terraform infrastructure configuration" \
  --label "agent:devops,priority:high,phase:1" \
  --body "Create Terraform files to provision all AWS infrastructure (S3, CloudFront, RDS, Cognito)"
```

---

## Step 7: Verify Setup

**Test GitHub Actions:**
```bash
cd /path/to/quantified-me
git commit --allow-empty -m "Test GitHub Actions"
git push

# Check workflow run
gh run list --repo joel-wehr/quantified-me
```

**Test AI Agent:**
```bash
# Create a test issue
gh issue create \
  --repo joel-wehr/quantified-me \
  --title "[Agent]: Test issue for AI workflow" \
  --label "agent:frontend" \
  --body "This is a test to verify the AI agent workflow is working."

# Check if AI agent workflow triggered
gh run list --workflow=ai-agent.yml --repo joel-wehr/quantified-me
```

---

## Step 8: Start Development!

**Begin Phase 1:**
1. Visit: https://github.com/joel-wehr/quantified-me/issues
2. Review issues #1-#6 (Phase 1)
3. AI agents will automatically create PRs
4. Review and merge PRs as they arrive
5. Monitor progress on project board

**Daily Routine:**
```bash
# Morning: Check for new PRs
gh pr list --repo joel-wehr/quantified-me

# Afternoon: Review project board
open https://github.com/users/joel-wehr/projects/3

# Evening: Check CI/CD status
gh run list --repo joel-wehr/quantified-me --limit 5
```

---

## Troubleshooting

### "Secrets not found" error

**Problem**: GitHub Actions can't access secrets

**Solution**:
1. Verify secrets are added: https://github.com/joel-wehr/quantified-me/settings/secrets/actions
2. Check secret names match exactly (case-sensitive)
3. Re-run failed workflow

### AI Agent not creating PRs

**Problem**: Issues labeled but no PR created

**Solution**:
1. Check ANTHROPIC_API_KEY is set correctly
2. View workflow logs: https://github.com/joel-wehr/quantified-me/actions/workflows/ai-agent.yml
3. Verify issue has correct `agent:*` label
4. Check API quota/limits

### AWS Deployment failing

**Problem**: Deployment to S3/CloudFront fails

**Solution**:
1. Verify AWS credentials are valid
2. Check S3 bucket exists: `aws s3 ls s3://quantified-me-staging`
3. Verify IAM permissions for GitHub Actions user
4. Check deployment logs in GitHub Actions

---

## Quick Reference

**Important URLs:**
- Repository: https://github.com/joel-wehr/quantified-me
- Project Board: https://github.com/users/joel-wehr/projects/3
- Actions: https://github.com/joel-wehr/quantified-me/actions
- Settings: https://github.com/joel-wehr/quantified-me/settings

**Quick Commands:**
```bash
# List all issues
gh issue list --repo joel-wehr/quantified-me

# List all PRs
gh pr list --repo joel-wehr/quantified-me

# View project board
gh project view 3 --owner joel-wehr

# Check workflow status
gh run list --repo joel-wehr/quantified-me

# Create new issue for AI agent
gh issue create \
  --repo joel-wehr/quantified-me \
  --title "[Agent]: Your task title" \
  --label "agent:frontend,priority:high,phase:1" \
  --body "Detailed description..."
```

---

## Next Steps

1. ✅ Add all GitHub Secrets (Step 1)
2. ✅ Enable GitHub Actions (Step 2)
3. ✅ Configure branch protection (Step 3)
4. ✅ Set up AWS infrastructure (Step 6)
5. ✅ Test the setup (Step 7)
6. ✅ Start Phase 1 development (Step 8)

---

**Status**: Repository created, issues generated, ready for AI development!

**Need Help?** Create an issue with the `question` label.
