# Quantified Me - AWS Infrastructure

This directory contains Terraform configuration for deploying Quantified Me to AWS using a **cost-optimized, cloud-native architecture**.

## Architecture Overview

- **Frontend**: S3 + CloudFront (static hosting)
- **Backend**: Lambda Functions (serverless)
- **Database**: RDS PostgreSQL (db.t3.micro - free tier eligible)
- **Authentication**: AWS Cognito
- **API**: API Gateway HTTP API v2
- **Domain**: quantifiedme.org (Route53)
- **Secrets**: AWS Secrets Manager

## Estimated Monthly Costs

### Staging Environment
- S3 + CloudFront: $1-2
- RDS db.t3.micro: $15-20 (free tier: $0 for 12 months)
- Lambda: $0-5 (free tier covers 1M requests)
- API Gateway: $0-2 (free tier covers 300M requests for 12 months)
- Secrets Manager: $1 (2 secrets)
- Route53: $0.50
- **Total**: ~$18-30/month (or ~$2-7/month with free tier)

### Production Environment
- Similar costs + additional CloudWatch monitoring
- **Total**: ~$25-40/month

## Prerequisites

1. **AWS Account** with appropriate permissions
2. **Terraform** >= 1.0 ([Install](https://www.terraform.io/downloads))
3. **AWS CLI** configured ([Guide](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))
4. **Domain**: quantified me.org (Route53 hosted zone)

## Quick Start

### 1. Create Terraform State Bucket

```bash
# Create S3 bucket for Terraform state
aws s3 mb s3://quantified-me-terraform-state --region us-east-1

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket quantified-me-terraform-state \
  --versioning-configuration Status=Enabled

# Enable encryption
aws s3api put-bucket-encryption \
  --bucket quantified-me-terraform-state \
  --server-side-encryption-configuration '{
    "Rules": [{
      "ApplyServerSideEncryptionByDefault": {
        "SSEAlgorithm": "AES256"
      }
    }]
  }'
```

### 2. Configure Terraform

```bash
cd infrastructure/terraform

# Copy backend configuration
cp backend.tf.example backend.tf

# Copy variables
cp terraform.tfvars.example terraform.tfvars

# Edit terraform.tfvars
nano terraform.tfvars
```

Add to `terraform.tfvars`:
```hcl
aws_region   = "us-east-1"
environment  = "staging"
project_name = "quantified-me"
db_password  = "CHANGE-TO-SECURE-PASSWORD"
```

### 3. Deploy Staging Environment

```bash
# Run deployment script
chmod +x ../deploy.sh
../deploy.sh staging
```

Or manually:
```bash
# Initialize
terraform init

# Create staging workspace
terraform workspace new staging

# Plan
terraform plan -var="environment=staging"

# Apply
terraform apply -var="environment=staging"
```

### 4. Deploy Production Environment

```bash
# Deploy production
../deploy.sh production
```

## Terraform Modules

### Files

- `main.tf` - Main configuration, provider setup
- `vpc.tf` - VPC, subnets, VPC endpoints (no NAT Gateway for cost savings)
- `s3.tf` - S3 buckets for frontend hosting
- `cloudfront.tf` - CloudFront distribution
- `rds.tf` - PostgreSQL database
- `cognito.tf` - User authentication
- `lambda.tf` - Serverless backend functions
- `api-gateway.tf` - API Gateway HTTP API
- `route53.tf` - DNS configuration for quantifiedme.org

### Resources Created

**Networking:**
- VPC with 2 public + 2 private subnets
- Internet Gateway
- VPC Endpoints (S3, Secrets Manager) - saves NAT Gateway costs

**Frontend:**
- S3 bucket with static website hosting
- CloudFront distribution with HTTPS
- ACM certificate for quantifiedme.org

**Backend:**
- Lambda function for API
- Lambda execution role with VPC access
- API Gateway HTTP API

**Database:**
- RDS PostgreSQL 16 (db.t3.micro)
- Database subnet group
- Security groups

**Authentication:**
- Cognito User Pool
- User Pool Client
- User Pool Domain

**Secrets:**
- Database credentials in Secrets Manager
- Cognito configuration in Secrets Manager

**DNS:**
- Route53 A records for frontend and API
- ACM certificate validation records

## Outputs

After deployment, Terraform outputs:

```bash
terraform output
```

Important outputs:
- `frontend_bucket_name` - S3 bucket for frontend
- `cloudfront_distribution_id` - For cache invalidation
- `cloudfront_domain_name` - CloudFront URL
- `cognito_user_pool_id` - For application configuration
- `cognito_client_id` - For application configuration
- `rds_endpoint` - Database connection endpoint
- `api_gateway_url` - API endpoint URL

## GitHub Secrets

Add these to GitHub repository secrets:

```bash
# Get outputs
cd infrastructure/terraform
terraform output -json > outputs.json

# Add to GitHub (via UI or CLI)
gh secret set STAGING_S3_BUCKET --body "$(terraform output -raw frontend_bucket_name)"
gh secret set STAGING_CF_DIST_ID --body "$(terraform output -raw cloudfront_distribution_id)"

# Database URL (get from Secrets Manager)
aws secretsmanager get-secret-value \
  --secret-id quantified-me/staging/database/credentials \
  --query SecretString --output text | jq -r '.url'
```

## Cost Optimization Features

1. **No NAT Gateway** - Using VPC endpoints instead (~$32/month savings)
2. **db.t3.micro** - Free tier eligible for 12 months
3. **Serverless Backend** - Lambda pay-per-use instead of always-on EC2
4. **CloudFront PriceClass_100** - US/Canada/Europe only (cheapest)
5. **Minimal Backup Retention** - 7 days instead of 30
6. **Performance Insights OFF** - Save on RDS monitoring costs
7. **Cognito Default Email** - Free instead of SES
8. **HTTP API Gateway** - Cheaper than REST API

## Scaling Up

When you need to scale:

1. **Database**:
   ```hcl
   instance_class = "db.t3.small"  # or db.t3.medium
   ```

2. **Lambda**:
   ```hcl
   memory_size = 512  # or 1024
   ```

3. **CloudFront**:
   ```hcl
   price_class = "PriceClass_All"  # Global distribution
   ```

## Disaster Recovery

**Backup Strategy:**
- RDS automated backups (7 days retention)
- S3 versioning enabled
- Terraform state in S3 with versioning

**Restore Procedure:**
```bash
# Restore database from snapshot
aws rds restore-db-instance-from-db-snapshot \
  --db-instance-identifier quantified-me-staging-restored \
  --db-snapshot-identifier rds:quantified-me-staging-2025-01-01

# Restore S3 version
aws s3api list-object-versions --bucket quantified-me-staging-frontend
aws s3api restore-object --bucket ... --key ... --version-id ...
```

## Monitoring

**CloudWatch Dashboards:**
- Lambda invocations, errors, duration
- API Gateway requests, 4xx, 5xx errors
- RDS CPU, connections, storage

**Alerts** (to be configured):
- Database CPU > 80%
- Lambda errors > 1%
- API Gateway 5xx > 0.1%

## Troubleshooting

### "Error creating DB Instance: DBSubnetGroupDoesNotCoverEnoughAZs"
Ensure your VPC has subnets in at least 2 AZs.

### "Certificate validation timeout"
DNS propagation can take up to 30 minutes. Wait and retry.

### "Lambda timeout"
Increase timeout in `lambda.tf` or optimize cold start.

## Clean Up

**Destroy staging:**
```bash
terraform workspace select staging
terraform destroy -var="environment=staging"
```

**Destroy production:**
```bash
terraform workspace select production
terraform destroy -var="environment=production"
```

⚠️ **Warning**: This will delete all data including database!

## Next Steps

1. ✅ Deploy infrastructure
2. ✅ Add outputs to GitHub Secrets
3. ✅ Push application code (triggers CI/CD)
4. ✅ Verify deployment at staging.quantifiedme.org
5. ✅ Deploy to production at quantifiedme.org

---

**Documentation**: See `/docs` for application architecture
**Support**: Create GitHub issue with `infrastructure` label
