// server.js
import express from 'express';
import {ApolloServer, gql } from 'apollo-server-express';
import * as Sentry from '@sentry/node'

Sentry.init({
    dsn: "https://e0379517e02227037502479fef791698@o4508021432844288.ingest.us.sentry.io/4508055042654208",
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
  
    // Set sampling rate for profiling - this is relative to tracesSampleRate
  });

const app = express();

// Define your GraphQL schema
const typeDefs = gql`
  type Query {
    hello(name: String!): String
    goodbye(name: String!): String
  }
`;

// Define the resolvers for each query
const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello, ${name}!`,
    goodbye: (_, { name }) => `Goodbye, ${name}!`,
  },
};

// Create Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });
await server.start();
server.applyMiddleware({ app });

// Start the Express server
app.listen(4000, () => {
  console.log(`Server running at http://localhost:4000${server.graphqlPath}`);
});