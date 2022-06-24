import ProductCard from "./ProductCard"
import styles from "../styles/ProductList.module.css"

const ProductList = () => {
    return ( 
        <div className={styles.container}>
            <h1 className={styles.title}>title</h1>
            <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat laborum at, totam officiis quasi fugiat aspernatur unde, laudantium fuga est, vero ex non culpa reprehenderit? Architecto tenetur in doloremque nobis?</p>
            <div className={styles.wrapper}>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
        </div>
    );
}

export default ProductList