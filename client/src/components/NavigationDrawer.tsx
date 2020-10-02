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
import Logo from '../assets/Logo';
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
    display: 'flex',
    width: DRAWER_WIDTH,
    justifyContent: 'space-between',
  },
  drawerPaper: {
    width: DRAWER_WIDTH,
    padding: 30,
  },
  listElements: {
    marginTop: 20,
  },
  titleButton: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    backgroundColor: 'transparent !important',
  },
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
      <div>
        <Button
          className={classes.titleButton}
          onClick={() => history.push('/organisations')}
          size="large"
          disableRipple={true}
        >
          <Logo />
          <Typography style={{ marginLeft: 5 }} variant="h3" component="h1">
            Capisso
          </Typography>
        </Button>
        <List>
          {filterdRoutes.map((route, index) => (
            <ListItem
              button={true}
              className={classes.listElements}
              key={index}
              onClick={() => history.push(route.location)}
              selected={location.pathname.startsWith(route.location)}
            >
              <ListItemIcon>{getIcon(route.name)}</ListItemIcon>
              <ListItemText primary={route.name} />
            </ListItem>
          ))}
          <GoogleLogout
            render={(renderProps) => (
              <ListItem
                button={true}
                onClick={renderProps.onClick}
                className={classes.listElements}
              >
                <ListItemIcon>
                  <GoogleIcon />
                </ListItemIcon>
                <ListItemText primary="Sign out" />
              </ListItem>
            )}
            clientId={GOOGLE_CLIENT_ID}
            onLogoutSuccess={onSignOut}
          />
        </List>
      </div>
    </Drawer>
  );
};
