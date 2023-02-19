import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32"></Image>
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>PORUČITA ODMAH!</div>
          <div className={styles.text}>+381 629-756-150</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Link href="/" passHref={false}>
            <a>
              <Image
                src="/img/logo-white.png"
                alt=""
                width="120px"
                height="50px"
                layout="fixed"
                className={styles.imgContainer}
              />
            </a>
          </Link>
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>Blog</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" passHref>
          <a>
            <div className={styles.cart}>
              <Image
                src="/img/basket-white.png"
                alt=""
                width="30px"
                height="30px"
              />
              <div className={styles.counter}>{quantity}</div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
