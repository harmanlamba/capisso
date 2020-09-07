import { CircularProgress, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  progressRing: {
    marginLeft: '50%',
    paddingTop: '200px',
    paddingBottom: '10px',
  },
}));

export const LoadingSpinner: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <CircularProgress
      className={classes.progressRing}
      size={60}
      thickness={6}
    />
  );
};
