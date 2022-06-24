import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Featured from "../components/Featured"
import ProductList from "../components/ProductList"

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gricko</title>
        <meta name="description" content="Food ordering application" />
        <link rel="icon" href="/favico.ico" />
      </Head>
      
      <Featured/>
      <ProductList/>
    </div>
  )
}
