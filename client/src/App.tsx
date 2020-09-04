import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { NavigationDrawer } from './components/NavigationDrawer';
import { OrganisationsViewAllPage } from './pages/organisations/OrganisationsViewAllPage';
import { OrganisationsAddPage } from './pages/organisations/OrganisationsAddPage';
import { CoursesViewAllPage } from './pages/courses/CoursesViewAllPage';
import { CoursesAddPage } from './pages/courses/CoursesAddPage';
import { ProjectsViewAllPage } from './pages/projects/ProjectsViewAllPage';
import { ProjectsAddPage } from './pages/projects/ProjectsAddPage';
import { ProjectViewPage } from './pages/projects/ProjectViewPage';

import { makeStyles, Box } from '@material-ui/core';
import { OrganisationViewPage } from './pages/organisations/OrganisationViewPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
}));

export const App: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Router>
        <NavigationDrawer />

        <Box width="100%" padding="1em">
          <Switch>
            <Route
              path="/organisations"
              exact={true}
              component={OrganisationsViewAllPage}
            />

            <Route
              path="/organisations/add"
              exact={true}
              component={OrganisationsAddPage}
            />

            <Route
              path="/organisations/:id/:page"
              component={OrganisationViewPage}
            />

            <Route path="/organisations/:id" component={OrganisationViewPage} />

            <Route
              path="/courses"
              exact={true}
              component={CoursesViewAllPage}
            />

            <Route
              path="/courses/add"
              exact={true}
              component={CoursesAddPage}
            />

            <Route
              path="/projects"
              exact={true}
              component={ProjectsViewAllPage}
            />

            <Route
              path="/projects/add"
              exact={true}
              component={ProjectsAddPage}
            />

            <Route
              path="/projects/:id"
              exact={true}
              component={ProjectViewPage}
            />

            <Route path="*">
              <Redirect to="/organisations" />
            </Route>
          </Switch>
        </Box>
      </Router>
    </div>
  );
};
