# Create a task that will run the app server
# See: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
resource "aws_ecs_task_definition" "4dots_app" {
  family = "4dots_app"

  container_definitions = <<DEFINITION
[
  {
    "cpu": 128,
    "environment": [],
    "essential": true,
    "image": "node:6.11",
    "memory": 256,
    "memoryReservation": 128,
    "name": "4dots_app"
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
