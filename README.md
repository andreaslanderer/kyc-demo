# Purpose

This repository contains a simple microservice providing a REST-API to demonstrate a KYC migration
use case. It uses OpenAI capabilities to interpret unstructured data and extract a target data structure.

# Getting started

## Requirements

Make sure you have the following software installed:
* Node 18.12.1 or above
* NPM 9.1.2 or above
* Postman App (optional)

## Local Setup

Before you can start the service, you need to install all dependencies:

```shell
npm i
```

Before you can run the service, you need to set the following environment variables:

```shell
export SEARCH_ENDPOINT=<url>
echo $SEARCH_ENDPOINT

export COMPLETION_ENDPOINT=<url>
echo $COMPLETION_ENDPOINT

export EMBEDDING_ENDPOINT=<url>
echo $EMBEDDING_ENDPOINT

export FUNCTIONS_KEY=<your-key>
echo $FUNCTIONS_KEY 

```

Afterwards, you can run the software
```shell
npm start
```

## Testing

You can import the Postman collection into your local Postman app to test the API calls.

## Deployment

The app can easily be deployed on GCP App Engine. Please make sure you have the gcloud CLI
installed and are logged in. In that case all you need to do is to execute the following
command and enter the required information:
```
gcloud app deploy    
```