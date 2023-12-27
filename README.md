# Threads Lite - Social Media Platform

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

Welcome to Threads Lite, your go-to social media platform for sharing thoughts and ideas with the world! Our platform is designed to provide a seamless experience, combining the power of Node.js, React, GraphQL, and MongoDB to bring your social networking vision to life.

## Description

This is a small scale Node + React application that uses Apollo Client for GraphQL and React Router for routing. The application is styled using SCSS. The application is deployed on Vercel.

## Tech Stack

1. **Node.js**
    - Description: The backbone of our application, Node.js handles requests from the frontend, processes them, and sends back responses.
    - Modules Used: Express, Mongoose, JWT, dotenv, and more.
2. **Apollo Server**
    - Description: A community-driven GraphQL server that seamlessly works with any GraphQL schema and can be deployed in any environment.
    - Usage: We leverage ApolloServer from 'apollo-server-express' and various plugins from 'apollo-server-core'.
3. **GraphQL**
    - Description: The cutting-edge query language for APIs and a runtime for executing queries with existing data, providing an efficient alternative to REST.
    - Implementation: Defines our schema and resolvers for effective data communication.
4. **MongoDB**
    - Description: A powerful, cross-platform document-oriented database program that stores and retrieves data efficiently.
    - Connection: We use Mongoose to establish a connection with our MongoDB database.
5. **JWT (JSON Web Tokens)**
    - Description: Compact, URL-safe means of representing claims for secure data transfer between parties.
    - Purpose: Primarily utilized for authentication to ensure a secure user experience.
6. **Express**
    - Description: A minimal and flexible Node.js web application framework, providing a robust set of features for web and mobile applications.
    - Role: Powers our server, handling requests from the client.
7. **React**
    - Description: A JavaScript library for building user interfaces, particularly effective for single-page applications.
    - Implementation: Drives our frontend, providing an interactive and dynamic user experience.
8. **SCSS**
    - Description: A preprocessor scripting language compiled into Cascading Style Sheets (CSS) for enhanced styling capabilities.
    - Application: Used to style our frontend, ensuring an aesthetically pleasing and modern look.
9. **React Router**
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

Follow these steps to setup the project locally.

### Prerequisites

[![Nodejs Badge](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Nodejs Badge](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)]()

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

4. Start the server from root directory

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
