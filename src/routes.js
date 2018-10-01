// Libs
import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

// Scenes
import Home from './scenes/Home';

// Components
import SiteHeader from './components/SiteHeader';
import Authorize from './scenes/Authorize/index';
import NotFound from './scenes/NotFound/index';

const routes = (
  <Fragment>
    <SiteHeader />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/authorize" component={Authorize} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default routes;
