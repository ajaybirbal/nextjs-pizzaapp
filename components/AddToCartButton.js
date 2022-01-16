import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { addPizza } from './../reducers/cartReducer'

function AddToCartButton({ id, size }) {

    const [text, setText] = useState("Add");
    const dispatch = useDispatch();

    //Delete later. For testing only
    // const state = useSelector(state => state.cart);
    // useEffect(() => {
    //     console.log("State current: ", state);
    // }, [state])
    
    const clickHandler = event => {
        event.preventDefault();
        buttonTextHandler();

        //Dispatch to redux
        dispatch(addPizza(id));
    }

    //Changes text when item is added to the cart
    const buttonTextHandler = () => {
        setText("Added")
        setTimeout(() => {
            setText("Add");
        }, 1300);
    }

    return (
        <div>
            <button
                className={`addToCartButton${size ? `-${size}` : ''}`}
                onClick={clickHandler}
            >{text}</button>
        </div>
    )
}

export default AddToCartButton
