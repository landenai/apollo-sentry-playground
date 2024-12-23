// src/queries.js
import { gql } from '@apollo/client';

export const HELLO_QUERY = gql`
  query Hello($name: String!) {
    hello(name: $name)
  }
`;

export const GOODBYE_QUERY = gql`
  query Goodbye($name: String!) {
    goodbye(name: $name)
  }
`;