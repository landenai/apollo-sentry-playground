// src/App.js
import React, { useEffect, useState } from 'react';
import { useQuery, ApolloLink } from '@apollo/client';
import { HELLO_QUERY, GOODBYE_QUERY } from './queries';
import * as Sentry from "@sentry/react";


const App = () => {
  const [helloResponse, setHelloResponse] = useState(null);
  const [goodbyeResponse, setGoodbyeResponse] = useState(null);

  const helloResult = useQuery(HELLO_QUERY, {
    variables: { name: 'Alice' },
  });

  const goodbyeResult = useQuery(GOODBYE_QUERY, {
    variables: { name: 'Bob' },
  });
  console.log(helloResponse)

  useEffect(() => {
    if (!helloResult.loading && helloResult.data) {
      setHelloResponse(helloResult.data.hello);
    }

    if (!goodbyeResult.loading && goodbyeResult.data) {
      setGoodbyeResponse(goodbyeResult.data.goodbye);
    }
  }, [helloResult, goodbyeResult]);

  if (helloResult.loading || goodbyeResult.loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Apollo Client Batched Requests Example</h1>
      <div>
        <p>Hello Response: {helloResponse}</p>
        <p>Goodbye Response: {goodbyeResponse}</p>
      </div>
    </div>
  );
};

export default App;