import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  skeleton: {
    margin: '12px 0',
  },
}));

export const LoadingFieldSkeleton: React.FC<{}> = () => {
  const classes = useStyles();

  return (
    <Skeleton
      className={classes.skeleton}
      variant="rect"
      width={800}
      height={57}
    />
  );
};
