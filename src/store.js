// Libs
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// Utils
import rootReducer from './reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(logger)(createStore);
const configureStore = () =>
  createStoreWithMiddleware(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

export default configureStore;
