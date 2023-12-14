import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import typeDefs from './schemaGQL.js';
import mongoose, { Model } from 'mongoose';
import dotenv from 'dotenv';

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
	plugins: [
		ApolloServerPluginLandingPageGraphQLPlayground()
	]
})

server.listen().then(( {url }) => {
	console.log(`Yah, ${url}`);
})
