import { Box, makeStyles } from '@material-ui/core';
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { NavigationDrawer } from './components/NavigationDrawer';
import { CourseEditPage } from './pages/courses/CourseEditPage';
import { CoursesAddPage } from './pages/courses/CoursesAddPage';
import { CoursesViewAllPage } from './pages/courses/CoursesViewAllPage';
import { CourseViewPage } from './pages/courses/CourseViewPage';
import { ContactsAddPage } from './pages/organisations/contacts/ContactsAddPage';
import { ContactsEditPage } from './pages/organisations/contacts/ContactsEditPage';
import { OrganisationsEditPage } from './pages/organisations/OrganisationEditPage';
import { OrganisationsAddPage } from './pages/organisations/OrganisationsAddPage';
import { OrganisationsViewAllPage } from './pages/organisations/OrganisationsViewAllPage';
import { OrganisationViewPage } from './pages/organisations/OrganisationViewPage';
import { ProjectEditPage } from './pages/projects/ProjectEditPage';
import { ProjectsAddPage } from './pages/projects/ProjectsAddPage';
import { ProjectsViewAllPage } from './pages/projects/ProjectsViewAllPage';
import { ProjectViewPage } from './pages/projects/ProjectViewPage';
import { getAuthUser, getAuthUserJWTData } from './common/auth/userAuth';
import { LoginPage } from './pages/login/LoginPage';
import { UsersViewAllPage } from './pages/users/UsersViewAllPage';
import { UsersAddPage } from './pages/users/UsersAddPage';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.default,
    height: '100vh',
  },
}));

export const App: React.FC<{}> = () => {
  const classes = useStyles();

  const user = getAuthUser();
  const userJWTData = getAuthUserJWTData();

  return (
    <div className={classes.root}>
      <Router>
        {typeof user === 'object' ? (
          <>
            <NavigationDrawer />

            <Box width="100%" padding="1em">
              <Switch>
                <Route
                  path="/organisations"
                  exact={true}
                  component={OrganisationsViewAllPage}
                />
                <Route
                  path="/organisations/:id/edit"
                  exact={true}
                  component={OrganisationsEditPage}
                />

                <Route
                  path="/organisations/add"
                  exact={true}
                  component={OrganisationsAddPage}
                />

                <Route
                  path="/organisations/:id/contacts/add"
                  exact={true}
                  component={ContactsAddPage}
                />

                <Route
                  path="/organisations/:organisationId/contacts/:id/edit"
                  exact={true}
                  component={ContactsEditPage}
                />

                <Route
                  path="/organisations/:id/:page"
                  component={OrganisationViewPage}
                />

                <Route
                  path="/organisations/:id"
                  component={OrganisationViewPage}
                />

                <Route
                  path="/courses"
                  exact={true}
                  component={CoursesViewAllPage}
                />

                <Route
                  path="/courses/:id/edit"
                  exact={true}
                  component={CourseEditPage}
                />

                <Route
                  path="/courses/add"
                  exact={true}
                  component={CoursesAddPage}
                />

                <Route
                  path="/courses/:id/:page"
                  exact={true}
                  component={CourseViewPage}
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

                <Route
                  path="/projects/:id/edit"
                  exact={true}
                  component={ProjectEditPage}
                />

                <Route
                  path="/projects/:id/:page"
                  exact={true}
                  component={ProjectViewPage}
                />

                {userJWTData?.role === 'Admin' && (
                  <Route
                    path="/users"
                    exact={true}
                    component={UsersViewAllPage}
                  />
                )}

                {userJWTData?.role === 'Admin' && (
                  <Route
                    path="/users/add"
                    exact={true}
                    component={UsersAddPage}
                  />
                )}

                <Route path="*">
                  <Redirect to="/organisations" />
                </Route>
              </Switch>
            </Box>
          </>
        ) : (
          <LoginPage />
        )}
      </Router>
    </div>
  );
};
