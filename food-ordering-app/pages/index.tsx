import { GetServerSideProps } from 'next'
import styles from '../styles/Home.module.css'
import Featured from "../components/Featured"
import ProductList from "../components/ProductList"
import axios from 'axios'
import { useState } from 'react'
import Add from '../components/Add'
import AddButton from "../components/AddButton"
import { NextApiRequestCookies } from 'next/dist/server/api-utils'
import InitialProps from '../interfaces/initialProps'

export default function Home( { productList, admin }: InitialProps ) {
  const [close, setClose] = useState(true)
  return (
    <div className={styles.container}>
      <Featured/>
      {admin && <AddButton setClose={setClose} />}
      <ProductList  productList={productList}/>
      {!close && <Add setClose={setClose}/>}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const myCookie:NextApiRequestCookies = ctx.req?.cookies
  let admin: boolean = false;

  if(myCookie.token === process.env.TOKEN){
    admin = true
  }

  const res = await axios.get("http://localhost:3000/api/products")
   
  return {
    props: {
      productList: res.data,
      admin,
    }
  }
}
