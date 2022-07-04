import Featured from "./Featured";
import Footer from "./Footer"
import Navbar from "./Navbar"


const Layout = ({ children, executeScroll }) => {
    return ( 
        <>
            <Navbar executeScroll={executeScroll}/>
            {children}
            <Footer/>

        </>
    );
}
 
export default Layout;