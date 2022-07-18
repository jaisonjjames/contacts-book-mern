import { configureStore } from "@reduxjs/toolkit";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
import { contactReducer } from "./reducers/contact";
import { authReducer } from "./reducers/auth";

export const history = createBrowserHistory();

// combineReducers will be handled internally by configureStore
const rootReducer = (history) => ({
  contacts: contactReducer,
  userLogin: authReducer,
});

const userInfoFromStorage =
  JSON.parse(localStorage.getItem("userInfo")) || null;
console.log("userInfoFromStorage ", userInfoFromStorage);

const preloadedState = { userLogin: { userInfo: userInfoFromStorage } };
export const store = configureStore({
  middleware: [thunk, routerMiddleware(history)],
  reducer: rootReducer(history),
  preloadedState,
});

export default store;
