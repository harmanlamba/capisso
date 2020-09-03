import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
} from '@material-ui/core';

import { DRAWER_WIDTH } from '../constants/constants';

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
            selected={location.pathname.includes(route.location)}
          >
            <ListItemText primary={route.name} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};
