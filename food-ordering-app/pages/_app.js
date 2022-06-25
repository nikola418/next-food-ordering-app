import '../styles/globals.css'
import Layout from "../components/Layout"
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Gricko</title>
        <meta name="description" content="Food ordering application" />
        <link rel="icon" href="/favico.ico" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp
