# RDS PostgreSQL Database (Minimal Cost Configuration)
# Cost: ~$15-20/month with db.t3.micro + free tier

resource "aws_db_subnet_group" "main" {
  name       = "${var.project_name}-${var.environment}-db-subnet"
  subnet_ids = aws_subnet.private[*].id

  tags = {
    Name = "${var.project_name}-${var.environment}-db-subnet-group"
  }
}

resource "aws_security_group" "rds" {
  name        = "${var.project_name}-${var.environment}-rds-sg"
  description = "Security group for RDS PostgreSQL"
  vpc_id      = aws_vpc.main.id

  ingress {
    description     = "PostgreSQL from Lambda/ECS"
    from_port       = 5432
    to_port         = 5432
    protocol        = "tcp"
    security_groups = [aws_security_group.lambda.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-rds-sg"
  }
}

resource "aws_db_instance" "postgres" {
  identifier = "${var.project_name}-${var.environment}"

  # Instance configuration (MINIMAL COST)
  instance_class       = "db.t3.micro"  # Free tier eligible: 750 hrs/month
  allocated_storage    = 20             # Free tier: 20GB
  max_allocated_storage = 100           # Auto-scaling limit
  storage_type         = "gp3"          # Latest generation, cost-effective
  storage_encrypted    = true

  # Engine
  engine               = "postgres"
  engine_version       = "16.1"

  # Database
  db_name  = "quantifiedme"
  username = "admin"
  password = var.db_password

  # Network
  db_subnet_group_name   = aws_db_subnet_group.main.name
  vpc_security_group_ids = [aws_security_group.rds.id]
  publicly_accessible    = false

  # Backup (MINIMAL for cost savings)
  backup_retention_period = 7           # 7 days (minimum recommended)
  backup_window          = "03:00-04:00"
  maintenance_window     = "mon:04:00-mon:05:00"
  skip_final_snapshot    = var.environment == "staging" ? true : false
  final_snapshot_identifier = var.environment == "production" ? "${var.project_name}-final-snapshot" : null

  # Performance Insights (DISABLED for cost)
  enabled_cloudwatch_logs_exports = []
  performance_insights_enabled    = false

  # Auto minor version upgrade
  auto_minor_version_upgrade = true

  # Deletion protection for production
  deletion_protection = var.environment == "production" ? true : false

  tags = {
    Name = "${var.project_name}-${var.environment}-postgres"
  }
}

# Secret for database credentials
resource "aws_secretsmanager_secret" "db_credentials" {
  name        = "${var.project_name}/${var.environment}/database/credentials"
  description = "Database credentials for ${var.project_name}"

  tags = {
    Name = "${var.project_name}-${var.environment}-db-credentials"
  }
}

resource "aws_secretsmanager_secret_version" "db_credentials" {
  secret_id = aws_secretsmanager_secret.db_credentials.id

  secret_string = jsonencode({
    username = aws_db_instance.postgres.username
    password = var.db_password
    engine   = "postgres"
    host     = aws_db_instance.postgres.address
    port     = aws_db_instance.postgres.port
    dbname   = aws_db_instance.postgres.db_name
    url      = "postgresql://${aws_db_instance.postgres.username}:${var.db_password}@${aws_db_instance.postgres.address}:${aws_db_instance.postgres.port}/${aws_db_instance.postgres.db_name}"
  })
}
