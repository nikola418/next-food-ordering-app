import styles from "../styles/ProductCard.module.css"
import Image from "next/image"

const ProductCard = () => {
    return ( 
        <div className={styles.container}>
            <Image src="/img/pizza.png" alt="" width="500px" height="500px" />
            <h1 className={styles.title}>FIORI DI ZUCCA</h1>
            <span className={styles.price}>720.00 RSD</span>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
        </div>
    );
}
 
export default ProductCard