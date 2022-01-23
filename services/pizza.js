//API for getting the pizzas information from the server for the SSR SSG

import axios from "axios"
import {ALL_PIZZAS_API_URL, getSinglePizzaURL} from "./pizzaApiUrls";

export const getPizzas = async () => {
    try {
        const data = await axios.get(ALL_PIZZAS_API_URL);
        return data.data['pizza'];
    } catch (error) {
        return null;
    }
}

export const getSinglePizza = async id => {
    try {
        const data = await axios.get(getSinglePizzaURL(id));
        return  data.data['pizza'][0];
    } catch (error) {
        return null;
    }
}