import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import styles from "../../styles/Product.module.css"
import axios from "axios"
import { addProduct } from "../../redux/cartSlice"

const Product = ({product}) => {
    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(product.prices[0]);
    const [options, setOptions] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const changePrice = () => {
        let amount = product.prices[size] + options.reduce((total, option) => {
            return total + option.price 
            console.log(total)
        }, 0)
        amount = parseFloat(amount).toPrecision(3)
        setPrice(amount)
    }

    useEffect(() => {
        changePrice()
    }, [size, options])
    
    const handleSize = (newSize) => {
        setSize(newSize)
    }

    const handleOption = (e, option) => {
        const checked = e.target.checked;

        if(checked){
            setOptions((prev) => [...prev, option])
        } else if(!checked){
            setOptions(options.filter((op) => op._id !== option._id))
        }
    }

    const handleClick = () => {
        dispatch(addProduct({...product, options, price, quantity}))
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={product.img} layout="fill" objectFit="contain"></Image>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{product.title}</h1>
                <span className={styles.price}>${price}</span>
                <p className={styles.desc}>{product.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={()=>handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={()=>handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt="" objectFit="contain"/>
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {
                        product.extraOptions.map((option)=>(
                        <div className={styles.option} key={option._id}> 
                            <input 
                                type="checkbox" 
                                className={styles.checkbox} 
                                id={option.text}
                                name={option.text}
                                onChange={(e)=>handleOption(e, option)}
                            />
                            <label htmlFor={option.text}>{option.text}</label>
                        </div>
                        ))
                    }
                </div>
                <div className={styles.add}>
                    <input type="number" defaultValue={1} min="1" max="9" className={styles.quantity} onChange={(e)=> setQuantity(e.target.value)}/>
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    );
}


export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`http://localhost:3000/api/products/${params.id}`);
    return {
      props: {
        product: res.data
      }
    }
  }

 
export default Product;