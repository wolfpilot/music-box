// Libs
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

// Scenes
import Home from '../scenes/Home';

// Components
import SiteHeader from './SiteHeader';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <SiteHeader />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
