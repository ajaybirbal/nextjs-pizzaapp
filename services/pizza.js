//API for getting the pizzas information from the server for the SSR SSG
//These functions are available server side only

import axios from "axios"
import { ALL_PIZZAS_API_URL, getSinglePizzaURL } from "./pizzaApiUrls";

export const getPizzas = async() => {
    try {
        const data = await axios.get(ALL_PIZZAS_API_URL);

        if (data.data['pizza']) {
            return data.data['pizza'];
        }
        return null;

    } catch (error) {
        return null;
    }
}

export const getSinglePizza = async id => {
    try {
        const data = await axios.get(getSinglePizzaURL(id));

        if (data.data['pizza'][0]) {
            return data.data['pizza'][0];
        }
        return null

    } catch (error) {
        return null;
    }
}