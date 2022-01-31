//Returns single pizza

import pizzasData from '../../../pizzaMenu'

export default function handler(req, res) {
    const id = Number(req.query.id);
    const pizzasObject = pizzasData['pizza'];
    const pizza = pizzasObject.filter(pizza => pizza.id === id)
    res.status(200).json({ 'pizza': pizza })
}