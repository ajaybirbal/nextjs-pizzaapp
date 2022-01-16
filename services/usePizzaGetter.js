//Gets Pizzas for the cart from the database using hooks and swr library.
//This is a custom hook

import axios from 'axios'
import useSWR from 'swr'
import { API_URL } from "./backendinfo";

const baseUrl = API_URL;

//As required swr library
const fetcher = url => axios.get(url).then(res => res.data)


function usePizzaGetter(state) {
    const { data, error } = useSWR(`${baseUrl}pizza`, fetcher);

    if (!data)
        return { data, error }

    //Sending only relevant things to the cart
    const pizzaCartPizzaIDs = state.map(pizza => pizza.id);
    const pizzaToReturn = data.filter(pizza => pizzaCartPizzaIDs.includes(pizza.id));

    return {
        data: pizzaToReturn,
        error
    }
}

export default usePizzaGetter
