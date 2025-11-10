# Lambda Functions for Backend API (Serverless - PAY PER USE)
# Cost: Free tier includes 1M requests/month, then $0.20 per 1M requests

# Security Group for Lambda functions
resource "aws_security_group" "lambda" {
  name        = "${var.project_name}-${var.environment}-lambda-sg"
  description = "Security group for Lambda functions"
  vpc_id      = aws_vpc.main.id

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-lambda-sg"
  }
}

# IAM Role for Lambda
resource "aws_iam_role" "lambda" {
  name = "${var.project_name}-${var.environment}-lambda-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.project_name}-${var.environment}-lambda-role"
  }
}

# Lambda execution policy
resource "aws_iam_role_policy_attachment" "lambda_basic" {
  role       = aws_iam_role.lambda.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"
}

# Policy for Secrets Manager access
resource "aws_iam_role_policy" "lambda_secrets" {
  name = "${var.project_name}-${var.environment}-lambda-secrets-policy"
  role = aws_iam_role.lambda.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "secretsmanager:GetSecretValue"
        ]
        Resource = [
          aws_secretsmanager_secret.db_credentials.arn,
          aws_secretsmanager_secret.cognito_config.arn
        ]
      }
    ]
  })
}

# Lambda Layer for Node.js dependencies (to be created during deployment)
resource "aws_lambda_layer_version" "node_modules" {
  count               = var.environment == "staging" ? 0 : 0  # Will be created by CI/CD
  filename            = "lambda-layer.zip"
  layer_name          = "${var.project_name}-${var.environment}-node-modules"
  compatible_runtimes = ["nodejs20.x"]
  description         = "Node.js dependencies for ${var.project_name}"
}

# API Lambda Function (placeholder - will be deployed by CI/CD)
resource "aws_lambda_function" "api" {
  function_name = "${var.project_name}-${var.environment}-api"
  role          = aws_iam_role.lambda.arn
  handler       = "index.handler"
  runtime       = "nodejs20.x"
  timeout       = 30
  memory_size   = 256  # Minimal for cost

  # Placeholder code (will be replaced by CI/CD)
  filename         = "lambda-placeholder.zip"
  source_code_hash = filebase64sha256("lambda-placeholder.zip")

  vpc_config {
    subnet_ids         = aws_subnet.private[*].id
    security_group_ids = [aws_security_group.lambda.id]
  }

  environment {
    variables = {
      ENVIRONMENT        = var.environment
      DB_SECRET_NAME     = aws_secretsmanager_secret.db_credentials.name
      COGNITO_SECRET_NAME = aws_secretsmanager_secret.cognito_config.name
    }
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-api-lambda"
  }

  lifecycle {
    ignore_changes = [
      filename,
      source_code_hash,
      last_modified
    ]
  }
}

# Lambda Function URL (simpler alternative to API Gateway for minimal cost)
resource "aws_lambda_function_url" "api" {
  function_name      = aws_lambda_function.api.function_name
  authorization_type = "NONE"

  cors {
    allow_credentials = true
    allow_origins     = ["*"]  # Will be restricted in production
    allow_methods     = ["*"]
    allow_headers     = ["*"]
    max_age           = 86400
  }
}

# Create placeholder Lambda zip
resource "null_resource" "lambda_placeholder" {
  provisioner "local-exec" {
    command = <<EOF
echo 'exports.handler = async (event) => ({ statusCode: 200, body: JSON.stringify({ message: "API placeholder" }) });' > index.js
zip lambda-placeholder.zip index.js
rm index.js
EOF
    working_dir = path.module
  }

  triggers = {
    always_run = timestamp()
  }
}
