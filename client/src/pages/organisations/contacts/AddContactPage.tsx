import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const AddContactPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <Typography variant="h4">Add Contact to Organisation</Typography>
    </div>
  );
};
