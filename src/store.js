// Libs
import { applyMiddleware, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'

// Utils
import { history } from './history'
import rootReducer from './reducers'

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const router = routerMiddleware(history)

const middleware = [thunk]

if (process.env.NODE_ENV === 'development') {
  // Lazy load only in local dev mode
  const { createLogger } = require('redux-logger')

  middleware.push(createLogger())
}

middleware.push(router)

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['session', 'user'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  connectRouter(history)(persistedReducer),
  composeEnhancer(applyMiddleware(...middleware))
)

export const persistor = persistStore(store)
