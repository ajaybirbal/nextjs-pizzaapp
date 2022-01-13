import Navigation from "./Navigation";
import Footer from "./Footer";
import styles from "./../styles/Layout.module.css"

const Layout = ({ children }) => {
    return (
        <>
            <nav><Navigation /></nav>
            <main className={styles.container}>{children}</main>
            <footer><Footer /></footer>
        </>
    );
}

export default Layout;