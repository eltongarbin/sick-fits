import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import App from 'next/app';

import withApolloClient from '../lib/with-apollo-client';
import Page from '../components/Page';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <ApolloProvider client={apolloClient}>
        <Page>
          <Component {...pageProps} />
        </Page>
      </ApolloProvider>
    );
  }
}

export default withApolloClient(MyApp);
