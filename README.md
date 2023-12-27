# Threads Lite - Unleashing Ideas, Connecting Minds

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

Welcome to Threads Lite, your go-to social media platform for sharing thoughts and ideas with the world! Our platform is designed to provide a seamless experience, combining the power of Node.js, React, GraphQL, and MongoDB to bring your social networking vision to life.

## Description

This small-scale Node + React application uses Apollo Client for GraphQL and React Router for routing. The application is styled using SCSS. The application is deployed on Vercel.

## Tech Stack

1. **Node.js**
    - Description: Fueling the Backend Engine, Node.js handles requests, processes data, and orchestrates the communication flow with efficiency.
    - Modules Used: Express, Mongoose, JWT, dotenv, and more.
2. **GraphQL + Apollo Server**
    - Description: The cutting-edge query language for APIs and a runtime for executing queries with existing data, providing an efficient alternative to REST combined with community-driven GraphQL server that seamlessly works with any GraphQL schema and can be deployed in any environment.
    - Usage: We leverage ApolloServer from 'apollo-server-express' and various plugins from 'apollo-server-core' to create a GraphQL server and define our schema and resolvers for effective data communication.
3. **MongoDB**
    - Description: A powerful, cross-platform document-oriented database program that stores and retrieves data efficiently.
    - Connection: We use Mongoose to connect with our MongoDB database.
4. **JWT (JSON Web Tokens)**
    - Description: Compact, URL-safe means representing claims for secure data transfer between parties.
    - Purpose: Primarily utilized for authentication to ensure a secure user experience.
5. **Express**
    - Description: A minimal and flexible Node.js web application framework, providing a robust set of features for web and mobile applications.
    - Role: Powers our server, handling requests from the client.
6. **React**
    - Description: A JavaScript library for building user interfaces, particularly effective for single-page applications.
    - Implementation: Drives our front end, providing an interactive and dynamic user experience.
7. **SCSS**
    - Description: A preprocessor scripting language compiled into Cascading Style Sheets (CSS) for enhanced styling capabilities.
    - Application: Used to style our front end, ensuring an aesthetically pleasing and modern look.
8. **React Router**
    - Description: A standard routing library for React, crucial for handling navigation seamlessly within our application.
    - Role: Manages routing to enhance the user experience.

### Deployment

Our application is deployed on Vercel, ensuring a reliable and scalable platform for users to access Threads Lite effortlessly.

Explore Threads Lite and connect with the world through a cutting-edge social media experience!

## Environments

| Environment | Branch | URL                                 | Server/Playground URL         |
| ----------- | ------ | ----------------------------------- | ----------------------------- |
| Production  | master | https://threads-lite-ms.vercel.app/ |                               |
| Local       |        | http://localhost:3000               | http://localhost:4000/graphql |

## Local Environment Setup

Follow these steps to set up the project locally.

### Prerequisites

[![Nodejs Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![React Badge](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
![GraphQL](https://img.shields.io/badge/-GraphQL-E10098?style=for-the-badge&logo=graphql&logoColor=white)
[![Mongo db Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()
![Express](https://img.shields.io/badge/express-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=white)

### Installation

1. Clone the repository

```bash
git clone git@github.com:Mukulsingh27/threads-lite.git
```

2. Install NPM packages in both root and client directory

```bash
npm install
```

3. Create a `.env` file in the root directory and add the following environment variables

```bash
MONGO_DB_URL =<CONNECTION_URL>
JWT_SECRET_KEY =<KEY>
PORT =<PORT>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_MAIL=<EMAIL_ID>
SMTP_PASSWORD=<APP_PASSWORD>
CLIENT_URL=http://localhost:3000
```

4. Start the server from the root directory

```bash
npm run dev
```

5. Start the client from `client` directory

```bash
cd client && npm run start
```

Notes:

-   Change the `ApolloClient` URI in `client/src/index.js` to `http://localhost:<PORT>/graphql` before starting the client while running the application locally. And change it back to `/graphql` before creating a production build.

-   The client URI in `.env` is different for production (https://threads-lite-ms.vercel.app/) and local (http://localhost:3000/graphql) environments.

## Usage

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Steps to contribute

1. Fork the repository
2. Create a new branch from master
3. Make changes and commit them
4. Push the changes and open a pull request

## Screenshots

<img width="1800" alt="Screenshot 2023-12-27 at 10 58 57 AM" src="https://github.com/Mukulsingh27/threads-lite/assets/54891099/afce43cb-30a1-4cdb-9a17-df57e3db0553">

_For more visual insights, explore the Screenshots in the Client Folder [README.md](./client/README.md) showcasing the Threads Lite interface, highlighting key features and design elements._
