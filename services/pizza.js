//API for getting the pizzas information from the server for the SSR SSG
import axios from "axios"
import { API_URL } from "./backendinfo";

const baseUrl = API_URL;


export const getPizzas = async () => {
    try {
        const data = await axios.get(`${baseUrl}pizza`);
        return data.data;
    } catch (error) {
        return null;
    }
}

export const getSinglePizza = async id => {
    try {
        const data = await axios.get(`${baseUrl}pizza/${id}`);
        return data.data;
    } catch (error) {
        return null;
    }
}