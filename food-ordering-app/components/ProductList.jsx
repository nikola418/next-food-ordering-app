import ProductCard from "./ProductCard"
import styles from "../styles/ProductList.module.css"

const ProductList = ({ productList }) => {
    return ( 
        <div className={styles.container}>
            <h1 className={styles.title}>PIZZA OF THE DAY</h1>
            <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum at, totam officiis quasi fugiat aspernatur unde, laudantium fuga est, vero ex non culpa reprehenderit? Architecto tenetur in doloremque nobis?</p>
            <div className={styles.wrapper}>
                {   
                    productList.map((product) => {
                        return <ProductCard key={product._id} product={product}/>
                    })
                }
            </div>
        </div>
    );
}

export default ProductList