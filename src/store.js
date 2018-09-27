// Libs
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// Utils
import rootReducer from './reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const configureStore = initialState =>
  createStoreWithMiddleware(rootReducer, initialState);

export default configureStore;
