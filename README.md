# Threads Lite

[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)

Threads Lite is a social media platform for sharing your thoughts and ideas with the world.

## Description

This is a Node + React application that uses Apollo Client for GraphQL and React Router for routing. The application is styled using SCSS.

## Environments

| Environment | Branch | URL                                 | Server/Playground URL         |
| ----------- | ------ | ----------------------------------  | ----------------------------- |
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
MONGO_DB_URL = <CONNECTION_URL>
JWT_SECRET_KEY = <KEY>
PORT = <PORT>
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

Note: Change the `ApolloClient` URI in `client/src/index.js` to `http://localhost:<PORT>/graphql` before starting the client while running the application locally. And change it back to `/graphql` before creating a production build.

## Usage

Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

### Steps to contribute

1. Fork the repository
2. Create a new branch from master
3. Make changes and commit them
4. Push the changes and open a pull request
