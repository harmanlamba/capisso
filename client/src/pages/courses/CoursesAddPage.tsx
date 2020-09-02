import React from 'react';
import { CoursesForm } from '../../components/courses/CoursesForm';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  content: {
    width: '100%',
    flexGrow: 1,
  },
}));

export const CoursesAddPage: React.FC<{}> = () => {
  const classes = useStyles();
  return (
    <div className={classes.content}>
      <p>Welcome to the courses create page</p>

      <CoursesForm />
    </div>
  );
};
