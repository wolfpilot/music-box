// Libs
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

// Scenes
import Home from '../scenes/Home';

// Components
import SiteHeader from './SiteHeader';
import Authorize from '../scenes/Authorize/index';
import NotFound from '../scenes/NotFound/index';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <SiteHeader />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/authorize" component={Authorize} />
            <Route component={NotFound} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
