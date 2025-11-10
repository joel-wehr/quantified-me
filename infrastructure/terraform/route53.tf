# Route53 Configuration for quantifiedme.org
# Cost: $0.50/month per hosted zone + $0.40 per million queries

# Data source for existing hosted zone (assuming you already have one)
data "aws_route53_zone" "main" {
  name         = "quantifiedme.org"
  private_zone = false
}

# ACM Certificate for CloudFront (must be in us-east-1)
resource "aws_acm_certificate" "frontend" {
  provider          = aws.us_east_1
  domain_name       = var.environment == "production" ? "quantifiedme.org" : "${var.environment}.quantifiedme.org"
  validation_method = "DNS"
  subject_alternative_names = var.environment == "production" ? [
    "www.quantifiedme.org"
  ] : []

  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.project_name}-${var.environment}-cert"
  }
}

# DNS validation records
resource "aws_route53_record" "cert_validation" {
  for_each = {
    for dvo in aws_acm_certificate.frontend.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  name            = each.value.name
  records         = [each.value.record]
  ttl             = 60
  type            = each.value.type
  zone_id         = data.aws_route53_zone.main.zone_id
}

# Certificate validation
resource "aws_acm_certificate_validation" "frontend" {
  provider                = aws.us_east_1
  certificate_arn         = aws_acm_certificate.frontend.arn
  validation_record_fqdns = [for record in aws_route53_record.cert_validation : record.fqdn]
}

# A record for frontend (CloudFront)
resource "aws_route53_record" "frontend" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.environment == "production" ? "quantifiedme.org" : "${var.environment}.quantifiedme.org"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# WWW redirect (production only)
resource "aws_route53_record" "frontend_www" {
  count   = var.environment == "production" ? 1 : 0
  zone_id = data.aws_route53_zone.main.zone_id
  name    = "www.quantifiedme.org"
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend.domain_name
    zone_id                = aws_cloudfront_distribution.frontend.hosted_zone_id
    evaluate_target_health = false
  }
}

# A record for API
resource "aws_route53_record" "api" {
  zone_id = data.aws_route53_zone.main.zone_id
  name    = var.environment == "production" ? "api.quantifiedme.org" : "api-${var.environment}.quantifiedme.org"
  type    = "A"

  alias {
    name                   = aws_apigatewayv2_api.main.api_endpoint
    zone_id                = aws_apigatewayv2_api.main.api_id
    evaluate_target_health = false
  }
}

# Additional AWS provider for us-east-1 (required for CloudFront certificates)
provider "aws" {
  alias  = "us_east_1"
  region = "us-east-1"
}
