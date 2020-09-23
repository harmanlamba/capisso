import {
  AppBar,
  Box,
  Button,
  makeStyles,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import {
  Link,
  Redirect,
  Route,
  Switch,
  useHistory,
  useParams,
} from 'react-router-dom';
import { getOrganisation } from '../../common/api/organisations';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { OrganisationStatusChip } from '../../components/organisations/OrganisationStatusChip';
import { OrganisationViewAbout } from '../../components/organisations/OrganisationViewAbout';
import { IOrganisationDto } from '../../types/types';
import { OrganisationViewProjects } from './OrganisationViewProjects';

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
    case 3:
      return 'communications';
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
    case 'communications':
      return 3;
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

  const [organisation, setOrganisation] = useState<IOrganisationDto>();

  useEffect(() => {
    getOrganisation(id).then((data) => setOrganisation(data));
  }, [id]);

  return (
    <div className={classes.content}>
      {organisation ? (
        <>
          <Box mb={2}>
            <Typography variant="h4" display="inline">
              {organisation.name}
            </Typography>
            <Box ml={2} position="relative" top="-0.5em" display="inline">
              <OrganisationStatusChip status={organisation.status.toString()} />{' '}
              <Link to={`/organisations/${organisation.id}/edit`}>
                <Button variant="outlined" color="primary">
                  Edit
                </Button>
              </Link>
            </Box>
          </Box>
          <AppBar position="static">
            <Tabs value={value} onChange={handleChange} aria-label="">
              <Tab label="About" />
              <Tab label="Projects" />
              <Tab label="Contacts" />
              <Tab label="Communications" />
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
              <Route path="/organisations/:id/contacts" />
              <Route path="/organisations/:id/communications" exact={true} />
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
