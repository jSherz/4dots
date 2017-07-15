data "aws_acm_certificate" "4dots_api_jsherz_com" {
  domain   = "4dots-api.jsherz.com"
  statuses = ["ISSUED"]
}

resource "aws_s3_bucket" "4dots_access_logs" {
  bucket = "4dots-access-logs"
  acl    = "private"

  policy = <<EOF
{
  "Id": "4DotsApiELB",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "4DotsApiELBPutAccess",
      "Action": [
        "s3:PutObject"
      ],
      "Effect": "Allow",
      "Resource": [
        "arn:aws:s3:::4dots-access-logs/*",
        "arn:aws:s3:::4dots-access-logs"
      ],
      "Principal": "*"
    }
  ]
}
EOF

  tags {
    Name = "4dots_access_logs"
  }
}

resource "aws_elb" "4dots" {
  name = "4dots"

  access_logs {
    bucket        = "${aws_s3_bucket.4dots_access_logs.bucket}"
    bucket_prefix = ""
    interval      = 60
  }

  listener {
    instance_port     = 8080
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  listener {
    instance_port      = 8080
    instance_protocol  = "http"
    lb_port            = 443
    lb_protocol        = "https"
    ssl_certificate_id = "${data.aws_acm_certificate.4dots_api_jsherz_com.arn}"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:8080/"
    interval            = 30
  }

  instances                   = ["${aws_instance.4dots_1.id}"]
  cross_zone_load_balancing   = true
  idle_timeout                = 400
  connection_draining         = true
  connection_draining_timeout = 400

  subnets = [
    "${aws_subnet.4dots_primary.id}",
    "${aws_subnet.4dots_secondary.id}",
  ]

  tags {
    Name = "4dots"
  }
}

output "elb_dns_name" {
  value = "${aws_elb.4dots.dns_name}"
}
