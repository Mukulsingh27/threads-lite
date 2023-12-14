import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import resolvers from './resolver.js';
import typeDefs from './schemaGQL.js';

// 3mUbD3Re6BHEbpkw - mukulsingh27 - mongoDB Atlas password

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
