data "template_file" "4dots_frontend" {
  template = <<EOF
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "Allow Public Access to All Objects",
			"Effect": "Allow",
			"Principal": "*",
			"Action": "s3:GetObject",
			"Resource": "arn:aws:s3:::4dots-frontend/*"
		}
	]
}
EOF
}

resource "aws_s3_bucket" "4dots_frontend" {
  bucket = "4dots-frontend"
  acl    = "public-read"

  policy = "${data.template_file.4dots_frontend.rendered}"
}

resource "aws_s3_bucket" "4dots_frontend_logs" {
  bucket = "${aws_s3_bucket.4dots_frontend.bucket}-logs"
  acl    = "private"
}

resource "aws_cloudfront_distribution" "4dots_frontend" {
  enabled             = true
  aliases             = ["4dots.jsherz.com"]
  price_class         = "PriceClass_200"
  default_root_object = "index.html"

  logging_config {
    include_cookies = false
    bucket          = "${aws_s3_bucket.4dots_frontend_logs.bucket}.s3.amazonaws.com"
  }

  default_cache_behavior {
    cached_methods         = ["GET", "HEAD"]
    allowed_methods        = ["GET", "HEAD"]
    viewer_protocol_policy = "redirect-to-https"
    target_origin_id       = "s3_${aws_s3_bucket.4dots_frontend.bucket}"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    min_ttl     = 0
    default_ttl = 3600
    max_ttl     = 86400
    compress    = true
  }

  origin {
    domain_name = "${aws_s3_bucket.4dots_frontend.bucket}.s3-${aws_s3_bucket.4dots_frontend.region}.amazonaws.com"
    origin_id   = "s3_${aws_s3_bucket.4dots_frontend.bucket}"

    custom_origin_config {
      http_port              = "80"
      https_port             = "443"
      origin_protocol_policy = "http-only"
      origin_ssl_protocols   = ["TLSv1", "TLSv1.1", "TLSv1.2"]
    }
  }

  custom_error_response {
    error_code            = "403"
    response_code         = "200"
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  custom_error_response {
    error_code            = "404"
    response_code         = "200"
    response_page_path    = "/index.html"
    error_caching_min_ttl = 300
  }

  viewer_certificate {
    acm_certificate_arn      = "${var.4dots_jsherz_com_certificate_arn}"
    minimum_protocol_version = "TLSv1"
    ssl_support_method       = "sni-only"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
      locations        = []
    }
  }
}
