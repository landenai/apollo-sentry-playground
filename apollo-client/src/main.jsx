import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient'; // Import the Apollo Client
import * as Sentry from "@sentry/react";


import App from './App.jsx'
import './index.css'

Sentry.init({
  dsn: "https://acd422f6e9bee8028531e46cc76b34ac@o4508021432844288.ingest.us.sentry.io/4508059456962560",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["http://localhost:4000/graphql"],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  /*beforeSendTransaction(transaction) {
        // Filter out unwanted spans (e.g., certain API requests)
        transaction.spans = transaction.spans.filter(span => {
          return !(span.op === 'http.client');
        });

        return transaction
  }*/
  /*beforeSendSpan(span) {
    if (span.description === 'POST http://localhost:4000/graphql') {
      return;
    }

    return span;
  }*/
});

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
)
