# Coding Assessment

This project using NextJS built using monorepo architecture

## Prerequisite

1. Docker
2. NodeJS Min Version 18

## Running Application In Dev Mode

1. run the docker services for backend

   ```
   yarn docker-compose up -d
   ```

   Make sure all service has running
   ![plot](./assets/running-docker-dev.png)

2. start the application

   ```
   yarn dev
   ```

3. Run database migration

   ```
   yarn typeorm:run
   ```

4. Run database seed for initialize application data

   ```
   yarn db:seed
   ```

5. Open the application on http://localhost:1321

## Running App In Production Mode

1. Build application

   ```
   yarn build
   ```

2. Run database migration

   ```
   yarn typeorm:run
   ```

3. Run database seed for initialize application data

   ```
   yarn db:seed
   ```

4. Start application in production mode

   ```
   yarn start
   ```

5. Open the application on http://localhost:1321

## Build Docker Image

1. change directory to ./misc/docker

   ```
   cd misc/docker
   ```

2. build using `docker compose` command

   ```
   docker compose -f docker-compose.production.yml build app
   ```

## Run Production Mode using Docker

1. change directory to ./misc/docker

   ```
   cd misc/docker
   ```

2. copy .env file for docker compose

   ```
   cp ../../.env .env
   ```

3. run application using `docker compose` command

   ```
   docker compose -f docker-compose.production.yml up -d
   ```

## Default User Auth

### Admin

```
email: admin@test.net
password: admin
```

## Deployed Application

You can review the deployed version application on: https://mengaji-online-assessment.vercel.app

# Screenshots

![plot](./assets/signin.png)
![plot](./assets/signup.png)
![plot](./assets/dashboard.png)
![plot](./assets/products.png)
![plot](./assets/discount-rules.png)
![plot](./assets/buyer-view.png)
![plot](./assets/cart-view.png)
![plot](./assets/checkout.png)
