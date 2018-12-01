// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// Utils
import registerServiceWorker from './registerServiceWorker';
import { store, persistor } from './store';
import { history } from './history';
import { createWatchers } from './watchers';

// Assets
import './index.css';

// Components
import App from './components/App';

createWatchers(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App history={history} />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
