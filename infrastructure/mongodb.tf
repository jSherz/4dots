# Create a cluster to run our containers
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ECS_clusters.html
resource "aws_ecs_cluster" "4dots" {
  name = "4dots"
}

# Create a task that will run the MondoDB server
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
resource "aws_ecs_task_definition" "mongo" {
  family = "mongodb"

  container_definitions = <<DEFINITION
[
  {
    "cpu": 128,
    "environment": [],
    "essential": true,
    "image": "mongo:3.2",
    "memory": 256,
    "memoryReservation": 128,
    "name": "mongodb"
  }
]
DEFINITION
}

# Create a service that will launch the above task definition
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html
resource "aws_ecs_service" "mongo" {
  name          = "mongo"
  cluster       = "${aws_ecs_cluster.4dots.id}"
  desired_count = 1

  task_definition = "${aws_ecs_task_definition.mongo.family}:${aws_ecs_task_definition.mongo.revision}"
}

data "template_file" "ecs_user_data" {
  template = "${file("user-data.sh")}"

  vars {
    cluster = "${aws_ecs_cluster.4dots.name}"
  }
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
  subnet_id   = "${aws_subnet.primary.id}"
  private_ips = ["10.0.16.5"]
}

# Instance to run the ECS containers
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_container_instance.html
resource "aws_instance" "4dots_1" {
  instance_type = "t2.micro"
  ami           = "${data.aws_ami.ecs.id}"
  user_data     = "${data.template_file.ecs_user_data.rendered}"
  key_name      = "${aws_key_pair.4dots_james.key_name}"

  network_interface {
    network_interface_id = "${aws_network_interface.4dots_1.id}"
    device_index         = 0
  }

  tags {
    Name = "4dots"
  }
}
