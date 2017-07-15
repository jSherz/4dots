resource "aws_vpc" "4dots" {
  cidr_block = "10.0.0.0/16"
}

resource "aws_subnet" "primary" {
  vpc_id            = "${aws_vpc.4dots.id}"
  availability_zone = "eu-west-2a"
  cidr_block        = "${cidrsubnet(aws_vpc.4dots.cidr_block, 4, 1)}"
}

resource "aws_subnet" "secondary" {
  vpc_id            = "${aws_vpc.4dots.id}"
  availability_zone = "eu-west-2b"
  cidr_block        = "${cidrsubnet(aws_vpc.4dots.cidr_block, 4, 2)}"
}
