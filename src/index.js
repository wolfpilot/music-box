// Libs
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

// Assets
import './index.css';

// Components
import App from './components/App';

ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
