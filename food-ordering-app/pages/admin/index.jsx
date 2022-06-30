import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import styles from "../../styles/Admin.module.css"

const Admin = ({ orders, products }) => {
    const [productList, setProductList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const status = ["preparing", "on the way", "delivered"]

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete("http://localhost:3000/api/products/"+id)
            if(res.status === 200)
                setProductList(productList.filter((pizza) => pizza._id != id));
        } catch (error) {
            console.log(error)
        }
    }

    const handleStatus = async (id) => {
        const item = orderList.filter(order => order._id === id)[0]
        const currentStatus = item.status

        try {
            const res = await axios.put("http://localhost:3000/api/orders/"+id, {
                status: currentStatus + 1
            })
            if(res.status === 200)
                setOrderList([
                    res.data,
                    ...orderList.filter((order) => order._id !== id)
                ])
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <td>Image</td>
                            <td>Id</td>
                            <td>Title</td>
                            <td>Price</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productList.map((product) => (
                                <tr className={styles.trTitle} key={product._id}>
                                    <td>
                                        <Image src={product.img} objectFit="cover" height={50} width={50} alt=""></Image>
                                    </td>
                                    <td>{product._id.slice(0, 5)}</td>
                                    <td>{product.title}</td>
                                    <td>${product.prices[0]}</td>
                                    <td>
                                        <button className={styles.button} >Edit</button>
                                        <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
                <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styles.trTitle}>
                                <td>Id</td>
                                <td>Customer</td>
                                <td>Total</td>
                                <td>Payment</td>
                                <td>Status</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orderList.map((order) => (
                                <tr className={styles.trTitle} key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.customer}</td>
                                    <td>${order.total}</td>
                                    <td>{order.paymentMethod === 0 ? (<span>cash</span>) : (<span>paypal</span>)}</td>
                                    <td>{status[order.status]}</td>
                                    <td>
                                        <button className={styles.button} onClick={() => handleStatus(order._id)}>Next Stage</button>
                                    </td>
                                </tr>
                            ))}
                           
                        </tbody>
                    </table>
                </div>
        </div>
    );
}
 
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || ""
    if(myCookie.token !== process.env.TOKEN){
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false
            }
        }
    }

    const productResponse = await axios.get("http://localhost:3000/api/products")
    const orderResponse = await axios.get("http://localhost:3000/api/orders")
    
    return {
        props: {
            orders: orderResponse.data,
            products: productResponse.data
        }
    }
}

export default Admin;