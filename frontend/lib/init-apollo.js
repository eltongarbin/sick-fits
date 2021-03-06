// https://gist.github.com/immortalx/655392a140dba5fa50ac026b1fda28d7#file-init-apollo-js
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-unfetch';

import { endpoint, prodEndpoint } from '../config';
import { resolvers, typeDefs } from './resolvers';

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(_initialState = {}) {
  const isBrowser = typeof window !== 'undefined';
  const cache = new InMemoryCache();
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  const client = new ApolloClient({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser, // Disables forceFetch on the server (so queries are only run once)
    link: new HttpLink({
      uri: process.env.NODE_ENV !== 'production' ? endpoint : prodEndpoint, // Server URL (must be absolute)
      credentials: 'include', // Additional fetch() options like `credentials` or `headers`
      // Use fetch() polyfill on the server
      fetch: !isBrowser && fetch
    }),
    cache,
    typeDefs,
    resolvers
  });
  const data = { cartOpen: false };

  cache.writeData({ data });

  client.onResetStore(() => cache.writeData({ data }));

  return client;
}

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export default function initApolloClient(initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}
