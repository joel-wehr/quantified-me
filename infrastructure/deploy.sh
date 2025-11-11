#!/bin/bash
set -e

# Quantified Me Infrastructure Deployment Script
# Usage: ./deploy.sh [staging|production]

ENVIRONMENT=${1:-staging}
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TERRAFORM_DIR="$SCRIPT_DIR/terraform"

echo "═══════════════════════════════════════════════════════════"
echo "  Deploying Quantified Me Infrastructure"
echo "  Environment: $ENVIRONMENT"
echo "═══════════════════════════════════════════════════════════"
echo ""

# Validate environment
if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
    echo "❌ Error: Environment must be 'staging' or 'production'"
    exit 1
fi

# Check if AWS CLI is installed
if ! command -v aws &> /dev/null; then
    echo "❌ Error: AWS CLI is not installed"
    exit 1
fi

# Check if Terraform is installed
if ! command -v terraform &> /dev/null; then
    echo "❌ Error: Terraform is not installed"
    echo "Install: https://www.terraform.io/downloads"
    exit 1
fi

# Check AWS credentials
echo "🔐 Checking AWS credentials..."
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ Error: AWS credentials not configured"
    exit 1
fi
echo "✓ AWS credentials valid"
echo ""

# Navigate to Terraform directory
cd "$TERRAFORM_DIR"

# Initialize Terraform (if not already done)
echo "🔧 Initializing Terraform..."
terraform init
echo ""

# Select or create workspace
echo "🏗️  Setting up Terraform workspace..."
terraform workspace select $ENVIRONMENT 2>/dev/null || terraform workspace new $ENVIRONMENT
echo ""

# Plan
echo "📋 Planning infrastructure changes..."
terraform plan \
    -var="environment=$ENVIRONMENT" \
    -var-file="terraform.tfvars" \
    -out="tfplan-$ENVIRONMENT"
echo ""

# Ask for confirmation
read -p "Apply these changes? (yes/no): " confirm
if [[ "$confirm" != "yes" ]]; then
    echo "❌ Deployment cancelled"
    rm -f "tfplan-$ENVIRONMENT"
    exit 1
fi

# Apply
echo ""
echo "🚀 Deploying infrastructure..."
terraform apply "tfplan-$ENVIRONMENT"
rm -f "tfplan-$ENVIRONMENT"

# Output important values
echo ""
echo "═══════════════════════════════════════════════════════════"
echo "  ✅ Deployment Complete!"
echo "═══════════════════════════════════════════════════════════"
echo ""
terraform output
echo ""
echo "Next steps:"
echo "1. Add these outputs to GitHub Secrets:"
echo "   - STAGING_S3_BUCKET (or PROD_S3_BUCKET)"
echo "   - STAGING_CF_DIST_ID (or PROD_CF_DIST_ID)"
echo "   - DATABASE_URL"
echo "   - COGNITO_USER_POOL_ID"
echo "   - COGNITO_CLIENT_ID"
echo ""
echo "2. Deploy application:"
echo "   git push origin main"
echo ""
