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
