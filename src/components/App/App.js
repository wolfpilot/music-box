// Libs
import React from 'react';
import { ConnectedRouter } from 'connected-react-router';

// Utils
import routes from '../../routes';

const App = ({ history }) => (
  <ConnectedRouter history={history}>{routes}</ConnectedRouter>
);

export default App;
