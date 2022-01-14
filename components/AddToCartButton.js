import React, { useState } from 'react'

function AddToCartButton({ id, size }) {

    const [text, setText] = useState("Add");

    const clickHandler = event => {
        event.preventDefault();
        buttonTextHandler();

        //Logic to handle add to cart
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
