import axios from "axios"

const baseUrl = "http://localhost:3004/";

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