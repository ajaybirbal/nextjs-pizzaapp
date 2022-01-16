import Link from 'next/link';
import styles from './../styles/Navigation.module.css'

const Navigation = () => {
    return (
        <div className={styles.navigation}>
            <Link href='/cart'>
                <a>Cart Area</a>
            </Link>
        </div>
    );
}


export default Navigation;