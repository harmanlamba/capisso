import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import {
  makeStyles,
  Typography,
  Box,
  Button,
  Chip,
  AppBar,
  Tabs,
  Tab,
} from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { IOrganisationDto } from '../../types/types';
import { getOrganisation } from '../../common/api/organisations';
import { getStatusColor } from '../../components/organisations/OrganisationsList';

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
              <Chip
                label={organisation.status}
                color={getStatusColor(organisation.status)}
              />{' '}
              <Button variant="outlined" color="primary">
                Edit
              </Button>
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
          <Switch>
            <Route path="/organisations/:id/about" exact={true} />
            <Route path="/organisations/:id/projects" exact={true} />
            <Route path="/organisations/:id/contacts" />
            <Route path="/organisations/:id/communications" exact={true} />
            <Route path="*">
              <Redirect to={`/organisations/${id}/about`} />
            </Route>
          </Switch>
        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};
