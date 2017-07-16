# 4 dots

[![Build Status](https://travis-ci.org/jSherz/4dots.svg?branch=master)](https://travis-ci.org/jSherz/4dots) [![Coverage Status](https://coveralls.io/repos/github/jSherz/4dots/badge.svg?branch=master)](https://coveralls.io/github/jSherz/4dots?branch=master)

A simple React & Redux application with a backend built with [hapi.js](https://hapijs.com), [mongoose](http://mongoosejs.com/)
and [MongoDB](https://www.mongodb.com/).

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

# Infrastructure

See the `infrastructure` folder for a Terraform config that will setup an Elastic Container Service and Registry to host the
app.

# Backend API

See the `backend` folder for a hapi API that powers the frontend.

# Quick start

`yarn` can be substituted for `npm` below:

```bash
cd backend
yarn install
yarn run start &

cd ../
yarn install
yarn run start
```
