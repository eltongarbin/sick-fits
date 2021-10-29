import "nprogress/nprogress.css";
import NProgress from "nprogress";
import Router from "next/router";

import "../components/styles/nprogress.css";
import Page from "../components/Page";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default function MyApp({ Component, pageProps }) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  );
}
