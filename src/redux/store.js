import { createStore, compose, applyMiddleware } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

export default store;


// import { configureStore } from '@reduxjs/toolkit'
// import pizzas from './reducers/pizzas/'
// import filter from './reducers/filter/'
// import cart from './reducers/cart/'

// export const store = configureStore({
//   pizzas,
//   filter,
//   cart,
// })