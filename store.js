import { applyMiddleware, combineReducers, createStore } from "redux";
import { cartReducer } from "./reducers/cartReducer";
import { createWrapper } from 'next-redux-wrapper';
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cart : cartReducer
})

const makeStore = context => createStore(rootReducer);
export const wrapper = createWrapper(makeStore, applyMiddleware(thunk));