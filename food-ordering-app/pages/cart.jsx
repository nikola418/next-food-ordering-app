import styles from "../styles/Cart.module.css"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import { useRouter } from "next/router"
import { reset } from "../redux/cartSlice"
import axios from "axios"
import OrderDetails from "../components/OrderDetails";
const Cart = () => {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)
    const router = useRouter()
    // This values are the props in the UI
    const amount = cart.total;
    const currency = "USD";
    const style = {"layout":"vertical"};
    

    const createOrder = async (data) => {
        try {
            const res = await axios.post("http://localhost:3000/api/orders", data)
            if(res.status === 201){
                dispatch(reset())
                router.push("/orders/"+res.data._id)
            } 
        } catch (error) {
            console.log(error)
        }
    }
    const discard = () => {
        setOpen(false)
    }
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending, isRejected }, dispatch] = usePayPalScriptReducer();
    
        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner, open]);
    
    
        return (<>
                { (showSpinner && isPending) && <div className="spinner" /> }
                <PayPalButtons
                    style={style}
                    disabled={false}
                    forceReRender={[amount, currency, style]}
                    fundingSource="paypal"
                    createOrder={(data, actions) => {
                        return actions.order
                            .create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: currency,
                                            value: amount,
                                        },
                                    },
                                ],
                            })
                            .then((orderId) => {
                                // Your code here after create the order
                                return orderId;
                            });
                    }}
                    onApprove={function (data, actions) {
                        return actions.order.capture().then(function (details) {
                            const shippingDetails = details.purchase_units[0].shipping;
                            
                            createOrder({
                                customer: shippingDetails.name.full_name,
                                address: shippingDetails.address.address_line_1,
                                total: cart.total,
                                paymentMethod: 1
                            })
                        });
                    }}
                    onError ={ function(err){
                        console.log(err)
                    }}
                />
            </>
        );
    }

    return ( 
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead>
                    <tr className={styles.trTitle}>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Extras</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                    <tbody>
                       
                    {
                        cart.products.map((product) => (
                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image src={product.img} layout="fill" objectFit="cover"></Image>
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                                    <span className={styles.extras}>
                                        {product.options.map((option, index, options) => (
                                            <span key={option._id}>
                                                {
                                                    options.length === index+1 ? option.text : option.text+", "
                                                }
                                            </span>
                                        ))}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>{product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>{product.price * product.quantity}</span>
                                </td>
                            </tr>
                        ))
                    }
                    
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>{cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>$0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>{cart.total}
                    </div>
                  {
                   open ? 
                    (
                    <div className={styles.paymentMethods}>
                        <button 
                            className={styles.payButton} 
                            onClick={() => setCash(true)}
                        >CASH ON DELIVERY</button>
                        <PayPalScriptProvider
                            options={{
                                "client-id": "AY3VgtjyfWvhPpPpV7WIrixvTcECsA0h7BN07mWYZNRMa6FbWDjfiAZzhrZrkQaHv6fKaCktC2FGDIcB",
                                components: "buttons",
                                currency: currency,
                                "disable-funding": "credit,card,p24",
                                debug: true
                            }}

                        >
                            <ButtonWrapper
                                currency={currency}
                                showSpinner={false}
                            />
                        </PayPalScriptProvider>
                    </div>
                    ) : (
                    <button onClick={()=>setOpen(true)} className={styles.button}>CHECK OUT NOW!</button>
                    ) }
                </div>
            </div>
            {
               cash && (
                <OrderDetails 
                    total={cart.total}
                    createOrder={createOrder}
                    discard={setCash}
                ></OrderDetails>
               ) 
            }
        </div>
    );
}
 
export default Cart;