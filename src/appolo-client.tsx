import { ApolloClient, InMemoryCache, HttpLink, split } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient as createWsClient } from 'graphql-ws';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';

import store from './store/store';

// Function to create Apollo Client with dynamic headers based on token
const createApolloClient = () => {
  const { token } = store.getState().auth;

  // Create an HTTP link
  const httpLink = new HttpLink({
    uri: 'https://api-dev.autobse.com/graphql',
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  });

  // Create a WebSocket link
  const wsLink = new GraphQLWsLink(createWsClient({
    url: 'wss://api-dev.autobse.com/graphql',
    connectionParams: () => {
      const { token } = store.getState().auth; // Get token from the store
      return {
        authorization: token ? `Bearer ${token}` : "",
      };
    },
  }));

  // Split links based on operation type
  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink // Fallback to HTTP link for non-subscription operations
  );

  // Create and return Apollo Client
  return new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
