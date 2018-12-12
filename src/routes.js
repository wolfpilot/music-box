// Libs
import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

// Scenes
import Home from './scenes/Home';
import Authorize from './scenes/Authorize';
import PlaylistPage from './scenes/PlaylistPage';
import NotFound from './scenes/NotFound';

// Components
import SiteHeader from './components/SiteHeader';

const routes = (
  <Fragment>
    <SiteHeader />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/authorize" component={Authorize} />
      <Route path="/playlist/:id" component={PlaylistPage} />
      <Route component={NotFound} />
    </Switch>
  </Fragment>
);

export default routes;
