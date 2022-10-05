import Product from "../models/Product"
export default interface InitialProps {
    productList: typeof Product[],
    admin: boolean
}