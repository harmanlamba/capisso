import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { NavigationDrawer } from './components/NavigationDrawer';
import { OrganisationsLandingPage } from './pages/organisations/OrganisationsLandingPage';
import { OrganisationsAddPage } from './pages/organisations/OrganisationsAddPage';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
}));

export const App: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavigationDrawer />

        <Switch>
          <Route path="/organisations" exact={true}>
            <OrganisationsLandingPage />
          </Route>

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
    </div>
  );
};
