# Create a task that will run the app server
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
resource "aws_ecs_task_definition" "4dots_app" {
  family = "4dots_app"

  # This relies on the container's name being the same as the repository as the
  # aws_ecr_repository.*.repository_url includes the name at the end.
  # We could build this with the ECR ID & region but we can avoid doing so in
  # this instance.
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
  },
  {
    "cpu": 128,
    "environment": [],
    "essential": true,
    "image": "${aws_ecr_repository.4dots.repository_url}:latest",
    "memory": 256,
    "memoryReservation": 128,
    "name": "4dots_app",
    "links": [
      "mongodb:mongodb"
    ]
  }
]
DEFINITION
}

# Create a service that will launch the above task definition
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_services.html
resource "aws_ecs_service" "4dots_app" {
  name          = "4dots_app"
  cluster       = "${aws_ecs_cluster.4dots.id}"
  desired_count = 1

  task_definition = "${aws_ecs_task_definition.4dots_app.family}:${aws_ecs_task_definition.4dots_app.revision}"
}
