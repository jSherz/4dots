# NB: This certificate must exist in us-east-1
variable "4dots_jsherz_com_certificate_arn" {
  type    = "string"
  default = "arn:aws:acm:us-east-1:247940857651:certificate/1ad713c4-f935-4da5-a10f-0521b0b2b1b0"
}

# Create a cluster to run our containers
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html
resource "aws_ecs_cluster" "4dots" {
  name = "4dots"
}

data "template_file" "ecs_user_data" {
  template = "${file("user-data.sh")}"

  vars {
    cluster = "${aws_ecs_cluster.4dots.name}"
  }
}

# Ensure the EC2 instances we create can be part of the ECS cluster
resource "aws_iam_role" "4dots_ecs_instance" {
  name = "4dots_ecs_instance"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "ec2.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "4dots_ecs_instance_policy" {
  role       = "${aws_iam_role.4dots_ecs_instance.name}"
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonEC2ContainerServiceforEC2Role"
}

resource "aws_iam_instance_profile" "4dots_ecs_instance" {
  name = "4dots_ecs_instance"
  role = "${aws_iam_role.4dots_ecs_instance.name}"
}

# Lookup the latest ECS ready AMI
data "aws_ami" "ecs" {
  most_recent = true

  filter {
    name   = "owner-alias"
    values = ["amazon"]
  }

  filter {
    name   = "name"
    values = ["*amazon-ecs-optimized"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

resource "aws_key_pair" "4dots_james" {
  key_name   = "4dots_james"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCehuOhq1ZrHGoO4UwpG2IdIUPMbhZEW5wmh1QD5/ElAPTcj2Ony0nwB76AVxtUzmAGGoA/iiy7p3FCZwX7UYte9Bfv3sNOSgnhUO0zxhd6P4sdqzOVpJqvtaHdpaJ0KOGe2tttXikq6Ct2mwkeuMHZzlyRzIebep+soxgp8LtxMmgiSCSHdkdd2aeSNIzvgqsMe7UL7kZAq6jTqUQudU06gZx+Gw0NisZDt1xzPFINvNsI2BSdoewiTVsLIMSjudMrzapXgeHn5iIJtqJL33RIT4uATxp675J0rYAa6yE7/cFx7un6QL2f18rgKdSwkEoXlKiC/TFVKC22IXa1tzAT james@jsj-box.int.jsherz.com"
}

# Network interface for below ECS instance
resource "aws_network_interface" "4dots_1" {
  subnet_id   = "${aws_subnet.4dots_primary.id}"
  private_ips = ["10.0.16.5"]
}

# Instance to run the ECS containers
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
resource "aws_instance" "4dots_1" {
  instance_type = "t2.micro"
  ami           = "${data.aws_ami.ecs.id}"
  user_data     = "${data.template_file.ecs_user_data.rendered}"
  key_name      = "${aws_key_pair.4dots_james.key_name}"
  monitoring    = true

  depends_on = [
    "aws_internet_gateway.4dots_gw",
    "aws_iam_instance_profile.4dots_ecs_instance",
  ]

  iam_instance_profile = "${aws_iam_instance_profile.4dots_ecs_instance.name}"

  network_interface {
    network_interface_id = "${aws_network_interface.4dots_1.id}"
    device_index         = 0
  }

  tags {
    Name = "4dots"
  }
}

# A home for our custom containers
resource "aws_ecr_repository" "4dots" {
  name = "4dots"
}

resource "aws_iam_group" "4dots_container_artists" {
  name = "4dots_container_artists"
}

resource "aws_iam_role" "4dots_container_artists" {
  name = "4dots_container_artists"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
       "Service": ["ec2.amazonaws.com"]
    },
    "Action": ["sts:AssumeRole"]
  }]
}
EOF
}

resource "aws_ecr_repository_policy" "4dots" {
  repository = "${aws_ecr_repository.4dots.name}"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "4dotsContainerArtistsAccessECR",
            "Effect": "Allow",
            "Principal": {
              "AWS": "${aws_iam_role.4dots_container_artists.arn}"
            },
            "Action": [
                "ecr:GetDownloadUrlForLayer",
                "ecr:BatchGetImage",
                "ecr:BatchCheckLayerAvailability",
                "ecr:PutImage",
                "ecr:InitiateLayerUpload",
                "ecr:UploadLayerPart",
                "ecr:CompleteLayerUpload",
                "ecr:DescribeRepositories",
                "ecr:GetRepositoryPolicy",
                "ecr:ListImages",
                "ecr:DeleteRepository",
                "ecr:BatchDeleteImage",
                "ecr:SetRepositoryPolicy",
                "ecr:DeleteRepositoryPolicy"
            ]
        }
    ]
}
EOF
}
