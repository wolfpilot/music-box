// Libs
import { createStore } from 'redux';

// Utils
import rootReducer from './reducers';

const configureStore = initialState => createStore(rootReducer, initialState);

export default configureStore;
