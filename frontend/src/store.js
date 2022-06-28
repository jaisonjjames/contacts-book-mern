import { configureStore } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';
import { contactReducer } from './reducers/contact';

export const history = createBrowserHistory();

// combineReducers will be handled internally by configureStore
const rootReducer = (history) => ({
    contacts: contactReducer
});

const preloadedState = {};
export const store = configureStore({
  middleware: [thunk, routerMiddleware(history)],
  reducer: rootReducer(history),
  preloadedState,
});

export default store;


// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools';
// import { contactReducer } from './reducers/contact';

// const reducers = combineReducers({
//     contacts: contactReducer
// });

// const initialState = {};

// const middleware = [thunk];

// const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));

// export default store;