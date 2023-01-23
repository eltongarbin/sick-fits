/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloClient, ApolloProvider } from '@apollo/client';
import { withData } from '../lib/withData';

import '../components/styles/nprogress.css';
import { Page } from '../components/Page';
import { CartStateProvider } from '../lib/cartState';
import { AppProps } from 'next/app';
import { NextPageContext } from 'next';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

type MyAppProps = AppProps & {
  apollo: ApolloClient<any>;
};

const MyApp = ({ Component, pageProps, apollo }: MyAppProps) => (
  <ApolloProvider client={apollo}>
    <CartStateProvider>
      <Page>
        <Component {...pageProps} />
      </Page>
    </CartStateProvider>
  </ApolloProvider>
);

MyApp.getInitialProps = async function ({
  Component,
  ctx,
}: {
  Component: MyAppProps['Component'];
  ctx: NextPageContext;
}) {
  let pageProps = { query: {} };
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  pageProps.query = ctx.query;
  return { pageProps };
};

// @ts-ignore
export default withData(MyApp);
