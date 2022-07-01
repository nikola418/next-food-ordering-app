import { useState } from "react"
import styles from "../styles/Add.module.css"
import axios from "axios"
import { useRouter } from "next/router"

const Add = ({ setClose }) => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={()=> setClose(true)} className={styles.close}>X</span>
            </div>
            <h1>Add a new Pizza</h1>
            <div className={styles.item}>
                <label htmlFor="" className={styles.label}>Choose an Image</label>
                <input type="file" />
            </div>
        </div>
    );
}
 
export default Add;