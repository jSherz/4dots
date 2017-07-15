resource "aws_api_gateway_rest_api" "4dots" {
  name        = "4dots API"
  description = "Simple hapi.js serverless service"
}

resource "aws_api_gateway_resource" "get_leaderboard" {
  rest_api_id = "${aws_api_gateway_rest_api.4dots.id}"
  parent_id   = "${aws_api_gateway_rest_api.4dots.root_resource_id}"
  path_part   = "leaderboard"
}

resource "aws_api_gateway_method" "get_leaderboard" {
  rest_api_id   = "${aws_api_gateway_rest_api.4dots.id}"
  resource_id   = "${aws_api_gateway_resource.get_leaderboard.id}"
  http_method   = "GET"
  authorization = "NONE"
}
