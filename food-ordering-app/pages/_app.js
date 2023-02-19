import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { Provider } from "react-redux";
import store from "../redux/store";
import { useRef } from "react";

function MyApp({ Component, pageProps }) {
  const productsListReference = useRef(null);

  return (
    <>
      <Provider store={store}>
        <Head>
          <title>Gricko</title>
          <meta name="description" content="Food ordering application" />
          <link rel="icon" href="/favico.ico" />
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}

export default MyApp;
