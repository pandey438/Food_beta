import { combineReducers } from "redux";

import { createStore, applyMiddleware } from "redux";

import { thunk } from "redux-thunk"; //With thunk middleware, action creators can return functions instead of objects.
//These functions receive dispatch and getState as arguments,
// allowing them to dispatch actions and access the current state if needed.

import { composeWithDevTools } from "@redux-devtools/extension";

import {
  addAllPizzasReducers,
  editPizzasReducers,
  getAllPizzasReducers,
  getPizzasByIdReducers,
} from "./reducers/pizzaReducers";
import { cartReducer } from "./reducers/cartReducer";
import {
  getAllUsersReducers,
  loginUserReducer,
  registerUserReducer,
} from "./reducers/userReducer";
import {
  getAllOrdersReducers,
  getUserOrdersReducers,
  placeOrderReducer,
} from "./reducers/orderReducer";

const finalReducer = combineReducers({
  getAllPizzasReducers: getAllPizzasReducers,
  cartReducer: cartReducer,
  registerUserReducer: registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducers: getUserOrdersReducers,
  getAllOrdersReducers: getAllOrdersReducers,
  addAllPizzasReducers: addAllPizzasReducers,
  getPizzasByIdReducers: getPizzasByIdReducers,
  editPizzasReducers: editPizzasReducers,
  getAllUsersReducers: getAllUsersReducers,
});

const cartItems = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;

const initialState = {
  cartReducer: {
    cartItems: cartItems,
  },
  loginUserReducer: { currentUser: currentUser },
};

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  finalReducer,
  initialState,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;
