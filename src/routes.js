// Libs
import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

// Pages
import HomePage from './pages/HomePage/HomePage';
import AuthorizePage from './pages/AuthorizePage/AuthorizePage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

// Components
import SiteHeader from './components/SiteHeader/SiteHeader';
import Player from './components/Player/Player';

const routes = (
  <Fragment>
    <SiteHeader />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/authorize" component={AuthorizePage} />
      <Route path="/playlist/:id" component={PlaylistPage} />
      <Route component={NotFoundPage} />
    </Switch>
    <Player />
  </Fragment>
);

export default routes;
