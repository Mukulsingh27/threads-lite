import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server';
import typeDefs from './schemaGQL.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

// Read the .env file
dotenv.config();

// Connect to MongoDB
mongoose.connect( process.env.MONGO_DB_URL ).then( () => {
	console.log('MongoDB connected');
} ).catch( err => {
	console.log( err );
} )

// Import Models
import './models/User.js';
import './models/Quote.js';

// Import the resolvers
import resolvers from './resolver.js';

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({ req }) => {
		const { authorization } = req.headers || {};

		// Check if authorization header is present
		if( authorization ) {
			// Verify the token
			const { userID } = jwt.verify( authorization, process.env.JWT_SECRET_KEY );
			return { userID };
		}

	},
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground()
	]
})


// listen on 5000
server.listen({ port: process.env.PORT || 5000 }).then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
