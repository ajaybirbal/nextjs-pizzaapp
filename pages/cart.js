import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Layout from './../components/Layout'
import ErrorPage from '../components/ErrorPage';

import styles from './../styles/Cart.module.css'

import usePizzaGetter from '../services/usePizzaGetter';

import { combinePizzainfoQuantity, totalBill } from './../utils/helper'
import { addPizza, deleteAllPizzas, deletePizza, reducePizza } from './../reducers/cartReducer'

function Cart() {
    const dispatch = useDispatch();
    const state = useSelector(state => state.cart);

    //Get the latests updated pizzas info and prices from the server
    const { data, error } = usePizzaGetter(state);

    if (!data && !error) {
        return (
            <Layout>
                <div className='wrapper-gbl'>
                    <h1>Loading your cart....</h1>
                </div>
            </Layout>
        )
    }

    //Data loading failed from the server
    if (error)
        return <ErrorPage />

    //combine state based quantities and full pizza information and creates new  array
    const newPizzaCompleteArray = combinePizzainfoQuantity(data, state);

    //Increases the quantity of pizza
    const increasePizza = (e, id) => {
        e.preventDefault();
        dispatch(addPizza(id));
    }

    //Reduces pizza
    const decreasePizza = (e, id) => {
        e.preventDefault();
        dispatch(reducePizza(id));
    }

    //Removes everything from the cart
    const clearCart = (e) => {
        e.preventDefault();
        dispatch(deleteAllPizzas());
    }

    //Deletes a particular item from the cart
    const deleteItem = (e, id) => {
        e.preventDefault();
        dispatch(deletePizza(id));
    }

    //Displays option whether to empty cart or proceed with payout
    const displayChoiceButtons = () => {
        return (
            <div className={styles.choiceButton}>
                <Link href='/payout'>
                    <a>
                        <div className={styles.checkoutButton}>Checkout</div>
                    </a>
                </Link>
                <button
                    className={`${styles.basicButtonStyle} ${styles.reduceButton} .deleteAllButton`}
                    onClick={(e) => { clearCart(e) }}
                >Delete All</button>
            </div>
        )
    }

    //Responsible for calculating total bill
    const calculateTotal = () => <p className={styles.totalBill}>Total: Rs. {totalBill(newPizzaCompleteArray)}</p>

    //Display individual items of the cart
    const displayItems = () => {
        //This is being output
        return newPizzaCompleteArray.map(pizza => {
            return (
                <>
                    <div className={styles.cartRow}>
                        <div className={styles.nameImageContainer}>
                            <div className={styles.imageContainer}>
                                <Image src={`/${pizza.imageUrl}`}
                                    layout="responsive"
                                    width="100%"
                                    height="100%"
                                    alt={pizza.name} />
                            </div>
                            <span>{pizza.name}</span>
                        </div>
                        <span>Rs. {pizza.price}</span>
                        <span>Quantity:{pizza.quantity}</span>
                        <div className={styles.buttonContainer}>
                            <button
                                className={`${styles.basicButtonStyle} ${styles.addButton}`}
                                onClick={(e) => increasePizza(e, pizza.id)}
                            > + </button>

                            <button
                                className={`${styles.basicButtonStyle} ${styles.reduceButton}`}
                                onClick={(e) => decreasePizza(e, pizza.id)}
                            > - </button>

                            <button
                                className={`${styles.basicButtonStyle} ${styles.deleteButton}`}
                                onClick={(e) => deleteItem(e, pizza.id)}
                            > Delete </button>
                        </div>
                    </div>
                    <hr />
                </>
            )
        })
    }

    return (
        <>
            <Layout>
                <div className="wrapper-gbl">
                    <h1>Cart Page:</h1>
                    <hr />
                    {state.length === 0 ? (<h2 className={styles.emptyError}>The cart is empty!</h2>) : displayItems()}
                    {state.length === 0 ? "" : calculateTotal()}
                    {state.length === 0 ? "" : displayChoiceButtons()}
                    <Link href='\'>
                        <a><u><h5 className={styles.gobackLink}>Go Back</h5></u></a>
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export default Cart
