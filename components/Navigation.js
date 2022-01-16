import Link from 'next/link';
import styles from './../styles/Navigation.module.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge'
import { useSelector } from 'react-redux';
import {calculateTotalItemsInCart} from './../utils/helper'

const Navigation = () => {

    const state = useSelector(state => state.cart);

    const getTotalItemsInCart = () => {
        return calculateTotalItemsInCart(state);
    }

    return (
        <div className={styles.navigation}>
            <div className="{styles.listContainer}">
                <ul>
                    <li className={`${styles.basicMenuTextStyle}`}>
                        <Link href='/'>
                            <a>Home</a>
                        </Link>
                    </li>
                    <li className={`${styles.basicMenuTextStyle}`}>
                        <Link href='/'>
                            <a>Contact</a>
                        </Link>
                    </li>
                    <li className={`${styles.basicMenuTextStyle}`}>
                        <Link href='/'>
                            <a>About us</a>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.cartButtonContainer}>
                <Link href='/cart'>
                    <a className={`${styles.basicMenuTextStyle}`}>
                    <Badge badgeContent={getTotalItemsInCart()} color="warning">
                            <ShoppingCartIcon />
                    </Badge>
                    </a>
                </Link>
            </div>
        </div>
    );
}


export default Navigation;