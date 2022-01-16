import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect } from 'react'
import Layout from './../components/Layout'
import { useDispatch, useSelector } from 'react-redux';
import styles from './../styles/Cart.module.css'
import usePizzaGetter from '../services/usePizzaGetter';
import ErrorPage from '../components/ErrorPage';
import { combinePizzainfoQuantity } from './../utils/helper'
import { addPizza, deleteAllPizzas, deletePizza, reducePizza } from './../reducers/cartReducer'

function Cart() {

    const dispatch = useDispatch();
    const state = useSelector(state => state.cart);

    //Get the updated complete pizzas info and their prices from the server
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

    //combine stae based quantities and full information array
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

    const deleteItem = (e, id) => {
        e.preventDefault();
        dispatch(deletePizza(id));
    }

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
                </>
            )
        })
    }

    return (
        <>
            <Layout>
                <div className="wrapper-gbl">
                    <h1>Cart Page</h1>
                    {state.length === 0 ? (<h2 className={styles.emptyError}>The cart is empty!</h2>) : displayItems()}
                    {state.length === 0 ? "" : <button
                                                    className={`${styles.basicButtonStyle} ${styles.deleteButton} .deleteAllButton`}
                                                    onClick={(e) => { clearCart(e) }}
                                                    >Delete All</button>
                    }
                    <Link href='\'>
                        <a><u><h5 className="">Go Back</h5></u></a>
                    </Link>
                </div>
            </Layout>
        </>
    )
}

export default Cart
