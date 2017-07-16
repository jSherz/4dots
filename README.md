# 4 dots

[![Build Status](https://travis-ci.org/jSherz/4dots.svg?branch=master)](https://travis-ci.org/jSherz/4dots) [![Coverage Status](https://coveralls.io/repos/github/jSherz/4dots/badge.svg?branch=master)](https://coveralls.io/github/jSherz/4dots?branch=master)

A simple React & Redux application with a backend built with [hapi.js](https://hapijs.com), [mongoose](http://mongoosejs.com/)
and [MongoDB](https://www.mongodb.com/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Quick start

The easiest option is to play the game at [https://4dots.jsherz.com](https://4dots.jsherz.com).

`yarn` can be substituted for `npm` below:

```bash
cd backend
yarn install
yarn run start &

cd ../
yarn install
yarn run start
```

# Infrastructure

See the `infrastructure` folder for a Terraform config that will setup an Elastic Container Service and Registry to host the
app.

# Backend API

See the `backend` folder for a hapi API that powers the frontend.

# Build process

The build process (see `.travis.yml`):

* Runs tests for the frontend (including publishing coverage results to coveralls).

* Builds the React app.

* Publishes the react app to an S3 bucket that sits behind a CloudFront distribution.

* Invalidates the CloudFront cache for `index.html`.

* Runs tests for the backend.

* Builds a new API container image.

* Pushes the image to an EC2 Container Repository.

Currently, the backend restart process (deleting the EC2 container task) is performed manually.
