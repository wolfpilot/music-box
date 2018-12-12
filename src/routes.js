// Libs
import { Switch, Route } from 'react-router-dom';
import React, { Fragment } from 'react';

// Pages
import HomePage from './pages/HomePage';
import AuthorizePage from './pages/AuthorizePage';
import PlaylistPage from './pages/PlaylistPage';
import NotFoundPage from './pages/NotFoundPage';

// Components
import SiteHeader from './components/SiteHeader';

const routes = (
  <Fragment>
    <SiteHeader />
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/authorize" component={AuthorizePage} />
      <Route path="/playlist/:id" component={PlaylistPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Fragment>
);

export default routes;
