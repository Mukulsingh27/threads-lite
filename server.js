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
import './models/UserVerification.js';

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

app.use(cors({ origin: 'https://threads-lite-ms.vercel.app', credentials: true }));

app.use(express.json()); // tell the server to accept the json data from frontend

// Verify email
app.use('/verify/:token', async (req, res) => {
	try {
		const { token } = req.params;

		// Check if token is present
		if (!token) {
			return res.status(400).send('Token not found');
		}

		// Verify the token
		const { email } = jwt.verify(token, process.env.JWT_SECRET_KEY);

		// Check if user exists
		const userVerification = await mongoose
			.model('UserVerification')
			.findOne({ email });

		if (!userVerification) {
			return res.status(400).send('User verification not found');
		}

		// Check if user is already verified
		const verified = await mongoose
			.model('User')
			.findOne({ email, verified: true });

		if (verified) {
			return res.status(400).send('User already verified');
		}

		// Update the user to verified and remove the auto-expiration
		await mongoose
			.model('User')
			.findOneAndUpdate(
				{ email },
				{ verified: true },
				{ new: true, useFindAndModify: false }
			);

		// Send the response
		// res.status(200).send('User verified successfully');

		// redirect to login page
		return res.redirect( process.env.CLIENT_URL + '/login');
	} catch (error) {
		console.error('Error verifying user:', error);

		if (error.name === 'TokenExpiredError') {
			return res.status(401).send('Token has expired');
		}

		// Handle other errors
		res.status(500).send('Internal Server Error');
	}
});

await server.start();
server.applyMiddleware({ app, path: '/graphql' });

httpServer.listen({ port }, () => {
	console.log(
		`🚀 Server ready at http://localhost:4000${server.graphqlPath}`
	);
});
