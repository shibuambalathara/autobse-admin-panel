import React, { useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import createApolloClient from '../appolo-client';

const ApolloProviderWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Apollo client is memoized for performance optimization
  const client = useMemo(() => createApolloClient(), []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloProviderWrapper;
