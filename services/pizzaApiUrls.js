//Single resource to manage all the API urls

//Base Url
export const API_URL = "http://localhost:3000/api/";

//Url for getting all pizzas
export const ALL_PIZZAS_API_URL = `${API_URL}pizzas`

//Generates url for the single pizza
export const getSinglePizzaURL = id => {
    return `${API_URL}pizzas/${id}`
}