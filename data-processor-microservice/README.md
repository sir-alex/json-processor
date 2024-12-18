# Data Processor Microservice

## Environment Variables

| Name             | Default Value                          | Description                                                                 |
|------------------|----------------------------------------|-----------------------------------------------------------------------------|
| `MONGO_URL`      | `mongodb://localhost:27017/cardnexus-test` | The URL of the MongoDB instance to connect to.                              |
| `EXTERNAL_CARDS` | `[]`                                   | A JSON array of external card URLs to process.                              |
| `JSON_BUFFER_SIZE` | `500`                                 | The buffer size for processing JSON data in batches.                        |
| `MIN_POOL_SIZE`  | `5`                                    | The minimum number of connections in the MongoDB connection pool.           |
| `MAX_POOL_SIZE`  | `90`                                   | The maximum number of connections in the MongoDB connection pool.           |
| `ENV_NAME`       | `development`                          | The environment name (e.g., `development`, `production`, `jest`).           |

## Description

This microservice processes card data from external sources and saves it to a MongoDB database. It uses streaming and bulk batch save operations to efficiently handle large datasets.

## Setup

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set the environment variables as needed.
4. Run the application using `npm start`.

## Usage

The application will connect to the specified MongoDB instance, process the external card data, and save it to the database. Logs will provide information about the processing status and any errors encountered.

## Testing

To run the tests, use the following command:

`npm test`
