import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';

import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
import User from './resolvers/user';
import Post from './resolvers/post';
import Comment from './resolvers/comment';
import Subscription from './resolvers/subscription';
import './prisma';
const pubsub = new PubSub();
const server = new GraphQLServer({
	typeDefs: './src/schema.graphql',
	resolvers: {
		Query,
		Mutation,
		User,
		Post,
		Comment,
		Subscription
	},
	context: {
		db,
		pubsub
	}

})

server.start(() => {
	console.log('the server is up')
})