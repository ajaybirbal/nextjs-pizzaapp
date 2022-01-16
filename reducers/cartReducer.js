import { HYDRATE } from "next-redux-wrapper";

export const cartReducer = (state = [], action) => {

    switch (action.type) {
        //Required by next-js-reducer library
        case HYDRATE:
            return { ...state, ...action.id };

        //Removes all pizza from the cart
        case 'DELETE_ALL':
            return []

        //Add pizza to cart, if exists increment the pizza
        case 'ADD_PIZZA':
            //If pizza is already in the cart
            const findPizzaIfAdded = state.find(pizza => pizza.id === action.id);
            if (findPizzaIfAdded !== undefined) {
                const modifiedQuantity = {
                    ...findPizzaIfAdded,
                    quantity: findPizzaIfAdded.quantity + 1
                }
                return state.map(pizza => pizza.id === action.id ? modifiedQuantity : pizza);
            }

            const newPizza = {
                id: action.id,
                quantity: 1
            }

            return [
                ...state,
                newPizza
            ]

        case 'REDUCE_PIZZA':
            const findPizzaForReducing = state.find(pizza => pizza.id === action.id);

            //If the pizza quantity is one, decreasing will delete it
            if(findPizzaForReducing.quantity === 1)
                return state.filter(pizza => pizza.id !== action.id);

            //If greater than one than increase it
            if (findPizzaForReducing !== undefined) {
                const modifiedQuantity = {
                    ...findPizzaForReducing,
                    quantity: findPizzaForReducing.quantity - 1
                }
                return state.map(pizza => pizza.id === action.id ? modifiedQuantity : pizza);
            }

        //I am facing problem here
        case 'DELETE_PIZZA':
            return state.filter(pizza => pizza.id !== action.id);

        default:
            return state
    }
}

export const addPizza = id => {
    return {
        type: 'ADD_PIZZA',
        id
    }
}

export const reducePizza = id => {
    return {
        type: 'REDUCE_PIZZA',
        id
    }
}

export const deleteAllPizzas = () => {
    return {
        type: 'DELETE_ALL'
    }
}

export const deletePizza = id => {
    return {
        type: 'DELETE_PIZZA',
        id
    }
}