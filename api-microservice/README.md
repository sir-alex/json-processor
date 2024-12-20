## Project Description

This project is a microservice API.

## Environment Variables

The following environment variables are required to run the application:

- `MONGO_URI`: The URI for connecting to the MongoDB database.
- `DEFAULT_RESPONSE_LIMIT`: The default limit for responses.

## Installation

`npm install`

## Running the app

#### development
`npm run start`

#### watch mode
`npm run start:dev`

#### production mode
`npm run start:prod`

## Swagger Documentation
`npm run start` and go to `http://localhost:3000/api` to see the swagger UI documentation and available endpoints

## Tests

#### unit tests
`npm run test`

#### e2e tests
`npm run test:e2e`

#### test coverage
`npm run test:cov`
