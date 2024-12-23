import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from '@apollo/client';
import * as Sentry from "@sentry/react";

const customFetch = async (uri, options) => {

    const body = JSON.parse(options.body);

    const operationName = body[0]?.operationName || body.operationName ;

    const span = Sentry.startInactiveSpan({op: 'graphql.fetch', name: operationName ?? 'operation undefined'})

    const result = await fetch(uri, options);
    span.end();
    return result;

}

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
    fetch: customFetch
})

const sentryLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    const operationName = operation.operationName;
    const querySpan = Sentry.startInactiveSpan({
      op: 'graphql',
      name: operationName,
    });

    operation.setContext({ start: new Date() });

    return forward(operation).map((data) => {
      // Called after server responds
      querySpan.end();
      return data;
    })
  });

export const client = new ApolloClient({
  link: ApolloLink.from([
    sentryLink,
    httpLink
  ]),
  cache: new InMemoryCache(),
});


