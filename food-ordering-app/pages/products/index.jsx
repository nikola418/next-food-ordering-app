import axios from "axios";
import ProductCard from "../../components/ProductCard";
import styles from "../../styles/Products.module.css"

const Products = ({ products }) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {
                    products.map((product) => (
                        <ProductCard key={product._id} product={product}></ProductCard>
                    ))
                }
            </div>
        </div>
    );
}


export const getServerSideProps = async () => {
    const res = await axios.get("http://localhost:3000/api/products")
    console.log(res.data)
    return {
        props: {
            products: res.data
        }
    }
}
export default Products;