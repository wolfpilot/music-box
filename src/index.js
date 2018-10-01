// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Utils
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store';
import * as actions from './actions';

// Assets
import './index.css';

// Components
import App from './components/App';

// Mock data
const tracks = [
  {
    title: 'First track',
    length: '03:48'
  },
  {
    title: 'Second track',
    length: '05:21'
  }
];

const store = configureStore();
store.dispatch(actions.setTracks(tracks));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
