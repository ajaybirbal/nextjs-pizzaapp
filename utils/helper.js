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