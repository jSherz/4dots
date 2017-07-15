# Virtual network for our application
# See: https://aws.amazon.com/documentation/vpc/
resource "aws_vpc" "4dots" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true

  tags {
    Name = "4dots"
  }
}

resource "aws_subnet" "4dots_primary" {
  vpc_id            = "${aws_vpc.4dots.id}"
  availability_zone = "eu-west-2a"
  cidr_block        = "${cidrsubnet(aws_vpc.4dots.cidr_block, 4, 1)}"

  tags {
    Name = "4dots - primary"
  }
}

resource "aws_subnet" "4dots_secondary" {
  vpc_id            = "${aws_vpc.4dots.id}"
  availability_zone = "eu-west-2b"
  cidr_block        = "${cidrsubnet(aws_vpc.4dots.cidr_block, 4, 2)}"

  tags {
    Name = "4dots - secondary"
  }
}

# Allow internet comms
resource "aws_internet_gateway" "4dots_gw" {
  vpc_id = "${aws_vpc.4dots.id}"

  tags {
    Name = "4dots"
  }
}

resource "aws_route_table" "4dots" {
  vpc_id = "${aws_vpc.4dots.id}"

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = "${aws_internet_gateway.4dots_gw.id}"
  }

  tags {
    Name = "4dots"
  }
}

resource "aws_route_table_association" "4dots_primary" {
  subnet_id      = "${aws_subnet.4dots_primary.id}"
  route_table_id = "${aws_route_table.4dots.id}"
}

resource "aws_route_table_association" "4dots_secondary" {
  subnet_id      = "${aws_subnet.4dots_secondary.id}"
  route_table_id = "${aws_route_table.4dots.id}"
}
