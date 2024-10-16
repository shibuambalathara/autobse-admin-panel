import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import store from './store/store';


// Function to create Apollo Client with dynamic headers based on token
const createApolloClient = () => {
  const { token } = store.getState().auth;

  return new ApolloClient({
    link: new HttpLink({
      uri: 'https://api-dev.autobse.com/graphql',
      headers: {
        authorization: token ? `Bearer ${(token)}` : '',
      },
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
