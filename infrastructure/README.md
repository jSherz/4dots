# 4dots (infrastructure)

This folder contains the [Terraform](https://www.terraform.io/) configuration to configure:

* A VPC with two subnets and internet gateway.

* A basic EC2 container service cluster with one instance.

* An EC2 container registry.

* A MongoDB container & an app service container (as one task definition).

* An ELB to access the above, with bucket for access logs.

## Running

The HCL requires a ACM certificate setup for the ELB to run an HTTPS listener (see `elb.tf`).

```bash
# View changes
terraform plan

# Execute changes
terraform apply
```
