import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { OrganisationsLandingPage } from './pages/organisations/OrganisationsLandingPage';
import { OrganisationsAddPage } from './pages/organisations/OrganisationsAddPage';

export const App: React.FC<{}> = () => {
  return (
    <Router>
      <nav>Navigation component</nav>

      <Switch>
        <Route
          path="/organisations"
          exact={true}
          component={OrganisationsLandingPage}
        />
        <Route
          path="/organisations/add"
          exact={true}
          component={OrganisationsAddPage}
        />

        <Route path="*">
          <Redirect to="/organisations" />
        </Route>
      </Switch>
    </Router>
  );
};
