import {
	ApolloServerPluginLandingPageGraphQLPlayground,
	ApolloServerPluginDrainHttpServer,
	ApolloServerPluginLandingPageDisabled,
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './schema.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import router from './routes/emailRoutes.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the .env file
if (process.env.NODE_ENV !== 'production') {
	dotenv.config();
}

// Port
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
	.connect(process.env.MONGO_DB_URL)
	.then(() => {
		console.log('MongoDB connected successfully !!');
	})
	.catch((err) => {
		console.log(err);
	});

// Import Models
import './models/User.js';
import './models/Quote.js';

// Import the resolvers
import resolvers from './resolver.js';

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const { authorization } = req.headers || {};

		// Check if authorization header is present
		if (authorization) {
			// Verify the token
			const { userID } = jwt.verify(
				authorization,
				process.env.JWT_SECRET_KEY
			);
			return { userID };
		}
	},
	plugins: [
		ApolloServerPluginDrainHttpServer({ httpServer }),
		process.env.NODE_ENV !== 'production'
			? ApolloServerPluginLandingPageGraphQLPlayground()
			: ApolloServerPluginLandingPageDisabled(),
	],
});

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.use(cors()); // Use this after the variable declaration

app.use(express.json()); // tell the server to accept the json data from frontend

//Signup and login
app.use('/api', router);

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

httpServer.listen({ port }, () => {
	console.log(
		`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
	);
});
