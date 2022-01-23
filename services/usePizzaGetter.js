//Gets all the pizzas from the database for later matching with items in the cart
//This is a custom hook

import axios from 'axios'
import useSWR from 'swr'
import {ALL_PIZZAS_API_URL} from "./pizzaApiUrls";

//As required swr library
const fetcher = url => axios.get(url).then(res => res.data)


function usePizzaGetter(state) {

    const { data, error } = useSWR(ALL_PIZZAS_API_URL, fetcher);

    if (!data)
        return { data, error }

    const pizzasList = data['pizza']

    //Sending pizzas already in the cart
    const pizzaCartPizzaIDs = state.map(pizza => pizza.id);
    //Merging the pizza
    const pizzaToReturn = pizzasList.filter(pizza => pizzaCartPizzaIDs.includes(pizza.id));

    return {
        data: pizzaToReturn,
        error
    }
}

export default usePizzaGetter
