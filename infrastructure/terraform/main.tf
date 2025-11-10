# Quantified Me - AWS Infrastructure
# Full cloud-native setup: S3, CloudFront, RDS, Cognito

terraform {
  required_version = ">= 1.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Backend configuration for state management
  backend "s3" {
    bucket = "quantified-me-terraform-state"
    key    = "terraform.tfstate"
    region = "us-east-1"
  }
}

provider "aws" {
  region = var.aws_region

  default_tags {
    tags = {
      Project     = "QuantifiedMe"
      Environment = var.environment
      ManagedBy   = "Terraform"
    }
  }
}

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "environment" {
  description = "Environment (staging or production)"
  type        = string
}

variable "project_name" {
  description = "Project name"
  type        = string
  default     = "quantified-me"
}

variable "db_password" {
  description = "Database master password"
  type        = string
  sensitive   = true
}

variable "google_client_id" {
  description = "Google OAuth Client ID"
  type        = string
  sensitive   = true
}

variable "google_client_secret" {
  description = "Google OAuth Client Secret"
  type        = string
  sensitive   = true
}

# Data sources
data "aws_caller_identity" "current" {}

# Outputs
output "frontend_bucket_name" {
  value = aws_s3_bucket.frontend.id
}

output "cloudfront_distribution_id" {
  value = aws_cloudfront_distribution.frontend.id
}

output "cloudfront_domain_name" {
  value = aws_cloudfront_distribution.frontend.domain_name
}

output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.main.id
}

output "cognito_client_id" {
  value = aws_cognito_user_pool_client.web.id
}

output "cognito_domain" {
  value = aws_cognito_user_pool_domain.main.domain
}

output "cognito_hosted_ui_url" {
  value = "https://${aws_cognito_user_pool_domain.main.domain}.auth.${var.aws_region}.amazoncognito.com"
}

output "rds_endpoint" {
  value     = aws_db_instance.postgres.endpoint
  sensitive = true
}

output "api_gateway_url" {
  value = aws_apigatewayv2_api.main.api_endpoint
}
