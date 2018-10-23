// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// Utils
import registerServiceWorker from './registerServiceWorker';
import store from './store';
import { history } from './history';

// Assets
import './index.css';

// Components
import App from './components/App';

ReactDOM.render(
  <Provider store={store}>
    <App history={history} />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
