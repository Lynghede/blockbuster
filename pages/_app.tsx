import type { NextPage } from "next";

import type { AppProps } from "next/app";
import React from "react";
import { ToastProvider } from "../utlities/toast";
import Layout from "../ui/Layout";
import { WatchlistProvider } from "../utlities/WatchlistContext";

import "../styles/globals.css";

function getDefaultLayout(page: React.ReactElement) {
  return (
    <>
      <WatchlistProvider>
        <ToastProvider>
          <Layout>{page}</Layout>
        </ToastProvider>
      </WatchlistProvider>
    </>
  );
}

/** Per-Page Layouts
 *
 * If you need multiple layouts, you can add a property getLayout to your page,
 * allowing you to return a React component for the layout. This allows you to
 * define the layout on a per-page basis. Since we're returning a function, we
 * can have complex nested layouts if desired.
 *
 * knicked from:
 * https://nextjs.org/docs/basic-features/layouts#with-typescript
 */

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? getDefaultLayout;
  return getLayout(<Component {...pageProps} />);
}

export default MyApp;
