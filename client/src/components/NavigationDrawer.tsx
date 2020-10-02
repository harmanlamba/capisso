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
  ListItemIcon,
  Button,
} from '@material-ui/core';

import { AccountTree, Group, Business, Book } from '@material-ui/icons';
import { DRAWER_WIDTH } from '../constants/constants';
import GoogleIcon from '../assets/GoogleIcon';
import { getAuthUserJWTData, onSignOut } from '../common/auth/userAuth';

const routes = [
  {
    name: 'Organisations',
    location: '/organisations',
    admin: false,
  },
  {
    name: 'Courses',
    location: '/courses',
    admin: false,
  },
  {
    name: 'Projects',
    location: '/projects',
    admin: false,
  },
  {
    name: 'Users',
    location: '/users',
    admin: true,
  },
];
function getIcon(name: string) {
  switch (name) {
    case 'Organisations':
      return <Business />;
    case 'Courses':
      return <Book />;
    case 'Projects':
      return <AccountTree />;
    case 'Users':
      return <Group />;
  }
}

const useStyles = makeStyles(() => ({
  drawer: {
    width: DRAWER_WIDTH,
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    padding: 30,
  },
  listElements: {
    marginTop: 20,
  },
  customIcon: {},
}));

export const NavigationDrawer: React.FC<{}> = () => {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const GOOGLE_CLIENT_ID: string = `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`;

  const userJWTData = getAuthUserJWTData();

  const filterdRoutes = routes.filter(
    (route) => !route.admin || userJWTData?.role === 'Admin'
  );

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
        {filterdRoutes.map((route, index) => (
          <ListItem
            button={true}
            className={classes.listElements}
            key={index}
            onClick={() => history.push(route.location)}
            selected={location.pathname.startsWith(route.location)}
          >
            <ListItemIcon className={classes.customIcon}>
              {getIcon(route.name)}
            </ListItemIcon>
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
