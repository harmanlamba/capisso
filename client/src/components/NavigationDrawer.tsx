import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { DRAWER_WIDTH } from '../constants/constants';
import { Button } from '@material-ui/core';
import GoogleIcon from '../assets/GoogleIcon';
import { onSignOut } from '../common/auth/userAuth';

const routes = [
  {
    name: 'Organisations',
    location: '/organisations',
  },
  {
    name: 'Courses',
    location: '/courses',
  },
  {
    name: 'Projects',
    location: '/projects',
  },
  {
    name: 'Users',
    location: '/users',
  },
];

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

export const NavigationDrawer: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const GOOGLE_CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  return (
    <Drawer
      container={window.document.body}
      variant="permanent"
      anchor="left"
      className={classes.drawer}
      classes={{ paper: classes.drawerPaper }}
    >
      <Typography variant="h3" component="h1">
        Capisso
      </Typography>
      <List>
        {routes.map((route, index) => (
          <ListItem
            button={true}
            key={index}
            onClick={() => history.push(route.location)}
            selected={location.pathname.startsWith(route.location)}
          >
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
      <GoogleLogout
        render={(renderProps) => (
          <Button onClick={renderProps.onClick} startIcon={<GoogleIcon />}>
            Sign Out
          </Button>
        )}
        clientId={GOOGLE_CLIENT_ID}
        onLogoutSuccess={onSignOut}
      />
    </Drawer>
  );
};
