// Libs
import { applyMiddleware, compose, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Utils
import { history } from './history';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const router = routerMiddleware(history);

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancer(applyMiddleware(thunk, logger, router))
);

export default store;
