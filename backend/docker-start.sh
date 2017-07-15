#!/bin/sh

echo "Setting DATABASE_URL..."

export DATABASE_URL="$(echo $MONGODB_PORT | sed "s/tcp/mongodb/g")/4dots"

echo "Starting 4dots..."

export NODE_ENV=production
yarn run start
