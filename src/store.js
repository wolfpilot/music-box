// Libs
import { applyMiddleware, compose, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

// Utils
import { history } from './history';
import rootReducer from './reducers';

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const logger = createLogger();
const router = routerMiddleware(history);

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'user']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  connectRouter(history)(persistedReducer),
  composeEnhancer(applyMiddleware(thunk, logger, router))
);

export const persistor = persistStore(store);
