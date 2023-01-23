/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';
import Router from 'next/router';
import { ApolloProvider } from '@apollo/client';
import withData from '../lib/withData';

import '../components/styles/nprogress.css';
import Page from '../components/Page';
import { CartStateProvider } from '../lib/cartState';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps, apollo }) {
  return (
    <ApolloProvider client={apollo}>
      <CartStateProvider>
        <Page>
          <Component {...pageProps} />
        </Page>
      </CartStateProvider>
    </ApolloProvider>
  );
}

MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  // @ts-ignore
  pageProps.query = ctx.query;
  return { pageProps };
};

// @ts-ignore
export default withData(MyApp);
