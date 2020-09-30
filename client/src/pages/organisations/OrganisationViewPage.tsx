import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import { useOrganisation } from '../../common/hooks/apiHooks';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { OrganisationStatusChip } from '../../components/organisations/OrganisationStatusChip';
import { OrganisationViewAbout } from '../../components/organisations/OrganisationViewAbout';
import { OrganisationViewContacts } from './OrganisationViewContacts';
import { OrganisationViewProjects } from './OrganisationViewProjects';
import { Edit } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

const tabIdToName = (id: number) => {
  switch (id) {
    case 1:
      return 'projects';
    case 2:
      return 'contacts';
    default:
      return 'about';
  }
};

const tabNameToId = (name: string) => {
  switch (name) {
    case 'projects':
      return 1;
    case 'contacts':
      return 2;
    default:
      return 0;
  }
};

export const OrganisationViewPage: React.FC<{}> = () => {
  const classes = useStyles();
  const { id, page } = useParams();
  const value = tabNameToId(page);
  const history = useHistory();

  const handleChange = (_: any, tab: number) => {
    history.push(`/organisations/${id}/${tabIdToName(tab)}`);
  };

  const { organisation } = useOrganisation(id);

  return (
    <div className={classes.content}>
      {organisation ? (
        <>
          <Box mb={2}>
            <Typography variant="h4" display="inline">
              {organisation.name}
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <OrganisationStatusChip status={organisation.status} />{' '}
              <Button
                variant="contained"
                startIcon={<Edit />}
                color="primary"
                component={Link}
                to={`/organisations/${organisation.id}/edit`}
              >
                Edit
              </Button>
            </Box>
          </Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="">
              <Tab label="About" />
              <Tab label="Projects" />
              <Tab label="Contacts" />
            </Tabs>
          </AppBar>
          <Box pt={2}>
            <Switch>
              <Route
                path="/organisations/:id/about"
                exact={true}
                render={() => (
                  <OrganisationViewAbout organisation={organisation} />
                )}
              />
              <Route
                path="/organisations/:id/projects"
                exact={true}
                render={() => <OrganisationViewProjects />}
              />
              <Route
                path="/organisations/:id/contacts"
                exact={true}
                render={() => <OrganisationViewContacts />}
              />
              <Route path="*">
                <Redirect to={`/organisations/${id}/about`} />
              </Route>
            </Switch>
          </Box>
        </>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};
