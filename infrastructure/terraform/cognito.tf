# AWS Cognito User Pool for Authentication
# Cost: Free for first 50,000 MAU, then $0.0055 per MAU

resource "aws_cognito_user_pool" "main" {
  name = "${var.project_name}-${var.environment}-users"

  # Password policy
  password_policy {
    minimum_length                   = 8
    require_lowercase                = true
    require_uppercase                = true
    require_numbers                  = true
    require_symbols                  = false
    temporary_password_validity_days = 7
  }

  # User attributes
  schema {
    name                = "email"
    attribute_data_type = "String"
    mutable             = true
    required            = true

    string_attribute_constraints {
      min_length = 5
      max_length = 255
    }
  }

  # Auto-verify email
  auto_verified_attributes = ["email"]

  # Email configuration (using Cognito default email - FREE)
  email_configuration {
    email_sending_account = "COGNITO_DEFAULT"
  }

  # Account recovery
  account_recovery_setting {
    recovery_mechanism {
      name     = "verified_email"
      priority = 1
    }
  }

  # User pool add-ons
  user_pool_add_ons {
    advanced_security_mode = "OFF"  # Disabled to save costs
  }

  # MFA configuration (optional, disabled for cost)
  mfa_configuration = "OFF"

  # Deletion protection for production
  deletion_protection = var.environment == "production" ? "ACTIVE" : "INACTIVE"

  tags = {
    Name = "${var.project_name}-${var.environment}-user-pool"
  }
}

# User Pool Client (Web App)
resource "aws_cognito_user_pool_client" "web" {
  name         = "${var.project_name}-${var.environment}-web-client"
  user_pool_id = aws_cognito_user_pool.main.id

  generate_secret                      = false
  refresh_token_validity               = 30
  access_token_validity                = 60
  id_token_validity                    = 60
  token_validity_units {
    refresh_token = "days"
    access_token  = "minutes"
    id_token      = "minutes"
  }

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH",
    "ALLOW_USER_SRP_AUTH"
  ]

  prevent_user_existence_errors = "ENABLED"

  # OAuth configuration
  allowed_oauth_flows = ["code", "implicit"]
  allowed_oauth_scopes = [
    "email",
    "openid",
    "profile"
  ]
  allowed_oauth_flows_user_pool_client = true

  callback_urls = var.environment == "production" ? [
    "https://${var.project_name}.com",
    "https://www.${var.project_name}.com"
  ] : [
    aws_cloudfront_distribution.frontend.domain_name,
    "http://localhost:3000"
  ]

  logout_urls = var.environment == "production" ? [
    "https://${var.project_name}.com",
    "https://www.${var.project_name}.com"
  ] : [
    aws_cloudfront_distribution.frontend.domain_name,
    "http://localhost:3000"
  ]

  supported_identity_providers = ["COGNITO"]
}

# User Pool Domain
resource "aws_cognito_user_pool_domain" "main" {
  domain       = "${var.project_name}-${var.environment}"
  user_pool_id = aws_cognito_user_pool.main.id
}

# Store Cognito configuration in Secrets Manager
resource "aws_secretsmanager_secret" "cognito_config" {
  name        = "${var.project_name}/${var.environment}/cognito/config"
  description = "Cognito configuration for ${var.project_name}"
}

resource "aws_secretsmanager_secret_version" "cognito_config" {
  secret_id = aws_secretsmanager_secret.cognito_config.id

  secret_string = jsonencode({
    userPoolId     = aws_cognito_user_pool.main.id
    clientId       = aws_cognito_user_pool_client.web.id
    domain         = aws_cognito_user_pool_domain.main.domain
    region         = var.aws_region
  })
}
