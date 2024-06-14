# chatalkative-back

## Overview

`Chatalkative` is a Nest.js backend service to interact with GPT, make images, request corrections, among others.

## Prerequisites

- API Key generated into your API GPT account. Use the .env file to paste this key.API Key generated from your GPT API account. Use the .env file to paste this key.
- Docker (if you plan to run the project in a container)

## Steps to Run the Project on locally

### 1. Clone the Repository and enter the folder

```
git clone https://github.com/arayavalencia96/chatalkative-back.git
cd chatalkative-back
```

### 2. Install dependencies

```
yarn
```

### 3. Create a .env file based on the .env.template file and add your GPT API key.

### 4. Start the project in development mode with the following command

```
yarn start:dev
```

## Steps to Run the Project Using Docker

### 1. Pull the Docker Image

```
docker pull axelaraya/chatalkative-back:latest
```

### 2. Run the Docker Container

```
docker run -d -p 3000:3000 axelaraya/chatalkative-back:latest
```

### 3. Access the API

http://localhost:3000/api
