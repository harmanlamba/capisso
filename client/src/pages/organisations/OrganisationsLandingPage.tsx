import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

import { DRAWER_WIDTH } from '../../constants/constants';

const useStyles = makeStyles((theme) => ({
  content: {
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
}));

export const OrganisationsLandingPage: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <p>Welcome to the organisations landing page stub</p>

      <Link to="/organisations/add">+ Add</Link>
    </div>
  );
};
