//Matches pizza quantities stored in state with pizza information from the database
export const combinePizzainfoQuantity = (completePizzaInfo, quantityState) => {
    return completePizzaInfo.map(pizza => {
        //Finds the same id in the state
        const temp = quantityState.find(tempPizza => tempPizza.id === pizza.id);

        return {
            ...pizza,
            quantity: temp.quantity
        }
    });
}

//Returns the total number of pizzas in the cart
export const calculateTotalItemsInCart = state => {
    if (state.length === 0) return 0;
    return state.reduce((sum, currentValue) => sum + currentValue.quantity, 0)
}

//Calculates the total bill
export const totalBill = array => {
    return array.reduce((sum, currentValue) => {
        return sum + (currentValue.price * currentValue.quantity)
    }, 0)
}